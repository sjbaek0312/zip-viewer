package com.lab2.service;
import java.util.List;
import com.lab2.domain.FileVO;

public interface FileService {

	public void insert(FileVO vo);
	public List<FileVO> listAll();
}
