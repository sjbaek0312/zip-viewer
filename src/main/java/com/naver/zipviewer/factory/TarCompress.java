package com.naver.zipviewer.factory;

import java.io.FileInputStream;
import java.io.FileNotFoundException;

import org.apache.commons.compress.archivers.tar.TarArchiveInputStream;

public class TarCompress implements Compress {

	private String fullPath;
	
	TarCompress (String fullPath)
	{
		this.fullPath = fullPath;
	}
	
	@Override
	public TarArchiveInputStream getArchiveInputStream() throws FileNotFoundException
	{
		return new TarArchiveInputStream(new FileInputStream(fullPath), "EUC-KR");
	}
}
