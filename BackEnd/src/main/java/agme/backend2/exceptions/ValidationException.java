package agme.backend2.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class ValidationException extends RuntimeException {
	public ValidationException(String message) {
		super(message);
	}
}
