import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CandidateQuestionDetailPage } from './candidate-question-detail.page';

const routes: Routes = [
  {
    path: '',
    component: CandidateQuestionDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CandidateQuestionDetailPage]
})
export class CandidateQuestionDetailPageModule {}
