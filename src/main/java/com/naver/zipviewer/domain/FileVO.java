package com.naver.zipviewer.domain;

import java.util.Date;

public class FileVO {

	private long fileId;
	private String userId;
	private String fileName;
	private long fileSize;
	private Date fileUploadTime;
	
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
	public Date getFileUploadTime() {
		return fileUploadTime;
	}
	public void setFileUploadTime(Date fileUploadTime) {
		this.fileUploadTime = fileUploadTime;
	}
}
