const fetch         = require("node-fetch"); // Main http module
const cheerio       = require("cheerio");
const keys          = require("../keys.json");
const moment        = require("moment");
const cloudscraper  = require("cloudscraper"); // This package bypasses cloudflare anti-bot page, which is needed in some cases
const omitEmpty     = require("omit-empty"); // really cool package that checks for empty proterties in objects
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
          if (!name) return resolve({ errors: "User not found"});
          resolve(data);
        }).catch(e =>  {
          resolve({"errors": "Can't fetch stats, API is probably offline."});
          console.log(e);
        });
    });
  },

  hypixelPlayer: async (username) => { // completed
    return new Promise((resolve, reject) => {
      const hypixelLevel = (exp) => {
        const i = -3.5;
        const j = 12.25;
        const k = 0.0008;
        return exp < 0 ? 1 : Math.floor(1 + i + Math.sqrt(j + k * exp));
      };

      fetch(`https://api.hypixel.net/player?key=${keys.hypixel}&name=${username}`)
        .then(res => res.json())
        .then(async json => {
          if (!json.player) return resolve({ errors: "User not found"});
          const res = {
            "status": 1568288492518 < Date.now() ? "offline" : "online",
            "name": json.player.displayname,
            "rank": json.player.rank ? json.player.rank : null,
            "level": hypixelLevel(json.player.networkExp),
            "exp": json.player.networkExp,
            "karma": json.player.karma ? json.player.karma : null ,
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
        }).catch(e =>  {
          resolve({"errors": "Can't fetch stats, API is probably offline."});
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

  hypixelWatchdog: async () => { // completed
    return new Promise((resolve, reject) => {
      fetch(`https://api.hypixel.net/watchdogstats?key=${keys.hypixel}`)
        .then(res => res.json())
        .then(async json => {
          resolve(json);
        }).catch(e =>  {
          resolve({"errors": "Can't fetch stats, API is probably offline."});
          console.log(e);
        });
    });
  },

  hypixelBoosters: async () => {
    return new Promise((resolve, reject) => {
      const getGametype = {
        2 : "QUAKECRAFT",
        3 : "WALLS",
        4 : "PAINTBALL",
        5 : "Blitz Survival Games",
        6 : "TNT GAMES",
        7 : "VAMPIREZ",
        13 : "Mega Walls",
        14 : "ARCADE",
        17 : "ARENA",
        20 : "UHC Champions",
        21 : "Cops and Crims",
        23 : "Warlords",
        24 : "Smash Heroes",
        25 : "Turbo Kart Racers",
        26 : "Housing",
        51 : "SkyWars",
        52 : "Crazy Walls",
        54 : "Speed UHC",
        55 : "SkyClash",
        56 : "Classic Games",
        57 : "Prototype",
        58 : "Bed Wars",
        59 : "Murder Mystery",
        60 : "Build Battle",
        61 : "Duels",
      };
      fetch(`https://api.hypixel.net/boosters?key=${keys.hypixel}`)
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

  hypixelKey: async () => { // completed
    return new Promise((resolve, reject) => {
      fetch(`https://api.hypixel.net/key?key=${keys.hypixel}`)
        .then(res => res.json())
        .then(async json => {
          resolve(json);
        }).catch(e =>  {
          resolve({"errors": "Can't fetch stats, API is probably offline."});
          console.log(e);
        });
    });
  },

  funcraft: (username) => { // completed
    return new Promise((resolve, reject) => {
      if (!username) return resolve({"errors": "No username provided"});
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
              Object.assign(stats, { [clean($(this).find("div.stats-name").text().trim().toLowerCase())]: toNumber(clean($(this).find("div.stats-value-daily").text().trim()))});
            });
            if (Object.size(stats)) {
              data.games.push({
                game: $(this).find("div.name").text().trim(),
                stats
              });
            }
          });
          resolve(data);
        }).catch(e =>  {
          resolve({"errors": "Can't fetch stats, API is probably offline."});
          console.log(e);
        });
    });
  },

  mineplex: (username) => { // incomplete
    return new Promise((resolve, reject) => {
      if (!username) return resolve({"errors": "No username provided"});
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
        }).catch(e =>  {
          resolve({"errors": "Can't fetch stats, API is probably offline."});
          console.log(e);
        });
    });
  },

  manacube: (username) => { // completed
    return new Promise((resolve, reject) => {
      if (!username) return resolve({"errors": "No username provided"});
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
        }).catch(e =>  {
          resolve({"errors": "Can't fetch stats, API is probably offline."});
          console.log(e);
        });
    });
  },

  minesaga: (username) => { // completed
    return new Promise((resolve, reject) => {
      if (!username) return resolve({"errors": "No username provided"});
      fetch(`https://www.minesaga.org/player/${username}`)
        .then(res => res.text())
        .then(async body => {
          var data = { games: [] };
          const $ = cheerio.load(body);
          if ($.text().trim().includes("User not found")) return resolve({"errors": "User not found"});
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
                  Object.assign(stats, { [camelCase($(this).text().trim().toLowerCase())]: $(this).parent().find("dd").text().trim().toLowerCase()});
                });
              });
            });
            data.games.push({
              game: games[i],
              stats
            });
          }
          resolve(data);
        }).catch(e =>  {
          resolve({"errors": "Can't fetch stats, API is probably offline."});
          console.log(e);
        });
    });
  },

  gommehd: (username) => { // completed
    return new Promise((resolve, reject) => {
      if (!username) return resolve({"errors": "No username provided"});
      fetch(`https://www.gommehd.net/player/index?playerName=${username}`)
        .then(res => res.text())
        .then(async body => {
          var data = { games: [] };
          const $ = cheerio.load(body);
          if ($.text().trim().includes("User not found")) return resolve({"errors": "User not found"});
          const name = $("div.user_info").text().trim().split(" ")[0];
          Object.assign(data, { name });
          $(".stat-table").each(function () {
            const stats = {};
            $(this).find("div.gametype-stats").each(function () {
              $(this).find("li").each(function () {
                Object.assign(stats, { [camelCase($(this).not(".score").text().trim().toLowerCase().split("\n")[2])]: $(this).not(".score").text().trim().toLowerCase().split("\n")[0]});
              });
            });
            data.games.push({
              game: $(this).find("div.map-content-wrap").text().trim().toLowerCase(),
              stats
            });
          });
          resolve(data);
        }).catch(e =>  {
          resolve({"errors": "Can't fetch stats, API is probably offline."});
          console.log(e);
        });
    });
  },

  timolia: (username) => { // incomplete
    return new Promise((resolve, reject) => {
      if (!username) return resolve({"errors": "No username provided"});
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
                Object.assign(stats, { [camelCase($(this).find("td").not(".align-right").text())]: $(this).find("td").last().text()});
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
        }).catch(e =>  {
          resolve({"errors": "Can't fetch stats, API is probably offline."});
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
      if (!username) return resolve({"errors": "No username provided"});
      await cloudscraper.get(`https://www.veltpvp.com/u/${username}`)
        .then(async body => {
          const calcFirstLogin = (input) => {
            var arr = input.split("/");
            var final = new Date(`${arr[2]}-${arr[1]}-${arr[0]}`);
            return `${moment(final).format("MMM Do YYYY")} (${moment(final).fromNow()})`;
          };
          
          var data = { games: [] };
          const $ = cheerio.load(body);
          if ($.text().trim().includes("not found")) return resolve({"errors": "User not found"});
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
              Object.assign(stats, { [camelCase($(this).find(".server-stat-description").text().trim().toLowerCase())]: $(this).find(".server-stat-number").text().trim().toLowerCase()});
            });
            data.games.push({
              game: $(this).find(".server-header").text().trim().toLowerCase(),
              stats
            });
          });
          resolve(omitEmpty(data));
        }).catch(e =>  {
          resolve({"errors": "Can't fetch stats, API is probably offline."});
          console.log(e);
        });
    });
  },

  universocraft: (username) => { // semi-completed - last login yet to be done
    return new Promise((resolve, reject) => {
      if (!username) return resolve({"errors": "No username provided"});
      fetch(`https://stats.universocraft.com/stats.php?player=${username}`)
        .then(res => res.text())
        .then(async body => {
          var data = { games: [] };
          const $ = cheerio.load(body);
          if ($.text().trim().includes("No se ha encontrado")) return resolve({"errors": "User not found"});
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
                  obj = { [gameModeName]:  gamemode };
                  Object.assign(stats, obj);
                });

                $(this).find("div#thebridgesolo").each(function () {
                  gameModeName = "solo";
                  $(this).find(".game-stat").each(function () {
                    Object.assign(gamemode, { [clean($(this).find(".game-stat-title").text().trim().toLowerCase())]: $(this).find(".game-stat-count").text().trim().toLowerCase() });
                  });
                  obj = { [gameModeName]:  gamemode };
                  Object.assign(stats, obj);
                });

                $(this).find("div#thebridgedoubles").each(function () {
                  gameModeName = "doubles";
                  $(this).find(".game-stat").each(function () {
                    Object.assign(gamemode, { [clean($(this).find(".game-stat-title").text().trim().toLowerCase())]: $(this).find(".game-stat-count").text().trim().toLowerCase() });
                  });
                  obj = { [gameModeName]:  gamemode };
                  Object.assign(stats, obj);
                });

                $(this).find("div#thebridgetriples").each(function () {
                  gameModeName = "triples";
                  $(this).find(".game-stat").each(function () {
                    Object.assign(gamemode, { [clean($(this).find(".game-stat-title").text().trim().toLowerCase())]: $(this).find(".game-stat-count").text().trim().toLowerCase() });
                  });
                  obj = { [gameModeName]:  gamemode };
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
        }).catch(e =>  {
          resolve({"errors": "Can't fetch stats, API is probably offline."});
          console.log(e);
        });
    });
  },


};


