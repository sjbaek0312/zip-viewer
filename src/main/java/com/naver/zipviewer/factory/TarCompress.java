package com.naver.zipviewer.factory;

import java.io.FileInputStream;
import java.io.FileNotFoundException;

import org.apache.commons.compress.archivers.tar.TarArchiveInputStream;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class TarCompress implements Compress {

	@Value("#{config['encoding']}") String encoding;
	@Override
	public TarArchiveInputStream getArchiveInputStream(String fullPath) throws FileNotFoundException
	{
		return new TarArchiveInputStream(new FileInputStream(fullPath), encoding);
	}
	
	@Override
	public void validation()
	{
		// 예외 상황 추가
	}
}
