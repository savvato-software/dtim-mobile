import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TechProfileModelService } from './tech-profile-model.service';

import { FORWARD, BACKWARD } from '../../_constants/constants';

describe('TechProfileModelService', () => {
	let techProfile = undefined; 

	let topic1 = undefined;
	let topic2 = undefined;
	let topic3 = undefined;

	let lineItem1 = undefined;
	let lineItem2 = undefined;
	let lineItem3 = undefined;
	let lineItem4 = undefined;
	let lineItem5 = undefined;
	let lineItem6 = undefined;

	let initTechProfile = function() {
		lineItem1 =	{id: 1, name: 'Line Item 1', sequence: 1, l0Description: 'LI1 Level 0 Desc', l1Description: 'LI1 Level 1 Desc', l2Description: 'LI1 Level 2 Desc', l3Description: 'LI1 Level 3 Desc'};
		lineItem2 = {id: 2, name: 'Line Item 2', sequence: 2, l0Description: 'LI2 Level 0 Desc', l1Description: 'LI2 Level 1 Desc', l2Description: 'LI2 Level 2 Desc', l3Description: 'LI2 Level 3 Desc'};
		lineItem3 = {id: 3, name: 'Line Item 3', sequence: 1, l0Description: 'LI3 Level 0 Desc', l1Description: 'LI3 Level 1 Desc', l2Description: 'LI3 Level 2 Desc', l3Description: 'LI3 Level 3 Desc'};
		lineItem4 = {id: 4, name: 'Line Item 4', sequence: 2, l0Description: 'LI4 Level 0 Desc', l1Description: 'LI4 Level 1 Desc', l2Description: 'LI4 Level 2 Desc', l3Description: 'LI4 Level 3 Desc'};
		lineItem5 = {id: 5, name: 'Line Item 5', sequence: 1, l0Description: 'LI5 Level 0 Desc', l1Description: 'LI5 Level 1 Desc', l2Description: 'LI5 Level 2 Desc', l3Description: 'LI5 Level 3 Desc'};
		lineItem6 = {id: 6, name: 'Line Item 6', sequence: 2, l0Description: 'LI6 Level 0 Desc', l1Description: 'LI6 Level 1 Desc', l2Description: 'LI6 Level 2 Desc', l3Description: 'LI6 Level 3 Desc'};

	  	topic1 = {id: 1, name: 'Topics 1', sequence: 1, lineItems: [ lineItem1, lineItem2 ]	};
		topic2 = {id: 2, name: 'Topics 2', sequence: 2, lineItems: [ lineItem3, lineItem4 ] };
		topic3 = {id: 3, name: 'Topics 3', sequence: 3, lineItems: [ lineItem5, lineItem6 ] };

		techProfile = {
		  		id: 1, 
		  		name: 'Mock Tech Profile for Unit Testing', 
		  		topics: [topic3, topic1, topic2]
		};

		return techProfile;
	}

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ], 
  }));

  it('should be created', () => {
    const service: TechProfileModelService = TestBed.get(TechProfileModelService);
    expect(service).toBeTruthy();
  });

  describe('isTechProfileAvailable', () => {
  	let service: TechProfileModelService;

  	beforeEach(() => {
  		service = TestBed.get(TechProfileModelService);
  	})

	it('returns true when the techprofile is available', () => {
		let result = service.isTechProfileAvailable();

		expect(result).toBeFalsy();

		service.setTechProfile(initTechProfile());
		result = service.isTechProfileAvailable();

		expect(result).toBe(true);
	})
  })

  describe('getTechProfileTopics', () => {
  	let service: TechProfileModelService;

  	beforeEach(() => {
  		service = TestBed.get(TechProfileModelService);
  	})

  	it('returns all the topics, sorted by sequence', () => {
  		service.setTechProfile(initTechProfile());

  		let result = service.getTechProfileTopics();

  		expect(result).toBeTruthy();
  		expect(result.length).toBe(3);
  		expect(result[0].id).toBe(1);
  		expect(result[0].sequence).toBe(1);
  		expect(result[1].id).toBe(2);
  		expect(result[1].sequence).toBe(2);
  		expect(result[2].id).toBe(3);
  		expect(result[2].sequence).toBe(3);
  	})

  	it('returns undefined if no techprofile has been set', () => {
  		let result = service.getTechProfileTopics();
  		expect(result).not.toBeDefined();
  	})

  	it('returns empty array if techprofile does not have topics', () => {
  		service.setTechProfile({id: 99, name: 'invalid tech profile with no topics', topics: []});
  		let result = service.getTechProfileTopics();
  		expect(result).toBeDefined();
  		expect(result.length).toBe(0);
  	})
  })

  describe('getTechProfileTopicById', () => {
  	let service: TechProfileModelService;

  	beforeEach(() => {
  		service = TestBed.get(TechProfileModelService);
  	})

  	it('returns the requested topic', () => {
  		service.setTechProfile(initTechProfile());

  		let result = service.getTechProfileTopicById(2);

  		expect(result).toBeTruthy();
  		expect(result.id).toBe(2);
  		expect(result.sequence).toBe(2);
  	})

  	it('returns undefined if no techprofile has been set', () => {
  		let result = service.getTechProfileTopicById(2);
  		expect(result).not.toBeDefined();
  	})

  	it('returns undefined if no topic by that id is present', () => {
  		let result = service.getTechProfileTopicById(763);
  		expect(result).not.toBeDefined();
  	})
  })

  describe('isTopicAbleToMoveUp', () => {
  	let service: TechProfileModelService;

  	beforeEach(() => {
  		service = TestBed.get(TechProfileModelService);
  		service.setTechProfile(initTechProfile());  		
  	})

  	it('returns true if the id of the last topic in sequence is passed in', () => {
  		let result = service.isTopicAbleToMoveUp(3);
  		expect(result).toBe(true);
  	})

  	it('returns false if the id of the first topic in sequence is passed in', () => {
  		let result = service.isTopicAbleToMoveUp(1);
  		expect(result).toBe(false);
  	})

  	it('returns false if the id of a non-existant topic is passed in', () => {
  		let result = service.isTopicAbleToMoveUp(763);
  		expect(result).toBe(false);
  	})
  })

  describe('isTopicAbleToMoveDown', () => {
  	let service: TechProfileModelService;

  	beforeEach(() => {
  		service = TestBed.get(TechProfileModelService);
  		service.setTechProfile(initTechProfile());  		
  	})

  	it('returns true if the id of the first topic in sequence is passed in', () => {
  		let result = service.isTopicAbleToMoveDown(1);
  		expect(result).toBe(true);
  	})

  	it('returns false if the id of the last topic in sequence is passed in', () => {
  		let result = service.isTopicAbleToMoveDown(3);
  		expect(result).toBe(false);
  	})

  	it('returns false if the id of a non-existant topic is passed in', () => {
  		let result = service.isTopicAbleToMoveDown(763);
  		expect(result).toBe(false);
  	})
  })

  describe('moveSequenceForTechProfileTopic', () => {
  	let service: TechProfileModelService;

  	beforeEach(() => {
  		service = TestBed.get(TechProfileModelService);
  		service.setTechProfile(initTechProfile());  		
  	})

  	it('returns the correct topic with its new sequence number on the happy path, fwd', () => {
  		let originalSequence = topic1.sequence;
  		let result = service.moveSequenceForTechProfileTopic(1, FORWARD);
  		
  		expect(result.id).toBe(1);
  		expect(result.name).toBe(topic1.name);
  		expect(result.sequence).toBeGreaterThan(originalSequence);
  	})

  	it('returns the correct topic with its new sequence number on the happy path, bkwd', () => {
  		let originalSequence = topic3.sequence;
  		let result = service.moveSequenceForTechProfileTopic(3, BACKWARD);
  		
  		expect(result.id).toBe(3);
  		expect(result.name).toBe(topic3.name);
  		expect(result.sequence).toBeLessThan(originalSequence);
  	})

  	it('returns the correct topic with its original sequence number if that topic cannot move forward', () => {
  		let originalSequence = topic3.sequence;
  		let result = service.moveSequenceForTechProfileTopic(3, FORWARD);
  		
  		expect(result.id).toBe(3);
  		expect(result.name).toBe(topic3.name);
  		expect(result.sequence).toBe(originalSequence);
  	})

  	it('returns the correct topic with its original sequence number if that topic cannot move backward', () => {
  		let originalSequence = topic1.sequence;
  		let result = service.moveSequenceForTechProfileTopic(1, BACKWARD);
  		
  		expect(result.id).toBe(1);
  		expect(result.name).toBe(topic1.name);
  		expect(result.sequence).toBe(originalSequence);
  	})
  })

