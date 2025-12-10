import { Pinnacle } from 'rcs-js';
import { BaseAgent } from './baseAgent';
import { defaultPatient, defaultClaims, faqs, doctorLocations } from './data';

export class CareLinkAgent extends BaseAgent {
  // Welcome / Main Menu
  async showMainMenu(to: string) {
    return await this.client.messages.rcs.send({
      from: this.agentId,
      to: to,
      cards: [
        {
          title: 'CareLink',
          subtitle: 'Your health coverage companion—anytime, anywhere.',
          media: process.env.CARELINK_LOGO_URL || '',
          buttons: [],
        },
      ],
      quickReplies: [
        {
          type: 'trigger',
          title: '🔚 End Demo',
          payload: 'END_DEMO',
        },
        {
          type: 'trigger',
          title: '💳 Insurance Info',
          payload: JSON.stringify({ action: 'viewInsurance' }),
        },
        {
          type: 'trigger',
          title: '📋 View Claims',
          payload: JSON.stringify({ action: 'viewClaims' }),
        },
        {
          type: 'trigger',
          title: '❓ Customer Support',
          payload: JSON.stringify({ action: 'showSupport' }),
        },
        {
          type: 'trigger',
          title: '📍 Find a Doctor',
          payload: JSON.stringify({ action: 'findDoctor' }),
        },
      ],
      options: { test_mode: this.TEST_MODE },
    });
  }

  // View Insurance Information
  async viewInsurance(to: string) {
    return await this.client.messages.rcs.send({
      from: this.agentId,
      to: to,
      cards: [
        {
          title: '🏢 Blue Cross PPO (Primary)',
          subtitle: `Policy: ${defaultPatient.insuranceInfo.policyNumber}\nGroup: ${defaultPatient.insuranceInfo.groupNumber}`,
          media:
            'https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/demos/care-plan/blue-cross-blue-shield-logo.png',
          buttons: [
            {
              type: 'trigger',
              title: '💰 Deductible Status',
              payload: JSON.stringify({
                action: 'deductibleStatus',
                params: { plan: 'primary' },
              }),
            },
            {
              type: 'trigger',
              title: '🏥 Check OOP Max',
              payload: JSON.stringify({
                action: 'oopMax',
                params: { plan: 'primary' },
              }),
            },
          ],
        },
        {
          title: '🏥 Aetna Supplemental (Secondary)',
          subtitle: 'Policy: AET987654321\nGroup: GRP54321',
          media:
            'https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/demos/care-plan/aetna-logo.jpg',
          buttons: [
            {
              type: 'trigger',
              title: '💰 Deductible Status',
              payload: JSON.stringify({
                action: 'deductibleStatus',
                params: { plan: 'secondary' },
              }),
            },
            {
              type: 'trigger',
              title: '🏥 Check OOP Max',
              payload: JSON.stringify({
                action: 'oopMax',
                params: { plan: 'secondary' },
              }),
            },
          ],
        },
      ],
      quickReplies: [
        {
          type: 'trigger',
          title: '📋 View Claims',
          payload: JSON.stringify({ action: 'viewClaims' }),
        },
        {
          type: 'trigger',
          title: '🏠 Main Menu',
          payload: JSON.stringify({ action: 'mainMenu' }),
        },
      ],
    });
  }

  // Deductible Status
  async showDeductibleStatus(to: string, plan: string) {
    const ins = defaultPatient.insuranceInfo;
    const deductiblePercent = Math.round(
      ((ins.deductible.total - ins.deductible.remaining) / ins.deductible.total) * 100,
    );

    const planName =
      plan === 'primary' ? 'Blue Cross PPO (Primary)' : 'Aetna Supplemental (Secondary)';
    const deductible = plan === 'primary' ? ins.deductible : { total: 1000, remaining: 800 };
    const percent =
      plan === 'primary'
        ? deductiblePercent
        : Math.round(((deductible.total - deductible.remaining) / deductible.total) * 100);

    return await this.client.messages.rcs.send({
      from: this.agentId,
      to: to,
      text:
        `Deductible Status - ${planName}\n\n` +
        `Your deductible is the amount you pay before your insurance starts covering costs.\n\n` +
        `Total Deductible: $${deductible.total.toLocaleString()}\n` +
        `Amount Met: $${(deductible.total - deductible.remaining).toLocaleString()}\n` +
        `Remaining: $${deductible.remaining.toLocaleString()}\n\n` +
        `Progress: ${percent}% met`,
      quickReplies: [
        {
          type: 'trigger',
          title: '💳 Insurance Info',
          payload: JSON.stringify({ action: 'viewInsurance' }),
        },
        {
          type: 'trigger',
          title: '🏠 Main Menu',
          payload: JSON.stringify({ action: 'mainMenu' }),
        },
      ],
    });
  }

