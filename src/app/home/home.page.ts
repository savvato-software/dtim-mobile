import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

	constructor(private _router: Router) {

	}

	onNewUserBtnClicked() {
		this._router.navigate(['/new-user']);
	}

	onReturningUserBtnClicked() {
		this._router.navigate(['/returning-user']);
	}
}
