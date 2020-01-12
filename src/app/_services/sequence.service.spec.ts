import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SequenceService } from './sequence.service';

import { FORWARD, BACKWARD } from '../../_constants/constants';

describe('SequenceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ], 
  }));

  it('should be created', () => {
    const service: SequenceService = TestBed.get(SequenceService);
    expect(service).toBeTruthy();
  });

  describe('moveSequenceByOne', () => {
	let objA, objB, objC, list, service: SequenceService;

  	beforeEach(() => {
	  	objA = {id: 'a', sequence: 1};
	  	objB = {id: 'b', sequence: 2};
	  	objC = {id: 'c', sequence: 3};

	  	list = [objA, objB, objC];

	  	service = TestBed.get(SequenceService);
  	});

  	it('throws an error if you pass a value for direction that is other than BACKWARD or FORWARD', () => {
  		const SOME_OTHER_VALUE = 457;
  		expect( function() { service.moveSequenceByOne(list, objA, SOME_OTHER_VALUE); }).toThrow();
  	})

	it('moves the sequence number of an object forward by one when a positive number is passed in', () => {

		let result = service.moveSequenceByOne(list, objA, FORWARD);

		expect(result).toBeTruthy();
		expect(result['id']).toBe('a');
		expect(result['sequence']).toBe(2);
		expect(list.find((e) => e['id'] == 'b')['sequence']).toBe(1);
		expect(list.find((e) => e['id'] == 'c')['sequence']).toBe(3);
	});

	it('moves the sequence number of an object back by one when a negative number is passed in', () => {

		let result = service.moveSequenceByOne(list, objC, BACKWARD);

		expect(result).toBeTruthy();
		expect(result['id']).toBe('c');
		expect(result['sequence']).toBe(2);
		expect(list.find((e) => e['id'] == 'b')['sequence']).toBe(3);
		expect(list.find((e) => e['id'] == 'a')['sequence']).toBe(1);
	});

	it('does not move the sequence number of an object forward if that object is the last in the list', () => {

		let result = service.moveSequenceByOne(list, objC, FORWARD);

		expect(result).toBeTruthy();
		expect(result['id']).toBe('c');
		expect(result['sequence']).toBe(3);
		expect(list.find((e) => e['id'] == 'a')['sequence']).toBe(1);
		expect(list.find((e) => e['id'] == 'c')['sequence']).toBe(3);
	})

	it('does not move the sequence number of an object back if that object is the first in the list', () => {

		let result = service.moveSequenceByOne(list, objA, BACKWARD);

		expect(result).toBeTruthy();
		expect(result['id']).toBe('a');
		expect(result['sequence']).toBe(1);
		expect(list.find((e) => e['id'] == 'b')['sequence']).toBe(2);
		expect(list.find((e) => e['id'] == 'c')['sequence']).toBe(3);
	})
  })

  describe('isAbleToMove', () => {
	let objA, objB, objC, list, service: SequenceService;

  	beforeEach(() => {
	  	objA = {id: 'a', sequence: 1};
	  	objB = {id: 'b', sequence: 2};
	  	objC = {id: 'c', sequence: 3};

	  	list = [objA, objB, objC];

	  	service = TestBed.get(SequenceService);
  	});

  	it('throws an error if you pass a value for direction that is other than BACKWARD or FORWARD', () => {
  		const SOME_OTHER_VALUE = 457;
  		expect( function() { service.isAbleToMove(list, objA, SOME_OTHER_VALUE); }).toThrow();
  	})

  	it('returns true if the obj should be able to move forward', () => {
  		let result = service.isAbleToMove(list, objA, FORWARD);
  		expect(result).toBe(true);
  	})

  	it('returns true if the obj should be able to move backward', () => {
  		let result = service.isAbleToMove(list, objC, BACKWARD);
  		expect(result).toBe(true);
  	})

  	it('returns false if the obj should not be able to move forward', () => {
  		let result = service.isAbleToMove(list, objC, FORWARD);
  		expect(result).toBe(false);
  	})

  	it('returns false if the obj should not be able to move backward', () => {
  		let result = service.isAbleToMove(list, objA, BACKWARD);
  		expect(result).toBe(false);
  	})
  })

});
