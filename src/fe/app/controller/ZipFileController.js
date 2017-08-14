import ZipFileListModel from "model/ZipFileListModel.js"
import ZipFileTreeModel from "model/ZipFileTreeModel.js"
import ZipFileListView from "view/ZipFileListView.js"
import ZipFileTreeView from "view/ZipFileTreeView.js"
import { zipFileLoad, zipFileExpire } from 'lib/zipFileAction'

class ZipFileController {
	constructor(fileModel){
		
		this._fileId = fileModel.fileId;
		
		this._zipFileListView = new ZipFileListView("#zipFileList"); 
		this._zipFileTreeView = new ZipFileTreeView("#zipFileTree"); 	

		this._zipFileTreeModel = new ZipFileTreeModel(fileModel);
		this._zipFileListModel = new ZipFileListModel(fileModel.fileId);
		
//		this.$criticalErrorModal = $("#ErrorModal"); //
		this.$zipFileModal = $("#zipFileModal");
		
		this._bindModelEvents()
		this._bindListViewEvents();
		this._bindTreeViewEvents();
		this._bindClickFinishEvent();
//		this._bindContextMenu(); 
		this._startView(fileModel);

		this._zipFileTreeView.start();
//		this._bindErrorModalEvents(); // 
		
		
	}
	
	_bindModelEvents(){ 
		this._zipFileListModel
			.on("ModelSettingDone", this._zipFileListView.rendering.bind(this._zipFileListView))
			.on("APIListFail", this._setErrorMessage.bind(this))
			.on("APIDownloadFail", this._setErrorMessage.bind(this))
			
		this._zipFileTreeModel
			.on("APIListFail", this._setErrorMessage.bind(this))
	}
	
	_bindListViewEvents(){ 
		const self = this;
		let dom = this._zipFileListView.getDom();	
		dom.on("dblclick", ".zipfile", function(evt){
			const fileid = $(this).data('fileid');
			if(self._zipFileListModel.isDir(fileid))
				self._zipFileListModel.apiList(fileid);
			else console.log("Not a directory")
		});
	}
	
	_bindTreeViewEvents(){ 
		let self = this;
//		const APIList = zipFileList(this._fileId);
		const APILoad = zipFileLoad(this._fileId);
		
		this._zipFileTreeView
			.once("APILoadNeed",function(obj, callback){
				APILoad().done(function(res){
					let response = res.items
					self._zipFileTreeModel.initModel(response, obj, callback)
					self._zipFileListModel.setModel(response);
				})
			})
			.on("APIListNeed:Tree", this._zipFileTreeModel.apiList.bind(this._zipFileTreeModel))
			.on("APIListNeed:Dir", this._zipFileListModel.apiList.bind(this._zipFileListModel))
	}
	
	_startView(root){
		$("#ZipViewerBackground").css("display","block");
	}
	
	_bindClickFinishEvent() {
		$("#zipFileClose").on("click", this._finish.bind(this))
	}
	
	_setErrorMessage(errorMessage){
		this.$zipFileModal.find('.modal-body p').text(errorMessage)
		this.$zipFileMoadl.modal('show');
	}
	
	_bindContextMenu(){
		// 다음 pr에 반영.
	}
	
	_finish(){
		$("#ZipViewerBackground").css("display","none");
		$("#zipFileClose").off("click") 
		
		const APIExpire = zipFileExpire(this.fileId);
		
		this._zipFileTreeView.destroy();
		this._zipFileListView.destroy();
		
		this._zipFileListView = null;
		this._zipFileTreeView = null;

		this._zipFileTreeModel = null;
		this._zipFileListModel = null;

		this.$zipFileModal = null;
		this.$criticalErrorModal = null;
		
		APIExpire();
		
		console.log("zipFileController Finished");
	}
}
export default ZipFileController;
