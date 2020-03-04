import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PastPageRoutingModule } from './past-routing.module';

import { PastUserTechProfilePage } from './past.page';

import { DtimTechprofileModule } from 'dtim-techprofile';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PastPageRoutingModule,
    DtimTechprofileModule
  ],
  declarations: [PastUserTechProfilePage]
})
export class PastPageModule {}
