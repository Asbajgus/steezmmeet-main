# 🏂 SteezMeet: Shred it, Steeze it, Send it!

***Den mest chille veien å planlegge shreds med gjengen!***  
_The chillest way to plan your shreds with the crew!_

---

## 🚀 About SteezMeet

**SteezMeet** is a simple web app that serves as a hub for planning, sharing, and chatting around shredding sessions. Users can log in, explore a personal dashboard, upload memories to a gallery, and connect through a chat system — all wrapped in a steezy interface.

Whether you're hitting the slopes, skating the park, or just want to stay connected with your riding crew, SteezMeet keeps the stoke alive.

---

## 👀 Features at a Glance

- ✅ Log in/out with user-specific content
- 🛍️ Smooth navigation between sections
- 📊 View user stats and upcoming events
- 🖼️ Upload and delete photos/videos in Gallery
- 💬 Real-time style chat via SteezChat
- 🢑 Keep track of your crew on the Friends list

---

## 📚 Table of Contents

- [Navigation](#️-navigation)
- [Authentication](#-authentication)
- [Profile](#-profile)
- [Dashboard](#-dashboard)
- [Statistics](#-statistics)
- [Event](#-event)
- [Friends](#-friends)
- [Gallery](#-gallery)
- [SteezChat](#-steezchat)
- [Structure](#-structure)
- [Credits](#-credits)

---

## 🛍️ Navigation

Users can move between **Dashboard**, **Gallery**, and **SteezChat** using the navigation menu in the top-left corner.

- Navigation is handled via JavaScript functions like:
  - `navigateToDashboard()`
  - `navigateToGalleri()`
  - `navigateToChat()`

These control the visibility of each section by toggling the `style.display` of various HTML containers.

---

## 🔐 Authentication

- Users log in through a simple form in the `#loginContainer`.
- Upon login:
  - A welcome message appears in the dashboard.
  - The "Log In" button is replaced by "Log Out".
  - Navigation becomes available.

---

## 👤 Profile

Each user can access a personal profile to view relevant info (feature expandable).

---

## 📋 Dashboard

The dashboard is your central hub — showing:

- Personalized welcome message
- Recent statistics
- Upcoming events
- Friend list overview

It dynamically updates based on the logged-in user.

---

## 📊 Statistics

Displays key data like:

- Number of shreds
- Most active locations
- Steez rating (vibes only 😎)

---

## 🗓️ Event

Users can:

- **Create new events**
- **View all planned events**

(Event model handles data; currently being expanded.)

---

## 👥 Friends

Your riding crew lives here. See your friends, maybe even plan a sesh together. (Coming features: add/remove/search)

---

## 🖼️ Gallery

- View a collection of uploaded images and videos.
- Upload new media using `addGalleriItem()` — reads the file and adds it to the model.
- Delete unwanted items with `deleteGalleriItem()`.

---

## 💬 SteezChat

- Users can send real-time(ish) messages.
- Messages are stored in `chatModel`.
- Chat view is dynamically rendered with `renderChat()`.

---

## 🧱 Structure

### HTML
- Containers for login, content, dashboard, gallery, and chat.
- Buttons and forms for interaction.

### CSS
- Responsive design optimized for mobile and desktop.
- Grid layouts used for content sections like the Dashboard and Gallery.

### JavaScript
- **`model.js`** — Stores app data: users, events, gallery items, and messages.
- **`app.js`** — Handles UI updates, navigation, and interactions.
- **`controller.js`** — (Currently empty) Can be used for separating logic from UI control.

---

## 🙌 Credits

Big shoutout to the crew behind SteezMeet:

- [Peter André Altier](https://github.com/Asbajgus)
- [Marianne Mahieu](https://github.com/Pol135947)
- [Michal Szczepanski](https://github.com/szczepanskimichal)
- [Christian Ulstein](https://github.com/christis96)