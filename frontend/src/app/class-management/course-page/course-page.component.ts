import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css']
})
export class CoursePageComponent implements OnInit {
  courses: Course[] = [];
  selectedCourse: Course | null = null;
  role: string = 'user';
  coachId: number = 1; 

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courses = [
      new Course(1, 'YOGA', 1, 'RAYEN TIMOUMI', 'https://i.pinimg.com/564x/55/f9/8f/55f98fd344226f2a62392c517fd7b95a.jpg', 'This yoga course is designed...', '2 hours', 30),
      new Course(2, 'FITNESS', 1, 'FAWZI BENZARTI', 'https://mustcoach.com/wp-content/uploads/2018/06/mustcoach-coachSamuelRjpg.jpeg', 'Yoga is an ancient practice that originated in India thousands of years ago, blending physical postures, breathing exercises, meditation, and philosophical teachings to create a holistic approach to health and well-being. The term "yoga" comes from the Sanskrit word "yuj," which means "to unite" or "to join," symbolizing the union of mind, body, and spirit. At its core, yoga aims to bring balance and harmony to all aspects of life, enhancing mental clarity, emotional stability, and physical health. The practice includes a series of physical postures known as asanas, designed to improve flexibility, strength, and balance. These postures not only strengthen and stretch the body but also encourage mindfulness, helping practitioners develop greater awareness of their breath and movements. Alongside physical postures, yoga incorporates pranayama, a form of breath control that helps regulate the flow of energy within the body. ', '1.5 hours', 25),
      new Course(3, 'YOGA', 3, 'RAYEN TIMOUMI', 'https://i.pinimg.com/564x/55/f9/8f/55f98fd344226f2a62392c517fd7b95a.jpg', 'This yoga course is designed...', '2 hours', 30),
      new Course(4, 'FITNESS', 3, 'FAWZI BENZARTI', 'https://mustcoach.com/wp-content/uploads/2018/06/mustcoach-coachSamuelRjpg.jpeg', 'A complete fitness routine...', '1.5 hours', 25),
      new Course(3, 'YOGA', 1, 'RAYEN TIMOUMI', 'https://i.pinimg.com/564x/55/f9/8f/55f98fd344226f2a62392c517fd7b95a.jpg', 'This yoga course is designed...', '2 hours', 30),
      new Course(4, 'FITNESS', 1, 'FAWZI BENZARTI', 'https://mustcoach.com/wp-content/uploads/2018/06/mustcoach-coachSamuelRjpg.jpeg', 'A complete fitness routine...', '1.5 hours', 25)
    ];

    if (this.role === 'coach') {
      this.courses = this.courses.filter(course => course.coachId === this.coachId);
    }
  }

  onViewDetails(courseId: number) {
    this.selectedCourse = this.courses.find(course => course.id === courseId) || null;
  }

  closeDetails() {
    this.selectedCourse = null;
  }
  
}
