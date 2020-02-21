import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { AlertService } from '../../_services/alert.service';
import { FunctionPromiseService } from 'savvato-javascript-services'
import { TechProfileAPIService } from '../../_services/tech-profile-api.service';
import { UserTechProfileModelService } from '../../_services/user-tech-profile-model.service';
import { UserService } from '../../_services/user.service';

import { TechProfileModelService } from '../../_services/tech-profile-model.service';

import { environment } from '../../../_environments/environment';

@Component({
  selector: 'app-user-tech-profile-present',
  templateUrl: './present.page.html',
  styleUrls: ['./present.page.scss'],
})
export class PresentUserTechProfilePage implements OnInit {

  	userId = undefined;
  	user = undefined;
  	techProfile = undefined;

  	funcKey = "present-utp-controller";

	constructor(private _location: Location,
		    private _router: Router,
		    private _route: ActivatedRoute,
		    private _functionPromiseService: FunctionPromiseService,
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

			self._functionPromiseService.initFunc(self.funcKey, () => {
				return new Promise((resolve, reject) => {
					self._userTechProfileModel.waitingPromise().then(() => {
						resolve({
							getEnv: () => {
								return environment;
							},
							getTopicBackgroundColor: (topic, isSelected) => {
								return undefined; // use the default
							},
							getLineItemBackgroundColor: (lineItem, isSelected) => {
								return undefined; // use the default;
							},
							getColorMeaningString: () => {
								return "A highlighted cell is one which contains a question which has been asked during this session."
							},
							// getBackgroundColor: (lineItem, idx) => {
							// 	let score = self._userTechProfileModel.getScore(lineItem['id']);
								
							// 	if (score == undefined) return "white";
							// 	if (score >= idx) return "lightblue"; else return "white";
							// },
							onLxDescriptionClick: (lineItem, idx) => {
								// shows a list of questions assigned to this lineItemLevel
								self._router.navigate(['/line-item-level-content-page/' + self.userId + '/' + lineItem['id'] + '/' + idx]);

								// which shows a list of the sessions in which that question was given for this user
								// in which you can click on a session, go to a session detail page, and see the per-question comments for this user's mock interview
							}
						})
					})
				})
			})
		})
	}

	getDtimTechprofileComponentController() {
		return this._functionPromiseService.waitAndGet(this.funcKey, this.funcKey, { });
	}

	getUserName() {
		return this.user && this.user["name"];
	}

	onBackBtnClicked() {
		this._userTechProfileModel.save().then(() => {
			this._location.back();
		});
	}
}
