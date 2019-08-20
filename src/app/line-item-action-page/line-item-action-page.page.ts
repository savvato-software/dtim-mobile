import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { UserTechProfileModelService } from '../_services/user-tech-profile-model.service';

@Component({
  selector: 'app-line-item-action-page',
  templateUrl: './line-item-action-page.page.html',
  styleUrls: ['./line-item-action-page.page.scss'],
})
export class LineItemActionPagePage implements OnInit {

	userId = undefined;
	lineItemId = undefined;
	idx = undefined;

    constructor(private _location: Location,
			    private _router: Router,
			    private _route: ActivatedRoute,
				private _userTechProfileModel: UserTechProfileModelService
			    ) {

	}

	ngOnInit() {
		let self = this;
		self._route.params.subscribe((params) => {
			self.userId = params['userId'];
			self.lineItemId = params['lineItemId'] * 1;
			self.idx = params['idx'] * 1;
		});
	}

	onSelectThisLevelBtnClicked() {
		let self = this;
		self._userTechProfileModel.setLineItemScore(self.lineItemId, self.idx).then((data) => {
			self._location.back();
		})

	}

	onLineItemLevelContentBtnClicked() {
		// shows a list of questions appropriate for that LI
		let self = this;

		self._router.navigate(['/line-item-level-content-page/' + self.userId + '/' + self.lineItemId + '/' + self.idx]);

		// which shows a list of the sessions in which that question was given for this user
		// in which you can click on a session, go to a session detail page, and see the per-question comments for this user's mock interview
	}

	onClearThisLevelBtnClicked() {
		let self = this;
		self._userTechProfileModel.clearScore(self.lineItemId);
		self._location.back();
	}

	onCancelBtnClicked() {
		this._location.back();
	}
}
