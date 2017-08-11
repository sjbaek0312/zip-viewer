package com.naver.zipviewer.factory;

import java.io.FileNotFoundException;

import org.apache.commons.compress.archivers.ArchiveInputStream;

public interface Compress {

	public ArchiveInputStream getArchiveInputStream(String fullPath) throws FileNotFoundException;
	public void validation();
}
