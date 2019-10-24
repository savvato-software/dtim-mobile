import { Injectable } from '@angular/core';

import { TechProfileAPIService } from './tech-profile-api.service'


@Injectable({
  providedIn: 'root'
})
export class UserTechProfileModelService {

	userScores = undefined;
	userId = undefined;
	dirty = false;	

	constructor(protected _techProfileAPI: TechProfileAPIService) {
		
	}

	init(userId) {
		let self = this;

		if (userId !== self.userId) {

			self.userId = userId;

			self._techProfileAPI.getScores(userId).then((scores) => {
				self.userScores = scores;
			})
		} else {
			console.log("UserTechProfileModelService did NOT init. Not sure if thats a good or bad thing")
		}
	}

	waitingPromise() {
		let self = this;
		return new Promise((resolve, reject) => {

			function to() {
				setTimeout(() => {
					if (self.isUserScoresAvailable())
						resolve();
					else
						to();
				}, 600);
			}

			to();
		})
	}

	isDirty() {
		return this.dirty;
	}

	setDirty() {
		this.dirty = true;
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
