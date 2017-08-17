import EventEmitter from 'events';
import FileSizeMaker from 'lib/FileSizeMaker.js';
import {zipFileLoad, zipFileList, zipFileDownload, zipFileRenew, zipFileExpire} from 'lib/zipFileAction'

class zipFileModel {
	constructor(json) {
		this.text = json.zipfileName
		this.type = json.zipfileName.slice(json.zipfileName.lastIndexOf(".") + 1).toLowerCase();
		this.id = json.zipfileId;
		this.children = json.hasDirectory;
		this.parent = json.zipfileParentId;
		this.isDirectory = json.isDirectory
		this.size;
		if(json.isDirectory) {
			this.type = "dir";
		} else if (json.zipfileSize > 0) {
			this.size = FileSizeMaker.calculateSize(json.zipfileSize)
		}
		this.loaded = false
	}
}

class ZipFileModels extends EventEmitter {
	constructor(root) {
		super();
		this._models = new Map();
		this._setRoot(root)
		
		this._APILoad = zipFileLoad(root.fileId);
		this._APIList = zipFileList(root.fileId);
		this._APIRenew = zipFileRenew(root.fileId);
		this._APIDownload = zipFileDownload(root.fileId);
		this._APIExpire = zipFileExpire(root.fileId);
	}
	
	_setRoot(root){
		const rootObject = {
				id: 0,
				text: root.fileName,
				parent: '#',
				state: { opened : true },
				isDirectory : true
		}
		this._models.set(0, rootObject)
	}
	
	Load(callback){
		const self = this
		let dirObject;
		let allObject
		this._APILoad(null).done(function(res){
			const root = self._models.get(0);
			
			self._addModels(0, res);

			dirObject = self._getDirChildren(0);
			dirObject.push(root); // root 추가해줘야함.
			callback(dirObject);

			allObject = self._getAllChildren(0);
			self.emit('LoadDone', allObject);
		})
	}
	
	_addModels(parentId, response){
		const jsonArray = response.items;
		this._models.get(parentId).loaded = true;
		if(jsonArray != null) { 
			if(jsonArray[0].zipfileParentId != parentId) {
				this._models.get(parentId).loaded = false;
				throw "Cache removed... Click Again..."
			}
			jsonArray.forEach(this._pushModel, this)
		} 
	}
	
	_pushModel(json){
		this._models.set(json.zipfileId ,new zipFileModel(json))
	}
	
	ListAllChildren(parent, callback){ 
		const self = this;
		let parentId = parent;
		if( typeof parent == 'string')
			parentId = parseInt(parent);
		if (!this._models.get(parentId).isDirectory){
			throw "Not a directory";
		}
		
		if (this._models.get(parentId).loaded ) { // 이미 받은 것 있음.
			console.log("AlreadyExist")
			this._makeAllChildrenAndCallback(parentId, callback);
			this._APIRenew();
		} else {
			this._APIList(parentId)
			.done(function(res){
				self._addModels(parentId, res);
				self._makeAllChildrenAndCallback(parentId, callback);
			})
			.fail(this._emitListFail.bind(this))
		}
	}
	
	_makeAllChildrenAndCallback(parentId, callback){
		const object = this._getAllChildren(parentId)
		callback(parentId);
		this.emit('ListDone', object);
	}
	
	_getAllChildren(byParentId){
		const result = [];
		if(byParentId != 0) {
			const ancestorId = this._models.get(byParentId).parent
			result.push({id: ancestorId,text: '...', type: 'dir', isDirectory: true})
		}
		this._models.forEach(function(value){
			if(value.parent == byParentId)
				result.push(value)
		})
		return result
	}
	
	ListDirChildren(parent, callback) { // Tree View -> callback으로 일이 진행.
		const self = this;
		let parentId = parent;
		if( typeof parent == 'string')
			parentId = parseInt(parent);
		if (!this._models.get(parentId).isDirectory){
			throw "Not a directory";
		} else if (this._models.get(parentId).loaded ) { // 이미 받은 것 있음.
			console.log("AlreadyExist")
			this._makeDirChildrenAndCallback(parentId, callback)
			this._APIRenew();
		} else {
			this._APIList(parentId)
			.done(function(res){
				self._addModels(parentId, res);
				self._makeDirChildrenAndCallback(parentId, callback)
			})
			.fail(this._emitListFail.bind(this))
		}
	}
	
	_makeDirChildrenAndCallback(parentId, callback) {
		const object = this._getDirChildren(parentId)
		callback(object);
	}
	
	_getDirChildren(byParentId){
		const result = [];
		this._models.forEach(function(value){
			if(value.isDirectory && value.parent == byParentId)
				result.push(value)
		})
		return result
	}
	
	Expire(){
		this._APIExpire();
	}
	
	getDownloadPath(zipFileId){
		if(this._models.get(zipFileId).isDirectory)
			throw "Can't Download Directory Type"	
		return this._APIDownload(zipFileId)
	}
	
	_emitListFail(res){
		this.emit("APIListFail", res.msg)
	}
	
	_emitDownloadFail(res){
		this.emit("APIDownloadFail", res.msg)
	}

}

export default ZipFileModels;
