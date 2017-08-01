package com.naver.zipviewer.domain;

import java.util.Date;
import java.util.List;
import java.util.Map;

public class ZipfilelistVO {

	private List<Map<Long, ZipfileVO>> zipfilelist;
	private Date accessTime;

	public List<Map<Long, ZipfileVO>> getZipfilelist() {
		return zipfilelist;
	}
	public void setZipfilelist(List<Map<Long, ZipfileVO>> zipfilelist) {
		this.zipfilelist = zipfilelist;
	}
	public Date getAccessTime() {
		return accessTime;
	}
	public void setAccessTime(Date accessTime) {
		this.accessTime = accessTime;
	}
}
