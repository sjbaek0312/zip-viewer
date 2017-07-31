package com.naver.zipviewer.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.multipart.MultipartFile;

import com.naver.zipviewer.domain.FileVO;
import com.naver.zipviewer.persistence.FileDAO;

@Service
public class FileService {
 
	@Autowired private FileDAO dao;

	public FileVO insert(MultipartFile file, String path) throws SQLException, IOException, MultipartException
	{
		FileVO vo = new FileVO();
		File f = new File(path, file.getOriginalFilename());
		String ext = f.getName().substring(f.getName().lastIndexOf("."));
		InputStream is = file.getInputStream();
		byte[] buffer = new byte[1024 * 8];
  
		FileOutputStream fos = new FileOutputStream(f);
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
	
		is.close();
		fos.close();
		if (!f.exists())
			throw new IOException("File not uploaded.");
		dao.insert(vo);

		f.renameTo(new File(path + "\\" + vo.getFileId() + ext));
		return vo;
	}

	public List<FileVO> listAll() throws SQLException
	{
		return dao.listAll();
	}
}