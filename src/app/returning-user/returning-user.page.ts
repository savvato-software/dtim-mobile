import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { AlertService } from '../_services/alert.service';
import { UserService } from '../_services/user.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-returning-user',
  templateUrl: './returning-user.page.html',
  styleUrls: ['./returning-user.page.scss'],
})
export class ReturningUserPage implements OnInit {

	query = {
		phone: undefined,
		email: undefined
	}

    constructor(private _location: Location,
			    private _router: Router,
			    private _route: ActivatedRoute,
    			private _userService: UserService,
    			private _alertService: AlertService ) {

    }

	ngOnInit() {
	
	}

	onQueryChange($event) {
		if ($event.currentTarget.id == "phone") {
			this.query.phone = $event.currentTarget.value
		} else if($event.currentTarget.id == "email") {
			this.query.email = $event.currentTarget.value
		}
	}

	getQuery(value) {
		if (value == 'phone') {
			return this.query.phone;
		} else if(value == "email") {
			return this.query.email
		}
	}

	isSearchBtnEnabled() {
		if (this.query.email || this.query.phone){
			return true
		} else {
			return false
		}
	}

	onSearchBtnClicked() {
		let self = this;
		let data = undefined;

		if (self.query.email) {
			data = self.query.email
		} else {
			data = self.query.phone
		}

		self._userService.getUserByEmailOrPhone(data).then((user) => {
			
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
