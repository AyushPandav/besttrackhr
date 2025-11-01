package com.example.employeemanagement.repository;

import com.example.employeemanagement.model.Attendance;
import com.example.employeemanagement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByDate(LocalDate date);
    Attendance findByUserAndDate(User user, LocalDate date);
}