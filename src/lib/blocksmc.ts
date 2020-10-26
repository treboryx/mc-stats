import cheerio from 'cheerio';
import fetch from 'node-fetch'; // Main http module

export async function blocksmc(query: string, type: string) {
  if (type === 'leaderboard') {
    const leaderboards = [
      'sky-wars',
      'sky-wars-solo',
      'bed-wars',
      'bed-wars-solo',
      'egg-wars',
      'egg-wars-solo',
      'top-skypvp-s1',
      'survival-games',
      '1vs1',
      'the-bridge',
      'lucky-block-wars',
      'sky-giant',
      'sky-giant-mini',
      'murder-mystery',
      'tnt-tag',
      'block-party',
      'gravity',
      'super-jump',
      'splegg',
      'quake-craft',
      'uhc-run',
    ];
    if (!leaderboards.includes(query))
      return { errors: 'Invalid game leaderboard.' };
    const response = await fetch(`https://blocksmc.com/${query}`);
    const body = await response.text();
    const $ = cheerio.load(body);
    const template:  string[] = $('thead')
      .find('td')
      .map(function (_i, element) {
        const stat = $(element)
          .text()
          .trim()
          .replace(/\s\s|^Av$/g, '')
          .toLowerCase()
          .replace('#', 'rank')
          .replace('w/l', 'winLossRatio')
          .replace('k/d', 'killDeathRatio');
        if (stat.length > 0) return stat;
      })
      .get();
    const data = $('tbody')
      .find('tr')
      .map(function (_i, element) {
        const stat = $(element).text().trim().replace(/\s\s/g, '').split(' ');
        const obj: Record<string, unknown> = {};
        template.forEach(function (_value, index) {
          obj[template[index]] = !isNaN(Number(stat[index]))
            ? Number(stat[index])
            : stat[index];
        })
      });
    return data;
  } else if (type === 'player') {
    const response = await fetch(`https://blocksmc.com/player/${query}`);
    const body = await response.text();
    const $ = cheerio.load(body);
    const data = { games: {} };
    const name = $('.profile-header h1').text().trim();
    const rank = $('.profile-rank').text().replace('\n', '').trim();
    const timePlayed = $('h1[dir=ltr]').text().replace('\n', '').trim();
    let totalKills = $(element).find('div.key').find('div.val').map(function (_index, element){})
    let totalWins = 0;
    let totalGames = 0;
    let totalPoints = 0;
    let totalDeaths = 0;

    $('div.col-xl-4').map(function (_index, element) {
      const stats = {};
      $(element).map(function (_index, element) {
        switch ($(element).find('div.key').text()){
        case 'Kills':
          totalKills += Number($(element).find('div.val').text());
          break
        case 'Wins':
          totalWins += Number($(element).find('div.val').text());
          break
        case 'Played':
          totalGames += Number($(element).find('div.val').text());
          break
        case 'Points':
          totalPoints += Number($(element).find('div.val').text());
          break
        case 'Deaths':
          totalDeaths += Number($(element).find('div.val').text());
          break
        }
        stats[$(element).find('div.key').text()] = Number(
          $(element).find('div.val').text()
        );
      });
      data.games[
        $(element)
          .find('div.title')
          .text()
          .trim()
          .replace(/ |:/g, '_')
          .replace('1VS1', 'Duels')
      ] = stats;
      if (!name) return { errors: 'User not found' };
      return data;
    });
    Object.assign(data, {
      name,
      rank,
      timePlayed,
      totalKills,
      totalWins,
      totalGames,
      totalPoints,
      totalDeaths,
    });
  }
}
