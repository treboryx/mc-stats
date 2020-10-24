import fetch from "node-fetch"; // Main http module
import cheerio from "cheerio";
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