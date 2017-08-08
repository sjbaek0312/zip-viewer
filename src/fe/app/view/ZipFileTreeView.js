import EventEmitter from 'events';

class ZipFileTreeView extends EventEmitter {
	constructor(domId){
		super();
		this.$el = $(domId);
		this._selectedIdUsingDBLclick;
		this.$el.jstree({
			"plugins" : [ "wholerow" ],
			'core' : {
				'data' : [],
				'themes' : {
					'name' : 'proton'
				},
				'dblclick_toggle' : false
			},
			'types' : {
				"default" : {
				      "valid_children" : "all"
				 }
			}
		});
		
		this._bindDefaultEvents();
	}
	
	_bindDefaultEvents() {
		this.$el
			.on("open_node.jstree", this._openChild.bind(this))
			.on("select_node.jstree", this._getSelectedIdAndDeselected.bind(this))
			.on("dblclick", ".jstree-anchor" ,this._getAllChild.bind(this)) 
	}
	
	_openChild(event, data){
		if(data.node.id+'tempChild' == data.node.children[0]) {
			console.log("temp child. list new one")
			this.$el.jstree(true).close_node(data.node.id)
			this.emit('APIListNeed:Tree', data.node.id)
		} 
	}
	
	_getSelectedIdAndDeselected(event, data){
		if(data.selected.length != 1) {
			this.$el.jstree(true).deselect_node(data.selected);
		} else {
			const temp = data.selected[0];
			data.selected
			this.$el.jstree(true).deselect_node(data.selected);
			
			this._selectedIdUsingDBLclick = temp;
		}
	}
	
	_getAllChild(){ 
		this.emit('APIListNeed:Dir',this._selectedIdUsingDBLclick);
	}
	
	rendering(model) {
		this.$el.jstree(true).settings.core.data = model;
		this.$el.jstree(true).refresh();
		this.$el.jstree(true).open_node("#");
	}
	
	destroy(){
		this.$el.jstree(true).destroy();
		this.$el.off("dblclick");
		this.$el = null;
	}
}
export default ZipFileTreeView;
