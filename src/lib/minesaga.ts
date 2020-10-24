import fetch from "node-fetch"; // Main http module
import cheerio from "cheerio";
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