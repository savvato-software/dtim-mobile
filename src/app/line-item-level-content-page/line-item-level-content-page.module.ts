import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LineItemLevelContentPagePage } from './line-item-level-content-page.page';

const routes: Routes = [
  {
    path: '',
    component: LineItemLevelContentPagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LineItemLevelContentPagePage]
})
export class LineItemLevelContentPagePageModule {}
