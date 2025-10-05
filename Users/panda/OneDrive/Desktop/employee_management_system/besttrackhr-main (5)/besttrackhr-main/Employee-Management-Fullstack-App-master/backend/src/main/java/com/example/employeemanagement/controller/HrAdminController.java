package com.example.employeemanagement.controller;

import com.example.employeemanagement.service.EmployeeService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/hr")
@CrossOrigin(origins = "http://localhost:3000")
public class HrAdminController {

  @Autowired private EmployeeService employeeService;

  @Operation(summary = "HR: Remove employee by ID")
  @DeleteMapping("/employees/{id}")
  @PreAuthorize("hasRole('HR')")
  public ResponseEntity<Void> removeEmployee(@PathVariable Long id) {
    employeeService.deleteEmployee(id);
    return ResponseEntity.noContent().build();
  }
}


