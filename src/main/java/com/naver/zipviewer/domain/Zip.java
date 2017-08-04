package com.naver.zipviewer.domain;

import java.util.Date;
import java.util.List;
import java.util.Map;

public class Zip {

	private long fileId;
	private Date accessTime;
	private Map<Long, List<Zipfile>> map;
	
	public Zip() {}
	
	public Zip(long fileId, Date accessTime, Map<Long, List<Zipfile>> map)
	{
		this.fileId = fileId;
		this.accessTime = accessTime;
		this.map = map;
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
	public Map<Long, List<Zipfile>> getMap() {
		return map;
	}
	public void setList(Map<Long, List<Zipfile>> map) {
		this.map = map;
	} 
}
