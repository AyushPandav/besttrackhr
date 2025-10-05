package com.example.employeemanagement.controller;

import com.example.employeemanagement.model.User;
import com.example.employeemanagement.model.Role;
import com.example.employeemanagement.repository.UserRepository;
import com.example.employeemanagement.security.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Parameter;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/** This class represents the REST API controller for user authentication. */
@RestController
@Tag(name = "Authentication APIs", description = "API Operations related to user authentication")
public class AuthController {

  /** The authentication manager. */
  @Autowired
  private AuthenticationManager authenticationManager;

  /** The user details service. */
  @Autowired
  private UserDetailsService userDetailsService;

  /** The user repository. */
  @Autowired
  private UserRepository userRepository;

  /** The password encoder. */
  @Autowired
  private PasswordEncoder passwordEncoder;

  /** The JWT token util. */
  @Autowired
  private JwtTokenUtil jwtTokenUtil;

  /**
   * Register user API.
   *
   * @param user The user to be registered
   * @return Success message
   */
  @Operation(summary = "Register user", description = "Register a new user")
  @ApiResponses(
      value = {
          @ApiResponse(responseCode = "200", description = "User registered successfully"),
          @ApiResponse(responseCode = "409", description = "Username already exists"),
          @ApiResponse(responseCode = "500", description = "Unable to register user")
      })
  @PostMapping("/register")
  public ResponseEntity<?> registerUser(@RequestBody User user) {
    try {
      user.setPassword(passwordEncoder.encode(user.getPassword()));
      userRepository.save(user);
      return ResponseEntity.ok("User registered successfully!");
    } catch (DataIntegrityViolationException e) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body("Error: Username already exists");
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: Unable to register user");
    }
  }

  /**
   * Authenticate user API.
   *
   * @param user The user to be authenticated
   * @return JWT token
   * @throws Exception If authentication fails
   */
  @Operation(summary = "Authenticate user", description = "Authenticate a user and generate a JWT token")
  @ApiResponses(
      value = {
          @ApiResponse(responseCode = "200", description = "User authenticated successfully"),
          @ApiResponse(responseCode = "401", description = "Invalid username or password"),
          @ApiResponse(responseCode = "500", description = "Unable to authenticate user")
      })
  @PostMapping("/authenticate")
  public ResponseEntity<?> createAuthenticationToken(@RequestBody User user) {
    try {
      authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
      );

      final UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
      // Load role for embedding into JWT
      Role role = userRepository.findByUsername(user.getUsername()).map(User::getRole).orElse(Role.EMPLOYEE);
      final String jwt = jwtTokenUtil.generateToken(userDetails.getUsername(), role.name());

      Map<String, String> response = new HashMap<>();
      response.put("token", jwt);
      return ResponseEntity.ok(response);

    } catch (BadCredentialsException e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error: Invalid username or password");
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: Unable to authenticate");
    }
  }

  /**
   * Google Sign-In: accepts an ID token, verifies it, upserts the user, issues our JWT.
   */
  @Operation(summary = "Google Sign-In", description = "Authenticate via Google ID token and receive JWT")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Authenticated via Google"),
      @ApiResponse(responseCode = "401", description = "Invalid Google token")
  })
  @PostMapping("/oauth/google")
  public ResponseEntity<?> googleSignIn(@RequestBody Map<String, String> body) {
    String idTokenString = body.get("idToken");
    String defaultRole = body.getOrDefault("role", "EMPLOYEE"); // frontend supplies intended role if needed
    try {
      GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
          GoogleNetHttpTransport.newTrustedTransport(), JacksonFactory.getDefaultInstance())
          .build();

      GoogleIdToken idToken = verifier.verify(idTokenString);
      if (idToken == null) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Google ID token");
      }
      Payload payload = idToken.getPayload();
      String email = payload.getEmail();
      String name = (String) payload.get("name");

      // Use email as username for our system
      Optional<User> existing = userRepository.findByUsername(email);
      User appUser = existing.orElseGet(User::new);
      appUser.setUsername(email);
      appUser.setEmail(email);
      appUser.setName(name);
      appUser.setAuthProvider("GOOGLE");
      if (appUser.getRole() == null) {
        appUser.setRole(Role.valueOf(defaultRole));
      }
      // Set a dummy password if new (not used for Google accounts)
      if (existing.isEmpty()) {
        appUser.setPassword(passwordEncoder.encode("oauth-google"));
      }
      userRepository.save(appUser);

      final String jwt = jwtTokenUtil.generateToken(appUser.getUsername(), appUser.getRole().name());
      Map<String, Object> response = new HashMap<>();
      response.put("token", jwt);
      response.put("role", appUser.getRole().name());
      response.put("email", appUser.getEmail());
      response.put("name", appUser.getName());
      return ResponseEntity.ok(response);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Google authentication failed");
    }
  }

  /**
   * Verify if a username exists.
   *
   * @param username The username to verify
   * @return Response message indicating whether the username exists
   */
  @Operation(summary = "Verify username", description = "Verify if a username exists in the system")
  @ApiResponses(
      value = {
          @ApiResponse(responseCode = "200", description = "Username exists"),
          @ApiResponse(responseCode = "404", description = "Username not found")
      })
  @GetMapping("/verify-username/{username}")
  public ResponseEntity<?> verifyUsername(@PathVariable String username) {
    Optional<User> user = userRepository.findByUsername(username);
    if (user.isPresent()) {
      return ResponseEntity.ok("Username exists");
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: Username not found");
    }
  }

  /**
   * Reset password for a given username.
   *
   * @param request Map containing the username and new password
   * @return Response message indicating success or failure of the operation
   */
  @Operation(summary = "Reset password", description = "Reset the password for the given username")
  @ApiResponses(
      value = {
          @ApiResponse(responseCode = "200", description = "Password reset successfully"),
          @ApiResponse(responseCode = "404", description = "Username not found"),
          @ApiResponse(responseCode = "500", description = "Unable to reset password")
      })
  @PostMapping("/reset-password")
  public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
    String username = request.get("username");
    String newPassword = request.get("newPassword");

    Optional<User> user = userRepository.findByUsername(username);

    if (user.isPresent()) {
      User existingUser = user.get();
      existingUser.setPassword(passwordEncoder.encode(newPassword));
      userRepository.save(existingUser);
      return ResponseEntity.ok("Password reset successfully");
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: Username not found");
    }
  }
}