package com.example.employeemanagement.model;

import javax.persistence.*;
import java.time.LocalDateTime;

/** Entity representing a calendar event, owned by a user (employee or HR). */
@Entity
@Table(name = "calendar_events")
public class CalendarEvent {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String title;

  private String description;

  @Column(nullable = false)
  private LocalDateTime startTime;

  @Column(nullable = false)
  private LocalDateTime endTime;

  /** Owner username (email) of the event. */
  @Column(nullable = false)
  private String ownerUsername;

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public String getTitle() { return title; }
  public void setTitle(String title) { this.title = title; }
  public String getDescription() { return description; }
  public void setDescription(String description) { this.description = description; }
  public LocalDateTime getStartTime() { return startTime; }
  public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }
  public LocalDateTime getEndTime() { return endTime; }
  public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }
  public String getOwnerUsername() { return ownerUsername; }
  public void setOwnerUsername(String ownerUsername) { this.ownerUsername = ownerUsername; }
}


