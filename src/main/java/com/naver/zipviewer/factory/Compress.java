package com.naver.zipviewer.factory;

import java.io.FileNotFoundException;
import java.util.List;

import org.apache.commons.compress.archivers.ArchiveEntry;
import org.apache.commons.compress.archivers.ArchiveInputStream;

public interface Compress {

	public ArchiveInputStream getArchiveInputStream() throws FileNotFoundException;
	public List<ArchiveEntry> getArchiveEntry();
}
