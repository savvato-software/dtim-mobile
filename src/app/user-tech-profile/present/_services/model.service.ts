import { Injectable } from '@angular/core';

import * as jsonpath from 'jsonpath'

@Injectable({
  providedIn: 'root'
})
export class ModelService {

	constructor() { 

	}

	getPathsForCareerGoalQuestions(careerGoal, nextQuestions) {
		let rtn = []
		let id = nextQuestions[0]['id'];

		jsonpath.nodes(careerGoal, "$..questions").forEach(e => {
			let qIds = e['value'].map(q => q['id']);

			let nextQuestionIds = nextQuestions.map(q => q['id']);
			let found = false;

			for (var i=0; i < qIds.length && !found; i++) {
				if (nextQuestionIds.find(id => id === qIds[i])) {
					rtn.push(e['path']);
					found = true;
				}
			}
		})

		return rtn;
	}
}
