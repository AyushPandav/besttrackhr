package com.example.employeemanagement.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
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
}
