const uploadStateTemplate = require("tpl/UploadState.html");
class FileUploadStateListView {
	constructor(domId){
		this.$el = $(domId);
	}
	rendering(model) {
		$('#uploadStateButton').removeClass('disabled')
		this.$el.append(uploadStateTemplate(model));
	}
	progressRendering(model){
		this.$el.find('#'+model.id).replaceWith(uploadStateTemplate(model));
	}
}
export default FileUploadStateListView;

