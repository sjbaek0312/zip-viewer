
import EventEmitter from 'events';

class ZipFileModel {
	constructor(json){
		this.id = json.zipfileId;
		this.text = json.zipfileName;
		this.parent = json.zipfileParentId;
		this.state = {selected: true};
	}
}

class TempZipFileModel {
	constructor(json){
		this.id = json.zipfileId + 'tempChild';
		this.parent = json.zipfileId;
	}
}

class ZipFileTreeModel extends EventEmitter {
	constructor(rootModel){
		super();
		this._zipFileTree = new Map();
		this._tempZipFileTree = new Map();
		
		this._zipFileTree.set(0,{"id": 0, "parent": "#", "text": rootModel.fileName, "state": { opened : true }})
	}

	
	setModel(jsonArray) {
		jsonArray.forEach(this._setModelAndAddTempChild, this);
		this._settingDoneEmit();
	}
	
	_setModelAndAddTempChild(json){
		if(json.isDirectory) {
			this._zipFileTree.set(json.zipfileId, new ZipFileModel(json));
			this._tempZipFileTree.set(json.zipfileId, new TempZipFileModel(json));
		}
	}
	
	addModel(jsonArray) {
		jsonArray.forEach(this._addModelAndRemoveTempChild, this);
		this._settingDoneEmit();
	}
	
	_addModelAndRemoveTempChild(json){
		const isDeleted = this._tempZipFileTree.delete(json.zipfileParentId); 
		if(isDeleted) {
			this._zipFileTree.get(json.zipfileParentId).state = {'opened': true }
		}
		
		if(json.isDirectory) {
			this._zipFileTree.set(json.zipfileId, new ZipFileModel(json));
			this._tempZipFileTree.set(json.zipfileId, new TempZipFileModel(json));
		}
	}
	
	_settingDoneEmit(){
		
		let sendModel1 = Array.from(this._zipFileTree.values());
		let sendModel2 = Array.from(this._tempZipFileTree.values());
		
		const sendModel = sendModel1.concat(sendModel2);

		this.emit("ModelSettingDone", sendModel);

	}
	


}
export default ZipFileTreeModel;
