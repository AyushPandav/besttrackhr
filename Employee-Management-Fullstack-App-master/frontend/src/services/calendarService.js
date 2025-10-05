import axios from 'axios';
import authService from './authService';

const API_BASE_URL = 'http://localhost:8080';

class CalendarService {
  constructor() {
    this.setupInterceptors();
  }

  // Setup axios interceptors for authentication
  setupInterceptors() {
    axios.interceptors.request.use(
      (config) => {
        const token = authService.getAuthHeader();
        if (token) {
          config.headers.Authorization = token;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          authService.logout();
          window.location.href = '/loginpage';
        }
        return Promise.reject(error);
      }
    );
  }

  // Get all calendar events for the current user
  async getMyEvents() {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/calendar`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching my events:', error);
      return {
        success: false,
        error: error.response?.data || error.message
      };
    }
  }

  // Get all calendar events (HR only)
  async getAllEvents() {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/calendar/hr/all`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching all events:', error);
      return {
        success: false,
        error: error.response?.data || error.message
      };
    }
  }

  // Create a new calendar event
  async createEvent(eventData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/calendar`, eventData);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error creating event:', error);
      return {
        success: false,
        error: error.response?.data || error.message
      };
    }
  }

  // Update an existing calendar event
  async updateEvent(eventId, eventData) {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/calendar/${eventId}`, eventData);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error updating event:', error);
      return {
        success: false,
        error: error.response?.data || error.message
      };
    }
  }

  // Delete a calendar event
  async deleteEvent(eventId) {
    try {
      await axios.delete(`${API_BASE_URL}/api/calendar/${eventId}`);
      return {
        success: true
      };
    } catch (error) {
      console.error('Error deleting event:', error);
      return {
        success: false,
        error: error.response?.data || error.message
      };
    }
  }

  // Get events for a specific date range
  async getEventsByDateRange(startDate, endDate) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/calendar`, {
        params: {
          startDate,
          endDate
        }
      });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching events by date range:', error);
      return {
        success: false,
        error: error.response?.data || error.message
      };
    }
  }

  // Format event data for display
  formatEventForDisplay(event) {
    return {
      id: event.id,
      title: event.title,
      description: event.description || '',
      start: new Date(event.startTime),
      end: new Date(event.endTime),
      owner: event.ownerUsername,
      allDay: false
    };
  }

  // Format event data for API
  formatEventForAPI(event) {
    return {
      title: event.title,
      description: event.description || '',
      startTime: event.start instanceof Date ? event.start.toISOString() : event.start,
      endTime: event.end instanceof Date ? event.end.toISOString() : event.end,
      ownerUsername: event.ownerUsername || authService.getCurrentUser().email
    };
  }

  // Validate event data
  validateEvent(event) {
    const errors = [];

    if (!event.title || event.title.trim() === '') {
      errors.push('Title is required');
    }

    if (!event.start) {
      errors.push('Start time is required');
    }

    if (!event.end) {
      errors.push('End time is required');
    }

    if (event.start && event.end && new Date(event.start) >= new Date(event.end)) {
      errors.push('End time must be after start time');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Get events grouped by date
  groupEventsByDate(events) {
    const grouped = {};
    
    events.forEach(event => {
      const date = new Date(event.startTime).toDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(event);
    });

    return grouped;
  }

  // Get upcoming events (next 7 days)
  async getUpcomingEvents() {
    try {
      const today = new Date();
      const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      
      const result = await this.getEventsByDateRange(
        today.toISOString(),
        nextWeek.toISOString()
      );
      
      return result;
    } catch (error) {
      console.error('Error fetching upcoming events:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Check if user can manage event (owner or HR)
  canManageEvent(event) {
    const currentUser = authService.getCurrentUser();
    
    if (authService.isHR()) {
      return true;
    }
    
    return event.ownerUsername === currentUser.email;
  }

  // Get event statistics
  async getEventStats() {
    try {
      const result = await this.getMyEvents();
      
      if (!result.success) {
        return result;
      }

      const events = result.data;
      const now = new Date();
      
      const stats = {
        total: events.length,
        upcoming: events.filter(event => new Date(event.startTime) > now).length,
        past: events.filter(event => new Date(event.endTime) < now).length,
        thisWeek: events.filter(event => {
          const eventDate = new Date(event.startTime);
          const weekStart = new Date(now);
          weekStart.setDate(now.getDate() - now.getDay());
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekStart.getDate() + 6);
          return eventDate >= weekStart && eventDate <= weekEnd;
        }).length
      };

      return {
        success: true,
        data: stats
      };
    } catch (error) {
      console.error('Error getting event stats:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Create and export a singleton instance
const calendarService = new CalendarService();
export default calendarService;
