import "lib/jquery.fileDownload.js"

const contextMenuView = $('<div id="contextMenu"></div>');
const downloadMenu = $('<div class="menu"></div>');
const downloadLink = $('<a target="_blank" ></a>').text('다운로드')
const deleteMenu = $('<div class="menu" ></div>').text('삭제'); // 클릭시 삭제 이벤트 연결 해야 함.

const makeDownLoadView = function(){
	downloadMenu.append(downloadLink)
	contextMenuView.append(downloadMenu);
}

const makeDeleteView = function(){
	contextMenuView.append(deleteMenu)
}

const showContextView = function(y, x){
	contextMenuView.css('display','block')
	contextMenuView.css('top', y)
	contextMenuView.css('left', x)
}
const bindDownloadEvent = function(url, errorCallback){
	downloadLink.on("click",function(){
		console.dir("...")
		$.fileDownload(url, {
		    failCallback: function (html, url) {
		    	console.log(url+" DownLoad fail.")
		        errorCallback("DownLoad Fail!");
		    }
		});
	})
}
const bindDeleteEvent = function(callback, argv){
	deleteMenu.on("click", function(){
		callback(argv);
	})
}

const removeContextMenu = function(){
	deleteMenu.off();
	downloadLink.off();
	contextMenuView.children().remove()
	contextMenuView.remove();
}

const ContextMenuAction = {
	showMainContextView : function(evt, downloadURL, errorCallback, deleteCallback, argv) {
		evt.preventDefault();
		
		const winEvent = evt.originalEvent;
		const target = evt.currentTarget;
		const link = target.baseURI + downloadURL;
		const $target = $(target);
		
		const x = winEvent.pageX - $target.offset().left
		const y =  winEvent.pageY - $target.offset().top 

		makeDownLoadView();
		makeDeleteView(); 
		bindDownloadEvent(link, errorCallback);
		bindDeleteEvent(deleteCallback, argv);
		showContextView(y, x)

		contextMenuView.on("click",".menu", function(evt){
			removeContextMenu();
			evt.stopPropagation();
		})
		
		$target.append(contextMenuView)
		
	},
	showZipFileContextView : function(evt, downloadURL, errorCallback) {
		evt.preventDefault();
		
		const winEvent = evt.originalEvent;
		const target = evt.currentTarget;
		const link = target.baseURI + downloadURL;
		
		const $contextPositionHelper = $(target).find(".zipfileContextHelper")

		
		const x = winEvent.pageX - $contextPositionHelper.offset().left
		const y =  winEvent.pageY - $contextPositionHelper.offset().top 

		makeDownLoadView(link);
		bindDownloadEvent(link, errorCallback);
		showContextView(y, x)
		contextMenuView.on("click",".menu", function(evt){
			removeContextMenu();
			evt.stopPropagation();	
		})
		
		$contextPositionHelper.append(contextMenuView)
	},
	hideMainContextView : function(evt) {
		removeContextMenu()
	}
	
}
export default ContextMenuAction
