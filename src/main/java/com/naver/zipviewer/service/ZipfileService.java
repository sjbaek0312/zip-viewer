package com.naver.zipviewer.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.naver.zipviewer.domain.Zipfile;

@Service
public class ZipfileService {

	@Autowired private FileService fileService;
	@Autowired private ZipCacheService zipCacheService;

	public Map<Long, Zipfile> load(long fileId, String userId) throws Exception
	{
		userId = "admin";
		if (!validation(fileId, userId))
		{
			throw new Exception("Not your file, or there is no file on database.");
		}
		
		if (zipCacheService.findZip(fileId) != null)
		{
			return list(fileId, (long) 0, userId);
		}
		return new HashMap<Long, Zipfile>(zipCacheService.putZip(fileId).getMap().get((long) 0));
	}

	public Map<Long, Zipfile> list(long fileId, long zipfileParentId, String userId) throws Exception
	{	
		userId = "admin";
		if (!validation(fileId, userId))
		{
			throw new Exception("Not your file, or there is no file on database.");
		}
		if (zipCacheService.findZip(fileId) == null)
		{
			return load(fileId, userId);
		}
		else
		{
			if (!zipCacheService.findZip(fileId).getMap().containsKey(zipfileParentId))
			{
				throw new Exception("There is no folder with id : " + zipfileParentId);
			}
			return new HashMap<Long, Zipfile>(zipCacheService.findZip(fileId).getMap().get(zipfileParentId));
		}
	}
	
	public void renew(long fileId, String userId) throws Exception
	{
		userId = "admin";
		if (!validation(fileId, userId))
		{
			throw new Exception("Not your file, or there is no file on database.");
		}
		if (zipCacheService.findZip(fileId) == null)
		{
			throw new Exception("There is no compressed file with id : " + fileId);
		}
	}
	
	public void expire(long fileId, String userId) throws Exception
	{
		userId = "admin";
		if (!validation(fileId, userId))
		{
			throw new Exception("Not your file, or there is no file on database.");
		}
		if (zipCacheService.findZip(fileId) == null)
		{
			throw new Exception("There is no compressed file with id : " + fileId);
		}
		zipCacheService.evictZip(fileId);
	}
	
	public boolean validation(long fileId, String userId)
	{
		if (fileService.select(fileId) == null)
		{
			return false;
		}
		if (!fileService.select(fileId).getUserId().equals(userId))
		{
			return false;
		}
		return true;
	}
}