let zipFileListTemplate = require("tpl/ZipFileList.html");

class ZipFileListView {
	constructor(domId){
		this.$el = $(domId);
		console.log("this is a dom element : " +this.$el);
	}
	

	rendering(model) {	
		this.$el.html(zipFileListTemplate(model));
	}
	
	destroy(){ 
		this.$el.off();
		this.$el.empty();
		this.$el = null;
	}
	getDom(){
		return this.$el;
	}
}
export default ZipFileListView;
