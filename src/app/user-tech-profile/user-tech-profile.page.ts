import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { AlertService } from '../_services/alert.service';
import { TechProfileAPIService } from '../_services/tech-profile-api.service';
import { UserTechProfileModelService } from '../_services/user-tech-profile-model.service';

@Component({
  selector: 'app-user-tech-profile',
  templateUrl: './user-tech-profile.page.html',
  styleUrls: ['./user-tech-profile.page.scss'],
})
export class UserTechProfilePage implements OnInit {

  	candidateId = undefined;
  	techProfile = undefined;
  	candidateScores = undefined;

	constructor(private _location: Location,
		    private _router: Router,
		    private _route: ActivatedRoute,
			private _techProfileService: TechProfileAPIService,
			private _userTechProfileModel: UserTechProfileModelService,
			private _alertService: AlertService ) {

	}

	ngOnInit() {
		let self = this;
		self._route.params.subscribe((params) => {
			self.candidateId = params['candidateId'] * 1;
			console.log("candidateId ==> " + self.candidateId);

			self._userTechProfileModel.init(self.candidateId);
		})
	}

	isTechProfileAvailable() {
		let self = this;
		return self._userTechProfileModel.isTechProfileAvailable();
	}

	isCandidateScoresAvailable() {
		let self = this;
		return self._userTechProfileModel.isCandidateScoresAvailable();
	}

	getTechProfile() {
		let self = this;
		return self._userTechProfileModel.getTechProfile();
	}

	getTechProfileTopics() {
		let self = this;
		return self._userTechProfileModel.getTechProfileTopics();
	}

	getTechProfileLineItemsByTopic(topicId) {
		let self = this;
		return self._userTechProfileModel.getTechProfileLineItemsByTopic(topicId);
	}

	getScore(lineItemId) {
		let self = this;
		return self._userTechProfileModel.getScore(lineItemId);
	}

	onLxDescriptionClick(lineItemId, idx) {
		// this._userTechProfileModel.setLineItemScore(lineItemId, idx);

		let self = this;
		self._router.navigate(['/line-item-action-page/' + self.candidateId + '/' + lineItemId + '/' + idx]);
	}

	onBackBtnClicked() {
		this._userTechProfileModel.save().then(() => {
			this._location.back();
		});
	}
}
