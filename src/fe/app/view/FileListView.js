class FileListView {
	constructor(domId){
		console.log(domId+" view Create..");
		this._dom = $(domId);
		this._imgUrl = "/static/img/" 
	}

	getDomForEventBinding(){
		return this._dom;
	}
	rendering(json) {
		let innerDiv = $("<div></div>").addClass("col-xs-2 file").data("fileId",json.fileId);
		let img = $("<img></img>").css("height", "100px").addClass("media-object");
		img.attr("src", this._imgUrl + "file-" + json.fileType + ".png").attr("onerror","this.src='"+ this._imgUrl +"file-common.png'"); 
		
		let name = $("<h5></h5>").text(json.fileName).addClass("filename");
		innerDiv.append(img).append(name);
	
		let div;
		if (this._dom.children().length%6 === 0)
			div = $("<div></div>").attr("class", "row");
		else
			div = this._dom.children().last();
		
		div.append(innerDiv);
		this._dom.append(div);
	}
	removeRendering() {
		// iteration 3
	}
}
export default FileListView;
