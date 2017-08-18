package com.naver.zipviewer.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

	@Value("#{config['fileDownloadPath']}") String targetParentPath;
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
	public void download(@PathVariable("fileId") long fileId, HttpServletResponse response) throws Exception
	{
		File file = service.download(fileId, "admin");
		InputStream is = null;
		OutputStream os = null;
		
		response.setStatus(200);
		response.setHeader("Content-Disposition", "attachment; filename=\"" + new String(service.select(fileId).getFileName().getBytes("UTF-8"), "ISO-8859-1")+"\"");

		try
		{
			is = new FileInputStream(file);
			os = response.getOutputStream();
			byte[] buffer = new byte[1024 * 8];		
			while(true)			
			{
				int count = is.read(buffer);
				if(count == -1)
					break;
				os.write(buffer, 0, count);
			}
		}
		finally
		{
			try
			{
				is.close();
			}
			finally
			{
				os.flush();
				os.close();
			}
		}
	}
	
	@DeleteMapping(value = "/{fileId}")
	public ResponseEntity<?> delete(@PathVariable("fileId") long fileId) throws Exception
	{
		service.delete(fileId, "admin");
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}