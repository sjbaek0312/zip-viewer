import ZipFileModels from "model/ZipFileModels.js"
import ZipFileListView from "view/ZipFileListView.js"
import ZipFileTreeView from "view/ZipFileTreeView.js"
import ContextMenuHandler from "lib/ContextMenuHandler.js"

class ZipFileController {
	constructor(fileModel, errorCallback){
		
		this._errorCallback = errorCallback;
		this._fileId = fileModel.fileId;
		this._zipFileListView = new ZipFileListView("#zipFileList"); 
		this._zipFileTreeView = new ZipFileTreeView("#zipFileTree"); 	

		this._zipFileModel = new ZipFileModels(fileModel);
		this.$Modal = $("#zipFileModal");
		
		this._bindModelEvents()
		this._bindListViewEvents();
		this._bindTreeViewEvents();
		this._bindClickFinishEvent();
		this._startView(fileModel);

		this._zipFileTreeView.start();
	}
	
	_bindModelEvents(){ 
		this._zipFileModel 
		.on("LoadDone", this._zipFileListView.rendering.bind(this._zipFileListView))
		.on("ListDone", this._zipFileListView.rendering.bind(this._zipFileListView))
		.on("APIListFail", this._setErrorMessage.bind(this))
		.on("APIFail", this._setErrorMessage.bind(this))
	}
	
	_bindListViewEvents(){ 
		const self = this;
		let dom = this._zipFileListView.getDom();	
		dom
		.on("dblclick", ".zipfile", function(evt){
			const fileid = $(this).data('fileid');
			self._zipFileModel.ListAllChildren(fileid, self._zipFileTreeView.loadAndShowNode.bind(self._zipFileTreeView))
		})
		.on("contextmenu", ".zipfile", function(evt){
			evt.preventDefault();
			const fileid = $(this).data('fileid');
			try{
				const downloadURL = self._zipFileModel.getDownloadPath(fileid)
				ContextMenuHandler.showZipFileContextView(evt, downloadURL);
			}catch(err){
				console.log(err)
			}
		})
	}
	
	_bindTreeViewEvents(){ 
		let self = this;
		
		this._zipFileTreeView
			.once("LoadNeed", this._zipFileModel.Load.bind(this._zipFileModel))	
			.on("ListNeed:Tree", this._zipFileModel.ListDirChildren.bind(this._zipFileModel)) // tree 뷰만 바뀌는 경우.
			.on("ListNeed:List", this._zipFileModel.ListAllChildren.bind(this._zipFileModel)) // list 뷰만 바뀌는 경우.
	}
	
	_startView(root){
		$("#ZipViewerBackground").css("display","block");
	}
	
	_bindClickFinishEvent() {
		$("#zipFileClose").on("click", this._finish.bind(this))
	}
	
	_setErrorMessage(errorMessage){
		console.dir(errorMessage)
		if(typeof errorMesssage == 'Object'){
			this.$Modal.find('.modal-body p').text(errorMessage.responseText)
		} else {
			this.$Modal.find('.modal-body p').text("Error Happen")
		}
		this.$Modal.modal('show');
		this._errorCallback();
	}

	
	_finish(){
		$("#ZipViewerBackground").css("display","none");
		$("#zipFileClose").off("click") 
		
		this._zipFileTreeView.destroy();
		this._zipFileListView.destroy();
		
		this._zipFileListView = null;
		this._zipFileTreeView = null;
		
		this._zipFileModel.Expire();
		this._zipFileModel = null;

		this.$Modal = null;
		this._errorCallback = null;

		console.log("zipFileController Finished");
	}
}
export default ZipFileController;
