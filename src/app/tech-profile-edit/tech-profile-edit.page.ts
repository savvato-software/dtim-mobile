import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { FunctionPromiseService } from 'savvato-javascript-services'
import { AlertService } from '../_services/alert.service';
import { TechProfileModelService } from '../_services/tech-profile-model.service';

import { environment } from '../../_environments/environment'

@Component({
	selector: 'app-tech-profile-edit',
	templateUrl: './tech-profile-edit.page.html',
	styleUrls: ['./tech-profile-edit.page.scss'],
})
export class TechProfileEditPage implements OnInit {

	constructor(private _location: Location,
		private _router: Router,
		private _route: ActivatedRoute,
		private _techProfileModelService: TechProfileModelService,
		private _alertService: AlertService,
		private _functionPromiseService: FunctionPromiseService) {

	}

	funcKey = "tpepg-controller";

	selectedTopicIDsProvider = () => { return [] };
	selectedLineItemIDsProvider = () => { return [] };

	ngOnInit() {
		let self = this;
		self._functionPromiseService.initFunc(self.funcKey, () => {
			return new Promise((resolve, reject) => {
				resolve({
					getEnv: () => {
						return environment;
					},
					initTechProfile: (techProfile) => {
						self._techProfileModelService.setTechProfile(techProfile);
					},
					setProviderForSelectedTopicIDs: (func) => {
						// called by the techprofile component to give us a function
						self.selectedTopicIDsProvider = func;
					},
					setProviderForSelectedLineItemIDs: (func) => {
						// called by the techprofile component to give us a function
						self.selectedLineItemIDsProvider = func;
					},
					getColorMeaningString: () => {
						return "Red means selected. Selected means you can edit it!"
					},
					getTopicBackgroundColor: (topic, isSelected) => {
						return isSelected ? "red" : undefined;
					},
					getLineItemBackgroundColor: (lineItem, isSelected) => {
						return isSelected ? "red" : undefined;
					},
				});
			})
		});
	}

	getDtimTechprofileComponentController() {
		return this._functionPromiseService.waitAndGet(this.funcKey, this.funcKey, { });
	};

	onNewTopicBtnClicked() {
		let self = this;
		self._alertService.show({
			header: 'New Topic!',
			message: "Enter the new topic name:",
			inputs: [{
				name: 'topicName',
				placeholder: '....',
				type: 'text'
			}],			
			buttons: [{
				text: 'Cancel', 
				handler: (data) => {
					// do nothing.. ?
				}
			},{
				text: 'OK', 
				handler: (data) => {
					if (data.topicName && data.topicName.length >= 2) {
						self._techProfileModelService.addTopic(data.topicName);
					} else {
						return false; // disable the button
					}
				}
			}
			]
		})
	}

	isNewLineItemBtnAvailable() {
		return this.selectedTopicIDsProvider().length > 0
	}

	onNewLineItemBtnClicked() {
		let self = this;
		self._alertService.show({
			header: 'New Line Item!',
			message: "Enter the new Line Item name:",
			inputs: [{
				name: 'lineItemName',
				placeholder: '....',
				type: 'text'
			}],			
			buttons: [{
				text: 'Cancel', 
				handler: (data) => {
					// do nothing.. ?
				}
			},{
				text: 'OK', 
				handler: (data) => {
					if (data.lineItemName && data.lineItemName.length >= 2) {
						self._techProfileModelService.addLineItem(self.selectedTopicIDsProvider()[0], data.lineItemName);
					} else {
						return false; // disable the button
					}
				}
			}
			]
		})
	}

	isSelectedTopicAbleToMoveUp() {
		return this._techProfileModelService.isTopicAbleToMoveUp(this.selectedTopicIDsProvider()[0]);
	}

	onMoveTopicUpClicked() {
		this._techProfileModelService.moveSequenceForTechProfileTopic(this.selectedTopicIDsProvider()[0], -1)
	}

	isSelectedTopicAbleToMoveDown() {
		return this._techProfileModelService.isTopicAbleToMoveDown(this.selectedTopicIDsProvider()[0]);
	}

	onMoveTopicDownClicked() {
		this._techProfileModelService.moveSequenceForTechProfileTopic(this.selectedTopicIDsProvider()[0], 1)
	}

	isSelectedLineItemAbleToMoveUp() {
		return this._techProfileModelService.isLineItemAbleToMoveUp(this.selectedTopicIDsProvider()[0], this.selectedLineItemIDsProvider()[0]);
	}

	onMoveLineItemUpClicked() {
		this._techProfileModelService.moveSequenceForTechProfileLineItem(this.selectedTopicIDsProvider()[0], this.selectedLineItemIDsProvider()[0], -1)	
	}

	isSelectedLineItemAbleToMoveDown() {
		return this._techProfileModelService.isLineItemAbleToMoveDown(this.selectedTopicIDsProvider()[0], this.selectedLineItemIDsProvider()[0]);
	}

	onMoveLineItemDownClicked() {
		this._techProfileModelService.moveSequenceForTechProfileLineItem(this.selectedTopicIDsProvider()[0], this.selectedLineItemIDsProvider()[0], 1)
	}

	isEditTopicBtnAvailable() {
		return this.selectedTopicIDsProvider().length > 0;
	}

	onEditTopicBtnClicked() {
		this._router.navigate(['/tech-profile-topic-edit/' + this.selectedTopicIDsProvider()[0]]);
	}

	isEditLineItemBtnAvailable() {
		return this.selectedLineItemIDsProvider().length > 0;
	}

	onEditLineItemBtnClicked() {
		this._router.navigate(['/tech-profile-line-item-edit/' + this.selectedLineItemIDsProvider()[0]]);
	}

	onBackBtnClicked() {
		this._techProfileModelService.saveSequenceInfo().then((data) => {
			this._location.back();
		})
	}
}
