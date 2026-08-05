import express from 'express';
import path from 'path';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client server-side
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// API Route: Generate Custom Itinerary with AI
app.post('/api/gemini/generate-itinerary', async (req, res) => {
  try {
    const { destination, durationDays, travelerType, budget, interests, specialRequests } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(200).json({
        success: false,
        fallback: true,
        message: 'Gemini API key not configured, returning curated template.',
      });
    }

    const prompt = `You are a world-class luxury concierge for "Journeyvers", specializing in bespoke travel experiences in India (specifically Hyderabad, Delhi, and Mumbai).
Generate a high-end, day-by-day luxury itinerary for a trip to ${destination || 'Hyderabad'} for ${durationDays || 3} days.
Traveler type: ${travelerType || 'Couples Luxury'}.
Budget level: ${budget || 'Ultra Royal'}.
Interests: ${Array.isArray(interests) ? interests.join(', ') : interests || 'Heritage, Fine Dining, Exclusive Access'}.
Special requests: ${specialRequests || 'None'}.

Return a structured JSON object ONLY with the following schema:
{
  "title": "String (e.g. 'Royal Nizam Heritage & Falaknuma Splendor')",
  "tagline": "String short catchy luxury description",
  "estimatedCostINR": number (e.g. 145000),
  "includedLuxuryServices": ["String", "String"],
  "days": [
    {
      "dayNumber": number,
      "theme": "String (e.g. 'Arrival in Nizam Regal Glory & High Tea')",
      "schedule": [
        {
          "time": "String (e.g. '09:00 AM')",
          "activity": "String (Name of spot or experience)",
          "location": "String",
          "description": "String (2-3 sentences of rich descriptive detail)",
          "category": "String (Heritage | Fine Dining | Stay | Wellness | Shopping | Private Access)",
          "insiderTip": "String"
        }
      ]
    }
  ],
  "conciergeNotes": "String (2 sentences from the personal butler/concierge)"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-pro-preview',
      contents: prompt,
      config: {
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.HIGH,
        },
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    const parsedData = JSON.parse(text);

    return res.json({
      success: true,
      itinerary: parsedData,
    });
  } catch (error: any) {
    console.error('Error generating AI itinerary:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate itinerary with AI',
    });
  }
});

// API Route: AI Concierge Assistant Chat
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { messages, currentDestination, bookingDetails } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.status(200).json({
        success: false,
        reply: "Greetings from Journeyvers Concierge. I am operating in offline advisory mode. For urgent bookings, our 24/7 Royal Line is available in your itinerary dashboard.",
      });
    }

    const systemInstruction = `You are the chief concierge at Journeyvers. 
You provide elegant, articulate, highly knowledgeable travel recommendations and assistance for clients visiting Hyderabad, Delhi, and Mumbai.
Keep your tone polite, refined, warm, and deeply knowledgeable about luxury hotels (e.g. Taj Falaknuma Palace, The Imperial New Delhi, The Taj Mahal Palace Mumbai), fine dining, heritage secrets, dress codes, weather, and private chauffeur logistics.
Current active destination: ${currentDestination || 'India Luxury Capitals'}.
User booking details: ${JSON.stringify(bookingDetails || {})}.`;

    const lastMessage = messages[messages.length - 1]?.content || 'Hello';

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: lastMessage,
      config: {
        systemInstruction,
      },
    });

    return res.json({
      success: true,
      reply: response.text || 'How may I assist your luxury journey today?',
    });
  } catch (error: any) {
    console.error('Error in concierge chat:', error);
    return res.status(500).json({
      success: false,
      reply: 'Apologies, our concierge system experienced a brief connection delay. Please re-send your query.',
    });
  }
});

// API Route: Simulate Payment Processing
app.post('/api/payment/process', async (req, res) => {
  const { amount, currency, paymentMethod, packageId, customerName, email } = req.body;

  // Simulate network processing delay for realism
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const transactionId = 'LXV-' + Math.floor(10000000 + Math.random() * 90000000);
  const confirmationCode = 'JNV-' + Math.random().toString(36).substring(2, 8).toUpperCase();

  return res.json({
    success: true,
    transactionId,
    confirmationCode,
    amount,
    currency: currency || 'INR',
    timestamp: new Date().toISOString(),
    status: 'CONFIRMED',
    message: 'Payment authorized successfully. Your luxury booking is confirmed.',
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Journeyvers Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
