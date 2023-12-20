# BloodyHappy FrontEnd

## Introduction

This is the BloodyHappy FrontEnd App created with Next.js.

## Prerequisites

Before you begin, make sure you have the following installed:

- Node.js@18.17.0
- Yarn

## How to Replicate This Project on Your Local Machine

1. **Clone this repository:**

    ```bash
    git clone https://github.com/CapstoneProject-BloodyHappy/FrontEnd.git
    cd FrontEnd
    ```

2. **Install dependencies using Yarn:**

    ```bash
    yarn install
    ```

4. **Initialize the Backend/API**

   - Visit the Backend/API repository at [this link](https://github.com/CapstoneProject-BloodyHappy/API)
   - Initialize the API according to the `README.md`

3. **Create a Firebase project and configure authentication:**

    - Visit the [Firebase Console](https://console.firebase.google.com/).
    - Create a new project.
    - Navigate to the "Authentication" section and set up your preferred authentication method (e.g., email/password, Google, etc.).
    - Obtain your Firebase config by clicking on "Project settings" > "General" > "Your apps" > "Firebase SDK snippet" > "Config."

4. **Set up Firebase configuration:**

    - Create a new file named `.env` in the project root.
    - Add your Firebase configuration to the file in the following format along with the API Url:

        ```env
        FIREBASE_CONFIG_APIKEY=
        FIREBASE_CONFIG_AUTHDOMAIN=
        FIREBASE_CONFIG_PROJECTID=
        FIREBASE_CONFIG_STORAGEBUCKET=
        FIREBASE_CONFIG_MESSAGINGSENDERID=
        FIREBASE_CONFIG_APPID=
        FIREBASE_CONFIG_MEASUREMENTID=
        API_URL=
        ```

5. **Run the app:**

    ```bash
    yarn dev
    ```

    Visit [http://localhost:3000](http://localhost:3000) in your browser to see the app.
