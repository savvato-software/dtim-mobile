import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionSessionGradePageRoutingModule } from './question-session-grade-routing.module';

import { QuestionSessionGradePage } from './question-session-grade.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionSessionGradePageRoutingModule
  ],
  declarations: [QuestionSessionGradePage]
})
export class QuestionSessionGradePageModule {}
