import EventEmitter from 'events';
class zipNodeModel {
	constructor(json){
		//Data
		this.zipfileId = json.zipFileId;
		this.zipfileName = json.zipfileName;
		this.zipfileType = this.zipFileName.slice((json.zipfileName.lastIndexOf(".") + 1));
		this.zipfileSize = json.zipfileSize;
		this.isDirectory = json.isDirectory;
		
		//refernce types
		this.zipfileParentId = json.zipfileParentId;
		this.children = json.items; 
	}	
}

class ZipModel extends EventEmitter {
	constructor(fileId){
		super();
		this._fileId = fileId;
		this._URL = "/api/files/"+this._fileId+"/zipFiles"
		this._header; // 현재 어디 노드를 가리키고 있는가?
		this._root; // Node 타입이 들어감.
	}
	_addNode(json){
		
	}
	apiZipFileLoad() {
		let This = this;
//		let formData = FormData();
//		formData.append("fileId",this._fileId);
		$.ajax({
			url : "/api/files/"+This._fileId+"/zipfiles",
//			data : formData,
			type : "POST",
			success : function(results) {
			},
			xhr : function() {
			}
		});
	}

	apiZipFileRenew() {
		let This = this;
		let formData = new FormData();
		formData.append("zipfileParentId", null); //zipfilePatrentId
		$.ajax({
			url : "/api/files/"+fileId+"/zipfiles",
			type : "PATCH",
			success : function(result) {
			},
			error : function(){
			},
			xhr : function() {
			}
		}).always(function() {
		});
	}
}
export default FileListModel;
