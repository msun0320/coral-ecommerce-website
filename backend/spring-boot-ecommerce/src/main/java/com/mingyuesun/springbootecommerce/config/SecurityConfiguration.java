package com.mingyuesun.springbootecommerce.config;

import com.mingyuesun.springbootecommerce.security.JWTRequestFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.intercept.AuthorizationFilter;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;

@Configuration
public class SecurityConfiguration {

    private JWTRequestFilter jwtRequestFilter;

    public SecurityConfiguration(JWTRequestFilter jwtRequestFilter) {
        this.jwtRequestFilter = jwtRequestFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        // Disable Cross Site Request Forgery
        http.csrf(csrf -> csrf.disable());

        http.addFilterBefore(jwtRequestFilter, AuthorizationFilter.class);

        // Protect endpoints at /api/<type>/add
        http.authorizeHttpRequests(configurer ->
                        configurer
                                .requestMatchers("/api/test/**")
                                .authenticated()
                                .anyRequest().permitAll());

        // Add CORS filters
        http.cors(Customizer.withDefaults());

        // Add content negotiation strategy
        http.setSharedObject(ContentNegotiationStrategy.class,
                new HeaderContentNegotiationStrategy());

        return http.build();
    }

}