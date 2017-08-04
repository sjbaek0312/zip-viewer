class FileListView {
	constructor(domId){
		this.$el = $(domId);
		this._imgUrl = "/static/img/"
	}

	getDomForEventBinding(){
		return this.$el;
	}
	rendering(json) {
		let innerDiv = $("<div></div>").addClass("col-xs-2 file").data("fileId",json.fileId);
		let img = $("<img></img>").css("height", "100px").addClass("media-object");
		img.attr("src", this._imgUrl + "file-" + json.fileType + ".png").attr("onerror","this.src='"+ this._imgUrl +"file-common.png'"); 
		
		let name = $("<h5></h5>").text(json.fileName).addClass("filename");
		innerDiv.append(img).append(name);
	
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
