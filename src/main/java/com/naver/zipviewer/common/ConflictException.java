package com.naver.zipviewer.common;

public class ConflictException extends RuntimeException {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public ConflictException(String errorMessage)
	{
		super(errorMessage);
	}
}
