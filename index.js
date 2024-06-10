import axios from "axios";
import fs from "fs";
import chalk from "chalk";
import { DateTime } from "luxon";

const tokens = JSON.parse(fs.readFileSync("token.json", "utf-8"));
const userAgents = JSON.parse(fs.readFileSync("useragents.json", "utf-8"));
const convertedTokensPath = "token-converted.json";

if (!fs.existsSync(convertedTokensPath)) {
  fs.writeFileSync(convertedTokensPath, JSON.stringify([]));
}

const convertedTokens = JSON.parse(
  fs.readFileSync(convertedTokensPath, "utf-8")
);

const getRandomUserAgent = () => {
  return userAgents[Math.floor(Math.random() * userAgents.length)];
};

const getTimestamp = () => {
  return `[ ${new Date().toLocaleTimeString()} ]`;
};

const getHeaders = (token) => ({
  accept: "/",
  "accept-language": "en-GB,en;q=0.8",
  authorization: token,
  "content-type": "application/json",
  origin: "https://tg-tap-miniapp.laborx.io",
  priority: "u=1, i",
  referer: "https://tg-tap-miniapp.laborx.io/",
  "sec-ch-ua": '"Brave";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"Windows"',
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-site",
  "sec-gpc": "1",
  "user-agent": getRandomUserAgent(),
});

const getFarmingInfo = async (token) => {
  try {
    const response = await axios.get(
      "https://tg-bot-tap.laborx.io/api/v1/farming/info",
      {
        headers: getHeaders(token),
      }
    );
    const { balance, activeFarmingStartedAt, farmingDurationInSec } =
      response.data;
    const activeFarmingStartedWIB = DateTime.fromISO(activeFarmingStartedAt)
      .setZone("Asia/Jakarta")
      .toLocaleString(DateTime.DATETIME_MED);
    const nextClaimTime = DateTime.fromISO(activeFarmingStartedAt)
      .plus({ seconds: farmingDurationInSec + 10 })
      .setZone("Asia/Jakarta")
      .toLocaleString(DateTime.DATETIME_MED);
    console.log(chalk.green(`${getTimestamp()} Balance: ${balance}`));
    console.log(
      chalk.green(
        `${getTimestamp()} Active Farming Started At (WIB): ${activeFarmingStartedWIB}`
      )
    );
    console.log(
      chalk.green(`${getTimestamp()} Next Claim Time (WIB): ${nextClaimTime}`)
    );
    return { activeFarmingStartedAt, farmingDurationInSec };
  } catch (error) {
    console.log(
      chalk.red(
        `${getTimestamp()} Error saat mendapatkan farming info:`,
        error.message
      )
    );
    return null;
  }
};

const claimReward = async (token, index) => {
  const config = {
    method: "post",
    url: "https://tg-bot-tap.laborx.io/api/v1/farming/start",
    headers: getHeaders(token),
    data: {},
  };

  try {
    const response = await axios(config);
    if (response.status === 200) {
      console.log(
        chalk.green(`${getTimestamp()} Akun ke-${index + 1} Berhasil claim`)
      );
    }
  } catch (error) {
    if (error.response && error.response.status === 403) {
      console.log(
        chalk.yellow(`${getTimestamp()} Akun ke-${index + 1} Belum waktu claim`)
      );
    } else {
      console.log(
        chalk.red(
          `${getTimestamp()} Akun ke-${index + 1} Error:`,
          error.message
        )
      );
    }
  }
  console.log(chalk.blue("------------------------------"));
};

const processTasks = async (token, index) => {
  try {
    const response = await axios.get(
      "https://tg-bot-tap.laborx.io/api/v1/tasks",
      {
        headers: getHeaders(token),
      }
    );
    const tasks = response.data;
    let allClaimed = true;

    for (const task of tasks) {
      if (!task.submission || task.submission.status === "REJECTED") {
        await axios.post(
          `https://tg-bot-tap.laborx.io/api/v1/tasks/${task.id}/submissions`,
          {},
          {
            headers: getHeaders(token),
          }
        );
        console.log(
          chalk.green(`${getTimestamp()} Berhasil submit task ${task.title}`)
        );
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } else if (task.submission.status === "SUBMITTED") {
        console.log(
          chalk.yellow(`${getTimestamp()} Task ${task.title} belum bisa claim`)
        );
      } else if (task.submission.status === "COMPLETED") {
        await axios.post(
          `https://tg-bot-tap.laborx.io/api/v1/tasks/${task.id}/claims`,
          {},
          {
            headers: getHeaders(token),
          }
        );
        console.log(
          chalk.green(`${getTimestamp()} Berhasil claim task ${task.title}`)
        );
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } else if (task.submission.status === "CLAIMED") {
        console.log(
          chalk.blue(`${getTimestamp()} Task ${task.title} sudah dikerjakan`)
        );
      }

      if (task.submission && task.submission.status !== "CLAIMED") {
        allClaimed = false;
      }
    }

    if (allClaimed) {
      console.log(
        chalk.green(`${getTimestamp()} Seluruh Tasks sudah dikerjakan`)
      );
    }
  } catch (error) {
    console.log(
      chalk.red(`${getTimestamp()} Error saat memproses tasks:`, error.message)
    );
  }
};

const updateConvertedTokens = (token, farmingInfo) => {
  const existingToken = convertedTokens.find((t) => t.token === token);
  if (!existingToken) {
    convertedTokens.push({ token, ...farmingInfo });
    fs.writeFileSync(
      convertedTokensPath,
      JSON.stringify(convertedTokens, null, 2)
    );
  } else {
    existingToken.activeFarmingStartedAt = farmingInfo.activeFarmingStartedAt;
    existingToken.farmingDurationInSec = farmingInfo.farmingDurationInSec;
    fs.writeFileSync(
      convertedTokensPath,
      JSON.stringify(convertedTokens, null, 2)
    );
  }
};

const runAccount = async (token, index) => {
  console.log(`-----------------------------`);
  console.log(
    chalk.blue(`${getTimestamp()} Memproses akun ke-${index + 1}...`)
  );
  const farmingInfo = await getFarmingInfo(token);

  if (farmingInfo) {
    updateConvertedTokens(token, farmingInfo);

    await processTasks(token, index);

    const { activeFarmingStartedAt, farmingDurationInSec } = farmingInfo;
    const nextClaimTime = DateTime.fromISO(activeFarmingStartedAt)
      .plus({ seconds: farmingDurationInSec + 10 })
      .setZone("Asia/Jakarta");
    const waitTime = nextClaimTime.diffNow().as("milliseconds");
    const hours = Math.floor(waitTime / 1000 / 60 / 60);
    const minutes = Math.floor((waitTime / 1000 / 60) % 60);
    console.log(
      chalk.bgBlackBright(
        `${getTimestamp()} Akun ke-${
          index + 1
        } menunggu ${hours} jam dan ${minutes} menit sebelum klaim...`
      )
    );
    console.log(`-----------------------------`);
    setTimeout(() => claimReward(token, index), Math.max(0, waitTime));
  }
};

const startClaiming = async () => {
  while (true) {
    for (let i = 0; i < tokens.length; i++) {
      runAccount(tokens[i], i);
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Delay 5 seconds between each account
    }
    console.log(
      chalk.blue(`${getTimestamp()} Menunggu 1 jam sebelum memulai kembali...`)
    );
    await new Promise((resolve) => setTimeout(resolve, 60 * 60 * 1000)); // Wait 1 hour before starting again
  }
};

startClaiming();
