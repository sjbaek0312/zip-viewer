package com.lab2.persistence;

import java.util.List;
import com.lab2.domain.FileVO;

public interface FileDAO {

	public void insert(FileVO vo);
	public List<FileVO> listAll();
}
