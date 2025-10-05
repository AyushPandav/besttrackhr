package com.example.employeemanagement.controller;

import com.example.employeemanagement.model.UserProfile;
import com.example.employeemanagement.repository.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/userprofiles")
public class UserProfileController {

    @Autowired
    private UserProfileRepository userProfileRepository;

    @GetMapping
    @PreAuthorize("hasRole('ROLE_HR')")
    public List<UserProfile> getAllUserProfiles() {
        return userProfileRepository.findAll();
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_HR')")
    public ResponseEntity<UserProfile> addUserProfile(@RequestBody UserProfile userProfile) {
        UserProfile savedUserProfile = userProfileRepository.save(userProfile);
        return ResponseEntity.ok(savedUserProfile);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_HR')")
    public ResponseEntity<Void> deleteUserProfile(@PathVariable Long id) {
        if (!userProfileRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        userProfileRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}