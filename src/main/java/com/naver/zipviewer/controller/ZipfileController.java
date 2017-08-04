package com.naver.zipviewer.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.naver.zipviewer.service.ZipfileService;

@RestController
@RequestMapping(value = "/api/files/{fileId}/zipfiles")
public class ZipfileController {
	
	@Autowired private ZipfileService service;
	@Value("#{config['fileUploadPath']}") String path;
	
	@PostMapping(value = "")
	public ResponseEntity<?> load(@PathVariable(value = "fileId") long fileId) throws Exception
	{
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("items", service.load(fileId, path));
		return new ResponseEntity<>(map, HttpStatus.CREATED);
	}
}
