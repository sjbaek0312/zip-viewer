package com.naver.zipviewer.domain;

import java.util.List;
import java.util.Map;

public class Zip {

	private long fileId;
	private Map<Long, List<Zipfile>> map;
	
	public Zip() {}
	
	public Zip(long fileId, Map<Long, List<Zipfile>> map)
	{
		this.fileId = fileId;
		this.map = map;
	}
	
	public long getFileId() {
		return fileId;
	}
	public void setFileId(long fileId) {
		this.fileId = fileId;
	}
	public Map<Long, List<Zipfile>> getMap() {
		return map;
	}
	public void setList(Map<Long, List<Zipfile>> map) {
		this.map = map;
	} 
}
