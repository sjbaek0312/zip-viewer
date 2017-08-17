package com.naver.zipviewer.domain;

import java.util.Date;

public class UserVO2 {

	private String userId;
	private String userName;
	private Date userRegisterTime;
	
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
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
