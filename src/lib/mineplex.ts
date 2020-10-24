import cheerio from 'cheerio';
import fetch from 'node-fetch'; // Main http module
export function mineplex(username: string) {
  return new Promise((resolve, reject) => {
    if (!username) return resolve({ errors: 'No username provided' });
    fetch(`https://www.mineplex.com/players/${username}`)
      .then((res) => res.text())
      .then((body) => {
        const data = { games: [] };
        const $ = cheerio.load(body);
        const name = $('.www-mp-username').text().trim();
        const rank = $('span[class="www-mp-rank"]').text().trim();
        const gamesPlayed = $("div[class='lbl lbl-me']")
          .text()
          .trim()
          .split(' ')[0];
        Object.assign(data, { name, rank });
        $('div.col-md-4').each(function () {
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
      })
      .catch((e) => {
        resolve({ errors: "Can't fetch stats, API is probably offline." });
        console.log(e);
      });
  });
}
