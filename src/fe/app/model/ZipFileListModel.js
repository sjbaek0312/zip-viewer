import ZipFileServiceModel from "./ZipFileServiceModel.js";
class ZipFileModel {
	constructor(json){
		this.zipfileName = json.zipfileName;
		this.zipfileType = json.zipfileName.slice((json.zipfileName.lastIndexOf(".") + 1));;
		this.zipfileId = json.zipfileId;
		this.zipfileSize = json.zipfileSize;
		this.zipfileParentId = json.zipfileParentId;
	}
}

class ZipFileListModel extends ZipFileServiceModel {
	constructor(fileId){
		super(fileId);
		this._zipFileList = [];
	}
	apiZipFileLoad(){
		this._apiZipFileLoad();
		this._promiseAPILoad.done(this._loadSuccess);
		this._promiseAPILoad.fail();
	}
	_loadSuccess(response){
		this._zipFileList = [];
		let zipFiles = response.items;
		zipFiles.forEach(function(zipFile) {
			let zipFileModel = new ZipFileModel(zipFile);
			this._zipFileList.push(zipFileModel);
		});
		console.dir(this._zipFileList);
	}
}
export default ZipFileListModel;