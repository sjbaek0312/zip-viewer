import EventEmitter from 'events';

class ZipFileModel {
	constructor(json){
		this.zipfileName = json.zipfileName;
		this.zipfileType = json.zipfileName.slice(json.zipfileName.lastIndexOf(".") + 1).toLowerCase();
		this.zipfileId = json.zipfileId;
		this.zipfileSize = json.zipfileSize;
		this.zipfileParentId = json.zipfileParentId;
		this.isDirectory = json.isDirectory
		if(json.isDirectory) {
			this.zipfileType = "dir";
			this.zipfileSize = "";
		}
	}
}

class ZipFileListModel extends EventEmitter {
	constructor(){
		super();
		this._zipFileList = [];
	}

	setModel(jsonArray){
		this._setFirstList(jsonArray)
		jsonArray.forEach(this._pushZipFile, this)
		this.emit("ModelSettingDone", this._zipFileList);
	}
	
	_setFirstList(jsonArray){
		if (this._isRootDepth(jsonArray[0])) {
			this._zipFileList = [];
		} else {
			this._zipFileList = [{zipfileName: '...', zipfileType: 'dir', zipfileSize: "", isDirectory: true, zipfileId: jsonArray[0].zipfileParentId}]
		}
	}
	
	_isRootDepth(json){
		return (json.zipfileParentId==0)
	}
	
	_pushZipFile(json){
		this._zipFileList.push(new ZipFileModel(json))
	}
	
	getZipfileId(domId){
		return this._zipFileList[domId].zipfileId;
	}
	
	isDirectory(domId){
		return this._zipFileList[domId].isDirectory;
	}
}

export default ZipFileListModel;
