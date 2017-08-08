import EventEmitter from 'events';

class ZipFileAction extends EventEmitter {
	constructor(fileId){
		super();
		this._fileId = fileId;
//		this._URL = "http://localhost:8080/api/files/"+this._fileId+"/zipfiles"; //testURL
		this._URL = "/api/files/"+this._fileId+"/zipfiles"; //realURL
		this._promiseAPIList;
	}
	
	clickDir(parentId){
		let self = this;

		this._apiZipFileList(parentId);
		this._promiseAPIList.done(function(response){
			  self._apiZipFileRenew();
			  self.emit("APIListDone:Dir",response.items);
		 })
	}
	
	clickTree(parentId){
		let self = this;
		this._apiZipFileList(parentId);
		this._promiseAPIList.done(function(response){
			 self._apiZipFileRenew();
			 self.emit("APIListDone:Tree",response.items);
		 })
	}

	apiZipFileLoad() {
		let self = this;
		let promiseAPILoad = $.ajax({ url : this._URL, type : "POST", dataType: "json", xhr: function(){return $.ajaxSettings.xhr();}});
		promiseAPILoad.done(function(response){
			self.emit("APILoadDone",response.items);
			self._apiZipFileRenew();
		});
		promiseAPILoad.fail(function(){
			self.emit("APILoadFail");
		})
	}
	
	_apiZipFileList(parentId) {
		let self = this;
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
		this._promiseAPIList.fail(function(){
			self.emit("APIListFail");
		});
	}
	
	_apiZipFileRenew() {
		$.ajax({ url : this._URL, dataType: "json", type : "PATCH" });
	}
	
	apiZipFileExpire() {
		$.ajax({url : this._URL, dataType: "json", type : "DELETE"});
	}
	
	apiZipFileDownload(zipFileId) {
		let promiseAPIDownload = $.ajax({url : this._URL, data : {"zipfileId" : zipFileId}, type : "GET"});
		promiseAPIDownload.fail(function(){
			self.emit("APIDownloadFail");
		});
	}
}

export default ZipFileAction;
