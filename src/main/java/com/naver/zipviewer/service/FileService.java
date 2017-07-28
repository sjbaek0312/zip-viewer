package com.naver.zipviewer.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.multipart.MultipartFile;

import com.naver.zipviewer.domain.FileVO;
import com.naver.zipviewer.persistence.FileDAO;

@Service
public class FileService {
	
	@Autowired private FileDAO dao;

	public FileVO insert(@RequestPart("file") MultipartFile file, String path) throws SQLException, IOException, MultipartException
	{
		FileVO vo = new FileVO();
		UUID uuid = UUID.randomUUID();
		String uuidName = uuid.toString() + "_" + file.getOriginalFilename();
		
		vo.setUserId("admin");
		InputStream is = file.getInputStream();
		byte[] buffer = new byte[1024 * 8];
		FileOutputStream fos = new FileOutputStream(new File(path, uuidName));
		while(true)
		{
			int count = is.read(buffer);
			if(count == -1)
				break;
			fos.write(buffer, 0, count);
		}
		
		vo.setFileName(uuidName);		
		vo.setFileSize(file.getSize());
		vo.setFileUploadTime(new Date());

		is.close();
		fos.close();
		
		dao.insert(vo);
		return vo;
	}

	public List<FileVO> listAll() throws SQLException
	{
		return dao.listAll();
	}
}
