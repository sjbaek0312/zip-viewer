package com.naver.zipviewer.persistence;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.naver.zipviewer.domain.UserVO;

@Repository
public class UserDAO {

	@Autowired private SqlSessionTemplate sqlSessionTemplate;
	private static String namespace = "com.naver.zipviewer.mapper.UserMapper";
	
	public void insert(UserVO vo)
	{
		sqlSessionTemplate.insert(namespace+".insert", vo);
	}
	
	public UserVO select(String userId)
	{
		return sqlSessionTemplate.selectOne(namespace+".select", userId);
	}
}
