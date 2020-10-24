import fetch from "node-fetch"; // Main http module
import cheerio from "cheerio";
import moment, { duration as _duration, unix } from "moment";
import { hypixelPlayer as _hypixelPlayer, hypixelFindGuild as _hypixelFindGuild, hypixelGuild as _hypixelGuild } from "./hypixel";
import "moment-duration-format";
function toProperCase(str: string) {
  return str.replace(/([^\W_]+[^\s-]*) */g, function (txt: string) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
};

function size (obj: object){
  var size = 0, key: any;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

const camelCase = (val: string) => {
  if (val.includes(" ")) {
    const t = val.split(" ");
    const res = [];
    res.push(t[0]);
    for (let k = 1; t.length > k; k++) {
      res.push(toProperCase(t[k]));
    }
    return res.join("");
  } else {
    return val;
  }
};

const convertSeconds = (seconds: number) => {
  return (
    Math.floor(seconds / 1440) + "D " +
    Math.floor(((seconds / 1440) % 1) * 24) + "H " +
    Math.floor(((seconds / 60) % 1) * 60) + "M ");
};

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
export function funcraft(username: string) {
  return new Promise((resolve, reject) => {
    if (!username)
      return resolve({ "errors": "No username provided" });
    fetch(`https://www.funcraft.net/fr/joueurs?q=${username}`)
      .then(res => res.text())
      .then(body => {
        const clean = (val: string) => {
          if (val === "classement") {
            return "ranking";
          } else if (val === "défaites") {
            return "losses";
          } else if (val === "temps de jeu") {
            return "playtime";
          } else if (val === "morts") {
            return "deaths";
          } else if (val === "lits détruits") {
            return "destroyedBeds";
          } else if (val === "top 1") {
            return "top1";
          } else if (val === "dégats") {
            return "damage";
          } else if (val === "dégats au Nexus") {
            return "nexusDamage";
          } else if (val === "victoires") {
            return "wins";
          } else if (val.includes("ème")) {
            return val.replace("ème", "");
          } else if (val.includes(" ")) {
            return val.replace(" ", "");
          } else {
            return val;
          }
        };

        const toNumber = (n: string) => {
          if (n.match(/[a-z]/i)) {
            return n;
          } else if (!isNaN(parseInt(n))) {
            return parseInt(n).toLocaleString();
          } else if (n.includes(" ")) {
            if (!isNaN(parseInt(n))) {
              return parseInt(n).toLocaleString();
            }
          } else {
            return n;
          }
        };
        interface Data1{
          [key: string]: object
        }
          interface Data {
          "games": Data1
        }
        const data: Data = { games: {} };
        const $ = cheerio.load(body);
        if ($("div[class='container alert-container']").text().trim().includes("× Une ou plusieurs erreurs sont survenues :"))
          return resolve({ errors: "User does not have any information" });

        function formatTimeFuncraft(_date: string) {
          const date = _date.split(" ");
          var day = date[0];
          var year = date[2].replace(",", "");
          var time = date[3].replace("h", ":");
          time = moment(time, "hh:mm").format("hh:mm a");
          var month = "";
          switch (date[1]) {
            case "janvier":
              month = "January";
              break;
            case "février":
              month = "February";
              break;
            case "mars":
              month = "March";
              break;
            case "avril":
              month = "April";
              break;
            case "mai":
              month = "May";
              break;
            case "juin":
              month = "June";
              break;
            case "juillet":
              month = "July";
              break;
            case "aout":
              month = "August";
              break;
            case "septembre":
              month = "September";
              break;
            case "octobre":
              month = "October";
              break;
            case "novembre":
              month = "November";
              break;
            case "décembre":
              month = "December";
              break;
            default:
              month = date[1];
              break;
          }
          return `${day} ${month} ${year}, ${time}`;
        }

        const name = $(".playername").text().trim().split(" ")[1];
        const rank = $(".playername").text().trim().split(" ")[0];
        const gamesPlayed = Number($("div[class='lbl lbl-me']").text().trim().split(" ")[0]);
        const registration = formatTimeFuncraft($("span[class='tooltips']")[0].attribs.title);
        const lastLogin = formatTimeFuncraft($("span[class='tooltips']")[1].attribs.title);
        Object.assign(data, { name, rank, gamesPlayed, registration, lastLogin });
        $("div.col-md-4").each(function () {
          const stats = {};

          $(this).find("div.stats-entry").each(function () {
            Object.assign(stats, { [clean($(this).find("div.stats-name").text().trim().toLowerCase())]: Number(toNumber(clean($(this).find("div.stats-value-daily").text().trim()))?.replace(/-/g, "0")?.replace(/h|m|,| /g, "")) });
          });
          if (size(stats)) {
            data.games[$(this).find("div.name").text().trim().replace("Infecté", "Infected")] = stats;
          }
        });
        resolve(data);
      }).catch(e => {
        resolve({ errors: "Can't fetch stats, Website is probably offline." });
        console.log(e);
      });
  });
}
export function mineplex(username: string) {
  return new Promise((resolve, reject) => {
    if (!username)
      return resolve({ "errors": "No username provided" });
    fetch(`https://www.mineplex.com/players/${username}`)
      .then(res => res.text())
      .then(body => {
        const data = { games: [] };
        const $ = cheerio.load(body);
        const name = $(".www-mp-username").text().trim();
        const rank = $("span[class=\"www-mp-rank\"]").text().trim();
        const gamesPlayed = $("div[class='lbl lbl-me']").text().trim().split(" ")[0];
        Object.assign(data, { name, rank });
        $("div.col-md-4").each(function () {
          // const stats = {};
          // $(this).find("div.stats-entry").each(function () {
          //   Object.assign(stats, { [clean($(this).find("div.stats-name").text().trim().toLowerCase())]: toNumber(clean($(this).find("div.stats-value-daily").text().trim()))});
          // });
          // if (size(stats)) {
          //   data.games.push({
          //     game: $(this).find("div.name").text().trim(),
          //     stats
          //   });
          // }
        });
        resolve(data);
      }).catch(e => {
        resolve({ "errors": "Can't fetch stats, API is probably offline." });
        console.log(e);
      });
  });
}
export function manacube(username: string) {
  return new Promise((resolve, reject) => {
    if (!username)
      return resolve({ "errors": "No username provided" });
    fetch(`https://manacube.com/stats_data/fetch.php?username=${username}`)
      .then(res => res.json())
      .then(json => {
        if (json.exists === false)
          return resolve({ "errors": "User does not have any information" });
        interface Data1{
          [key: string]: object
        }
          interface Data {
          "games": Data1
        }
        const data: Data = { games: {} };
        Object.assign(data, {
          name: username,
          level: json.level ? json.level : 0,
          rank: json.rank ? json.rank : "none",
          firstLogin: json.firstSeen ? json.firstSeen : "Never",
          lastLogin: json.lastSeen ? json.lastSeen : "Never",
          cubits: json.cubits ? Number(json.cubits) : 0
        });

        if (json.parkour && json.parkour.playtime !== "n/a") {
          data.games.parkour = {
            playtime: json.parkour.playtime,
            mana: json.parkour.mana !== "n/a" ? Number(json.parkour.mana) : 0,
            score: json.parkour.score !== "n/a" ? Number(json.parkour.score) : 0,
            courses: json.parkour.courses !== "n/a" ? Number(json.parkour.courses) : 0,
          };
        }
        if (json.aztec && json.aztec.playtime !== "n/a") {
          data.games.aztec = {
            playtime: json.aztec.playtime,
            mobKills: json.aztec.mobKills !== "n/a" ? Number(json.aztec.mobKills) : 0,
            mana: json.aztec.mana !== "n/a" ? Number(json.aztec.mana) : 0,
            money: json.aztec.money !== "n/a" ? Number(json.aztec.money) : 0,
          };
        }
        if (json.oasis && json.oasis.playtime !== "n/a") {
          data.games.oasis = {
            playtime: json.oasis.playtime,
            mobKills: json.oasis.mobKills !== "n/a" ? Number(json.oasis.mobKills) : 0,
            mana: json.oasis.mana !== "n/a" ? Number(json.oasis.mana) : 0,
            money: json.oasis.money !== "n/a" ? Number(json.oasis.money) : 0,
          };
        }
        if (json.islands && json.islands.playtime !== "n/a") {
          data.games.islands = {
            playtime: json.islands.playtime,
            mobKills: json.islands.mobKills !== "n/a" ? Number(json.islands.mobKills) : 0,
            silver: json.islands.silver !== "n/a" ? Number(json.islands.silver) : 0,
            money: json.islands.money !== "n/a" ? Number(json.islands.money) : 0,
          };
        }
        if (json.survival && json.survival.playtime !== "n/a") {
          data.games.survival = {
            playtime: json.survival.playtime,
            mobKills: json.survival.mobKills !== "n/a" ? Number(json.survival.mobKills) : 0,
            quests: json.survival.quests !== "n/a" ? Number(json.survival.quests) : 0,
            money: json.survival.money !== "n/a" ? Number(json.survival.money) : 0,
          };
        }
        if (json.factions && json.factions.playtime !== "n/a") {
          data.games.factions = {
            playtime: json.factions.playtime,
            mobKills: json.factions.mobkills !== "n/a" ? Number(json.factions.mobkills) : 0,
            kills: json.factions.kills !== "n/a" ? Number(json.factions.kills) : 0,
            money: json.factions.money !== "n/a" ? Number(json.factions.money) : 0,
          };
        }
        if (json.aether && json.aether.playtime !== "n/a") {
          data.games.aether = {
            playtime: json.aether.playtime,
            miningLevel: json.aether.miningLevel !== "n/a" ? Number(json.aether.miningLevel) : 0,
            rebirths: json.aether.rebirths !== "n/a" ? Number(json.aether.rebirths) : 0,
            money: json.aether.money !== "n/a" ? Number(json.aether.money) : 0,
          };
        }
        if (json.atlas && json.atlas.playtime !== "n/a") {
          data.games.atlas = {
            playtime: json.atlas.playtime,
            miningLevel: json.atlas.miningLevel !== "n/a" ? Number(json.atlas.miningLevel) : 0,
            rebirths: json.atlas.rebirths !== "n/a" ? Number(json.atlas.rebirths) : 0,
            money: json.atlas.money !== "n/a" ? Number(json.atlas.money) : 0,
          };
        }
        if (json.creative && json.creative.playtime !== "n/a") {
          data.games.creative = {
            playtime: json.creative.playtime,
            blocksplaced: json.creative.blocksplaced !== "n/a" ? Number(json.creative.blocksplaced) : 0,
            blocksbroken: json.creative.blocksbroken !== "n/a" ? Number(json.creative.blocksbroken) : 0,
          };
        }
        if (json.kitpvp && json.kitpvp.playtime !== "n/a") {
          data.games.kitpvp = {
            playtime: json.kitpvp.playtime,
            level: json.kitpvp.level !== "n/a" ? Number(json.kitpvp.level) : 0,
            money: json.kitpvp.money !== "n/a" ? Number(json.kitpvp.money) : 0,
            kills: json.kitpvp.kills !== "n/a" ? Number(json.kitpvp.kills) : 0,
          };
        }
        resolve(data);
      }).catch(e => {
        resolve({ errors: "Can't fetch stats, API is probably offline." });
        console.log(e);
      });
  });
}
export function minesaga(username: string, quick: boolean) {
  return new Promise((resolve, reject) => {
    if (!username)
      return resolve({ "errors": "No username provided" });
    fetch(`https://www.minesaga.org/player/${username}`)
      .then(res => res.text())
      .then(async (body) => {
        interface Data1 {
          [key: string]: object
        }
        interface Data {
          games: Data1
        }
        const data: Data = { games: {} };

        const $ = cheerio.load(body);
        if ($("body").text().trim().includes("User not found"))
          return resolve({ errors: "User not found" });
        const name = $(".dd-profile-details h2").text().trim().split(" ")[0];
        const details = $(".dd-profile-details h4").text().split("\n");
        const rank = details[3].trim();
        const playtime = details[2].trim();
        const firstSeen = details[0].trim();
        const lastSeen = details[1].trim();
        const plus = details[4] && details[4].trim() === "Plus";
        const criminalRecord = $("div[class='dd-profile-records positive']").text();
        Object.assign(data, { name, rank, playtime, firstSeen, lastSeen, plus, criminalRecord });
        if (quick === true)
          return resolve(data);

        const games = $(".dd-profile-tab-control").text().trim().split("\n");
        for (let i = 0; i < games.length; i++) {
          const game = games[i].replace(/\s\s/g, "");
          if (game.length > 0) {
            const d = await fetch(`https://www.minesaga.org/player/${username}/${game}`).then(res => res.text());
            const $ = cheerio.load(d);
            const stats = {};
            $("div.dd-section").each(function () {
              $(this).find("div.dd-stats").each(function () {
                $(this).find("dt").each(function () {
                  Object.assign(stats, { [camelCase($(this).text().trim().toLowerCase())]: $(this).parent().find("dd").text().trim().toLowerCase() });
                });
              });
            });
            data.games[game.toLowerCase()] = stats;
          }
        }
        resolve(data);
      }).catch(e => {
        resolve({ errors: "Can't fetch stats, API is probably offline." });
        console.log(e);
      });
  });
}
export function gommehd(username: string) {
  return new Promise((resolve, reject) => {
    if (!username)
      return resolve({ "errors": "No username provided" });
    fetch(`https://www.gommehd.net/player/index?playerName=${username}`)
      .then(res => res.text())
      .then(async (body) => {
        interface Data {
          games: object[]
        }
        var data: Data = { games: [] };
        const $ = cheerio.load(body);
        if ($("body").text().trim().includes("User not found"))
          return resolve({ "errors": "User not found" });
        const name = $("div.user_info").text().trim().split(" ")[0];
        Object.assign(data, { name });
        $(".stat-table").each(function () {
          const stats = {};
          $(this).find("div.gametype-stats").each(function () {
            $(this).find("li").each(function () {
              Object.assign(stats, { [camelCase($(this).not(".score").text().trim().toLowerCase().split("\n")[2])]: $(this).not(".score").text().trim().toLowerCase().split("\n")[0] });
            });
          });
          data.games.push({
            game: $(this).find("div.map-content-wrap").text().trim().toLowerCase(),
            stats
          });
        });
        resolve(data);
      }).catch(e => {
        resolve({ "errors": "Can't fetch stats, API is probably offline." });
        console.log(e);
      });
  });
}
export function timolia(username: string) {
  return new Promise((resolve, reject) => {
    if (!username)
      return resolve({ "errors": "No username provided" });
    fetch(`https://www.timolia.de/stats/${username}`)
      .then(res => res.text())
      .then(async (body) => {

        const clean = (val: string) => {
          switch (val) {
            case "Spiele gespielt":
              return "games_played";
            case "Spiele gewonnen":
              return "games_won";
            case "Knapp gewonnen":
              return "barely_won";
            case "eZ gewonnen":
              return "easy_win";
            case "K/D":
              return "kill_death_ratio";
            case "W/L":
              return "win_loss_ratio";
            case "Punkte":
              return "points";
            case "Siege insg.":
              return "victories";
            case "Tode insgesamt":
              return "deaths";
            case "Meiste Kills pro Spiel":
              return "most_kills";
            case "Durchschnittsrang":
              return "rank";
            case "Rang":
              return "rank";
            case "Duelle gespielt":
              return "games_played";
            case "Duelle gewonnen":
              return "games_won";
            case "Insg. versucht":
              return "total_attempts";
            case "Insg. geschafft":
              return "total_made";
            case "Abgeschlossen":
              return "completed";
            case "Tagesieger beendet":
              return "jnrs_completed";
            case "Tagessieger insg.":
              return "total_jnrs_completed";
            case "JnRs veröffentlicht":
              return "jnrs_published";
            case "Gesammelte Favos":
              return "favors_collected";
            case "Getroffene Felder":
              return "fields_hit";
            case "Meist getroffene Felder":
              return "most_fields_hit";
            case "Flaggen erobert":
              return "flags_captured";
            case "Gold eingesammelt":
              return "gold_collected";
            case "Gold ausgegeben":
              return "gold_spent";
            case "Gold verloren":
              return "gold_lost";
            case "TNT verschossen":
              return "tnt_missed";
            case "Strukturen aufgebaut":
              return "structures_built";
            case "Meiste Zerstörung":
              return "most_destruction";
            case "Durchschnittszerstörung":
              return "average_destruction";
            case "Schnellster Sieg":
              return "fastest_win";
            case "Ausgegebene Zeit":
              return "time_spent";
            case "Dimensionsschwellen überwunden":
              return "thresholds_overcome";
            case "Blöcke platziert":
              return "blocks_placed";
            case "Blöcke zerstört":
              return "blocks_broken";
            case "Mittelfackeln abgebaut insgesamt":
              return "flares_broken";
            case "Produkte gekauft insgesamt":
              return "products_bought";
            case "Chips gekauft insgesamt":
              return "chips_bought";
            case "Materialienwerte ausgegeben insgesamt":
              return "meterials_spent";
            case "Turnierspiele gespielt":
              return "tournaments_played";
            case "Turnierspiele gewonnen":
              return "tournaments_won";
            case "1vs1":
              return "duels";
            case "TSpiele":
              return "tgames";
            case "Bestzeit":
              return "best_time";
            case "Durchschnittszeit":
              return "average_time";
            case "Die letzten 10 PvP-Kämpfe":
              return "recent_battles";
            default:
              return val.toLowerCase();
          }
        };
        interface Data1 {
          [key: string]: any
        }
        interface Data {
          totalWins: number, 
          totalKills: number, 
          totalDeaths: number, 
          totalGamesPlayed: number, 
          games: Data1
        }
        const data: Data = { totalWins: 0, totalKills: 0, totalDeaths: 0, totalGamesPlayed: 0, games: {} };
        const $ = cheerio.load(body);

        const name = $("h2#playername").text().trim();
        if (!name)
          return resolve({ errors: "User not found" });
        const rank = $(".stat-column td .label").not(".label-success").not(".label-danger").text().trim().replace(/Ranked/g, "");

        const calcFirstLogin = (input: string) => {
          var d = input.split(" ")[0];
          var t = input.split(" ")[1];
          var arr = d.split(".");
          return new Date(`${arr[2]}-${arr[1]}-${arr[0]}T${t}`);
        };

        const firstLogin = calcFirstLogin($("table.table tbody tr").children("td").text().split(rank)[1].split("\n")[0]);
        const friends = $("table.table tbody tr").children("td").text().split(rank)[1].split("\n")[1].trim();

        const recent_battles: string[] = [];
        Object.assign(data, { name, rank, firstLogin, friends });
        $(".stat-column").each(function () {
          const game = clean($(this).find("th.stat-header").text().trim()) || clean($(this).find("tr.stat-header").text().trim());
          if (game.length > 0) {
            data.games[game] = {};
            $(this).find("tbody").each(function () {
              if (game === "recent_battles") {
                data.games[game] = [];
                $(this).find("tr").each(function () {
                  $(this).find("td").each(function () {
                    const text = $(this).text().trim().replace(/vs\./g, "");
                    if (text.match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/))
                      recent_battles.push("newLine");
                    if (text.length > 0)
                      recent_battles.push(text);
                  });
                });
              }
              $(this).find(".stats-table-field").each(function () {
                const objName = clean($(this).find("td").not(".align-right").text());
                let objValue = Number($(this).find("td").last().text().replace("Sek.", "Seconds"));
                if (!isNaN(objValue))
                  objValue = Number(objValue);
                if (objName === "games_played")
                  data.totalGamesPlayed += objValue;
                if (objName === "games_won")
                  data.totalWins += objValue;
                if (objName === "kills")
                  data.totalKills += objValue;
                if (objName === "deaths")
                  data.totalDeaths += objValue;

                data.games[game][objName] = objValue;
              });
            });
          }
        });
        recent_battles.join(" ").split("newLine").forEach(i => {
          if (i.length > 0) {
            const e = i.split(" ");
            data.games.recent_battles.push({
              duration: e[1],
              type: e[2],
              map: e[3],
              fighter: e[4],
              opponent: e[5],
              kit: e[6],
              result: e[7].replace(/Verloren/, "loss").replace(/Gewonnen/, "win")
            });
          }
        });
        resolve(data);
      }).catch(e => {
        resolve({ "errors": "Can't fetch stats, Website is probably offline." });
        console.log(e);
      });
  });
}
export function veltpvp(username: string) {
  return new Promise(async (resolve, reject) => {
    if (!username)
      return resolve({ "errors": "No username provided" });
    fetch(`https://www.veltpvp.com/u/${username}`)
      .then(res => res.text())
      .then(async (body) => {
        const calcFirstLogin = (input: string) => {
          var arr = input.split("/");
          var final = new Date(`${arr[2]}-${arr[1]}-${arr[0]}`);
          return `${moment(final).format("MMM Do YYYY")} (${moment(final).fromNow()})`;
        };
        interface Data1 {
          [key: string]: object
        }
        interface Data {
          games: Data1
        }
        const data: Data = { games: {} };
        const $ = cheerio.load(body);
        if ($("body").text().trim().includes("not found"))
          return resolve({ errors: "User not found" });
        const name = $("h1#name").text().trim();
        let status = $("div.top").text().trim(); // offline/online/banned
        if (status.includes(" "))
          status = status.split(" ")[1].toLowerCase();
        let seen: string;
        if (status === "offline") {
          seen = $("div.bottom").text().trim().split("\n ")[0] + " " + $("div.bottom").text().trim().split("\n ")[1].trim();
        } else if (status === "online") {
          seen = $("div.bottom").text().trim();
        } else {
          seen = "";
        }
        const rank = $("div#profile h2").text().trim();
        const firstLogin = calcFirstLogin($("div.content strong").text().trim().substring(0, 10));
        Object.assign(data, { name, status, rank, firstLogin, seen });
        $(".server").each(function () {
          const stats = {};
          $(this).find("div.server-stat").each(function () {
            Object.assign(stats, { [camelCase($(this).find(".server-stat-description").text().trim().toLowerCase()).replace(/ /g, "_")]: Number($(this).find(".server-stat-number").text().trim().toLowerCase().replace("n/a", "0")) });
          });
          if ($(this).find(".server-header").text().trim().toLowerCase().length > 0)
            data.games[$(this).find(".server-header").text().trim().toLowerCase()] = stats;
        });
        resolve(data);
      }).catch(e => {
        if (e.statusCode === 404) {
          resolve({ errors: "User not found" });
        } else {
          console.log(e);
        }
      });
  });
}
export function universocraft(username: string) {
  return new Promise((resolve, reject) => {
    if (!username)
      return resolve({ "errors": "No username provided" });
    fetch(`https://stats.universocraft.com/stats.php?player=${username}`)
      .then(res => res.text())
      .then(async (body) => {
        interface Data1{
          [key: string]: object
        }
        interface Data {
          "games": Data1
        }
        const data: Data = { games: {} };
        const $ = cheerio.load(body);
        if ($("body").text().trim().includes("No se ha encontrado"))
          return resolve({ errors: "User not found" });
        const clean = (input: string) => {
          input = input.toUpperCase();
          if (input === "VICTORIAS") {
            return "wins";
          } else if (input === "ASESINATOS") {
            return "kills";
          } else if (input === "MUERTES") {
            return "deaths";
          } else if (input === "GOLES") {
            return "goals";
          } else if (input === "PARTIDAS JUGADAS") {
            return "matchesPlayed";
          } else if (input === "BLOQUES COLOCADOS") {
            return "placedBlocks";
          } else if (input === "BLOQUES DESTRUIDOS") {
            return "destroyedBlocks";
          } else if (input === "PROJECTILES LANZADOS") {
            return "launchedProjectiles";
          } else if (input === "PROJECTILES IMPACTADOS") {
            return "impactedProjectiles";
          } else if (input === "ASESINATOS FINALES") {
            return "finalKills";
          } else if (input === "CAMAS DESTRUIDAS") {
            return "destroyedBeds";
          } else if (input === "MUERTES FINALES") {
            return "finalDeaths";
          } else if (input === "CONSTRUCCIONES PERFECTAS") {
            return "perfectConstructions";
          } else if (input === "PERDIDAS") {
            return "losses";
          } else if (input === "VICTORIAS TOTALES") {
            return "totalWins";
          } else if (input === "VICTORIAS COMO CORREDOR") {
            return "winsAsBroker";
          } else if (input === "VICTORIAS COMO BESTIA") {
            return "winsAsBeast";
          } else if (input === "ASESINATO COMO CORREDOR") {
            return "killsAsBroker";
          } else if (input === "ASESINATO COMO BESTIA") {
            return "killsAsBeast";
          } else if (input === "PUNTAJE") {
            return "score";
          } else if (input === "ASESINATOS CON ARCO") {
            return "bowDeaths";
          } else if (input === "DISTANCIA MÁXIMA DE MUERTE CON ARCO") {
            return "maximumDistanceOfDeathWithArc";
          } else if (input === "LANAS COLOCADAS") {
            return "placedWool";
          } else if (input === "DAÑOS AL NEXUS") {
            return "damageToAlnexus";
          } else if (input === "DESTRUCCIONES DEL NEXUS") {
            return "nexusDestructions";
          } else if (input === "MENAS DESTRUIDAS") {
            return "meansDestroyed";
          } else if (input === "TRONCOS DESTRUIDOS") {
            return "trucksDestroyed";
          } else if (input === "HUEVOS ROTOS") {
            return "brokenEggs";
          } else {
            return camelCase(input);
          }
        };

        const name = $("div.player-info h1").text().trim();
        const rank = toProperCase($("div.player-rank").text().trim());
        let lastLogin = toProperCase($("div.player-description p").not("p strong").text().trim());
        lastLogin = lastLogin.replace(/ÚLtima Conexiónhace |ÚLtima Conexión /g, "");
        if (lastLogin === "Hace unos días...")
          lastLogin = "A few days ago";
        else if (lastLogin.includes("Horas."))
          lastLogin = lastLogin.replace("Horas.", "hours ago");
        if (lastLogin.includes("Segundos"))
          lastLogin = lastLogin.replace("Segundos", "seconds ago");
        if (lastLogin.includes("Minutos"))
          lastLogin = lastLogin.replace("Minutos", "minutes ago");
        if (lastLogin.includes("Unos Días..."))
          lastLogin = lastLogin.replace("Unos Días...", "A few days ago");
        lastLogin = lastLogin.replace("ago.", "ago");

        Object.assign(data, { name, rank, lastLogin });
        $("div.game").each(function () {
          const stats = {};

          if ($(this).find(".game-header-title").text().trim().toLowerCase() !== "thebridge") {
            $(this).find("div.game-content").each(function () {
              $(this).find(".game-stat").each(function () {
                Object.assign(stats, { [clean($(this).find(".game-stat-title").text().trim().toLowerCase())]: Number($(this).find(".game-stat-count").text().trim().toLowerCase()) });
              });
            });
            data.games[camelCase($(this).find(".game-header-title").text().trim().toLowerCase())] = stats;
          }

          if ($(this).find(".game-header-title").text().trim().toLowerCase() === "thebridge") {
            $(this).find("div.game-content").each(function () {
              const gamemode = {};
              let gameModeName: string, obj: { [x: number]: {}; };

              $(this).find("div#thebridgetotal").each(function () {
                gameModeName = "total";
                $(this).find(".game-stat").each(function () {
                  Object.assign(gamemode, { [clean($(this).find(".game-stat-title").text().trim().toLowerCase())]: Number($(this).find(".game-stat-count").text().trim().toLowerCase()) });
                });
                obj = { [gameModeName]: gamemode };
                Object.assign(stats, obj);
              });

              $(this).find("div#thebridgesolo").each(function () {
                gameModeName = "solo";
                $(this).find(".game-stat").each(function () {
                  Object.assign(gamemode, { [clean($(this).find(".game-stat-title").text().trim().toLowerCase())]: Number($(this).find(".game-stat-count").text().trim().toLowerCase()) });
                });
                obj = { [gameModeName]: gamemode };
                Object.assign(stats, obj);
              });

              $(this).find("div#thebridgedoubles").each(function () {
                gameModeName = "doubles";
                $(this).find(".game-stat").each(function () {
                  Object.assign(gamemode, { [clean($(this).find(".game-stat-title").text().trim().toLowerCase())]: Number($(this).find(".game-stat-count").text().trim().toLowerCase()) });
                });
                obj = { [gameModeName]: gamemode };
                Object.assign(stats, obj);
              });

              $(this).find("div#thebridgetriples").each(function () {
                gameModeName = "triples";
                $(this).find(".game-stat").each(function () {
                  Object.assign(gamemode, { [clean($(this).find(".game-stat-title").text().trim().toLowerCase())]: Number($(this).find(".game-stat-count").text().trim().toLowerCase()) });
                });
                obj = { [gameModeName]: gamemode };
                Object.assign(stats, obj);
              });
            });
            data.games[camelCase($(this).find(".game-header-title").text().trim().toLowerCase())] = stats;
          }
        });
        resolve(data);
      }).catch(e => {
        resolve({ errors: "Can't fetch stats, API is probably offline." });
        console.log(e);
      });
  });
}
export function hivemc(username: string, type: string) {
  return new Promise((resolve, reject) => {
    if (!username)
      return resolve({
        "errors": "No username provided"
      });
    if (!type)
      return resolve({
        "errors": "No query type provided"
      });
    if (!username) {
      return resolve({
        errors: "No username provided"
      });
    }
    if (!type) {
      return resolve({
        errors: "No query type provided"
      });
    }
    if (type === "profile") {
      fetch(`http://api.hivemc.com/v1/player/${username}`)
        .then(res => res.text())
        .then(async (_body) => {
          if (String(_body).includes("Sorry, the page you are looking for could not be found")) {
            return resolve({
              errors: "No data found for user: " + username
            });
          }
          const body = JSON.parse(_body);
          let achievements: number;
          const rank = body.modernRank.human || 0;
          const tokens = body.tokens || 0;
          const credits = body.credits || 0;
          const medals = body.medals || 0;
          const status = body.status.description || "None";
          const currentGame = body.status.game || "None";
          const firstLogin = body.firstLogin > 0 ? `${unix(body.firstLogin).format("MMM Do YYYY")} (${unix(body.firstLogin).fromNow()})` : "Never";
          const lastLogin = body.lastLogin > 0 ? `${unix(body.lastLogin).format("MMM Do YYYY")} (${unix(body.lastLogin).fromNow()})` : "Unknown";
          const lastLogout = body.lastLogout > 0 ? `${unix(body.lastLogout).format("MMM Do YYYY")} (${unix(body.lastLogout).fromNow()})` : "Unknown";
          if (body.achievements)
            achievements = Object.keys(body.achievements).length;
          else
            achievements = 0;
          resolve({ rank, tokens, credits, medals, status, currentGame, firstLogin, lastLogin, lastLogout, achievements });
        });
    }
    if (type === "SG") { // Survival games 1 - broken
      return resolve({ errors: `No ${type} data found for user: ${username}` });
      // fetch(`http://api.hivemc.com/v1/player/${username}/SG`)
      //   .then(res => res.text())
      //   .then(async body => {
      //     body = JSON.parse(_body);
      //     if (body.code === 404 && body.short === "noprofile") return resolve({ errors: `No ${type} data found for user: ${username}` });
      //     let achievements;
      //     const victories = body.victories || 0;
      //     const total_points = body.total_points || 0;
      //     const most_points = body.most_points || 0;
      //     const games_played = body.gamesplayed || 0;
      //     const crates_opened = body.cratesopened || 0;
      //     const death_matches = body.deathmatches || 0;
      //     const kills = body.kills || 0;
      //     const deaths = body.deaths || 0;
      //     const time_alive = convertSeconds(body.timealive) || "None";
      //     const first_win = body.firstwinday && body.firstwinday > 0 ? { date: moment.unix(body.firstwinday).format("MMM Do YYYY"), fromnow: moment.unix(body.firstwinday).fromNow() } : "Never";
      //     const first_game = body.firstlogin && body.firstlogin > 0 ? { date: moment.unix(body.firstlogin).format("MMM Do YYYY"), fromnow: moment.unix(body.firstlogin).fromNow() } : "Never";
      //     const last_game = body.lastlogin && body.lastlogin > 0 ? { date: moment.unix(body.lastlogin).format("MMM Do YYYY"), fromnow: moment.unix(body.lastlogin).fromNow() } : "Never";
      //     if (body.achievements) achievements = Object.keys(body.achievements).length;
      //     else achievements = 0;
      //     resolve({ victories, total_points, most_points, games_played, crates_opened, death_matches, kills, deaths, time_alive, first_win, first_game, last_game, achievements });
      //   });
    }
    if (type === "BP") { // block party
      fetch(`http://api.hivemc.com/v1/player/${username}/BP`)
        .then(res => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404 && body.short === "noprofile")
            return resolve({ errors: `No ${type} data found for user: ${username}` });
          let achievements: number;
          const games_played = body.games_played || 0;
          const total_kills = body.total_eliminations || 0;
          const total_placing = body.total_placing || 0;
          const total_points = body.total_points || 0;
          const victories = body.victories || 0;
          if (body.achievements)
            achievements = Object.keys(body.achievements).length;
          else
            achievements = 0;
          const title = body.title || "None";
          const first_game = body.firstLogin && body.firstLogin > 0 ? { date: unix(body.firstLogin).format("MMM Do YYYY"), fromnow: unix(body.firstLogin).fromNow() } : "Never";

          resolve({ games_played, total_kills, total_placing, total_points, victories, achievements, title, first_game });
        });
    }
    if (type === "CAI") { // Cowboys and Indians
      fetch(`http://api.hivemc.com/v1/player/${username}/CAI`)
        .then(res => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404 && body.short === "noprofile")
            return resolve({ errors: `No ${type} data found for user: ${username}` });
          let achievements: number;
          const total_points = body.total_points || 0;
          const captured = body.captured || 0;
          const captures = body.captures || 0;
          const catches = body.catches || 0;
          const caught = body.caught || 0;
          const games_played = body.gamesplayed || 0;
          const victories = body.victories || 0;
          if (body.achievements)
            achievements = Object.keys(body.achievements).length;
          else
            achievements = 0;
          const title = body.title || "None";
          const first_game = body.firstlogin && body.firstlogin > 0 ? { date: unix(body.firstlogin).format("MMM Do YYYY"), fromnow: unix(body.firstlogin).fromNow() } : "Never";
          const last_game = body.lastlogin && body.lastlogin > 0 ? { date: unix(body.lastlogin).format("MMM Do YYYY"), fromnow: unix(body.lastlogin).fromNow() } : "Never";

          resolve({ total_points, captured, captures, catches, caught, games_played, victories, title, first_game, last_game, achievements });
        });
    }
    if (type === "CR") { // Cranked
      fetch(`http://api.hivemc.com/v1/player/${username}/CR`)
        .then(res => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404 && body.short === "noprofile")
            return resolve({ errors: `No ${type} data found for user: ${username}` });
          let achievements: number;
          const total_points = body.total_points || 0;
          const victories = body.victories || 0;
          const kills = body.kills || 0;
          const deaths = body.deaths || 0;
          const rccat_count = body.rccat_count || 0;
          const rccat_kills = body.rccat_kills || 0;
          const airstrike_count = body.airstrike_count || 0;
          const airstrike_kills = body.airstrike_kills || 0;
          const sonicsquid_count = body.sonicsquid_count || 0;
          const sonicsquid_kills = body.sonicsquid_kills || 0;
          const first_game = body.firstlogin && body.firstlogin > 0 ? { date: unix(body.firstlogin).format("MMM Do YYYY"), fromnow: unix(body.firstlogin).fromNow() } : "Never";
          const last_game = body.lastlogin && body.lastlogin > 0 ? { date: unix(body.lastlogin).format("MMM Do YYYY"), fromnow: unix(body.lastlogin).fromNow() } : "Never";
          const games_played = body.gamesplayed || 0;
          if (body.achievements)
            achievements = Object.keys(body.achievements).length;
          else
            achievements = 0;
          const title = body.title || "None";

          resolve({ total_points, victories, kills, deaths, rccat_count, rccat_kills, airstrike_count, airstrike_kills, sonicsquid_count, sonicsquid_kills, last_game, first_game, games_played, achievements, title });
        });
    }
    if (type === "DR") { // Death run
      fetch(`http://api.hivemc.com/v1/player/${username}/DR`)
        .then(res => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404 && body.short === "noprofile")
            return resolve({ errors: `No ${type} data found for user: ${username}` });
          let achievements: number;
          const total_points = body.total_points || 0;
          const victories = body.victories || 0;
          const kills = body.kills || 0;
          const deaths = body.deaths || 0;
          const games_played = body.games_played || 0;
          const title = body.title || "None";
          const traps_activated = body.trapsactivated || 0;
          const runner_games_played = body.runnergamesplayed || 0;
          const death_games_played = body.deathgamesplayed || 0;
          const total_checkpoints = body.totalcheckpoints || 0;
          const runner_wins = body.runnerwins || 0;
          const death_wins = body.deathwins || 0;
          if (body.achievements)
            achievements = Object.keys(body.achievements).length;
          else
            achievements = 0;
          const first_game = body.firstlogin && body.firstlogin > 0 ? { date: unix(body.firstlogin).format("MMM Do YYYY"), fromnow: unix(body.firstlogin).fromNow() } : "Never";
          const last_game = body.lastlogin && body.lastlogin > 0 ? { date: unix(body.lastlogin).format("MMM Do YYYY"), fromnow: unix(body.lastlogin).fromNow() } : "Never";

          resolve({ total_points, victories, kills, deaths, games_played, title, traps_activated, runner_games_played, death_games_played, total_checkpoints, runner_wins, death_wins, achievements, last_game, first_game });
        });
    }

    if (type === "HB") { // The Herobrine
      fetch(`http://api.hivemc.com/v1/player/${username}/HB`)
        .then(res => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404 && body.short === "noprofile")
            return resolve({ errors: `No ${type} data found for user: ${username}` });
          let achievements: number;
          const captures = body.captures || 0;
          const kills = body.kills || 0;
          const deaths = body.deaths || 0;
          const points = body.points || 0;
          const title = body.title || "None";
          const active_classes = body.active_classes || 0;
          if (body.achievements)
            achievements = Object.keys(body.achievements).length;
          else
            achievements = 0;
          const first_game = body.firstlogin && body.firstlogin > 0 ? { date: unix(body.firstlogin).format("MMM Do YYYY"), fromnow: unix(body.firstlogin).fromNow() } : "Never";

          resolve({ captures, kills, deaths, points, active_classes, achievements, title, first_game });
        });
    }

    if (type === "HERO") { // SG:heros
      fetch(`http://api.hivemc.com/v1/player/${username}/HERO`)
        .then(res => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404 && body.short === "noprofile")
            return resolve({ errors: `No ${type} data found for user: ${username}` });
          let achievements: number;
          const total_points = body.total_points || 0;
          const victories = body.victories || 0;
          const kills = body.kills || 0;
          const deaths = body.deaths || 0;
          const one_vs_one_wins = body.one_vs_ones_wins || 0;
          const games_played = body.games_played || 0;
          const death_matches = body.deathmatches || 0;
          const tnt_used = body.tnt_used || 0;
          const crates_opened = body.crates_opened || 0;
          const food_consumed = body.food_consumed || 0;
          const first_game = body.firstlogin && body.firstlogin > 0 ? { date: unix(body.firstlogin).format("MMM Do YYYY"), fromnow: unix(body.firstlogin).fromNow() } : "Never";
          const last_game = body.lastlogin && body.lastlogin > 0 ? { date: unix(body.lastlogin).format("MMM Do YYYY"), fromnow: unix(body.lastlogin).fromNow() } : "Never";
          if (body.achievements)
            achievements = Object.keys(body.achievements).length;
          else
            achievements = 0;

          resolve({ total_points, victories, kills, deaths, one_vs_one_wins, games_played, death_matches, tnt_used, crates_opened, food_consumed, first_game, last_game, achievements });
        });
    }

    if (type === "HIDE") { // Hide and seek
      fetch(`http://api.hivemc.com/v1/player/${username}/HIDE`)
        .then(res => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404 && body.short === "noprofile")
            return resolve({ errors: `No ${type} data found for user: ${username}` });
          let achievements: number;
          const total_points = body.total_points || 0;
          const victories = body.victories || 0;
          const hider_kills = body.hiderkills || 0;
          const seeker_kills = body.seekerkills || 0;
          const deaths = body.deaths || 0;
          const games_played = body.gamesplayed || 0;
          const time_alive = convertSeconds(body.timealive) || 0;
          var most_used_blocks = Object.keys(body.blockExperience).sort(function (a, b) { return body.blockExperience[b] - body.blockExperience[a]; });
          most_used_blocks = most_used_blocks.slice(0, 5);
          const first_game = body.firstlogin && body.firstlogin > 0 ? { date: unix(body.firstlogin).format("MMM Do YYYY"), fromnow: unix(body.firstlogin).fromNow() } : "Never";
          const last_game = body.lastlogin && body.lastlogin > 0 ? { date: unix(body.lastlogin).format("MMM Do YYYY"), fromnow: unix(body.lastlogin).fromNow() } : "Never";
          if (body.achievements)
            achievements = Object.keys(body.achievements).length;
          else
            achievements = 0;

          resolve({ total_points, victories, hider_kills, seeker_kills, deaths, games_played, time_alive, most_used_blocks, first_game, last_game, achievements });
        });
    }

    if (type === "OITC") { // One In The Chanber
      fetch(`http://api.hivemc.com/v1/player/${username}/OITC`)
        .then(res => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404 && body.short === "noprofile")
            return resolve({ errors: `No ${type} data found for user: ${username}` });
          let achievements: number;
          const total_points = body.total_points || 0;
          const victories = body.victories || 0;
          const kills = body.kills || 0;
          const deaths = body.deaths || 0;
          const arrows_fired = body.arrowsfired || 0;
          const games_played = body.gamesplayed || 0;
          const title = body.title || "None";
          const first_game = body.firstlogin && body.firstlogin > 0 ? { date: unix(body.firstlogin).format("MMM Do YYYY"), fromnow: unix(body.firstlogin).fromNow() } : "Never";
          const last_game = body.lastlogin && body.lastlogin > 0 ? { date: unix(body.lastlogin).format("MMM Do YYYY"), fromnow: unix(body.lastlogin).fromNow() } : "Never";
          if (body.achievements)
            achievements = Object.keys(body.achievements).length;
          else
            achievements = 0;

          resolve({ total_points, victories, kills, deaths, arrows_fired, games_played, title, first_game, last_game, achievements });
        });
    }

    if (type === "SP") { // Splegg
      fetch(`http://api.hivemc.com/v1/player/${username}/SP`)
        .then(res => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404 && body.short === "noprofile")
            return resolve({ errors: `No ${type} data found for user: ${username}` });
          let achievements: number;
          const victories = body.victories || 0;
          const games_played = body.gamesplayed || 0;
          const eggs_fired = body.eggsfired || 0;
          const blocks_destroyed = body.blocksdestroyed || 0;
          const deaths = body.deaths || 0;
          const points = body.points || 0;
          const time_alive = convertSeconds(body.timealive) || 0;
          const title = body.title || "None";
          const first_game = body.firstlogin && body.firstlogin > 0 ? { date: unix(body.firstlogin).format("MMM Do YYYY"), fromnow: unix(body.firstlogin).fromNow() } : "Never";
          const last_game = body.lastlogin && body.lastlogin > 0 ? { date: unix(body.lastlogin).format("MMM Do YYYY"), fromnow: unix(body.lastlogin).fromNow() } : "Never";
          if (body.achievements)
            achievements = Object.keys(body.achievements).length;
          else
            achievements = 0;

          resolve({ victories, games_played, eggs_fired, blocks_destroyed, deaths, points, time_alive, title, first_game, last_game, achievements });
        });
    }

    if (type === "TIMV") { // Trouble in Mineville
      fetch(`http://api.hivemc.com/v1/player/${username}/TIMV`)
        .then(res => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404 && body.short === "noprofile")
            return resolve({ errors: `No ${type} data found for user: ${username}` });
          let achievements: number;
          const total_points = body.total_points || 0;
          const most_points = body.most_points || 0;
          const role_points = body.role_points || 0;
          const traitor_points = body.t_points || 0;
          const detective_points = body.d_points || 0;
          const innocent_points = body.i_points || 0;
          const title = body.title || "None";
          const last_game = body.lastlogin && body.lastlogin > 0 ? { date: unix(body.lastlogin).format("MMM Do YYYY"), fromnow: unix(body.lastlogin).fromNow() } : "Never";
          if (body.achievements)
            achievements = Object.keys(body.achievements).length;
          else
            achievements = 0;

          resolve({ total_points, most_points, role_points, traitor_points, detective_points, innocent_points, title, last_game, achievements });
        });
    }

    if (type === "SKY") { // Skywars - broken
      return resolve({ errors: `No ${type} data found for user: ${username}` });
      // fetch(`http://api.hivemc.com/v1/player/${username}/SKY`)
      //   .then(res => res.text())
      //   .then(async body => {
      //     body = JSON.parse(_body);
      //     if (body.code === 404 && body.short === "noprofile") return resolve({ errors: `No ${type} data found for user: ${username}` });
      //     let achievements;
      //     const total_points = body.total_points || 0;
      //     const victories = body.victories || 0;
      //     const games_played = body.gamesplayed || 0;
      //     const kills = body.kills || 0;
      //     const deaths = body.deaths || 0;
      //     const most_points = body.most_points || 0;
      //     const time_alive = convertSeconds(body.timealive) || 0;
      //     const title = body.title || "None";
      //     const first_game = body.firstLogin && body.firstLogin > 0 ? { date: moment.unix(body.firstLogin).format("MMM Do YYYY"), fromnow: moment.unix(body.firstLogin).fromNow() } : "Never";
      //     const last_game = body.lastlogin && body.lastlogin > 0 ? { date: moment.unix(body.lastlogin).format("MMM Do YYYY"), fromnow: moment.unix(body.lastlogin).fromNow() } : "Never";
      //     if (body.achievements) achievements = Object.keys(body.achievements).length;
      //     else achievements = 0;
      //     resolve({ total_points, victories, games_played, kills, deaths, most_points, time_alive, title, first_game, last_game, achievements });
      //   });
    }

    if (type === "DRAW") { // Draw it
      fetch(`http://api.hivemc.com/v1/player/${username}/DRAW`)
        .then(res => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404 && body.short === "noprofile")
            return resolve({ errors: `No ${type} data found for user: ${username}` });
          let achievements: number;
          const total_points = body.total_points || 0;
          const victories = body.victories || 0;
          const games_played = body.gamesplayed || 0;
          const correct_guesses = body.correct_guesses || 0;
          const incorrect_guesses = body.incorrect_guesses || 0;
          const skips = body.skips || 0;
          const title = body.title || "None";
          const first_game = body.firstLogin && body.firstLogin > 0 ? { date: unix(body.firstLogin).format("MMM Do YYYY"), fromnow: unix(body.firstLogin).fromNow() } : "Never";
          if (body.achievements)
            achievements = Object.keys(body.achievements).length;
          else
            achievements = 0;

          resolve({ total_points, victories, games_played, correct_guesses, incorrect_guesses, skips, title, first_game, achievements });
        });
    }

    if (type === "SLAP") { // Slaparoo
      fetch(`http://api.hivemc.com/v1/player/${username}/SLAP`)
        .then(res => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404 && body.short === "noprofile")
            return resolve({ errors: `No ${type} data found for user: ${username}` });
          const victories = body.victories || 0;
          const games_played = body.gamesplayed || 0;
          const kills = body.kills || 0;
          const deaths = body.deaths || 0;
          const points = body.points || 0;
          const title = body.title || "None";
          const first_game = body.firstlogin && body.firstlogin > 0 ? { date: unix(body.firstlogin).format("MMM Do YYYY"), fromnow: unix(body.firstlogin).fromNow() } : "Never";
          const last_game = body.lastlogin && body.lastlogin > 0 ? { date: unix(body.lastlogin).format("MMM Do YYYY"), fromnow: unix(body.lastlogin).fromNow() } : "Never";

          resolve({ victories, games_played, kills, deaths, points, title, first_game, last_game });
        });
    }

    if (type === "EF") { // Electric Floor
      fetch(`http://api.hivemc.com/v1/player/${username}/EF`)
        .then(res => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404 && body.short === "noprofile")
            return resolve({ errors: `No ${type} data found for user: ${username}` });
          const victories = body.victories || 0;
          const outlived = body.outlived || 0;
          const games_played = body.gamesplayed || 0;
          const points = body.points || 0;
          const blocks_activated = body.blocksactivated || 0;
          const title = body.title || "None";
          const first_game = body.firstlogin && body.firstlogin > 0 ? { date: unix(body.firstlogin).format("MMM Do YYYY"), fromnow: unix(body.firstlogin).fromNow() } : "Never";
          const last_game = body.lastlogin && body.lastlogin > 0 ? { date: unix(body.lastlogin).format("MMM Do YYYY"), fromnow: unix(body.lastlogin).fromNow() } : "Never";

          resolve({ victories, outlived, games_played, points, blocks_activated, title, first_game, last_game });
        });
    }
    if (type === "MM") { // Music Masters
      fetch(`http://api.hivemc.com/v1/player/${username}/MM`)
        .then(res => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404 && body.short === "noprofile")
            return resolve({ errors: `No ${type} data found for user: ${username}` });
          const victories = body.victories || 0;
          const correct_notes = body.correctnotes || 0;
          const incorrect_notes = body.incorrectnotes || 0;
          const games_played = body.gamesplayed || 0;
          const points = body.points || 0;
          const notes_perfect = body.notes_perfect || 0;
          const notes_good = body.notes_good || 0;
          const title = body.title || "None";
          const first_game = body.firstlogin && body.firstlogin > 0 ? { date: unix(body.firstlogin).format("MMM Do YYYY"), fromnow: unix(body.firstlogin).fromNow() } : "Never";
          const last_game = body.lastlogin && body.lastlogin > 0 ? { date: unix(body.lastlogin).format("MMM Do YYYY"), fromnow: unix(body.lastlogin).fromNow() } : "Never";

          resolve({ victories, correct_notes, incorrect_notes, games_played, points, notes_perfect, notes_good, title, first_game, last_game });
        });
    }

    if (type === "GRAV") { // Gravity
      fetch(`http://api.hivemc.com/v1/player/${username}/GRAV`)
        .then(res => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404 && body.short === "noprofile")
            return resolve({ errors: `No ${type} data found for user: ${username}` });
          const victories = body.victories || 0;
          const games_played = body.gamesplayed || 0;
          const points = body.points || 0;
          var top_maps = Object.keys(body.maprecords).sort(function (a, b) { return body.maprecords[b] - body.maprecords[a]; });
          top_maps = top_maps.slice(0, 5);
          const title = body.title || "None";
          const first_game = body.firstlogin && body.firstlogin > 0 ? { date: unix(body.firstlogin).format("MMM Do YYYY"), fromnow: unix(body.firstlogin).fromNow() } : "Never";
          const last_game = body.lastlogin && body.lastlogin > 0 ? { date: unix(body.lastlogin).format("MMM Do YYYY"), fromnow: unix(body.lastlogin).fromNow() } : "Never";

          resolve({ victories, games_played, points, top_maps, title, first_game, last_game });
        });
    }

    if (type === "RR") { // Restaurant Rush
      fetch(`http://api.hivemc.com/v1/player/${username}/RR`)
        .then(res => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404 && body.short === "noprofile")
            return resolve({ errors: `No ${type} data found for user: ${username}` });
          let achievements: number;
          const victories = body.victories || 0;
          const tables_cleared = body.tablescleared || 0;
          const games_played = body.gamesplayed || 0;
          const highscore = body.highscore || 0;
          const points = body.points || 0;
          const first_game = body.firstlogin && body.firstlogin > 0 ? { date: unix(body.firstlogin).format("MMM Do YYYY"), fromnow: unix(body.firstlogin).fromNow() } : "Never";
          const last_game = body.lastlogin && body.lastlogin > 0 ? { date: unix(body.lastlogin).format("MMM Do YYYY"), fromnow: unix(body.lastlogin).fromNow() } : "Never";
          if (body.achievements)
            achievements = Object.keys(body.achievements).length;
          else
            achievements = 0;

          resolve({ victories, tables_cleared, highscore, games_played, points, first_game, last_game, achievements });
        });
    }
    if (type === "GNT") { // SkyGiants
      fetch(`http://api.hivemc.com/v1/player/${username}/GNT`)
        .then(res => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404 && body.short === "noprofile")
            return resolve({ errors: `No ${type} data found for user: ${username}` });
          const total_points = body.total_points || 0;
          const victories = body.victories || 0;
          const games_played = body.games_played || 0;
          const kills = body.kills || 0;
          const deaths = body.deaths || 0;
          const gold_earned = body.gold_earned || 0;
          const beasts_slain = body.beasts_slain || 0;
          const shutdowns = body.shutdowns || 0;
          const title = body.title || "None";
          const first_game = body.firstLogin && body.firstLogin > 0 ? { date: unix(body.firstLogin).format("MMM Do YYYY"), fromnow: unix(body.firstLogin).fromNow() } : "Never";
          const last_game = body.lastlogin && body.lastlogin > 0 ? { date: unix(body.lastlogin).format("MMM Do YYYY"), fromnow: unix(body.lastlogin).fromNow() } : "Never";

          resolve({ total_points, victories, games_played, kills, deaths, gold_earned, beasts_slain, shutdowns, title, first_game, last_game });
        });
    }

    if (type === "SGN") { // Survival Games 2 - broken
      return resolve({ errors: `No ${type} data found for user: ${username}` });
      // fetch(`http://api.hivemc.com/v1/player/${username}/SGN`)
      //   .then(res => res.text())
      //   .then(async body => {
      //     body = JSON.parse(_body);
      //     if (body.code === 404 && body.short === "noprofile") return resolve({ errors: `No ${type} data found for user: ${username}` });
      //     const victories = body.victories || 0;
      //     const total_points = body.total_points || 0;
      //     const most_points = body.most_points || 0;
      //     const games_played = body.games_played || 0;
      //     const crates_opened = body.crates_opened || 0;
      //     const death_matches = body.deathmatches || 0;
      //     const kills = body.kills || 0;
      //     const deaths = body.deaths || 0;
      //     const first_game = body.firstLogin && body.firstLogin > 0 ? { date: moment.unix(body.firstLogin).format("MMM Do YYYY"), fromnow: moment.unix(body.firstLogin).fromNow() } : "Never";
      //     const last_game = body.lastlogin && body.lastlogin > 0 ? { date: moment.unix(body.lastlogin).format("MMM Do YYYY"), fromnow: moment.unix(body.lastlogin).fromNow() } : "Never";
      //     resolve({ victories, total_points, most_points, games_played, crates_opened, death_matches, kills, deaths, first_game, last_game });
      //   });
    }

    if (type === "BD") { // BatteryDash
      fetch(`http://api.hivemc.com/v1/player/${username}/BD`)
        .then(res => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404 && body.short === "noprofile")
            return resolve({ errors: `No ${type} data found for user: ${username}` });
          const total_points = body.total_points || 0;
          const games_played = body.games_played || 0;
          const kills = body.kills || 0;
          const deaths = body.deaths || 0;
          const energy_collected = body.energy_collected || 0;
          const batteries_charged = body.batteries_charged || 0;
          const title = body.title || "None";
          const first_game = body.firstLogin && body.firstLogin > 0 ? { date: unix(body.firstLogin).format("MMM Do YYYY"), fromnow: unix(body.firstLogin).fromNow() } : "Never";
          const last_game = body.lastlogin && body.lastlogin > 0 ? { date: unix(body.lastlogin).format("MMM Do YYYY"), fromnow: unix(body.lastlogin).fromNow() } : "Never";

          resolve({ total_points, games_played, kills, deaths, energy_collected, batteries_charged, title, first_game, last_game });
        });
    }

    if (type === "SPL") { // Sploop
      fetch(`http://api.hivemc.com/v1/player/${username}/SPL`)
        .then(res => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404 && body.short === "noprofile")
            return resolve({ errors: `No ${type} data found for user: ${username}` });
          let achievements: number;
          const total_points = body.total_points || 0;
          const victories = body.victories || 0;
          const games_played = body.games_played || 0;
          const kills = body.kills || 0;
          const deaths = body.deaths || 0;
          const blocks_painted = body.blocks_painted || 0;
          const ultimates_earned = body.ultimates_earned;
          var booster_blocks_painted: any;
          var booster_kills: any;
          var booster_deaths: any;
          var booster_ulimate_kills: any;
          var booster_games_played: any;
          var raven_blocks_painted: any;
          var raven_kills: any;
          var raven_deaths: any;
          var raven_ulimate_kills: any;
          var raven_games_played: any;
          var torstein_blocks_painted: any;
          var torstein_kills: any;
          var torstein_deaths: any;
          var torstein_ulimate_kills: any;
          var torstein_games_played: any;
          var oinky_blocks_painted: any;
          var oinky_kills: any;
          var oinky_deaths: any;
          var oinky_ulimate_kills: any;
          var oinky_games_played: any;

          if (body.character_stats) {
            if (body.character_stats.BoosterCharacter) {
              booster_blocks_painted = body.character_stats.BoosterCharacter.blocks_painted || 0;
              booster_kills = body.character_stats.BoosterCharacter.kills || 0;
              booster_deaths = body.character_stats.BoosterCharacter.deaths || 0;
              booster_ulimate_kills = body.character_stats.BoosterCharacter.ultimate_kills || 0;
              booster_games_played = body.character_stats.BoosterCharacter.games_played || 0;
            }
            if (body.character_stats.RavenCharacter) {
              raven_blocks_painted = body.character_stats.RavenCharacter.blocks_painted || 0;
              raven_kills = body.character_stats.RavenCharacter.kills || 0;
              raven_deaths = body.character_stats.RavenCharacter.deaths || 0;
              raven_ulimate_kills = body.character_stats.RavenCharacter.ultimate_kills || 0;
              raven_games_played = body.character_stats.RavenCharacter.games_played || 0;
            }
            if (body.character_stats.TorsteinCharacter) {
              torstein_blocks_painted = body.character_stats.TorsteinCharacter.blocks_painted || 0;
              torstein_kills = body.character_stats.TorsteinCharacter.kills || 0;
              torstein_deaths = body.character_stats.TorsteinCharacter.deaths || 0;
              torstein_ulimate_kills = body.character_stats.TorsteinCharacter.ultimate_kills || 0;
              torstein_games_played = body.character_stats.TorsteinCharacter.games_played || 0;
            }
            if (body.character_stats.OinkyCharacter) {
              oinky_blocks_painted = body.character_stats.OinkyCharacter.blocks_painted || 0;
              oinky_kills = body.character_stats.OinkyCharacter.kills || 0;
              oinky_deaths = body.character_stats.OinkyCharacter.deaths || 0;
              oinky_ulimate_kills = body.character_stats.OinkyCharacter.ultimate_kills || 0;
              oinky_games_played = body.character_stats.OinkyCharacter.games_played || 0;
            }
          }
          const title = body.title || "None";
          const first_game = body.firstLogin && body.firstLogin > 0 ? { date: unix(body.firstLogin).format("MMM Do YYYY"), fromnow: unix(body.firstLogin).fromNow() } : "Never";
          const last_game = body.lastlogin && body.lastlogin > 0 ? { date: unix(body.lastlogin).format("MMM Do YYYY"), fromnow: unix(body.lastlogin).fromNow() } : "Never";
          if (body.achievements)
            achievements = Object.keys(body.achievements).length;
          else
            achievements = 0;

          resolve({ total_points, victories, games_played, kills, deaths, blocks_painted, ultimates_earned, booster_blocks_painted, booster_kills, booster_deaths, booster_ulimate_kills, booster_games_played, raven_blocks_painted, raven_kills, raven_deaths, raven_ulimate_kills, raven_games_played, torstein_blocks_painted, torstein_kills, torstein_deaths, torstein_ulimate_kills, torstein_games_played, oinky_blocks_painted, oinky_kills, oinky_deaths, oinky_ulimate_kills, oinky_games_played, title, first_game, last_game, achievements });
        });
    }

    if (type === "MIMV") { // Murder In MineVille
      fetch(`http://api.hivemc.com/v1/player/${username}/MIMV`)
        .then(res => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404 && body.short === "noprofile")
            return resolve({ errors: `No ${type} data found for user: ${username}` });
          let achievements: number;
          const total_points = body.total_points || 0;
          const games_played = body.games_played || 0;
          const victories = body.victories || 0;
          const kills = body.kills || 0;
          const deaths = body.deaths || 0;
          const title = body.title || "None";
          const first_game = body.firstLogin && body.firstLogin > 0 ? { date: unix(body.firstLogin).format("MMM Do YYYY"), fromnow: unix(body.firstLogin).fromNow() } : "Never";
          const last_game = body.lastlogin && body.lastlogin > 0 ? { date: unix(body.lastlogin).format("MMM Do YYYY"), fromnow: unix(body.lastlogin).fromNow() } : "Never";
          if (body.achievements)
            achievements = Object.keys(body.achievements).length;
          else
            achievements = 0;

          resolve({ total_points, games_played, victories, kills, deaths, title, first_game, last_game, achievements });
        });
    }

    if (type === "BED") { // Bedwars
      fetch(`http://api.hivemc.com/v1/player/${username}/BED`)
        .then(res => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404 && body.short === "noprofile")
            return resolve({ errors: `No ${type} data found for user: ${username}` });
          let achievements: number;
          const total_points = body.total_points || 0;
          const victories = body.victories || 0;
          const games_played = body.games_played || 0;
          const kills = body.kills || 0;
          const deaths = body.deaths || 0;
          const beds_destroyed = body.beds_destroyed || 0;
          const teams_eliminated = body.teams_eliminated || 0;
          const win_streak = body.win_streak || 0;
          const title = body.title || "None";
          const first_game = body.firstLogin && body.firstLogin > 0 ? { date: unix(body.firstLogin).format("MMM Do YYYY"), fromnow: unix(body.firstLogin).fromNow() } : "Never";
          const last_game = body.lastlogin && body.lastlogin > 0 ? { date: unix(body.lastlogin).format("MMM Do YYYY"), fromnow: unix(body.lastlogin).fromNow() } : "Never";
          if (body.achievements)
            achievements = Object.keys(body.achievements).length;
          else
            achievements = 0;

          resolve({ total_points, games_played, victories, kills, deaths, beds_destroyed, teams_eliminated, win_streak, title, first_game, last_game, achievements });
        });
    }
    if (type === "leaderboards") {
      fetch(`http://api.hivemc.com/v1/game/${username}/leaderboard/`)
        .then(res => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404)
            return resolve({ errors: body.message });
          resolve(body.leaderboard);
        });
    }
  });
}
export function wynncraft(type: string, name: string) {
  return new Promise((resolve, reject) => {
    if (!name)
      return resolve({
        errors: "No username or guild name provided"
      });
    if (!type)
      return resolve({
        errors: "No type provided"
      });
    if (type === "player") {
      fetch(`https://api.wynncraft.com/v2/player/${name}/stats`)
        .then(res => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404 || (body.code === 400 && body.message === "Bad Request") || body.data.length === 0) {
            return resolve({
              errors: `No player data found for user: ${name}`
            });
          }
          interface Data1 {
            [key: string]: any,
          }
          interface Data {
            "classes": Data1,
            "ranking": {},
          }
          const data: Data = {
            classes: {},
            ranking: {}
          };
          const player = body.data[0];
          const role = player.rank || "Unknown";
          const first_login = player.meta.firstJoin || "Unknown";
          const last_login = player.meta.lastJoin || "Unknown";
          const online = player.meta.location.online || false;
          const location = player.meta.location.server || "Unknown";
          const play_time = _duration(player.meta.playtime, "minutes").format("D [days], H [hours], M [minutes]") || "Unknown";
          const rank = player.meta.tag.value || "None";
          const veteran = player.meta.veteran || false;
          const guild_name = player.guild.name || "Unknown";
          const guild_rank = player.guild.rank || "Unknown";
          const chests_found = player.global.chestsFound || 0;
          const items_identified = player.global.itemsIdentified || 0;
          const mobs_killed = player.global.mobsKilled || 0;
          const combat_level = player.global.totalLevel.combat || 0;
          const profession_level = player.global.totalLevel.profession || 0;
          const combined_level = player.global.totalLevel.combined || 0;
          const players_killed = player.global.pvp.kills || 0;
          const player_deaths = player.global.pvp.deaths || 0;
          const blocks_walked = player.global.blocksWalked || 0;
          const logins = player.global.logins || 0;
          const deaths = player.global.deaths || 0;
          const discoveries = player.global.discoveries || 0;
          const events_won = player.global.eventsWon || 0;

          if (player.classes) {
            player.classes.forEach(async (i: { name: string; level: number; chestsFound: number; itemsIdentified: number; mobsKilled: number; pvp: { kills: number; deaths: number; }; blocksWalked: number; logins: number; deaths: number; playtime: moment.DurationInputArg1; discoveries: number; eventsWon: number; gamemode: string; skills: { strength: number; dexterity: number; intelligence: number; defence: number; agility: number; }; professions: { alchemism: number; armouring: number; combat: number; cooking: number; farming: number; fishing: number; jeweling: number; mining: number; scribing: number; tailoring: number; weaponsmithing: number; woodcutting: number; woodworking: number; }; dungeons: { completed: number; list: any[]; }; quests: { completed: number; list: string; }; }) => {
              const name = i.name.replace(/[0-9]+/g, "") || "None";
              const level = i.level || 0;
              const chests_found = i.chestsFound || 0;
              const items_identified = i.itemsIdentified || 0;
              const mobs_killed = i.mobsKilled || 0;
              const players_killed = i.pvp.kills || 0;
              const player_deaths = i.pvp.deaths || 0;
              const blocks_walked = i.blocksWalked || 0;
              const logins = i.logins || 0;
              const deaths = i.deaths || 0;
              const playtime = _duration(i.playtime, "minutes").format("D [days], H [hours], M [minutes]") || 0;
              const discoveries = i.discoveries || 0;
              const events_won = i.eventsWon || 0;
              const gamemode = i.gamemode || "None";
              const skill_strength = i.skills.strength || 0;
              const skill_dexterity = i.skills.dexterity || 0;
              const skill_intelligence = i.skills.intelligence || 0;
              const skill_defence = i.skills.defence || 0;
              const skill_agility = i.skills.agility || 0;
              const profession_alchemism = i.professions.alchemism || 0;
              const profession_armouring = i.professions.armouring || 0;
              const profession_combat = i.professions.combat || 0;
              const profession_cooking = i.professions.cooking || 0;
              const profession_farming = i.professions.farming || 0;
              const profession_fishing = i.professions.fishing || 0;
              const profession_jeweling = i.professions.jeweling || 0;
              const profession_mining = i.professions.mining || 0;
              const profession_scribing = i.professions.scribing || 0;
              const profession_tailoring = i.professions.tailoring || 0;
              const profession_weaponsmithing = i.professions.weaponsmithing || 0;
              const profession_woodcutting = i.professions.woodcutting || 0;
              const profession_woodworking = i.professions.woodworking || 0;
              const dungeons_completed = i.dungeons.completed || 0;
              var dungeons: { name: any; completed: any; }[] = [];
              const quests_completed = i.quests.completed || 0;
              const quests = i.quests.list || "None";
              i.dungeons.list.forEach((dungeon: { name: any; completed: any; }) => {
                dungeons.push({
                  name: dungeon.name,
                  completed: dungeon.completed
                });
              });
              if (!data.classes[name])
                data.classes[name] = [];
              data.classes[name].push({ name, level, chests_found, items_identified, mobs_killed, players_killed, player_deaths, blocks_walked, logins, deaths, playtime, discoveries, events_won, gamemode, skill_strength, skill_dexterity, skill_intelligence, skill_defence, skill_agility, profession_alchemism, profession_armouring, profession_farming, profession_combat, profession_cooking, profession_fishing, profession_jeweling, profession_mining, profession_scribing, profession_tailoring, profession_weaponsmithing, profession_woodcutting, profession_woodworking, dungeons_completed, dungeons, quests_completed, quests });
            });
          }
          if (player.ranking) {
            const guild_ranking = player.ranking.guild || 0;
            const pvp_ranking = player.ranking.pvp || 0;
            const solo_combat_ranking = player.ranking.player.solo.combat || 0;
            const solo_woodcutting_ranking = player.ranking.player.solo.woodcutting || 0;
            const solo_mining_ranking = player.ranking.player.solo.mining || 0;
            const solo_fishing_ranking = player.ranking.player.solo.fishing || 0;
            const solo_farming_ranking = player.ranking.player.solo.farming || 0;
            const solo_alchemism_ranking = player.ranking.player.solo.alchemism || 0;
            const solo_armouring_ranking = player.ranking.player.solo.armouring || 0;
            const solo_cooking_ranking = player.ranking.player.solo.cooking || 0;
            const solo_jeweling_ranking = player.ranking.player.solo.jeweling || 0;
            const solo_scribing_ranking = player.ranking.player.solo.scribing || 0;
            const solo_tailoring_ranking = player.ranking.player.solo.tailoring || 0;
            const solo_weaponsmithing_ranking = player.ranking.player.solo.weaponsmithing || 0;
            const solo_woodworking_ranking = player.ranking.player.solo.woodworking || 0;
            const solo_profession_ranking = player.ranking.player.solo.profession || 0;
            const solo_overall_ranking = player.ranking.player.solo.overall || 0;
            const overall_ranking = player.ranking.player.overall.all || 0;
            const overall_combat_ranking = player.ranking.player.overall.combat || 0;
            const overall_profession_ranking = player.ranking.player.overall.profession || 0;

            Object.assign(data.ranking, { guild_ranking, pvp_ranking, solo_combat_ranking, solo_woodcutting_ranking, solo_mining_ranking, solo_fishing_ranking, solo_farming_ranking, solo_alchemism_ranking, solo_armouring_ranking, solo_cooking_ranking, solo_jeweling_ranking, solo_scribing_ranking, solo_tailoring_ranking, solo_weaponsmithing_ranking, solo_woodworking_ranking, solo_profession_ranking, solo_overall_ranking, overall_ranking, overall_combat_ranking, overall_profession_ranking });
          }
          Object.assign(data, { role, first_login, last_login, online, location, play_time, rank, veteran, guild_name, guild_rank, chests_found, items_identified, mobs_killed, combat_level, profession_level, combined_level, players_killed, player_deaths, blocks_walked, logins, deaths, discoveries, events_won });
          resolve(data);
        });
    }
    if (type === "guild") {
      fetch(`https://api.wynncraft.com/public_api.php?action=guildStats&command=${name}`)
        .then(res => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.error === "Guild not found")
            return resolve({
              "errors": `No guild data found for guild: ${name}`
            });
          const data = {};
          const _name = body.name || "None";
          const prefix = body.prefix || "None";
          const xp = body.xp || 0;
          const level = body.level || 0;
          const created = body.created || "Unknown";
          const territories = body.territories || 0;
          const banner = body.banner ? body.banner : null;
          if (body.members) {
            const members = body.members.length;
            const guild_owner = body.members.filter((guild: { rank: string; }) => guild.rank == "OWNER");
            const guild_chief = body.members.filter((guild: { rank: string; }) => guild.rank == "CHIEF");
            const guild_recruit = body.members.filter((guild: { rank: string; }) => guild.rank == "RECRUIT");
            const guild_captain = body.members.filter((guild: { rank: string; }) => guild.rank == "CAPTAIN");
            const guild_recruiter = body.members.filter((guild: { rank: string; }) => guild.rank == "RECRUITER");
            Object.assign(data, { members, guild_owner, guild_chief, guild_recruit, guild_captain, guild_recruiter });
          }
          Object.assign(data, { _name, prefix, xp, level, created, territories, banner });
          resolve(data);
        });
    }
  });
}
export function munchymc(query: string, type: string) {
  if (type === "leaderboard") {
    return new Promise((resolve, reject) => {
      fetch(`https://www.munchymc.com/leaderboards/${query}`)
        .then(res => res.text())
        .then(body => {
          interface Leaderboard {
            [key: string]: string
          }
          interface Data {
              [key: string]: Leaderboard[]
          }
          const data: Data = {};
          const $ = cheerio.load(body);

          $($("div.col-md-4").length > 0 ? "div.col-md-4" : "div.col-md-6").each(function () {
            const leaderboard = $(this).find("div.caption-stats").text().trim().replace(/ /g, "");
            if (leaderboard.length > 0) {
              $(this).find(".list-group-item").each(function () {
                const stat = $(this).text().trim().replace(/\s\s /g, "").replace(/#[0-9]{1,2} {1,3}/, "").replace(/ {2}/, " ").split(/ /);
                data[leaderboard].push({ username: stat[0], value: stat[1] });
              });
            }
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
      fetch(`https://www.munchymc.com/profile/${query}`)
        .then(res => res.text())
        .then(body => {

          // const data: object = { games: {} };
          const $ = cheerio.load(body);
          if ($("div.col-md-12").text().includes("Looks like we couldn't find that name in our database!")) {
            return resolve({
              "errors": `No inforamtion was found for ${query}`
            });
          }
          const details: string[] = [];
          const statistics: any[] = [];

          $("div[class=\"panel panel-success\"]").each(function () {
            $(this).find("li").each(function () {
              details.push(($(this).text().trim().replace(/(\s){2,}/g, "")));
            });
          });
          $("span[class=\"badge\"]").each(function () {
            statistics.push(($(this).text().trim().replace(/\s*/g, "")));
          });

          const data = {
            rank: details[0].replace("Rank: ", ""),
            status: details[1].replace("Status:", ""),
            tokens: details[2].replace("Tokens:", ""),
            firstLogin: details[3].replace("Joined: ", ""),
            lastLogin: details[4].replace("Last Login: ", ""),
            games: {
              woolwars: {
                wins: Number(statistics[0]) || 0,
                games: Number(statistics[1]) || 0,
                kills: Number(statistics[2]) || 0
              },
              skywars: {
                wins: Number(statistics[4]) || 0,
                games: Number(statistics[5]) || 0,
                kills: Number(statistics[6]) || 0,
                deaths: Number(statistics[7]) || 0,
              },
              mazerunner: {
                wins: Number(statistics[8]) || 0,
                games: Number(statistics[9]) || 0,
                kills: Number(statistics[10]) || 0,
                princess_kills: Number(statistics[11]) || 0,
              },
              classic_hungergames: {
                wins: Number(statistics[12]) || 0,
                games: Number(statistics[13]) || 0,
                kills: Number(statistics[14]) || 0,
                most_kills: Number(statistics[15]) || 0,
              },
              kitpvp: {
                best_kill_streak: Number(statistics[16]) || 0,
                casual: {
                  kills: Number(statistics[18]) || 0,
                  deaths: Number(statistics[19]) || 0
                },
                competitive: {
                  kills: Number(statistics[21]) || 0,
                  deaths: Number(statistics[22]) || 0
                },
                arena: {
                  kills: Number(statistics[24]) || 0,
                  deaths: Number(statistics[25]) || 0,
                  elo: Number(statistics[26]) || 0
                },
                brackets: {
                  games: Number(statistics[28]) || 0,
                  wins: Number(statistics[29]) || 0
                }
              },
              prison: {
                blocks_mined: Number(statistics[34]) || 0,
                balance: Number(statistics[35]) || 0,
                kills: Number(statistics[36]) || 0,
                best_kill_streak: Number(statistics[37]) || 0,
              }
            }
          }
          return resolve(data);
        }).catch(e => {
          resolve({ errors: "Can't fetch stats, Website is probably offline." });
          console.log(e);
        });
    });
  }
}
export function mccentral(query: string, type: string) {
  if (type === "leaderboard") {
    return new Promise((resolve, reject) => {
      function mccentralLeaderboardName(leaderboard: any) {
        switch (leaderboard) {
          case "survivalgames":
            return "fsurvival";
          case "skywars":
            return "fskywars";
          case "walls":
            return "fwalls";
          case "ctf":
            return "fctf";
          case "murdermayhem":
            return "fmurder";
          case "championbuilder":
            return "fchaps";
          case "cakewars":
            return "fcakewars";
          case "uhc":
            return "uhcserver";
          case "skyblock1":
            return "sbNewReset1";
          case "skyblock2":
            return "sbNewReset2";
          case "survival":
            return "survival";
          case "factions":
            return "facs";
          case "prison1":
            return "prison";
          case "prison2":
            return "prison2";
          case "kitpvp":
            return "nkitpvp";
          case "arenapvp":
            return "arenapvp2";
        }
      }
      const leaderboardName = mccentralLeaderboardName(query);
      if (!leaderboardName)
        return resolve({ errors: "Invaid game leaderboard." });
      fetch(`https://mccentral.org/leaderboards-storage/leader/scripts/${leaderboardName}.php?sEcho=1&iColumns=6&sColumns=&iDisplayStart=0&iDisplayLength=25&mDataProp_0=0&mDataProp_1=1&mDataProp_2=2&mDataProp_3=3&mDataProp_4=4&mDataProp_5=5&sSearch=&bRegex=false&sSearch_0=&bRegex_0=false&bSearchable_0=true&sSearch_1=&bRegex_1=false&bSearchable_1=true&sSearch_2=&bRegex_2=false&bSearchable_2=true&sSearch_3=&bRegex_3=false&bSearchable_3=true&sSearch_4=&bRegex_4=false&bSearchable_4=true&sSearch_5=&bRegex_5=false&bSearchable_5=true&iSortCol_0=0&sSortDir_0=asc&iSortingCols=1&bSortable_0=false&bSortable_1=false&bSortable_2=false&bSortable_3=false&bSortable_4=false&bSortable_5=false`)
        .then(res => res.json())
        .then(body => {
          const data: object[]= [];
          if (body.aaData.length > 0) {
            body.aaData.forEach((i: any[]) => {
              switch (leaderboardName) {
                case "fsurvival":
                  data.push({
                    username: i[1],
                    games: Number(i[2]),
                    wins: Number(i[3]),
                    kills: Number(i[4]),
                    deaths: Number(i[5]),
                  });
                case "fskywars":
                  data.push({
                    username: i[1],
                    games: Number(i[2]),
                    wins: Number(i[3]),
                    kills: Number(i[4]),
                    deaths: Number(i[5]),
                  });
                case "fwalls":
                  data.push({
                    username: i[1],
                    games: Number(i[2]),
                    wins: Number(i[3]),
                    kills: Number(i[4]),
                    deaths: Number(i[5]),
                  });        
                case "fctf":
                  data.push({
                    username: i[1],
                    games: Number(i[2]),
                    wins: Number(i[3]),
                    kills: Number(i[4]),
                    deaths: Number(i[5]),
                    flags_captured: Number(i[6]),
                  });
                case "fmurder":
                  data.push({
                    username: i[1],
                    games: Number(i[2]),
                    wins: Number(i[3]),
                    murderer_kills: Number(i[4]),
                    bystander_kills: Number(i[5]),
                    karma: Number(i[6]),
                  });
                case "fchaps":
                  data.push({
                    username: i[1],
                    blocks_placed: i[2],
                    blocks_broken: i[3],
                    wins: Number(i[4]),
                    games: Number(i[5]),
                  });
                case "fcakewars":
                  data.push({
                    username: i[1],
                    games: Number(i[2]),
                    wins: Number(i[3]),
                    kills: Number(i[4]),
                    deaths: Number(i[5]),
                    cakes_destroyed: Number(i[6]),
                  });
                case "uhcserver":
                  data.push({
                    username: i[1],
                    wins: Number(i[2]),
                    kills: Number(i[3]),
                    deaths: Number(i[4]),
                    gapples: Number(i[5]),
                  });
                case "sbNewReset1":
                  data.push({
                    username: i[1],
                    level: i[2],
                    value: i[3],
                    hoppers: Number(i[4]),
                    spawners: i[5],
                  });
                case "sbNewReset2":
                  data.push({
                    username: i[1],
                    level: i[2],
                    value: i[3],
                    hoppers: Number(i[4]),
                    spawners: i[5],
                  });
                case "survival":
                  data.push({
                    username: i[1],
                    balance: i[2],
                    kills: Number(i[3]),
                    deaths: Number(i[4]),
                    quests: Number(i[5]),
                  });
                case "facs":
                  data.push({
                    username: i[1],
                    wealth: i[2],
                    spawners: Number(i[3]),
                  });
                case "prison":
                  data.push({
                    username: i[1],
                    prison: i[2],
                    kills: Number(i[3]),
                    deaths: Number(i[4]),
                    blocks_mined: i[5],
                    gang: i[6],
                  });
                case "prison2":
                  data.push({
                    username: i[1],
                    prison: i[2],
                    kills: Number(i[3]),
                    deaths: Number(i[4]),
                    blocks_mined: i[5],
                    gang: i[6],
                  });
                case "nkitpvp":
                  data.push({
                    username: i[1],
                    kills: Number(i[2]),
                    deaths: Number(i[3]),
                    level: Number(i[4]),
                    gapples: Number(i[5]),
                    events_won: Number(i[6]),
                  });
                case "arenapvp2":
                  data.push({
                    username: i[1],
                    duels: Number(i[2]),
                    duels_won: Number(i[3]),
                    win_ratio: i[4],
                    duels_rank: i[5]
                  });
              }
            });
            resolve(data);
          } else {
            return resolve({ errors: "No leaderboards found." });
          }
        }).catch(e => {
          resolve({ errors: "Can't fetch stats, Website is probably offline." });
          console.log(e);
        });
    });
  }
  if (type === "player") {
    return new Promise(async (resolve, reject) => {
      interface Game {
        [key: string]: {}
      }
      interface PlayerData {
        [key: string]: Game,
      }
      const data: PlayerData = {}
      const games = ["fsurvival", "fskywars", "fwalls", "fctf", "fmurder", "fchamps", "fcakewars", "uhcserver", "sbNewReset1", "sbNewReset2", "survival", "facs", "prison", "prison2", "nkitpvp", "arenapvp2"];
      for (let i = 0; i < games.length; i++) {
        await fetch(`https://mccentral.org/leaderboards-storage/leader/scripts/${games[i]}.php?sSearch=${query}&bRegex=false&sSearch_0=&bRegex_0=false&bSearchable_0=true&sSearch_1=&bRegex_1=false&bSearchable_1=true&sSearch_2=&bRegex_2=false&bSearchable_2=true&sSearch_3=&bRegex_3=false&bSearchable_3=true&sSearch_4=&bRegex_4=false&bSearchable_4=true&sSearch_5=&bRegex_5=false&bSearchable_5=true&iSortCol_0=0&sSortDir_0=asc&iSortingCols=1&bSortable_0=false&bSortable_1=false&bSortable_2=false&bSortable_3=false&bSortable_4=false&bSortable_5=false`)
          .then(res => res.json())
          .then(body => {
            if (body.aaData.length > 0 && body.aaData[0][1].toLowerCase() === query.toLowerCase()) {
              switch (games[i]){
              case"fsurvival":
                data.survival_games.rank = Number(body.aaData[0][0]);
                data.survival_games.games = Number(body.aaData[0][2]);
                data.survival_games.wins = Number(body.aaData[0][3]);
                data.survival_games.kills = Number(body.aaData[0][4]);
                data.survival_games.deaths = Number(body.aaData[0][5]);
              
              case "fskywars":
                data.skywars.rank = Number(body.aaData[0][0]);
                data.skywars.games = Number(body.aaData[0][2]);
                data.skywars.wins = Number(body.aaData[0][3]);
                data.skywars.kills = Number(body.aaData[0][4]);
                data.skywars.deaths = Number(body.aaData[0][5]);
              
              case "fwalls":
                data.walls.rank = Number(body.aaData[0][0]);
                data.walls.games = Number(body.aaData[0][2]);
                data.walls.wins = Number(body.aaData[0][3]);
                data.walls.kills = Number(body.aaData[0][4]);
                data.walls.deaths = Number(body.aaData[0][5]);
              case "fctf":
                data.ctf.rank = Number(body.aaData[0][0]);
                data.ctf.games = Number(body.aaData[0][2]);
                data.ctf.wins = Number(body.aaData[0][3]);
                data.ctf.kills = Number(body.aaData[0][4]);
                data.ctf.deaths = Number(body.aaData[0][5]);
                data.ctf.flags_captured = Number(body.aaData[0][6]);
              
              case "fmurder":
                data.murder.rank = Number(body.aaData[0][0]);
                data.murder.games = Number(body.aaData[0][2]);
                data.murder.wins = Number(body.aaData[0][3]);
                data.murder.murderer_kills = Number(body.aaData[0][4]);
                data.murder.bystander_kills = Number(body.aaData[0][5]);
                data.murder.karma = Number(body.aaData[0][6]);
              
              case"fchamps":
                data.champs.rank = Number(body.aaData[0][0]);
                data.champs.blocks_placed = body.aaData[0][2];
                data.champs.blocks_broken = body.aaData[0][3];
                data.champs.wins = Number(body.aaData[0][4]);
                data.champs.games = Number(body.aaData[0][5]);
              
              case"fcakewars":
                data.cakewars.rank = Number(body.aaData[0][0]);
                data.cakewars.games = Number(body.aaData[0][2]);
                data.cakewars.wins = Number(body.aaData[0][3]);
                data.cakewars.kills = Number(body.aaData[0][4]);
                data.cakewars.deaths = Number(body.aaData[0][5]);
                data.cakewars.cakes_destroyed = Number(body.aaData[0][6]);
              
              case "uhcserver":
                data.uhc.rank = Number(body.aaData[0][0]);
                data.uhc.wins = Number(body.aaData[0][2]);
                data.uhc.kills = Number(body.aaData[0][3]);
                data.uhc.deaths = Number(body.aaData[0][4]);
                data.uhc.gapples = Number(body.aaData[0][5]);
              
              case "sbNewReset1":
                data.skyblock1.rank = Number(body.aaData[0][0]);
                data.skyblock1.level = body.aaData[0][2];
                data.skyblock1.value = body.aaData[0][3];
                data.skyblock1.hoppers = Number(body.aaData[0][4]);
                data.skyblock1.spawners = body.aaData[0][5];
              
              case "sbNewReset2":
                data.skyblock2.rank = Number(body.aaData[0][0]);
                data.skyblock2.level = body.aaData[0][2];
                data.skyblock2.value = body.aaData[0][3];
                data.skyblock2.hoppers = Number(body.aaData[0][4]);
                data.skyblock2.spawners = body.aaData[0][5];
              
              case "survival":
                data.survival.rank = Number(body.aaData[0][0]);
                data.survival.balance = body.aaData[0][2];
                data.survival.kills = Number(body.aaData[0][3]);
                data.survival.deaths = Number(body.aaData[0][4]);
                data.survival.quests = Number(body.aaData[0][5]);
              
                case "factions":
                data.factions.rank = Number(body.aaData[0][0]);
                data.factions.wealth = body.aaData[0][2];
                data.factions.spawners = Number(body.aaData[0][3]);
              
              case "prison":
                data.prison1.rank = Number(body.aaData[0][0]);
                data.prison1.prison = body.aaData[0][2];
                data.prison1.kills = Number(body.aaData[0][3]);
                data.prison1.deaths = Number(body.aaData[0][4]);
                data.prison1.blocks_mined = body.aaData[0][5];
                data.prison1.gang = body.aaData[0][6];
              
              case "prison2":
                data.prison2.rank = Number(body.aaData[0][0]);
                data.prison2.prison = body.aaData[0][2];
                data.prison2.kills = Number(body.aaData[0][3]);
                data.prison2.deaths = Number(body.aaData[0][4]);
                data.prison2.blocks_mined = body.aaData[0][5];
                data.prison2.gang = body.aaData[0][6];
              
              case "nkitpvp":
                data.kitpvp.rank = Number(body.aaData[0][0]);
                data.kitpvp.kills = Number(body.aaData[0][2]);
                data.kitpvp.deaths = Number(body.aaData[0][3]);
                data.kitpvp.level = Number(body.aaData[0][4]);
                data.kitpvp.gapples = Number(body.aaData[0][5]);
                data.kitpvp.events_won = Number(body.aaData[0][6]);
              
              case "arenapvp2":
                data.arenapvp.rank = Number(body.aaData[0][0]);
                data.arenapvp.duels = Number(body.aaData[0][2]);
                data.arenapvp.duels_won = Number(body.aaData[0][3]);
                data.arenapvp.win_ratio = body.aaData[0][4];
                data.arenapvp.duels_rank = body.aaData[0][5];
            }}
          }).catch(e => {
            resolve({ errors: "Can't fetch stats, Website is probably offline." });
            console.log(e);
          });
      }
      return resolve(data);
    });
  }
}
