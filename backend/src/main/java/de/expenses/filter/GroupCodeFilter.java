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

		String groupId = request.getHeader("X-Group-Id");
		String groupCode = request.getHeader("X-Group-Code");

		if (groupId != null && groupCode != null && !groupService.isCodeValid(UUID.fromString(groupId), groupCode)) {
			response.sendError(HttpStatus.FORBIDDEN.value(), "Invalid group code");
			return;
		}
		request.setAttribute(GroupConstants.GROUP_ID, groupId);
		request.setAttribute(GroupConstants.GROUP_CODE, groupCode);
		filterChain.doFilter(request, response);
	}
}

