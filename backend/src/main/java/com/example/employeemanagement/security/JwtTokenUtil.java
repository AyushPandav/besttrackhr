package com.example.employeemanagement.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
<<<<<<< HEAD
import java.util.Base64;  // For Base64 decoding
import java.util.HashMap;
import java.util.Map;
import java.util.Arrays;  // For key preview logging
import org.springframework.beans.factory.annotation.Value;
=======
import java.util.HashMap;
import java.util.Map;
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.function.Function;
<<<<<<< HEAD
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
=======
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d

/** This class represents the JWT token utility. */
@Component
public class JwtTokenUtil {

<<<<<<< HEAD
  private static final Logger logger = LoggerFactory.getLogger(JwtTokenUtil.class);

  @Value("${jwt.secret:secretKey}")  // Inject from application.properties, fallback to hardcoded
  private String secret;

  // Cache decoded key for efficiency (avoids re-decoding per call)
  private byte[] getSigningKeyBytes() {
    try {
      if ("secretKey".equals(secret)) {
        logger.warn("Using fallback secret 'secretKey' – check your application.properties!");
      }
      byte[] keyBytes = Base64.getDecoder().decode(secret);  // Decode to bytes
      // TEMP: Diagnostic log (remove after fix – don't log full key in prod!)
      String keyPreview = "Decoded key preview: " + Arrays.toString(Arrays.copyOf(keyBytes, Math.min(5, keyBytes.length))) + "...";
      logger.info("JWT Secret loaded: '{}' (length: {}, preview: {})", 
                  secret.substring(0, 8) + "...", secret.length(), keyPreview);
      return keyBytes;
    } catch (IllegalArgumentException e) {
      logger.error("Invalid Base64 secret: {}", secret.substring(0, Math.min(10, secret.length())) + "...", e);
      throw new IllegalStateException("JWT secret is not valid Base64", e);
    }
  }
=======
  /** The secret key. */
  private String secret = "secretKey";
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d

  /**
   * Extract username.
   *
   * @param token The token
   * @return The username
   */
  public String extractUsername(String token) {
    return extractClaim(token, Claims::getSubject);
  }

  /**
   * Extract expiration.
   *
   * @param token The token
   * @return The expiration date
   */
  public Date extractExpiration(String token) {
    return extractClaim(token, Claims::getExpiration);
  }

  /**
   * Extract claim.
   *
   * @param token The token
   * @param claimsResolver The claims resolver
   * @return The claim
   * @param <T> The type of the claim
   */
  public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
    final Claims claims = extractAllClaims(token);
    return claimsResolver.apply(claims);
  }

  /**
   * Extract all claims.
   *
   * @param token The token
   * @return The claims
   */
  private Claims extractAllClaims(String token) {
<<<<<<< HEAD
    byte[] keyBytes = getSigningKeyBytes();  // Use decoded bytes
    return Jwts.parser()
        .setSigningKey(keyBytes)  // Pass bytes, not String
        .parseClaimsJws(token)
        .getBody();
=======
    return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
  }

  /**
   * Determine if the token is expired.
   *
   * @param token The token
   * @return True if the token is expired, false otherwise
   */
  private Boolean isTokenExpired(String token) {
    return extractExpiration(token).before(new Date());
  }

  /**
   * Generate JWT token.
   *
   * @param username The username
<<<<<<< HEAD
   * @param role The role
=======
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
   * @return The JWT token
   */
  public String generateToken(String username, String role) {
    Map<String, Object> claims = new HashMap<>();
    claims.put("role", role);
<<<<<<< HEAD
    byte[] keyBytes = getSigningKeyBytes();  // Use decoded bytes
=======
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
    return Jwts.builder()
        .setClaims(claims)
        .setSubject(username)
        .setIssuedAt(new Date())
<<<<<<< HEAD
        .setExpiration(new Date(System.currentTimeMillis() + 1000L * 60 * 60 * 24 * 7))  // 7 days
        .signWith(SignatureAlgorithm.HS256, keyBytes)  // Pass bytes, not String
=======
        .setExpiration(new Date(System.currentTimeMillis() + 1000L * 60 * 60 * 24 * 7))
        .signWith(SignatureAlgorithm.HS256, secret)
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
        .compact();
  }

  /**
   * Validate token.
   *
   * @param token The token
   * @param username The username
   * @return True if the token is valid, false otherwise
   */
  public Boolean validateToken(String token, String username) {
<<<<<<< HEAD
    try {
      final String extractedUsername = extractUsername(token);
      boolean isValid = (extractedUsername.equals(username) && !isTokenExpired(token));
      if (logger.isDebugEnabled()) {
        logger.debug("Token validation for {}: {}", username, isValid ? "valid" : "invalid");
      }
      return isValid;
    } catch (Exception e) {  // Catch any JWT exceptions here too
      logger.warn("Token validation failed due to exception for username: {}", username, e);
      return false;
    }
=======
    final String extractedUsername = extractUsername(token);
    return (extractedUsername.equals(username) && !isTokenExpired(token));
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
  }

  /** Extract role claim from token. */
  public String extractRole(String token) {
<<<<<<< HEAD
    try {
      final Claims claims = extractAllClaims(token);
      Object role = claims.get("role");
      return role == null ? null : role.toString();
    } catch (Exception e) {  // Graceful handling
      logger.warn("Failed to extract role from token", e);
      return null;
    }
  }
}
=======
    final Claims claims = extractAllClaims(token);
    Object role = claims.get("role");
    return role == null ? null : role.toString();
  }
}
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
