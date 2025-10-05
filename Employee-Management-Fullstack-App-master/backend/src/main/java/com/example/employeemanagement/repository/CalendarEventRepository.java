package com.example.employeemanagement.repository;

import com.example.employeemanagement.model.CalendarEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CalendarEventRepository extends JpaRepository<CalendarEvent, Long> {
  List<CalendarEvent> findByOwnerUsername(String ownerUsername);
}


