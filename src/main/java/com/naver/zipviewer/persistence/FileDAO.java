package com.naver.zipviewer.persistence;

import java.util.List;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.naver.zipviewer.domain.FileVO;

@Repository
public class FileDAO {

	@Autowired private SqlSession sqlSession;
	private static String namespace = "com.naver.zipviewer.mapper.FileMapper";
	
	public void insert(FileVO vo)
	{
		sqlSession.insert(namespace+".insert", vo);
	}
	
	public List<FileVO> listAll()
	{
		return sqlSession.selectList(namespace+".listAll");
	}
}
