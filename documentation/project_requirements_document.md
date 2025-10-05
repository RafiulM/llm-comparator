# Project Requirements Document (PRD) for llm-comparator

## 1. Project Overview
llm-comparator is a lightweight web application that helps users compare the outputs of multiple large language models (LLMs) side by side. Whether you’re a prompt engineer, a researcher, or just curious about which model handles your use case best, llm-comparator centralizes your prompts, routes them to different LLM APIs (OpenAI’s GPT series, Claude, etc.), and displays their responses together with quality metrics.

By building this tool, we solve the common pain point of manually querying each LLM in separate windows or scripts and then struggling to line them up for head-to-head evaluation. Our key objectives are: 1) let users run the same prompt across at least three LLMs in a single click, 2) show scores (e.g., coherence, relevance) alongside raw outputs, and 3) provide a clean, shareable report. Success means users can make model-selection decisions in under five minutes per prompt.

## 2. In-Scope vs. Out-of-Scope

**In-Scope (v1.0)**
- User registration & secure login (email/password + JWT)
- API key management for each supported LLM provider
- Prompt input UI with model selection (up to 3 models at once)
- Parallel calls to LLM APIs (OpenAI, Anthropic Claude, Hugging Face)
- Side-by-side response display
- Automated scoring metrics (e.g., length, sentiment, read-ability)
- Save & view past comparisons in a simple history dashboard
- Export comparison as PDF/CSV report

**Out-of-Scope (v1.0)**
- Enterprise SSO (SAML, OAuth for business customers)
- Real-time collaboration (multi-user editing)
- Custom model fine-tuning or hosting
- Advanced statistical analysis or visualization beyond basic scores
- Mobile-only app (desktop-first web experience)

## 3. User Flow
A new user lands on the home page and sees a brief introduction to llm-comparator. They click Sign Up, provide their email and password, then confirm via email link. After logging in, they’re directed to the Dashboard. At the top is a “New Comparison” button; below it is a list of past runs. Clicking New Comparison brings them to the Prompt Screen.

On the Prompt Screen, the user pastes or types their prompt in a large text box, then checks boxes for the models they want to compare (for example: GPT-4o, Claude v3, Bloom). They hit Run. Behind the scenes, the app makes parallel API calls, collects responses, and computes simple metrics. The user then sees a 3-column layout: each column shows raw text, metric scores, and a “Rate this output” slider. They can Save, Export, or go Back to try a different prompt. Finally, the History page lists all comparisons; clicking any row re-opens that comparison for review or re-export.

## 4. Core Features
- **Authentication & Authorization**: Sign up, log in, JWT sessions, password reset
- **API Key Vault**: Securely store and encrypt user’s LLM API keys
- **Prompt Input & Model Selection**: Text area + checkboxes/dropdown for available LLMs
- **Parallel LLM Calls**: Backend logic to fan-out requests and gather responses
- **Side-by-Side Display**: Three-column UI with raw output and computed metrics
- **Automated Scoring**: Pre-defined metrics (coherence, length, sentiment)
- **User Ratings**: Slider or star rating per model output for manual feedback
- **History & Dashboard**: List saved comparisons with date, prompt snippet, models used
- **Export Functionality**: Generate PDF or CSV summary report

## 5. Tech Stack & Tools
- **Frontend**: Next.js (React + TypeScript), Chakra UI or Material UI for components
- **Backend**: Node.js + Express (TypeScript) for API routes and business logic
- **Database**: PostgreSQL for user data, comparison history; Redis for caching
- **AI Integrations**: OpenAI SDK (GPT-4o), Anthropic Claude API, Hugging Face Inference API
- **Authentication**: JWT + bcrypt for password hashing
- **Hosting/Infrastructure**: Vercel (frontend), AWS Lambda or Heroku (backend), Railway or Supabase for Postgres
- **IDE/Plugins**: VS Code with Cursor AI assist, Windsurf for debugging

## 6. Non-Functional Requirements
- **Performance**: Return all three LLM responses in under 5 seconds (on average) for 100-token prompts
- **Scalability**: Handle up to 100 concurrent comparison jobs, with horizontal auto-scaling
- **Security**: HTTPS/TLS everywhere; encrypt API keys at rest (AES-256); OWASP Top 10 compliance
- **Availability**: 99.9% uptime SLO; retry logic on transient API errors
- **Usability**: Intuitive UI, with loading spinners and clear error messages; mobile-responsive down to 320px width
- **Data Privacy**: GDPR-compatible data deletion on user request

## 7. Constraints & Assumptions
- Users must supply valid API keys for each LLM provider.
- Dependent on third-party LLMs’ rate limits and uptime (e.g., OpenAI’s QPS limits).
- Initial version won’t support private/custom models—only hosted APIs.
- Budget constraints may limit number of parallel API requests.
- We assume stable network connectivity; no offline mode.

## 8. Known Issues & Potential Pitfalls
- **API Rate Limits**: Exceeding provider quotas will cause 429 errors—mitigate with exponential backoff and user feedback.
- **Latency Variation**: Some LLMs respond slower; use per-model timeouts and display partial results.
- **Cost Management**: High-volume calls can be expensive—implement usage caps or warn users.
- **Metric Accuracy**: Automated scores are simplistic; clearly label them as rough guidance.
- **Data Consistency**: Partial failures (e.g., one API times out) should still show other results; handle nulls gracefully.

By following this PRD, the AI model can generate detailed technical specs, UI guidelines, and backend architecture without any missing information or ambiguity.