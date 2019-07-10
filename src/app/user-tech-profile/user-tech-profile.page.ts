import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { AlertService } from '../_services/alert.service';
import { TechProfileAPIService } from '../_services/tech-profile-api.service';
import { UserTechProfileModelService } from '../_services/user-tech-profile-model.service';
import { UserService } from '../_services/user.service';

import { TechProfileComponent } from '../tech-profile/tech-profile.component';

@Component({
  selector: 'app-user-tech-profile',
  templateUrl: './user-tech-profile.page.html',
  styleUrls: ['./user-tech-profile.page.scss'],
})
export class UserTechProfilePage implements OnInit {

  	candidateId = undefined;
  	candidate = undefined;
  	techProfile = undefined;

	constructor(private _location: Location,
		    private _router: Router,
		    private _route: ActivatedRoute,
			private _techProfileService: TechProfileAPIService,
			private _userTechProfileModel: UserTechProfileModelService,
		    private _userService: UserService,
		    private _alertService: AlertService ) {

	}

	ngOnInit() {
		let self = this;
		self._route.params.subscribe((params) => {
			self.candidateId = params['candidateId'] * 1;
			console.log("candidateId ==> " + self.candidateId);

			self._userTechProfileModel.init(self.candidateId);

			self._userService.getCandidateById(self.candidateId).then((data) => {
				self.candidate = data;
			})
		})
	}

	getCandidateName() {
		return this.candidate && this.candidate["name"];
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

	getParams() {
		let self = this;
		return {
			getBackgroundColor: (id, idx) => {
				let score = self.getScore(id);
				if (score == 0) return "white";
				if (score >= idx) return "lightblue"; else return "white";
			},
			onLxDescriptionClick: (id, idx) => {
				self._router.navigate(['/line-item-action-page/' + self.candidateId + '/' + id + '/' + idx]);
			}
		};
	}
}
