import fetch from 'node-fetch'; // Main http module
export function mccentral(query: string, type: string) {
  if (type === 'leaderboard') {
    return new Promise((resolve, reject) => {
      function mccentralLeaderboardName(leaderboard: any) {
        switch (leaderboard) {
          case 'survivalgames':
            return 'fsurvival';
          case 'skywars':
            return 'fskywars';
          case 'walls':
            return 'fwalls';
          case 'ctf':
            return 'fctf';
          case 'murdermayhem':
            return 'fmurder';
          case 'championbuilder':
            return 'fchaps';
          case 'cakewars':
            return 'fcakewars';
          case 'uhc':
            return 'uhcserver';
          case 'skyblock1':
            return 'sbNewReset1';
          case 'skyblock2':
            return 'sbNewReset2';
          case 'survival':
            return 'survival';
          case 'factions':
            return 'facs';
          case 'prison1':
            return 'prison';
          case 'prison2':
            return 'prison2';
          case 'kitpvp':
            return 'nkitpvp';
          case 'arenapvp':
            return 'arenapvp2';
        }
      }
      const leaderboardName = mccentralLeaderboardName(query);
      if (!leaderboardName)
        return resolve({ errors: 'Invaid game leaderboard.' });
      fetch(
        `https://mccentral.org/leaderboards-storage/leader/scripts/${leaderboardName}.php?sEcho=1&iColumns=6&sColumns=&iDisplayStart=0&iDisplayLength=25&mDataProp_0=0&mDataProp_1=1&mDataProp_2=2&mDataProp_3=3&mDataProp_4=4&mDataProp_5=5&sSearch=&bRegex=false&sSearch_0=&bRegex_0=false&bSearchable_0=true&sSearch_1=&bRegex_1=false&bSearchable_1=true&sSearch_2=&bRegex_2=false&bSearchable_2=true&sSearch_3=&bRegex_3=false&bSearchable_3=true&sSearch_4=&bRegex_4=false&bSearchable_4=true&sSearch_5=&bRegex_5=false&bSearchable_5=true&iSortCol_0=0&sSortDir_0=asc&iSortingCols=1&bSortable_0=false&bSortable_1=false&bSortable_2=false&bSortable_3=false&bSortable_4=false&bSortable_5=false`
      )
        .then((res) => res.json())
        .then((body) => {
          const data: readonly object[] = [];
          if (body.aaData.length > 0) {
            body.aaData.forEach((i: readonly any[]) => {
              switch (leaderboardName) {
                case 'fsurvival':
                  data.push({
                    username: i[1],
                    games: Number(i[2]),
                    wins: Number(i[3]),
                    kills: Number(i[4]),
                    deaths: Number(i[5]),
                  });
                case 'fskywars':
                  data.push({
                    username: i[1],
                    games: Number(i[2]),
                    wins: Number(i[3]),
                    kills: Number(i[4]),
                    deaths: Number(i[5]),
                  });
                case 'fwalls':
                  data.push({
                    username: i[1],
                    games: Number(i[2]),
                    wins: Number(i[3]),
                    kills: Number(i[4]),
                    deaths: Number(i[5]),
                  });
                case 'fctf':
                  data.push({
                    username: i[1],
                    games: Number(i[2]),
                    wins: Number(i[3]),
                    kills: Number(i[4]),
                    deaths: Number(i[5]),
                    flags_captured: Number(i[6]),
                  });
                case 'fmurder':
                  data.push({
                    username: i[1],
                    games: Number(i[2]),
                    wins: Number(i[3]),
                    murderer_kills: Number(i[4]),
                    bystander_kills: Number(i[5]),
                    karma: Number(i[6]),
                  });
                case 'fchaps':
                  data.push({
                    username: i[1],
                    blocks_placed: i[2],
                    blocks_broken: i[3],
                    wins: Number(i[4]),
                    games: Number(i[5]),
                  });
                case 'fcakewars':
                  data.push({
                    username: i[1],
                    games: Number(i[2]),
                    wins: Number(i[3]),
                    kills: Number(i[4]),
                    deaths: Number(i[5]),
                    cakes_destroyed: Number(i[6]),
                  });
                case 'uhcserver':
                  data.push({
                    username: i[1],
                    wins: Number(i[2]),
                    kills: Number(i[3]),
                    deaths: Number(i[4]),
                    gapples: Number(i[5]),
                  });
                case 'sbNewReset1':
                  data.push({
                    username: i[1],
                    level: i[2],
                    value: i[3],
                    hoppers: Number(i[4]),
                    spawners: i[5],
                  });
                case 'sbNewReset2':
                  data.push({
                    username: i[1],
                    level: i[2],
                    value: i[3],
                    hoppers: Number(i[4]),
                    spawners: i[5],
                  });
                case 'survival':
                  data.push({
                    username: i[1],
                    balance: i[2],
                    kills: Number(i[3]),
                    deaths: Number(i[4]),
                    quests: Number(i[5]),
                  });
                case 'facs':
                  data.push({
                    username: i[1],
                    wealth: i[2],
                    spawners: Number(i[3]),
                  });
                case 'prison':
                  data.push({
                    username: i[1],
                    prison: i[2],
                    kills: Number(i[3]),
                    deaths: Number(i[4]),
                    blocks_mined: i[5],
                    gang: i[6],
                  });
                case 'prison2':
                  data.push({
                    username: i[1],
                    prison: i[2],
                    kills: Number(i[3]),
                    deaths: Number(i[4]),
                    blocks_mined: i[5],
                    gang: i[6],
                  });
                case 'nkitpvp':
                  data.push({
                    username: i[1],
                    kills: Number(i[2]),
                    deaths: Number(i[3]),
                    level: Number(i[4]),
                    gapples: Number(i[5]),
                    events_won: Number(i[6]),
                  });
                case 'arenapvp2':
                  data.push({
                    username: i[1],
                    duels: Number(i[2]),
                    duels_won: Number(i[3]),
                    win_ratio: i[4],
                    duels_rank: i[5],
                  });
              }
            });
            resolve(data);
          } else {
            return resolve({ errors: 'No leaderboards found.' });
          }
        })
        .catch((e) => {
          resolve({
            errors: "Can't fetch stats, Website is probably offline.",
          });
          console.log(e);
        });
    });
  }
  if (type === 'player') {
    return new Promise(async (resolve, reject) => {
      type Game = {
        readonly [key: string]: {};
      };
      type PlayerData = {
        readonly [key: string]: Game;
      };
      const data: PlayerData = {};
      const games = [
        'fsurvival',
        'fskywars',
        'fwalls',
        'fctf',
        'fmurder',
        'fchamps',
        'fcakewars',
        'uhcserver',
        'sbNewReset1',
        'sbNewReset2',
        'survival',
        'facs',
        'prison',
        'prison2',
        'nkitpvp',
        'arenapvp2',
      ];
      for (let i = 0; i < games.length; i++) {
        await fetch(
          `https://mccentral.org/leaderboards-storage/leader/scripts/${games[i]}.php?sSearch=${query}&bRegex=false&sSearch_0=&bRegex_0=false&bSearchable_0=true&sSearch_1=&bRegex_1=false&bSearchable_1=true&sSearch_2=&bRegex_2=false&bSearchable_2=true&sSearch_3=&bRegex_3=false&bSearchable_3=true&sSearch_4=&bRegex_4=false&bSearchable_4=true&sSearch_5=&bRegex_5=false&bSearchable_5=true&iSortCol_0=0&sSortDir_0=asc&iSortingCols=1&bSortable_0=false&bSortable_1=false&bSortable_2=false&bSortable_3=false&bSortable_4=false&bSortable_5=false`
        )
          .then((res) => res.json())
          .then((body) => {
            if (
              body.aaData.length > 0 &&
              body.aaData[0][1].toLowerCase() === query.toLowerCase()
            ) {
              switch (games[i]) {
                case 'fsurvival':
                  data.survival_games.rank = Number(body.aaData[0][0]);
                  data.survival_games.games = Number(body.aaData[0][2]);
                  data.survival_games.wins = Number(body.aaData[0][3]);
                  data.survival_games.kills = Number(body.aaData[0][4]);
                  data.survival_games.deaths = Number(body.aaData[0][5]);

                case 'fskywars':
                  data.skywars.rank = Number(body.aaData[0][0]);
                  data.skywars.games = Number(body.aaData[0][2]);
                  data.skywars.wins = Number(body.aaData[0][3]);
                  data.skywars.kills = Number(body.aaData[0][4]);
                  data.skywars.deaths = Number(body.aaData[0][5]);

                case 'fwalls':
                  data.walls.rank = Number(body.aaData[0][0]);
                  data.walls.games = Number(body.aaData[0][2]);
                  data.walls.wins = Number(body.aaData[0][3]);
                  data.walls.kills = Number(body.aaData[0][4]);
                  data.walls.deaths = Number(body.aaData[0][5]);
                case 'fctf':
                  data.ctf.rank = Number(body.aaData[0][0]);
                  data.ctf.games = Number(body.aaData[0][2]);
                  data.ctf.wins = Number(body.aaData[0][3]);
                  data.ctf.kills = Number(body.aaData[0][4]);
                  data.ctf.deaths = Number(body.aaData[0][5]);
                  data.ctf.flags_captured = Number(body.aaData[0][6]);

                case 'fmurder':
                  data.murder.rank = Number(body.aaData[0][0]);
                  data.murder.games = Number(body.aaData[0][2]);
                  data.murder.wins = Number(body.aaData[0][3]);
                  data.murder.murderer_kills = Number(body.aaData[0][4]);
                  data.murder.bystander_kills = Number(body.aaData[0][5]);
                  data.murder.karma = Number(body.aaData[0][6]);

                case 'fchamps':
                  data.champs.rank = Number(body.aaData[0][0]);
                  data.champs.blocks_placed = body.aaData[0][2];
                  data.champs.blocks_broken = body.aaData[0][3];
                  data.champs.wins = Number(body.aaData[0][4]);
                  data.champs.games = Number(body.aaData[0][5]);

                case 'fcakewars':
                  data.cakewars.rank = Number(body.aaData[0][0]);
                  data.cakewars.games = Number(body.aaData[0][2]);
                  data.cakewars.wins = Number(body.aaData[0][3]);
                  data.cakewars.kills = Number(body.aaData[0][4]);
                  data.cakewars.deaths = Number(body.aaData[0][5]);
                  data.cakewars.cakes_destroyed = Number(body.aaData[0][6]);

                case 'uhcserver':
                  data.uhc.rank = Number(body.aaData[0][0]);
                  data.uhc.wins = Number(body.aaData[0][2]);
                  data.uhc.kills = Number(body.aaData[0][3]);
                  data.uhc.deaths = Number(body.aaData[0][4]);
                  data.uhc.gapples = Number(body.aaData[0][5]);

                case 'sbNewReset1':
                  data.skyblock1.rank = Number(body.aaData[0][0]);
                  data.skyblock1.level = body.aaData[0][2];
                  data.skyblock1.value = body.aaData[0][3];
                  data.skyblock1.hoppers = Number(body.aaData[0][4]);
                  data.skyblock1.spawners = body.aaData[0][5];

                case 'sbNewReset2':
                  data.skyblock2.rank = Number(body.aaData[0][0]);
                  data.skyblock2.level = body.aaData[0][2];
                  data.skyblock2.value = body.aaData[0][3];
                  data.skyblock2.hoppers = Number(body.aaData[0][4]);
                  data.skyblock2.spawners = body.aaData[0][5];

                case 'survival':
                  data.survival.rank = Number(body.aaData[0][0]);
                  data.survival.balance = body.aaData[0][2];
                  data.survival.kills = Number(body.aaData[0][3]);
                  data.survival.deaths = Number(body.aaData[0][4]);
                  data.survival.quests = Number(body.aaData[0][5]);

                case 'factions':
                  data.factions.rank = Number(body.aaData[0][0]);
                  data.factions.wealth = body.aaData[0][2];
                  data.factions.spawners = Number(body.aaData[0][3]);

                case 'prison':
                  data.prison1.rank = Number(body.aaData[0][0]);
                  data.prison1.prison = body.aaData[0][2];
                  data.prison1.kills = Number(body.aaData[0][3]);
                  data.prison1.deaths = Number(body.aaData[0][4]);
                  data.prison1.blocks_mined = body.aaData[0][5];
                  data.prison1.gang = body.aaData[0][6];

                case 'prison2':
                  data.prison2.rank = Number(body.aaData[0][0]);
                  data.prison2.prison = body.aaData[0][2];
                  data.prison2.kills = Number(body.aaData[0][3]);
                  data.prison2.deaths = Number(body.aaData[0][4]);
                  data.prison2.blocks_mined = body.aaData[0][5];
                  data.prison2.gang = body.aaData[0][6];

                case 'nkitpvp':
                  data.kitpvp.rank = Number(body.aaData[0][0]);
                  data.kitpvp.kills = Number(body.aaData[0][2]);
                  data.kitpvp.deaths = Number(body.aaData[0][3]);
                  data.kitpvp.level = Number(body.aaData[0][4]);
                  data.kitpvp.gapples = Number(body.aaData[0][5]);
                  data.kitpvp.events_won = Number(body.aaData[0][6]);

                case 'arenapvp2':
                  data.arenapvp.rank = Number(body.aaData[0][0]);
                  data.arenapvp.duels = Number(body.aaData[0][2]);
                  data.arenapvp.duels_won = Number(body.aaData[0][3]);
                  data.arenapvp.win_ratio = body.aaData[0][4];
                  data.arenapvp.duels_rank = body.aaData[0][5];
              }
            }
          })
          .catch((e) => {
            resolve({
              errors: "Can't fetch stats, Website is probably offline.",
            });
            console.log(e);
          });
      }
      return resolve(data);
    });
  }
}