  // Out-of-Pocket Max
  async showOopMax(to: string, plan: string) {
    const ins = defaultPatient.insuranceInfo;
    const oopPercent = Math.round(
      ((ins.outOfPocketMax.total - ins.outOfPocketMax.remaining) / ins.outOfPocketMax.total) * 100,
    );

    const planName =
      plan === 'primary' ? 'Blue Cross PPO (Primary)' : 'Aetna Supplemental (Secondary)';
    const oop = plan === 'primary' ? ins.outOfPocketMax : { total: 3000, remaining: 2500 };
    const percent =
      plan === 'primary' ? oopPercent : Math.round(((oop.total - oop.remaining) / oop.total) * 100);

    return await this.client.messages.rcs.send({
      from: this.agentId,
      to: to,
      text:
        `Out-of-Pocket Maximum - ${planName}\n\n` +
        `Your out-of-pocket max is the most you'll pay for covered services in a year. After you reach this amount, your insurance pays 100%.\n\n` +
        `Total OOP Max: $${oop.total.toLocaleString()}\n` +
        `Amount Spent: $${(oop.total - oop.remaining).toLocaleString()}\n` +
        `Remaining: $${oop.remaining.toLocaleString()}\n\n` +
        `Progress: ${percent}% met`,
      quickReplies: [
        {
          type: 'trigger',
          title: '💳 Insurance Info',
          payload: JSON.stringify({ action: 'viewInsurance' }),
        },
        {
          type: 'trigger',
          title: '🏠 Main Menu',
          payload: JSON.stringify({ action: 'mainMenu' }),
        },
      ],
    });
  }

  // View Claims
  async viewClaims(to: string) {
    const claimImages: Record<string, string> = {
      'Annual Physical Exam':
        'https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/demos/care-plan/physical-exam.jpg',
      'Blood Work Panel':
        'https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/demos/care-plan/blood-test-results.jpeg',
      'Specialist Consultation':
        'https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/demos/care-plan/internal-medicine.jpg',
    };

    const claimCards: Pinnacle.RcsCards.Cards.Item[] = defaultClaims.map((claim) => ({
      title: `${claim.service}`,
      subtitle: `${claim.date} • ${claim.status}`,
      description: `${claim.provider}\nTotal: $${claim.amount} | Covered: $${claim.covered} | Your cost: $${claim.yourResponsibility}`,
      media: claimImages[claim.service] || '',
      buttons: [
        {
          type: 'trigger' as const,
          title: '📋 View Details',
          payload: JSON.stringify({
            action: 'claimDetails',
            params: { claimId: claim.id },
          }),
        },
      ],
    }));

    return await this.client.messages.rcs.send({
      from: this.agentId,
      to: to,
      cards: claimCards,
      quickReplies: [
        {
          type: 'call',
          title: '📝 Report Claim',
          payload: '+18005551234',
        },
        {
          type: 'trigger',
          title: '🏠 Main Menu',
          payload: JSON.stringify({ action: 'mainMenu' }),
        },
      ],
      options: { test_mode: this.TEST_MODE },
    });
  }

