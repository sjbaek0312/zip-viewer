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
	
		let div;
		if (this.$el.children().length%6 === 0)
			div = $("<div></div>").attr("class", "row");
		else
			div = this.$el.children().first();
		
		div.prepend(innerDiv);
		this.$el.prepend(div);
	}
	removeRendering() {
		// iteration 3
	}
}
export default FileListView;
