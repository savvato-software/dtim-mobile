import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CareerGoalModelService {

	constructor() { 

	}

	// MAY NOT NEED THIS
	getLabours(careerGoal) {
		let rtn = [];

		careerGoal["paths"].forEach(p => {
			p["milestones"].forEach(m => {
				rtn.push(m["labours"]);
			})
		})
	}
}
