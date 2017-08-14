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
		
//		this.$zipFileEndingModal = $("#ErrorModal"); //
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
			.on("ModelSettingDone:null", this._setErrorMessage.bind(this))
			.on("APIListFail", this._setErrorMessage.bind(this))
			.on("APIDownloadFail", this._setErrorMessage.bind(this))
			
		this._zipFileTreeModel
			.on("APIListFail", this._setErrorMessage.bind(this))
	}
	
	_bindListViewEvents(){ 
		const self = this;
		let dom = this._zipFileListView.getDom();	
		dom
		.on("dblclick", ".zipfile", function(evt){
			const fileid = $(this).data('fileid');
			const file = self._zipFileListModel.getFile(fileid)
			if(file.isDirectory){
				self._zipFileListModel.apiList(fileid, file.zipfileParentId);
				self._zipFileTreeView.loadAndShowNode(fileid)
			}
			else console.log("Not a directory")
		})
		.on("contextmenu", ".zipfile", function(evt){
			evt.preventDefault();
			const fileid = $(this).data('fileid');
			console.dir(fileid)
			const file = self._zipFileListModel.getFile(fileid)
			if(!file.isDirectory){
				self._zipFileListModel.apiDownload(fileid);
			}
		})
	}
	
	_bindTreeViewEvents(){ 
		let self = this;
		const APILoad = zipFileLoad(this._fileId);
		
		const beforeSendFunction = function(a){
			this._zipFileListView.$el.html("Loading...")
		}
		
		this._zipFileTreeView
			.once("APILoadNeed",function(obj, callback){
				APILoad(beforeSendFunction.bind(self)).done(function(res){
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
		console.dir(errorMessage)
		this.$zipFileModal.find('.modal-body p').text(errorMessage)
		this.$zipFileModal.modal('show');
	}
	
	_bindContextMenu(){
		// 다음 pr에 반영.
	}
	
	_finish(){
		$("#ZipViewerBackground").css("display","none");
		$("#zipFileClose").off("click") 
		
		console.dir(this)
		
		const APIExpire = zipFileExpire(this._fileId);
		
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
