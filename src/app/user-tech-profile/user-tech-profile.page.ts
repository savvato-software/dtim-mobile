import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { AlertService } from '../_services/alert.service';
import { TechProfileAPIService } from '../_services/tech-profile-api.service';
import { UserTechProfileModelService } from '../_services/user-tech-profile-model.service';
import { UserService } from '../_services/user.service';

import { TechProfileModelService } from '../_services/tech-profile-model.service';

@Component({
  selector: 'app-user-tech-profile',
  templateUrl: './user-tech-profile.page.html',
  styleUrls: ['./user-tech-profile.page.scss'],
})
export class UserTechProfilePage implements OnInit {

  	userId = undefined;
  	user = undefined;
  	techProfile = undefined;

	constructor(private _location: Location,
		    private _router: Router,
		    private _route: ActivatedRoute,
		    private _techProfileModelService: TechProfileModelService,
			private _userTechProfileModel: UserTechProfileModelService,
		    private _userService: UserService,
		    private _alertService: AlertService ) {

	}

	ngOnInit() {
		let self = this;
		self._route.params.subscribe((params) => {
			self.userId = params['userId'] * 1;
			console.log("userId ==> " + self.userId);

			self._userTechProfileModel.init(self.userId);

			self._userService.getUserById(self.userId).then((data) => {
				self.user = data;
			})
		})
	}

	getUserName() {
		return this.user && this.user["name"];
	}

	getScore(lineItemId) {
		let self = this;
		return self._userTechProfileModel.getScore(lineItemId);
	}

	onBackBtnClicked() {
		this._userTechProfileModel.save().then(() => {
			this._location.back();
		});
	}

	getParamsPromise = undefined;
	getParams() {
		let self = this;
		if (this.getParamsPromise === undefined) {
			this.getParamsPromise = null;

			this.getParamsPromise = new Promise((resolve, reject) => {
				self._techProfileModelService._init();
				self._techProfileModelService.waitingPromise()
				.then(() => { 
					resolve({
						getModelService: () => {
							return self._techProfileModelService;
						},
						getColorMeaningString: () => {
							return "lightblue means this user has been judged to have skills at this level, and below. White, user has not been tested, or has not passed, at this level."
						},
						getBackgroundColor: (id, idx) => {
							let score = self.getScore(id);
							if (score == undefined) return "white";
							if (score >= idx) return "lightblue"; else return "white";
						},
						onLxDescriptionClick: (id, idx) => {
							self._router.navigate(['/line-item-action-page/' + self.userId + '/' + id + '/' + idx]);
						}
					})
				})
			})
		};

		return this.getParamsPromise;
	}
}
