import { Injectable } from '@angular/core';

import { TechProfileAPIService } from './tech-profile-api.service'

@Injectable({
  providedIn: 'root'
})
export class UserTechProfileModelService {

	techProfile = undefined;
	candidateScores = undefined;
	candidateId = undefined;
	dirty = false;

	constructor(private _techProfileAPI: TechProfileAPIService) { }

	init(candidateId) {
		let self = this;
		
		if (candidateId !== self.candidateId) {

			self.candidateId = candidateId;

			self._techProfileAPI.get(1).then((tp) => {
				self.techProfile = tp;
			})

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
		return !!this.techProfile;
	}

	isCandidateScoresAvailable() {
		return !!this.candidateScores;
	}

	getTechProfile() {
		return this.techProfile;
	}

	getTechProfileTopics() {
		return this.techProfile["topics"].sort((a, b) => { return a["sequence"] - b["sequence"]; });
	}

	getTechProfileLineItemsByTopic(topicId) {
		let rtn = undefined;
		let topic = this.techProfile["topics"].find((t) => { return t["id"] === topicId; });

		if (topic) {
			rtn = topic["lineItems"].sort((a, b) => { return a["sequence"] - b["sequence"]; });
		}

		return rtn;
	}

	getTechProfileLineItemById(id) {
		let rtn = undefined;

		for (var x=0; this.techProfile && !rtn && x < this.techProfile["topics"].length; x++) {
			rtn = this.techProfile["topics"][x]["lineItems"].find((li) => { return li["id"] === id; });
		}

		return rtn;
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
