class FileListModel {
	constructor(modelViewHandler){
		this._fileList = [];
		this._handler = modelViewHandler;
	}
	getFileList(){
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
}
export default FileListModel;