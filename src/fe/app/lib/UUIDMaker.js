export default class UUID {
	static make(){
		return this._s4() + this._s4() + '-' + this._s4() + '-' + this._s4() + '-' + this._s4() + '-' + this._s4() + this._s4() + this._s4();
	}
	static _s4(){
		return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
	}
}