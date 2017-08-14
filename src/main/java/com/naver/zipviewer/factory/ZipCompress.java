package com.naver.zipviewer.factory;

import java.io.FileInputStream;
import java.io.FileNotFoundException;

import org.apache.commons.compress.archivers.zip.ZipArchiveInputStream;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ZipCompress implements Compress {

	@Value("#{config['encoding']}") String encoding;
	@Override
	public ZipArchiveInputStream getArchiveInputStream(String fullPath) throws FileNotFoundException
	{
		return new ZipArchiveInputStream(new FileInputStream(fullPath), encoding);
	}
	
	@Override
	public void validation()
	{
		// 예외 상황 추가
	}
}
