import { Injectable } from '@angular/core';

import { AttendanceAPIService } from './attendance-api.service';
import { FunctionPromiseService } from 'savvato-javascript-services'

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
		let self = this;
		if (self.sessionActive === undefined) {
			self.sessionActive = null;

			self._attendanceAPIService.getLastSession().then((data) => {
				if (data && moment(data["timestamp"]) > moment(new Date().getTime() - (1000*60*60*3))) {
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
