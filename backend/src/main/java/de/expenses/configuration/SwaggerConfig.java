package de.expenses.configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {

	private final ServerProperties serverProperties;

	public SwaggerConfig(ServerProperties serverProperties) {
		this.serverProperties = serverProperties;
	}

	@Bean
	public OpenAPI customOpenAPI() {
		return new OpenAPI()
				.servers(createServerList());
	}

	private List<Server> createServerList() {
		return serverProperties.getAllowedServers().stream().map(serverUrl ->
				                                                                            new Server().url(serverUrl)).toList();
	}
}