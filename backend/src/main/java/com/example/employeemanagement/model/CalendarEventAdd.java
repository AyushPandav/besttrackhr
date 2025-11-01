package com.example.employeemanagement.model;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class CalendarEventAdd {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    private String description;

    // Constructors
    public CalendarEventAdd() {}

    public CalendarEventAdd(LocalDate date, String description) {
        this.date = date;
        this.description = description;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}