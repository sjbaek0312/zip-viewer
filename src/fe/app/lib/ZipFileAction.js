const APIURL =  "api/files/"; //real API
//const APIURL =  "http://localhost:8080/api/files/"; //testAPI
 
export function zipFileLoad(fileId){
	let apiURL = APIURL + fileId + "/zipfiles";
	let call = function(callback){
		return $.ajax({ url : apiURL, type : "POST", dataType: "json", beforeSend: callback, xhr : function() {const xhr = $.ajaxSettings.xhr(); return xhr}})
	}
	return call;
}

export function zipFileList(fileId){
	let apiURL = APIURL + fileId + "/zipfiles";
	let call = function(parentId) {
		return $.ajax({ url : apiURL, data : {'zipfileParentId' : parentId}, type : "GET", dataType: "json"})
	}
	return call;
}

export function zipFileRenew(fileId){
	let apiURL = APIURL + fileId + "/zipfiles";
	let call = function() {
		return $.ajax({ url : apiURL, dataType: "json", type : "PATCH" })
	}
	return call;
}

export function zipFileDownload(fileId){
	let apiURL = APIURL + fileId + "/zipfiles/";
	let downloadURL = function(zipFileId){
		return apiURL + zipFileId;
	}
	return downloadURL;
}

export function zipFileExpire(fileId){
	let apiURL = APIURL + fileId + "/zipfiles";
	let call = function() {
		return $.ajax({ url : apiURL, dataType: "json", type : "DELETE"})
	}
	return call;
}

/**
 * example 
	import {zipFileLoad} from "lib/ZipFileAction.js"
	
	const APILoad = zipFileLoad(11);
	APILoad().done(callbackFunction);
 
 */