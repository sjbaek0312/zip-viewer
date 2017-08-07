import ZipFileListModel from "model/ZipFileListModel.js"
import ZipFileTreeModel from "model/ZipFileTreeModel.js"
import ZipFileAction from "model/ZipFileAction.js"
import ZipFileListView from "view/ZipFileListView.js"
import ZipFileTreeView from "view/ZipFileTreeView.js"

class ZipFileController {
	constructor(fileId){
		this._zipFileListView = new ZipFileListView("#zipFileList"); 
		this._zipFileTreeView = new ZipFileTreeView("#zipFileTree"); 

		this._zipFileAction = new ZipFileAction(fileId);
		this._zipFileTreeModel = new ZipFileTreeModel();
		this._zipFileListModel = new ZipFileListModel();
		
		this._bindActionEvents();
		this._bindModelEvents();
		this._bindViewEvents();
		
		this._zipFileAction.apiZipFileLoad();
		
		this._startView();
		
		this._bindClickFinishEvent();
	}
	
	_bindActionEvents(){
		let self = this;
		this._zipFileAction
			.on("APILoadDone", function(jsonArray) {
				self._zipFileListModel.setModel(jsonArray);
				self._zipFileTreeModel.setModel(jsonArray);
			})
			.on("APIListDone:Dir", function(jsonArray) {
				self._zipFileListModel.setModel(jsonArray);
				self._zipFileTreeModel.addModel(jsonArray);
			})
			.on("APIListDone:Tree", function(jsonArray) {
				self._zipFileTreeModel.addModel(jsonArray);
			})
	}
	
	_bindModelEvents(){
		let self = this;
		this._zipFileListModel.on("ModelSettingDone", this._zipFileListView.rendering.bind(this._zipFileListView))
		this._zipFileTreeModel.on("ModelSettingDone", this._zipFileTreeView.rendering.bind(this._zipFileTreeView))
	}
	
	_bindViewEvents(){
		const self = this;
		let dom = this._zipFileListView.getDom();
		
		dom.on("click", ".zipfile", function(event){
			console.dir(event);
			if(self._zipFileListModel.isDirectory(this.dataset.id)) {
				const zipFileId = self._zipFileListModel.getZipfileId(this.dataset.id);
				self._zipFileAction.clickDir(zipFileId);
			} else {
				console.log("Not a directory type");
			}
		});
		
		dom = null;
	}
	
	_startView(){
		$("#ZipViewerBackground").css("display","block");
	}
	
	_bindClickFinishEvent() {
		let self = this;
		$("#zipFileClose").one("click", function() { 
			$("#ZipViewerBackground").css("display","none");
			self._finish();
		})
	}
	_finish(){
		this._zipFileTreeView.destroy();
		this._zipFileListView.destroy();
		
		this._zipFileListView = null;
		this._zipFileTreeView = null;

		this._zipFileAction = null;
		this._zipFileTreeModel = null;
		this._zipFileListModel = null;

		console.log("zipFileController Finished");
	}
}
export default ZipFileController;
