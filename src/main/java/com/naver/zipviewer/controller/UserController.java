package com.naver.zipviewer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.naver.zipviewer.service.UserService;

@RestController
@RequestMapping(value = "/api/users")
public class UserController {

	@Autowired private UserService service;
	
	@PostMapping(value = "")
	public ResponseEntity<?> insert(@RequestParam("userId") String userId, @RequestParam("userPassword") String userPassword, @RequestParam("userName") String userName)
	{
		return new ResponseEntity<>(service.insert(userId, userPassword, userName), HttpStatus.CREATED);
	}
}
