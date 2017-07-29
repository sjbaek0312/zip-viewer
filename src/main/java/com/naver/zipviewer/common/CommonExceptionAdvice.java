package com.naver.zipviewer.common;

import java.io.IOException;
import java.sql.SQLException;

import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.MultipartException;

@ControllerAdvice("com.naver.zipviewer")
public class CommonExceptionAdvice {

	// 400
	@ExceptionHandler(IllegalStateException.class)
	public ResponseEntity<ErrorResponse> handleIllegalStateException(IllegalStateException e)
	{
		ErrorResponse er = new ErrorResponse();
		er.setErrorCode(HttpStatus.BAD_REQUEST.value());
		er.setMsg("잘못된 요청");
		return new ResponseEntity<ErrorResponse>(er, HttpStatus.BAD_REQUEST);
	}
	
	// 404
	@ExceptionHandler(NotFoundException.class)
	public ResponseEntity<ErrorResponse> handleNotFoundException(NotFoundException e)
	{
		ErrorResponse er = new ErrorResponse();
		er.setErrorCode(HttpStatus.NOT_FOUND.value());
		er.setMsg("클라이언트가 요청한 리소스를 서버에서 찾을 수 없음");
		return new ResponseEntity<ErrorResponse>(er, HttpStatus.NOT_FOUND);
	}
	
	// 500
	@ExceptionHandler(MultipartException.class)
	public ResponseEntity<ErrorResponse> handleMultipartException(MultipartException e)
	{
		ErrorResponse er = new ErrorResponse();
		er.setErrorCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
		er.setMsg("내부 서버 오류");
		return new ResponseEntity<ErrorResponse>(er, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	@ExceptionHandler(SQLException.class)
	public ResponseEntity<ErrorResponse> handleSQLException(SQLException e)
	{
		ErrorResponse er = new ErrorResponse();
		er.setErrorCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
		er.setMsg("내부 서버 오류");
		return new ResponseEntity<ErrorResponse>(er, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	@ExceptionHandler(IOException.class)
	public ResponseEntity<ErrorResponse> handleIOException(IOException e)
	{
		ErrorResponse er = new ErrorResponse();
		er.setErrorCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
		er.setMsg("내부 서버 오류");
		return new ResponseEntity<ErrorResponse>(er, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorResponse> handleException(Exception e)
	{
		ErrorResponse er = new ErrorResponse();
		er.setErrorCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
		er.setMsg("내부 서버 오류");
		return new ResponseEntity<ErrorResponse>(er, HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
