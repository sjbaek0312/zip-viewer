let zipFileListTemplate = require("../tpl/ZipFileList.html");

class ZipFileListView {
	constructor(domId){
		this._dom = $(domId);
	}

	rendering(model) {		
		this._dom.html(zipFileListTemplate(model));
	}
}
export default ZipFileListView;
