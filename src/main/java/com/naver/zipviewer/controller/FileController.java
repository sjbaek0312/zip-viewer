package com.naver.zipviewer.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.naver.zipviewer.domain.FileVO;
import com.naver.zipviewer.service.FileService;

@Controller
public class FileController {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	private static long fileId = 0;
	@Autowired private FileService service;
	
	@GetMapping(value = "/files")
	public ResponseEntity<?> list(Model model)
	{
		List<FileVO> voList = null;
		try
		{
			voList = service.listAll();
			return new ResponseEntity<>(voList, HttpStatus.OK);
		}
		catch(Exception e)
		{
		//	return new ResponseEntity<String>(e + "", HttpStatus.BAD_REQUEST);
		//	return new ResponseEntity<String>(e + "", HttpStatus.UNAUTHORIZED);
		//	return new ResponseEntity<String>(e + "", HttpStatus.NOT_FOUND);
			return new ResponseEntity<String>(e + "", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping(value = "/files")
	public ResponseEntity<?> insert(@RequestPart("file") MultipartFile file, Model model)
	{
		FileVO vo = new FileVO();
		try
		{
			vo.setFileId(fileId++);
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
		
			service.insert(vo);
			return new ResponseEntity<>(vo, HttpStatus.CREATED);
		}
		catch(Exception e)
		{
			//	return new ResponseEntity<String>(e + "", HttpStatus.BAD_REQUEST);
			//	return new ResponseEntity<String>(e + "", HttpStatus.UNAUTHORIZED);
			//	return new ResponseEntity<String>(e + "", HttpStatus.NOT_FOUND);
			return new ResponseEntity<String>(e + "", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
