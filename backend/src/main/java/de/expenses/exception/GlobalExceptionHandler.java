package de.expenses.exception;

import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class
GlobalExceptionHandler {

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ApiErrorResponse> handleValidationErrors(
			MethodArgumentNotValidException ex,
			HttpServletRequest request) {

		Map<String, String> fieldErrors = new HashMap<>();
		ex.getBindingResult().getFieldErrors().forEach(error ->
				                                               fieldErrors.put(error.getField(), error.getDefaultMessage())
		                                              );

		ApiErrorResponse response = ApiErrorResponse.builder().
		                                            status(HttpStatus.BAD_REQUEST.value()).
		                                            error("Bad Request").
		                                            message("Validierung fehlgeschlagen").
		                                            path(request.getRequestURI()).
		                                            validationErrors(fieldErrors).build();

		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(EntityNotFoundException.class)
	public ResponseEntity<ApiErrorResponse> handleEntityNotFoundException(Exception ex, HttpServletRequest request) {
		ApiErrorResponse response = ApiErrorResponse.builder().
		                                            status(HttpStatus.NOT_FOUND.value()).
		                                            error("Not found").
		                                            message(ex.getMessage()).
		                                            path(request.getRequestURI()).build();

		return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ApiErrorResponse> handleGenericException(
			Exception ex,
			HttpServletRequest request) {

		ApiErrorResponse response = ApiErrorResponse.builder().
		                                            status(HttpStatus.INTERNAL_SERVER_ERROR.value()).
		                                            error("Internal Server Error").
		                                            message(ex.getMessage()).
		                                            path(request.getRequestURI()).build();

		return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
