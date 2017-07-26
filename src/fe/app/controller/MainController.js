/**
 * 
 */
const Controller = require('Controller');
class MainController extends Controller{
	constructor(){
		super.();
		_bindEvents();
	}
	_bindEvents(){
		super.on("testEvent",function{
			console.log("testEventHappen");
		});
	}
}
export default MainController;