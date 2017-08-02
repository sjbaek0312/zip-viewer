import EventEmitter from 'events';

class ZipFileServiceModel extends EventEmitter {
	constructor(fileId){
		super();
		this._fileId = fileId;
//		this._URL = "http://localhost:8080/api/files/"+this._fileId+"/zipFiles"; //testURL
		this._URL = "/api/files/"+this._fileId+"/zipFiles"; //realURL
		
		this._promiseAPILoad;
		this._promiseAPIList;
	}
	
	_apiZipFileLoad() {
		this._promiseAPILoad = $.ajax({ url : this._URL, type : "POST", dataType: "json", xhr: function(){return $.ajaxSettings.xhr();}});
	}
	
	_apiZipFileList(parentId) {
		let formData = new FormData();
		this._promiseAPIList = $.ajax({
			url : this._URL,
			data : {"zipfileParentId" : parentId},
			type : "GET",
			dataType: "json",
			xhr : function() { 
				let xhr = $.ajaxSettings.xhr();
				return xhr;
			}
		});
	}
	
	apiZipFileRenew() {
		let formData = new FormData();
		formData.append("zipfileParentId",this._fileId);
		$.ajax({ url : this._URL, data : formData, dataType: "json", type : "PATCH" });
	}
	
	apiZipFileExpire() {
		$.ajax({url : this._URL, dataType: "json", type : "DELETE"});
	}
	
	apiZipFileDownload(zipfileId) { //iteration 3
		let downLoadUrl = this._URL + zipfileId;
		$.ajax({
			url : downLoadUrl,
			type : "GET",
			dataType: "json",
		});
	}
}

export default ZipFileServiceModel;
