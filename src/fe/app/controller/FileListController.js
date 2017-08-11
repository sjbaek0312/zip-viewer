import FileListModel from "model/FileListModel.js"
import ZipFileController from "controller/ZipFileController.js"
import FileListView from "view/FileListView.js"
import FileUploadStateListView from "view/FileUploadStateListView.js"

import DragAndDropAction from 'lib/DropHandler.js';
//import ContextMenuAction from 'lib/ContextMenuHandler.js'; 

class FileListController {
	constructor(){
		console.log("controller starts..");
		this._view =  new FileListView("#fileList");
		this._uploadStateView = new FileUploadStateListView("#uploadStateList");
		this._model = new FileListModel();

		this._bindModelAndView();
		this._bindStaticDropEvents();

		this._bindViewEvents();
//		this._bindContextMenu();
		
		this._model.apiFileList();
	}
	_bindModelAndView(){
		let self = this;
		this._model
			.on("change:add", this._view.rendering.bind(this._view))
			.on("change:dispatched", this._uploadStateView.rendering.bind(this._uploadStateView))
			.on("progres:uploading", this._uploadStateView.progressRendering.bind(this._uploadStateView))
	}

	_bindStaticDropEvents(){
		$("#dropZone")
			.on("drop", {toModel : this._model}, DragAndDropAction.drop)
			.on("dragover",DragAndDropAction.dragover);
	}
	_bindViewEvents(){ 
		const fileListDom = this._view.getDomForEventBinding()
		fileListDom.on("click", ".file", this._startZipFileController.bind(this));
	}
	_bindContextMenu(){
		const fileListDom = this._view.getDomForEventBinding();
		
		fileListDom.on("contextmenu", ".file", ContextMenuAction.showMainContextView);
		$(document).on("click", ContextMenuAction.hideMainContextView)
	}
	
	_startZipFileController(evt){
		const fileId = $(evt.currentTarget).data('fileid');
		const fileModel = this._model.getFile(fileId)
		if (fileModel.isCompressed()) {
			new ZipFileController(fileModel); 
		}
		else{
			console.log("Not a zip File");
		}
	}
}

export default FileListController;

