import fetch from "node-fetch"; // Main http module
import cheerio from "cheerio";
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