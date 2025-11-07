package com.example.employeemanagement.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.List;
import com.example.employeemanagement.model.CalendarEvent;
import com.example.employeemanagement.service.CalendarEventService;


@RestController
@RequestMapping("/api/calendar")
@CrossOrigin(origins = "http://localhost:3000")
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


