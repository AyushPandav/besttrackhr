package com.example.employeemanagement.security;

import io.jsonwebtoken.JwtException;  // For catching JWT errors
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/** This class represents the JWT request filter. */
@Component
public class JwtRequestFilter extends OncePerRequestFilter {

  private static final Logger logger = LoggerFactory.getLogger(JwtRequestFilter.class);

  @Autowired private UserDetailsService userDetailsService;

  @Autowired private JwtTokenUtil jwtTokenUtil;

  /**
   * Do filter internal.
   *
   * @param request The HTTP servlet request
   * @param response The HTTP servlet response
   * @param chain The filter chain
   * @throws ServletException If an error occurs
   * @throws IOException If an error occurs
   */
  @Override
  protected void doFilterInternal(
      HttpServletRequest request, HttpServletResponse response, FilterChain chain)
      throws ServletException, IOException {

    final String authorizationHeader = request.getHeader("Authorization");

    String username = null;
    String jwt = null;

    if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
      jwt = authorizationHeader.substring(7);
      if (jwt != null && !jwt.trim().isEmpty()) {
        try {
          username = jwtTokenUtil.extractUsername(jwt);  // This can throw SignatureException
          logger.debug("Extracted username from JWT: {}", username);
        } catch (JwtException e) {  // Catch all JWT issues (includes SignatureException)
          String partialJwt = jwt.substring(0, Math.min(20, jwt.length()));
          logger.warn("Invalid JWT token (partial: {}...) – {}", partialJwt, e.getMessage());
          response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);  // Return 401
          response.setContentType("application/json");
          response.getWriter().write("{\"error\":\"Invalid or expired token\"}");  // JSON response
          return;  // Stop chain – don't proceed to controller
        }
      } else {
        logger.debug("Empty JWT after stripping Bearer");
      }
    } else {
      logger.debug("No Authorization header or not Bearer");
    }

    if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

      UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

      if (jwtTokenUtil.validateToken(jwt, userDetails.getUsername())) {
        logger.debug("JWT validated for user: {}, authorities: {}", username, userDetails.getAuthorities());

        UsernamePasswordAuthenticationToken authenticationToken =
            new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities());
        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
      } else {
        logger.warn("JWT validation failed for username: {}", username);
      }
    }
    chain.doFilter(request, response);
  }
}