
import EventEmitter from 'events';

class ZipFileModel {
	constructor(json){
		this.text = json.zipfileName;
		this.id = json.zipfileId;
		this.parent = json.zipfileParentId;
	}
}

class ZipFileTreeModel extends EventEmitter {
	constructor(){
		super();
		this._zipFileTree = [];
		// 생성자로 부터 root 파일 이름을 넘겨 받아야 할 것 같다.
	}
	
	setModel(jsonArray){
		let self = this;
		
		this._zipFileTree[0] = {"id": 0, "parent": "#", "text": "TEMP ROOT", "state": { "opened": true}}; 
		jsonArray.forEach(function(json){
			if(json.isDirectory) {
				self._zipFileTree.push(new ZipFileModel(json));
				self._zipFileTree.push(self._makeTrashChild(json));
			}
			// 쓰레기 자식값을 넣어줘야함.
		})
		this.emit("ModelSettingDone", this._zipFileTree);
	}
	_makeTrashChild(json){
		let trashId = json.zipfileId+"temp";
		console.log(trashId);
		return {"id": trashId ,"parent": json.zipfileId}
	}
	
	addModel(jsonArray){
		let self = this;
		jsonArray.forEach(function(json){
			if(json.isDirectory)
				self._zipFileTree.push(new ZipFileModel(json));
			// 기존 쓰레기 값을 지우고 addModel 해줘야함.
		})
		console.dir(this._zipFileTree);
	}

}
export default ZipFileTreeModel;
