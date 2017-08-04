import EventEmitter from 'events';

class ZipFileModel {
	constructor(json){
		this.zipfileName = json.zipfileName;
		this.zipfileType = json.zipfileName.slice(json.zipfileName.lastIndexOf(".") + 1).toLowerCase();
		this.zipfileId = json.zipfileId;
		this.zipfileSize = json.zipfileSize;
		this.zipfileParentId = json.zipfileParentId;
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
		this._zipFileList = [];
		jsonArray.forEach(this._pushZipFile, this)
		console.dir(this._zipFileList);
		this.emit("ModelSettingDone", this._zipFileList);
	}
	_pushZipFile(json){
		this._zipFileList.push(new ZipFileModel(json))
	}
}

export default ZipFileListModel;
