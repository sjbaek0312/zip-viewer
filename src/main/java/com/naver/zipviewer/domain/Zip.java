package com.naver.zipviewer.domain;

import java.util.Date;
import java.util.List;
import java.util.Map;

public class Zip {

	private long fileId;
	private Date accessTime;
	private List<Map<Long, List<Zipfile>>> list;
	
	public Zip() {}
	
	public Zip(long fileId, Date accessTime, List<Map<Long, List<Zipfile>>> list)
	{
		this.fileId = fileId;
		this.accessTime = accessTime;
		this.list = list;
	}
	
	public long getFileId() {
		return fileId;
	}
	public void setFileId(long fileId) {
		this.fileId = fileId;
	}
	public Date getAccessTime() {
		return accessTime;
	}
	public void setAccessTime(Date accessTime) {
		this.accessTime = accessTime;
	}
	public List<Map<Long, List<Zipfile>>> getList() {
		return list;
	}
	public void setList(List<Map<Long, List<Zipfile>>> list) {
		this.list = list;
	} 
}