  // Show Claim Details
  async showClaimDetails(to: string, claimId: string) {
    const claim = defaultClaims.find((c) => c.id === claimId)!;

    const statusEmoji =
      claim.status === 'Approved'
        ? '✅'
        : claim.status === 'Denied'
          ? '❌'
          : claim.status === 'Processing'
            ? '⏳'
            : '📄';

    return await this.client.messages.rcs.send({
      from: this.agentId,
      to: to,
      text:
        `Claim Details\n\n` +
        `Claim ID: ${claim.id}\n` +
        `Date: ${claim.date}\n` +
        `Status: ${claim.status} ${statusEmoji}\n\n` +
        `Provider: ${claim.provider}\n` +
        `Service: ${claim.service}\n\n` +
        `Costs:\n` +
        `Total Billed: $${claim.amount}\n` +
        `Insurance Covered: $${claim.covered}\n` +
        `Your Responsibility: $${claim.yourResponsibility}`,
      quickReplies: [
        {
          type: 'call',
          title: '📝 Report Claim',
          payload: '+18005551234',
        },
        {
          type: 'trigger',
          title: '📋 All Claims',
          payload: JSON.stringify({ action: 'viewClaims' }),
        },
        {
          type: 'trigger',
          title: '🏠 Main Menu',
          payload: JSON.stringify({ action: 'mainMenu' }),
        },
      ],
      options: { test_mode: this.TEST_MODE },
    });
  }

  // Show Customer Support (FAQs)
  async showSupport(to: string) {
    const topFaqs = faqs.slice(0, 10);

    const faqCards: Pinnacle.RcsCards.Cards.Item[] = topFaqs.map((faq) => ({
      title: faq.question,
      subtitle: faq.answer,
      buttons: [],
    }));

    return await this.client.messages.rcs.send({
      from: this.agentId,
      to: to,
      cards: faqCards,
      quickReplies: [
        {
          type: 'call',
          title: '📞 Contact Support',
          payload: '+18005551234',
        },
        {
          type: 'trigger',
          title: '💳 Insurance Info',
          payload: JSON.stringify({ action: 'viewInsurance' }),
        },
        {
          type: 'trigger',
          title: '📋 View Claims',
          payload: JSON.stringify({ action: 'viewClaims' }),
        },
        {
          type: 'trigger',
          title: '📍 Find a Doctor',
          payload: JSON.stringify({ action: 'findDoctor' }),
        },
      ],
      options: { test_mode: this.TEST_MODE },
    });
  }

  // Find Doctor by Location
  async findDoctor(to: string) {
    const doctorCards: Pinnacle.RcsCards.Cards.Item[] = doctorLocations.map((doctor) => ({
      title: doctor.name,
      subtitle: `${doctor.specialty} • ${doctor.distance} mi away\n${doctor.address}, ${doctor.city}, ${doctor.state}\n⭐ ${doctor.rating}/5 • Accepts your insurance`,
      media: doctor.media,
      buttons: [
        {
          type: 'trigger',
          title: '🗓️ Book Appointment',
          payload: JSON.stringify({
            action: 'makeAppointment',
            params: { doctorName: doctor.name },
          }),
        },
        {
          type: 'trigger',
          title: '🕐 View Hours',
          payload: JSON.stringify({
            action: 'viewHours',
            params: { doctorName: doctor.name },
          }),
        },
        {
          type: 'call',
          title: '📞 Call Front Desk',
          payload: doctor.phone,
        },
        {
          type: 'sendLocation',
          title: '🗺️ Get Directions',
          latLong: {
            lat: doctor.lat,
            lng: doctor.lng,
            label: doctor.name,
          },
        },
      ],
    }));

    return await this.client.messages.rcs.send({
      from: this.agentId,
      to: to,
      cards: doctorCards,
      quickReplies: [
        {
          type: 'trigger',
          title: '🏠 Main Menu',
          payload: JSON.stringify({ action: 'mainMenu' }),
        },
      ],
      options: { test_mode: this.TEST_MODE },
    });
  }

