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
	query = undefined;

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
		  console.log(this);
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
		    Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+([\.]{1})([a-zA-Z0-9]{2,3})$')
			])),
			country_phone: this.country_phone_group
		},
		{
			updateOn: "blur"
		}
		);
	}

	
	ionViewWillEnter() {
		this.ngOnInit();
	}

	getErrorMessages() {

		if((this.validations_form.controls.email.status === "VALID" && /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+([\.]{1})([a-zA-Z0-9]{2,3})$/.test(this.validations_form.controls.email.value)) && (this.validations_form.controls.country_phone.status === "VALID" && this.validations_form.controls.country_phone.value.phone.length === 10)) {
			console.log('valid email and phone')
			this.validation_messages.phone[1] = { type: 'validCountryPhone', message: 'You have entered a valid email address. Please clear this field OR provide a 10 digit phone number.' };
			this.validation_messages.email[1] = { type: 'pattern', message: 'You have entered a valid phone number. Please clear this field OR provide a valid email.' };
		} else if ((this.validations_form.controls.country_phone.status === "VALID" && this.validations_form.controls.country_phone.value.phone.toString().length === 10)) {
			console.log('valid phone')
			this.validation_messages.email[1] = { type: 'pattern', message: 'You have entered a valid phone number. Please clear this field OR provide a valid email.' };
			this.validation_messages.phone[1] = { type: 'validCountryPhone', message: 'Please enter a ten digit phone number, OR a valid email.' };
		} else if ((this.validations_form.controls.email.status === "VALID" && /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+([\.]{1})([a-zA-Z0-9]{2,3})$/.test(this.validations_form.controls.email.value))) {
			console.log('valid email')
			this.validation_messages.phone[1] = { type: 'validCountryPhone', message: 'You have entered a valid email address. Please clear this field OR provide a 10 digit phone number.' };
			this.validation_messages.email[1] = { type: 'pattern', message: 'Please enter a valid email, OR a ten digit phone number.' };
		} else if ((this.validations_form.controls.email.status === "VALID" && !(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+([\.]{1})([a-zA-Z0-9]{2,3})$/.test(this.validations_form.controls.email.value)))) {
			console.log('invalid email with valid status');
			this.validation_messages.phone[1] = { type: 'validCountryPhone', message: 'Please enter a ten digit phone number, OR a valid email.' };
			this.validation_messages.email[1] = { type: 'pattern', message: 'Please enter a valid email, OR a ten digit phone number.' };
		} else {
			console.log('case 5');			
			this.validation_messages.phone[1] = { type: 'validCountryPhone', message: 'Please enter a ten digit phone number, OR a valid email.' };
			this.validation_messages.email[1] = { type: 'pattern', message: 'Please enter a valid email, OR a ten digit phone number.' };
		}

	}


	onNameChange($event) {
		this.name = $event.currentTarget.value;
	}

	getName() {
		return this.name;
	}

	onPhoneChange($event) {
		this.phone = $event.target.value
		this.validation_messages.phone[1] = { type: 'validCountryPhone', message: null };

	}

	getPhone() {
		return this.phone;
	}

	onEmailChange($event) {
		this.email = $event.currentTarget.value;
		this.validation_messages.email[1] = { type: 'pattern', message: null };
	}

	getEmail() {
		return this.email;
	}

	onEmailBlur($event) {
		this.getErrorMessages();
	}

	onPhoneBlur($event) {
		this.getErrorMessages();
	}

	isSaveBtnEnabled() {
		let rtn = this.name && this.name.length > 3;
		let atLeastOneFieldIsValid = false;

		if (this.phone) {
			rtn = rtn && this.validations_form.get('country_phone') !== null && (!!this.validations_form.get('country_phone').errors === false) && this.phone.length === 10;

			if (rtn) {
				atLeastOneFieldIsValid = true;
			}
		} 

		if (this.email) {

			rtn = rtn && this.validations_form.get('email') !== null && (!!this.validations_form.get('email').errors === false) && /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+([\.]{1})([a-zA-Z0-9]{2,3})$/.test(this.email);


			if (rtn) {
				atLeastOneFieldIsValid = true;
			}
		}

		return rtn && atLeastOneFieldIsValid;
	}
	
	onSaveBtnClicked() {
    	
    	let self = this;

		let DEFAULT_PASSWORD = "password11"

		if (this.email) {
			this.query = this.email
		} else {
			this.query = this.phone;
		}

		self._userService.getUserByEmailOrPhone(self.query).then((user) => {
			console.log("new user submit:", user);
			if (user) {
				console.log('returning user:', user);
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
				self._userService.createNewUser(this.name, this.phone, this.email, DEFAULT_PASSWORD).then((user) => {
					console.log("new user:", user);
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
		})
	}
	

	
	onCancelBtnClicked() {
		this._router.navigate(['/home']);
	}
}
