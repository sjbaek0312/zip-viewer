import EventEmitter from 'events';
class ModelViewHandler extends EventEmitter {
	constructor(fileListView, uploadListView) {
		super();
		this._fileListView = fileListView;
		this._uploadListView = uploadListView;
		super.on('add',this.addRendering);
		super.on('dispatched',this.disPatchRendering);
		super.on('progressRendering',this.progressRendering);
	}
	addRendering(model) {
		this._fileListView.rendering(model);
	}
	disPatchRendering(name) {
		this._uploadListView.rendering(name);
	}
	progressRendering(id, progress) {
		this._uploadListView.progressRendering(id, progress);
	}
}
export default ModelViewHandler;