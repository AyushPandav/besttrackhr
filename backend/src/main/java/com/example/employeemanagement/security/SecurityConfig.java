package com.example.employeemanagement.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Spring Security configuration for JWT + CORS + Role-based access.
 */
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService)
            .passwordEncoder(passwordEncoder());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeRequests()
                // Allow React dev server and preflight requests
                .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // Public endpoints
                .antMatchers(
                    "/authenticate",
                    "/register",
                    "/verify-username/**",
                    "/reset-password",
                    "/oauth/google",
                    "/v3/api-docs/**",
                    "/swagger-ui/**"
                ).permitAll()

                // Role-based endpoints
                .antMatchers("/api/userprofiles/**").hasRole("HR")
                .antMatchers("/api/hr/**").hasRole("HR")
                .antMatchers("/api/employees/**").hasAnyRole("HR", "EMPLOYEE")
                .antMatchers("/api/calendar/hr/**").hasRole("HR")
                .antMatchers("/api/calendar/**").hasAnyRole("HR", "EMPLOYEE")

                // All other endpoints require authentication
                .anyRequest().authenticated()
            .and()
            // Add JWT filter
            .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)

            // Enable CORS globally
            .cors();
    }
}
