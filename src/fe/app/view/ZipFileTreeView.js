import EventEmitter from 'events';

class ZipFileTreeView extends EventEmitter {
	constructor(domId){
		super();
		this.$el = $(domId);
	}
	
	start(){
		this.$el.jstree({
			"plugins" : [ "wholerow" ],
			'core' : {
				'data' : this._dataLoadFunction.bind(this),
				'themes' : {
					'name' : 'proton'
				},
				'check_callback' : true
			}
		});
		
		this._bindDefaultEvents();
	}
	
	_dataLoadFunction(obj, callback){
		if(obj.id == '#') { // if root
			this.emit('APILoadNeed', obj, callback);
		} else {
			this.emit('APIListNeed:Tree', obj, callback); // Tree가 필요할 때
		}
	}

	_bindDefaultEvents() {
		this.$el
			.on("dblclick", this._APIListNeed.bind(this))
	}
	
	_APIListNeed(evt){
		console.dir(evt);
		let node = this.$el.jstree(true).get_selected();
		console.log(node);
		this.emit('APIListNeed:Dir', node, null); 
		
	}
	
	destroy(){
		this.$el.off("dblclick")
		this.$el.jstree(true).destroy();
		this.$el = null;
	}
}
export default ZipFileTreeView;
