import fetch from "node-fetch"; // Main http module
import cheerio from "cheerio";
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