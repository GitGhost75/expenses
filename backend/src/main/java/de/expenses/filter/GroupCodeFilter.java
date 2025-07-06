package de.expenses.filter;

import de.expenses.common.GroupConstants;
import de.expenses.service.GroupService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.security.InvalidParameterException;
import java.util.UUID;

@Component
public class GroupCodeFilter extends OncePerRequestFilter {
	@Autowired
	private GroupService groupService;

	@Override
	protected void doFilterInternal(HttpServletRequest request,
	                                HttpServletResponse response,
	                                FilterChain filterChain)
			throws ServletException, IOException {

		String groupCode = request.getHeader("X-Group-Code");

		if ( groupCode != null && !groupService.isCodeValid(groupCode)) {
			throw new InvalidParameterException("Code " + groupCode + " is invalid");
		}
		request.setAttribute(GroupConstants.GROUP_CODE, groupCode);
		filterChain.doFilter(request, response);
	}
}

