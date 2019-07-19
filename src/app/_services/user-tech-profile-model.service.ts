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

	candidateScores = undefined;
	candidateId = undefined;
	dirty = false;	

	constructor(protected _techProfileAPI: TechProfileAPIService,
				protected _sequenceService: SequenceService) {
		super(_techProfileAPI, _sequenceService);
	}

	init(candidateId) {
		super._init();

		let self = this;

		if (candidateId !== self.candidateId) {

			self.candidateId = candidateId;

			self._techProfileAPI.getScores(candidateId).then((scores) => {
				self.candidateScores = scores;
			})
		} else {
			console.log("UserTechProfileModelService did NOT init, because the candidateId requested is the same one we already have, and we do not want to overwrite any data.")
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

	isCandidateScoresAvailable() {
		return !!this.candidateScores;
	}

	getScore(lineItemId) {
		let rtn = 0;

		if (this.candidateScores) {
			let score = this.candidateScores.find((s) => { return s["techProfileLineItemId"] === lineItemId; });

			rtn = !!score ? score["techProfileLineItemScore"] : 0;
		}

		return rtn;
	}

	setLineItemScore(lineItemId, idx) {
		let self = this;
		return new Promise((resolve, reject) => {
			if (self.candidateScores) {
				let score = self.candidateScores.find((s) => { return s["techProfileLineItemId"] === lineItemId; });
				let prevScore = Object.assign({}, score);

				if (score) {
					score["techProfileLineItemScore"] = idx;
				} else {
					score = {
						candidateId: self.candidateId,
						techProfileLineItemId: lineItemId,
						techProfileLineItemScore: idx
					};

					self.candidateScores.push(score);
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
				self._techProfileAPI.saveScores(self.candidateId, self.candidateScores).then((data) => {
					self.dirty = false;
					resolve(data);
				})
			} else {
				resolve(undefined);
			}
		});
	};
}
