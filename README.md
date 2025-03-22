### SAYPANEL BOT README

#### 📌 Description
This bot script allows users to create announcements through an interactive panel. Users can enter announcement details, including title, message, image URL, role mention, and the channel ID where the announcement should be sent.

---

#### ⚙️ Setup Instructions
1. **Ensure you have Node.js installed** (Recommended: v16 or later).
2. **Install required dependencies** by running:
   ```sh
   npm install discord.js
   ```
3. **Replace the following placeholders** in `saypanel.js`:
   - `SAYPANEL_CHANNEL_ID` → The channel where the panel will be sent.
   - **Ensure your bot has permission** to send messages & embeds in the panel and announcement channels.

---

#### 🚀 How It Works
1. **The panel is sent to the configured channel** using:
   ```sh
   !saypanel
   ```
2. **Users click the "📢 Create Announcement" button.**
3. **A modal appears**, asking for:
   - Announcement Title
   - Message Content
   - Image URL (Optional)
   - Role Mention (Optional)
   - Channel ID to send the announcement
4. **Announcement is sent** to the specified channel.
5. **Users receive a confirmation.**

---

#### 🔧 Features
✅ Interactive Announcement Panel
✅ Customizable Announcements
✅ Embed Panel for Better UI
✅ Supports Role Mentions & Images
✅ Allows Announcements in Any Channel
✅ Ephemeral Confirmation Messages

---

#### 📜 Notes
- If the provided channel ID is invalid, the bot will notify the user.
- The bot must have `Manage Messages` & `Embed Links` permissions in the announcement channels.
- Modify colors and embed details as needed!

---

🛠 Developed for Discord bot integration. Modify as required!

