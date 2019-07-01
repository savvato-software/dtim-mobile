import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { AttendanceModelService } from '../_services/attendance-model.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

	constructor(private _router: Router,
  				private _attendanceModelService: AttendanceModelService) {

	}

	onNewUserBtnClicked() {
		this._router.navigate(['/new-user']);
	}

	onReturningUserBtnClicked() {
		this._router.navigate(['/returning-user']);
	}

	onAdminBtnClicked() {
		this._router.navigate(['/admin']);
	}

	isSessionActive() {
		return this._attendanceModelService.isSessionActive();
	}
}
