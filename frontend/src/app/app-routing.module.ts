import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ClientComponent } from './client/client.component';
import { JoinOptionsComponent } from './join-options/join-options.component';
import { SignupParentComponent } from './signup-parent/signup-parent.component';
import { PendingRequestsComponent } from './pending-requests/pending-requests.component';
import { ParentChildAssociationComponent } from './parent-child-association/parent-child-association.component';
import { FitnessTrackerComponent } from './fitness-tracker/fitness-tracker.component';

const routes: Routes = [
  { path: '', component: LayoutComponent },
  { path: 'signup/sportsman', component: SignupComponent },
  { path: 'signup/parent', component: SignupParentComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'client', component: ClientComponent },
  { path: 'tracker', component: FitnessTrackerComponent },
  { path: 'pending-child-request', component: PendingRequestsComponent },
  { path: 'associate-child', component: ParentChildAssociationComponent },
  { path: 'register', component: JoinOptionsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
