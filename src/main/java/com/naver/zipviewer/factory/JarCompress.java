package com.naver.zipviewer.factory;

import java.io.FileInputStream;
import java.io.FileNotFoundException;

import org.apache.commons.compress.archivers.jar.JarArchiveInputStream;

public class JarCompress implements Compress {

	private String fullPath;
	
	JarCompress (String fullPath)
	{
		this.fullPath = fullPath;
	}
	
	@Override
	public JarArchiveInputStream getArchiveInputStream() throws FileNotFoundException
	{
		return new JarArchiveInputStream(new FileInputStream(fullPath));
	}
}
