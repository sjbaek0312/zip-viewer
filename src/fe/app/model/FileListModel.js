class FileListModel {
	constructor(modelViewHandler){
		this._fileList = [];
		this._dispatchedFiles = [];
		this._handler = modelViewHandler;
	}
	
	apiFileList() {
		let This = this;
		
		$.ajax({
			url : "http://localhost:8080/api/files",
			type : "GET",
			success : function(results) {
				results.forEach(function(result){
					This._fileList.push(result);
					This._handler.emit('add', result);
				})
			},
			xhr : function() {
				var xhr = $.ajaxSettings.xhr();
				return xhr;
			}
		});
	}
	
	dispatchFiles(files) {
		let isUploadingKnow = (this._dispatchedFiles.length != 0) 
		for (let i=0; i<files.length; i++) {
			this._dispatchedFiles.push(files[i]);
			this._handler.emit('dispatched',files[i]);
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
			url : "http://localhost:8080/api/files",
			data : formData,
			contentType : false,
			processData : false,
			type : "POST",
			mimeType : "multipart/form-data",
			success : function(result) {
				console.log(result);
				This._fileList.push(result);
				This._handler.emit('add', result);
			},
			error : function(){
				console.log('ERROR');// 
			},
			xhr : function() {
				var xhr = $.ajaxSettings.xhr();
				xhr.upload.onprogress = function(event) {
//					This._handler.emit('add', /*??*/ ,event.loaded, "/", event.total);
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