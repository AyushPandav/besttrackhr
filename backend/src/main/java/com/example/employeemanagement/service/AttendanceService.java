package com.example.employeemanagement.service;

import com.example.employeemanagement.exception.ResourceNotFoundException;
import com.example.employeemanagement.model.Attendance;
import com.example.employeemanagement.model.User;
import com.example.employeemanagement.repository.AttendanceRepository;
import com.example.employeemanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<Attendance> getAttendanceByDate(LocalDate date) {
        return attendanceRepository.findByDate(date);
    }

    public Attendance markAttendance(Long userId, LocalDate date, String status) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        Attendance attendance = attendanceRepository.findByUserAndDate(user, date);
        if (attendance == null) {
            attendance = new Attendance(user, date, status);
        } else {
            attendance.setStatus(status);
        }
        return attendanceRepository.save(attendance);
    }
}