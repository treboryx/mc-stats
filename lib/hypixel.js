const fetch = require("node-fetch");
const keys = require("../keys.json");
const moment = require("moment");

module.exports = {
  hypixelPlayer: async (username) => {
    return new Promise((resolve, reject) => {
      fetch(`https://api.hypixel.net/player?key=${keys.hypixel}&name=${username}`)
        .then(res => res.json())
        .then(async json => {
          if (!json.player || json.success === false) return resolve({ errors: "User not found" });
          const player = json.player;
          const data = {
            player: {},
            socialMedia: {},
            tournaments: {},
            statistics: { 
              arcade: {},
              arena: {},
              battlegrounds: {},
              hunger_games: {},
              mcgo: {},
              paintball: {},
              quake: {},
              tnt_games: {},
              uhc: {},
              vampirez: {},
              walls: {},
              walls3: {},
              gingerbread: {},
              skywars: {},
              truecombat: {},
              super_smash: {},
              speed_uhc: {},
              skyclash: {},
              legacy: {},
              bedwars: {},
              murder_mystery: {},
              build_battle: {},
              duels: {},
              pit: {},
            }
          };
          
          const achievement_points = player.achievementPoints || 0;
          const achievements = player.achievements || 0;
          const achievements_one_time = player.achievementsOneTime || 0;
          const special_rank = player.rank ? player.rank : "None";
          const monthly_rank = player.mostRecentMonthlyPackageRank ? player.mostRecentMonthlyPackageRank : "None";
          const normal_rank = player.newPackageRank ? player.newPackageRank : "None";
          const first_login = player.firstLogin || "Unknown";
          const last_login = player.lastLogin || "Unknown";
          const last_logout = player.lastLogout || "Unknown";
          const networkExp = player.networkExp || "Unknown";
          const pending_friend_requests = player.friendRequests ? player.friendRequests.length : 0;
          const karma = player.karma || 0;
          const parkour_completions = player.parkourCompletions || 0;
          const time_played = player.timePlaying || 0;
          const vanity_tokens = player.vanityTokens || 0;
          const unlocked_cosmetics = player.vanityMeta.package ? player.vanityMeta.package.length : 0;
          const chat_channel = player.channel || "All";
          const recent_minecraft_version = player.mcVersionRp || "Unknown";
          const total_rewards = player.totalRewards || 0;
          const total_daily_rewards = player.totalDailyRewards || 0;
          const reward_streak = player.rewardStreak || 0;
          const reward_score = player.rewardScore || 0;
          const reward_high_score = player.rewardHighScore || 0;
          const language = player.language || "Unknown";
          const rank_plus_colour = player.rankPlusColor || "None";
          const most_recent_game = player.mostRecentGameType || "None";
  
          if (player.socialMedia) {
            var social_discord_link = "";
            var social_discord = player.socialMedia.DISCORD || "None";
            var social_twitter_link = "";
            var social_twitter = player.socialMedia.TWITTER || "None";
            var social_instagram_link = "";
            var social_instagram = player.socialMedia.INSTAGRAM || "None";
            var social_youtube_link = "";
            var social_youtube = player.socialMedia.YOUTUBE || "None";
            var social_forums_link = "";
            var social_forums = player.socialMedia.FORUMS || "None";
            var social_twitch_link = "";
            var social_twitch = player.socialMedia.TWITCH || "None";
            var social_mixer_link = "";
            var social_mixer = player.socialMedia.MIXER || "None";
            if (player.socialMedia.links) {
              social_discord_link = player.socialMedia.links.DISCORD || "None";
              social_twitter_link = player.socialMedia.links.TWITTER || "None";
              social_instagram_link = player.socialMedia.links.INSTAGRAM || "None";
              social_youtube_link = player.socialMedia.links.YOUTUBE || "None";
              social_forums_link = player.socialMedia.links.FORUMS || "None";
              social_twitch_link = player.socialMedia.links.TWITCH || "None";
              social_mixer_link = player.socialMedia.links.MIXER || "None";
            }
            Object.assign(data.socialMedia, { social_discord_link, social_discord, social_twitter_link, social_twitter, social_instagram_link, social_instagram, social_youtube_link, social_youtube, social_forums_link, social_forums, social_twitch_link, social_twitch, social_mixer_link, social_mixer });
          }

          if (player.tourney) {
            const first_join_lobby = player.tourney.first_join_lobby || 0;
            const total_tributes = player.tourney.total_tributes || 0;
            if (player.tourney.bedwars4s_0) {
              const bedwars_1_playtime = player.tourney.bedwars4s_0.playtime || 0;
              const bedwars_1_games_played = player.tourney.bedwars4s_0.games_played || 0;
              const bedwars_1_tributes_earned = player.tourney.bedwars4s_0.tributes_earned || 0;
              const bedwars_1_first_win = player.tourney.bedwars4s_0.first_win || 0;
              Object.assign(data.tournaments, { bedwars_1_playtime, bedwars_1_games_played, bedwars_1_tributes_earned, bedwars_1_first_win });
            }
            if (player.tourney.blitz_duo_0) {
              const blitz_1_playtime = player.tourney.blitz_duo_0.playtime || 0;
              const blitz_1_games_played = player.tourney.blitz_duo_0.games_played || 0;
              const blitz_1_tributes_earned = player.tourney.blitz_duo_0.tributes_earned || 0;
              const blitz_1_first_win = player.tourney.blitz_duo_0.first_win || 0;
              Object.assign(data.tournaments, { blitz_1_playtime, blitz_1_games_played, blitz_1_tributes_earned, blitz_1_first_win });
            }
            if (player.tourney.sw_crazy_solo_0) {
              const skywars_1_playtime = player.tourney.sw_crazy_solo_0.playtime || 0;
              const skywars_1_games_played = player.tourney.sw_crazy_solo_0.games_played || 0;
              const skywars_1_tributes_earned  = player.tourney.sw_crazy_solo_0.tributes_earned  || 0;
              const skywars_1_first_win = player.tourney.sw_crazy_solo_0.first_win || 0;
              Object.assign(data.tournaments, { skywars_1_playtime, skywars_1_games_played, skywars_1_tributes_earned, skywars_1_first_win });
            }
            if (player.tourney.bedwars_two_four_0) {
              const bedwars_2_playtime = player.tourney.bedwars_two_four_0.playtime || 0;
              const bedwars_2_games_played = player.tourney.bedwars_two_four_0.games_played || 0;
              const bedwars_2_tributes_earned = player.tourney.bedwars_two_four_0.tributes_earned  || 0;
              const bedwars_2_first_win = player.tourney.bedwars_two_four_0.first_win || 0;
              Object.assign(data.tournaments, { bedwars_2_playtime, bedwars_2_games_played, bedwars_2_tributes_earned, bedwars_2_first_win });
            }
            Object.assign(data.tournaments, { first_join_lobby, total_tributes });
          }

          Object.assign(data.player, { achievement_points, achievements, achievements_one_time, special_rank, monthly_rank, normal_rank, first_login, last_login, last_logout, networkExp, pending_friend_requests, karma, parkour_completions, time_played, vanity_tokens, unlocked_cosmetics, chat_channel, recent_minecraft_version, total_rewards, total_daily_rewards, reward_streak, reward_score, reward_high_score, language, rank_plus_colour, most_recent_game });
          
          if (player.stats.Arcade) {
            const arcade = player.stats.Arcade;

            const oitq_bounty_kills = arcade.bounty_kills_oneinthequiver || 0;
            const oitq_deaths = arcade.deaths_oneinthequiver || 0;
            const oitq_kills = arcade.kills_oneinthequiver || 0;
            const oitq_wins = arcade.wins_oneinthequiver || 0;
            data.statistics.arcade.bounty_hunters = { kills: oitq_kills, deaths: oitq_deaths, wins: oitq_wins, bounty_kills: oitq_bounty_kills };

            const throw_out_deaths = arcade.deaths_oneinthequiver || 0;
            const throw_out_kills = arcade.kills_throw_out || 0;
            const throw_out_wins = arcade.wins_throw_out || 0;
            data.statistics.arcade.throw_out = { kills: throw_out_kills, deaths: throw_out_deaths, wins: throw_out_wins };

            const dayone_headshots = arcade.headshots_dayone || 0;
            const dayone_kills = arcade.kills_dayone || 0;
            const dayone_wins = arcade.wins_dayone || 0;
            data.statistics.arcade.blocking_dead = { kills: dayone_kills, headshots: dayone_headshots, wins: dayone_wins };

            const dragonwars2_kills = arcade.kills_dragonwars2 || 0;
            const dragonwars2_wins = arcade.wins_dragonwars2 || 0;
            data.statistics.arcade.dragon_wars = { kills: dragonwars2_kills, wins: dragonwars2_wins };

            const farm_hunt_wins = arcade.wins_farm_hunt || 0;
            const grinch_wins = arcade.wins_grinch || 0;
            const dtt_wins = arcade.wins_draw_their_thing || 0;
            const hypixel_sports_wins = arcade.wins_hypixel_sports || 0;
            const ender_wins = arcade.wins_ender || 0;
            const santa_says_wins = arcade.wins_santa_says || 0;
            const santa_says_rounds = arcade.rounds_santa_says || 0;
            const simon_says_rounds = arcade.rounds_simon_says || 0;
            const simon_says_wins = arcade.wins_simon_says || 0;
            Object.assign(data.statistics.arcade, { misc_games: { farm_hunt_wins, grinch_wins, dtt_wins, hypixel_sports_wins, ender_wins, santa_says_wins, santa_says_rounds, simon_says_rounds, simon_says_wins } });

            const party_wins = arcade.wins_party || 0;
            const party_2_wins = arcade.wins_party_2 || 0;
            const party_3_wins = arcade.wins_party_3 || 0;
            data.statistics.arcade.party_games = { wins_party_1: party_wins, wins_party_2: party_2_wins, wins_party_3: party_3_wins };

            const sw_kills = arcade.sw_kills || 0;
            const sw_shots_fired = arcade.sw_shots_fired || 0;
            const sw_rebel_kills = arcade.sw_rebel_kills || 0;
            const sw_deaths = arcade.sw_deaths || 0;
            const sw_empire_kills = arcade.sw_empire_kills || 0;
            const sw_wins = arcade.sw_game_wins || 0;
            data.statistics.arcade.galaxy_wars = { kills: sw_kills, rebel_kills: sw_rebel_kills, empire_kills: sw_empire_kills, deaths: sw_deaths, wins: sw_wins, shots_fired: sw_shots_fired };

            const hitw_rounds = arcade.rounds_hole_in_the_wall || 0;
            const hitw_wins = arcade.wins_hole_in_the_wall || 0;
            const hitw_highscore_qualifications = arcade.hitw_record_q || 0;
            const hitw_highscore_finials = arcade.hitw_record_f || 0;
            data.statistics.arcade.hole_in_the_wall = { wins: hitw_wins, rounds: hitw_rounds, highscore_finials: hitw_highscore_finials, highscore_qualifications: hitw_highscore_qualifications };

            const mini_walls_kills = arcade.kills_mini_walls || 0;
            const mini_walls_deaths = arcade.deaths_mini_walls || 0;
            const mini_walls_wither_kills = arcade.wither_kills_mini_walls || 0;
            const mini_walls_wither_damage = arcade.wither_damage_mini_walls || 0;
            const mini_walls_final_kills = arcade.final_kills_mini_walls || 0;
            const mini_walls_kit = arcade.miniwalls_activeKit || "None";
            const mini_walls_arrows_hit = arcade.arrows_hit_mini_walls || 0;
            const mini_walls_arrows_shot = arcade.arrows_shot_mini_walls || 0;
            const mini_walls_wins = arcade.wins_mini_walls || 0;
            data.statistics.arcade.mini_walls = { kills: mini_walls_kills, final_kills: mini_walls_final_kills, wither_kills: mini_walls_wither_kills, arrows_shot: mini_walls_arrows_shot, arrows_hit: mini_walls_arrows_hit, wither_damage: mini_walls_wither_damage, wins: mini_walls_wins, deaths: mini_walls_deaths, selected_kit: mini_walls_kit };
 
            const soccer_power_kicks = arcade.powerkicks_soccer || 0;
            const soccer_goals = arcade.goals_soccer || 0;
            const soccer_wins = arcade.wins_soccer || 0;
            const soccer_kicks = arcade.kicks_soccer || 0; 
            data.statistics.arcade.soccer = { goals: soccer_goals, kicks: soccer_kicks, power_kicks: soccer_power_kicks, wins: soccer_wins };

            const zombies_best_round = arcade.best_round_zombies || 0;
            const zombies_times_knocked = arcade.times_knocked_down_zombies || 0;
            const zombies_kills = arcade.zombie_kills_zombies || 0;
            const zombies_bullets_shot = arcade.bullets_shot_zombies || 0;
            const zombies_bullets_hit = arcade.bullets_hit_zombies || 0;
            const zombies_headshot = arcade.headshots_zombies || 0;
            const zombies_players_revived = arcade.players_revived_zombies || 0;
            const zombies_deaths = arcade.deaths_zombies || 0;
            const zombies_windows_repaired = arcade.windows_repaired_zombies || 0;
            const zombies_rounds_survived = arcade.total_rounds_survived_zombies || 0;
            const zombies_wins = arcade.wins_zombies || 0;
            data.statistics.arcade.zombies = { kills: zombies_kills, headshots: zombies_headshot, deaths: zombies_deaths, times_knocked_down: zombies_times_knocked, bullets_shot: zombies_bullets_shot, bullets_hit: zombies_bullets_hit, best_round: zombies_best_round, players_revived: zombies_players_revived, windows_repaired: zombies_windows_repaired, rounds_survived: zombies_rounds_survived, rounds_won: zombies_wins };

            const has_seeker_wins = arcade.seeker_wins_hide_and_seek || 0;
            const has_hider_wins = arcade.hider_wins_hide_and_seek || 0;
            const has_seeker_wins_pp = arcade.party_pooper_seeker_wins_hide_and_seek || 0;
            const has_hider_wins_pp = arcade.party_pooper_hider_wins_hide_and_seek || 0;
            const has_hider_wins_ph = arcade.prop_hunt_hider_wins_hide_and_seek || 0;
            const has_seeker_wins_ph = arcade.prop_hunt_seeker_wins_hide_and_seek || 0;

            data.statistics.arcade.hide_and_seek = { seeker_wins: has_seeker_wins, seeker_wins_party_pooper: has_seeker_wins_pp, seeker_wins_prop_hunt: has_seeker_wins_ph, hider_wins: has_hider_wins, hider_wins_party_pooper: has_hider_wins_pp, hider_wins_prop_hunt: has_hider_wins_ph };
          }
          resolve(data);
        }).catch(e => {
          resolve({ "errors": "Can't fetch stats, API is probably offline." });
          console.log(e);
        });
    });
  },

  hypixelLevel: (exp) => { // completed
    const i = -3.5;
    const j = 12.25;
    const k = 0.0008;
    return exp < 0 ? 1 : Math.floor(1 + i + Math.sqrt(j + k * exp));
  },

  hypixelWatchdog: async (key) => { // completed
    return new Promise((resolve, reject) => {
      fetch(`https://api.hypixel.net/watchdogstats?key=${key}`)
        .then(res => res.json())
        .then(async json => {
          resolve(json);
        }).catch(e => {
          resolve({ "errors": "Can't fetch stats, API is probably offline." });
          console.log(e);
        });
    });
  },

  hypixelBoosters: async (key) => {
    return new Promise((resolve, reject) => {
      const getGametype = {
        2: "QUAKECRAFT",
        3: "WALLS",
        4: "PAINTBALL",
        5: "Blitz Survival Games",
        6: "TNT GAMES",
        7: "VAMPIREZ",
        13: "Mega Walls",
        14: "ARCADE",
        17: "ARENA",
        20: "UHC Champions",
        21: "Cops and Crims",
        23: "Warlords",
        24: "Smash Heroes",
        25: "Turbo Kart Racers",
        26: "Housing",
        51: "SkyWars",
        52: "Crazy Walls",
        54: "Speed UHC",
        55: "SkyClash",
        56: "Classic Games",
        57: "Prototype",
        58: "Bed Wars",
        59: "Murder Mystery",
        60: "Build Battle",
        61: "Duels",
      };
      fetch(`https://api.hypixel.net/boosters?key=${key}`)
        .then(res => res.json())
        .then(async json => {
          // console.log(json)
          if (!json.success) return resolve({ "errors": "There are no active boosters" });
          const arr = [];
          json.boosters.forEach(async e => {
            // const username = await fetch(`https://api.mojang.com/user/profiles/${e.purchaserUuid}/names`).then(res => res.json());
            const entry = {
              game: getGametype[e.gameType],
              // purchaser: username[username.length - 1] ? username[username.length - 1].name :  e.purchaserUuid,
              multiplier: `x${e.amount}`,
              remaining: moment.duration(e.length, "seconds").format(" m [mins], s [secs]"),
              originalLength: moment.duration(e.originalLength, "seconds").format(" m [mins], s [secs]"),
              activated: `${moment(e.dateActivated).format("MMM Do YYYY")} (${moment(e.dateActivated).fromNow()})`
            };
            arr.push(entry);
          });
          resolve(arr);
        });
    });
  },

  hypixelKey: async (key) => { // completed
    return new Promise((resolve, reject) => {
      fetch(`https://api.hypixel.net/key?key=${key}`)
        .then(res => res.json())
        .then(async json => {
          resolve(json);
        }).catch(e => {
          resolve({ "errors": "Can't fetch stats, API is probably offline." });
          console.log(e);
        });
    });
  },

};
