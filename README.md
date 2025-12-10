# CareLink - Healthcare & Insurance Chatbot

A comprehensive healthcare and insurance management chatbot built with Pinnacle RCS messaging. CareLink helps users manage their insurance information, track claims, find doctors, and book appointments through an interactive conversational interface.

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

## Tech Stack

- **Node.js** with TypeScript
- **Express.js** for routing
- **Pinnacle RCS SDK** (rcs-js v2.0.6)
- **ESM modules** for modern JavaScript

## Project Structure

```
Care Plan Follow-Up/
├── lib/
│   ├── shared/
│   │   ├── types.ts          # TypeScript interfaces for messaging
│   │   ├── rcsClient.ts      # Pinnacle client configuration
│   │   └── baseAgent.ts      # Base agent class with common methods
│   ├── agent.ts              # CareLinkAgent implementation
│   ├── data.ts               # Mock data for demo
│   └── types.ts              # Domain-specific types
├── router.ts                 # Express router handling webhooks
├── package.json
├── tsconfig.json
├── .prettierrc
├── .gitignore
└── .env.example
```

## Prerequisites

- Node.js 18 or higher
- A Pinnacle API key (get one at [trypinnacle.app](https://trypinnacle.app))

## Setup

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
PORT=3000
TEST_MODE=false
CARELINK_LOGO_URL=https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/demos/care-plan/logo.jpg
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
   - Copy the signing secret and add it to your `.env` file as `PINNACLE_SIGNING_SECRET`. The `process()` method automatically uses this environment variable to verify the request signature.

7. Text "MENU" or "START" to the bot to see the main menu.

## Running the Application

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

## Usage

Users can interact with CareLink through RCS-enabled messaging by:

1. Sending `START`, `SUBSCRIBE`, or `MENU` to access the main menu
2. Using interactive buttons to navigate through features
3. Viewing insurance cards with policy details
4. Tracking claim status and costs
5. Finding nearby doctors and booking appointments
6. Getting support through FAQs or direct phone calls

## Message Flow

1. **Main Menu**: Entry point with quick access to all features
2. **Insurance Info**: View policies, deductibles, and out-of-pocket maximums
3. **Claims**: Browse claims and view detailed cost breakdowns
4. **Doctor Finder**: Search doctors, view profiles, and get directions
5. **Appointments**: Book time slots and set reminders
6. **Support**: Access FAQs and contact support

## Demo Data

The chatbot includes realistic demo data:

- Sample patient: Maria Rodriguez
- Multiple insurance plans (Blue Cross PPO, Aetna Supplemental)
- Recent claims with various statuses
- 3 nearby doctors with different specialties
- 10 frequently asked questions across multiple categories

## Environment Variables

| Variable                  | Description                                             | Required |
| ------------------------- | ------------------------------------------------------- | -------- |
| `PINNACLE_API_KEY`        | Your Pinnacle API key                                   | Yes      |
| `PINNACLE_AGENT_ID`       | Your RCS agent ID                                       | Yes      |
| `PINNACLE_SIGNING_SECRET` | Your webhook signing secret from the Pinnacle dashboard | Yes      |
| `PORT`                    | Server port (default: 3000)                             | No       |
| `TEST_MODE`               | Enable test mode (true/false)                           | No       |
| `CARELINK_LOGO_URL`       | URL for CareLink logo image                             | No       |

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

## License

MIT

## Support

For questions or support, please refer to the [Pinnacle documentation](https://docs.trypinnacle.app/) or contact your Pinnacle account manager.
