import fetch from "node-fetch"; // Main http module
import cheerio from "cheerio";
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