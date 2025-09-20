# Aarogya AI - Unified Healthcare AI Assistant

A comprehensive healthcare application powered by artificial intelligence, designed to provide personalized health monitoring, diagnosis assistance, and wellness guidance.

## 🏥 Features

### Core Modules

- **SkinAI** - AI-powered skin condition analysis and monitoring
- **TrustMed.AI** - Medicine verification and prescription analysis
- **HealMind.AI** - Mental wellness tracking and guidance
- **PulseNet.AI** - Community health alerts and local insights
- **SymptoCare.AI** - Symptom analysis and specialist recommendations
- **MedPlanner** - Medication scheduling and adherence tracking

### Key Features

- 🎨 **Premium UI/UX** - Modern glassmorphism design with dark theme
- 🤖 **AI Assistant** - Intelligent health companion with natural language processing
- 📊 **Health Analytics** - Comprehensive health tracking and insights
- 🔔 **Smart Notifications** - Personalized alerts and reminders
- 🔒 **Privacy First** - Secure data handling and user privacy protection
- 🌍 **Multi-language** - Support for English, Hindi, and Marathi

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Expo CLI
- React Native development environment

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd aarogya-ai
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your preferred platform:
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## 📱 App Structure

```
app/
├── (auth)/           # Authentication screens
│   ├── login.tsx
│   └── signup.tsx
├── (tabs)/           # Main app tabs
│   ├── home.tsx      # Dashboard
│   ├── health.tsx    # Health history
│   ├── alerts.tsx    # Notifications
│   ├── assistant.tsx # AI chat
│   └── profile.tsx   # User settings
├── modules/          # Health modules
│   └── [moduleId].tsx
└── _layout.tsx       # Root layout
```

## 🎨 Design System

### Colors
- **Primary**: #2EE6D6 (Teal)
- **Secondary**: #8A6CFF (Purple)
- **Accent**: #FF6B9D (Pink)
- **Background**: #0B0F14 (Dark)

### Components
- **GlassCard** - Glassmorphism card component
- **GradientButton** - Gradient action buttons
- **ModuleCard** - Health module display cards
- **QuickActionButton** - Quick action buttons

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
EXPO_PUBLIC_API_URL=your_api_url
EXPO_PUBLIC_APP_NAME=Aarogya AI
```

### App Configuration
Modify `constants/AppConfig.ts` to customize:
- Module definitions
- Mock data
- API endpoints
- App settings

## 📊 Mock Data

The app includes comprehensive mock data for development:
- User profiles and preferences
- Health records and scans
- Medication schedules
- Community alerts
- Mood and wellness data

## 🔮 Future Enhancements

### Phase 2 Features
- Real AI model integration
- Telemedicine consultations
- Family health profiles
- Advanced analytics
- Offline capabilities
- Wearable device integration

### Backend Integration
- Firebase Authentication
- Cloud Firestore database
- AI/ML model deployment
- Push notifications
- Data analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔐 Privacy & Security

- All health data is encrypted
- User privacy is prioritized
- GDPR compliant data handling
- Secure API communications
- Local data storage options

---

**Aarogya AI** - Empowering health through intelligent technology.
