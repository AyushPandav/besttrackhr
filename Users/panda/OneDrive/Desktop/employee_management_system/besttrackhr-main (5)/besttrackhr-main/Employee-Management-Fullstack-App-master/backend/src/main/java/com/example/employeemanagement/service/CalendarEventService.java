package com.example.employeemanagement.service;

import com.example.employeemanagement.exception.ResourceNotFoundException;
import com.example.employeemanagement.model.CalendarEventAdd;
import com.example.employeemanagement.repository.CalendarEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CalendarEventService {

    @Autowired
    private CalendarEventRepository calendarEventRepository;

    public List<CalendarEventAdd> getAllEvents() {
        return calendarEventRepository.findAll();
    }

    public Optional<CalendarEventAdd> getEventById(Long id) {
        return calendarEventRepository.findById(id);
    }

    public CalendarEventAdd saveEvent(CalendarEventAdd event) {
        return calendarEventRepository.save(event);
    }

    public void deleteEvent(Long id) {
        if (!calendarEventRepository.existsById(id)) {
            throw new ResourceNotFoundException("Calendar event not found with id: " + id);
        }
        calendarEventRepository.deleteById(id);
    }
}