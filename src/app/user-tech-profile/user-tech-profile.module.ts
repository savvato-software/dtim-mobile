import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UserTechProfilePage } from './user-tech-profile.page';
import { TechProfileModule } from '../tech-profile/tech-profile.module';

const routes: Routes = [
  {
    path: '',
    component: UserTechProfilePage
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
  declarations: [UserTechProfilePage]
})
export class UserTechProfilePageModule {}
