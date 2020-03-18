import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

// import { ModelService } from './_services/model.service';

// import { AlertService } from '../../_services/alert.service';
import { FunctionPromiseService } from '@savvato-software/savvato-javascript-services'
// import { TechProfileAPIService } from '../../_services/tech-profile-api.service';
import { UserTechProfileModelService } from '../../_services/user-tech-profile-model.service';
import { UserService } from '../../_services/user.service';

// import { TechProfileModelService } from '../../_services/tech-profile-model.service';

import { environment } from '../../../_environments/environment';

@Component({
  selector: 'app-user-tech-profile-past',
  templateUrl: './past.page.html',
  styleUrls: ['./past.page.scss'],
})
export class PastUserTechProfilePage implements OnInit {

  	userId = undefined;
  	user = undefined;
	careerGoal = undefined;
  	techProfile = undefined;

  	ppcFuncKey = "past-page-controller"

	constructor(private _location: Location,
		    private _router: Router,
		    private _route: ActivatedRoute,
		    private _functionPromiseService: FunctionPromiseService,
		    // private _techProfileModelService: TechProfileModelService,
			private _userTechProfileModel: UserTechProfileModelService,
		    private _userService: UserService //,
		    // private _alertService: AlertService 
		    ) {

	}

	ngOnInit() {
		let self = this;
		self._route.params.subscribe((params) => {
			self.userId = params['userId'] * 1;

			self._userTechProfileModel.init(self.userId);

			self._userService.getUserById(self.userId).then((data) => {
				self.user = data;
			})

			self._functionPromiseService.initFunc(self.ppcFuncKey, () => {
				return new Promise((resolve, reject) => {
						resolve({
							getEnv: () => {
								return environment;
							},
							getUser: () => {
								return self.user;
							},
							onLxDescriptionClick: () => {
								return () => { console.log("pastPageController for onLxDescriptionClick")}
							},
							getRoutePrefix: () => {
								return "user-tech-profile/" + self.userId + "/past";
							}
						})
					})
				})
			})
	}

	getCtrlForTechprofileUserHistoricalView() {
		return this._functionPromiseService.waitAndGet(this.ppcFuncKey, this.ppcFuncKey, { });
	}

	onBackBtnClicked() {
		this._userTechProfileModel.save().then(() => {
			this._location.back();
		});
	}
}
