# Time Farm Telegram Bot

This bot automates interactions with the Time Farm Telegram bot. It handles tasks such as fetching farming info, submitting tasks, and claiming rewards for multiple accounts. Each account is processed with a 5-second delay between them, and the bot rechecks the accounts every hour.

## Refferal Link

Click [here](https://t.me/TimeFarmCryptoBot?start=WIOAo6rSXEZHbmDz) to join Time Farm and get 30000 TIME for free.

## Features

- Fetch farming info for each account
- Submit tasks and claim rewards automatically
- Delays between processing each account to prevent rate-limiting
- Regular rechecking of all accounts

## Requirements

- Node.js v12.x or higher
- NPM or Yarn

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/pilarxyz/timefarm
   cd timefarm
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create `token.json` files in the root directory.

- Copy bearer token from your browser's in Time Farm and paste it in `token.json` file.

  ![Bearer Token](https://github.com/pilarxyz/timefarm/blob/main/imagetoken.png)

- `token.json` should contain your tokens:

  ```json
  [
    "Bearer your_first_token",
    "Bearer your_second_token",
    "Bearer your_third_token"
  ]
  ```

## Usage

1. Run the bot:

   ```bash
   node index.js
   ```

2. The bot will start processing each account, fetching farming info, submitting tasks, and claiming rewards. It will print logs to the console with details about each operation.

## Example Output

```plaintext
[ 10:26:56 PM ] Processing account 1...
[ 10:26:57 PM ] Balance: 730000.000
[ 10:26:57 PM ] Active Farming Started At (WIB): Jun 10, 2024, 8:26 PM
[ 10:26:57 PM ] Next Claim Time (WIB): Jun 11, 2024, 12:26 AM
[ 10:26:57 PM ] Task Follow our CEO on X already claimed
[ 10:26:57 PM ] Task Follow Time Farm on X already claimed
[ 10:26:57 PM ] Task Subscribe to our CEO channel cannot be claimed yet
[ 10:26:57 PM ] Task Follow Chrono.tech on X already claimed
[ 10:26:57 PM ] Task Follow LaborX on X already claimed
[ 10:26:57 PM ] Task Subscribe to TimeFarm channel cannot be claimed yet
[ 10:26:57 PM ] Task Subscribe to TimeFarm chat cannot be claimed yet
[ 10:26:57 PM ] Task Subscribe to LaborX channel already claimed
[ 10:26:57 PM ] Task Subscribe to Chrono.tech channel already claimed
[ 10:26:57 PM ] Task Subscribe to Chrono.tech on YouTube already claimed
[ 10:26:57 PM ] Account 1 waiting 1 hour and 59 minutes before claiming...
[ 10:27:02 PM ] Processing account 2...
...
```
