import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PresentPageRoutingModule } from './present-routing.module';

import { PresentUserTechProfilePage } from './present.page';

import { DtimTechprofileModule } from 'dtim-techprofile';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PresentPageRoutingModule,
    DtimTechprofileModule
  ],
  declarations: [PresentUserTechProfilePage]
})
export class PresentPageModule {}
