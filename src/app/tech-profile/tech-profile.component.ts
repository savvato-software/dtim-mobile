import { Component, OnInit, Injectable, Input } from '@angular/core';

import { TechProfileModelService } from '../_services/tech-profile-model.service';

@Injectable({
    providedIn: 'root'
})
@Component({
  selector: 'tech-profile',
  templateUrl: './tech-profile.component.html',
  styleUrls: ['./tech-profile.component.scss'],
})
export class TechProfileComponent implements OnInit {

  @Input() params: any;

  constructor(private _model: TechProfileModelService) { }

  ngOnInit() {
    if (!this._model.isTechProfileAvailable()) {
      this.init();
    }
  }

  init(force = false) {
    this._model._init(force);
  }

  getBackgroundColor(id, idx) {
  	if (this.params && this.params["getBackgroundColor"]) {
  		return this.params["getBackgroundColor"](id, idx);
  	} else {
  		return "white";
  	}
  }

  onLxDescriptionClick(id, idx) {
  	if (this.params && this.params["onLxDescriptionClick"]) {
  		return this.params["onLxDescriptionClick"](id, idx);
  	} 
  }

}
