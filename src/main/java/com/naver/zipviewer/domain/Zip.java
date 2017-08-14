package com.naver.zipviewer.domain;

import java.util.Map;

import org.apache.commons.compress.archivers.ArchiveEntry;

public class Zip {

	private long fileId;
	private Map<Long, Map<Long, Zipfile>> map;
	private Map<Long, ArchiveEntry> entry;
	
	public Zip() {}
	
	public Zip(long fileId, Map<Long, Map<Long, Zipfile>> map, Map<Long, ArchiveEntry> entry)
	{
		this.fileId = fileId;
		this.map = map;
		this.entry = entry;
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
	public Map<Long, ArchiveEntry> getEntry() {
		return entry;
	}
	public void setEntry(Map<Long, ArchiveEntry> entry) {
		this.entry = entry;
	}
}
