import fetch from 'node-fetch'; // Main http module
export function hivemc(username: string, type: string) {
  return new Promise((resolve, reject) => {
    if (!username)
      return resolve({
        errors: 'No username provided',
      });
    if (!type)
      return resolve({
        errors: 'No query type provided',
      });
    if (!username) {
      return resolve({
        errors: 'No username provided',
      });
    }
    if (!type) {
      return resolve({
        errors: 'No query type provided',
      });
    }
    if (type === 'profile') {
      fetch(`http://api.hivemc.com/v1/player/${username}`)
        .then((res) => res.text())
        .then(async (_body) => {
          if (
            String(_body).includes(
              'Sorry, the page you are looking for could not be found'
            )
          ) {
            return resolve({
              errors: 'No data found for user: ' + username,
            });
          }
          const body = JSON.parse(_body);
          let achievements: number;
          const rank = body.modernRank.human || 0;
          const tokens = body.tokens || 0;
          const credits = body.credits || 0;
          const medals = body.medals || 0;
          const status = body.status.description || 'None';
          const currentGame = body.status.game || 'None';
          const firstLogin =
            body.firstLogin > 0
              ? `${unix(body.firstLogin).format('MMM Do YYYY')} (${unix(
                  body.firstLogin
                ).fromNow()})`
              : 'Never';
          const lastLogin =
            body.lastLogin > 0
              ? `${unix(body.lastLogin).format('MMM Do YYYY')} (${unix(
                  body.lastLogin
                ).fromNow()})`
              : 'Unknown';
          const lastLogout =
            body.lastLogout > 0
              ? `${unix(body.lastLogout).format('MMM Do YYYY')} (${unix(
                  body.lastLogout
                ).fromNow()})`
              : 'Unknown';
          if (body.achievements)
            achievements = Object.keys(body.achievements).length;
          else achievements = 0;
          resolve({
            rank,
            tokens,
            credits,
            medals,
            status,
            currentGame,
            firstLogin,
            lastLogin,
            lastLogout,
            achievements,
          });
        });
    }
    if (type === 'SG') {
      // Survival games 1 - broken
      return resolve({ errors: `No ${type} data found for user: ${username}` });
      // fetch(`http://api.hivemc.com/v1/player/${username}/SG`)
      //   .then(res => res.text())
      //   .then(async body => {
      //     body = JSON.parse(_body);
      //     if (body.code === 404 && body.short === "noprofile") return resolve({ errors: `No ${type} data found for user: ${username}` });
      //     let achievements;
      //     const victories = body.victories || 0;
      //     const total_points = body.total_points || 0;
      //     const most_points = body.most_points || 0;
      //     const games_played = body.gamesplayed || 0;
      //     const crates_opened = body.cratesopened || 0;
      //     const death_matches = body.deathmatches || 0;
      //     const kills = body.kills || 0;
      //     const deaths = body.deaths || 0;
      //     const time_alive = convertSeconds(body.timealive) || "None";
      //     const first_win = body.firstwinday && body.firstwinday > 0 ? { date: moment.unix(body.firstwinday).format("MMM Do YYYY"), fromnow: moment.unix(body.firstwinday).fromNow() } : "Never";
      //     const first_game = body.firstlogin && body.firstlogin > 0 ? { date: moment.unix(body.firstlogin).format("MMM Do YYYY"), fromnow: moment.unix(body.firstlogin).fromNow() } : "Never";
      //     const last_game = body.lastlogin && body.lastlogin > 0 ? { date: moment.unix(body.lastlogin).format("MMM Do YYYY"), fromnow: moment.unix(body.lastlogin).fromNow() } : "Never";
      //     if (body.achievements) achievements = Object.keys(body.achievements).length;
      //     else achievements = 0;
      //     resolve({ victories, total_points, most_points, games_played, crates_opened, death_matches, kills, deaths, time_alive, first_win, first_game, last_game, achievements });
      //   });
    }
    if (type === 'BP') {
      // block party
      fetch(`http://api.hivemc.com/v1/player/${username}/BP`)
        .then((res) => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404 && body.short === 'noprofile')
            return resolve({
              errors: `No ${type} data found for user: ${username}`,
            });
          let achievements: number;
          const games_played = body.games_played || 0;
          const total_kills = body.total_eliminations || 0;
          const total_placing = body.total_placing || 0;
          const total_points = body.total_points || 0;
          const victories = body.victories || 0;
          if (body.achievements)
            achievements = Object.keys(body.achievements).length;
          else achievements = 0;
          const title = body.title || 'None';
          const first_game =
            body.firstLogin && body.firstLogin > 0
              ? {
                  date: unix(body.firstLogin).format('MMM Do YYYY'),
                  fromnow: unix(body.firstLogin).fromNow(),
                }
              : 'Never';

          resolve({
            games_played,
            total_kills,
            total_placing,
            total_points,
            victories,
            achievements,
            title,
            first_game,
          });
        });
    }
    if (type === 'CAI') {
      // Cowboys and Indians
      fetch(`http://api.hivemc.com/v1/player/${username}/CAI`)
        .then((res) => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404 && body.short === 'noprofile')
            return resolve({
              errors: `No ${type} data found for user: ${username}`,
            });
          let achievements: number;
          const total_points = body.total_points || 0;
          const captured = body.captured || 0;
          const captures = body.captures || 0;
          const catches = body.catches || 0;
          const caught = body.caught || 0;
          const games_played = body.gamesplayed || 0;
          const victories = body.victories || 0;
          if (body.achievements)
            achievements = Object.keys(body.achievements).length;
          else achievements = 0;
          const title = body.title || 'None';
          const first_game =
            body.firstlogin && body.firstlogin > 0
              ? {
                  date: unix(body.firstlogin).format('MMM Do YYYY'),
                  fromnow: unix(body.firstlogin).fromNow(),
                }
              : 'Never';
          const last_game =
            body.lastlogin && body.lastlogin > 0
              ? {
                  date: unix(body.lastlogin).format('MMM Do YYYY'),
                  fromnow: unix(body.lastlogin).fromNow(),
                }
              : 'Never';

          resolve({
            total_points,
            captured,
            captures,
            catches,
            caught,
            games_played,
            victories,
            title,
            first_game,
            last_game,
            achievements,
          });
        });
    }
    if (type === 'CR') {
      // Cranked
      fetch(`http://api.hivemc.com/v1/player/${username}/CR`)
        .then((res) => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404 && body.short === 'noprofile')
            return resolve({
              errors: `No ${type} data found for user: ${username}`,
            });
          let achievements: number;
          const total_points = body.total_points || 0;
          const victories = body.victories || 0;
          const kills = body.kills || 0;
          const deaths = body.deaths || 0;
          const rccat_count = body.rccat_count || 0;
          const rccat_kills = body.rccat_kills || 0;
          const airstrike_count = body.airstrike_count || 0;
          const airstrike_kills = body.airstrike_kills || 0;
          const sonicsquid_count = body.sonicsquid_count || 0;
          const sonicsquid_kills = body.sonicsquid_kills || 0;
          const first_game =
            body.firstlogin && body.firstlogin > 0
              ? {
                  date: unix(body.firstlogin).format('MMM Do YYYY'),
                  fromnow: unix(body.firstlogin).fromNow(),
                }
              : 'Never';
          const last_game =
            body.lastlogin && body.lastlogin > 0
              ? {
                  date: unix(body.lastlogin).format('MMM Do YYYY'),
                  fromnow: unix(body.lastlogin).fromNow(),
                }
              : 'Never';
          const games_played = body.gamesplayed || 0;
          if (body.achievements)
            achievements = Object.keys(body.achievements).length;
          else achievements = 0;
          const title = body.title || 'None';

          resolve({
            total_points,
            victories,
            kills,
            deaths,
            rccat_count,
            rccat_kills,
            airstrike_count,
            airstrike_kills,
            sonicsquid_count,
            sonicsquid_kills,
            last_game,
            first_game,
            games_played,
            achievements,
            title,
          });
        });
    }
    if (type === 'DR') {
      // Death run
      fetch(`http://api.hivemc.com/v1/player/${username}/DR`)
        .then((res) => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404 && body.short === 'noprofile')
            return resolve({
              errors: `No ${type} data found for user: ${username}`,
            });
          let achievements: number;
          const total_points = body.total_points || 0;
          const victories = body.victories || 0;
          const kills = body.kills || 0;
          const deaths = body.deaths || 0;
          const games_played = body.games_played || 0;
          const title = body.title || 'None';
          const traps_activated = body.trapsactivated || 0;
          const runner_games_played = body.runnergamesplayed || 0;
          const death_games_played = body.deathgamesplayed || 0;
          const total_checkpoints = body.totalcheckpoints || 0;
          const runner_wins = body.runnerwins || 0;
          const death_wins = body.deathwins || 0;
          if (body.achievements)
            achievements = Object.keys(body.achievements).length;
          else achievements = 0;
          const first_game =
            body.firstlogin && body.firstlogin > 0
              ? {
                  date: unix(body.firstlogin).format('MMM Do YYYY'),
                  fromnow: unix(body.firstlogin).fromNow(),
                }
              : 'Never';
          const last_game =
            body.lastlogin && body.lastlogin > 0
              ? {
                  date: unix(body.lastlogin).format('MMM Do YYYY'),
                  fromnow: unix(body.lastlogin).fromNow(),
                }
              : 'Never';

          resolve({
            total_points,
            victories,
            kills,
            deaths,
            games_played,
            title,
            traps_activated,
            runner_games_played,
            death_games_played,
            total_checkpoints,
            runner_wins,
            death_wins,
            achievements,
            last_game,
            first_game,
          });
        });
    }

    if (type === 'HB') {
      // The Herobrine
      fetch(`http://api.hivemc.com/v1/player/${username}/HB`)
        .then((res) => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404 && body.short === 'noprofile')
            return resolve({
              errors: `No ${type} data found for user: ${username}`,
            });
          let achievements: number;
          const captures = body.captures || 0;
          const kills = body.kills || 0;
          const deaths = body.deaths || 0;
          const points = body.points || 0;
          const title = body.title || 'None';
          const active_classes = body.active_classes || 0;
          if (body.achievements)
            achievements = Object.keys(body.achievements).length;
          else achievements = 0;
          const first_game =
            body.firstlogin && body.firstlogin > 0
              ? {
                  date: unix(body.firstlogin).format('MMM Do YYYY'),
                  fromnow: unix(body.firstlogin).fromNow(),
                }
              : 'Never';

          resolve({
            captures,
            kills,
            deaths,
            points,
            active_classes,
            achievements,
            title,
            first_game,
          });
        });
    }

    if (type === 'HERO') {
      // SG:heros
      fetch(`http://api.hivemc.com/v1/player/${username}/HERO`)
        .then((res) => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404 && body.short === 'noprofile')
            return resolve({
              errors: `No ${type} data found for user: ${username}`,
            });
          let achievements: number;
          const total_points = body.total_points || 0;
          const victories = body.victories || 0;
          const kills = body.kills || 0;
          const deaths = body.deaths || 0;
          const one_vs_one_wins = body.one_vs_ones_wins || 0;
          const games_played = body.games_played || 0;
          const death_matches = body.deathmatches || 0;
          const tnt_used = body.tnt_used || 0;
          const crates_opened = body.crates_opened || 0;
          const food_consumed = body.food_consumed || 0;
          const first_game =
            body.firstlogin && body.firstlogin > 0
              ? {
                  date: unix(body.firstlogin).format('MMM Do YYYY'),
                  fromnow: unix(body.firstlogin).fromNow(),
                }
              : 'Never';
          const last_game =
            body.lastlogin && body.lastlogin > 0
              ? {
                  date: unix(body.lastlogin).format('MMM Do YYYY'),
                  fromnow: unix(body.lastlogin).fromNow(),
                }
              : 'Never';
          if (body.achievements)
            achievements = Object.keys(body.achievements).length;
          else achievements = 0;

          resolve({
            total_points,
            victories,
            kills,
            deaths,
            one_vs_one_wins,
            games_played,
            death_matches,
            tnt_used,
            crates_opened,
            food_consumed,
            first_game,
            last_game,
            achievements,
          });
        });
    }

    if (type === 'HIDE') {
      // Hide and seek
      fetch(`http://api.hivemc.com/v1/player/${username}/HIDE`)
        .then((res) => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404 && body.short === 'noprofile')
            return resolve({
              errors: `No ${type} data found for user: ${username}`,
            });
          let achievements: number;
          const total_points = body.total_points || 0;
          const victories = body.victories || 0;
          const hider_kills = body.hiderkills || 0;
          const seeker_kills = body.seekerkills || 0;
          const deaths = body.deaths || 0;
          const games_played = body.gamesplayed || 0;
          const time_alive = convertSeconds(body.timealive) || 0;
          let most_used_blocks = Object.keys(body.blockExperience).sort(
            function (a, b) {
              return body.blockExperience[b] - body.blockExperience[a];
            }
          );
          most_used_blocks = most_used_blocks.slice(0, 5);
          const first_game =
            body.firstlogin && body.firstlogin > 0
              ? {
                  date: unix(body.firstlogin).format('MMM Do YYYY'),
                  fromnow: unix(body.firstlogin).fromNow(),
                }
              : 'Never';
          const last_game =
            body.lastlogin && body.lastlogin > 0
              ? {
                  date: unix(body.lastlogin).format('MMM Do YYYY'),
                  fromnow: unix(body.lastlogin).fromNow(),
                }
              : 'Never';
          if (body.achievements)
            achievements = Object.keys(body.achievements).length;
          else achievements = 0;

          resolve({
            total_points,
            victories,
            hider_kills,
            seeker_kills,
            deaths,
            games_played,
            time_alive,
            most_used_blocks,
            first_game,
            last_game,
            achievements,
          });
        });
    }

    if (type === 'OITC') {
      // One In The Chanber
      fetch(`http://api.hivemc.com/v1/player/${username}/OITC`)
        .then((res) => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404 && body.short === 'noprofile')
            return resolve({
              errors: `No ${type} data found for user: ${username}`,
            });
          let achievements: number;
          const total_points = body.total_points || 0;
          const victories = body.victories || 0;
          const kills = body.kills || 0;
          const deaths = body.deaths || 0;
          const arrows_fired = body.arrowsfired || 0;
          const games_played = body.gamesplayed || 0;
          const title = body.title || 'None';
          const first_game =
            body.firstlogin && body.firstlogin > 0
              ? {
                  date: unix(body.firstlogin).format('MMM Do YYYY'),
                  fromnow: unix(body.firstlogin).fromNow(),
                }
              : 'Never';
          const last_game =
            body.lastlogin && body.lastlogin > 0
              ? {
                  date: unix(body.lastlogin).format('MMM Do YYYY'),
                  fromnow: unix(body.lastlogin).fromNow(),
                }
              : 'Never';
          if (body.achievements)
            achievements = Object.keys(body.achievements).length;
          else achievements = 0;

          resolve({
            total_points,
            victories,
            kills,
            deaths,
            arrows_fired,
            games_played,
            title,
            first_game,
            last_game,
            achievements,
          });
        });
    }

    if (type === 'SP') {
      // Splegg
      fetch(`http://api.hivemc.com/v1/player/${username}/SP`)
        .then((res) => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404 && body.short === 'noprofile')
            return resolve({
              errors: `No ${type} data found for user: ${username}`,
            });
          let achievements: number;
          const victories = body.victories || 0;
          const games_played = body.gamesplayed || 0;
          const eggs_fired = body.eggsfired || 0;
          const blocks_destroyed = body.blocksdestroyed || 0;
          const deaths = body.deaths || 0;
          const points = body.points || 0;
          const time_alive = convertSeconds(body.timealive) || 0;
          const title = body.title || 'None';
          const first_game =
            body.firstlogin && body.firstlogin > 0
              ? {
                  date: unix(body.firstlogin).format('MMM Do YYYY'),
                  fromnow: unix(body.firstlogin).fromNow(),
                }
              : 'Never';
          const last_game =
            body.lastlogin && body.lastlogin > 0
              ? {
                  date: unix(body.lastlogin).format('MMM Do YYYY'),
                  fromnow: unix(body.lastlogin).fromNow(),
                }
              : 'Never';
          if (body.achievements)
            achievements = Object.keys(body.achievements).length;
          else achievements = 0;

          resolve({
            victories,
            games_played,
            eggs_fired,
            blocks_destroyed,
            deaths,
            points,
            time_alive,
            title,
            first_game,
            last_game,
            achievements,
          });
        });
    }

    if (type === 'TIMV') {
      // Trouble in Mineville
      fetch(`http://api.hivemc.com/v1/player/${username}/TIMV`)
        .then((res) => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404 && body.short === 'noprofile')
            return resolve({
              errors: `No ${type} data found for user: ${username}`,
            });
          let achievements: number;
          const total_points = body.total_points || 0;
          const most_points = body.most_points || 0;
          const role_points = body.role_points || 0;
          const traitor_points = body.t_points || 0;
          const detective_points = body.d_points || 0;
          const innocent_points = body.i_points || 0;
          const title = body.title || 'None';
          const last_game =
            body.lastlogin && body.lastlogin > 0
              ? {
                  date: unix(body.lastlogin).format('MMM Do YYYY'),
                  fromnow: unix(body.lastlogin).fromNow(),
                }
              : 'Never';
          if (body.achievements)
            achievements = Object.keys(body.achievements).length;
          else achievements = 0;

          resolve({
            total_points,
            most_points,
            role_points,
            traitor_points,
            detective_points,
            innocent_points,
            title,
            last_game,
            achievements,
          });
        });
    }

    if (type === 'SKY') {
      // Skywars - broken
      return resolve({ errors: `No ${type} data found for user: ${username}` });
      // fetch(`http://api.hivemc.com/v1/player/${username}/SKY`)
      //   .then(res => res.text())
      //   .then(async body => {
      //     body = JSON.parse(_body);
      //     if (body.code === 404 && body.short === "noprofile") return resolve({ errors: `No ${type} data found for user: ${username}` });
      //     let achievements;
      //     const total_points = body.total_points || 0;
      //     const victories = body.victories || 0;
      //     const games_played = body.gamesplayed || 0;
      //     const kills = body.kills || 0;
      //     const deaths = body.deaths || 0;
      //     const most_points = body.most_points || 0;
      //     const time_alive = convertSeconds(body.timealive) || 0;
      //     const title = body.title || "None";
      //     const first_game = body.firstLogin && body.firstLogin > 0 ? { date: moment.unix(body.firstLogin).format("MMM Do YYYY"), fromnow: moment.unix(body.firstLogin).fromNow() } : "Never";
      //     const last_game = body.lastlogin && body.lastlogin > 0 ? { date: moment.unix(body.lastlogin).format("MMM Do YYYY"), fromnow: moment.unix(body.lastlogin).fromNow() } : "Never";
      //     if (body.achievements) achievements = Object.keys(body.achievements).length;
      //     else achievements = 0;
      //     resolve({ total_points, victories, games_played, kills, deaths, most_points, time_alive, title, first_game, last_game, achievements });
      //   });
    }

    if (type === 'DRAW') {
      // Draw it
      fetch(`http://api.hivemc.com/v1/player/${username}/DRAW`)
        .then((res) => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404 && body.short === 'noprofile')
            return resolve({
              errors: `No ${type} data found for user: ${username}`,
            });
          let achievements: number;
          const total_points = body.total_points || 0;
          const victories = body.victories || 0;
          const games_played = body.gamesplayed || 0;
          const correct_guesses = body.correct_guesses || 0;
          const incorrect_guesses = body.incorrect_guesses || 0;
          const skips = body.skips || 0;
          const title = body.title || 'None';
          const first_game =
            body.firstLogin && body.firstLogin > 0
              ? {
                  date: unix(body.firstLogin).format('MMM Do YYYY'),
                  fromnow: unix(body.firstLogin).fromNow(),
                }
              : 'Never';
          if (body.achievements)
            achievements = Object.keys(body.achievements).length;
          else achievements = 0;

          resolve({
            total_points,
            victories,
            games_played,
            correct_guesses,
            incorrect_guesses,
            skips,
            title,
            first_game,
            achievements,
          });
        });
    }

    if (type === 'SLAP') {
      // Slaparoo
      fetch(`http://api.hivemc.com/v1/player/${username}/SLAP`)
        .then((res) => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404 && body.short === 'noprofile')
            return resolve({
              errors: `No ${type} data found for user: ${username}`,
            });
          const victories = body.victories || 0;
          const games_played = body.gamesplayed || 0;
          const kills = body.kills || 0;
          const deaths = body.deaths || 0;
          const points = body.points || 0;
          const title = body.title || 'None';
          const first_game =
            body.firstlogin && body.firstlogin > 0
              ? {
                  date: unix(body.firstlogin).format('MMM Do YYYY'),
                  fromnow: unix(body.firstlogin).fromNow(),
                }
              : 'Never';
          const last_game =
            body.lastlogin && body.lastlogin > 0
              ? {
                  date: unix(body.lastlogin).format('MMM Do YYYY'),
                  fromnow: unix(body.lastlogin).fromNow(),
                }
              : 'Never';

          resolve({
            victories,
            games_played,
            kills,
            deaths,
            points,
            title,
            first_game,
            last_game,
          });
        });
    }

    if (type === 'EF') {
      // Electric Floor
      fetch(`http://api.hivemc.com/v1/player/${username}/EF`)
        .then((res) => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404 && body.short === 'noprofile')
            return resolve({
              errors: `No ${type} data found for user: ${username}`,
            });
          const victories = body.victories || 0;
          const outlived = body.outlived || 0;
          const games_played = body.gamesplayed || 0;
          const points = body.points || 0;
          const blocks_activated = body.blocksactivated || 0;
          const title = body.title || 'None';
          const first_game =
            body.firstlogin && body.firstlogin > 0
              ? {
                  date: unix(body.firstlogin).format('MMM Do YYYY'),
                  fromnow: unix(body.firstlogin).fromNow(),
                }
              : 'Never';
          const last_game =
            body.lastlogin && body.lastlogin > 0
              ? {
                  date: unix(body.lastlogin).format('MMM Do YYYY'),
                  fromnow: unix(body.lastlogin).fromNow(),
                }
              : 'Never';

          resolve({
            victories,
            outlived,
            games_played,
            points,
            blocks_activated,
            title,
            first_game,
            last_game,
          });
        });
    }
    if (type === 'MM') {
      // Music Masters
      fetch(`http://api.hivemc.com/v1/player/${username}/MM`)
        .then((res) => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404 && body.short === 'noprofile')
            return resolve({
              errors: `No ${type} data found for user: ${username}`,
            });
          const victories = body.victories || 0;
          const correct_notes = body.correctnotes || 0;
          const incorrect_notes = body.incorrectnotes || 0;
          const games_played = body.gamesplayed || 0;
          const points = body.points || 0;
          const notes_perfect = body.notes_perfect || 0;
          const notes_good = body.notes_good || 0;
          const title = body.title || 'None';
          const first_game =
            body.firstlogin && body.firstlogin > 0
              ? {
                  date: unix(body.firstlogin).format('MMM Do YYYY'),
                  fromnow: unix(body.firstlogin).fromNow(),
                }
              : 'Never';
          const last_game =
            body.lastlogin && body.lastlogin > 0
              ? {
                  date: unix(body.lastlogin).format('MMM Do YYYY'),
                  fromnow: unix(body.lastlogin).fromNow(),
                }
              : 'Never';

          resolve({
            victories,
            correct_notes,
            incorrect_notes,
            games_played,
            points,
            notes_perfect,
            notes_good,
            title,
            first_game,
            last_game,
          });
        });
    }

    if (type === 'GRAV') {
      // Gravity
      fetch(`http://api.hivemc.com/v1/player/${username}/GRAV`)
        .then((res) => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404 && body.short === 'noprofile')
            return resolve({
              errors: `No ${type} data found for user: ${username}`,
            });
          const victories = body.victories || 0;
          const games_played = body.gamesplayed || 0;
          const points = body.points || 0;
          let top_maps = Object.keys(body.maprecords).sort(function (a, b) {
            return body.maprecords[b] - body.maprecords[a];
          });
          top_maps = top_maps.slice(0, 5);
          const title = body.title || 'None';
          const first_game =
            body.firstlogin && body.firstlogin > 0
              ? {
                  date: unix(body.firstlogin).format('MMM Do YYYY'),
                  fromnow: unix(body.firstlogin).fromNow(),
                }
              : 'Never';
          const last_game =
            body.lastlogin && body.lastlogin > 0
              ? {
                  date: unix(body.lastlogin).format('MMM Do YYYY'),
                  fromnow: unix(body.lastlogin).fromNow(),
                }
              : 'Never';

          resolve({
            victories,
            games_played,
            points,
            top_maps,
            title,
            first_game,
            last_game,
          });
        });
    }

    if (type === 'RR') {
      // Restaurant Rush
      fetch(`http://api.hivemc.com/v1/player/${username}/RR`)
        .then((res) => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404 && body.short === 'noprofile')
            return resolve({
              errors: `No ${type} data found for user: ${username}`,
            });
          let achievements: number;
          const victories = body.victories || 0;
          const tables_cleared = body.tablescleared || 0;
          const games_played = body.gamesplayed || 0;
          const highscore = body.highscore || 0;
          const points = body.points || 0;
          const first_game =
            body.firstlogin && body.firstlogin > 0
              ? {
                  date: unix(body.firstlogin).format('MMM Do YYYY'),
                  fromnow: unix(body.firstlogin).fromNow(),
                }
              : 'Never';
          const last_game =
            body.lastlogin && body.lastlogin > 0
              ? {
                  date: unix(body.lastlogin).format('MMM Do YYYY'),
                  fromnow: unix(body.lastlogin).fromNow(),
                }
              : 'Never';
          if (body.achievements)
            achievements = Object.keys(body.achievements).length;
          else achievements = 0;

          resolve({
            victories,
            tables_cleared,
            highscore,
            games_played,
            points,
            first_game,
            last_game,
            achievements,
          });
        });
    }
    if (type === 'GNT') {
      // SkyGiants
      fetch(`http://api.hivemc.com/v1/player/${username}/GNT`)
        .then((res) => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404 && body.short === 'noprofile')
            return resolve({
              errors: `No ${type} data found for user: ${username}`,
            });
          const total_points = body.total_points || 0;
          const victories = body.victories || 0;
          const games_played = body.games_played || 0;
          const kills = body.kills || 0;
          const deaths = body.deaths || 0;
          const gold_earned = body.gold_earned || 0;
          const beasts_slain = body.beasts_slain || 0;
          const shutdowns = body.shutdowns || 0;
          const title = body.title || 'None';
          const first_game =
            body.firstLogin && body.firstLogin > 0
              ? {
                  date: unix(body.firstLogin).format('MMM Do YYYY'),
                  fromnow: unix(body.firstLogin).fromNow(),
                }
              : 'Never';
          const last_game =
            body.lastlogin && body.lastlogin > 0
              ? {
                  date: unix(body.lastlogin).format('MMM Do YYYY'),
                  fromnow: unix(body.lastlogin).fromNow(),
                }
              : 'Never';

          resolve({
            total_points,
            victories,
            games_played,
            kills,
            deaths,
            gold_earned,
            beasts_slain,
            shutdowns,
            title,
            first_game,
            last_game,
          });
        });
    }

    if (type === 'SGN') {
      // Survival Games 2 - broken
      return resolve({ errors: `No ${type} data found for user: ${username}` });
      // fetch(`http://api.hivemc.com/v1/player/${username}/SGN`)
      //   .then(res => res.text())
      //   .then(async body => {
      //     body = JSON.parse(_body);
      //     if (body.code === 404 && body.short === "noprofile") return resolve({ errors: `No ${type} data found for user: ${username}` });
      //     const victories = body.victories || 0;
      //     const total_points = body.total_points || 0;
      //     const most_points = body.most_points || 0;
      //     const games_played = body.games_played || 0;
      //     const crates_opened = body.crates_opened || 0;
      //     const death_matches = body.deathmatches || 0;
      //     const kills = body.kills || 0;
      //     const deaths = body.deaths || 0;
      //     const first_game = body.firstLogin && body.firstLogin > 0 ? { date: moment.unix(body.firstLogin).format("MMM Do YYYY"), fromnow: moment.unix(body.firstLogin).fromNow() } : "Never";
      //     const last_game = body.lastlogin && body.lastlogin > 0 ? { date: moment.unix(body.lastlogin).format("MMM Do YYYY"), fromnow: moment.unix(body.lastlogin).fromNow() } : "Never";
      //     resolve({ victories, total_points, most_points, games_played, crates_opened, death_matches, kills, deaths, first_game, last_game });
      //   });
    }

    if (type === 'BD') {
      // BatteryDash
      fetch(`http://api.hivemc.com/v1/player/${username}/BD`)
        .then((res) => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404 && body.short === 'noprofile')
            return resolve({
              errors: `No ${type} data found for user: ${username}`,
            });
          const total_points = body.total_points || 0;
          const games_played = body.games_played || 0;
          const kills = body.kills || 0;
          const deaths = body.deaths || 0;
          const energy_collected = body.energy_collected || 0;
          const batteries_charged = body.batteries_charged || 0;
          const title = body.title || 'None';
          const first_game =
            body.firstLogin && body.firstLogin > 0
              ? {
                  date: unix(body.firstLogin).format('MMM Do YYYY'),
                  fromnow: unix(body.firstLogin).fromNow(),
                }
              : 'Never';
          const last_game =
            body.lastlogin && body.lastlogin > 0
              ? {
                  date: unix(body.lastlogin).format('MMM Do YYYY'),
                  fromnow: unix(body.lastlogin).fromNow(),
                }
              : 'Never';

          resolve({
            total_points,
            games_played,
            kills,
            deaths,
            energy_collected,
            batteries_charged,
            title,
            first_game,
            last_game,
          });
        });
    }

    if (type === 'SPL') {
      // Sploop
      fetch(`http://api.hivemc.com/v1/player/${username}/SPL`)
        .then((res) => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404 && body.short === 'noprofile')
            return resolve({
              errors: `No ${type} data found for user: ${username}`,
            });
          let achievements: number;
          const total_points = body.total_points || 0;
          const victories = body.victories || 0;
          const games_played = body.games_played || 0;
          const kills = body.kills || 0;
          const deaths = body.deaths || 0;
          const blocks_painted = body.blocks_painted || 0;
          const ultimates_earned = body.ultimates_earned;
          let booster_blocks_painted: any;
          let booster_kills: any;
          let booster_deaths: any;
          let booster_ulimate_kills: any;
          let booster_games_played: any;
          let raven_blocks_painted: any;
          let raven_kills: any;
          let raven_deaths: any;
          let raven_ulimate_kills: any;
          let raven_games_played: any;
          let torstein_blocks_painted: any;
          let torstein_kills: any;
          let torstein_deaths: any;
          let torstein_ulimate_kills: any;
          let torstein_games_played: any;
          let oinky_blocks_painted: any;
          let oinky_kills: any;
          let oinky_deaths: any;
          let oinky_ulimate_kills: any;
          let oinky_games_played: any;

          if (body.character_stats) {
            if (body.character_stats.BoosterCharacter) {
              booster_blocks_painted =
                body.character_stats.BoosterCharacter.blocks_painted || 0;
              booster_kills = body.character_stats.BoosterCharacter.kills || 0;
              booster_deaths =
                body.character_stats.BoosterCharacter.deaths || 0;
              booster_ulimate_kills =
                body.character_stats.BoosterCharacter.ultimate_kills || 0;
              booster_games_played =
                body.character_stats.BoosterCharacter.games_played || 0;
            }
            if (body.character_stats.RavenCharacter) {
              raven_blocks_painted =
                body.character_stats.RavenCharacter.blocks_painted || 0;
              raven_kills = body.character_stats.RavenCharacter.kills || 0;
              raven_deaths = body.character_stats.RavenCharacter.deaths || 0;
              raven_ulimate_kills =
                body.character_stats.RavenCharacter.ultimate_kills || 0;
              raven_games_played =
                body.character_stats.RavenCharacter.games_played || 0;
            }
            if (body.character_stats.TorsteinCharacter) {
              torstein_blocks_painted =
                body.character_stats.TorsteinCharacter.blocks_painted || 0;
              torstein_kills =
                body.character_stats.TorsteinCharacter.kills || 0;
              torstein_deaths =
                body.character_stats.TorsteinCharacter.deaths || 0;
              torstein_ulimate_kills =
                body.character_stats.TorsteinCharacter.ultimate_kills || 0;
              torstein_games_played =
                body.character_stats.TorsteinCharacter.games_played || 0;
            }
            if (body.character_stats.OinkyCharacter) {
              oinky_blocks_painted =
                body.character_stats.OinkyCharacter.blocks_painted || 0;
              oinky_kills = body.character_stats.OinkyCharacter.kills || 0;
              oinky_deaths = body.character_stats.OinkyCharacter.deaths || 0;
              oinky_ulimate_kills =
                body.character_stats.OinkyCharacter.ultimate_kills || 0;
              oinky_games_played =
                body.character_stats.OinkyCharacter.games_played || 0;
            }
          }
          const title = body.title || 'None';
          const first_game =
            body.firstLogin && body.firstLogin > 0
              ? {
                  date: unix(body.firstLogin).format('MMM Do YYYY'),
                  fromnow: unix(body.firstLogin).fromNow(),
                }
              : 'Never';
          const last_game =
            body.lastlogin && body.lastlogin > 0
              ? {
                  date: unix(body.lastlogin).format('MMM Do YYYY'),
                  fromnow: unix(body.lastlogin).fromNow(),
                }
              : 'Never';
          if (body.achievements)
            achievements = Object.keys(body.achievements).length;
          else achievements = 0;

          resolve({
            total_points,
            victories,
            games_played,
            kills,
            deaths,
            blocks_painted,
            ultimates_earned,
            booster_blocks_painted,
            booster_kills,
            booster_deaths,
            booster_ulimate_kills,
            booster_games_played,
            raven_blocks_painted,
            raven_kills,
            raven_deaths,
            raven_ulimate_kills,
            raven_games_played,
            torstein_blocks_painted,
            torstein_kills,
            torstein_deaths,
            torstein_ulimate_kills,
            torstein_games_played,
            oinky_blocks_painted,
            oinky_kills,
            oinky_deaths,
            oinky_ulimate_kills,
            oinky_games_played,
            title,
            first_game,
            last_game,
            achievements,
          });
        });
    }

    if (type === 'MIMV') {
      // Murder In MineVille
      fetch(`http://api.hivemc.com/v1/player/${username}/MIMV`)
        .then((res) => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404 && body.short === 'noprofile')
            return resolve({
              errors: `No ${type} data found for user: ${username}`,
            });
          let achievements: number;
          const total_points = body.total_points || 0;
          const games_played = body.games_played || 0;
          const victories = body.victories || 0;
          const kills = body.kills || 0;
          const deaths = body.deaths || 0;
          const title = body.title || 'None';
          const first_game =
            body.firstLogin && body.firstLogin > 0
              ? {
                  date: unix(body.firstLogin).format('MMM Do YYYY'),
                  fromnow: unix(body.firstLogin).fromNow(),
                }
              : 'Never';
          const last_game =
            body.lastlogin && body.lastlogin > 0
              ? {
                  date: unix(body.lastlogin).format('MMM Do YYYY'),
                  fromnow: unix(body.lastlogin).fromNow(),
                }
              : 'Never';
          if (body.achievements)
            achievements = Object.keys(body.achievements).length;
          else achievements = 0;

          resolve({
            total_points,
            games_played,
            victories,
            kills,
            deaths,
            title,
            first_game,
            last_game,
            achievements,
          });
        });
    }

    if (type === 'BED') {
      // Bedwars
      fetch(`http://api.hivemc.com/v1/player/${username}/BED`)
        .then((res) => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404 && body.short === 'noprofile')
            return resolve({
              errors: `No ${type} data found for user: ${username}`,
            });
          let achievements: number;
          const total_points = body.total_points || 0;
          const victories = body.victories || 0;
          const games_played = body.games_played || 0;
          const kills = body.kills || 0;
          const deaths = body.deaths || 0;
          const beds_destroyed = body.beds_destroyed || 0;
          const teams_eliminated = body.teams_eliminated || 0;
          const win_streak = body.win_streak || 0;
          const title = body.title || 'None';
          const first_game =
            body.firstLogin && body.firstLogin > 0
              ? {
                  date: unix(body.firstLogin).format('MMM Do YYYY'),
                  fromnow: unix(body.firstLogin).fromNow(),
                }
              : 'Never';
          const last_game =
            body.lastlogin && body.lastlogin > 0
              ? {
                  date: unix(body.lastlogin).format('MMM Do YYYY'),
                  fromnow: unix(body.lastlogin).fromNow(),
                }
              : 'Never';
          if (body.achievements)
            achievements = Object.keys(body.achievements).length;
          else achievements = 0;

          resolve({
            total_points,
            games_played,
            victories,
            kills,
            deaths,
            beds_destroyed,
            teams_eliminated,
            win_streak,
            title,
            first_game,
            last_game,
            achievements,
          });
        });
    }
    if (type === 'leaderboards') {
      fetch(`http://api.hivemc.com/v1/game/${username}/leaderboard/`)
        .then((res) => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.code === 404) return resolve({ errors: body.message });
          resolve(body.leaderboard);
        });
    }
  });
}
