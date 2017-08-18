package com.naver.zipviewer.service;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.commons.compress.archivers.ArchiveEntry;
import org.apache.commons.compress.archivers.ArchiveInputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.naver.zipviewer.domain.Zipfile;
import com.naver.zipviewer.factory.CompressFactory;

@Service
public class ZipfileService {

	@Autowired private FileService fileService;
	@Autowired private ZipCacheService zipCacheService;
	@Autowired private CompressFactory compressFactory;
	@Value("#{config['fileUploadPath']}") String path;
	@Value("#{config['fileDownloadPath']}") String targetParentPath;

	public List<Zipfile> load(long fileId, String userId) throws Exception
	{
		if (!validation(fileId, userId))
		{
			throw new Exception("Not your file, or there is no file on database.");
		}
		
		if (zipCacheService.findZip(fileId) != null)
		{
			return list(fileId, (long) 0, userId);
		}
		return new ArrayList<Zipfile>(zipCacheService.putZip(fileId).getMap().get((long) 0).values());
	}
	
	public List<Zipfile> list(long fileId, long zipfileParentId, String userId) throws Exception
	{	
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
				return null;
			}	
			return new ArrayList<Zipfile>(zipCacheService.findZip(fileId).getMap().get(zipfileParentId).values());
		}
	}

	public void renew(long fileId, String userId) throws Exception
	{
		if (!validation(fileId, userId))
		{
			throw new Exception("Not your file, or there is no file on database.");
		}
		if (zipCacheService.findZip(fileId) == null)
		{
			load(fileId, userId);
		}
	}
	
	public void expire(long fileId, String userId) throws Exception
	{
		if (!validation(fileId, userId))
		{
			throw new Exception("Not your file, or there is no file on database.");
		}
		if (zipCacheService.findZip(fileId) == null)
		{
			throw new Exception("There is no compressed file data with id : " + fileId);
		}
		zipCacheService.evictZip(fileId);
	}
	
	public File download(long fileId, long zipfileId, String userId) throws Exception
	{
		if (!validation(fileId, userId))
		{
			throw new Exception("Not your file, or there is no file on database.");
		}
		if (zipCacheService.findZip(fileId) == null)
		{
			load(fileId, userId);
		}
		return downloadUtil(fileId, zipfileId);
	}
	
	public File downloadUtil(long fileId, long zipfileId) throws Exception
	{
		ArchiveInputStream is = null;
		ArchiveEntry entry = null;
		BufferedOutputStream bos = null;
		String ext = zipCacheService.getFileExt(fileId);
		String fullPath = path + fileId + "." + ext;
		long tmpZipfileId = 1;
		String depth0Directories = null;
		Map<Long, Zipfile> map2 = zipCacheService.findZip(fileId).getMap2();
		
		try
		{
			if (compressFactory.createCompress(ext) == null)
			{
				throw new Exception("Not a compressed file.");
			}
	
			is = compressFactory.createCompress(ext).getArchiveInputStream(fullPath);
			
			while ((entry = is.getNextEntry()) != null)
			{
				if (zipfileId == tmpZipfileId)
				{
					try
					{
						bos = new BufferedOutputStream(new FileOutputStream(targetParentPath + map2.get(zipfileId).getZipfileName()));
						byte[] buffer = new byte[1024 * 8];		
						while(true)			
						{
							int count = is.read(buffer);
							if(count == -1)
								break;
							bos.write(buffer, 0, count);
						}
					}
					finally
					{
						bos.close();
					}
				}
				
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
					str = entry.getName();
					values = str.split("/");
					if (depth0Directories == null || !depth0Directories.equals(values[0] + "/"))
					{
						depth0Directories = values[0] + "/";
						tmpZipfileId++;
					}
				}
				tmpZipfileId++;
			}
		}
		finally
		{
			is.close();
		}
		
		return new File(targetParentPath + map2.get(zipfileId).getZipfileName());
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
