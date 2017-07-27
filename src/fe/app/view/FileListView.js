class FileListView {
	constructor(domId){
		console.dir(jQuery(domId));
		this._dom = jQuery(domId);
		console.log(this._dom);
	}
	rendering(object) {
		let li = $("<li></li>");
		li.attr('id',object.fileId);
		li.text(object.fileName);
		this._dom.append(li);
	}
	removeRendering(objectId) {
		//
	}
}
export default FileListView;