package com.naver.zipviewer.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.naver.zipviewer.domain.UserVO;
import com.naver.zipviewer.domain.UserVO2;
import com.naver.zipviewer.persistence.UserDAO;

@Service
public class UserService {

	@Autowired private UserDAO dao;

	public UserVO2 insert(String userId, String userPassword, String userName)
	{
		validation(userId, userPassword, userName);
		
		UserVO vo = new UserVO();
		UserVO2 vo2 = new UserVO2();
		vo.setUserId(userId);
		vo.setUserPassword(userPassword);
		vo.setUserName(userName);
		vo.setUserRegisterTime(new Date());
		
		dao.insert(vo);

		vo2.setUserId(vo.getUserId());
		vo2.setUserName(vo.getUserName());
		vo2.setUserRegisterTime(vo.getUserRegisterTime());
		
		return vo2;
	}
	
	public UserVO select(String userId)
	{
		return dao.select(userId);
	}
	
	public void validation(String userId, String userPassword, String userName)
	{
		
		
	}
}
