package com.naver.zipviewer.service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.multipart.MultipartFile;

import com.naver.zipviewer.domain.FileVO;
import com.naver.zipviewer.persistence.FileDAO;

@Service
public class FileService {
 
	@Value("#{config['fileUploadPath']}") String path;
	@Autowired private FileDAO dao;

	public FileVO insert(MultipartFile file) throws MultipartException, IOException, FileNotFoundException
	{
		FileVO vo = new FileVO();
		File f = new File(path, file.getOriginalFilename());
		InputStream is = null;
		FileOutputStream fos = null;
		String ext = "";
		f = new File(path, file.getOriginalFilename());
		
		if (file.getOriginalFilename().contains("."))
			ext = f.getName().substring(f.getName().lastIndexOf("."));
		
		try
		{
			is = file.getInputStream();
			fos = new FileOutputStream(f);
			byte[] buffer = new byte[1024 * 8];		
			while(true)			
			{
				int count = is.read(buffer);
				if(count == -1)
					break;
				fos.write(buffer, 0, count);
			}
		  
			vo.setUserId("admin");
			vo.setFileName(file.getOriginalFilename());  
			vo.setFileSize(file.getSize());
			vo.setFileUploadTime(new Date());
		}	
		finally
		{
			try
			{
				is.close();
			}
			finally
			{
				fos.close();
			}
		}

		dao.insert(vo);

		f.renameTo(new File(path + vo.getFileId() + ext));
		return vo;
	}

	public List<FileVO> listAll()
	{
		return dao.listAll();
	}
	
	public FileVO select(long fileId)
	{
		return dao.select(fileId);
	}
}