  // Make Appointment
  async makeAppointment(to: string, doctorName: string = 'Dr. Michael Chen') {
    return await this.client.messages.rcs.send({
      from: this.agentId,
      to: to,
      text: `🗓️ Here is ${doctorName}'s availability.`,
      quickReplies: [
        {
          type: 'call',
          title: '📞 Call Us',
          payload: '+18005551234',
        },
        {
          type: 'trigger',
          title: '🕘 9:00 AM',
          payload: JSON.stringify({
            action: 'bookTime',
            params: { time: '9:00 AM', doctorName },
          }),
        },
        {
          type: 'trigger',
          title: '🕜 1:30 PM',
          payload: JSON.stringify({
            action: 'bookTime',
            params: { time: '1:30 PM', doctorName },
          }),
        },
        {
          type: 'trigger',
          title: '🕔 5:00 PM',
          payload: JSON.stringify({
            action: 'bookTime',
            params: { time: '5:00 PM', doctorName },
          }),
        },
        {
          type: 'trigger',
          title: '🏠 Main Menu',
          payload: JSON.stringify({ action: 'mainMenu' }),
        },
      ],
      options: { test_mode: this.TEST_MODE },
    });
  }

  // Book Appointment Time
  async bookAppointmentTime(to: string, time: string, doctorName: string = 'your doctor') {
    return await this.client.messages.rcs.send({
      from: this.agentId,
      to: to,
      text: `Appointment Confirmed ✅\n\nYour appointment with ${doctorName} has been booked for tomorrow at ${time}.\n\nYour doctor will receive your insurance information automatically.\n\nWould you like a reminder 1 hour before your appointment?`,
      quickReplies: [
        {
          type: 'trigger',
          title: '✅ Yes, Remind Me',
          payload: JSON.stringify({
            action: 'confirmReminder',
            params: { time, doctorName },
          }),
        },
        {
          type: 'trigger',
          title: '❌ No Thanks',
          payload: JSON.stringify({ action: 'declineReminder' }),
        },
        {
          type: 'trigger',
          title: '🏠 Main Menu',
          payload: JSON.stringify({ action: 'mainMenu' }),
        },
      ],
      options: { test_mode: this.TEST_MODE },
    });
  }

  // Confirm Reminder
  async confirmReminder(to: string, time: string, doctorName: string = 'your doctor') {
    return await this.client.messages.rcs.send({
      from: this.agentId,
      to: to,
      text: `Reminder Set 🔔\n\nYou'll receive a reminder 1 hour before your ${time} appointment with ${doctorName} tomorrow.\n\nSee you then!`,
      quickReplies: [
        {
          type: 'trigger',
          title: '🏠 Main Menu',
          payload: JSON.stringify({ action: 'mainMenu' }),
        },
      ],
      options: { test_mode: this.TEST_MODE },
    });
  }

  // Decline Reminder
  async declineReminder(to: string) {
    return await this.client.messages.rcs.send({
      from: this.agentId,
      to: to,
      text: `Got it! No reminder will be sent.`,
      quickReplies: [
        {
          type: 'trigger',
          title: '🏠 Main Menu',
          payload: JSON.stringify({ action: 'mainMenu' }),
        },
      ],
      options: { test_mode: this.TEST_MODE },
    });
  }

  // View Hours
  async viewHours(to: string, doctorName?: string) {
    let hoursText: string;

    if (doctorName) {
      const doctor = doctorLocations.find((d) => d.name === doctorName);
      if (doctor) {
        hoursText = `${doctor.name}\n${doctor.address}, ${doctor.city}\nMonday - Friday, 9:00 AM - 5:00 PM`;
      } else {
        hoursText = 'Doctor not found';
      }
    } else {
      hoursText = doctorLocations
        .map(
          (doctor) =>
            `${doctor.name}\n${doctor.address}, ${doctor.city}\nMonday - Friday, 9:00 AM - 5:00 PM`,
        )
        .join('\n\n');
    }

    return await this.client.messages.rcs.send({
      from: this.agentId,
      to: to,
      text: `🕘 Office Hours\n\n${hoursText}\n\nClosed on weekends and holidays.`,
      quickReplies: [
        {
          type: 'trigger',
          title: '📍 Find a Doctor',
          payload: JSON.stringify({ action: 'findDoctor' }),
        },
        {
          type: 'trigger',
          title: '🏠 Main Menu',
          payload: JSON.stringify({ action: 'mainMenu' }),
        },
      ],
      options: { test_mode: this.TEST_MODE },
    });
  }
}

export const agent = new CareLinkAgent();
