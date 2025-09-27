flowchart TD
  U[User] -->|Enter prompt| FE[Frontend\nUI]
  FE -->|Send request| API[Unified\nChat API]
  API -->|Call| LLM1[LLM\nProvider 1]
  API -->|Call| LLM2[LLM\nProvider 2]
  LLM1 -->|Response| API
  LLM2 -->|Response| API
  API -->|Return responses| FE
  FE -->|Display side by side| U