const fetch         = require("node-fetch");
const { parse }     = require("node-html-parser");
const cheerio       = require("cheerio");
const keys          = require("./keys.json");
const moment        = require("moment");
require("moment-duration-format");
require("tls").DEFAULT_ECDH_CURVE = "auto";

String.prototype.toProperCase = function () {
  return this.replace(/([^\W_]+[^\s-]*) */g, function (txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

Object.size = (obj) => {
  var size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
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

          resolve(data);
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
          const res = {
            "status": 1568288492518 < Date.now() ? "offline" : "online",
            "name": json.player.displayname,
            "level": hypixelLevel(json.player.networkExp),
            "exp": json.player.networkExp,
            "karma": json.player.karma,
            "votes": json.player.voting.total,
            "achievements": Object.size(json.player.achievements),
            "completedParkours": Object.size(json.player.parkourCompletions),
            "lastGame": json.player.mostRecentGameType,
            "firstLogin": `${moment(json.player.firstLogin).format("MMM Do YYYY")} (${moment(json.player.firstLogin).fromNow()})`,
            "lastLogin": `${moment(json.player.lastLogin).format("MMM Do YYYY")} (${moment(json.player.lastLogin).fromNow()})`,
            "lastLogout": `${moment(json.player.lastLogout).format("MMM Do YYYY")} (${moment(json.player.lastLogout).fromNow()})`,
            "socialMedia": json.player.socialMedia ? json.player.socialMedia.links : null
          };
          resolve(res);
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
        });
    });
  },

  // hypixelBoosters: async () => {
  //   return new Promise((resolve, reject) => {
  //     const getGametype = {
  //       2 : "QUAKECRAFT",
  //       3 : "WALLS",
  //       4 : "PAINTBALL",
  //       5 : "Blitz Survival Games",
  //       6 : "TNT GAMES",
  //       7 : "VAMPIREZ",
  //       13 : "Mega Walls",
  //       14 : "ARCADE",
  //       17 : "ARENA",
  //       20 : "UHC Champions",
  //       21 : "Cops and Crims",
  //       23 : "Warlords",
  //       24 : "Smash Heroes",
  //       25 : "Turbo Kart Racers",
  //       26 : "Housing",
  //       51 : "SkyWars",
  //       52 : "Crazy Walls",
  //       54 : "Speed UHC",
  //       55 : "SkyClash",
  //       56 : "Classic Games",
  //       57 : "Prototype",
  //       58 : "Bed Wars",
  //       59 : "Murder Mystery",
  //       60 : "Build Battle",
  //       61 : "Duels",
  //     };
  //     fetch(`https://api.hypixel.net/boosters?key=${keys.hypixel}`)
  //       .then(res => res.json())
  //       .then(async json => {
  //         const res = {
  //           "multiplier": json.boosters[0].amount
  //         };
  //         resolve(res);
  //       });
  //   });
  // },

  hypixelKey: async () => { // completed
    return new Promise((resolve, reject) => {
      fetch(`https://api.hypixel.net/key?key=${keys.hypixel}`)
        .then(res => res.json())
        .then(async json => {
          resolve(json);
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
        });
    });
  },

  minesaga: (username) => { // incomplete
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

          const clean = (val) => {
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
          for (let i = 0; games.length > i; i++) {
            const d = await fetch(`https://www.minesaga.org/player/${username}/${games[i]}`).then(res => res.text());
            const $ = cheerio.load(d);
            const stats = {};
            $("div.dd-section").each(function () {
              $(this).find("div.dd-stats").each(function () {
                $(this).find("dt").each(function () {
                  Object.assign(stats, { [clean($(this).text().trim().toLowerCase())]: $(this).parent().find("dd").text().trim().toLowerCase()});
                });
              });
            });
            data.games.push({
              game: games[i],
              stats
            });
          }
          resolve(data);
        });
    });
  },

};


