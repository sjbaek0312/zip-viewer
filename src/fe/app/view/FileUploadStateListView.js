/**
 * 
 */
class FileUploadStateListView {
	constructor(domId){
		console.dir(jQuery(domId));
		this._dom = jQuery(domId);
	}
	rendering(Object) {
		let li = $("<li>"+Object.name+"</li>");
		li.attr('id',Object.name); // Object.name이 그닥 좋은 생각은 아닌 듯 하다.
		li.text(object.fileName);
		this._dom.append(li);
	}
	progressRendering(id, progress) {
		let li = this._dom.find("#"+id);
		li.text(progress);
	}
}
export default FileUploadStateListView;