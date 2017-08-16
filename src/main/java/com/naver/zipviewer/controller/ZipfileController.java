package com.naver.zipviewer.controller;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.naver.zipviewer.service.ZipfileService;

@RestController
@RequestMapping(value = "/api/files/{fileId}/zipfiles")
public class ZipfileController {
	
	@Autowired private ZipfileService service;
	
	@PostMapping(value = "")
	public ResponseEntity<?> load(@PathVariable(value = "fileId") long fileId) throws Exception
	{
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("items", service.load(fileId, "admin"));
		return new ResponseEntity<>(map, HttpStatus.CREATED);
	}
	
	@GetMapping(value = "")
	public ResponseEntity<?> list(@PathVariable(value = "fileId") long fileId, @RequestParam(value = "zipfileParentId") long zipfileParentId) throws Exception
	{
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("items", service.list(fileId, zipfileParentId, "admin"));
		return new ResponseEntity<>(map, HttpStatus.OK);
	}
	
	@PatchMapping(value = "")
	public ResponseEntity<?> renew(@PathVariable(value = "fileId") long fileId) throws Exception
	{
		service.renew(fileId, "admin");
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	
	@DeleteMapping(value = "")
	public ResponseEntity<?> expire(@PathVariable(value = "fileId") long fileId) throws Exception
	{
		service.expire(fileId, "admin");
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	
	@GetMapping(value = "/{zipfileId}")
	public ResponseEntity<?> download(@PathVariable(value = "fileId") long fileId, @PathVariable(value = "zipfileId") long zipfileId) throws Exception
	{
		File file = service.download(fileId, zipfileId, "admin");
		byte[] fileData = FileCopyUtils.copyToByteArray(file);

		HttpHeaders header = new HttpHeaders();
		header.add("Content-Disposition", "attachment; filename=\"" + new String(file.getName().getBytes("UTF-8"), "ISO-8859-1")+"\"");
		file.delete();
		
		return new ResponseEntity<>(fileData, header, HttpStatus.OK);
	}
}
