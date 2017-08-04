class ZipFileTreeView {
	constructor(domId){
		this.$el = $(domId);
	}
	
	rendering(model) {
		this.$el.jstree({
			"plugins" : [ "wholerow" ],
			'core' : {
				'data' : model,
				'themes' : {
					'name' : 'proton'
				}
			}
		});
	}
}
export default ZipFileTreeView;
