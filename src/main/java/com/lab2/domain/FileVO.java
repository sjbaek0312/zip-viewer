package com.lab2.domain;

public class FileVO {

	private long fileId;
	private String userId;
	private String fileName;
	private long fileSize;
	private long fileUploadTime;
	
	public long getFileId() {
		return fileId;
	}
	public void setFileId(long fileId) {
		this.fileId = fileId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public long getFileSize() {
		return fileSize;
	}
	public void setFileSize(long fileSize) {
		this.fileSize = fileSize;
	}
	public long getFileUploadTime() {
		return fileUploadTime;
	}
	public void setFileUploadTime(long fileUploadTime) {
		this.fileUploadTime = fileUploadTime;
	}
}
