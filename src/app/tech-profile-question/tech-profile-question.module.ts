import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TechProfileQuestionPage } from './tech-profile-question.page';
import { TechProfileModule } from '../tech-profile/tech-profile.module';

const routes: Routes = [
  {
    path: '',
    component: TechProfileQuestionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TechProfileModule
  ],
  declarations: [TechProfileQuestionPage]
})
export class TechProfileQuestionPageModule {}
