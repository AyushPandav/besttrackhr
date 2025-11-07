package com.example.employeemanagement.controller;

<<<<<<< HEAD
import com.example.employeemanagement.exception.ResourceNotFoundException;
import com.example.employeemanagement.model.CalendarEventAdd;
import com.example.employeemanagement.service.CalendarEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
=======
import com.example.employeemanagement.model.CalendarEvent;
import com.example.employeemanagement.service.CalendarEventService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d

@RestController
@RequestMapping("/api/calendar")
@CrossOrigin(origins = "http://localhost:3000")
<<<<<<< HEAD
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
=======
@Tag(name = "Calendar APIs", description = "Manage calendar events for users")
public class CalendarEventController {

  @Autowired private CalendarEventService calendarEventService;

  private boolean isHr(Authentication auth) {
    if (auth == null) return false;
    for (GrantedAuthority a : auth.getAuthorities()) {
      if ("ROLE_HR".equals(a.getAuthority())) return true;
    }
    return false;
  }

  @Operation(summary = "Get my events")
  @GetMapping
  public List<CalendarEvent> myEvents(Authentication authentication) {
    String username = authentication.getName();
    return calendarEventService.getEventsForOwner(username);
  }

  @Operation(summary = "HR: Get all events")
  @GetMapping("/hr/all")
  public List<CalendarEvent> allEvents(Authentication authentication) {
    return calendarEventService.getAllEvents();
  }

  @Operation(summary = "Create event")
  @PostMapping
  public CalendarEvent create(@RequestBody CalendarEvent event, Authentication authentication) {
    // Owner is always the authenticated user for non-HR; HR can set ownerUsername explicitly
    if (!isHr(authentication) || event.getOwnerUsername() == null) {
      event.setOwnerUsername(authentication.getName());
    }
    return calendarEventService.save(event);
  }

  @Operation(summary = "Update event")
  @PutMapping("/{id}")
  public ResponseEntity<CalendarEvent> update(@PathVariable Long id, @RequestBody CalendarEvent updated, Authentication authentication) {
    Optional<CalendarEvent> existingOpt = calendarEventService.getEvent(id);
    if (existingOpt.isEmpty()) return ResponseEntity.notFound().build();
    CalendarEvent existing = existingOpt.get();

    // Only HR or owner can update
    if (!isHr(authentication) && !existing.getOwnerUsername().equals(authentication.getName())) {
      return ResponseEntity.status(403).build();
    }

    existing.setTitle(updated.getTitle());
    existing.setDescription(updated.getDescription());
    existing.setStartTime(updated.getStartTime());
    existing.setEndTime(updated.getEndTime());
    // HR can reassign owner
    if (isHr(authentication) && updated.getOwnerUsername() != null) {
      existing.setOwnerUsername(updated.getOwnerUsername());
    }
    return ResponseEntity.ok(calendarEventService.save(existing));
  }

  @Operation(summary = "Delete event")
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id, Authentication authentication) {
    Optional<CalendarEvent> existingOpt = calendarEventService.getEvent(id);
    if (existingOpt.isEmpty()) return ResponseEntity.notFound().build();
    CalendarEvent existing = existingOpt.get();
    if (!isHr(authentication) && !existing.getOwnerUsername().equals(authentication.getName())) {
      return ResponseEntity.status(403).build();
    }
    calendarEventService.delete(id);
    return ResponseEntity.noContent().build();
  }
}


>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
