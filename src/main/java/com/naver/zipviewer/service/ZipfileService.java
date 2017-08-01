package com.naver.zipviewer.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.compress.archivers.zip.ZipArchiveEntry;
import org.apache.commons.compress.archivers.zip.ZipArchiveInputStream;
import org.springframework.stereotype.Service;

import com.naver.zipviewer.domain.ZipfileVO;
import com.naver.zipviewer.domain.ZipfilelistVO;

@Service
public class ZipfileService {

	public List<ZipfileVO> load(long fileId, String path)
	{
		List<ZipfileVO> list = new ArrayList<ZipfileVO>();
		List<Map<Long, ZipfileVO>> saveList = new ArrayList<Map<Long, ZipfileVO>>();
		List<Long> parentIdList = new ArrayList<Long>();
		ZipfileVO vo;
		ZipfilelistVO listvo = new ZipfilelistVO();
		ZipArchiveInputStream zis = null;
		ZipArchiveEntry entry;
		long zipfileId = 1;
		parentIdList.add((long) 0);

		try 
		{
			Map<Long, ZipfileVO> map = new HashMap<Long, ZipfileVO>();
			zis = new ZipArchiveInputStream(new FileInputStream(new File(path + "\\" + String.valueOf(fileId) + ".zip")), "EUC-KR");
			while ((entry = zis.getNextZipEntry()) != null)
			{
				vo = new ZipfileVO();
				vo.setZipfileId(zipfileId);
				vo.setFileId(fileId);
				vo.setZipfileName(entry.getName());
				vo.setZipfileSize(entry.getSize());
				if (entry.getName().charAt(entry.getName().length() - 1) == '/')
					vo.setDirectory(true);
				else
					vo.setDirectory(false);
				
				int depth = 0;
				for (int i = 0; i < entry.getName().length() - 1; i++)
					if (entry.getName().charAt(i) == '/')
						depth++;
				if (depth < parentIdList.size())
					parentIdList.set(depth, vo.getZipfileId());
				else
					parentIdList.add(depth, vo.getZipfileId());
				
				if (depth == 0)
					vo.setZipfileParentId(-1);
				else
					vo.setZipfileParentId(parentIdList.get(depth - 1));
			
				if (depth != 0)
				{
					if (parentIdList.get(depth - 1) == 0)
						list.add(vo);
				}
				else
				{
					list.add(vo);
				}
				map.put(zipfileId, vo);
				System.out.println(map.get(zipfileId).getZipfileName());
				zipfileId++;
			}
			saveList.add(map);
			listvo.setZipfilelist(saveList);
			listvo.setAccessTime(new Date());
		}
		catch (IOException e) {}
		finally
		{
			try 
			{
				zis.close();
			}
			catch (IOException e) {}
		}
	
		return list;
	}
}
