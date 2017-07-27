/**
 * 
 */
class FileListController {
	constructor(View, Model){
		this._view = View;
		this._model = Model;
		console.log(this._model);
		this._model.getFileList();
	}
}
export default FileListController;