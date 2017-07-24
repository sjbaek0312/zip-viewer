/**
 * logic start here
 */
import FileListController from "./controller/FileListController.js"
import FileListModel from "./model/FileListModel.js"
import FileListView from "./view/FileListView.js"

$(document).ready(function(){
	let fileListModel = new FileListModel();
	let fileListView = new FileListView("#fileListView");//
	let fileListcontroller = new FileListController(fileListModel, fileListView);
})
