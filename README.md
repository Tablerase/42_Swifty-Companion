# 42_Swifty-Companion

<img src="./42Companion/assets/images/icon.png" alt="42 Swifty Companion Logo" width="200" style="background-color: #F5F5DC; border-radius: 18px; padding: 15px;" align="right">

The aim of the project is to build an application that will retrieve the information of 42 students, using the 42 API v2. The application will allow users to log in with their 42 account, search for students by login, and view their information, including skills, projects, level, etc.

## Features

- Login with 42 account
- Search for a student by login
- View student information
- Display skills and projects

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

  Authenticated:::login
  subgraph Authenticated
    GetToken[Get Access Token]
    Refresh[Refresh Access Token]
  end

  Search:::search
  subgraph Search
    D[Search for Student] --> E[Retrieve Student Data]
  end

  Profile:::profile
  subgraph Profile
    G[View Student Profile] --> H[Display Profile Information]
    H -.- I[Show Skills]
    H -.- F[Show Projects]
  end

  Logout:::login
  subgraph Logout
    J[Logout] --> K[Clear Access Token]
  end

  Login -->|"(protected)"| intersection1{ }
  Authenticated --> intersection1
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
> [!NOTE]\
> Make sure you have the 42 API credentials before proceeding.
>
> - You can register your application on the 42 API [here](https://profile.intra.42.fr/oauth/applications/new).
4. Configure the app:
   - Use the `.env.example` file to create a `.env` file with your 42 API information.
     - Copy the `.env.example` file to `.env`:
       ```bash
       cp .env.example .env
       ```
     - Set the `EXPO_PUBLIC_42API_CLIENT_ID` and `EXPO_PUBLIC_42API_CLIENT_SECRET` with your 42 API credentials.
   - Modify the `authConfig.ts` file to set the correct:
     - `REDIRECT_URI` to match your app's configuration and check if the `ENDPOINTS` are correct.
   - Generate assets/fonts/services files for Android:
     - Run the following command to generate the necessary assets and services files:
       ```bash
       npx expo prebuild
       ```
     - This will create the `android/app/src/main/res` directory with the necessary files.
6. Start the development server:
   ```bash
   # If you want to use the tunnel connection, which is useful for testing on physical devices, run:
   npx expo start --tunnel --dev-client
   ```
   ```
   npx expo start
   ```
7. Building the development client:
   ```bash
   npx expo run:android
   ```
   - If change to assets or native code don't forget to rebuild the development client. If that does not work, try:
     ```bash
       npx expo prebuild
     ```
8. Open the app on your device or emulator (if not already running).

## 42 API

The 42 API is used to retrieve student information. You can find the documentation [here](https://api.intra.42.fr/apidoc).

- Getting started: https://api.intra.42.fr/apidoc/guides/getting_started
- App registration: https://profile.intra.42.fr/oauth/applications/new
- API Flow: https://api.intra.42.fr/apidoc/guides/web_application_flow
- Refresh token info: https://www.rfc-editor.org/rfc/rfc6749#section-3.2

```mermaid
---
title: 42 API Authentication Flow by Tablerase
---
sequenceDiagram
  actor User
  participant App
  participant Browser
  participant 42API

  rect rgb(200, 200, 255)
    note over User, 42API: Authorization Code Grant Flow
    User->>App: Clicks 'Login with 42'
    App->>Browser: Opens auth URL <br/>(with client_id, redirect_uri, <br/>response_type='code', scope, state)
    Browser->>42API: Requests /oauth/authorize
    activate 42API
    42API-->>Browser: Shows 42 login page
    deactivate 42API
    User->>Browser: Enters credentials and authorizes app
    Browser->>42API: Submits authorization
    activate 42API
    42API-->>Browser: Redirects to App's redirect_uri <br/>with authorization_code and state
    deactivate 42API
    Browser->>App: Delivers authorization code and state
    App->>App: Verifies state to prevent CSRF
    App->>42API: POST /oauth/token <br/>(with grant_type='authorization_code', client_id, <br/>client_secret, code, redirect_uri)
    activate 42API
    42API-->>App: Returns access_token, refresh_token, expires_in
    deactivate 42API
    App->>App: Stores tokens securely
    App-->>User: Logs user in
  end

  rect rgb(200, 255, 200)
    note over User, 42API: Accessing Protected Resources
    User->>App: Requests student data
    App->>App: Retrieves stored access_token
    App->>42API: GET <br/>/v2/me (or other endpoint) <br/>with Authorization: Bearer access_token
    activate 42API
    42API-->>App: Returns user data
    deactivate 42API
    App-->>User: Displays user data
  end

  rect rgb(255, 255, 200)
    note over App, 42API: Refreshing Access Token
    loop Access token expired
      App->>42API: POST <br/>/oauth/token (with grant_type='refresh_token', <br/>refresh_token, client_id, client_secret)
      activate 42API
      42API-->>App: Returns new access_token and refresh_token
      deactivate 42API
      App->>App: Stores new tokens
    end
  end
```

## RadarCharts

Here we use `react-native-gifted-charts` to display the radar charts for skills and projects. The library provides a simple way to create radar charts in React Native applications.

- To use actual version, `newArchEnabled` must be set to `false` in `app.json` because the library is not compatible with the new architecture.
