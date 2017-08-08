package com.naver.zipviewer.factory;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.compress.archivers.ArchiveEntry;
import org.apache.commons.compress.archivers.jar.JarArchiveInputStream;

public class JarCompress implements Compress {

	private String path;
	private long fileId;
	private String ext;
	
	JarCompress (String path, long fileId, String ext)
	{
		this.path = path;
		this.fileId = fileId;
		this.ext = ext;
	}
	
	@Override
	public JarArchiveInputStream getArchiveInputStream() throws FileNotFoundException
	{
		return new JarArchiveInputStream(new FileInputStream(path + fileId + "." + ext), "EUC-KR");
	}
	@Override
	public List<ArchiveEntry> getArchiveEntry()
	{
		return new ArrayList<ArchiveEntry>();
	}
}
