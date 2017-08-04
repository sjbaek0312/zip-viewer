let zipFileListTemplate = require("tpl/ZipFileList.html");

class ZipFileListView {
	constructor(domId){
		this.$el = $(domId);
	}

	rendering(model) {		
		this.$el.html(zipFileListTemplate(model));
	}
}
export default ZipFileListView;
