import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UserQuestionDetailPage } from './user-question-detail.page';

const routes: Routes = [
  {
    path: '',
    component: UserQuestionDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UserQuestionDetailPage]
})
export class UserQuestionDetailPageModule {}
