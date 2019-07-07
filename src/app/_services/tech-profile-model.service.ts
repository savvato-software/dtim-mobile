import { Injectable } from '@angular/core';

import { TechProfileAPIService } from './tech-profile-api.service';

@Injectable({
  providedIn: 'root'
})
export class TechProfileModelService {

	techProfile = undefined;

	constructor(protected _techProfileAPI: TechProfileAPIService) { }

	_init() {
		let self = this;

		if (self.techProfile === undefined) {
			self.techProfile = null;

			self._techProfileAPI.get(1).then((tp) => {
				self.techProfile = tp;
			})
		}
	}

	isTechProfileAvailable() {
		return this.techProfile && this.techProfile != null;
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

}
