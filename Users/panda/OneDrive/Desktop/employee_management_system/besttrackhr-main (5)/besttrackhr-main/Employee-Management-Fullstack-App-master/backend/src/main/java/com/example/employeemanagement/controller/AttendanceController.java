package com.example.employeemanagement.controller;

import com.example.employeemanagement.model.Attendance;
import com.example.employeemanagement.model.User;
import com.example.employeemanagement.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "http://localhost:3000")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @GetMapping("/users")
    @PreAuthorize("hasRole('HR')")
    public List<User> getAllUsers() {
        return attendanceService.getAllUsers();
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('HR', 'EMPLOYEE')")
    public List<Attendance> getAttendanceByDate(@RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return attendanceService.getAttendanceByDate(date);
    }

    @PostMapping("/hr")
    @PreAuthorize("hasRole('HR')")
    public ResponseEntity<Attendance> markAttendance(
            @RequestParam Long userId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam String status) {
        Attendance attendance = attendanceService.markAttendance(userId, date, status);
        return ResponseEntity.ok(attendance);
    }
}