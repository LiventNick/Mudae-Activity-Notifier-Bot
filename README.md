# Mudae Activity Notifier Bot

**Private Discord bot that monitors messages and embeds in a specific channel and pings a role when certain conditions are met.**

---

## Features

* Detects **Mudae bot embeds** like `"React with any emoji to claim!"` and pings an opt-in role.
* Supports **human $ keyword commands**, including exact-match triggers (`$ha`, etc.).
* Shared **cooldown** (configurable in seconds) to prevent spam.
* **Debug mode** logs messages and triggers for easier monitoring.
* **Private bot**: works only in your server, respects roles and permissions.

---

## Requirements

* **Node.js 18+**
* Discord bot token
* Role and channel IDs

---

## Installation

1. Clone or download the repo:

```bash
git clone https://github.com/LiventNick/Mudae-Activity-Notifier-Bot.git
cd discord-keyword-slasher
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root folder:

```env
BOT_TOKEN=YOUR_BOT_TOKEN
CHANNEL_ID=YOUR_CHANNEL_ID
ROLE_ID=ROLE_TO_PING
BOT_MESSAGE_ID=Mudae_BOT_ID
COOLDOWN_SECONDS=300
DEBUG=true
```

* **BOT_MESSAGE_ID**: Only messages from this bot are monitored (Mudae).
* **COOLDOWN_SECONDS**: Adjust ping frequency.
* **DEBUG**: Set `true` to log all messages and triggers.

---

## Usage

Start the bot:

```bash
npm start
```

### How it works

* **Human messages**:

  * `$` keywords trigger the role ping.
  * Exact-match triggers (e.g., `$ha`) only work if the keyword is the full message.

* **Bot messages**:

  * Detects Mudae’s claim embeds and pings the role.

* **Cooldown**: Prevents multiple pings within the configured seconds.

* **Debug logs**: Shows which messages are processed and when pings are sent.

---

## Permissions

Minimal permissions required:

* **Read Messages / View Channel**
* **Read Message History**
* **Send Messages**
* **Mention Everyone**

> Make sure the bot’s role is **above the role it needs to ping**.

---

## Notes

* Private bot: works only in the configured server.
* Does **not store personal data**.
* Only reacts to configured keywords and embeds.

---