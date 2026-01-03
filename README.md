# 🚌 Trackit: Smart Transit Ecosystem for Surat

![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue) ![HTML](https://img.shields.io/badge/Language-HTML5-orange) ![Config](https://img.shields.io/badge/Config-JSON%20%2F%20TOML-lightgrey)

> **"Bridging the gap between Commuters and Conductors in Surat City using AI."**

## 📲 Download App
[![Download APK](https://img.shields.io/badge/Download-Android_APK-green?style=for-the-badge&logo=android)](https://drive.google.com/file/d/1ziaZVliUmrjpXRCwTkKSDblCs9txJHHT/view?usp=sharing)

## 💡 The Problem
Commuters in Surat (Udhna, Sachin, Vesu) face uncertainty with bus timings. There is no reliable way to track BRTS or Sitilink buses live, and finding route information is difficult. Safety during late-night travel is also a major concern.

## 🚀 The Solution
**Trackit** is a real-time web and mobile application powered by **Gemini AI**.
* **For Passengers:** Live bus tracking on a map, AI Chatbot for queries, and an SOS Safety Shield.
* **For Conductors:** A dashboard to broadcast live location and manage trip status.

## ✨ Key Features
1.  **Live Surat Transit Tracking:** Real-time bus positions on Leaflet Maps (e.g., Route 11, Route 102R).
2.  **Gemini AI Conductor:** A chatbot that answers questions like *"Where is the bus?"* using Google's Generative AI.
3.  **SOS Safety System:** One-tap emergency alerts for passengers.
4.  **Role-Based System:** Separate interfaces for Conductors and Passengers.

## 📸 Screenshots
![seprate_panel jpg](https://github.com/user-attachments/assets/6112c3fc-ae3b-40cf-9b32-7a467e830c5b)
!![AI_chatbox jpg](https://github.com/user-attachments/assets/4c320bbe-f109-4b8b-8e3f-6be4c6612128)
[sos-alert](https://github.com/user-attachments/assets/385eb6a6-00f7-42b3-8a51-4ef4da87060c)
![live-map jpg](https://github.com/user-attachments/assets/e40a443d-b9a7-42bb-8d2d-0ea4ac675a1b)



## 🛠️ Tech Stack
This project was built using the following technologies:

* **Languages:** TypeScript (`.tsx`, `.ts`), HTML5
* **Data & Config:** JSON, TOML
* **Framework:** React
* **AI Model:** Google Gemini API
* **Maps:** Leaflet.js
* **Styling:** Tailwind CSS

## ⬇️ How to Run Locally

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/YOUR-USERNAME/trackit-surat-live.git](https://github.com/YOUR-USERNAME/trackit-surat-live.git)
    ```
2.  **Install Dependencies**
    ```bash
    npm install
    ```
3.  **Setup Environment**
    Create a `.env.local` file and add your API Key:
    ```toml
    GEMINI_API_KEY="your_api_key_here"
    ```
4.  **Run the App**
    ```bash
    npm run dev
    ```

---
*Submitted for the Google Gemini Hackathon*
