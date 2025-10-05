package com.example.employeemanagement.repository;
import com.example.employeemanagement.model.CalendarEventAdd;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface CalendarEventRepository extends JpaRepository<CalendarEventAdd, Long> {
}