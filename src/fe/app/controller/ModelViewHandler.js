import EventEmitter from 'events';
class ModelViewHandler extends EventEmitter {
	constructor(view) {
		super();
		this._view = view;
		super.on('add',this.addRendering);
	}
	addRendering(model) {
		this._view.rendering(model);
	}
	removeRendering(modelId) {
		this._view.rendering(modelId);
	}
}
export default ModelViewHandler;