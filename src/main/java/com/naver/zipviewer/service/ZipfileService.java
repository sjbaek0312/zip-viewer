package com.naver.zipviewer.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.compress.archivers.ArchiveEntry;
import org.apache.commons.compress.archivers.ArchiveInputStream;
import org.apache.commons.compress.archivers.jar.JarArchiveInputStream;
import org.apache.commons.compress.archivers.tar.TarArchiveInputStream;
import org.apache.commons.compress.archivers.zip.ZipArchiveInputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.naver.zipviewer.domain.Zipfile;
import com.naver.zipviewer.domain.Zip;

@Service
public class ZipfileService {

	@Value("#{config['fileUploadPath']}") String path;
	@Autowired private FileService fileService;
	@Autowired private ZipCacheService zipCacheService;
	
	public List<Zipfile> load(long fileId) throws Exception
	{
		if (!validation(fileId, "admin"))
		{
			throw new Exception("Not your file, or there is no file on database.");
		}
		ArchiveInputStream is = null;
		ArchiveEntry entry = null;
		Map<Long, List<Zipfile>> map = new HashMap<Long, List<Zipfile>>();
		List<Zipfile> zipfileList;
		Zipfile zipfile;
		List<Long> parentIdList = new ArrayList<Long>();
		Zip z;
		long tmpZipfileId = 1;
		parentIdList.add((long) 0);

		try
		{
			if (CompressArchiveInputStream(path, fileId) == null)
			{
				throw new Exception("Not a compressed file.");
			}
			is = CompressArchiveInputStream(path, fileId);

			while ((entry = is.getNextEntry()) != null)
			{		
				zipfile = new Zipfile();
				zipfileList = new ArrayList<Zipfile>();
				zipfile.setZipfileId(tmpZipfileId);
				zipfile.setZipfileName(new File(entry.getName()).getName());
				zipfile.setZipfileSize(entry.getSize());
				if (entry.isDirectory())
				{
					zipfile.setIsDirectory(true);
				}
				else
				{
					zipfile.setIsDirectory(false);
				}

				int depth = 0;
				for (int i = 0; i < entry.getName().length() - 1; i++)
				{
					if (entry.getName().charAt(i) == '/')
					{
						depth++;
					}
				}
				
				if (entry.isDirectory())
				{
					if (depth < parentIdList.size())
					{
						parentIdList.set(depth, zipfile.getZipfileId());
					}
					else
					{
						parentIdList.add(depth, zipfile.getZipfileId());
					}
				}	

				if (depth == 0)
				{
					zipfile.setZipfileParentId(0);
				}
				else
				{
					zipfile.setZipfileParentId(parentIdList.get(depth - 1));
				}
		
				if (depth == 0)
				{
					if (!map.containsKey(parentIdList.get(0)))
					{
						zipfileList.add(zipfile);
						map.put(parentIdList.get(0), zipfileList);
					}
					else
					{
						zipfileList = map.get(parentIdList.get(0));
						zipfileList.add(zipfile);
						map.put(parentIdList.get(0), zipfileList);
					}
				}
				else
				{
					if (!map.containsKey(parentIdList.get(depth - 1)))
					{
						zipfileList.add(zipfile);
						map.put(parentIdList.get(depth - 1), zipfileList);
					}
					else
					{
						zipfileList = map.get(parentIdList.get(depth - 1));
						zipfileList.add(zipfile);
						map.put(parentIdList.get(depth - 1), zipfileList);
					}
				}
				tmpZipfileId++;
			}
		}
		finally
		{
			is.close();
		}
	
		z = new Zip(fileId, new Date(), map);		
		zipCacheService.findZip(z);
		return map.get((long) 0);
	}
	
	public boolean validation(long fileId, String userId)
	{
		if (!fileService.select(fileId).getUserId().equals(userId))
		{
			return false;
		}
		return true;
	}
	
	public ArchiveInputStream CompressArchiveInputStream(String path, long fileId) throws FileNotFoundException
	{
		File file;
		
		file = new File(path + fileId + ".zip");
		if (file.isFile())
		{
			return new ZipArchiveInputStream(new FileInputStream(file), "EUC-KR");
		}
		
		file = new File(path + fileId + ".tar");
		if (file.isFile())
		{
			return new TarArchiveInputStream(new FileInputStream(file), "EUC-KR");
		}
		
		file = new File(path + fileId + ".jar");
		if (file.isFile())
		{
			return new JarArchiveInputStream(new FileInputStream(file));
		}
		
		return null;
	}
}
