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
	
	@Autowired CompressFactory compressFactory;
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
			if (compressFactory.createCompress(ext) == null)
			{
				throw new Exception("Not a compressed file.");
			}

			is = compressFactory.createCompress(ext).getArchiveInputStream(fullPath);
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
				
				if (depth == 1) // depth 0의 폴더들을 entry에서 인식하지 못하기 때문에 자식들의 이름에서 파싱하여 임의로 추가
				{
					zipfile = new Zipfile();
					nestedMap = new HashMap<Long, Zipfile>();
					str = entry.getName();
					values = str.split("/");
					
					if (depth0Directories == null || !depth0Directories.equals(values[0] + "/"))
					{
						parentIdMap.put(0, (long) 0);
						zipfile.setZipfileId(tmpZipfileId);
						zipfile.setZipfileName(values[0] + "/");
						zipfile.setZipfileSize((long) 0);
						zipfile.setIsDirectory(true);
						depth0Directories = values[0] + "/";
	
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

						parentIdMap.put(0, tmpZipfileId);				
						tmpZipfileId++;
					}
				}
				// 정상적인 entry
				zipfile = new Zipfile();
				nestedMap = new HashMap<Long, Zipfile>();
				zipfile.setZipfileId(tmpZipfileId);
				zipfile.setZipfileSize(entry.getSize());
				
				if (entry.isDirectory())
				{
					zipfile.setZipfileName(new File(entry.getName()).getName() + "/");
					zipfile.setIsDirectory(true);
					parentIdMap.put(depth, tmpZipfileId);

					Zipfile tmp = new Zipfile();
					Map<Long, Zipfile> tmpMap = new HashMap<Long, Zipfile>();
					if (depth == 1) // 자신이 디렉토리일 경우 부모의 hasDirectory를 true로 변경
					{
						tmp = map.get((long) 0).get(parentIdMap.get(0));
						tmpMap = map.get((long) 0);
						tmp.setHasDirectory(true);
						tmpMap.put(parentIdMap.get(0), tmp);
						map.put((long) 0, tmpMap);
					}
					else if (depth > 1)
					{					
						tmp = map.get(parentIdMap.get(depth - 2)).get(parentIdMap.get(depth - 1));
						tmpMap = map.get(parentIdMap.get(depth - 2));
						tmp.setHasDirectory(true);
						tmpMap.put(parentIdMap.get(depth - 1), tmp);
						map.put(parentIdMap.get(depth - 2), tmpMap);
					}
				}
				else
				{
					zipfile.setZipfileName(new File(entry.getName()).getName());
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
