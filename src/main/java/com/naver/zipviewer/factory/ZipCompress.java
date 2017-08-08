package com.naver.zipviewer.factory;

import java.io.FileInputStream;
import java.io.FileNotFoundException;

import org.apache.commons.compress.archivers.zip.ZipArchiveInputStream;

public class ZipCompress implements Compress {

	private String path;
	private long fileId;
	private String ext;
	
	ZipCompress (String path, long fileId, String ext)
	{
		this.path = path;
		this.fileId = fileId;
		this.ext = ext;
	}
	
	@Override
	public ZipArchiveInputStream getArchiveInputStream() throws FileNotFoundException
	{
		return new ZipArchiveInputStream(new FileInputStream(path + fileId + "." + ext), "EUC-KR");
	}
}
