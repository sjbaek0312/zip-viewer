import EventEmitter from 'events';
class FileUploadModel extends EventEmitter {
	constructor(){
		super();
		this._dispatchedFiles = []; //files 타입 배열들
	}
	
	_makeResponseJSON(response){
		let resultResponse = response;
		if (typeof response  === 'string')
			resultResponse = JSON.parse(response);
		return resultResponse;
	}

	_pushDispatchedQueue(json){
		this._dispatchedFiles.push(json);
		this.emit('upload:dispatched',json);
	}
	
	_notifyProgress(){
		this.emit('upload:progressing')
	}

	dispatchFiles(files) {
		console.log(this._dispatchedFiles.length);
		
		let isUploadingKnow = (this._dispatchedFiles.length != 0);
		for (let i=0; i<files.length; i++) {
			this._pushDispatchedQueue(files[i]);
		}
		
		if (!isUploadingKnow) {
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
export default FileUploadModel;
