package com.naver.zipviewer.domain;

public class Zipfile {

	private long zipfileId;
	private String zipfileName;
	private long zipfileSize;
	private long zipfileParentId;
	private boolean isDirectory;
	
	public long getZipfileId() {
		return zipfileId;
	}
	public void setZipfileId(long zipfileId) {
		this.zipfileId = zipfileId;
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
	public long getZipfileParentId() {
		return zipfileParentId;
	}
	public void setZipfileParentId(long zipfileParentId) {
		this.zipfileParentId = zipfileParentId;
	}
	public boolean getIsDirectory() {
		return isDirectory;
	}
	public void setIsDirectory(boolean isDirectory) {
		this.isDirectory = isDirectory;
	}

}
