import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { QuestionEditPage } from './question-edit.page';

import { DtimTechprofileModule } from 'dtim-techprofile';

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
    ,DtimTechprofileModule
  ],
  declarations: [QuestionEditPage]
})
export class QuestionEditPageModule {}
