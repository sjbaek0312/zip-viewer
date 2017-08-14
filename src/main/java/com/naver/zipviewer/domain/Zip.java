package com.naver.zipviewer.domain;

import java.util.Map;

public class Zip {

	private long fileId;
	private Map<Long, Map<Long, Zipfile>> map;
	private Map<Long, Zipfile> map2;
	
	public Zip() {}
	
	public Zip(long fileId, Map<Long, Map<Long, Zipfile>> map, Map<Long, Zipfile> map2)
	{
		this.fileId = fileId;
		this.map = map;
		this.map2 = map2;
	}
	
	public long getFileId() {
		return fileId;
	}
	public void setFileId(long fileId) {
		this.fileId = fileId;
	}
	public Map<Long, Map<Long, Zipfile>> getMap() {
		return map;
	}
	public void setMap(Map<Long, Map<Long, Zipfile>> map) {
		this.map = map;
	}
	public Map<Long, Zipfile> getMap2() {
		return map2;
	}
	public void setMap2(Map<Long, Zipfile> map2) {
		this.map2 = map2;
	}
}
