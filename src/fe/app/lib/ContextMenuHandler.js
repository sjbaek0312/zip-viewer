const contextMenuView = $('<div id="contextMenu"></div>');
const downloadMenu = $('<a href="#" class="menu"></a>').text('다운로드');
const deleteMenu = $('<a class="menu"></a>').text('삭제');



let ContextMenuAction = {
	showMainContextView : function(event) {
		event.preventDefault();
	
//		console.dir(contextMenuView);
		
		const x = event.pageX - $(this).position().left
		const y = event.pageY- $(this).position().top

//		const x = event.pageX - $(this).offset().left
//		const y = event.pageY- $(this).offset().top
		
		contextMenuView.append(downloadMenu).append(deleteMenu);
		contextMenuView.css('display','block')
		contextMenuView.css('top', y)
		contextMenuView.css('left', x)
		
		contextMenuView.on("click",".menu", function(evt){
			evt.stopPropagation();
			contextMenuView.remove();
		})
		
		$(this).append(contextMenuView)
		
	},
	showZipFileContextView : function(evt, downloadURL) {
		evt.preventDefault();
//		console.dir(evt);
		
		const winEvent = evt.originalEvent;
		const target = evt.currentTarget;
		const $contextPositionHelper = $(target).find(".zipfileContextHelper")
		const link = target.baseURI + downloadURL;
		
		const x = winEvent.pageX - $contextPositionHelper.offset().left
		const y =  winEvent.pageY - $contextPositionHelper.offset().top + 10
//		console.log("Win pageY : "+ winEvent.pageY)
//		console.log("target Offset Y : "+ $(target).offset().top)
//		console.log("Win X : "+winEvent.pageX+" Wind Y : "+winEvent.pageY);
//		console.log("X : "+x+" / Y : "+y)

		downloadMenu.attr('href', link);
		contextMenuView.append(downloadMenu);
		contextMenuView.css('display','block')
		contextMenuView.css('top', 0)
		contextMenuView.css('left', x)
		
		contextMenuView.on("click",".menu", function(evt){
			evt.stopPropagation();
			contextMenuView.remove();
		})
		
		$contextPositionHelper.append(contextMenuView)
	},
	hideMainContextView : function(evt) {
		contextMenuView.remove();
	}
	
}
export default ContextMenuAction
