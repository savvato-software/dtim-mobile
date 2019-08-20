import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { AlertService } from '../_services/alert.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-returning-user',
  templateUrl: './returning-user.page.html',
  styleUrls: ['./returning-user.page.scss'],
})
export class ReturningUserPage implements OnInit {

	query = undefined;

    constructor(private _location: Location,
			    private _router: Router,
			    private _route: ActivatedRoute,
    			private _userService: UserService,
    			private _alertService: AlertService ) {

    }

	ngOnInit() {
	
	}

	onQueryChange($event) {
		this.query = $event.currentTarget.value;
	}

	getQuery() {
		return this.query;
	}

	isSearchBtnEnabled() {
		return this.query && this.query.length >= 3;
	}

	onSearchBtnClicked() {
		let self = this;

		self._userService.getUserByEmailOrPhone(self.query).then((user) => {
			
			if (user) {
				self._userService.markUserAsAttending(user["id"]).then(() => {
					self._alertService.show({
						header: 'Found you!',
						message: "We found your previous info.<br/><br/>Sweet!<br/><br/> Please hand the tablet to the next person. Thanks!",
						buttons: [
							{
								text: 'OK', role: 'cancel', handler: () => {
									this._location.back();
								}
							}
						]
					})
				})
			} else {
				self._alertService.show({
					header: 'Hmmm...',
					message: "Sorry, we couldn't find a profile with that info...<br/><br/>Do you want to create one?",
					buttons: [{
						text: "No, nevermind.",
						role: 'cancel'
					}, {
						text: 'Yes!',
						handler: () => {
					  		this._router.navigate(['/new-user']);
						}
					}]
				})
			}
		})			
	}

	onCancelBtnClicked() {
		this._router.navigate(['/home']);
	}
}
