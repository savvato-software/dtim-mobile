import { Injectable } from '@angular/core';

import { AttendanceAPIService } from './attendance-api.service';
import { FunctionPromiseService } from '@savvato-software/savvato-javascript-services'

import * as moment from 'moment'

@Injectable({
  providedIn: 'root'
})
export class AttendanceModelService {

	LIST_OF_USERS_IN_ATTENDANCE = "listofUsersInAttendance";

	currentSession = undefined;
	sessionActive = undefined;

	listOfUsersInAttendance = undefined;

	constructor(private _attendanceAPIService: AttendanceAPIService
				,private _functionPromiseService: FunctionPromiseService) {

	}

	init() {
		this._functionPromiseService.initFunc(this.LIST_OF_USERS_IN_ATTENDANCE, (data) => {
			let rtn = new Promise((resolve, reject) => {
				this._attendanceAPIService.getListOfThoseMarkedInAttendanceInTheCurrentSession().then((list) => {
				    console.log("resolving listof thos markedinattendance fps promise")
				    resolve(list);
				})
			})

			return rtn;
		})

		this.listOfUsersInAttendance = undefined;
	}

	getListOfUsersInAttendance() {
		return this._functionPromiseService.get(this.LIST_OF_USERS_IN_ATTENDANCE, this.LIST_OF_USERS_IN_ATTENDANCE, undefined);
	}

	isSessionActive() {
		// this function checks the API to get the date/time of the start of the last session, and then returns true if the 
		//  current time is within three hours. 

		let self = this;

		if (self.sessionActive === undefined) { // we have not made an API call yet.. 

			// set our flag, so we don't make this API call again if the method is called again.
			//  we set it to null to indicate we've made a call, but not received the results yet
			self.sessionActive = null;

			self._attendanceAPIService.getLastSession().then((data) => {
				if (data && moment(data["timestamp"]) > moment(new Date().getTime() - (1000*60*60*3))) {
					// if it has been less than three hours since the last session started, we consider that we are in the same session
					self.currentSession = data;
					self.sessionActive = true;
				}
			})
		}

		return self.sessionActive;
	}

	getCurrentSessionNumber() {
		let rtn = undefined;

		if (this.isSessionActive()) {
			rtn = this.currentSession.id;
		}

		console.log("getCurrentSessionNumber returning ", rtn)
		return rtn;
	}

	getCurrentSessionDateString() {
		let rtn = undefined;

		if (this.isSessionActive()) {
			rtn = new Date(this.currentSession.timestamp);
		}

		return rtn;
	}

	startNewSession() {
		let self = this;

		let rtn = new Promise((reject, resolve) => {
			self._attendanceAPIService.startNewSession().then((data) => {
				if (data) {
					self.currentSession = data;
					self.resetActiveSessionFlag();
				}
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
