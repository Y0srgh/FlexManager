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

    this.http.get<any[]>('http://localhost:4000/courses').subscribe(courses => {
      console.log('Courses fetched:', courses); 
      if (!Array.isArray(courses)) {
        console.error('Courses data is not an array:', courses);
        return; 
      }


      this.http.get<any[]>('http://localhost:4000/reservations').subscribe(reservations => {
        console.log('Reservations fetched:', reservations); 
        if (!Array.isArray(reservations)) {
          console.error('Reservations data is not an array:', reservations);
          return; 
        }

        const courseEvents = courses.map((course: any) => {
          const eventDate = this.getCourseEventDate(course);
          return {
            title: course.title,
            start: eventDate,
            end: this.getCourseEventEndTime(course),
            allDay: false,
            color: '#4caf50',
            description: `Coach: ${course.coach?.name || 'Unknown Coach'}`,
            
            extendedProps: {
              type: 'course',
              coach: course.coach?.name || 'Unknown Coach'
            }
          };
        });
        

        const reservationEvents = reservations.map((reservation: any) => ({
          title: 'Private coach reservation', 
          start: this.getReservationStartTime(reservation),
          end: this.getReservationEndTime(reservation),
          allDay: false, 

          color: this.getReservationColor(reservation.state), 
          description: '', 
          
          extendedProps: {
            state: reservation.state || 'default'  
          }
        }));
        

        this.calendarOptions.events = [...courseEvents, ...reservationEvents];
      }, error => {
        console.error('Error fetching reservations:', error); 
      });
    }, error => {
      console.error('Error fetching courses:', error); 
    });
  }

 
  getCourseEventDate(course: any): string {
    const date = new Date(course.date); 
    date.setHours(course.startTime ? parseInt(course.startTime.split(':')[0]) : 0);
    date.setMinutes(course.startTime ? parseInt(course.startTime.split(':')[1]) : 0);
    return date.toISOString();
  }

  
  getCourseEventEndTime(course: any): string {
    const date = new Date(course.date); 
    date.setHours(course.endTime ? parseInt(course.endTime.split(':')[0]) : 0);
    date.setMinutes(course.endTime ? parseInt(course.endTime.split(':')[1]) : 0);
    return date.toISOString();
  }


  getReservationStartTime(reservation: any): string {
    const date = new Date(reservation.date); 
    date.setHours(parseInt(reservation.startTime.split(':')[0]));
    date.setMinutes(parseInt(reservation.startTime.split(':')[1]));
    return date.toISOString();
  }


  getReservationEndTime(reservation: any): string {
    const date = new Date(reservation.date); 
    date.setHours(parseInt(reservation.endTime.split(':')[0]));
    date.setMinutes(parseInt(reservation.endTime.split(':')[1]));
    return date.toISOString();
  }


  getReservationColor(state: string): string {
    switch (state) {
      case 'pending': return '#ff9800';  // Orange
      case 'approved': return '#4caf50'; // Green
      case 'canceled': return '#f44336'; // Red
      default: return '#2196f3';         // Blue for unknown states
    }
  }
}
