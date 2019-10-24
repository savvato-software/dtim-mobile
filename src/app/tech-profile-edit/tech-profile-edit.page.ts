import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { FunctionPromiseService } from '../_services/function-promise.service'
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

	selectedTopicIDs = [];
	selectedLineItemIDs = [];
	allowMultiSelect = false;

	funcKey = "tpepg-controller";

	_techProfile = undefined;

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
					getColorMeaningString: () => {
						return "Red means selected. Selected means you can edit it!"
					},
					getTopicBackgroundColor: (thisId) => {
						if (self.selectedTopicIDs.find((thatId) => { return thisId === thatId }))
							return "red"; 
						else 
							return undefined;
					},
					onTopicClick: (thisId) => {
						if (self.selectedTopicIDs.length === 0) {
							self.selectedTopicIDs.push(thisId);
						} else {
							if (self.allowMultiSelect) {
								if (self.selectedTopicIDs.find((thatId) => { return thisId === thatId; })) {
									self.selectedTopicIDs = self.selectedTopicIDs.filter((thatId) => { return thisId !== thatId; })
								} else {
									self.selectedTopicIDs.push(thisId);
								}
							} else {
								if (self.selectedTopicIDs[0] === thisId) {
									self.selectedTopicIDs = [];
								} else {
									self.selectedTopicIDs[0] = thisId;
								}
							}
						}
					},
					getLineItemBackgroundColor: (thisId) => {
						if (self.selectedLineItemIDs.find((thatId) => { return thisId === thatId }))
							return "red"; 
						else 
							return undefined;
					},
					onLineItemClick: (thisId) => {
						if (self.selectedLineItemIDs.length === 0) {
							self.selectedLineItemIDs.push(thisId);
						} else {
							if (self.allowMultiSelect) {
								if (self.selectedLineItemIDs.find((thatId) => { return thisId === thatId; })) {
									self.selectedLineItemIDs = self.selectedLineItemIDs.filter((thatId) => { return thisId !== thatId; })
								} else {
									self.selectedLineItemIDs.push(thisId);
								}
							} else {
								if (self.selectedLineItemIDs[0] === thisId) {
									self.selectedLineItemIDs = [];
								} else {
									self.selectedLineItemIDs[0] = thisId;
								}
							}
						}
					}
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
		return this.selectedTopicIDs.length > 0
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
						self._techProfileModelService.addLineItem(self.selectedTopicIDs[0], data.lineItemName);
					} else {
						return false; // disable the button
					}
				}
			}
			]
		})
	}

	isSelectedTopicAbleToMoveUp() {
		return this._techProfileModelService.isTopicAbleToMoveUp(this.selectedTopicIDs[0]);
	}

	onMoveTopicUpClicked() {
		this._techProfileModelService.moveSequenceForTechProfileTopic(this.selectedTopicIDs[0], -1)
	}

	isSelectedTopicAbleToMoveDown() {
		return this._techProfileModelService.isTopicAbleToMoveDown(this.selectedTopicIDs[0]);
	}

	onMoveTopicDownClicked() {
		this._techProfileModelService.moveSequenceForTechProfileTopic(this.selectedTopicIDs[0], 1)
	}

	isSelectedLineItemAbleToMoveUp() {
		return this._techProfileModelService.isLineItemAbleToMoveUp(this.selectedTopicIDs[0], this.selectedLineItemIDs[0]);
	}

	onMoveLineItemUpClicked() {
		this._techProfileModelService.moveSequenceForTechProfileLineItem(this.selectedTopicIDs[0], this.selectedLineItemIDs[0], -1)	
	}

	isSelectedLineItemAbleToMoveDown() {
		return this._techProfileModelService.isLineItemAbleToMoveDown(this.selectedTopicIDs[0], this.selectedLineItemIDs[0]);
	}

	onMoveLineItemDownClicked() {
		this._techProfileModelService.moveSequenceForTechProfileLineItem(this.selectedTopicIDs[0], this.selectedLineItemIDs[0], 1)
	}

	isEditTopicBtnAvailable() {
		return this.selectedTopicIDs.length > 0;
	}

	onEditTopicBtnClicked() {
		this._router.navigate(['/tech-profile-topic-edit/' + this.selectedTopicIDs[0]]);
	}

	isEditLineItemBtnAvailable() {
		return this.selectedLineItemIDs.length > 0;
	}

	onEditLineItemBtnClicked() {
		console.log(this.selectedLineItemIDs)
		this._router.navigate(['/tech-profile-line-item-edit/' + this.selectedLineItemIDs[0]]);
	}

	onBackBtnClicked() {
		this._techProfileModelService.saveSequenceInfo().then((data) => {
			this._location.back();
		})
	}
}
