/**
 * 
 */
class FileListView {
	constructor(domId){
	//	console.log(jQuery(domId+""));
	//	console.log($(domId)); -> 이거 왜 안먹힌거지...?
		this.$_dom = jQuery(domId);
	}
	updateView(){
		console.log("Update View...")
	}
}

export default FileListView;