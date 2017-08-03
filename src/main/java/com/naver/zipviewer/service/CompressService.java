package com.naver.zipviewer.service;

import java.util.List;
import java.util.Map;

import com.naver.zipviewer.domain.Zipfile;

public interface CompressService {

	public List<Zipfile> load(long fileId, String path) throws Exception;
//	public List<Zipfile> list(long fileId, String path) throws Exception;
//	public void download();
//	public void expire();
//	public void renew();
}
