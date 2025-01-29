import { Component, OnInit } from '@angular/core'; 
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin],
    events: [],
    themeSystem: 'bootstrap',
    eventBackgroundColor: '#1e1e1e',
    eventTextColor: '#fff',
    
    
    eventTimeFormat: { 
      hour: '2-digit', 
      minute: '2-digit', 
      meridiem: 'short' 
    },
    
    
  };
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    // Fetching course events
    this.http.get<any[]>('http://localhost:4000/courses').subscribe(courses => {
      console.log('Courses fetched:', courses); // Log the course data to inspect the structure
      if (!Array.isArray(courses)) {
        console.error('Courses data is not an array:', courses);
        return; // Exit early if courses data is not valid
      }

      // Fetching reservation events
      this.http.get<any[]>('http://localhost:4000/reservations').subscribe(reservations => {
        console.log('Reservations fetched:', reservations); // Log the reservation data to inspect the structure
        if (!Array.isArray(reservations)) {
          console.error('Reservations data is not an array:', reservations);
          return; // Exit early if reservations data is not valid
        }

        const courseEvents = courses.map((course: any) => {
          const eventDate = this.getCourseEventDate(course);
          return {
            title: course.title,
            start: eventDate,
            end: this.getCourseEventEndTime(course),
            allDay: false,
            color: '#4caf50', // Green for courses
            description: `Coach: ${course.coach?.name || 'Unknown Coach'}`,
            
            extendedProps: {
              type: 'course', // Add a property to differentiate courses
              coach: course.coach?.name || 'Unknown Coach'
            }
          };
        });
        

        const reservationEvents = reservations.map((reservation: any) => ({
          title: 'Reservation', // Set title to "Reservation"
          start: this.getReservationStartTime(reservation),
          end: this.getReservationEndTime(reservation),
          allDay: false, 

          color: this.getReservationColor(reservation.state), // Use the color based on reservation state
          description: '', // No description is needed for the reservation
          
          extendedProps: {
            state: reservation.state || 'default'  // Store the state for styling purposes
          }
        }));
        

        // Combine both course and reservation events
        this.calendarOptions.events = [...courseEvents, ...reservationEvents];
      }, error => {
        console.error('Error fetching reservations:', error); // Log if there is an issue fetching reservations
      });
    }, error => {
      console.error('Error fetching courses:', error); // Log if there is an issue fetching courses
    });
  }

  // Helper function to format the date for course events
  getCourseEventDate(course: any): string {
    const date = new Date(course.date); // Assuming course.date is in 'YYYY-MM-DD' format
    date.setHours(course.startTime ? parseInt(course.startTime.split(':')[0]) : 0);
    date.setMinutes(course.startTime ? parseInt(course.startTime.split(':')[1]) : 0);
    return date.toISOString();
  }

  // Helper function to get the end time for course events
  getCourseEventEndTime(course: any): string {
    const date = new Date(course.date); // Use course date for end time
    date.setHours(course.endTime ? parseInt(course.endTime.split(':')[0]) : 0);
    date.setMinutes(course.endTime ? parseInt(course.endTime.split(':')[1]) : 0);
    return date.toISOString();
  }

  // Helper function to format reservation start time
  getReservationStartTime(reservation: any): string {
    const date = new Date(reservation.date); // Reservation date is expected to be in 'YYYY-MM-DD' format
    date.setHours(parseInt(reservation.startTime.split(':')[0]));
    date.setMinutes(parseInt(reservation.startTime.split(':')[1]));
    return date.toISOString();
  }

  // Helper function to format reservation end time
  getReservationEndTime(reservation: any): string {
    const date = new Date(reservation.date); // Reservation date is expected to be in 'YYYY-MM-DD' format
    date.setHours(parseInt(reservation.endTime.split(':')[0]));
    date.setMinutes(parseInt(reservation.endTime.split(':')[1]));
    return date.toISOString();
  }

  // Determine the color based on reservation state
  getReservationColor(state: string): string {
    switch (state) {
      case 'pending': return '#ff9800';  // Orange
      case 'approved': return '#4caf50'; // Green
      case 'canceled': return '#f44336'; // Red
      default: return '#2196f3';         // Blue for unknown states
    }
  }
}
