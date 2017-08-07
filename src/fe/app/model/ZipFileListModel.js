import EventEmitter from 'events';

class ZipFileModel {
	constructor(json){
		this.zipfileName = json.zipfileName;
		this.zipfileType = json.zipfileName.slice(json.zipfileName.lastIndexOf(".") + 1).toLowerCase();
		this.zipfileId = json.zipfileId;
		this.zipfileSize = json.zipfileSize;
		this.zipfileParentId = json.zipfileParentId;
		this.isDirectory = json.isDirectory
		if(json.isDirectory) 
			this.zipfileType = "dir";
	}
}

class ZipFileListModel extends EventEmitter {
	constructor(){
		super();
		this._zipFileList = [];
	}

	setModel(jsonArray){
		console.dir(jsonArray);
		this._zipFileList = [];
		jsonArray.forEach(this._pushZipFile, this)
		this.emit("ModelSettingDone", this._zipFileList);
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
