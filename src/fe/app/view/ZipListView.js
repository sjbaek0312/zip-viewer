class ZipListView {
	constructor(domId){
		this._dom = jQuery(domId);
	}

	getDomForEventBinding(){
		return this._dom;
	}
	
	rendering(json) {

	}
}
export default ZipListView;
