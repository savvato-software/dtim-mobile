import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionSessionGradePage } from './question-session-grade.page';

const routes: Routes = [
  {
    path: '',
    component: QuestionSessionGradePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionSessionGradePageRoutingModule {}
