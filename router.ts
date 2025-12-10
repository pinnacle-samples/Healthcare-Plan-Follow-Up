import { Router, Request, Response } from 'express';
import { TriggerPayload } from './lib/types';
import { agent } from './lib/agent';
import { rcsClient } from './lib/rcsClient';

const careLinkRouter = Router();

careLinkRouter.post('/', async (req: Request, res: Response) => {
  try {
    const messageEvent = await rcsClient.messages.process(req);
    if (!('message' in messageEvent)) {
      return res.status(200).json({ message: 'No message found' });
    }
    const message = messageEvent.message;
    const from = messageEvent.conversation.from;

    // only handle trigger responses
    if (
      message.type === 'RCS_BUTTON_DATA' &&
      typeof message.button.raw === 'object' &&
      message.button.raw.type == 'trigger'
    ) {
      const payload: TriggerPayload = JSON.parse(message.button.raw.payload);

      switch (payload.action) {
        case 'mainMenu':
          await agent.showMainMenu(from);
          return res.status(200).json({ message: 'Main menu sent' });

        case 'viewInsurance':
          await agent.viewInsurance(from);
          return res.status(200).json({ message: 'Insurance sent' });

        case 'viewClaims':
          await agent.viewClaims(from);
          return res.status(200).json({ message: 'Claims sent' });

        case 'claimDetails': {
          if (payload.params && 'claimId' in payload.params) {
            await agent.showClaimDetails(from, payload.params.claimId as string);
            return res.status(200).json({ message: 'Claim details sent' });
          }
          console.error('[CareLink]: Invalid trigger payload', payload);
          return res.status(400).json({
            error: 'Invalid Trigger Payload',
            received: message.button.payload ?? '',
          });
        }

        case 'showSupport':
          await agent.showSupport(from);
          return res.status(200).json({ message: 'Support sent' });

        case 'findDoctor':
          await agent.findDoctor(from);
          return res.status(200).json({ message: 'Doctor finder sent' });

        case 'deductibleStatus': {
          if (payload.params && 'plan' in payload.params) {
            await agent.showDeductibleStatus(from, payload.params.plan as string);
            return res.status(200).json({ message: 'Deductible status sent' });
          }
          console.error('[CareLink]: Invalid trigger payload', payload);
          return res.status(400).json({
            error: 'Invalid Trigger Payload',
            received: message.button.payload ?? '',
          });
        }

        case 'oopMax': {
          if (payload.params && 'plan' in payload.params) {
            await agent.showOopMax(from, payload.params.plan as string);
            return res.status(200).json({ message: 'OOP max sent' });
          }
          console.error('[CareLink]: Invalid trigger payload', payload);
          return res.status(400).json({
            error: 'Invalid Trigger Payload',
            received: message.button.payload ?? '',
          });
        }

        case 'makeAppointment': {
          const doctorName = payload.params?.doctorName;
          await agent.makeAppointment(from, doctorName as string);
          return res.status(200).json({ message: 'Appointment maker sent' });
        }

        case 'bookTime': {
          if (payload.params && 'time' in payload.params) {
            await agent.bookAppointmentTime(
              from,
              payload.params.time as string,
              payload.params.doctorName as string,
            );
            return res.status(200).json({ message: 'Appointment booked' });
          }
          console.error('[CareLink]: Invalid trigger payload', payload);
          return res.status(400).json({
            error: 'Invalid Trigger Payload',
            received: message.button.payload ?? '',
          });
        }

        case 'confirmReminder': {
          if (payload.params && 'time' in payload.params) {
            await agent.confirmReminder(
              from,
              payload.params.time as string,
              payload.params.doctorName as string,
            );
            return res.status(200).json({ message: 'Reminder confirmed' });
          }
          console.error('[CareLink]: Invalid trigger payload', payload);
          return res.status(400).json({
            error: 'Invalid Trigger Payload',
            received: message.button.payload ?? '',
          });
        }

        case 'viewHours': {
          const doctorName = payload.params?.doctorName;
          await agent.viewHours(from, doctorName as string);
          return res.status(200).json({ message: 'Hours sent' });
        }

        case 'declineReminder':
          await agent.declineReminder(from);
          return res.status(200).json({ message: 'Reminder declined' });

        default:
          console.error('[CareLink]: Invalid trigger payload', payload);
          return res.status(400).json({
            error: 'Invalid Trigger Payload',
            received: message.button.payload ?? '',
          });
      }
    }

    // Handle text messages
    if (message.type === 'RCS_TEXT') {
      const text = message.text.trim();

      if (text === 'START' || text === 'SUBSCRIBE' || text === 'MENU') {
        await agent.showMainMenu(from);
        return res.status(200).json({ message: 'Welcome sent' });
      }

      // Notify user that text messages are not processed
      await agent.sendButtonOnlyMessage(from);
      return res.status(200).json({ message: 'Text message skipped, sent notice to user.' });
    }

    return res.status(200).json({
      message: 'Nontrigger Event, skipping',
      received: message,
    });
  } catch (error) {
    console.error('[CareLink]: Internal server error', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default careLinkRouter;
