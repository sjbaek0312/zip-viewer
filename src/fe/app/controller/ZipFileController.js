import ZipFileListModel from "../model/ZipFileListModel.js"

class ZipFileController {
	constructor(fileId){
		this._zipListView; //#zipFileList
		this._zipTreeView; //#zipFileTree
		this._zipFileListModel = new ZipFileListModel(fileId);
		this._zipFileListModel.apiZipFileLoad();

//		this._zipTreeView
//			.on("select", ...)
		
		this._startView();
		this._bindStaticClickEvents();
	}
	_startView(){
		$("#ZipViewerBackground").css("display","block");
		// 아래 로직은 view 와 모델로 분리 시켜야함... 
		let dir =  [
			{
				'text' : 'zipFileName',
				'id' : 'gg',
				'state' : {
					'opened' : true,
				},
				'children' : [ // 자식노드들은 Array에 넣어야 한다
					{
						'text' : 'Child 1',
						'id' : 'zsdfd',
						'children' : [
							 {
								'text' : 'child4',
								'id' : 'zipwwerleId'
							} ]
					},
					{
						'text' : 'Child 2',
						'id' : 'zipsddId',
						'children' : [{}] // + - 표시가 나타난다.
					}
				]
			}
		]
		let tree = $('#zipFileTree').jstree({
			"plugins" : [ "wholerow" ],
			'core' : {
				'data' : dir,
				'themes' : {
					'name' : 'proton', 
				}
			},
		});
		
		
	}
	_bindStaticClickEvents() {
		let This = this;
		$("#zipFileClose").on("click", function(){
			$("#ZipViewerBackground").css("display","none");

		})
	}
}
export default ZipFileController;
