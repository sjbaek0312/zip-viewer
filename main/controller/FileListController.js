/**
 * 
 */
const EventEmitter = require('events');
class FileListController extends EventEmitter {
	constructor(FileListModel, FileListView/*, UploadModule*/){
		super();
		
		//register Model and Views.
		this._fileListModel = FileListModel;
		this._fileListView = FileListView;
//		this._uploadModule = UpdateStateItemListView;
//		

		_bindEvents();
		
		this._fileListModel.getModel(this, "notifyGetFileListDone");
		// model 받아옴.
	}
	_bindEvents(){ //model 변경시 일어나느 일을 view 에게 반영해주는 것들을 묶어 놓음.
		super.on("notifyGetFileListDone", this._fileListView.updateView);
		super.on("eventName", )
	}
}

export default FileListController;

