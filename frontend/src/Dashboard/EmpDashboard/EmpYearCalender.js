import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './EmpYearCalender.css';
import axios from 'axios';

const localizer = momentLocalizer(moment);

// ✅ Your MockAPI endpoint
const SPRINGBOOT_URL = "https://6908882f2d902d0651b0b8b2.mockapi.io/mysql-server-localhost/AddCalender";

function EmpYearCalender() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch calendar data from API
  const fetchCalendarEvents = async () => {
    try {
      const response = await axios.get(SPRINGBOOT_URL);
      const data = response.data;

      // Transform API data into react-big-calendar event format
      const formattedEvents = data.map(event => ({
        id: event.id,
        title: event.description || event.title || "No Description",
        start: new Date(event.date),
        end: new Date(event.date),
        allDay: true
      }));

      setEvents(formattedEvents);
    } catch (err) {
      console.error("Error fetching calendar events:", err);
      setError("Failed to load calendar events from server.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchCalendarEvents();
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
          eventPropGetter={() => ({
            style: {
              backgroundColor: '#007acc',
              color: '#fff',
              borderRadius: '6px',
              padding: '4px'
            },
          })}
        />
      </div>
    </div>
  );
}

export default EmpYearCalender;
