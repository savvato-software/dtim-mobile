import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PresentUserTechProfilePage } from './present.page';

const routes: Routes = [
  {
    path: '',
    component: PresentUserTechProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PresentPageRoutingModule {}
