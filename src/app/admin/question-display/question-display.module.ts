import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { QuestionDisplayPage } from './question-display.page';

import { DtimTechprofileModule } from '@savvato-software/dtim-techprofile-component';

const routes: Routes = [
  {
    path: '',
    component: QuestionDisplayPage
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
  declarations: [QuestionDisplayPage]
})
export class QuestionDisplayPageModule {}
