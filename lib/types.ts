// Type definitions for CareLink agent

import { Request } from 'express';
import { Pinnacle } from 'rcs-js';

export interface TriggerPayload {
  action: string;
  params?: Record<string, unknown>;
}

export interface RequestWithMessageEvent extends Request {
  messageEvent: Pinnacle.MessageEvent;
}

export interface Patient {
  firstName: string;
  lastName: string;
  insuranceInfo: InsuranceInfo;
}

export interface InsuranceInfo {
  provider: string;
  policyNumber: string;
  groupNumber: string;
  planType: string;
  coverage: string;
  deductible: {
    total: number;
    remaining: number;
  };
  outOfPocketMax: {
    total: number;
    remaining: number;
  };
}

export interface Claim {
  id: string;
  date: string;
  provider: string;
  service: string;
  status: 'Pending' | 'Approved' | 'Denied' | 'Processing';
  amount: number;
  covered: number;
  yourResponsibility: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface DoctorLocation {
  name: string;
  specialty: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  distance: number; // in miles
  acceptingNewPatients: boolean;
  rating: number;
  lat: number;
  lng: number;
  media: string;
}
