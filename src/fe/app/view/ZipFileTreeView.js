class ZipFileTreeView {
	constructor(domId){
		this._el = $(domId);
		// 주원님... _el  말고  어떻게 작성하라고 하셨었죠....? 실수로 다 날려버렸어요 죄송합니다 ㅠㅠ.
	}
	
	rendering(model) {
		this._el.jstree({
			"plugins" : [ "wholerow" ],
			'core' : {
				'data' : model,
				'themes' : {
					'name' : 'proton'
				}
			}
		});
	}
}
export default ZipFileTreeView;