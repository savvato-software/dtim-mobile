import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { AlertService } from '../_services/alert.service';
import { UserService } from '../_services/user.service';

import { CountryPhone } from './country-phone.model';
import { PhoneValidator } from '../validators/phone.validator';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.page.html',
  styleUrls: ['./new-user.page.scss'],
})
export class NewUserPage implements OnInit {

  	name = undefined;
  	phone = undefined;
  	email = undefined;

  	validations_form: FormGroup;  	
  	country_phone_group: FormGroup;

  	countries: Array<CountryPhone>;

    constructor(private _location: Location,
			    private _router: Router,
			    private _route: ActivatedRoute,
    			private _userService: UserService,
    			private _alertService: AlertService,
    			private formBuilder: FormBuilder ) {

    }

	validation_messages = {
		'name': [
		  { type: 'required', message: 'Name is required.' }
		],
		'email': [
		  { type: 'required', message: 'Email is required.' },
		  { type: 'pattern', message: 'Please enter a valid email, OR a ten digit phone number.' }
		],
		'phone': [
		  { type: 'required', message: 'Phone is required.' },
		  { type: 'validCountryPhone', message: 'Please enter a ten digit phone number, OR a valid email.' }
		]
	};

  	ngOnInit() {
		this.name = '';
		this.email = undefined;
		this.phone = undefined;

	    this.countries = [
	      new CountryPhone('US', 'United States')
	    ];

	    let country = new FormControl(this.countries[0], Validators.required);
	    let phone = new FormControl('', Validators.compose([
	      PhoneValidator.validCountryPhone(country)
	    ]));
	    this.country_phone_group = new FormGroup({
	      country: country,
	      phone: phone
	    });

		this.validations_form = this.formBuilder.group({
		  name: new FormControl('', Validators.required),
		  email: new FormControl('', Validators.compose([
		    Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
		  ])),
		  country_phone: this.country_phone_group
		},
		{updateOn: "blur"}
		);
	}

	ionViewWillEnter() {
		this.ngOnInit();
	}

	onNameChange($event) {
		this.name = $event.currentTarget.value;
	}

	getName() {
		return this.name;
	}

	onPhoneChange($event) {
		this.phone = $event.currentTarget.value;
	}

	getPhone() {
		return this.phone;
	}

	onEmailChange($event) {
		this.email = $event.currentTarget.value;
	}

	getEmail() {
		return this.email;
	}

	// onFocusLostEvent() {
	// 	let input = event['target'] as HTMLElement;
	// 	console.log(input.id); // the id of the ion-input object for its identification
	// }

	isSaveBtnEnabled() {
		let rtn = this.name && this.name.length > 3;
		let atLeastOneFieldIsValid = false;

		if (this.phone) {
			rtn = rtn && this.validations_form.get('country_phone') !== null && (!!this.validations_form.get('country_phone').errors === false) && this.phone.length === 10;

			if (rtn) atLeastOneFieldIsValid = true;
		} 

		if (this.email) {
			rtn = rtn && this.validations_form.get('email') !== null && (!!this.validations_form.get('email').errors === false) && this.email.length > 6

			if (rtn) atLeastOneFieldIsValid = true;
		}

		return rtn && atLeastOneFieldIsValid;
	}

	onSaveBtnClicked() {
		console.log("Save Btn Clicked!");
    	
    	let self = this;

    	let DEFAULT_PASSWORD = "password11"

    	self._userService.createNewUser(this.name, this.phone, this.email, DEFAULT_PASSWORD).then((user) => {
			self._userService.markUserAsAttending(user["id"]).then(() => {
				self._alertService.show({
					header: 'You\'re in!',
					message: "Your profile has been created. Please hand the tablet to the next person. Thanks!",
					buttons: [
						{
							text: 'OK', role: 'cancel', handler: () => {
								self._router.navigate(['/home']);
							}
						}
					]
				})
			})
    	})
	}

	onCancelBtnClicked() {
		console.log("Cancel Btn Clicked!");
    	this._router.navigate(['/home']);
	}
}

// Click I'm New Here..

// Enter a valid name

// Enter email field, begin typing, notice the error message

// Expected: we should not be showing the error message until the onBlur event happens (when the cursor leaves the field). It should then validate the contents of the field.

// Actual: the validation error message does show for the email field.

// But ignore the email validation error message for now. Enter an invalid email, like 'bademail@'

// Enter the phone number field, and begin typing. Again,

// Expected: we should not be showing the error message until the onBlur event happens (when the cursor leaves the field). It should then validate the contents of the field.

// Actual: the validation error message does show for the phone number field.

// Finish entering a correct string of 10 digits in the phone number field.

// Notice the error message on the phone number field has gone away, thats good. +1

// The error message on the email field

// Expected: it should read "Please clear this field, or enter a valid email."

// Actual: it reads: "Please enter a valid email, OR a ten digit phone number."

// Likewise, if starting from the top, you enter a valid name, and then a valid email address, as you begin typing the phone number, there should be no validation error message (wait till they exit the field to validate). If they leave the field with an invalid value, since the email address does have a valid value (in this scenario), the error on the phone number field should read "Please clear this field, or enter a valid phone number."