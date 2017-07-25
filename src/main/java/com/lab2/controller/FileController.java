package com.lab2.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.Iterator;
import java.util.List;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.lab2.domain.FileVO;
import com.lab2.service.FileService;

@Controller
public class FileController {

	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	private static long fileId = 0;
	@Inject FileService service;
	
	@RequestMapping(value = "/files", method = RequestMethod.GET)
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

	@RequestMapping(value = "/files", method = RequestMethod.POST)
	public ResponseEntity<?> uploadForm(@RequestPart("file") MultipartFile file, Model model)
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
