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
		this._zipFileListModel.on("ModelSettingDone", function(ModelArray){
			self._zipFileListView.rendering(ModelArray);
		})
		this._zipFileTreeModel.on("ModelSettingDone", function(ModelArray){
			console.log("hihihihih");
			console.dir(ModelArray);
			self._zipFileTreeView.rendering(ModelArray);
		})
	}
	
	_bindViewEvents(){
		// 
	}
	_startView(){
		$("#ZipViewerBackground").css("display","block");
	}
	_bindClickFinishEvent() {
		let self = this;
		$("#zipFileClose").on("click", function(){
			$("#ZipViewerBackground").css("display","none");
			serf._finish();
		})
	}
	_finish(){
		console.log("자원 종료 로직.");
	}
}
export default ZipFileController;
