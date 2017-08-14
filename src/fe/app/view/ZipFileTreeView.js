import EventEmitter from 'events';

class ZipFileTreeView extends EventEmitter {
	constructor(domId){
		super();
		this.$el = $(domId);
		this._prevSelectedNode;
	}
	
	start(){
		this.$el.jstree({
			"plugins" : [ "wholerow" ],
			'core' : {
				'data' : this._dataLoadFunction.bind(this),
				'themes' : {
					'name' : 'proton'
				},
				'dblclick_toggle': false,
				'check_callback' : true
			}
		});
		
		this._bindDefaultEvents();
	}

	
	_dataLoadFunction(obj, callback){
		console.dir(obj)
		if(obj.id == '#') { // if root
			this.emit('APILoadNeed', obj, callback);
		} else {
			this.emit('APIListNeed:Tree', obj, callback); // Tree가 필요할 때
		}
	}

	_bindDefaultEvents() {
		this.$el
			.on("dblclick", ".jstree-container-ul", this._APIListNeed.bind(this))
	}
	
	_APIListNeed(evt){
//		console.dir(evt);
		const node = this.$el.jstree(true).get_selected();
		let selectedNodeId = node[0]; // 
		let parentId = this.$el.jstree(true).get_node(selectedNodeId).parent
		if(parentId == '#'){
			parentId = undefined;
			selectedNodeId = 0
		}
		this.emit('APIListNeed:Dir', selectedNodeId, parentId); 
		this.loadAndShowNode(selectedNodeId)
	}
	
	loadAndShowNode(id){

		const nodeInfo = this.$el.jstree(true).get_node(id)
//		console.dir(nodeInfo.state);
		if(!nodeInfo.state.loaded) 
			this.$el.jstree(true).load_node(id)
		this.$el.jstree(true).open_node(id)

		this.$el.jstree(true).deselect_node(this._prevSelectedNode)
		this.$el.jstree(true).select_node(id);
		this._prevSelectedNode = id;
		this.getSelectedNode();

	}
	
	getSelectedNode(){  // 더 만들어야 함.
		const a = this.$el.jstree(true).get_selected(true)
		console.log("selected : " + a)
	}	
	destroy(){
		this.$el.jstree(true).destroy();
		this.$el.off("dblclick")
		this.$el = null;
	}
}
export default ZipFileTreeView;
