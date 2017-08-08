package com.naver.zipviewer.factory;

import java.io.FileInputStream;
import java.io.FileNotFoundException;

import org.apache.commons.compress.archivers.tar.TarArchiveInputStream;

public class TarCompress implements Compress {

	private String path;
	private long fileId;
	private String ext;
	
	TarCompress (String path, long fileId, String ext)
	{
		this.path = path;
		this.fileId = fileId;
		this.ext = ext;
	}
	
	@Override
	public TarArchiveInputStream getArchiveInputStream() throws FileNotFoundException
	{
		return new TarArchiveInputStream(new FileInputStream(path + fileId + "." + ext), "EUC-KR");
	}
}
