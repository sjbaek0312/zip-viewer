package com.lab2.persistence;

import java.util.List;
import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.lab2.domain.FileVO;

@Repository
public class FileDAOImpl implements FileDAO{

	@Inject private SqlSession sqlSession;
	private static String namespace = "com.lab2.mapper.FileMapper";
	
	@Override
	public void insert(FileVO vo)
	{
		sqlSession.insert(namespace+".insert", vo);
	}
	
	@Override
	public List<FileVO> listAll()
	{
		return sqlSession.selectList(namespace+".listAll");
	}
}
