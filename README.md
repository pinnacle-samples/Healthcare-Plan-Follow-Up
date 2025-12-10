# CareLink - Healthcare & Insurance Chatbot

A comprehensive healthcare and insurance management RCS chatbot built with Pinnacle. CareLink helps users manage their insurance information, track claims, find doctors, and book appointments through Rich Communication Services (RCS) messaging.
https://github.com/user-attachments/assets/1c3cd1de-9538-42c6-8673-82122ec3f18b

## Features

### Insurance Management

- View detailed insurance policy information
- Check deductible status with visual progress tracking
- Monitor out-of-pocket maximum spending
- Support for multiple insurance plans (Primary and Secondary)

### Claims Tracking

- View all submitted claims with status updates
- Detailed claim information including costs breakdown
- Filter claims by status (Approved, Denied, Processing, Pending)
- Direct access to claim support hotline

### Doctor Finder

- Search for nearby in-network doctors by specialty
- View doctor ratings and availability
- Get directions to doctor's office
- Call doctor's office directly from chat
- Check office hours

### Appointment Booking

- Book appointments with available time slots
- Set reminders for upcoming appointments
- Confirm or reschedule appointments
- Receive appointment confirmations

### Customer Support

- Access frequently asked questions (FAQs)
- Direct phone support integration
- Category-based support (prescriptions, coverage, providers, appointments, claims, records)

## Project Structure

```
Care-Plan-Follow-Up/
├── lib/
│   ├── types.ts              # Shared TypeScript interfaces
│   ├── rcsClient.ts          # Pinnacle RCS client configuration
│   ├── baseAgent.ts          # Base agent class with common functionality
│   ├── agent.ts              # CareLink agent implementation
│   └── data.ts               # Mock healthcare data
├── server.ts                 # Main Express server
├── router.ts                 # Express router for webhook handling
├── package.json              # Project dependencies
├── tsconfig.json             # TypeScript configuration
├── .env.example              # Environment variables template
└── .gitignore                # Git ignore rules
```

## Setup

### Prerequisites

- Node.js 18+
- A Pinnacle API account
- RCS agent configured in Pinnacle

### Installation

1. Clone the repository

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:

   ```bash
   cp .env.example .env
   ```

4. Configure your environment variables in `.env`:

```env
PINNACLE_API_KEY=your_api_key_here
PINNACLE_AGENT_ID=your_agent_id_here
PINNACLE_SIGNING_SECRET=your_signing_secret_here
TEST_MODE=false
PORT=3000
CARELINK_LOGO_URL=https://example.com/logo.jpg
```

5. Set up a public HTTPS URL for your webhook. For local development, you can use a tunneling service like [ngrok](https://ngrok.com):

   ```bash
   ngrok http 3000
   ```

   For production, deploy to your preferred hosting provider.

6. Connect your webhook to your RCS agent:
   - Go to the [Pinnacle Webhooks Dashboard](https://app.pinnacle.sh/dashboard/development/webhooks)
   - Add your public URL with the `/webhook` path (e.g., `https://your-domain.com/webhook`)
   - Select your RCS agent to receive messages at this endpoint
   - Copy the signing secret and add it to your `.env` file as `PINNACLE_SIGNING_SECRET`. The `process()` method uses this environment variable to verify the request signature.

7. Text "MENU" or "START" to the bot to see the main menu.

### Running the Application

Development mode with auto-reload:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

## Configuration

### Environment Variables

| Variable                  | Description                                                            | Required            |
| ------------------------- | ---------------------------------------------------------------------- | ------------------- |
| `PINNACLE_API_KEY`        | Your Pinnacle API key                                                  | Yes                 |
| `PINNACLE_AGENT_ID`       | Your RCS agent ID from Pinnacle Dashboard                              | Yes                 |
| `PINNACLE_SIGNING_SECRET` | Webhook signing secret for verification                                | Yes                 |
| `TEST_MODE`               | Set to `true` for sending with a test RCS agent to whitelisted numbers | No (default: false) |
| `PORT`                    | Server port                                                            | No (default: 3000)  |
| `CARELINK_LOGO_URL`       | URL for CareLink logo image                                            | No                  |

## Supported Actions

| Action              | Description                     |
| ------------------- | ------------------------------- |
| `showMainMenu`      | Display main menu               |
| `viewInsurance`     | View insurance policy details   |
| `viewDeductible`    | Check deductible status         |
| `viewClaims`        | View submitted claims           |
| `viewClaimDetails`  | View detailed claim information |
| `findDoctors`       | Search for nearby doctors       |
| `viewDoctorProfile` | View doctor details             |
| `bookAppointment`   | Book an appointment             |
| `viewFAQs`          | View frequently asked questions |
| `contactSupport`    | Access customer support         |

## Demo Data

The chatbot includes realistic demo data:

- Sample patient: Maria Rodriguez
- Multiple insurance plans (Blue Cross PPO, Aetna Supplemental)
- Recent claims with various statuses
- 3 nearby doctors with different specialties
- 10 frequently asked questions across multiple categories

## Development

### Code Formatting

```bash
npm run format
```

### Linting

```bash
npm run lint
```

### Build TypeScript

```bash
npm run build
```

## Technologies

- **TypeScript**: Type-safe development
- **Express**: Web framework for webhook handling
- **rcs-js**: Pinnacle RCS SDK v2.0.6+
- **tsx**: TypeScript execution and hot-reload

## Support

For issues related to:

- RCS functionality: Contact Pinnacle support
- Chatbot implementation: Refer to the code documentation
- Configuration: Check the `.env.example` file

## Resources

- **Dashboard**: Visit [Pinnacle Dashboard](https://app.pinnacle.sh)
- **Documentation**: Visit [Pinnacle Documentation](https://docs.pinnacle.sh)
- **Support**: Email [founders@trypinnacle.app](mailto:founders@trypinnacle.app)
