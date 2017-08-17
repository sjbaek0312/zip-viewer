const Sizes = ['Byte', 'KB', 'MB', 'GB']

class FileSizeMaker {
	static calculateSize(fileSize){
		for(var unit = 0; unit < Sizes.length ; unit++){
			if(fileSize < 1024){
				fileSize = this._makeFormat(fileSize) + " " + Sizes[unit]
				break;
			} else {
				fileSize  = fileSize / 1024
			}
		}
		return fileSize
	}
	static _makeFormat(num){
		if(Math.ceil(num) != num)
			num = num.toFixed(2);
		return num;
	}
}

export default FileSizeMaker;