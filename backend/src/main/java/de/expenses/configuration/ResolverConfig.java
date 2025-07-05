package de.expenses.configuration;

import de.expenses.annotation.CurrentUserArgumentResolver;
import de.expenses.annotation.GroupCodeArgumentResolver;
import de.expenses.annotation.GroupIdArgumentResolver;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class ResolverConfig implements WebMvcConfigurer {

//	private final CurrentUserArgumentResolver resolver;
//	private final GroupCodeArgumentResolver codeResolver;
//	private final GroupIdArgumentResolver idResolver;

	private final List<HandlerMethodArgumentResolver> customResolvers;

	@Override
	public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
//		resolvers.add(resolver);
//		resolvers.add(codeResolver);
//		resolvers.add(idResolver);
		resolvers.addAll(customResolvers);
	}
}