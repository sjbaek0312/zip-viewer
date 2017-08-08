package com.naver.zipviewer.service;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.naver.zipviewer.domain.Zip;

@Service
public class ZipCacheService {
	
	@Cacheable(value = "zips", key = "#fileId")
	public Zip findZip(long fileId, Zip z)
	{
		return z;
	}

	@Cacheable(value = "zips", key = "#fileId")
	public Zip findZipByFileId(long fileId)
	{
		return new Zip();
	}
}
