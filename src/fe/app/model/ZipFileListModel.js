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
	
	apiList(parentId) {
		const self = this;
		this._APIList(parentId)
		.done(function(res){
			let response = res.items
			console.dir(res);
			self.setModel(response);
		})
		.fail(this._emitListFail.bind(this))
	}
	
	apiDownload(fileId) {
		this._APIDownload(fileId)
			.fail(this._emitDownloadFail.bind(this))
	}
		
	setModel(jsonArray){
		this._zipFileList.clear();
		this._setFirstList(jsonArray)
		jsonArray.forEach(this._pushZipFile, this)
		this.emit("ModelSettingDone", Array.from(this._zipFileList.values()));
	}
	
	_setFirstList(jsonArray){
		if (!this._isRootDepth(jsonArray[0])) {
			this._zipFileList.set( jsonArray[0].zipfileParentId ,{zipfileName: '...', zipfileType: 'dir', zipfileSize: "", isDirectory: true, zipfileId: jsonArray[0].zipfileParentId})
		}
	}
	
	_isRootDepth(json){
		return (json.zipfileParentId==0)
	}
	
	_pushZipFile(json){
		this._zipFileList.set(json.zipfileId ,new ZipFileModel(json))
	}
	
	_emitListFail(res){
		this.emit("APIListFail",res)
	}
	
	_emitDownloadFail(res){
		this.emit("APIDownloadFail", res)
	}

	isDir(fileId){
		return this._zipFileList.get(fileId).isDirectory;
	}

}

export default ZipFileListModel;
