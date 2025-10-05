# LLM Comparator

![LLM Comparator](/codeguide-backdrop.svg)

A powerful web application for comparing outputs from multiple large language models (LLMs) side by side. Perfect for prompt engineers, researchers, and developers who need to evaluate different AI models' performance on the same prompt.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css)
![Shadcn/UI](https://img.shields.io/badge/shadcn/ui-1.0-black)

## About The Project

LLM Comparator solves the common pain point of manually querying different AI models in separate interfaces and struggling to compare their outputs effectively. Whether you're testing prompt variations, evaluating model performance, or making decisions about which LLM to use for your specific use case, our tool centralizes the entire comparison process.

With LLM Comparator, you can:
- Run the same prompt across multiple LLMs simultaneously
- View responses in an intuitive side-by-side layout
- Access automated quality metrics for each output
- Save and export comparison results for documentation and sharing
- Make informed model-selection decisions in under five minutes

## Key Features

- 🔐 **Secure Authentication** - User registration with JWT-based sessions
- 🔑 **API Key Management** - Securely store and manage LLM provider API keys
- ⚡ **Parallel Processing** - Simultaneous API calls to multiple LLM providers
- 📊 **Side-by-Side Comparison** - Clean, three-column layout for easy comparison
- 📈 **Automated Scoring** - Built-in metrics including coherence, relevance, and readability
- 💾 **History & Dashboard** - Track and review all past comparisons
- 📄 **Export Functionality** - Generate PDF or CSV reports for sharing
- 🎨 **Responsive Design** - Mobile-friendly interface that works on all devices
- 🌙 **Dark Mode Support** - Comfortable viewing in any lighting condition

## Built With

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first styling
- **[Shadcn/UI](https://ui.shadcn.com/)** - High-quality component library
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library

### Backend & Database
- **[Node.js](https://nodejs.org/)** - JavaScript runtime
- **[Supabase](https://supabase.com/)** - Backend as a Service (PostgreSQL + Auth)
- **[Clerk](https://clerk.com/)** - Authentication & user management

### AI Integrations
- **[OpenAI SDK](https://platform.openai.com/)** - GPT model integration
- **[Anthropic Claude API](https://console.anthropic.com/)** - Claude model integration
- **[Vercel AI SDK](https://sdk.vercel.ai/)** - Unified AI interface

## Getting Started

### Prerequisites

Before you begin, ensure you have the following:
- Node.js 18+ installed
- Git for version control
- API keys from LLM providers (optional for testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/llm-comparator.git
   cd llm-comparator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Variables Setup**
   - Copy the `.env.example` file to `.env.local`:
     ```bash
     cp .env.example .env.local
     ```
   - Fill in the environment variables in `.env.local` (see Configuration section below)

4. **Set up the database**
   ```bash
   # Run Supabase migrations
   supabase db push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)** with your browser to see the application.

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# AI Integration (Optional - users can add their own keys)
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
```

### LLM Provider Setup

1. **OpenAI Setup**
   - Go to [OpenAI Platform](https://platform.openai.com/)
   - Create an API key
   - Add to your environment variables or let users add their own in the app

2. **Anthropic Claude Setup**
   - Go to [Anthropic Console](https://console.anthropic.com/)
   - Create an API key
   - Add to your environment variables or let users add their own in the app

## Usage

### Basic Comparison

1. **Sign up or log in** to your account
2. **Navigate to the Dashboard** and click "New Comparison"
3. **Enter your prompt** in the text area
4. **Select the models** you want to compare (e.g., GPT-4, Claude-3, etc.)
5. **Click "Run Comparison"** to execute the prompt across selected models
6. **View results** side-by-side with automated metrics
7. **Rate outputs** and save the comparison for future reference

### Managing API Keys

1. Go to **Settings** → **API Keys**
2. **Add your API keys** for each LLM provider
3. **Test connections** to ensure keys are valid
4. Your keys are **encrypted and stored securely**

### Exporting Results

1. **Complete a comparison** and review the results
2. **Click "Export"** and choose your preferred format:
   - **PDF** - Professional report with full comparison details
   - **CSV** - Data format for analysis in spreadsheets
3. **Share** the exported file with your team or stakeholders

## Project Structure

```
llm-comparator/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── api/                # API routes for LLM calls
│   │   ├── globals.css         # Global styles with dark mode
│   │   ├── layout.tsx          # Root layout with providers
│   │   └── page.tsx            # Landing page with hero and features
│   ├── components/             # React components
│   │   ├── landing/            # Landing page components
│   │   │   ├── HeroSection.tsx # Hero section for landing page
│   │   │   └── FeaturesSection.tsx # Features showcase
│   │   ├── ui/                 # Shadcn/UI components (40+)
│   │   ├── chat.tsx            # AI chat interface
│   │   ├── theme-provider.tsx  # Theme context
│   │   └── theme-toggle.tsx    # Dark mode toggle
│   ├── lib/                    # Utility functions
│   │   ├── supabase.ts         # Supabase client with auth
│   │   ├── user.ts             # User utilities
│   │   ├── utils.ts            # General utilities
│   │   └── env-check.ts        # Environment validation
│   └── middleware.ts           # Route protection
├── supabase/
│   └── migrations/             # Database migrations with RLS
├── documentation/              # Project documentation
├── CLAUDE.md                   # AI coding agent documentation
└── components.json             # Shadcn/UI configuration
```

## Contributing

We welcome contributions to LLM Comparator! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and conventions
- Use TypeScript for all new code
- Ensure all components are properly typed
- Test your changes thoroughly
- Update documentation as needed

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions:

1. **Check the [Issues](https://github.com/your-username/llm-comparator/issues)** page for existing solutions
2. **Create a new issue** with detailed information about your problem
3. **Join our community** for discussions and support

## Roadmap

- [ ] Support for additional LLM providers (Gemini, Llama, etc.)
- [ ] Advanced metrics and scoring algorithms
- [ ] Team collaboration features
- [ ] Custom model fine-tuning integration
- [ ] Mobile app development
- [ ] Enterprise SSO integration

---

**Built with ❤️ for the AI community**