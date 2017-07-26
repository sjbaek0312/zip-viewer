package com.naver.zipviewer.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import com.naver.zipviewer.domain.FileVO;
import com.naver.zipviewer.persistence.FileDAO;

@Service
public class FileService {
	
@Autowired private FileDAO dao;
	
	public FileVO insert(@RequestPart("file") MultipartFile file) throws Exception
	{
		FileVO vo = new FileVO();
		vo.setUserId("admin");	
	
		InputStream is = file.getInputStream();
		byte[] buffer = new byte[1024 * 8];
		FileOutputStream fos = new FileOutputStream(new File("C:\\Users\\upload", file.getOriginalFilename()));
		while(true)
		{
			int count = is.read(buffer);
			if(count == -1)
				break;
			fos.write(buffer, 0, count);
		}
		
		vo.setFileName(file.getOriginalFilename());		
		vo.setFileSize(file.getSize());
		vo.setFileUploadTime(System.currentTimeMillis());
	  
		is.close();
		fos.close();
		
		dao.insert(vo);
		return vo;
	}

	public List<FileVO> listAll()
	{
		return dao.listAll();
	}
}
