import cheerio from 'cheerio';
import fetch from 'node-fetch'; // Main http module

export function funcraft(username: string) {
  return new Promise((resolve, _reject) => {
    if (!username) return resolve({ errors: 'No username provided' });
    fetch(`https://www.funcraft.net/fr/joueurs?q=${username}`)
      .then((res) => res.text())
      .then((body) => {
        const clean = (val: string) => {
          if (val === 'classement') {
            return 'ranking';
          } else if (val === 'défaites') {
            return 'losses';
          } else if (val === 'temps de jeu') {
            return 'playtime';
          } else if (val === 'morts') {
            return 'deaths';
          } else if (val === 'lits détruits') {
            return 'destroyedBeds';
          } else if (val === 'top 1') {
            return 'top1';
          } else if (val === 'dégats') {
            return 'damage';
          } else if (val === 'dégats au Nexus') {
            return 'nexusDamage';
          } else if (val === 'victoires') {
            return 'wins';
          } else if (val.includes('ème')) {
            return val.replace('ème', '');
          } else if (val.includes(' ')) {
            return val.replace(' ', '');
          } else {
            return val;
          }
        };

        const toNumber = (n: string) => {
          if (n.match(/[a-z]/i)) {
            return n;
          } else if (!isNaN(parseInt(n))) {
            return parseInt(n).toLocaleString();
          } else if (n.includes(' ')) {
            if (!isNaN(parseInt(n))) {
              return parseInt(n).toLocaleString();
            }
          } else {
            return n;
          }
        };
        type Data1 = {
          readonly [key: string]: object;
        };
        type Data = {
          readonly games: Data1;
        };
        const data: Data = { games: {} };
        const $ = cheerio.load(body);
        if (
          $("div[class='container alert-container']")
            .text()
            .trim()
            .includes('× Une ou plusieurs erreurs sont survenues :')
        )
          return resolve({ errors: 'User does not have any information' });

        function formatTimeFuncraft(_date: string) {
          const date = _date.split(' ');
          const day = date[0];
          const year = date[2].replace(',', '');
          let time = date[3].replace('h', ':');
          time = moment(time, 'hh:mm').format('hh:mm a');
          let month = '';
          switch (date[1]) {
            case 'janvier':
              month = 'January';
              break;
            case 'février':
              month = 'February';
              break;
            case 'mars':
              month = 'March';
              break;
            case 'avril':
              month = 'April';
              break;
            case 'mai':
              month = 'May';
              break;
            case 'juin':
              month = 'June';
              break;
            case 'juillet':
              month = 'July';
              break;
            case 'aout':
              month = 'August';
              break;
            case 'septembre':
              month = 'September';
              break;
            case 'octobre':
              month = 'October';
              break;
            case 'novembre':
              month = 'November';
              break;
            case 'décembre':
              month = 'December';
              break;
            default:
              month = date[1];
              break;
          }
          return `${day} ${month} ${year}, ${time}`;
        }

        const name = $('.playername').text().trim().split(' ')[1];
        const rank = $('.playername').text().trim().split(' ')[0];
        const gamesPlayed = Number(
          $("div[class='lbl lbl-me']").text().trim().split(' ')[0]
        );
        const registration = formatTimeFuncraft(
          $("span[class='tooltips']")[0].attribs.title
        );
        const lastLogin = formatTimeFuncraft(
          $("span[class='tooltips']")[1].attribs.title
        );
        Object.assign(data, {
          name,
          rank,
          gamesPlayed,
          registration,
          lastLogin,
        });
        $('div.col-md-4').each(function () {
          const stats = {};

          $(this)
            .find('div.stats-entry')
            .each(function () {
              Object.assign(stats, {
                [clean(
                  $(this).find('div.stats-name').text().trim().toLowerCase()
                )]: Number(
                  toNumber(
                    clean($(this).find('div.stats-value-daily').text().trim())
                  )
                    ?.replace(/-/g, '0')
                    ?.replace(/h|m|,| /g, '')
                ),
              });
            });
          if (size(stats)) {
            data.games[
              $(this)
                .find('div.name')
                .text()
                .trim()
                .replace('Infecté', 'Infected')
            ] = stats;
          }
        });
        resolve(data);
      })
      .catch((e) => {
        resolve({ errors: "Can't fetch stats, Website is probably offline." });
        console.log(e);
      });
  });
}
