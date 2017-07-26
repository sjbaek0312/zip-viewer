/**
 * 
	constructor(domId){
	//	console.log(jQuery(domId+""));
	//	console.log($(domId)); -> 이거 왜 안먹힌거지...?
		this.$_dom = jQuery(domId);

}
 */
class FileListView {
	constructor(domId){
		super.();
		this.$_dom = domId;
	}
	InitialRendering(objectArray) {
		$(this.$_dom)
		// 한개의 modelObject에 대해 처리하는 부분.
	}
	
}

export default FileListView;