package com.example.employeemanagement.controller;

import com.example.employeemanagement.model.Role;
import com.example.employeemanagement.model.User;
import com.example.employeemanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@RestController
@RequestMapping("/migrate")
public class AddDelUserController {

    @Autowired
    private UserRepository userRepository;

    private final String MOCKAPI_URL = "https://6908882f2d902d0651b0b8b2.mockapi.io/mysql-server-localhost/users";

    private final WebClient webClient = WebClient.create();

    @GetMapping("/send-to-mockapi")
    public String sendUsersToMockAPI() {
        List<User> users = userRepository.findAll();

        for (User user : users) {
            try {
                // Convert Role enum to String
                String roleStr = user.getRole() != null ? user.getRole().name() : null;

                // Prepare DTO payload
                var payload = new UserDTO(user.getName(), user.getUsername(), roleStr, user.getEmail());

                webClient.post()
                        .uri(MOCKAPI_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .bodyValue(payload)
                        .retrieve()
                        .bodyToMono(String.class)
                        .block(); // block here for simplicity
            } catch (Exception e) {
                e.printStackTrace();
                return "Failed at user ID: " + user.getId();
            }
        }

        return "All users migrated to MockAPI successfully!";
    }
}

// Simple DTO to avoid sending sensitive data like password
class UserDTO {
    private String name;
    private String username;
    private String role;
    private String email;

    public UserDTO(String name, String username, String role, String email) {
        this.name = name;
        this.username = username;
        this.role = role;
        this.email = email;
    }

    // Getters
    public String getName() { return name; }
    public String getUsername() { return username; }
    public String getRole() { return role; }
    public String getEmail() { return email; }
}
