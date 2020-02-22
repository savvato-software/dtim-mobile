import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { ModelService } from './_services/model.service';

import { AlertService } from '../../_services/alert.service';
import { FunctionPromiseService } from 'savvato-javascript-services'
import { TechProfileAPIService } from '../../_services/tech-profile-api.service';
import { UserTechProfileModelService } from '../../_services/user-tech-profile-model.service';
import { UserService } from '../../_services/user.service';

import { TechProfileModelService } from '../../_services/tech-profile-model.service';

import { environment } from '../../../_environments/environment';

@Component({
  selector: 'app-user-tech-profile-past',
  templateUrl: './past.page.html',
  styleUrls: ['./past.page.scss'],
})
export class PastUserTechProfilePage implements OnInit {

  	userId = undefined;
  	user = undefined;
  	techProfile = undefined;

  	funcKey = "past-utp-controller";

	constructor(private _location: Location,
		    private _router: Router,
		    private _route: ActivatedRoute,
		    private _modelService: ModelService,
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

			self._modelService._init();
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
							getColorMeaningString: () => {
								return "A highlighted cell is one in which a question was answered by this candidate at some session in the past. The darker the cell, the greater the percentage of those questions answered successfully."
							},
							getBackgroundColor: (lineItem, idx) => {
								let count = self._modelService.getAnsweredQuestionCountForCell(lineItem['id'], idx, self.userId);
								let max = self._modelService.getQuestionCountForCell(lineItem['id'], idx, self.userId);

								if (count && max) {
									let rtn = Math.ceil((count / max) * 10);

									let shadesOfGray = ["#E0E0E0","#D0D0D0","#C0C0C0","#B0B0B0","#A0A0A0","#909090","#808080","#707070","#606060", "#505050"]

									return shadesOfGray[rtn];
								}

								return undefined;
							},
							onLxDescriptionClick: (lineItem, idx) => {
								self._router.navigate(['/user-tech-profile/' + self.userId + '/past/all-user-sessions-listing/' + lineItem['id'] + '/' + idx]);
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

	getScore(lineItemId) {
		let self = this;
		return self._userTechProfileModel.getScore(lineItemId);
	}

	onBackBtnClicked() {
		this._userTechProfileModel.save().then(() => {
			this._location.back();
		});
	}
}