///// 

  describe('isLineItemAbleToMoveUp', () => {
  	let service: TechProfileModelService;

  	beforeEach(() => {
  		service = TestBed.get(TechProfileModelService);
  		service.setTechProfile(initTechProfile());  		
  	})

  	it('returns true if the id of the last line item in sequence is passed in', () => {
  		let result = service.isLineItemAbleToMoveUp(3, 6);
  		expect(result).toBe(true);
  	})

  	it('returns false if the id of the first line item by sequence in a topic is passed in', () => {
  		let result = service.isLineItemAbleToMoveUp(3, 5);
  		expect(result).toBe(false);
  	})

  	it('returns false if the id of a non-existant topic is passed in', () => {
  		let result = service.isLineItemAbleToMoveUp(3, 7);
  		expect(result).toBe(false);
  	})
  })

  describe('isLineItemAbleToMoveDown', () => {
  	let service: TechProfileModelService;

  	beforeEach(() => {
  		service = TestBed.get(TechProfileModelService);
  		service.setTechProfile(initTechProfile());  		
  	})

  	it('returns true if the id of the first line item by sequence in a topic is passed in', () => {
  		let result = service.isLineItemAbleToMoveDown(3, 5);
  		expect(result).toBe(true);
  	})

  	it('returns false if the id of the last topic in sequence is passed in', () => {
  		let result = service.isLineItemAbleToMoveDown(3, 6);
  		expect(result).toBe(false);
  	})

  	it('returns false if the id of a non-existant topic is passed in', () => {
  		let result = service.isLineItemAbleToMoveDown(3, 7);
  		expect(result).toBe(false);
  	})
  })

  describe('moveSequenceForTechProfileLineItem', () => {
  	let service: TechProfileModelService;

  	beforeEach(() => {
  		service = TestBed.get(TechProfileModelService);
  		service.setTechProfile(initTechProfile());  		
  	})

	it('returns the correct line item with its new sequence number on the happy path, fwd', () => {
		let originalSequence = lineItem5.sequence;
		let result = service.moveSequenceForTechProfileLineItem(3, 5, FORWARD);
		
		expect(result.id).toBe(5);
		expect(result.name).toBe(lineItem5.name);
		expect(result.sequence).toBeGreaterThan(originalSequence);
  	})

	it('returns the correct line item with its new sequence number on the happy path, bkwd', () => {
		let originalSequence = lineItem6.sequence;
		let result = service.moveSequenceForTechProfileLineItem(3, 6, BACKWARD);

		expect(result.id).toBe(6);
		expect(result.name).toBe(lineItem6.name);
		expect(result.sequence).toBeLessThan(originalSequence);
  	})

	it('returns the correct line item with its original sequence number if that line item cannot move forward', () => {
		let originalSequence = lineItem6.sequence;
		let result = service.moveSequenceForTechProfileLineItem(3, 6, FORWARD);

		expect(result.id).toBe(6);
		expect(result.name).toBe(lineItem6.name);
		expect(result.sequence).toBe(originalSequence);
  	})

	it('returns the correct line item with its original sequence number if that line item cannot move backward', () => {
		let originalSequence = lineItem5.sequence;
		let result = service.moveSequenceForTechProfileLineItem(3, 5, BACKWARD);
		
		expect(result.id).toBe(5);
		expect(result.name).toBe(lineItem5.name);
		expect(result.sequence).toBe(originalSequence);
  	})
  })

});
