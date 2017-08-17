package com.naver.zipviewer.controller;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
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
	

	@PostMapping(value = "")
	public ResponseEntity<?> insert(@RequestPart("file") MultipartFile file) throws IOException, MultipartException, FileNotFoundException
	{
		return new ResponseEntity<>(service.insert(file), HttpStatus.CREATED);
	}
	
	@GetMapping(value = "")
	public ResponseEntity<?> list() throws IllegalStateException
	{
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("items", service.listAll("admin"));
		return new ResponseEntity<>(map, HttpStatus.OK);
	}
	
	@GetMapping(value = "/{fileId}")
	public ResponseEntity<?> download(@PathVariable("fileId") long fileId) throws Exception
	{
		File file = service.download(fileId, "admin");
		byte[] fileData = FileCopyUtils.copyToByteArray(file);
		
		HttpHeaders header = new HttpHeaders();
		header.add("Content-Disposition", "attachment; filename=\"" + new String(file.getName().getBytes("UTF-8"), "ISO-8859-1")+"\"");
		file.delete();
		
		return new ResponseEntity<>(fileData, header, HttpStatus.OK);
	}
	
	@DeleteMapping(value = "/{fileId}")
	public ResponseEntity<?> delete(@PathVariable("fileId") long fileId) throws Exception
	{
		service.delete(fileId, "admin");
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}