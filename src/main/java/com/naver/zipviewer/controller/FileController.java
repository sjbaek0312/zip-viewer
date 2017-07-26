package com.naver.zipviewer.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.naver.zipviewer.service.FileService;

@RestController
public class FileController {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	@Autowired private FileService service;
	
	@GetMapping(value = "/files")
	public ResponseEntity<?> list(Model model)
	{
		return new ResponseEntity<>(service.listAll(), HttpStatus.OK);
	}

	@PostMapping(value = "/files")
	public ResponseEntity<?> insert(@RequestPart("file") MultipartFile file, Model model)
	{
		try
		{
			return new ResponseEntity<>(service.insert(file), HttpStatus.CREATED);
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
