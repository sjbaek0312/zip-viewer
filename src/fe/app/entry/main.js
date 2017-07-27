/**
 * logic start here
 */


import FileListModel from "../model/FileListModel.js"
import FileListView from "../view/FileListView.js"
import FileUploadStateListView from "../view/FileUploadStateListView.js"
import ModelViewHandler from "../controller/ModelViewHandler.js"
import FileListController from "../controller/FileListController.js"


$(document).ready(function(){
	let fileListView = new FileListView("#fileList");
	let uploadStateView = new FileListView("#uploadStateList");
	let modelViewHandler = new ModelViewHandler(fileListView, uploadStateView);
	let fileListModel = new FileListModel(modelViewHandler);
	let fileController = new FileListController(fileListView, fileListModel);
})
