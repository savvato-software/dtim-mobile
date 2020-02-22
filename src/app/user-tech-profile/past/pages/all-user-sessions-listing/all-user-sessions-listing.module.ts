import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllUserSessionsListingPageRoutingModule } from './all-user-sessions-listing-routing.module';

import { AllUserSessionsListingPage } from './all-user-sessions-listing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllUserSessionsListingPageRoutingModule
  ],
  declarations: [AllUserSessionsListingPage]
})
export class AllUserSessionsListingPageModule {}
