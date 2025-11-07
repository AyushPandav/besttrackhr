package com.example.employeemanagement.service;

<<<<<<< HEAD
import com.example.employeemanagement.exception.ResourceNotFoundException;
import com.example.employeemanagement.model.CalendarEventAdd;
=======
import com.example.employeemanagement.model.CalendarEvent;
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
import com.example.employeemanagement.repository.CalendarEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CalendarEventService {

<<<<<<< HEAD
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
=======
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


>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
