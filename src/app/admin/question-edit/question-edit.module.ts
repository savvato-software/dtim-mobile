import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { QuestionEditPage } from './question-edit.page';

import { TechProfileModule } from '../../tech-profile/tech-profile.module';

const routes: Routes = [
  {
    path: '',
    component: QuestionEditPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
    ,TechProfileModule
  ],
  declarations: [QuestionEditPage]
})
export class QuestionEditPageModule {}
