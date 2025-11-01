package com.example.employeemanagement.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")  // Your React dev server
                .allowedMethods("GET", "POST", "DELETE", "PUT", "OPTIONS")  // Includes preflight
                .allowedHeaders("*")  // Allows Authorization, Content-Type, etc.
                .allowCredentials(true);  // For cookies/sessions if needed (safe with JWT)
    }
}