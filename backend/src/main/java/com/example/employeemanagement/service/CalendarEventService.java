package com.example.employeemanagement.service;

import com.example.employeemanagement.model.CalendarEvent;
import com.example.employeemanagement.repository.CalendarEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CalendarEventService {

  @Autowired private CalendarEventRepository calendarEventRepository;

  public List<CalendarEvent> getEventsForOwner(String ownerUsername) {
    return calendarEventRepository.findByOwnerUsername(ownerUsername);
  }

  public List<CalendarEvent> getAllEvents() {
    return calendarEventRepository.findAll();
  }

  public Optional<CalendarEvent> getEvent(Long id) {
    return calendarEventRepository.findById(id);
  }

  public CalendarEvent save(CalendarEvent event) {
    return calendarEventRepository.save(event);
  }

  public void delete(Long id) {
    calendarEventRepository.deleteById(id);
  }
}


