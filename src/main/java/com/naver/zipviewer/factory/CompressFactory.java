package com.naver.zipviewer.factory;

import java.util.HashMap;
import java.util.Map;

public class CompressFactory {

	public static Compress createCompress(String path, long fileId, String ext)
	{
		Map<String, Compress> compresses = new HashMap<String, Compress>()
		{
			private static final long serialVersionUID = 1L;
			{
				put("zip", new ZipCompress(path, fileId, ext));
				put("jar", new JarCompress(path, fileId, ext));
				put("tar", new TarCompress(path, fileId, ext));
			}
		};
		
		return compresses.get(ext.toLowerCase());
	}
}