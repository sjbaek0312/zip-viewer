/**
 * logic start here
 */


import FileListModel from "../model/FileListModel.js"
import FileListView from "../view/FileListView.js"
import ModelViewHandler from "../controller/ModelViewHandler.js"
import FileListController from "../controller/FileListController.js"


$(document).ready(function(){
	let fileListView = new FileListView("#fileList");
	let modelViewHandler = new ModelViewHandler(fileListView);
	let fileListModel = new FileListModel(modelViewHandler);
	let fileController = new FileListController(fileListView, fileListModel);
})
