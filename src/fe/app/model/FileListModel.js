import EventEmitter from 'events';
class FileObject {
	constructor(json){
		this._fileId = json.fileId;
		this._fileName = json.fileName;
		this._fileType = json.fileName.slice(this._fileName.lastIndexOf(".") + 1);
		this._fileUploadTime = json.fileName.fileUploadTime;
		this._fileSize = json.fileSize;
	}
	isCompressed(){
		let ZIP_TYPE = ["zip", "7z", "alz", "egg"]
		ZIP_TYPE.forEach(function(type){
			if(type == this._fileType) return true;
		});
		return false;
	}
}
class FileListModel extends EventEmitter {
	constructor(){
		super();
		this._fileList = {}; //json Dictionary type.. 변수이름 변경이 시급해 보임.
		this._dispatchedFiles = []; //files 타입 배열들
	}
	isFileZip(fileId){
		return (this._fileList[fileId].isCompressed());
	}
	
	_addFiles(json){
		let fileObject = new FileObject(json);
		this._fileList[json.fileId] = fileObject;
		this.emit('change:add', fileObject);
	}
  
  	_pushDispatchedQueue(json){
		this._dispatchedFiles.push(json);
		this.emit('change:dispatched',json);
	}
	_notifyProgress(){
		this.emit('change:')
	}
	_makeResponseJSON(response){
		let resultResponse;
		if (typeof response  === 'string')
			resultResponse = JSON.parse(response);
		else resultResponse = response;
		return resultResponse;
	}
	
	apiFileList() {
		let This = this;
		$.ajax({
			url : "/api/files",
			type : "GET",
			success : function(results) {
				let resultFileList = This._makeResponseJSON(results);
				resultFileList = resultFileList.items;
				resultFileList.forEach(function(resultFile){
					This._pushFiles(resultFile);
				})
			},
			xhr : function() {
				var xhr = $.ajaxSettings.xhr();
				return xhr;
			}
		});
	}

	dispatchFiles(files) {
		console.log(this._dispatchedFiles.length);
		
		let isUploadingKnow = (this._dispatchedFiles.length != 0);
		for (let i=0; i<files.length; i++) {
			this._pushDispatchedQueue(files[i]);
		}
		
		if (!isUploadingKnow) {
			console.log("start to insert file")
			this.apiFileInsert();
		}
	}

	apiFileInsert() {
		if(this._dispatchedFiles.length === 0) throw "NO MORE FILES TO UPLOAD";

		let This = this;
		let formData = new FormData();
		formData.append("file", this._dispatchedFiles[0]);
		$.ajax({
			url : "/api/files",
			data : formData,
			contentType : false,
			processData : false,
			type : "POST",
			mimeType : "multipart/form-data",
			success : function(results) {
				let result = This._makeResponseJSON(results);
				This._pushFiles(result);
			},
			error : function(){
				console.log('ERROR');//
			},
			xhr : function() {
				var xhr = $.ajaxSettings.xhr();
				xhr.upload.onprogress = function(event) {
					This.emit("progres:uploading");
				}
				xhr.upload.onload =function(event){
					console.log('DONE!');
				}
				return xhr;
			}
		}).always(function() {
			This._dispatchedFiles.shift();
			This.apiFileInsert();
		});
	}
}
export default FileListModel;
