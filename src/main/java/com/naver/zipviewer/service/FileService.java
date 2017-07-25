package com.naver.zipviewer.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.naver.zipviewer.domain.FileVO;
import com.naver.zipviewer.persistence.FileDAO;

@Service
public class FileService {
	
@Autowired private FileDAO dao;
	
	public void insert(FileVO vo)
	{
		dao.insert(vo);
	}
	
	public List<FileVO> listAll()
	{
		return dao.listAll();
	}
}
