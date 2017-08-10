package com.naver.zipviewer.factory;

import java.util.HashMap;
import java.util.Map;

public class CompressFactory {

	public static Compress createCompress(String fullPath)
	{
		Map<String, Compress> compresses = new HashMap<String, Compress>()
		{
			private static final long serialVersionUID = 1L;
			{
				put("zip", new ZipCompress(fullPath));
				put("jar", new JarCompress(fullPath));
				put("tar", new TarCompress(fullPath));
			}
		};
		
		return compresses.get(fullPath.substring(fullPath.lastIndexOf(".") + 1).toLowerCase());
	}
}