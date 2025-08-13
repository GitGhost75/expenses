package de.expenses.filter;

import de.expenses.model.User;
import de.expenses.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;
import java.util.UUID;

import static de.expenses.common.UserConstants.USER_COOKIE;

@Component
public class UserFilter extends OncePerRequestFilter {


	private final UserRepository userRepo;

	public UserFilter(UserRepository userRepo) {
		this.userRepo = userRepo;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request,
	                                HttpServletResponse response,
	                                FilterChain filterChain)
			throws ServletException, IOException {

//		Optional<Cookie> userCookie = Optional.ofNullable(request.getCookies())
//		                                      .flatMap(cookies -> Arrays.stream(cookies)
//		                                                                .filter(cookie -> USER_COOKIE.equals(cookie.getName()))
//		                                                                .findFirst());
//
//		String userId = userCookie.map(Cookie::getValue).orElse(null);
//
//		if (userId == null || userId.isBlank() || !userRepo.existsById(UUID.fromString(userId))) {
//			// create user
//			User toBeSavedUser = new User();
//			toBeSavedUser.setName("TODO");
//			User savedUser = userRepo.save(toBeSavedUser);
//
//			ResponseCookie cookie = ResponseCookie.from(USER_COOKIE, savedUser.getId().toString())
//			                                      .path("/")
//			                                      .httpOnly(true)
//			                                      .secure(true)
//			                                      .sameSite("None")
//			                                      .build();
//
//			response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
//
//			userId = savedUser.getId().toString();
//		}
//
//		// Setze als Request-Attribut oder in SecurityContext (optional)
//		request.setAttribute(USER_COOKIE, userId);

		filterChain.doFilter(request, response);
	}
}
