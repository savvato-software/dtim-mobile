import { Injectable } from '@angular/core';

import { TechProfileModelService } from './tech-profile-model.service'
import { TechProfileAPIService } from './tech-profile-api.service'

// IMPORTED HERE UNDER PROTEST! Why does the child need to supply instances of each service a parent might use?
//  Doesn't that break encapsulation? WTF?!
import { SequenceService } from './sequence.service';

@Injectable({
  providedIn: 'root'
})
export class UserTechProfileModelService extends TechProfileModelService {

	userScores = undefined;
	userId = undefined;
	dirty = false;	

	constructor(protected _techProfileAPI: TechProfileAPIService,
				protected _sequenceService: SequenceService) {
		super(_techProfileAPI, _sequenceService);
	}

	init(userId) {
		super._init();

		let self = this;

		if (userId !== self.userId) {

			self.userId = userId;

			self._techProfileAPI.getScores(userId).then((scores) => {
				self.userScores = scores;
			})
		} else {
			console.log("UserTechProfileModelService did NOT init, because the userId requested is the same one we already have, and we do not want to overwrite any data.")
		}
	}

	isDirty() {
		return this.dirty;
	}

	setDirty() {
		this.dirty = true;
	}

	isTechProfileAvailable() {
		return super.isTechProfileAvailable();
	}

	isUserScoresAvailable() {
		return !!this.userScores;
	}

	getScore(lineItemId) {
		let rtn = undefined;

		if (this.userScores) {
			let score = this.userScores.find((s) => { return s["techProfileLineItemId"] === lineItemId; });

			rtn = !!score ? score["techProfileLineItemScore"] : undefined;
		}

		return rtn;
	}

	clearScore(lineItemId) {
		this.userScores = this.userScores.filter((s) => { return s["techProfileLineItemId"] !== lineItemId; });
	}

	setLineItemScore(lineItemId, idx) {
		let self = this;
		return new Promise((resolve, reject) => {
			if (self.userScores) {
				let score = self.userScores.find((s) => { return s["techProfileLineItemId"] === lineItemId; });
				let prevScore = Object.assign({}, score);

				if (score) {
					score["techProfileLineItemScore"] = idx;
				} else {
					score = {
						userId: self.userId,
						techProfileLineItemId: lineItemId,
						techProfileLineItemScore: idx
					};

					self.userScores.push(score);
				}

				self.setDirty();
				resolve({prevScore: prevScore, newScore: score});
			} else {
				resolve(undefined);
			}
		})
	}	

	save() {
		let self = this;
		return new Promise((resolve, reject) => {
			if (self.isDirty()) {
				self._techProfileAPI.saveScores(self.userId, self.userScores).then((data) => {
					self.dirty = false;
					resolve(data);
				})
			} else {
				resolve(undefined);
			}
		});
	};
}
