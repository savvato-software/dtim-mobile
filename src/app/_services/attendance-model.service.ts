import { Injectable } from '@angular/core';

import { AttendanceAPIService } from './attendance-api.service';

@Injectable({
  providedIn: 'root'
})
export class AttendanceModelService {

	sessionActive = undefined;

	constructor(private _attendanceAPIService: AttendanceAPIService) {

	}

	isSessionActive() {
		let self = this;
		if (self.sessionActive === undefined) {
			self.sessionActive = null;

			self._attendanceAPIService.getLastSession().then((data) => {
				if (data)
				  self.sessionActive = true;
			})
		}

		return self.sessionActive;
	}

	startNewSession() {
		let self = this;

		let rtn = new Promise((reject, resolve) => {
			self._attendanceAPIService.startNewSession().then((data) => {
				if (data)
					self.resetActiveSessionFlag();
			}, (err) => {
				reject(err);
			})
		});

		return rtn;
	}

	resetActiveSessionFlag() {
		this.sessionActive = undefined;
	}
}
