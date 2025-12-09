// Mock data for CareLink demo
import { Patient, Claim, FAQ, DoctorLocation } from './types';

// Universal patient data for demo (same for all users)
export const defaultPatient: Patient = {
  firstName: 'Maria',
  lastName: 'Rodriguez',
  insuranceInfo: {
    provider: 'BlueCross BlueShield',
    policyNumber: 'BCBS123456789',
    groupNumber: 'GRP98765',
    planType: 'PPO Premium',
    coverage: 'Individual + Family',
    deductible: {
      total: 2000,
      remaining: 450,
    },
    outOfPocketMax: {
      total: 5000,
      remaining: 2100,
    },
  },
};

// Universal claims data for demo (same for all users)
export const defaultClaims: Claim[] = [
  {
    id: 'CLM-2025-001',
    date: 'Oct 5, 2025',
    provider: 'City Medical Center',
    service: 'Annual Physical Exam',
    status: 'Approved',
    amount: 350,
    covered: 280,
    yourResponsibility: 70,
  },
  {
    id: 'CLM-2025-002',
    date: 'Sep 22, 2025',
    provider: 'LabCorp',
    service: 'Blood Work Panel',
    status: 'Approved',
    amount: 225,
    covered: 225,
    yourResponsibility: 0,
  },
  {
    id: 'CLM-2025-003',
    date: 'Sep 15, 2025',
    provider: 'Dr. Sarah Johnson',
    service: 'Specialist Consultation',
    status: 'Processing',
    amount: 450,
    covered: 360,
    yourResponsibility: 90,
  },
];

// Frequently Asked Questions
export const faqs: FAQ[] = [
  {
    id: 'faq-1',
    question: 'How do I request a prescription refill?',
    answer:
      "You can request a prescription refill through your patient portal, by calling your pharmacy directly, or by contacting your doctor's office. Most prescriptions can be refilled 3-5 days before they run out.",
    category: 'prescriptions',
  },
  {
    id: 'faq-2',
    question: "What's covered under preventive care?",
    answer:
      'Preventive care includes annual physical exams, immunizations, cancer screenings, well-child visits, and certain lab tests. These are typically covered at 100% under most insurance plans with no copay.',
    category: 'coverage',
  },
  {
    id: 'faq-3',
    question: 'How do I find an in-network provider?',
    answer:
      "Use our 'Find a Doctor' feature to search by location, specialty, and insurance network. You can also call the number on your insurance card for assistance.",
    category: 'providers',
  },
  {
    id: 'faq-4',
    question: 'What should I bring to my appointment?',
    answer:
      'Please bring your insurance card, photo ID, list of current medications, and any relevant medical records. Arrive 15 minutes early to complete any necessary paperwork.',
    category: 'appointments',
  },
  {
    id: 'faq-5',
    question: 'How do I appeal a denied claim?',
    answer:
      "Contact our support team or your insurance provider within 180 days of the denial. We'll help you gather necessary documentation and submit the appeal on your behalf.",
    category: 'claims',
  },
  {
    id: 'faq-6',
    question: 'Can I get my medical records?',
    answer:
      'Yes, you can request your medical records through your patient portal or by submitting a written request to your healthcare provider. Most records are available within 30 days.',
    category: 'records',
  },
  {
    id: 'faq-7',
    question: 'What is a copay vs coinsurance?',
    answer:
      'A copay is a fixed amount you pay for a service (like $25 for a doctor visit). Coinsurance is a percentage of the cost you pay after meeting your deductible (like 20% of the bill).',
    category: 'coverage',
  },
  {
    id: 'faq-8',
    question: 'How do I change my primary care doctor?',
    answer:
      'You can change your primary care doctor through your online account or by calling customer service at 1-800-555-1234. Changes typically take effect within 1-2 business days.',
    category: 'providers',
  },
  {
    id: 'faq-9',
    question: 'Do I need a referral to see a specialist?',
    answer:
      "It depends on your plan type. PPO plans typically don't require referrals, while HMO plans do. Check your insurance card or contact us to confirm your plan requirements.",
    category: 'appointments',
  },
  {
    id: 'faq-10',
    question: 'How long does claim processing take?',
    answer:
      "Most claims are processed within 5-7 business days. Complex claims may take up to 30 days. You'll receive a notification once your claim has been processed.",
    category: 'claims',
  },
];

// Doctor locations (sorted by distance)
export const doctorLocations: DoctorLocation[] = [
  {
    name: 'Dr. Michael Chen',
    specialty: 'Family Medicine',
    address: '450 Sutter Street, Suite 1200',
    city: 'San Francisco',
    state: 'CA',
    zip: '94108',
    phone: '+14155550100',
    distance: 0.8,
    acceptingNewPatients: true,
    rating: 4.8,
    lat: 37.7886,
    lng: -122.4098,
    media: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80',
  },
  {
    name: 'Dr. Sarah Johnson',
    specialty: 'Internal Medicine',
    address: '2100 Webster Street',
    city: 'San Francisco',
    state: 'CA',
    zip: '94115',
    phone: '+14155550200',
    distance: 1.2,
    acceptingNewPatients: true,
    rating: 4.9,
    lat: 37.7917,
    lng: -122.4329,
    media: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80',
  },
  {
    name: 'Dr. James Wilson',
    specialty: 'Cardiology',
    address: '3700 California Street',
    city: 'San Francisco',
    state: 'CA',
    zip: '94118',
    phone: '+14155550300',
    distance: 2.1,
    acceptingNewPatients: false,
    rating: 4.7,
    lat: 37.7858,
    lng: -122.4545,
    media:
      'https://t4.ftcdn.net/jpg/01/36/18/77/360_F_136187711_qeBMOwkPdTg1dCN8e5TR1AmduXDz60Xn.jpg',
  },
];

// Agent info
export const agentInfo = {
  name: 'CareLink',
  emoji: '🩺',
  description: 'Your Healthcare Assistant',
  supportPhone: '+18005551234',
};
