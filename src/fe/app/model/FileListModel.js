import EventEmitter from 'events';
import FileSizeMaker from 'lib/FileSizeMaker.js';
const ZIP_TYPE = ["zip", "jar", "tar"]

class FileModel {
	constructor(json){
		this.fileId = json.fileId;
		this.fileName = json.fileName;
		this.fileType = json.fileName.slice(json.fileName.lastIndexOf(".") + 1).toLowerCase();
		this.fileUploadTime = json.fileName.fileUploadTime;
		this.fileSize = FileSizeMaker.calculateSize(json.fileSize);
	}
	isCompressed(){
		let self = this;
		let result = false;
		ZIP_TYPE.forEach(function(type){
			if(type == self.fileType) result = true;
		});
		return result;
	}
}

class FileListModel extends EventEmitter {
	constructor(){
		super();
		this._url = "api/files"				// 실제 사용.
		this._fileList = new Map(); 
		this._dispatchedFiles = []; 
	}
	
	getFile(fileId){
		return this._fileList.get(fileId);
	}
	
	_addFiles(json){
		let file = new FileModel(json);
		this._fileList.set(json.fileId, file);
		this.emit('change:add', file);
	}
  
  	_pushDispatchedQueue(json){
		this._dispatchedFiles.push(json);
		this.emit('change:dispatched',json);
	}
	_notifyProgress(){
		this.emit('change:')
	}
	
	apiFileList() {
		let self = this;
		$.ajax({
			url : this._url ,
			type : "GET",
			dataType : "json",
			success : function(results) {
				let resultFileList = results.items;
				resultFileList.forEach(function(resultFile){
					self._addFiles(resultFile);
				})
			},
			xhr : function() {
				var xhr = $.ajaxSettings.xhr();
				return xhr;
			}
		});
	}
	
	getDownloadURL(fileId){
		if(!this._fileList.get(fileId)) throw "Can't Download This File"
		return this._url + "/" + fileId
	}
	
	apiFileDelete(fileId) {
		const self = this;
		if(!this._fileList.get(fileId)) throw "Can't Delete This File."
		$.ajax({
			url : this._url +"/"+ fileId ,
			type : "DELETE",
			dataType : "json",
		})
		.done(function(res){
			self._fileList.delete(fileId);
			self.emit('change:delete', fileId)
		})
		.fail(function(res){
			self.emit('APIDeleteFail', res.msg)
		})
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

		let self = this;
		let formData = new FormData();
		formData.append("file", this._dispatchedFiles[0]);
		$.ajax({
			url : this._url ,
			data : formData,
			contentType : false,
			processData : false,
			dataType : "json",
			type : "POST",
			mimeType : "multipart/form-data",
			success : function(results) {
				self._addFiles(results);
			},
			error : function(){
				console.log('ERROR');
			},
			xhr : function() {
				var xhr = $.ajaxSettings.xhr();
				xhr.upload.onprogress = function(event) {
					console.log('progress', event.loaded, "/", event.total);
					self.emit("progres:uploading");
				}
				xhr.upload.onload =function(event){
					console.log('DONE!');
				}
				return xhr;
			}
		}).always(function() {
			self._dispatchedFiles.shift();
			self.apiFileInsert();
		});
	}
}
export default FileListModel;
