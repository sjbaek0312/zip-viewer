import EventEmitter from 'events';

class ZipFileModel {
	constructor(json){
		this.zipfileName = json.zipfileName;
		this.zipfileType = json.zipfileName.slice(json.zipfileName.lastIndexOf(".") + 1).toLowerCase();
		this.zipfileId = json.zipfileId;
		this.zipfileSize = json.zipfileSize;
		this.zipfileParentId = json.zipfileParentId;
	}
}

class ZipFileListModel extends EventEmitter {
	constructor(){
		super();
		this._zipFileList = [];
	}

	setModel(jsonArray){
		let self = this;
		this._zipFileList = [];
		jsonArray.forEach(function(json){
			self._zipFileList.push(new ZipFileModel(json));
		})
		console.dir(this._zipFileList);
		this.emit("ModelSettingDone", this._zipFileList);
	}
}

export default ZipFileListModel;
