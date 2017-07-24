/**
 * 
 */
class FileListModel  {
	constructor(){
		this._fileList; //배열.
		this._
	}
	getModel(eventHandler,eventName){
		console.log("Logic : getting fileList From Server");
		eventHandler.emit(eventName); // callback if done.
	}
	addModel(eventHandler,eventName){
		console.log("Logic : addModel.");
		eventHandler.emit(eventName);
	}
}

export default FileListModel