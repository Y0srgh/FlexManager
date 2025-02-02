import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursePageComponent } from './class-management/course-page/course-page.component';
import { CoachListComponent} from './private-coach/coach-list/coach-list.component';

const routes: Routes = [
  
  { path: 'course', component: CoursePageComponent },
  { path: 'coaches', component: CoachListComponent },

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
