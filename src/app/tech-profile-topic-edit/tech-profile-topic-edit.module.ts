import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TechProfileTopicEditPage } from './tech-profile-topic-edit.page';

const routes: Routes = [
  {
    path: '',
    component: TechProfileTopicEditPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TechProfileTopicEditPage]
})
export class TechProfileTopicEditPageModule {}
