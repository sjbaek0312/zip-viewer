/**
 * 
 */


const EventEmitter = require('events');

class DropHandler extends EventEmitter {
	constructor(){
		super();
		super.on('', function(){
			console.log("!");
		})
	}
} 

export let dropHandler = new DropHandler();
//export default DropEvent;
