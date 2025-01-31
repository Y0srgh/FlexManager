import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursePageComponent } from './class-management/course-page/course-page.component';

const routes: Routes = [
  
  { path: 'course', component: CoursePageComponent },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
