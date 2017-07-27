/**
 * 
 */
import DragAndDropAction from './DropHandler.js';
class FileListController {
	constructor(View, Model){
		this._view = View;
		this._model = Model;
		this.bindDropEvents();
		
		this._model.apiFileList();
	}
	bindDropEvents(){
		$("#dropZone").on("drop", {toModel : this._model}, DragAndDropAction.drop);
		$("#dropZone").on("dragover",DragAndDropAction.dragover);
	}
}

export default FileListController;