package com.example.employeemanagement.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
<<<<<<< HEAD
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
=======
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/** This class represents the security configuration. */
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  /** The user details service. */
  @Autowired private UserDetailsService userDetailsService;

  @Autowired private JwtRequestFilter jwtRequestFilter;

  /**
   * Configure authentication.
   *
   * @param auth The authentication manager builder
   * @throws Exception If an error occurs
   */
  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
  }

  /**
   * Password encoder.
   *
   * @return The password encoder
   */
  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  /**
   * Authentication manager bean.
   *
   * @return The authentication manager
   * @throws Exception If an error occurs
   */
  @Override
  @Bean
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
  }

  /**
   * Configure security.
   *
   * @param http The HTTP security
   * @throws Exception If an error occurs
   */
  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.csrf().disable()
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        .authorizeRequests()
        .antMatchers("/authenticate", "/register", "/verify-username/**", "/reset-password", "/oauth/google", "/v3/api-docs/**", "/swagger-ui/**").permitAll()
        .antMatchers("/api/hr/**").hasRole("HR")
        .antMatchers("/api/employees/**").hasAnyRole("HR", "EMPLOYEE")
        .antMatchers("/api/calendar/hr/**").hasRole("HR")
        .antMatchers("/api/calendar/**").hasAnyRole("HR", "EMPLOYEE")
        .anyRequest().authenticated();

    http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
  }
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
}
