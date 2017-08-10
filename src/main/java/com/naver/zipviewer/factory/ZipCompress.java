package com.naver.zipviewer.factory;

import java.io.FileInputStream;
import java.io.FileNotFoundException;

import org.apache.commons.compress.archivers.zip.ZipArchiveInputStream;

public class ZipCompress implements Compress {

	private String fullPath;
	
	ZipCompress (String fullPath)
	{
		this.fullPath = fullPath;
	}
	
	@Override
	public ZipArchiveInputStream getArchiveInputStream() throws FileNotFoundException
	{
		return new ZipArchiveInputStream(new FileInputStream(fullPath), "EUC-KR");
	}
}
