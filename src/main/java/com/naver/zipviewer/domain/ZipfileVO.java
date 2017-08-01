package com.naver.zipviewer.domain;

public class ZipfileVO {

	private long zipfileId;
	private long fileId;
	private String zipfileName;
	private long zipfileSize;
	private boolean isDirectory;
	private long zipfileParentId;
	
	public long getZipfileId() {
		return zipfileId;
	}
	public void setZipfileId(long zipfileId) {
		this.zipfileId = zipfileId;
	}
	public long getFileId() {
		return fileId;
	}
	public void setFileId(long fileId) {
		this.fileId = fileId;
	}
	public String getZipfileName() {
		return zipfileName;
	}
	public void setZipfileName(String zipfileName) {
		this.zipfileName = zipfileName;
	}
	public long getZipfileSize() {
		return zipfileSize;
	}
	public void setZipfileSize(long zipfileSize) {
		this.zipfileSize = zipfileSize;
	}
	public boolean isDirectory() {
		return isDirectory;
	}
	public void setDirectory(boolean isDirectory) {
		this.isDirectory = isDirectory;
	}
	public long getZipfileParentId() {
		return zipfileParentId;
	}
	public void setZipfileParentId(long zipfileParentId) {
		this.zipfileParentId = zipfileParentId;
	}	
}
