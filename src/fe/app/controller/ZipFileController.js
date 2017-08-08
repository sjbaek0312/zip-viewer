import ZipFileListModel from "model/ZipFileListModel.js"
import ZipFileTreeModel from "model/ZipFileTreeModel.js"
import ZipFileAction from "model/ZipFileAction.js"
import ZipFileListView from "view/ZipFileListView.js"
import ZipFileTreeView from "view/ZipFileTreeView.js"

class ZipFileController {
	constructor(fileModel){
		this._zipFileListView = new ZipFileListView("#zipFileList"); 
		this._zipFileTreeView = new ZipFileTreeView("#zipFileTree"); 	

		this._zipFileAction = new ZipFileAction(fileModel.fileId);
		this._zipFileTreeModel = new ZipFileTreeModel(fileModel);
		this._zipFileListModel = new ZipFileListModel();

		this.$criticalErrorModal = $("#ErrorModal");
		this.$zipFileModal = $("#zipFileModal");
		
		this._bindActionEvents();
		this._bindModelEvents();
		this._bindListViewEvents();
		this._bindTreeViewEvents();
		
		this._zipFileAction.apiZipFileLoad();
		
		this._startView(fileModel);
		this._bindClickFinishEvent();
		this._bindErrorModalEvents();
		
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
			.on("APIListFail", function(){
				self.$criticalErrorModal.find('.modal-body p').text('error happen')
				self.$criticalErrorModal.modal('show');
			})
			.on("APILoadFail", function(){
				self.$criticalErrorModal.find('.modal-body p').text('error happen')
				self.$criticalErrorModal.modal('show');
			})
			.on("APIDownloadFail", function(){
				self.$zipFileModal.find('.modal-body p').text('download Fail!')
				self.$zipFileModal.modal('show');
			})
	}
	
	_bindModelEvents(){
		let self = this;
		this._zipFileListModel.on("ModelSettingDone", this._zipFileListView.rendering.bind(this._zipFileListView))
		this._zipFileTreeModel.on("ModelSettingDone", this._zipFileTreeView.rendering.bind(this._zipFileTreeView))
	}
	
	_bindListViewEvents(){
		const self = this;
		let dom = this._zipFileListView.getDom();
		
		dom.on("click", ".zipfile", function(event){
			if(self._zipFileListModel.isDirectory(this.dataset.id)) {
				const zipFileId = self._zipFileListModel.getZipfileId(this.dataset.id);
				self._zipFileAction.clickDir(zipFileId);
			} else {
				console.log("Not a directory type");
			}
		});
		dom = null;
	}
	
	_bindTreeViewEvents(){
		this._zipFileTreeView
			.on("APIListNeed:Dir", this._zipFileAction.clickDir.bind(this._zipFileAction))
			.on("APIListNeed:Tree", this._zipFileAction.clickTree.bind(this._zipFileAction))
	}
	
	_startView(root){
		$("#ZipViewerBackground").css("display","block");
	}
	
	_bindClickFinishEvent() {
		let self = this;
		$("#zipFileClose").on("click", function() { 
			self._finish();
		})
	}
	
	_bindErrorModalEvents(){
		this.$criticalErrorModal.on('hidden.bs.modal', this._finish.bind(this));
	}
	
	_finish(){
		$("#ZipViewerBackground").css("display","none");
		$("#zipFileClose").off("click") 
		this.$criticalErrorModal.off('hidden.bs.modal')
		
		this._zipFileTreeView.destroy();
		this._zipFileListView.destroy();
		
		this._zipFileListView = null;
		this._zipFileTreeView = null;

		this._zipFileAction = null;
		this._zipFileTreeModel = null;
		this._zipFileListModel = null;

		this.$zipFileModal = null;
		this.$criticalErrorModal = null;
		
		console.log("zipFileController Finished");
	}
}
export default ZipFileController;
