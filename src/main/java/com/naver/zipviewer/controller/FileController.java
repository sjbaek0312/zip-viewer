package com.naver.zipviewer.controller;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.multipart.MultipartFile;

import com.naver.zipviewer.service.FileService;

@RestController
@RequestMapping(value = "/api/files")
public class FileController {

	@Autowired private FileService service;
	@Value("#{config['fileUploadPath']}") String path;
	
	@GetMapping(value = "")
	public ResponseEntity<?> list(Model model) throws IllegalStateException, SQLException
	{
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("items", service.listAll());
		return new ResponseEntity<>(map, HttpStatus.OK);
	}

	@PostMapping(value = "")
	public ResponseEntity<?> insert(@RequestPart("file") MultipartFile file, Model model) throws SQLException, IOException, MultipartException, FileNotFoundException
	{
		return new ResponseEntity<>(service.insert(file, path), HttpStatus.CREATED);
	}
	

}
