import EventEmitter from 'events';
import {zipFileList} from 'lib/zipFileAction'

class ZipFileModel {
	constructor(json){
		this.id = json.zipfileId;
		this.text = json.zipfileName;
		this.children = json.hasDirectory;
		this.parent = json.zipfileParentId; 
	}	
}

class ZipFileTreeModel extends EventEmitter { 
	constructor(rootModel){
		super();
		this._zipFileTree = new Map();
		this._setRootModel(rootModel)
		this._APIList = zipFileList(rootModel.fileId)
	}
	_setRootModel(rootModel){
		this._zipFileTree.set(0, {id: 0, text: rootModel.fileName, children: true , parent: '#' ,state: { opened : true }})
	}
	
	apiList(obj, callback){
		const parentId = obj.id
		const self = this;
		this._APIList(parentId).done(function(response){
			let res = response.items
			self.addModel(res, obj, callback)
		})
	}
	
	getPath(zipFileId){
		const pathArray = [];
		let parentId = zipFileId;
		while( parentId != '#') {
			parentId = this._zipFileTree.get(parentId).parent;
			pathArray.push(parentId);
		}
		return pathArray;
	}
	
	initModel(jsonArray, obj, callback) { 
		const dirArray = jsonArray.filter(this._getDirType);
		
		dirArray.forEach(this._setDirModel, this)
		console.dir(this._zipFileTree);
		if(dirArray.length != 0) {
			this._zipFileTree.get(0).children = false;
		}
		callback.call(obj, Array.from(this._zipFileTree.values()))
	}
	
	_getDirType(json){
		return json.isDirectory
	}
	
	_setDirModel(json){
		this._zipFileTree.set(json.zipfileId, new ZipFileModel(json));
	}
	
	_setPortion(json){
		this.push( new ZipFileModel(json) )
	}
	
	addModel(jsonArray, obj, callback) {
		const dirArray = jsonArray.filter(this._getDirType);
		let dir = [];
		dirArray.forEach(this._setDirModel, this)
		dirArray.forEach(this._setPortion, dir);
		callback.call(obj, dir)
	}
	
}
export default ZipFileTreeModel;
