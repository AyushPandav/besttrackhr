import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './EmpYearCalender.css';

const localizer = momentLocalizer(moment);

function EmpYearCalender() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to load events from localStorage
  const loadEvents = () => {
    try {
      const storedEvents = localStorage.getItem('calendarEvents');
      const lastUpdated = localStorage.getItem('calendarEventsLastUpdated');
      const now = Date.now();
      const thirtyMinutes = 30 * 60 * 1000; // 30 minutes in milliseconds

      if (storedEvents && lastUpdated && now - parseInt(lastUpdated, 10) <= thirtyMinutes) {
        const parsedEvents = JSON.parse(storedEvents);
        const formattedEvents = parsedEvents.map(event => ({
          id: event.id,
          title: event.description,
          start: new Date(event.date),
          end: new Date(event.date),
        }));
        setEvents(formattedEvents);
      } else {
        localStorage.removeItem('calendarEvents');
        localStorage.removeItem('calendarEventsLastUpdated');
        setEvents([]);
      }
    } catch (err) {
      setError('Failed to fetch calendar events from localStorage');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Load events on mount
  useEffect(() => {
    loadEvents();
  }, []);

  // Listen for storage changes (for real-time updates)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'calendarEvents' || e.key === 'calendarEventsLastUpdated') {
        loadEvents();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (loading) return <div className="calendar-loading">Loading calendar events...</div>;
  if (error) return <div className="calendar-error">{error}</div>;

  return (
    <div className="calendar-container">
      <h2 className="calendar-title">Employee Year Calendar</h2>
      <div className="calendar-box">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
        />
      </div>
    </div>
  );
}

export default EmpYearCalender;