package com.naver.zipviewer.service;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.naver.zipviewer.domain.Zip;

@Service
public class ZipCacheService {

	@Cacheable(value = "zips")
	public Zip findZip(Zip z)
	{
		return z;
	}
/*	
	@Cacheable(value = "zips")
	public Zip findZipByFileId(long fileId)
	{
		return new Zip();
	}*/
}
