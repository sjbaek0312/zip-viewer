package com.naver.zipviewer.service;

import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.compress.archivers.zip.ZipArchiveEntry;
import org.apache.commons.compress.archivers.zip.ZipArchiveInputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.naver.zipviewer.domain.Zipfile;
import com.naver.zipviewer.domain.Zip;

@Service
public class ZipfileService implements CompressService{

	@Value("#{config['fileUploadPath']}") String path;
	@Autowired private FileService fileService;
	@Autowired private ZipCacheService zipCacheService;
	
	public List<Zipfile> load(long fileId) throws Exception
	{
		File file = new File(path + fileId + ".zip");
		if (!validation(fileId, "admin"))
		{
			throw new Exception("Not your file, or there is no file on database.");
		}
		if (!file.isFile())
		{
			throw new Exception("Not a zip file.");
		}
		ZipArchiveInputStream zis = null;
		ZipArchiveEntry entry = null;
		Map<Long, List<Zipfile>> map = new HashMap<Long, List<Zipfile>>();
		List<Zipfile> zipfileList;
		Zipfile zipfile;
		List<Long> parentIdList = new ArrayList<Long>();
		Zip z;
		long tmpZipfileId = 1;
		parentIdList.add((long) 0);

		try
		{
			zis = new ZipArchiveInputStream(new FileInputStream(file));
			while ((entry = zis.getNextZipEntry()) != null)
			{		
				zipfile = new Zipfile();
				zipfileList = new ArrayList<Zipfile>();
				zipfile.setZipfileId(tmpZipfileId);
				zipfile.setZipfileName(new File(entry.getName()).getName());
				zipfile.setZipfileSize(entry.getSize());
				if (entry.isDirectory())
				{
					zipfile.setDirectory(true);
				}
				else
				{
					zipfile.setDirectory(false);
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
			zis.close();
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
}
