import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PastUserTechProfilePage } from './past.page';

const routes: Routes = [
  {
    path: '',
    component: PastUserTechProfilePage
  },
  {
    path: 'all-user-sessions-listing/:lineItemId/:idx',
    loadChildren: './pages/all-user-sessions-listing/all-user-sessions-listing.module#AllUserSessionsListingPageModule'
  },
  {
    path: 'question-session-grade/:questionId',
    loadChildren: './pages/question-session-grade/question-session-grade.module#QuestionSessionGradePageModule'    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PastPageRoutingModule {}
