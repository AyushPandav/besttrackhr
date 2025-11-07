package com.example.employeemanagement.repository;
<<<<<<< HEAD
import com.example.employeemanagement.model.CalendarEventAdd;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface CalendarEventRepository extends JpaRepository<CalendarEventAdd, Long> {
}
=======

import com.example.employeemanagement.model.CalendarEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CalendarEventRepository extends JpaRepository<CalendarEvent, Long> {
  List<CalendarEvent> findByOwnerUsername(String ownerUsername);
}


>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
