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
				'check_callback' : true,
				'animation': false
			}
		});
		
		this._bindDefaultEvents();
	}

	
	_dataLoadFunction(obj, callback){
	//	console.dir(obj)
		if(obj.id == '#') { // if root
			this.emit('LoadNeed', callback.bind(obj));
		} else {
			this.emit('ListNeed:Tree', obj.id ,callback.bind(obj)); // TreeView 에서 필요한 값이 필요하다 알린다.
		}
	}

	_bindDefaultEvents() {
		this.$el
			.on("dblclick", ".jstree-container-ul", this._listNeed.bind(this))
	}
	
	_listNeed(evt){
		const node = this.$el.jstree(true).get_selected();
		let selectedNodeId = node[0]; // 
		let parentId = this.$el.jstree(true).get_node(selectedNodeId).parent
		if(parentId == '#'){
			parentId = undefined;
			selectedNodeId = 0
		}
		this.emit('ListNeed:List', selectedNodeId, this.loadAndShowNode.bind(this)); 
	}
	
	loadAndShowNode(id) { 
		const nodeInfo = this.$el.jstree(true).get_node(id)
		if(!nodeInfo.state.loaded) 
			this.$el.jstree(true).load_node(id)
		this.$el.jstree(true).open_node(id)
		this.$el.jstree(true).deselect_node(this._prevSelectedNode)
		this.$el.jstree(true).select_node(id);
		this._prevSelectedNode = id;
	}
	
	destroy(){
		this.$el.jstree(true).destroy();
		this.$el.off()
		this.$el = null;
	}
}
export default ZipFileTreeView;
