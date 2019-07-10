import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechProfileComponent } from './tech-profile.component';

@NgModule({
  declarations: [TechProfileComponent],
  imports: [
    CommonModule
  ],
  exports: [
  	TechProfileComponent
  ]
})
export class TechProfileModule { }
