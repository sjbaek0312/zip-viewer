package com.naver.zipviewer.service;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.compress.archivers.ArchiveEntry;
import org.apache.commons.compress.archivers.ArchiveInputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;

import com.naver.zipviewer.domain.Zip;
import com.naver.zipviewer.domain.Zipfile;
import com.naver.zipviewer.factory.CompressFactory;

@Service
public class ZipCacheService {
	
	@Autowired FileService fileService;
	@Value("#{config['fileUploadPath']}") String path;
	
	
	@CachePut(value = "zips", key = "#fileId")
	public Zip putZip(long fileId) throws Exception
	{
		return zipfileUtil(fileId);
	}
	
	@Cacheable(value = "zips", key = "#fileId", unless = "#result == null")
	public Zip findZip(long fileId)
	{
		return null;
	}
	
	@CacheEvict(value = "zips", key = "#fileId")
	public void evictZip(long fileId) {}
	
	public Zip zipfileUtil(long fileId) throws Exception
	{
		String ext = getFileExt(fileId);
		ArchiveInputStream is = null;
		ArchiveEntry entry = null;
		Map<Long, ArchiveEntry> entryMap = new HashMap<Long, ArchiveEntry>();
		Map<Long, Map<Long, Zipfile>> map = new HashMap<Long, Map<Long, Zipfile>>();
		Map<Long, Zipfile> nestedMap;
		Zipfile zipfile;
		Map<Integer, Long> parentIdMap = new HashMap<Integer, Long>();
		long tmpZipfileId = 1;
		String fullPath = path + fileId + "." + ext;
		String depth0Directories = null;
		parentIdMap.put(0, (long) 0);
	
		try
		{
			if (CompressFactory.createCompress(fullPath) == null)
			{
				throw new Exception("Not a compressed file.");
			}

			is = CompressFactory.createCompress(fullPath).getArchiveInputStream();
			while ((entry = is.getNextEntry()) != null)
			{
				String str = null;
				String[] values = new String[2];
				int depth = 0;
				for (int i = 0; i < entry.getName().length() - 1; i++)
				{
					if (entry.getName().charAt(i) == '/')
					{
						depth++;  
					}
				}
				
				if (depth == 1)
				{
					zipfile = new Zipfile();
					nestedMap = new HashMap<Long, Zipfile>();
					str = entry.getName();
					values = str.split("/");
					
					if (depth0Directories == null || !depth0Directories.equals(values[0] +"/"))
					{
						zipfile.setZipfileId(tmpZipfileId);
						zipfile.setZipfileName(values[0] + "/");
						zipfile.setZipfileSize((long) 0);
						zipfile.setIsDirectory(true);
						zipfile.setZipfileParentId((long) 0);
						depth0Directories = values[0] + "/";
						
						if (!map.containsKey(parentIdMap.get(depth - 1)))
						{
							nestedMap.put(tmpZipfileId, zipfile);
							map.put(parentIdMap.get(depth - 1), nestedMap);
						}
						else
						{
							nestedMap.putAll(map.get(parentIdMap.get(depth - 1)));
							nestedMap.put(tmpZipfileId, zipfile);
							map.put(parentIdMap.get(depth - 1), nestedMap);
						}

						tmpZipfileId++;
					}
				}
				
				zipfile = new Zipfile();
				nestedMap = new HashMap<Long, Zipfile>();
				zipfile.setZipfileId(tmpZipfileId);
				zipfile.setZipfileSize(entry.getSize());
				
				if (entry.isDirectory())
				{
					zipfile.setZipfileName(new File(entry.getName()).getName() + "/");
					zipfile.setIsDirectory(true);
					parentIdMap.put(depth, tmpZipfileId);
				}
				else
				{
					zipfile.setZipfileName(new File(entry.getName()).getName());
					zipfile.setIsDirectory(false);
				}

				if (depth == 0)
				{
					zipfile.setZipfileParentId((long) 0);
					if (!map.containsKey(parentIdMap.get(0)))
					{
						nestedMap.put(tmpZipfileId, zipfile);
						map.put(parentIdMap.get(0), nestedMap);
					}
					else
					{
						nestedMap.putAll(map.get(parentIdMap.get(0)));
						nestedMap.put(tmpZipfileId, zipfile);
						map.put(parentIdMap.get(0), nestedMap);
					}
				}
				else
				{
					zipfile.setZipfileParentId(parentIdMap.get(depth - 1));
					if (!map.containsKey(parentIdMap.get(depth - 1)))
					{
						nestedMap.put(tmpZipfileId, zipfile);
						map.put(parentIdMap.get(depth - 1), nestedMap);
					}
					else
					{
						nestedMap.putAll(map.get(parentIdMap.get(depth - 1)));
						nestedMap.put(tmpZipfileId, zipfile);
						map.put(parentIdMap.get(depth - 1), nestedMap);
					}
				}

				entryMap.put(tmpZipfileId, entry);
				tmpZipfileId++;
			}
		}
		finally
		{
			is.close();
		}

		return new Zip(fileId, map, entryMap);
	}
	
	public String getFileExt(long fileId)
	{
		return fileService.select(fileId).getFileName().substring(fileService.select(fileId).getFileName().lastIndexOf(".") + 1);
	}
}
