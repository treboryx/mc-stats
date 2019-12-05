const fetch = require("node-fetch"); // Main http module
const cheerio = require("cheerio");
const keys = require("../keys.json");
const moment = require("moment");
const cloudscraper = require("cloudscraper"); // This package bypasses cloudflare anti-bot page, which is needed in some cases
const omitEmpty = require("omit-empty"); // really cool package that checks for empty proterties in objects
require("moment-duration-format");
require("tls").DEFAULT_ECDH_CURVE = "auto";

String.prototype.toProperCase = function () {
  return this.replace(/([^\W_]+[^\s-]*) */g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
};

Object.size = (obj) => {
  var size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

const camelCase = (val) => {
  if (val.includes(" ")) {
    const t = val.split(" ");
    const res = [];
    res.push(t[0]);
    for (let k = 1; t.length > k; k++) {
      res.push(t[k].toProperCase());
    }
    return res.join("");
  } else {
    return val;
  }
};

function convert_seconds (seconds) {
  return (
    Math.floor(seconds / 1440) + "D " +
    Math.floor(((seconds / 1440) % 1) * 24) + "H " +
    Math.floor(((seconds / 60) % 1) * 60) + "M ");
}

module.exports = {
  blocksmc: (username) => { // completed
    return new Promise((resolve, reject) => {
      fetch(`https://blocksmc.com/player/${username}`)
        .then(res => res.text())
        .then(body => {
          const data = { games: [] };
          const $ = cheerio.load(body);
          const name = $(".profile-header h1").text().trim();
          const rank = $(".profile-rank").text().replace("\n", "").trim();
          const timePlayed = $("h1[dir=ltr]").text().replace("\n", "").trim();
          Object.assign(data, { name, rank, timePlayed });
          $("div.col-xl-4").each(function () {
            const stats = {};
            $(this).find("li").each(function () {
              Object.assign(stats, { [$(this).find("div.key").text()]: $(this).find("div.val").text() });
            });
            data.games.push({
              game: $(this).find("div.title").text()
                .trim(),
              stats
            });
          });
          if (!name) return resolve({ errors: "User not found" });
          resolve(data);
        }).catch(e => {
          resolve({ "errors": "Can't fetch stats, API is probably offline." });
          console.log(e);
        });
    });
  },

  hypixelPlayer: async (username, key) => { // completed
    return new Promise((resolve, reject) => {
      const hypixelLevel = (exp) => {
        const i = -3.5;
        const j = 12.25;
        const k = 0.0008;
        return exp < 0 ? 1 : Math.floor(1 + i + Math.sqrt(j + k * exp));
      };

      fetch(`https://api.hypixel.net/player?key=${key}&name=${username}`)
        .then(res => res.json())
        .then(async json => {
          if (!json.player) return resolve({ errors: "User not found" });
          const res = {
            "status": 1568288492518 < Date.now() ? "offline" : "online",
            "name": json.player.displayname,
            "rank": json.player.rank ? json.player.rank : null,
            "level": hypixelLevel(json.player.networkExp),
            "exp": json.player.networkExp,
            "karma": json.player.karma ? json.player.karma : null,
            "votes": json.player.voting ? json.player.voting.total : 0,
            "achievements": Object.size(json.player.achievements),
            "completedParkours": Object.size(json.player.parkourCompletions),
            "lastGame": json.player.mostRecentGameType,
            "firstLogin": `${moment(json.player.firstLogin).format("MMM Do YYYY")} (${moment(json.player.firstLogin).fromNow()})`,
            "lastLogin": `${moment(json.player.lastLogin).format("MMM Do YYYY")} (${moment(json.player.lastLogin).fromNow()})`,
            "lastLogout": `${moment(json.player.lastLogout).format("MMM Do YYYY")} (${moment(json.player.lastLogout).fromNow()})`,
            "socialMedia": json.player.socialMedia ? json.player.socialMedia.links : null
          };
          resolve(res);
        }).catch(e => {
          resolve({ "errors": "Can't fetch stats, API is probably offline." });
          console.log(e);
        });
    });
  },

  hypixelLevel: (exp) => { // completed
    const i = -3.5;
    const j = 12.25;
    const k = 0.0008;
    return exp < 0 ? 1 : Math.floor(1 + i + Math.sqrt(j + k * exp));
  },

  hypixelWatchdog: async (key) => { // completed
    return new Promise((resolve, reject) => {
      fetch(`https://api.hypixel.net/watchdogstats?key=${key}`)
        .then(res => res.json())
        .then(async json => {
          resolve(json);
        }).catch(e => {
          resolve({ "errors": "Can't fetch stats, API is probably offline." });
          console.log(e);
        });
    });
  },

  hypixelBoosters: async (key) => {
    return new Promise((resolve, reject) => {
      const getGametype = {
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
        .then(async json => {
          // console.log(json)
          if (!json.success) return resolve({ "errors": "There are no active boosters" });
          const arr = [];
          json.boosters.forEach(async e => {
            // const username = await fetch(`https://api.mojang.com/user/profiles/${e.purchaserUuid}/names`).then(res => res.json());
            const entry = {
              game: getGametype[e.gameType],
              // purchaser: username[username.length - 1] ? username[username.length - 1].name :  e.purchaserUuid,
              multiplier: `x${e.amount}`,
              remaining: moment.duration(e.length, "seconds").format(" m [mins], s [secs]"),
              originalLength: moment.duration(e.originalLength, "seconds").format(" m [mins], s [secs]"),
              activated: `${moment(e.dateActivated).format("MMM Do YYYY")} (${moment(e.dateActivated).fromNow()})`
            };
            arr.push(entry);
          });
          resolve(arr);
        });
    });
  },

  hypixelKey: async (key) => { // completed
    return new Promise((resolve, reject) => {
      fetch(`https://api.hypixel.net/key?key=${key}`)
        .then(res => res.json())
        .then(async json => {
          resolve(json);
        }).catch(e => {
          resolve({ "errors": "Can't fetch stats, API is probably offline." });
          console.log(e);
        });
    });
  },

  funcraft: (username) => { // completed
    return new Promise((resolve, reject) => {
      if (!username) return resolve({ "errors": "No username provided" });
      fetch(`https://www.funcraft.net/fr/joueurs?q=${username}`)
        .then(res => res.text())
        .then(body => {

          const clean = (val) => {
            if (val == "classement") {
              return "ranking";
            } else if (val == "défaites") {
              return "losses";
            } else if (val == "temps de jeu") {
              return "playtime";
            } else if (val == "morts") {
              return "deaths";
            } else if (val == "lits détruits") {
              return "destroyedBeds";
            } else if (val == "top 1") {
              return "top1";
            } else if (val == "dégats") {
              return "damage";
            } else if (val == "dégats au Nexus") {
              return "nexusDamage";
            } else if (val == "victoires") {
              return "wins";
            } else if (val.includes("ème")) {
              return val.replace("ème", "");
            } else if (val.includes(" ")) {
              return val.replace(" ", "");
            } else {
              return val;
            }
          };

          const toNumber = (n) => {
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
          const data = { games: [] };
          const $ = cheerio.load(body);
          const name = $(".playername").text().trim().split(" ")[1];
          const rank = $(".playername").text().trim().split(" ")[0];
          const gamesPlayed = $("div[class='lbl lbl-me']").text().trim().split(" ")[0];
          Object.assign(data, { name, rank, gamesPlayed });
          $("div.col-md-4").each(function () {
            const stats = {};
            $(this).find("div.stats-entry").each(function () {
              Object.assign(stats, { [clean($(this).find("div.stats-name").text().trim().toLowerCase())]: toNumber(clean($(this).find("div.stats-value-daily").text().trim())) });
            });
            if (Object.size(stats)) {
              data.games.push({
                game: $(this).find("div.name").text().trim(),
                stats
              });
            }
          });
          resolve(data);
        }).catch(e => {
          resolve({ "errors": "Can't fetch stats, API is probably offline." });
          console.log(e);
        });
    });
  },

  mineplex: (username) => { // incomplete
    return new Promise((resolve, reject) => {
      if (!username) return resolve({ "errors": "No username provided" });
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
            // if (Object.size(stats)) {
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
  },

  manacube: (username) => { // completed
    return new Promise((resolve, reject) => {
      if (!username) return resolve({ "errors": "No username provided" });
      fetch(`https://manacube.com/stats_data/fetch.php?username=${username}`)
        .then(res => res.json())
        .then(json => {
          const data = { games: [] };
          Object.assign(data, {
            "name": username,
            "level": json.level,
            "rank": json.rank ? json.rank : "none",
            "firstLogin": `${moment(json.firstSeen).format("MMM Do YYYY")} (${moment(json.firstSeen).fromNow()})`,
            "lastLogin": `${moment(json.lastSeen).format("MMM Do YYYY")} (${moment(json.lastSeen).fromNow()})`,
          });
          const allowed = [];
          Object.keys(json).forEach((key) => {
            if (json[key].playtime) {
              if (json[key].playtime !== "n/a" && json[key].playtime !== null && json[key].playtime !== "0 mins") allowed.push(key);
            }
          });
          const filtered = Object.keys(json)
            .filter(key => allowed.includes(key))
            .reduce((obj, key) => {
              obj[key] = json[key];
              return obj;
            }, {});
          data.games.push(filtered);
          resolve(data);
        }).catch(e => {
          resolve({ "errors": "Can't fetch stats, API is probably offline." });
          console.log(e);
        });
    });
  },

  minesaga: (username) => { // completed
    return new Promise((resolve, reject) => {
      if (!username) return resolve({ "errors": "No username provided" });
      fetch(`https://www.minesaga.org/player/${username}`)
        .then(res => res.text())
        .then(async body => {
          var data = { games: [] };
          const $ = cheerio.load(body);
          if ($.text().trim().includes("User not found")) return resolve({ "errors": "User not found" });
          const name = $(".dd-profile-details h2").text().trim().split(" ")[0];
          const rank = $(".dd-profile-details h4").text().split("\n")[3].trim();
          const playtime = $(".dd-profile-details h4").text().split("\n")[2].trim();
          const firstSeen = $(".dd-profile-details h4").text().split("\n")[0].trim();
          const lastSeen = $(".dd-profile-details h4").text().split("\n")[1].trim();
          Object.assign(data, { name, rank, playtime, firstSeen, lastSeen });
          const games = ["herbal", "jurassic", "kingdom", "marvel", "mystic", "space", "western"];
          for (let i = 0; games.length > i; i++) {
            const d = await fetch(`https://www.minesaga.org/player/${username}/${games[i]}`).then(res => res.text());
            const $ = cheerio.load(d);
            const stats = {};
            $("div.dd-section").each(function () {
              $(this).find("div.dd-stats").each(function () {
                $(this).find("dt").each(function () {
                  Object.assign(stats, { [camelCase($(this).text().trim().toLowerCase())]: $(this).parent().find("dd").text().trim().toLowerCase() });
                });
              });
            });
            data.games.push({
              game: games[i],
              stats
            });
          }
          resolve(data);
        }).catch(e => {
          resolve({ "errors": "Can't fetch stats, API is probably offline." });
          console.log(e);
        });
    });
  },

  gommehd: (username) => { // completed
    return new Promise((resolve, reject) => {
      if (!username) return resolve({ "errors": "No username provided" });
      fetch(`https://www.gommehd.net/player/index?playerName=${username}`)
        .then(res => res.text())
        .then(async body => {
          var data = { games: [] };
          const $ = cheerio.load(body);
          if ($.text().trim().includes("User not found")) return resolve({ "errors": "User not found" });
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
  },

  timolia: (username) => { // incomplete
    return new Promise((resolve, reject) => {
      if (!username) return resolve({ "errors": "No username provided" });
      fetch(`https://www.timolia.de/stats/${username}`)
        .then(res => res.text())
        .then(async body => {

          const clean = (val) => {
            if (val == "Spiele gespielt") {
              return "gamesPlayed";
            } else if (val == "Spiele gewonnen") {
              return "wins";
            } else if (val == "Knapp gewonnen") {
              return "hardWins";
            } else if (val == "eZ gewonnen") {
              return "easyWins";
            } else if (val == "K/D") {
              return "kd";
            } else if (val == "Punkte") {
              return "points";
            } else if (val == "Siege insg.") {
              return "totalWins";
            } else if (val == "Tode insgesamt") {
              return "totalDeaths";
            } else if (val == "Meiste Kills pro Spiel") {
              return "mostKillsPerGame";
            } else if (val == "Durchschnittsrang") {
              return "avgRank";
            } else if (val == "Rang") {
              return "rank";
            } else if (val == "Duelle gespielt") {
              return "duelsPlayed";
            } else if (val == "Duelle gewonnen") {
              return "duelWins";
            } else if (val == "Insg. versucht") {
              return "castTries";
            } else if (val == "Insg. geschafft") {
              return "castMade";
            } else if (val == "Abgeschlossen") {
              return "completed";
            } else if (val == "Tagesieger beendet") {
              return "dayWinnerFinished";
            } else if (val == "Tagessieger insg.") {
              return "dayWinnerTotal";
            } else if (val == "JnRs veröffentlicht") {
              return "jnrReleased";
            } else if (val == "Gesammelte Favos") {
              return "collectedFavos";
            } else if (val == "Durchschnittsrang") {
              return "";
            } else if (val == "Durchschnittsrang") {
              return "";
            } else if (val.includes("ème")) {
              return val.replace("ème", "");
            } else if (val.includes(" ")) {
              return val.replace(" ", "");
            } else {
              return val;
            }
          };

          var data = { games: [] };
          const $ = cheerio.load(body);
          const name = $("h2#playername").text().trim();
          const rank = $(".stat-column td .label").not(".label-success").not(".label-danger").text().trim();
          // const status = $("table.table tbody td").text()
          const calcFirstLogin = (input) => {
            var d = input.split(" ")[0];
            var t = input.split(" ")[1];
            var arr = d.split(".");
            var final = new Date(`${arr[2]}-${arr[1]}-${arr[0]}T${t}`);
            return `${moment(final).format("MMM Do YYYY")} (${moment(final).fromNow()})`;
          };
          const firstLogin = calcFirstLogin($("table.table tbody tr").children("td").text().split(rank)[1].split("\n")[0]);
          const friends = $("table.table tbody tr").children("td").text().split(rank)[1].split("\n")[1].trim();
          Object.assign(data, { name, rank, firstLogin, friends });
          $(".stat-column").each(function () {
            const stats = {};
            $(this).find("tbody").each(function () {
              $(this).find(".stats-table-field").each(function () {
                // console.log($(this).find("td").not(".align-right").text() + " " + $(this).find("td").last().text())
                Object.assign(stats, { [camelCase($(this).find("td").not(".align-right").text())]: $(this).find("td").last().text() });
              });
            });
            if ($(this).find("th.stat-header").text().trim().toLowerCase()) {
              data.games.push({
                game: $(this).find("th.stat-header").text().trim().toLowerCase(),
                stats
              });
            }
          });
          resolve(data.games);
        }).catch(e => {
          resolve({ "errors": "Can't fetch stats, API is probably offline." });
          console.log(e);
        });
    });
  },

  // minemen: (username) => { // incomplete - need to figure out how to bypass the cloudflare challenge
  //   return new Promise(async (resolve, reject) => {
  //     if (!username) return resolve({"errors": "No username provided"});
  //     await cloudscraper.get(`https://minemen.club/player/${username}`)
  //       .then(async body => {
  //         var data = { games: [] };
  //         const $ = cheerio.load(body);
  //         // Object.assign(data, { name, status, rank });
  //         // $(".stat-table").each(function () {
  //         //   const stats = {};
  //         //   $(this).find("div.gametype-stats").each(function () {
  //         //     $(this).find("li").each(function () {
  //         //       Object.assign(stats, { [camelCase($(this).not(".score").text().trim().toLowerCase().split("\n")[2])]: $(this).not(".score").text().trim().toLowerCase().split("\n")[0]});
  //         //     });
  //         //   });
  //         //   data.games.push({
  //         //     game: $(this).find("div.map-content-wrap").text().trim().toLowerCase(),
  //         //     stats
  //         //   });
  //         // });
  //         resolve(data);
  //       }).catch(e =>  {
  //         resolve({"errors": "Can't fetch stats, API is probably offline."});
  //         console.log(e);
  //       });
  //   });
  // },

  veltpvp: (username) => { // 
    return new Promise(async (resolve, reject) => {
      if (!username) return resolve({ "errors": "No username provided" });
      await cloudscraper.get(`https://www.veltpvp.com/u/${username}`)
        .then(async body => {
          const calcFirstLogin = (input) => {
            var arr = input.split("/");
            var final = new Date(`${arr[2]}-${arr[1]}-${arr[0]}`);
            return `${moment(final).format("MMM Do YYYY")} (${moment(final).fromNow()})`;
          };

          var data = { games: [] };
          const $ = cheerio.load(body);
          if ($.text().trim().includes("not found")) return resolve({ "errors": "User not found" });
          const name = $("h1#name").text().trim();
          let status = $("div.top").text().trim(); // offline/online/banned
          if (status.includes(" ")) status = status.split(" ")[1].toLowerCase();
          let seen;
          if (status === "offline") {
            seen = $("div.bottom").text().trim().split("\n ")[0] + " " + $("div.bottom").text().trim().split("\n ")[1].trim();
          } else if (status === "online") {
            seen = $("div.bottom").text().trim();
          }
          const rank = $("div#profile h2").text().trim();
          const firstLogin = calcFirstLogin($("div.content strong").text().trim().substring(0, 10));
          Object.assign(data, { name, status, rank, firstLogin, seen });
          $(".server").each(function () {
            const stats = {};
            $(this).find("div.server-stat").each(function () {
              Object.assign(stats, { [camelCase($(this).find(".server-stat-description").text().trim().toLowerCase())]: $(this).find(".server-stat-number").text().trim().toLowerCase() });
            });
            data.games.push({
              game: $(this).find(".server-header").text().trim().toLowerCase(),
              stats
            });
          });
          resolve(omitEmpty(data));
        }).catch(e => {
          resolve({ "errors": "Can't fetch stats, API is probably offline." });
          console.log(e);
        });
    });
  },

  universocraft: (username) => { // semi-completed - last login yet to be done
    return new Promise((resolve, reject) => {
      if (!username) return resolve({ "errors": "No username provided" });
      fetch(`https://stats.universocraft.com/stats.php?player=${username}`)
        .then(res => res.text())
        .then(async body => {
          var data = { games: [] };
          const $ = cheerio.load(body);
          if ($.text().trim().includes("No se ha encontrado")) return resolve({ "errors": "User not found" });
          const clean = (input) => {
            input = input.toUpperCase();
            if (input == "VICTORIAS") {
              return "wins";
            } else if (input == "ASESINATOS") {
              return "kills";
            } else if (input == "MUERTES") {
              return "deaths";
            } else if (input == "GOLES") {
              return "goals";
            } else if (input == "PARTIDAS JUGADAS") {
              return "matchesPlayed";
            } else if (input == "BLOQUES COLOCADOS") {
              return "placedBlocks";
            } else if (input == "BLOQUES DESTRUIDOS") {
              return "destroyedBlocks";
            } else if (input == "PROJECTILES LANZADOS") {
              return "launchedProjectiles";
            } else if (input == "PROJECTILES IMPACTADOS") {
              return "impactedProjectiles";
            } else if (input == "ASESINATOS FINALES") {
              return "finalKills";
            } else if (input == "CAMAS DESTRUIDAS") {
              return "destroyedBeds";
            } else if (input == "MUERTES FINALES") {
              return "finalDeaths";
            } else if (input == "CONSTRUCCIONES PERFECTAS") {
              return "perfectConstructions";
            } else if (input == "PERDIDAS") {
              return "losses";
            } else if (input == "VICTORIAS TOTALES") {
              return "totalWins";
            } else if (input == "VICTORIAS COMO CORREDOR") {
              return "winsAsBroker";
            } else if (input == "VICTORIAS COMO BESTIA") {
              return "winsAsBeast";
            } else if (input == "ASESINATO COMO CORREDOR") {
              return "killsAsBroker";
            } else if (input == "ASESINATO COMO BESTIA") {
              return "killsAsBeast";
            } else if (input == "PUNTAJE") {
              return "score";
            } else if (input == "ASESINATOS CON ARCO") {
              return "murderWithArch";
            } else if (input == "DISTANCIA MÁXIMA DE MUERTE CON ARCO") {
              return "maximumDistanceOfDeathWithArc";
            } else if (input == "LANAS COLOCADAS") {
              return "placedWool";
            } else {
              return camelCase(input);
            }
          };
          const name = $("div.player-info h1").text().trim();
          const rank = $("div.player-rank").text().trim().toProperCase();
          const lastLogin = $("div.player-description p").not("p strong").text().trim().toProperCase(); // need to figure out this
          Object.assign(data, { name, rank, lastLogin });
          $("div.game").each(function () {
            const stats = {};

            if ($(this).find(".game-header-title").text().trim().toLowerCase() !== "thebridge") {
              $(this).find("div.game-content").each(function () {
                $(this).find(".game-stat").each(function () {
                  Object.assign(stats, { [clean($(this).find(".game-stat-title").text().trim().toLowerCase())]: $(this).find(".game-stat-count").text().trim().toLowerCase() });
                });
              });
              data.games.push({
                game: camelCase($(this).find(".game-header-title").text().trim().toLowerCase()),
                stats
              });
            }

            if ($(this).find(".game-header-title").text().trim().toLowerCase() == "thebridge") {
              $(this).find("div.game-content").each(function () {
                const gamemode = {};
                let gameModeName, obj;

                $(this).find("div#thebridgetotal").each(function () {
                  gameModeName = "total";
                  // console.log($(this).text())
                  $(this).find(".game-stat").each(function () {
                    Object.assign(gamemode, { [clean($(this).find(".game-stat-title").text().trim().toLowerCase())]: $(this).find(".game-stat-count").text().trim().toLowerCase() });
                  });
                  obj = { [gameModeName]: gamemode };
                  Object.assign(stats, obj);
                });

                $(this).find("div#thebridgesolo").each(function () {
                  gameModeName = "solo";
                  $(this).find(".game-stat").each(function () {
                    Object.assign(gamemode, { [clean($(this).find(".game-stat-title").text().trim().toLowerCase())]: $(this).find(".game-stat-count").text().trim().toLowerCase() });
                  });
                  obj = { [gameModeName]: gamemode };
                  Object.assign(stats, obj);
                });

                $(this).find("div#thebridgedoubles").each(function () {
                  gameModeName = "doubles";
                  $(this).find(".game-stat").each(function () {
                    Object.assign(gamemode, { [clean($(this).find(".game-stat-title").text().trim().toLowerCase())]: $(this).find(".game-stat-count").text().trim().toLowerCase() });
                  });
                  obj = { [gameModeName]: gamemode };
                  Object.assign(stats, obj);
                });

                $(this).find("div#thebridgetriples").each(function () {
                  gameModeName = "triples";
                  $(this).find(".game-stat").each(function () {
                    Object.assign(gamemode, { [clean($(this).find(".game-stat-title").text().trim().toLowerCase())]: $(this).find(".game-stat-count").text().trim().toLowerCase() });
                  });
                  obj = { [gameModeName]: gamemode };
                  Object.assign(stats, obj);
                });
              });
              data.games.push({
                game: camelCase($(this).find(".game-header-title").text().trim().toLowerCase()),
                stats
              });
            }
          });
          resolve(data);
        }).catch(e => {
          resolve({ "errors": "Can't fetch stats, API is probably offline." });
          console.log(e);
        });
    });
  },

  //type = Can be "profile" for profile stats or a game. EG: "DR" - displays death run stats.
  hivemc: (username, type) => { // Complete 
    return new Promise((resolve, reject) => {
      if (!username) return resolve({
        "errors": "No username provided"
      });
      if (!type) return resolve({
        "errors": "No query type provided"
      });
      if (type === "profile") {
        fetch(`http://api.hivemc.com/v1/player/${username}`)
          .then(res => res.text())
          .then(async body => {
            if (String(body).includes("Sorry, the page you are looking for could not be found")) return resolve({
              "errors": "No data found for user: " + username
            });
            body = JSON.parse(body);
            const data = {
              profile: {}
            };
            let achievements;
            const rank_name = body.modernRank.human || 0;
            const tokens = body.tokens || 0;
            const credits = body.credits || 0;
            const medals = body.medals || 0;
            const status = body.status.description || "None";
            const current_game = body.status.game || "None";
            const first_login = `${moment.unix(body.firstLogin).format("MMM Do YYYY")} (${moment.unix(body.firstLogin).fromNow()})` || "Never";
            const last_login = `${moment.unix(body.lastLogin).format("MMM Do YYYY")} (${moment.unix(body.lastLogin).fromNow()})` || "Unknown";
            const last_logout = `${moment.unix(body.lastLogout).format("MMM Do YYYY")} (${moment.unix(body.lastLogout).fromNow()})` || "Unknown";
            if (body.achievements) achievements = Object.keys(body.achievements).length;
            else achievements = 0;
            Object.assign(data.profile, { rank_name, tokens, credits, medals, status, current_game, first_login, last_login, last_logout, achievements });
            resolve(data);
          });
      }
      if (type === "SG") { //Survival games 1
        fetch(`http://api.hivemc.com/v1/player/${username}/SG`)
          .then(res => res.text())
          .then(async body => {
            body = JSON.parse(body);
            if (body.code === 404 && body.short === "noprofile") return resolve({ "errors": `No ${type} data found for user: ${username}` });
            const data = {
              SG: {}
            };
            let achievements;
            const victories = body.victories || 0;
            const total_points = body.total_points || 0;
            const most_points = body.most_points || 0;
            const games_played = body.gamesplayed || 0;
            const chest_opens = body.cratesopened || 0;
            const death_matches = body.deathmatches || 0;
            const kills = body.kills || 0;
            const deaths = body.deaths || 0;
            const time_alive = convert_seconds(body.timealive) || "None";
            const first_win = `${moment.unix(body.firstwinday).format("MMM Do YYYY")} (${moment.unix(body.firstwinday).fromNow()})` || "Unknown";
            if (body.achievements) achievements = Object.keys(body.achievements).length;
            else achievements = 0;
            const last_game = `${moment.unix(body.lastlogin).format("MMM Do YYYY")} (${moment.unix(body.lastlogin).fromNow()})` || "Unknown";

            Object.assign(data.SG, { victories, total_points, most_points, games_played, chest_opens, death_matches, kills, deaths, time_alive, first_win, achievements, last_game });
            resolve(data);
          });
      }
      if (type === "BP") { //block party
        fetch(`http://api.hivemc.com/v1/player/${username}/BP`)
          .then(res => res.text())
          .then(async body => {
            body = JSON.parse(body);
            if (body.code === 404 && body.short === "noprofile") return resolve({ "errors": `No ${type} data found for user: ${username}` });
            const data = {
              BP: {}
            };
            let achievements;
            const games_played = body.games_played || 0;
            const total_kills = body.total_eliminations || 0;
            const total_placing = body.total_placing || 0;
            const total_points = body.total_points || 0;
            const victories = body.victories || 0;
            if (body.achievements) achievements = Object.keys(body.achievements).length;
            else achievements = 0;
            const title = body.title || "None";
            const first_game = `${moment.unix(body.firstLogin).format("MMM Do YYYY")} (${moment.unix(body.firstLogin).fromNow()})` || "Unknown";

            Object.assign(data.BP, { games_played, total_kills, total_placing, total_points, victories, achievements, title, first_game });
            resolve(data);
          });
      }
      if (type === "CAI") { //Cowboys and Indians
        fetch(`http://api.hivemc.com/v1/player/${username}/CAI`)
          .then(res => res.text())
          .then(async body => {
            body = JSON.parse(body);
            if (body.code === 404 && body.short === "noprofile") return resolve({ "errors": `No ${type} data found for user: ${username}` });
            const data = {
              CAI: {}
            };
            let achievements;
            const total_points = body.total_points || 0;
            const captured = body.captured || 0;
            const captures = body.captures || 0;
            const catches = body.catches || 0;
            const caught = body.caught || 0;
            const games_played = body.gamesplayed || 0;
            const victories = body.victories || 0;
            if (body.achievements) achievements = Object.keys(body.achievements).length;
            else achievements = 0;
            const title = body.title || "None";
            const first_game = `${moment.unix(body.firstlogin).format("MMM Do YYYY")} (${moment.unix(body.firstlogin).fromNow()})` || "Unknown";
            const last_game = `${moment.unix(body.lastlogin).format("MMM Do YYYY")} (${moment.unix(body.lastlogin).fromNow()})` || "Unknown";

            Object.assign(data.CAI, { total_points, captured, captures, catches, caught, games_played, victories, title, first_game, last_game, achievements });
            resolve(data);
          });
      }
      if (type === "CR") { //Cranked
        fetch(`http://api.hivemc.com/v1/player/${username}/CR`)
          .then(res => res.text())
          .then(async body => {
            body = JSON.parse(body);
            if (body.code === 404 && body.short === "noprofile") return resolve({ "errors": `No ${type} data found for user: ${username}` });
            const data = {
              CR: {}
            };
            let achievements;
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
            const last_game = `${moment.unix(body.lastlogin).format("MMM Do YYYY")} (${moment.unix(body.lastlogin).fromNow()})` || "Unknown";
            const first_game = `${moment.unix(body.firstlogin).format("MMM Do YYYY")} (${moment.unix(body.firstlogin).fromNow()})` || "Unknown";
            const games_played = body.gamesplayed || 0;
            if (body.achievements) achievements = Object.keys(body.achievements).length;
            else achievements = 0;
            const title = body.title || "None";

            Object.assign(data.CR, { total_points, victories, kills, deaths, rccat_count, rccat_kills, airstrike_count, airstrike_kills, sonicsquid_count, sonicsquid_kills, last_game, first_game, games_played, achievements, title });
            resolve(data);
          });
      }
      if (type === "DR") { //Death run
        fetch(`http://api.hivemc.com/v1/player/${username}/DR`)
          .then(res => res.text())
          .then(async body => {
            body = JSON.parse(body);
            if (body.code === 404 && body.short === "noprofile") return resolve({ "errors": `No ${type} data found for user: ${username}` });
            const data = {
              DR: {}
            };
            let achievements;
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
            if (body.achievements) achievements = Object.keys(body.achievements).length;
            else achievements = 0;
            const last_game = `${moment.unix(body.lastlogin).format("MMM Do YYYY")} (${moment.unix(body.lastlogin).fromNow()})` || "Unknown";
            const first_game = `${moment.unix(body.firstlogin).format("MMM Do YYYY")} (${moment.unix(body.firstlogin).fromNow()})` || "Unknown";

            Object.assign(data.DR, { total_points, victories, kills, deaths, games_played, title, traps_activated, runner_games_played, death_games_played, total_checkpoints, runner_wins, death_wins, achievements, last_game, first_game });
            resolve(data);
          });
      }

      if (type === "HB") { //The Herobrine
        fetch(`http://api.hivemc.com/v1/player/${username}/HB`)
          .then(res => res.text())
          .then(async body => {
            body = JSON.parse(body);
            if (body.code === 404 && body.short === "noprofile") return resolve({ "errors": `No ${type} data found for user: ${username}` });
            const data = {
              HB: {}
            };
            let achievements;
            const captures = body.captures || 0;
            const kills = body.kills || 0;
            const deaths = body.deaths || 0;
            const points = body.points || 0;
            const active_classes = body.active_classes || 0;
            if (body.achievements) achievements = Object.keys(body.achievements).length;
            else achievements = 0;
            const first_game = `${moment.unix(body.firstlogin).format("MMM Do YYYY")} (${moment.unix(body.firstlogin).fromNow()})` || "Unknown";

            Object.assign(data.HB, { captures, kills, deaths, points, active_classes, achievements, first_game });
            resolve(data);
          });
      }

      if (type === "HERO") { //SG:heros 
        fetch(`http://api.hivemc.com/v1/player/${username}/HERO`)
          .then(res => res.text())
          .then(async body => {
            body = JSON.parse(body);
            if (body.code === 404 && body.short === "noprofile") return resolve({ "errors": `No ${type} data found for user: ${username}` });
            const data = {
              HERO: {}
            };
            let achievements;
            const total_points = body.total_points || 0;
            const victories = body.victories || 0;
            const kills = body.kills || 0;
            const one_vs_one_wins = body.one_vs_ones_wins || 0;
            const games_played = body.games_played || 0;
            const deathmatches = body.deathmatches || 0;
            const tnt_used = body.tnt_used || 0;
            const crates_opened = body.crates_opened || 0;
            const food_consumed = body.food_consumed || 0;
            const first_game = `${moment.unix(body.firstlogin).format("MMM Do YYYY")} (${moment.unix(body.firstlogin).fromNow()})` || "Unknown";
            const last_game = `${moment.unix(body.lastlogin).format("MMM Do YYYY")} (${moment.unix(body.lastlogin).fromNow()})` || "Unknown";
            if (body.achievements) achievements = Object.keys(body.achievements).length;
            else achievements = 0;

            Object.assign(data.HERO, { total_points, victories, kills, one_vs_one_wins, games_played, deathmatches, tnt_used, crates_opened, food_consumed, first_game, last_game, achievements });
            resolve(data);
          });
      }

      if (type === "HIDE") { //Hide and seek
        fetch(`http://api.hivemc.com/v1/player/${username}/HIDE`)
          .then(res => res.text())
          .then(async body => {
            body = JSON.parse(body);
            if (body.code === 404 && body.short === "noprofile") return resolve({ "errors": `No ${type} data found for user: ${username}` });
            const data = {
              HIDE: {}
            };
            let achievements;
            const total_points = body.total_points || 0;
            const victories = body.victories || 0;
            const hider_kills = body.hiderkills || 0;
            const seeker_kills = body.seekerkills || 0;
            const deaths = body.deaths || 0;
            const games_played = body.gamesplayed || 0;
            const time_alive = convert_seconds(body.timealive) || 0;
            var most_used_blocks = Object.keys(body.blockExperience).sort(function (a, b) { return body.blockExperience[b] - body.blockExperience[a]; });
            most_used_blocks = most_used_blocks.slice(0, 5);
            const first_game = `${moment.unix(body.firstlogin).format("MMM Do YYYY")} (${moment.unix(body.firstlogin).fromNow()})` || "Unknown";
            const last_game = `${moment(body.lastlogin).format("MMM Do YYYY")} (${moment(body.lastlogin).fromNow()})` || "Unknown";
            if (body.achievements) achievements = Object.keys(body.achievements).length;
            else achievements = 0;

            Object.assign(data.HIDE, { total_points, victories, hider_kills, seeker_kills, deaths, games_played, time_alive, most_used_blocks, first_game, last_game, achievements });
            resolve(data);
          });
      }

      if (type === "OITC") { //One In The Chanber
        fetch(`http://api.hivemc.com/v1/player/${username}/OITC`)
          .then(res => res.text())
          .then(async body => {
            body = JSON.parse(body);
            if (body.code === 404 && body.short === "noprofile") return resolve({ "errors": `No ${type} data found for user: ${username}` });
            const data = {
              OITC: {}
            };
            let achievements;
            const total_points = body.total_points || 0;
            const victories = body.victories || 0;
            const kills = body.kills || 0;
            const deaths = body.deaths || 0;
            const arrows_fired = body.arrowsfired || 0;
            const games_played = body.gamesplayed || 0;
            const title = body.title || "None";
            const first_game = `${moment.unix(body.firstlogin).format("MMM Do YYYY")} (${moment.unix(body.firstlogin).fromNow()})` || "Unknown";
            const last_game = `${moment.unix(body.lastlogin).format("MMM Do YYYY")} (${moment.unix(body.lastlogin).fromNow()})` || "Unknown";
            if (body.achievements) achievements = Object.keys(body.achievements).length;
            else achievements = 0;

            Object.assign(data.OITC, { total_points, victories, kills, deaths, arrows_fired, games_played, title, first_game, last_game, achievements });
            resolve(data);
          });
      }

      if (type === "SP") { //Splegg
        fetch(`http://api.hivemc.com/v1/player/${username}/SP`)
          .then(res => res.text())
          .then(async body => {
            body = JSON.parse(body);
            if (body.code === 404 && body.short === "noprofile") return resolve({ "errors": `No ${type} data found for user: ${username}` });
            const data = {
              SP: {}
            };
            let achievements;
            const victories = body.victories || 0;
            const games_played = body.gamesplayed || 0;
            const eggs_fired = body.eggsfired || 0;
            const blocks_destroyed = body.blocksdestroyed || 0;
            const deaths = body.deaths || 0;
            const points = body.points || 0;
            const time_alive = convert_seconds(body.timealive) || 0;
            const title = body.title || "None";
            const first_game = `${moment.unix(body.firstlogin).format("MMM Do YYYY")} (${moment.unix(body.firstlogin).fromNow()})` || "Unknown";
            const last_game = `${moment.unix(body.lastlogin).format("MMM Do YYYY")} (${moment.unix(body.lastlogin).fromNow()})` || "Unknown";
            if (body.achievements) achievements = Object.keys(body.achievements).length;
            else achievements = 0;

            Object.assign(data.SP, { victories, games_played, eggs_fired, blocks_destroyed, deaths, points, time_alive, title, first_game, last_game, achievements });
            resolve(data);
          });
      }

      if (type === "TIMV") { //Trouble in Mineville
        fetch(`http://api.hivemc.com/v1/player/${username}/TIMV`)
          .then(res => res.text())
          .then(async body => {
            body = JSON.parse(body);
            if (body.code === 404 && body.short === "noprofile") return resolve({ "errors": `No ${type} data found for user: ${username}` });
            const data = {
              TIMV: {}
            };
            let achievements;
            const total_points = body.total_points || 0;
            const most_points = body.most_points || 0;
            const role_points = body.role_points || 0;
            const traitor_points = body.t_points || 0;
            const detective_points = body.d_points || 0;
            const innocent_points = body.i_points || 0;
            const title = body.title || "None";
            const last_game = `${moment.unix(body.lastlogin).format("MMM Do YYYY")} (${moment.unix(body.lastlogin).fromNow()})` || "Unknown";
            if (body.achievements) achievements = Object.keys(body.achievements).length;
            else achievements = 0;

            Object.assign(data.TIMV, { total_points, most_points, role_points, traitor_points, detective_points, innocent_points, title, last_game, achievements });
            resolve(data);
          });
      }

      if (type === "SKY") { //Skywars
        fetch(`http://api.hivemc.com/v1/player/${username}/SKY`)
          .then(res => res.text())
          .then(async body => {
            body = JSON.parse(body);
            if (body.code === 404 && body.short === "noprofile") return resolve({ "errors": `No ${type} data found for user: ${username}` });
            const data = {
              SKY: {}
            };
            let achievements;
            const total_points = body.total_points || 0;
            const victories = body.victories || 0;
            const games_played = body.gamesplayed || 0;
            const kills = body.kills || 0;
            const deaths = body.deaths || 0;
            const most_points = body.most_points || 0;
            const time_alive = convert_seconds(body.timealive) || 0;
            const title = body.title || "None";
            const first_game = `${moment.unix(body.firstLogin).format("MMM Do YYYY")} (${moment.unix(body.firstLogin).fromNow()})` || "Unknown";
            const last_game = `${moment.unix(body.lastlogin).format("MMM Do YYYY")} (${moment.unix(body.lastlogin).fromNow()})` || "Unknown";
            if (body.achievements) achievements = Object.keys(body.achievements).length;
            else achievements = 0;

            Object.assign(data.SKY, { total_points, victories, games_played, kills, deaths, most_points, time_alive, title, first_game, last_game, achievements });
            resolve(data);
          });
      }

      if (type === "DRAW") { //Draw it
        fetch(`http://api.hivemc.com/v1/player/${username}/DRAW`)
          .then(res => res.text())
          .then(async body => {
            body = JSON.parse(body);
            if (body.code === 404 && body.short === "noprofile") return resolve({ "errors": `No ${type} data found for user: ${username}` });
            const data = {
              DRAW: {}
            };
            let achievements;
            const total_points = body.total_points || 0;
            const victories = body.victories || 0;
            const games_played = body.gamesplayed || 0;
            const correct_guesses = body.correct_guesses || 0;
            const incorrect_guesses = body.incorrect_guesses || 0;
            const skips = body.skips || 0;
            const title = body.title || "None";
            const first_game = `${moment.unix(body.firstLogin).format("MMM Do YYYY")} (${moment.unix(body.firstLogin).fromNow()})` || "Unknown";
            if (body.achievements) achievements = Object.keys(body.achievements).length;
            else achievements = 0;

            Object.assign(data.DRAW, { total_points, victories, games_played, correct_guesses, incorrect_guesses, skips, title, first_game, achievements });
            resolve(data);
          });
      }

      if (type === "SLAP") { //Slaparoo
        fetch(`http://api.hivemc.com/v1/player/${username}/SLAP`)
          .then(res => res.text())
          .then(async body => {
            body = JSON.parse(body);
            if (body.code === 404 && body.short === "noprofile") return resolve({ "errors": `No ${type} data found for user: ${username}` });
            const data = {
              SLAP: {}
            };
            const victories = body.victories || 0;
            const games_played = body.gamesplayed || 0;
            const kills = body.kills || 0;
            const deaths = body.deaths || 0;
            const points = body.points || 0;
            const title = body.title || "None";
            const first_game = `${moment.unix(body.firstlogin).format("MMM Do YYYY")} (${moment.unix(body.firstlogin).fromNow()})` || "Unknown";
            const last_game = `${moment.unix(body.lastlogin).format("MMM Do YYYY")} (${moment.unix(body.lastlogin).fromNow()})` || "Unknown";

            Object.assign(data.SLAP, { victories, games_played, kills, deaths, points, title, first_game, last_game });
            resolve(data);
          });
      }

      if (type === "EF") { //Electric Floor
        fetch(`http://api.hivemc.com/v1/player/${username}/EF`)
          .then(res => res.text())
          .then(async body => {
            body = JSON.parse(body);
            if (body.code === 404 && body.short === "noprofile") return resolve({ "errors": `No ${type} data found for user: ${username}` });
            const data = {
              EF: {}
            };
            const victories = body.victories || 0;
            const outlived = body.outlived || 0;
            const games_played = body.gamesplayed || 0;
            const points = body.points || 0;
            const blocks_activated = body.blocksactivated || 0;
            const title = body.title || "None";
            const first_game = `${moment.unix(body.firstlogin).format("MMM Do YYYY")} (${moment.unix(body.firstlogin).fromNow()})` || "Unknown";
            const last_game = `${moment.unix(body.lastlogin).format("MMM Do YYYY")} (${moment.unix(body.lastlogin).fromNow()})` || "Unknown";

            Object.assign(data.EF, { victories, outlived, games_played, points, blocks_activated, title, first_game, last_game });
            resolve(data);
          });
      }

      if (type === "EF") { //Electric Floor
        fetch(`http://api.hivemc.com/v1/player/${username}/EF`)
          .then(res => res.text())
          .then(async body => {
            body = JSON.parse(body);
            if (body.code === 404 && body.short === "noprofile") return resolve({ "errors": `No ${type} data found for user: ${username}` });
            const data = {
              EF: {}
            };
            const victories = body.victories || 0;
            const outlived = body.outlived || 0;
            const games_played = body.gamesplayed || 0;
            const points = body.points || 0;
            const blocks_activated = body.blocksactivated || 0;
            const title = body.title || "None";
            const first_game = `${moment.unix(body.firstlogin).format("MMM Do YYYY")} (${moment.unix(body.firstlogin).fromNow()})` || "Unknown";
            const last_game = `${moment.unix(body.lastlogin).format("MMM Do YYYY")} (${moment.unix(body.lastlogin).fromNow()})` || "Unknown";

            Object.assign(data.EF, { victories, outlived, games_played, points, blocks_activated, title, first_game, last_game });
            resolve(data);
          });
      }
      if (type === "MM") { //Music Masters
        fetch(`http://api.hivemc.com/v1/player/${username}/MM`)
          .then(res => res.text())
          .then(async body => {
            body = JSON.parse(body);
            if (body.code === 404 && body.short === "noprofile") return resolve({ "errors": `No ${type} data found for user: ${username}` });
            const data = {
              MM: {}
            };
            const victories = body.victories || 0;
            const correct_notes = body.correctnotes || 0;
            const incorrect_notes = body.incorrectnotes || 0;
            const games_played = body.gamesplayed || 0;
            const points = body.points || 0;
            const notes_perfect = body.notes_perfect || 0;
            const notes_good = body.notes_good || 0;
            const title = body.title || "None";
            const first_game = `${moment.unix(body.firstlogin).format("MMM Do YYYY")} (${moment.unix(body.firstlogin).fromNow()})` || "Unknown";
            const last_game = `${moment.unix(body.lastlogin).format("MMM Do YYYY")} (${moment.unix(body.lastlogin).fromNow()})` || "Unknown";

            Object.assign(data.MM, { victories, correct_notes, incorrect_notes, games_played, points, notes_perfect, notes_good, title, first_game, last_game });
            resolve(data);
          });
      }

      if (type === "GRAV") { //Gravity
        fetch(`http://api.hivemc.com/v1/player/${username}/GRAV`)
          .then(res => res.text())
          .then(async body => {
            body = JSON.parse(body);
            if (body.code === 404 && body.short === "noprofile") return resolve({ "errors": `No ${type} data found for user: ${username}` });
            const data = {
              GRAV: {}
            };
            const victories = body.victories || 0;
            const games_played = body.gamesplayed || 0;
            const points = body.points || 0;
            var top_maps = Object.keys(body.maprecords).sort(function (a, b) { return body.maprecords[b] - body.maprecords[a]; });
            top_maps = top_maps.slice(0, 5);
            const title = body.title || "None";
            const first_game = `${moment.unix(body.firstlogin).format("MMM Do YYYY")} (${moment.unix(body.firstlogin).fromNow()})` || "Unknown";
            const last_game = `${moment.unix(body.lastlogin).format("MMM Do YYYY")} (${moment.unix(body.lastlogin).fromNow()})` || "Unknown";

            Object.assign(data.GRAV, { victories, games_played, points, top_maps, title, first_game, last_game });
            resolve(data);
          });
      }

      if (type === "RR") { //Restaurant Rush
        fetch(`http://api.hivemc.com/v1/player/${username}/RR`)
          .then(res => res.text())
          .then(async body => {
            body = JSON.parse(body);
            if (body.code === 404 && body.short === "noprofile") return resolve({ "errors": `No ${type} data found for user: ${username}` });
            const data = {
              RR: {}
            };
            let achievements;
            const victories = body.victories || 0;
            const tables_cleared = body.tablescleared || 0;
            const games_played = body.gamesplayed || 0;
            const highscore = body.highscore || 0;
            const points = body.points || 0;
            const first_game = `${moment.unix(body.firstlogin).format("MMM Do YYYY")} (${moment.unix(body.firstlogin).fromNow()})` || "Unknown";
            const last_game = `${moment.unix(body.lastlogin).format("MMM Do YYYY")} (${moment.unix(body.lastlogin).fromNow()})` || "Unknown";
            if (body.achievements) achievements = Object.keys(body.achievements).length;
            else achievements = 0;

            Object.assign(data.RR, { victories, tables_cleared, highscore, games_played, points, first_game, last_game, achievements });
            resolve(data);
          });
      }


      if (type === "GNT") { //SkyGiants 
        fetch(`http://api.hivemc.com/v1/player/${username}/GNT`)
          .then(res => res.text())
          .then(async body => {
            body = JSON.parse(body);
            if (body.code === 404 && body.short === "noprofile") return resolve({ "errors": `No ${type} data found for user: ${username}` });
            const data = {
              GNT: {}
            };
            const total_points = body.total_points || 0;
            const victories = body.victories || 0;
            const games_played = body.games_played || 0;
            const kills = body.kills || 0;
            const deaths = body.deaths || 0;
            const gold_earned = body.gold_earned || 0;
            const beasts_slain = body.beasts_slain || 0;
            const shutdowns = body.shutdowns || 0;
            const title = body.title || "None";
            const first_game = `${moment.unix(body.firstLogin).format("MMM Do YYYY")} (${moment.unix(body.firstLogin).fromNow()})` || "Unknown";
            const last_game = `${moment.unix(body.lastlogin).format("MMM Do YYYY")} (${moment.unix(body.lastlogin).fromNow()})` || "Unknown";


            Object.assign(data.GNT, { total_points, victories, games_played, kills, deaths, gold_earned, beasts_slain, shutdowns, title, first_game, last_game });
            resolve(data);
          });
      }

      if (type === "SGN") { //Survival Games 2 
        fetch(`http://api.hivemc.com/v1/player/${username}/SGN`)
          .then(res => res.text())
          .then(async body => {
            body = JSON.parse(body);
            if (body.code === 404 && body.short === "noprofile") return resolve({ "errors": `No ${type} data found for user: ${username}` });
            const data = {
              SGN: {}
            };
            const victories = body.victories || 0;
            const total_points = body.total_points || 0;
            const most_points = body.most_points || 0;
            const games_played = body.games_played || 0;
            const crates_opened = body.crates_opened || 0;
            const deathmatches = body.deathmatches || 0;
            const kills = body.kills || 0;
            const deaths = body.deaths || 0;
            const first_game = `${moment.unix(body.firstLogin).format("MMM Do YYYY")} (${moment.unix(body.firstLogin).fromNow()})` || "Unknown";
            const last_game = `${moment.unix(body.lastlogin).format("MMM Do YYYY")} (${moment.unix(body.lastlogin).fromNow()})` || "Unknown";


            Object.assign(data.SGN, { victories, total_points, most_points, games_played, crates_opened, deathmatches, kills, deaths, first_game, last_game });
            resolve(data);
          });
      }

      if (type === "BD") { //BatteryDash 
        fetch(`http://api.hivemc.com/v1/player/${username}/BD`)
          .then(res => res.text())
          .then(async body => {
            body = JSON.parse(body);
            if (body.code === 404 && body.short === "noprofile") return resolve({ "errors": `No ${type} data found for user: ${username}` });
            const data = {
              BD: {}
            };
            const total_points = body.total_points || 0;
            const games_played = body.games_played || 0;
            const kills = body.kills || 0;
            const deaths = body.deaths || 0;
            const energy_collected = body.energy_collected || 0;
            const batteries_charged = body.batteries_charged || 0;
            const title = body.title || "None";
            const first_game = `${moment.unix(body.firstLogin).format("MMM Do YYYY")} (${moment.unix(body.firstLogin).fromNow()})` || "Unknown";
            const last_game = `${moment.unix(body.lastlogin).format("MMM Do YYYY")} (${moment.unix(body.lastlogin).fromNow()})` || "Unknown";


            Object.assign(data.BD, { total_points, games_played, kills, deaths, energy_collected, batteries_charged, title, first_game, last_game });
            resolve(data);
          });
      }

      if (type === "SPL") { //Sploop
        fetch(`http://api.hivemc.com/v1/player/${username}/SPL`)
          .then(res => res.text())
          .then(async body => {
            body = JSON.parse(body);
            if (body.code === 404 && body.short === "noprofile") return resolve({ "errors": `No ${type} data found for user: ${username}` });
            const data = {
              SPL: {}
            };
            let achievements;
            const total_points = body.total_points || 0;
            const victories = body.victories || 0;
            const games_played = body.games_played || 0;
            const kills = body.kills || 0;
            const deaths = body.deaths || 0;
            const blocks_painted = body.blocks_painted || 0;
            const ultimates_earned = body.ultimates_earned;
            var booster_blocks_painted;
            var booster_kills;
            var booster_deaths;
            var booster_ulimate_kills;
            var booster_games_played;
            var raven_blocks_painted;
            var raven_kills;
            var raven_deaths;
            var raven_ulimate_kills;
            var raven_games_played;
            var torstein_blocks_painted;
            var torstein_kills;
            var torstein_deaths;
            var torstein_ulimate_kills;
            var torstein_games_played;
            var oinky_blocks_painted;
            var oinky_kills;
            var oinky_deaths;
            var oinky_ulimate_kills;
            var oinky_games_played;

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
            const first_game = `${moment.unix(body.firstLogin).format("MMM Do YYYY")} (${moment.unix(body.firstLogin).fromNow()})` || "Unknown";
            const last_game = `${moment.unix(body.lastlogin).format("MMM Do YYYY")} (${moment.unix(body.lastlogin).fromNow()})` || "Unknown";
            if (body.achievements) achievements = Object.keys(body.achievements).length;
            else achievements = 0;

            Object.assign(data.SPL, { total_points, victories, games_played, kills, deaths, blocks_painted, ultimates_earned, booster_blocks_painted, booster_kills, booster_deaths, booster_ulimate_kills, booster_games_played, raven_blocks_painted, raven_kills, raven_deaths, raven_ulimate_kills, raven_games_played, torstein_blocks_painted, torstein_kills, torstein_deaths, torstein_ulimate_kills, torstein_games_played, oinky_blocks_painted, oinky_kills, oinky_deaths, oinky_ulimate_kills, oinky_games_played, title, first_game, last_game, achievements });
            resolve(data);
          });
      }

      if (type === "MIMV") { //Murder In MineVille 
        fetch(`http://api.hivemc.com/v1/player/${username}/MIMV`)
          .then(res => res.text())
          .then(async body => {
            body = JSON.parse(body);
            if (body.code === 404 && body.short === "noprofile") return resolve({ "errors": `No ${type} data found for user: ${username}` });
            const data = {
              MIMV: {}
            };
            let achievements;
            const total_points = body.total_points || 0;
            const games_played = body.games_played || 0;
            const victories = body.victories || 0;
            const kills = body.kills || 0;
            const deaths = body.deaths || 0;
            const title = body.title || "None";
            const first_game = `${moment.unix(body.firstLogin).format("MMM Do YYYY")} (${moment.unix(body.firstLogin).fromNow()})` || "Unknown";
            const last_game = `${moment.unix(body.lastlogin).format("MMM Do YYYY")} (${moment.unix(body.lastlogin).fromNow()})` || "Unknown";
            if (body.achievements) achievements = Object.keys(body.achievements).length;
            else achievements = 0;

            Object.assign(data.MIMV, { total_points, games_played, victories, kills, deaths, title, first_game, last_game, achievements });
            resolve(data);
          });
      }

      if (type === "BED") { //Bedwars 
        fetch(`http://api.hivemc.com/v1/player/${username}/BED`)
          .then(res => res.text())
          .then(async body => {
            body = JSON.parse(body);
            if (body.code === 404 && body.short === "noprofile") return resolve({ "errors": `No ${type} data found for user: ${username}` });
            const data = {
              BED: {}
            };
            let achievements;
            const total_points = body.total_points || 0;
            const victories = body.victories || 0;
            const games_played = body.games_played || 0;
            const kills = body.kills || 0;
            const deaths = body.deaths || 0;
            const beds_destroyed = body.beds_destroyed || 0;
            const teams_eliminated = body.teams_eliminated || 0;
            const win_streak = body.win_streak || 0;
            const title = body.title || "None";
            const first_game = `${moment.unix(body.firstLogin).format("MMM Do YYYY")} (${moment.unix(body.firstLogin).fromNow()})` || "Unknown";
            const last_game = `${moment.unix(body.lastlogin).format("MMM Do YYYY")} (${moment.unix(body.lastlogin).fromNow()})` || "Unknown";
            if (body.achievements) achievements = Object.keys(body.achievements).length;
            else achievements = 0;

            Object.assign(data.BED, { total_points, games_played, victories, kills, deaths, beds_destroyed, teams_eliminated, win_streak, title, first_game, last_game, achievements });
            resolve(data);
          });
      }
    });
  },

};

