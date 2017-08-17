package com.naver.zipviewer.domain;

import java.util.Date;

public class UserVO {

	private String userId;
	private String userPassword;
	private String userName;
	private Date userRegisterTime;
	
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUserPassword() {
		return userPassword;
	}
	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public Date getUserRegisterTime() {
		return userRegisterTime;
	}
	public void setUserRegisterTime(Date userRegisterTime) {
		this.userRegisterTime = userRegisterTime;
	}
	
}
