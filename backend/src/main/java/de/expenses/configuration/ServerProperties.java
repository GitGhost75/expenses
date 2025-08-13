package de.expenses.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
@ConfigurationProperties(prefix = "servers")
public class ServerProperties {
	private List<String> allowedServers;

	public List<String> getAllowedServers() {
		return allowedServers;
	}

	public void setAllowedServers(List<String> server) {
		this.allowedServers = server;
	}
}