package com.naver.zipviewer.domain;

import java.util.List;
import java.util.Map;

import org.apache.commons.compress.archivers.ArchiveEntry;

public class Zip {

	private long fileId;
	private Map<Long, List<Zipfile>> map;
	private List<ArchiveEntry> entryList;
	
	public Zip() {}
	
	public Zip(long fileId, Map<Long, List<Zipfile>> map, List<ArchiveEntry> entryList)
	{
		this.fileId = fileId;
		this.map = map;
		this.entryList = entryList;
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
	public List<ArchiveEntry> getEntryList() {
		return entryList;
	}
	public void setEntryList(List<ArchiveEntry> entryList) {
		this.entryList = entryList;
	}
}
