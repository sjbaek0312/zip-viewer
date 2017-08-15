import EventEmitter from 'events';
import { zipFileList, zipFileDownload } from 'lib/zipFileAction'

class ZipFileModel {
	constructor(json){
		this.zipfileName = json.zipfileName;
		this.zipfileType = json.zipfileName.slice(json.zipfileName.lastIndexOf(".") + 1).toLowerCase();
		this.zipfileId = json.zipfileId;
		this.zipfileSize = json.zipfileSize;
		this.hasDirectory = json.hasDirectory;
		this.zipfileParentId = json.zipfileParentId;
		this.isDirectory = json.isDirectory
		if(json.isDirectory) {
			this.zipfileType = "dir";
			this.zipfileSize = "";
		}
	}
}

class ZipFileListModel extends EventEmitter {
	constructor(rootModelId){
		super();
		this._zipFileList = new Map();
		this._APIList = zipFileList(rootModelId);
		this._APIDownload = zipFileDownload(rootModelId);
	}
	
	apiList(parentId, ancestorId) {
		const self = this;
		this._APIList(parentId)
		.done(function(res){
			let response = res.items
//			console.dir(res);
			self.setModel(response, ancestorId);
		})
		.fail(this._emitListFail.bind(this))
	}
	
	apiDownload(fileId) {
		this._APIDownload(fileId)
			.done(function(res){console.dir(res)})
			.fail(this._emitDownloadFail.bind(this))
	}
		
	setModel(jsonArray, ancestorId){
		this._zipFileList.clear();
		if(jsonArray != null) { // 내부 조회 결과가 빈 값이 아닌 경우.(빈폴더 아님)
			jsonArray.forEach(this._pushZipFile, this)
		}
//		this._zipFileList.set() // zipfileId는 부모 아이디, 그리고 zipfileParentId는 부모의 부모 아이디가 담겨야함!
		this.emit("ModelSettingDone", Array.from(this._zipFileList.values()));
	}
	
	_isRootDepth(json){
		return (json.zipfileParentId==0)
	}
	
	_pushZipFile(json){
		this._zipFileList.set(json.zipfileId ,new ZipFileModel(json))
	}
	
	_emitListFail(res){
		this.emit("APIListFail", res.msg)
	}
	
	_emitDownloadFail(res){
		this.emit("APIDownloadFail", res.msg)
	}

	getFile(fileId){
		return this._zipFileList.get(fileId)
	}

}

export default ZipFileListModel;
