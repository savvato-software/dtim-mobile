import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllUserSessionsListingPage } from './all-user-sessions-listing.page';

const routes: Routes = [
  {
    path: '',
    component: AllUserSessionsListingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllUserSessionsListingPageRoutingModule {}
