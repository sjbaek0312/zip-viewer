const contextMenuView = $('<div id="contextMenu"></div>');
const downloadMenu = $('<div class="menu"></div>');
const downloadLink = $('<a href="#" target="_blank"></a>').text('다운로드')
const deleteMenu = $('<div class="menu" ></div>').text('삭제'); // 클릭시 삭제 이벤트 연결 해야 함.

const makeDownLoadView = function(link){
	downloadLink.attr('href', link);
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

const bindDeleteEvent = function(callback, argv){
	deleteMenu.on("click", function(){
		callback(argv);
	})
}

const removeContextMenu = function(){
	deleteMenu.off();
	contextMenuView.children().remove()
	contextMenuView.remove();
}

const ContextMenuAction = {
	showMainContextView : function(evt, downloadURL, deleteCallback, argv) {
		evt.preventDefault();
		
		const winEvent = evt.originalEvent;
		const target = evt.currentTarget;
		const link = target.baseURI + downloadURL;
		const $target = $(target);
		
		const x = winEvent.pageX - $target.offset().left
		const y =  winEvent.pageY - $target.offset().top 

		makeDownLoadView(link);
		makeDeleteView(); 
		bindDeleteEvent(deleteCallback, argv);
		showContextView(y, x)

		contextMenuView.on("click",".menu", function(evt){
			removeContextMenu();
			evt.stopPropagation();
		})
		
		$target.append(contextMenuView)
		
	},
	showZipFileContextView : function(evt, downloadURL) {
		evt.preventDefault();
		
		const winEvent = evt.originalEvent;
		const target = evt.currentTarget;
		const link = target.baseURI + downloadURL;
		
		const $contextPositionHelper = $(target).find(".zipfileContextHelper")

		
		const x = winEvent.pageX - $contextPositionHelper.offset().left
		const y =  winEvent.pageY - $contextPositionHelper.offset().top 

		makeDownLoadView(link);
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
