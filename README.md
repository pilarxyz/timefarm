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

- Copy bearer token from TimeFarm and input it to `token.json` file.

<!-- put picture -->

<center>
   <img src="https://user-images.githubusercontent.com/9143298/134760073-3b3b3b3b-1b3b-4b3b-8b3b-3b3b3b3b3b3b.png" width="500">
</center>


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
[ 10:26:56 PM ] Memproses akun ke-1...
[ 10:26:57 PM ] Balance: 730000.000
[ 10:26:57 PM ] Active Farming Started At (WIB): Jun 10, 2024, 8:26 PM
[ 10:26:57 PM ] Next Claim Time (WIB): Jun 11, 2024, 12:26 AM
[ 10:26:57 PM ] Task Follow our CEO on X sudah dikerjakan
[ 10:26:57 PM ] Task Follow Time Farm on X sudah dikerjakan
[ 10:26:57 PM ] Task Subscribe to our CEO channel belum bisa claim
[ 10:26:57 PM ] Task Follow Chrono.tech on X sudah dikerjakan
[ 10:26:57 PM ] Task Follow LaborX on X sudah dikerjakan
[ 10:26:57 PM ] Task Subscribe to TimeFarm channel belum bisa claim
[ 10:26:57 PM ] Task Subscribe to TimeFarm chat belum bisa claim
[ 10:26:57 PM ] Task Subscribe to LaborX channel sudah dikerjakan
[ 10:26:57 PM ] Task Subscribe to Chrono.tech channel sudah dikerjakan
[ 10:26:57 PM ] Task Subscribe to Chrono.tech on YouTube sudah dikerjakan
[ 10:26:57 PM ] Akun ke-1 menunggu 1 jam dan 59 menit sebelum klaim...
[ 10:27:02 PM ] Memproses akun ke-2...
...
```
