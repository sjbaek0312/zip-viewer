package com.naver.zipviewer.factory;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CompressFactory {

	@Autowired private Compress zipCompress;
	@Autowired private Compress jarCompress;
	@Autowired private Compress tarCompress;
	
	public Compress createCompress(String ext)
	{
		Map<String, Compress> compresses = new HashMap<String, Compress>()
		{
			private static final long serialVersionUID = 1L;
			{
				put("zip", zipCompress);
				put("jar", jarCompress);
				put("tar", tarCompress);
			}
		};
		return compresses.get(ext.toLowerCase());
	}
}