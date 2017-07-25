package com.lab2.service;
import java.util.List;
import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.lab2.domain.FileVO;
import com.lab2.persistence.FileDAO;

@Service
public class FileServiceImpl implements FileService {

	@Inject private FileDAO dao;
	
	@Override
	public void insert(FileVO vo)
	{
		dao.insert(vo);
	}
	
	@Override
	public List<FileVO> listAll()
	{
		return dao.listAll();
	}
}
