package com.example.employeemanagement.controller;

import com.example.employeemanagement.exception.ResourceNotFoundException;
import com.example.employeemanagement.model.CalendarEventAdd;
import com.example.employeemanagement.service.CalendarEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/calendar")
@CrossOrigin(origins = "http://localhost:3000")
public class CalendarEventController {

    @Autowired
    private CalendarEventService calendarEventService;

    @GetMapping
    @PreAuthorize("hasAnyRole('HR', 'EMPLOYEE')")
    public List<CalendarEventAdd> getAllEvents() {
        return calendarEventService.getAllEvents();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('HR', 'EMPLOYEE')")
    public ResponseEntity<CalendarEventAdd> getEventById(@PathVariable Long id) {
        CalendarEventAdd event = calendarEventService.getEventById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Calendar event not found with id: " + id));
        return ResponseEntity.ok(event);
    }

    @PostMapping("/hr")
    @PreAuthorize("hasRole('HR')")
    public ResponseEntity<CalendarEventAdd> createEvent(@RequestBody CalendarEventAdd event) {
        CalendarEventAdd savedEvent = calendarEventService.saveEvent(event);
        return ResponseEntity.ok(savedEvent);
    }

    @PutMapping("/hr/{id}")
    @PreAuthorize("hasRole('HR')")
    public ResponseEntity<CalendarEventAdd> updateEvent(@PathVariable Long id, @RequestBody CalendarEventAdd eventDetails) {
        CalendarEventAdd event = calendarEventService.getEventById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Calendar event not found with id: " + id));
        event.setDate(eventDetails.getDate());
        event.setDescription(eventDetails.getDescription());
        CalendarEventAdd updatedEvent = calendarEventService.saveEvent(event);
        return ResponseEntity.ok(updatedEvent);
    }

    @DeleteMapping("/hr/{id}")
    @PreAuthorize("hasRole('HR')")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        calendarEventService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }
}