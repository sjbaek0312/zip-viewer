import EventEmitter from 'events';
class FileObject {
	constructor(json){
		this.fileId = json.fileId;
		this.fileName = json.fileName;
		this.fileType = json.fileName.slice(json.fileName.lastIndexOf(".") + 1);
		this.fileUploadTime = json.fileName.fileUploadTime;
		this.fileSize = json.fileSize;
	}
	isCompressed(){
		const ZIP_TYPE = ["zip", "7z", "alz", "egg"]
		let This = this;
		let result = false;
		ZIP_TYPE.forEach(function(type){
			if(type == This.fileType) result = true;
		});
		return result;
	}
}
class FileListModel extends EventEmitter {
	constructor(){
		super();
		console.log(" Model Create..");
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
		let resultResponse = response;
		if (typeof response  === 'string')
			resultResponse = JSON.parse(response);
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
					This._addFiles(resultFile);
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
				This._addFiles(result);
			},
			error : function(){
				console.log('ERROR');//
			},
			xhr : function() {
				var xhr = $.ajaxSettings.xhr();
				xhr.upload.onprogress = function(event) {
					console.log('progress', event.loaded, "/", event.total);
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