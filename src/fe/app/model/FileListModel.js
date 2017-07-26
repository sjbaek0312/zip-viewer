/**
 *  
 */
class FileListModel { 
	constructor(fileListView) {
		this._view = fileListView;
		this._fileList = new Array(); //객체 배열.
	}
	init(obejcts){
		objects.forEach(this._fileList.push(object));
		_view.InitRendering();
	}
	add(object){
		
	}
}

export default FileListModel;