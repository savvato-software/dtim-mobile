import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TechProfileQuestionPage } from './tech-profile-question.page';

import { DtimTechprofileModule } from 'dtim-techprofile';
import { SavvatoJavascriptServicesModule } from 'savvato-javascript-services'

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
    DtimTechprofileModule,
    SavvatoJavascriptServicesModule
  ],
  declarations: [
    TechProfileQuestionPage
  ],
  providers: [

  ]
})
export class TechProfileQuestionPageModule {}
