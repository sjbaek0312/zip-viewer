package com.naver.zipviewer.persistence;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.naver.zipviewer.domain.FileVO;

@Repository
public class FileDAO {

	@Autowired private SqlSessionTemplate sqlSessionTemplate;
	private static String namespace = "com.naver.zipviewer.mapper.FileMapper";
	
	public void insert(FileVO vo)
	{
		sqlSessionTemplate.insert(namespace+".insert", vo);
	}
	
	public List<FileVO> listAll(String userId)
	{
		return sqlSessionTemplate.selectList(namespace+".listAll", userId);
	}
	
	public FileVO select(long fileId)
	{
		return sqlSessionTemplate.selectOne(namespace+".select", fileId);
	}
	
	public void delete(long fileId)
	{
		sqlSessionTemplate.delete(namespace+".delete", fileId);
	}
}
