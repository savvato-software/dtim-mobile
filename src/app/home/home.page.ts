import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { AttendanceModelService } from '../_services/attendance-model.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

	showAdminBtn = false;
	bannerClickCount = 0;

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
		this.showAdminBtn = false;
		this._router.navigate(['/admin']);
	}

	isSessionActive() {
		return this._attendanceModelService.isSessionActive();
	}

	onBannerClick() {
		this.bannerClickCount++;

		if (this.bannerClickCount === 7) {
			this.bannerClickCount = 0;
			this.showAdminBtn = true;
		}
	}

	isAdminBtnHidden() {
		return !this.showAdminBtn;
	}
}
