class ZipFileTreeView {
	constructor(domId){
		this.$el = $(domId);
		this.$el.jstree({
			"plugins" : [ "wholerow", "changed", "opened" ],
			'core' : {
				'data' : [],
				'themes' : {
					'name' : 'proton'
				}
			},
			'types' : {
				"default" : {
				      "valid_children" : "all"
				 }
			}
		});
		this.$el
			.on("before_open.jstree", function(e,data){
			//	console.log("before open");	
			//	console.dir(data.node.children); 
			})
			.on("select_node.jstree",function(e,data){
			//	console.log("list View 도 바껴야 함!!");
			//	console.dir(data.node);
			})
			.on("model.jstree", function(e, data){
			//	console.log("new DataSet");
			//	console.dir(data);
			})
	}
	
	rendering(model) {
		this.$el.jstree(true).settings.core.data = model;
		this.$el.jstree(true).refresh();
		this.$el.jstree(true).open_node("#");
	}
	
	destroy(){
		this.$el.jstree(true).destroy();
		this.$el = null;
	}
}
export default ZipFileTreeView;
