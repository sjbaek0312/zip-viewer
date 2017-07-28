package com.naver.zipviewer.controller;

import java.io.IOException;
import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
		return new ResponseEntity<>(service.listAll(), HttpStatus.OK);
	}

	@PostMapping(value = "")
	public ResponseEntity<?> insert(@RequestPart("file") MultipartFile file, Model model) throws SQLException, IOException, MultipartException
	{
		return new ResponseEntity<>(service.insert(file, path), HttpStatus.CREATED);
	}
	

}
