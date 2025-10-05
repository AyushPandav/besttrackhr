import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './EmpYearCalender.css';

const localizer = momentLocalizer(moment);

function EmpYearCalender() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/calendar', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Adjust based on your auth setup
          }
        });
        const formattedEvents = response.data.map(event => ({
          id: event.id,
          title: event.description,
          start: new Date(event.date),
          end: new Date(event.date),
        }));
        setEvents(formattedEvents);
      } catch (err) {
        setError('Failed to fetch calendar events');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
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
