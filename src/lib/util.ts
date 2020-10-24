import moment, { duration as _duration, unix } from "moment";
import { hypixelPlayer as _hypixelPlayer, hypixelFindGuild as _hypixelFindGuild, hypixelGuild as _hypixelGuild } from "./hypixel";
import "moment-duration-format";

export function blocksmc(query: string, type: string) {
  if (type === "leaderboard") {
    return new Promise((resolve, reject) => {
      const leaderboards = ["sky-wars", "sky-wars-solo", "bed-wars", "bed-wars-solo", "egg-wars", "egg-wars-solo", "top-skypvp-s1", "survival-games", "1vs1", "the-bridge", "lucky-block-wars", "sky-giant", "sky-giant-mini", "murder-mystery", "tnt-tag", "block-party", "gravity", "super-jump", "splegg", "quake-craft", "uhc-run"];
      if (!leaderboards.includes(query))
        return resolve({ errors: "Invalid game leaderboard." });
      fetch(`https://blocksmc.com/${query}`)
        .then(res => res.text())
        .then(body => {
          interface Obj {
            [key: string]: number | string
        }
          const data: Obj[] = [];
          const template: (string | number)[] = [];
          const $ = cheerio.load(body);
          $("thead").find("td").each(function () {
            const stat = $(this).text().trim().replace(/\s\s|^Av$/g, "").toLowerCase().replace("#", "rank").replace("w/l", "winLossRatio").replace("k/d", "killDeathRatio");
            if (stat.length > 0)
              template.push(stat);
          });
          $("tbody").find("tr").each(function () {
            const stat = $(this).text().trim().replace(/\s\s/g, "").split(" ");
            const obj: Obj = {};
            for (let i = 0; i < template.length; i++) {
              obj[String(template[i])] = !isNaN(Number(stat[i])) ? Number(stat[i]) : stat[i];
            }
            data.push(obj);
          });
          return resolve(data);
        }).catch(e => {
          resolve({ errors: "Can't fetch stats, Website is probably offline." });
          console.log(e);
        });
    });
  }
  if (type === "player") {
    return new Promise((resolve, reject) => {
      fetch(`https://blocksmc.com/player/${query}`)
        .then(res => res.text())
        .then(body => {
          interface Data1 {
            [key: string]: object
          }
          interface Data {
            games: Data1
          }
          const data: Data = { games: {} };
          const $ = cheerio.load(body);
          const name = $(".profile-header h1").text().trim();
          const rank = $(".profile-rank").text().replace("\n", "").trim();
          const timePlayed = $("h1[dir=ltr]").text().replace("\n", "").trim();
          let totalKills = 0;
          let totalWins = 0;
          let totalGames = 0;
          let totalPoints = 0;
          let totalDeaths = 0;
          $("div.col-xl-4").each(function () {
            const stats = {};
            $(this).find("li").each(function () {
              if ($(this).find("div.key").text() === "Kills")
                totalKills += Number($(this).find("div.val").text());
              if ($(this).find("div.key").text() === "Wins")
                totalWins += Number($(this).find("div.val").text());
              if ($(this).find("div.key").text() === "Played")
                totalGames += Number($(this).find("div.val").text());
              if ($(this).find("div.key").text() === "Points")
                totalPoints += Number($(this).find("div.val").text());
              if ($(this).find("div.key").text() === "Deaths")
                totalDeaths += Number($(this).find("div.val").text());

              Object.assign(stats, { [$(this).find("div.key").text()]: Number($(this).find("div.val").text()) });
            });
            data.games[$(this).find("div.title").text().trim().replace(/ |:/g, "_").replace("1VS1", "Duels")] = stats;
          });
          Object.assign(data, { name, rank, timePlayed, totalKills, totalWins, totalGames, totalPoints, totalDeaths });

          if (!name)
            return resolve({ errors: "User not found" });
          resolve(data);
        }).catch(e => {
          resolve({ errors: "Can't fetch stats, Website is probably offline." });
          console.log(e);
        });
    });
  }
}
export async function hypixelPlayer(username: string, key: string) {
  return new Promise((resolve, reject) => {
    if (!username)
      return resolve({
        "errors": "No username provided"
      });
    if (!key)
      return resolve({
        "errors": "No Hypixel API key provided"
      });
    _hypixelPlayer(username, key).then(r => resolve(r));
  });
}
export async function hypixelFindGuild(search: string, type: string, key: string) {
  return new Promise((resolve, reject) => {
    if (!search)
      return resolve({
        "errors": "No search term provided"
      });
    if (!type)
      return resolve({
        "errors": "No search type provided"
      });
    if (!key)
      return resolve({
        "errors": "No Hypixel API key provided"
      });
    _hypixelFindGuild(search, type, key).then(r => resolve(r));
  });
}
export async function hypixelGuild(id: string, key: string) {
  return new Promise((resolve, reject) => {
    if (!id)
      return resolve({
        "errors": "No guild ID provided"
      });
    if (!key)
      return resolve({
        "errors": "No Hypixel API key provided"
      });
    _hypixelGuild(id, key).then(r => resolve(r));
  });
}
export async function hypixelWatchdog(key: string) {
  return new Promise((resolve, reject) => {
    fetch(`https://api.hypixel.net/watchdogstats?key=${key}`)
      .then(res => res.json())
      .then(async (json) => {
        resolve(json);
      }).catch(e => {
        resolve({ "errors": "Can't fetch stats, API is probably offline." });
        console.log(e);
      });
  });
}
export async function hypixelBoosters(key: string) {
  return new Promise((resolve, reject) => {
    interface Game {
      [key: string]: string
    }
    const getGametype: Game = {
      2: "QUAKECRAFT",
      3: "WALLS",
      4: "PAINTBALL",
      5: "Blitz Survival Games",
      6: "TNT GAMES",
      7: "VAMPIREZ",
      13: "Mega Walls",
      14: "ARCADE",
      17: "ARENA",
      20: "UHC Champions",
      21: "Cops and Crims",
      23: "Warlords",
      24: "Smash Heroes",
      25: "Turbo Kart Racers",
      26: "Housing",
      51: "SkyWars",
      52: "Crazy Walls",
      54: "Speed UHC",
      55: "SkyClash",
      56: "Classic Games",
      57: "Prototype",
      58: "Bed Wars",
      59: "Murder Mystery",
      60: "Build Battle",
      61: "Duels",
    };
    fetch(`https://api.hypixel.net/boosters?key=${key}`)
      .then(res => res.json())
      .then(async (json) => {
        if (!json.success)
          return resolve({ "errors": "There are no active boosters" });
        const arr: object[] = [];
        json.boosters.forEach(async (e: { gameType: string; amount: any; length: moment.DurationInputArg1; originalLength: moment.DurationInputArg1; dateActivated: any; }) => {
          const entry = {
            game: getGametype[e.gameType],
            multiplier: `x${e.amount}`,
            remaining: _duration(e.length, "seconds").format(" m [mins], s [secs]"),
            originalLength: _duration(e.originalLength, "seconds").format(" m [mins], s [secs]"),
            activated: e.dateActivated
          };
          arr.push(entry);
        });
        resolve(arr);
      });
  });
}
export async function hypixelKey(key: string) {
  return new Promise((resolve, reject) => {
    fetch(`https://api.hypixel.net/key?key=${key}`)
      .then(res => res.json())
      .then(async (json) => {
        resolve(json);
      }).catch(e => {
        resolve({ "errors": "Can't fetch stats, API is probably offline." });
        console.log(e);
      });
  });
}

