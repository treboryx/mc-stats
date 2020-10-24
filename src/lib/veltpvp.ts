import cheerio from 'cheerio';
import fetch from 'node-fetch'; // Main http module
export function veltpvp(username: string) {
  return new Promise(async (resolve, reject) => {
    if (!username) return resolve({ errors: 'No username provided' });
    fetch(`https://www.veltpvp.com/u/${username}`)
      .then((res) => res.text())
      .then(async (body) => {
        const calcFirstLogin = (input: string) => {
          const arr = input.split('/');
          const final = new Date(`${arr[2]}-${arr[1]}-${arr[0]}`);
          return `${moment(final).format('MMM Do YYYY')} (${moment(
            final
          ).fromNow()})`;
        };
        type Data1 = {
          readonly [key: string]: object;
        };
        type Data = {
          readonly games: Data1;
        };
        const data: Data = { games: {} };
        const $ = cheerio.load(body);
        if ($('body').text().trim().includes('not found'))
          return resolve({ errors: 'User not found' });
        const name = $('h1#name').text().trim();
        let status = $('div.top').text().trim(); // offline/online/banned
        if (status.includes(' ')) status = status.split(' ')[1].toLowerCase();
        let seen: string;
        if (status === 'offline') {
          seen =
            $('div.bottom').text().trim().split('\n ')[0] +
            ' ' +
            $('div.bottom').text().trim().split('\n ')[1].trim();
        } else if (status === 'online') {
          seen = $('div.bottom').text().trim();
        } else {
          seen = '';
        }
        const rank = $('div#profile h2').text().trim();
        const firstLogin = calcFirstLogin(
          $('div.content strong').text().trim().substring(0, 10)
        );
        Object.assign(data, { name, status, rank, firstLogin, seen });
        $('.server').each(function () {
          const stats = {};
          $(this)
            .find('div.server-stat')
            .each(function () {
              Object.assign(stats, {
                [camelCase(
                  $(this)
                    .find('.server-stat-description')
                    .text()
                    .trim()
                    .toLowerCase()
                ).replace(/ /g, '_')]: Number(
                  $(this)
                    .find('.server-stat-number')
                    .text()
                    .trim()
                    .toLowerCase()
                    .replace('n/a', '0')
                ),
              });
            });
          if (
            $(this).find('.server-header').text().trim().toLowerCase().length >
            0
          )
            data.games[
              $(this).find('.server-header').text().trim().toLowerCase()
            ] = stats;
        });
        resolve(data);
      })
      .catch((e) => {
        if (e.statusCode === 404) {
          resolve({ errors: 'User not found' });
        } else {
          console.log(e);
        }
      });
  });
}
