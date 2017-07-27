class FileListView {
	constructor(domId){
		console.dir(jQuery(domId));
		this._dom = jQuery(domId);
	}
	rendering(object) {
		let li = $("<li></li>");
		li.attr('id',object.fileId);
		li.text(object.fileName);
		this._dom.append(li);
	}
	removeRendering(objectId) {
		// iteration 3
	}
}
export default FileListView;