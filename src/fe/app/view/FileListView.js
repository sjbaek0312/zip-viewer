const FileListTemplate = require("tpl/FileList.html");

class FileListView {
	constructor(domId){
		this.$el = $(domId);
	}

	getDomForEventBinding(){
		return this.$el;
	}
	
	rendering(model) {
		let innerDiv = FileListTemplate(model);
		this.$el.prepend(innerDiv);
	}
	removeRendering(fileId) {
		this.$el.children().each(function(){
			if(fileId == $(this).data('fileid')) {
				$(this).remove();
				return false;
			}
			return true;
		})
	}
}
export default FileListView;
