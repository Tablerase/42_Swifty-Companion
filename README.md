# 42_Swifty-Companion

The aim of the project is to build an application that will retrieve the information of 42 students, using the 42 API

## Features

- Login with 42 account
- Search for a student by login
- View student profile

```mermaid
---
title 42 Swifty Companion Architecture
---
flowchart LR
  Login:::login
  subgraph Login
    A[Login with 42] --> B[Retrieve Access Token]
    B --> C[Store Access Token]
  end

  Search:::search
  subgraph Search
    D[Search for Student] --> E[Retrieve Student Data]
  end

  Profile:::profile
  subgraph Profile
    G[View Student Profile] --> H[Display Profile Information]
    H --> I[Show Achievements]
  end

  Logout:::login
  subgraph Logout
    J[Logout] --> K[Clear Access Token]
  end

  Login -->|"(protected)"| intersection1{ }
  intersection1 --> Search
  intersection1 --> Logout
  intersection1 -->|'current user' by default| Profile
  Search --> |"user data"| Profile

classDef login fill:#bbf,stroke:#333,stroke-width:2px;
classDef search fill:#bfb,stroke:#333,stroke-width:2px;
classDef profile fill:#ffb,stroke:#333,stroke-width:2px;
```

## Installation

1. Clone the repository:
   ```bash
   git clone
   ```
2. Navigate to the project directory:
   ```bash
   cd 42Companion
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   # If running on a physical device
   npx expo start --tunnel --dev-client
   ```
   ```
   npx expo start
   ```
5. Building the development client:
   ```bash
   npx expo run:android
   ```
   - If change to assets or native code don't forget to rebuild the development client. If that does not work, try:
     ```bash
       npx expo prebuild
     ```
6. Open the app on your device or emulator (if not already running).

## 42 API

The 42 API is used to retrieve student information. You can find the documentation [here](https://api.intra.42.fr/apidoc).

- Getting started: https://api.intra.42.fr/apidoc/guides/getting_started
- App registration: https://profile.intra.42.fr/oauth/applications/new
- API Flow: https://api.intra.42.fr/apidoc/guides/web_application_flow
