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
              blitz: {},
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

            const arcade_coins = arcade.coins || 0;
            data.statistics.arcade = { coins: arcade_coins };

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

          if (player.stats.HungerGames) {
            const blitz = player.stats.HungerGames;

            const blitz_coins = blitz.coins || 0;
            const blitz_deaths = blitz.deaths || 0;
            const blitz_kills = blitz.kills || 0;
            const blitz_wins = blitz.wins || 0;
            const blitz_wins_teams = blitz.wins_teams || 0;
            const blitz_damage = blitz.damage || 0;
            const blitz_damage_taken = blitz.damage_taken || 0;
            const blitz_potions_drunk = blitz.potions_drunk || 0;
            const blitz_potions_thrown = blitz.potions_thrown || 0;
            const blitz_mobs_spawned = blitz.mobs_spawned || 0;
            const blitz_chests_opened = blitz.chests_opened || 0;
            const blitz_arrows_hit = blitz.arrows_hit || 0;
            const blitz_arrows_fired = blitz.arrows_fired || 0;
            const blitz_games_played = blitz.games_played || 0;
            const blitz_time_played = blitz.time_played || 0;

            data.statistics.blitz = {coins: blitz_coins, wins: blitz_wins, team_wins: blitz_wins_teams, kills: blitz_kills, deaths: blitz_deaths, damage_given: blitz_damage, damage_taken: blitz_damage_taken, arrows_fired: blitz_arrows_fired, arrows_hit: blitz_arrows_hit, potions_drunk: blitz_potions_drunk, potions_thrown: blitz_potions_thrown, mobs_spawned: blitz_mobs_spawned, chests_opened: blitz_chests_opened, games_played: blitz_games_played, time_played: blitz_time_played };
            if (blitz.games_played_horsetamer) {
              const blitz_horsetamer_kills = blitz.kills_horsetamer || 0;
              const blitz_horsetamer_wins = blitz.wins_horsetamer || 0;
              const blitz_horsetamer_wins_teams = blitz.wins_teams_horsetamer || 0;
              const blitz_horsetamer_damage = blitz.damage_horsetamer || 0;
              const blitz_horsetamer_damage_taken = blitz.damage_taken_horsetamer || 0;
              const blitz_horsetamer_potions_drunk = blitz.potions_drunk_horsetamer || 0;
              const blitz_horsetamer_potions_thrown = blitz.potions_thrown_horsetamer || 0;
              const blitz_horsetamer_mobs_spawned = blitz.mobs_spawned_horsetamer || 0;
              const blitz_horsetamer_chests_opened = blitz.chests_opened_horsetamer || 0;
              const blitz_horsetamer_arrows_hit = blitz.arrows_hit_horsetamer || 0;
              const blitz_horsetamer_arrows_fired = blitz.arrows_fired_horsetamer || 0;
              const blitz_horsetamer_games_played = blitz.games_played_horsetamer || 0;
              const blitz_horsetamer_time_played = blitz.time_played_horsetamer || 0;
              const blitz_horsetamer_exp = blitz.exp_horsetamer || 0;
              const blitz_horsetamer_level = blitz.horsetamer || 0;

              data.statistics.blitz.horsetamer = { wins: blitz_horsetamer_wins, team_wins: blitz_horsetamer_wins_teams, kills: blitz_horsetamer_kills, damage_given: blitz_horsetamer_damage, damage_taken: blitz_horsetamer_damage_taken, arrows_fired: blitz_horsetamer_arrows_fired, arrows_hit: blitz_horsetamer_arrows_hit, potions_drunk: blitz_horsetamer_potions_drunk, potions_thrown: blitz_horsetamer_potions_thrown, mobs_spawned: blitz_horsetamer_mobs_spawned, chests_opened: blitz_horsetamer_chests_opened, games_played: blitz_horsetamer_games_played, time_played: blitz_horsetamer_time_played, experience: blitz_horsetamer_exp, level: blitz_horsetamer_level };
            }
            if (blitz.games_played_ranger) {
              const blitz_ranger_kills = blitz.kills_ranger || 0;
              const blitz_ranger_wins = blitz.wins_ranger || 0;
              const blitz_ranger_wins_teams = blitz.wins_teams_ranger || 0;
              const blitz_ranger_damage = blitz.damage_ranger || 0;
              const blitz_ranger_damage_taken = blitz.damage_taken_ranger || 0;
              const blitz_ranger_potions_drunk = blitz.potions_drunk_ranger || 0;
              const blitz_ranger_potions_thrown = blitz.potions_thrown_ranger || 0;
              const blitz_ranger_mobs_spawned = blitz.mobs_spawned_ranger || 0;
              const blitz_ranger_chests_opened = blitz.chests_opened_ranger || 0;
              const blitz_ranger_arrows_hit = blitz.arrows_hit_ranger || 0;
              const blitz_ranger_arrows_fired = blitz.arrows_fired_ranger || 0;
              const blitz_ranger_games_played = blitz.games_played_ranger || 0;
              const blitz_ranger_time_played = blitz.time_played_ranger || 0;
              const blitz_ranger_exp = blitz.exp_ranger || 0;
              const blitz_ranger_level = blitz.ranger || 0;

              data.statistics.blitz.ranger = { wins: blitz_ranger_wins, team_wins: blitz_ranger_wins_teams, kills: blitz_ranger_kills, damage_given: blitz_ranger_damage, damage_taken: blitz_ranger_damage_taken, arrows_fired: blitz_ranger_arrows_fired, arrows_hit: blitz_ranger_arrows_hit, potions_drunk: blitz_ranger_potions_drunk, potions_thrown: blitz_ranger_potions_thrown, mobs_spawned: blitz_ranger_mobs_spawned, chests_opened: blitz_ranger_chests_opened, games_played: blitz_ranger_games_played, time_played: blitz_ranger_time_played, experience: blitz_ranger_exp, level: blitz_ranger_level };
            }
            if (blitz.games_played_archer) {
              const blitz_archer_kills = blitz.kills_archer || 0;
              const blitz_archer_wins = blitz.wins_archer || 0;
              const blitz_archer_wins_teams = blitz.wins_teams_archer || 0;
              const blitz_archer_damage = blitz.damage_archer || 0;
              const blitz_archer_damage_taken = blitz.damage_taken_archer || 0;
              const blitz_archer_potions_drunk = blitz.potions_drunk_archer || 0;
              const blitz_archer_potions_thrown = blitz.potions_thrown_archer || 0;
              const blitz_archer_mobs_spawned = blitz.mobs_spawned_archer || 0;
              const blitz_archer_chests_opened = blitz.chests_opened_archer || 0;
              const blitz_archer_arrows_hit = blitz.arrows_hit_archer || 0;
              const blitz_archer_arrows_fired = blitz.arrows_fired_archer || 0;
              const blitz_archer_games_played = blitz.games_played_archer || 0;
              const blitz_archer_time_played = blitz.time_played_archer || 0;
              const blitz_archer_exp = blitz.exp_archer || 0;
              const blitz_archer_level = blitz.archer || 0;

              data.statistics.blitz.archer = { wins: blitz_archer_wins, team_wins: blitz_archer_wins_teams, kills: blitz_archer_kills, damage_given: blitz_archer_damage, damage_taken: blitz_archer_damage_taken, arrows_fired: blitz_archer_arrows_fired, arrows_hit: blitz_archer_arrows_hit, potions_drunk: blitz_archer_potions_drunk, potions_thrown: blitz_archer_potions_thrown, mobs_spawned: blitz_archer_mobs_spawned, chests_opened: blitz_archer_chests_opened, games_played: blitz_archer_games_played, time_played: blitz_archer_time_played, experience: blitz_archer_exp, level: blitz_archer_level };
            }
            if (blitz.games_played_astronaut) {
              const blitz_astronaut_kills = blitz.kills_astronaut || 0;
              const blitz_astronaut_wins = blitz.wins_astronaut || 0;
              const blitz_astronaut_wins_teams = blitz.wins_teams_astronaut || 0;
              const blitz_astronaut_damage = blitz.damage_astronaut || 0;
              const blitz_astronaut_damage_taken = blitz.damage_taken_astronaut || 0;
              const blitz_astronaut_potions_drunk = blitz.potions_drunk_astronaut || 0;
              const blitz_astronaut_potions_thrown = blitz.potions_thrown_astronaut || 0;
              const blitz_astronaut_mobs_spawned = blitz.mobs_spawned_astronaut || 0;
              const blitz_astronaut_chests_opened = blitz.chests_opened_astronaut || 0;
              const blitz_astronaut_arrows_hit = blitz.arrows_hit_astronaut || 0;
              const blitz_astronaut_arrows_fired = blitz.arrows_fired_astronaut || 0;
              const blitz_astronaut_games_played = blitz.games_played_astronaut || 0;
              const blitz_astronaut_time_played = blitz.time_played_astronaut || 0;
              const blitz_astronaut_exp = blitz.exp_astronaut || 0;
              const blitz_astronaut_level = blitz.astronaut || 0;

              data.statistics.blitz.astronaut = { wins: blitz_astronaut_wins, team_wins: blitz_astronaut_wins_teams, kills: blitz_astronaut_kills, damage_given: blitz_astronaut_damage, damage_taken: blitz_astronaut_damage_taken, arrows_fired: blitz_astronaut_arrows_fired, arrows_hit: blitz_astronaut_arrows_hit, potions_drunk: blitz_astronaut_potions_drunk, potions_thrown: blitz_astronaut_potions_thrown, mobs_spawned: blitz_astronaut_mobs_spawned, chests_opened: blitz_astronaut_chests_opened, games_played: blitz_astronaut_games_played, time_played: blitz_astronaut_time_played, experience: blitz_astronaut_exp, level: blitz_astronaut_level };
            }
            if (blitz.games_played_troll) {
              const blitz_troll_kills = blitz.kills_troll || 0;
              const blitz_troll_wins = blitz.wins_troll || 0;
              const blitz_troll_wins_teams = blitz.wins_teams_troll || 0;
              const blitz_troll_damage = blitz.damage_troll || 0;
              const blitz_troll_damage_taken = blitz.damage_taken_troll || 0;
              const blitz_troll_potions_drunk = blitz.potions_drunk_troll || 0;
              const blitz_troll_potions_thrown = blitz.potions_thrown_troll || 0;
              const blitz_troll_mobs_spawned = blitz.mobs_spawned_troll || 0;
              const blitz_troll_chests_opened = blitz.chests_opened_troll || 0;
              const blitz_troll_arrows_hit = blitz.arrows_hit_troll || 0;
              const blitz_troll_arrows_fired = blitz.arrows_fired_troll || 0;
              const blitz_troll_games_played = blitz.games_played_troll || 0;
              const blitz_troll_time_played = blitz.time_played_troll || 0;
              const blitz_troll_exp = blitz.exp_troll || 0;
              const blitz_troll_level = blitz.troll || 0;

              data.statistics.blitz.troll = { wins: blitz_troll_wins, team_wins: blitz_troll_wins_teams, kills: blitz_troll_kills, damage_given: blitz_troll_damage, damage_taken: blitz_troll_damage_taken, arrows_fired: blitz_troll_arrows_fired, arrows_hit: blitz_troll_arrows_hit, potions_drunk: blitz_troll_potions_drunk, potions_thrown: blitz_troll_potions_thrown, mobs_spawned: blitz_troll_mobs_spawned, chests_opened: blitz_troll_chests_opened, games_played: blitz_troll_games_played, time_played: blitz_troll_time_played, experience: blitz_troll_exp, level: blitz_troll_level };
            }
            if (blitz.games_played_meatmaster) {
              const blitz_meatmaster_kills = blitz.kills_meatmaster || 0;
              const blitz_meatmaster_wins = blitz.wins_meatmaster || 0;
              const blitz_meatmaster_wins_teams = blitz.wins_teams_meatmaster || 0;
              const blitz_meatmaster_damage = blitz.damage_meatmaster || 0;
              const blitz_meatmaster_damage_taken = blitz.damage_taken_meatmaster || 0;
              const blitz_meatmaster_potions_drunk = blitz.potions_drunk_meatmaster || 0;
              const blitz_meatmaster_potions_thrown = blitz.potions_thrown_meatmaster || 0;
              const blitz_meatmaster_mobs_spawned = blitz.mobs_spawned_meatmaster || 0;
              const blitz_meatmaster_chests_opened = blitz.chests_opened_meatmaster || 0;
              const blitz_meatmaster_arrows_hit = blitz.arrows_hit_meatmaster || 0;
              const blitz_meatmaster_arrows_fired = blitz.arrows_fired_meatmaster || 0;
              const blitz_meatmaster_games_played = blitz.games_played_meatmaster || 0;
              const blitz_meatmaster_time_played = blitz.time_played_meatmaster || 0;
              const blitz_meatmaster_exp = blitz.exp_meatmaster || 0;
              const blitz_meatmaster_level = blitz.meatmaster || 0;

              data.statistics.blitz.meatmaster = { wins: blitz_meatmaster_wins, team_wins: blitz_meatmaster_wins_teams, kills: blitz_meatmaster_kills, damage_given: blitz_meatmaster_damage, damage_taken: blitz_meatmaster_damage_taken, arrows_fired: blitz_meatmaster_arrows_fired, arrows_hit: blitz_meatmaster_arrows_hit, potions_drunk: blitz_meatmaster_potions_drunk, potions_thrown: blitz_meatmaster_potions_thrown, mobs_spawned: blitz_meatmaster_mobs_spawned, chests_opened: blitz_meatmaster_chests_opened, games_played: blitz_meatmaster_games_played, time_played: blitz_meatmaster_time_played, experience: blitz_meatmaster_exp, level: blitz_meatmaster_level };
            }
            if (blitz.games_played_reaper) {
              const blitz_reaper_kills = blitz.kills_reaper || 0;
              const blitz_reaper_wins = blitz.wins_reaper || 0;
              const blitz_reaper_wins_teams = blitz.wins_teams_reaper || 0;
              const blitz_reaper_damage = blitz.damage_reaper || 0;
              const blitz_reaper_damage_taken = blitz.damage_taken_reaper || 0;
              const blitz_reaper_potions_drunk = blitz.potions_drunk_reaper || 0;
              const blitz_reaper_potions_thrown = blitz.potions_thrown_reaper || 0;
              const blitz_reaper_mobs_spawned = blitz.mobs_spawned_reaper || 0;
              const blitz_reaper_chests_opened = blitz.chests_opened_reaper || 0;
              const blitz_reaper_arrows_hit = blitz.arrows_hit_reaper || 0;
              const blitz_reaper_arrows_fired = blitz.arrows_fired_reaper || 0;
              const blitz_reaper_games_played = blitz.games_played_reaper || 0;
              const blitz_reaper_time_played = blitz.time_played_reaper || 0;
              const blitz_reaper_exp = blitz.exp_reaper || 0;
              const blitz_reaper_level = blitz.reaper || 0;
              

              data.statistics.blitz.reaper = { wins: blitz_reaper_wins, team_wins: blitz_reaper_wins_teams, kills: blitz_reaper_kills, damage_given: blitz_reaper_damage, damage_taken: blitz_reaper_damage_taken, arrows_fired: blitz_reaper_arrows_fired, arrows_hit: blitz_reaper_arrows_hit, potions_drunk: blitz_reaper_potions_drunk, potions_thrown: blitz_reaper_potions_thrown, mobs_spawned: blitz_reaper_mobs_spawned, chests_opened: blitz_reaper_chests_opened, games_played: blitz_reaper_games_played, time_played: blitz_reaper_time_played, experience: blitz_reaper_exp, level: blitz_reaper_level };
            }
            if (blitz.games_played_reddragon) {
              const blitz_reddragon_kills = blitz.kills_reddragon || 0;
              const blitz_reddragon_wins = blitz.wins_reddragon || 0;
              const blitz_reddragon_wins_teams = blitz.wins_teams_reddragon || 0;
              const blitz_reddragon_damage = blitz.damage_reddragon || 0;
              const blitz_reddragon_damage_taken = blitz.damage_taken_reddragon || 0;
              const blitz_reddragon_potions_drunk = blitz.potions_drunk_reddragon || 0;
              const blitz_reddragon_potions_thrown = blitz.potions_thrown_reddragon || 0;
              const blitz_reddragon_mobs_spawned = blitz.mobs_spawned_reddragon || 0;
              const blitz_reddragon_chests_opened = blitz.chests_opened_reddragon || 0;
              const blitz_reddragon_arrows_hit = blitz.arrows_hit_reddragon || 0;
              const blitz_reddragon_arrows_fired = blitz.arrows_fired_reddragon || 0;
              const blitz_reddragon_games_played = blitz.games_played_reddragon || 0;
              const blitz_reddragon_time_played = blitz.time_played_reddragon || 0;
              const blitz_reddragon_exp = blitz.exp_reddragon || 0;
              const blitz_reddragon_level = blitz.reddragon || 0;

              data.statistics.blitz.reddragon = { wins: blitz_reddragon_wins, team_wins: blitz_reddragon_wins_teams, kills: blitz_reddragon_kills, damage_given: blitz_reddragon_damage, damage_taken: blitz_reddragon_damage_taken, arrows_fired: blitz_reddragon_arrows_fired, arrows_hit: blitz_reddragon_arrows_hit, potions_drunk: blitz_reddragon_potions_drunk, potions_thrown: blitz_reddragon_potions_thrown, mobs_spawned: blitz_reddragon_mobs_spawned, chests_opened: blitz_reddragon_chests_opened, games_played: blitz_reddragon_games_played, time_played: blitz_reddragon_time_played, experience: blitz_reddragon_exp, level: blitz_reddragon_level };
            }
            if (blitz.games_played_toxicologist) {
              const blitz_toxicologist_kills = blitz.kills_toxicologist || 0;
              const blitz_toxicologist_wins = blitz.wins_toxicologist || 0;
              const blitz_toxicologist_wins_teams = blitz.wins_teams_toxicologist || 0;
              const blitz_toxicologist_damage = blitz.damage_toxicologist || 0;
              const blitz_toxicologist_damage_taken = blitz.damage_taken_toxicologist || 0;
              const blitz_toxicologist_potions_drunk = blitz.potions_drunk_toxicologist || 0;
              const blitz_toxicologist_potions_thrown = blitz.potions_thrown_toxicologist || 0;
              const blitz_toxicologist_mobs_spawned = blitz.mobs_spawned_toxicologist || 0;
              const blitz_toxicologist_chests_opened = blitz.chests_opened_toxicologist || 0;
              const blitz_toxicologist_arrows_hit = blitz.arrows_hit_toxicologist || 0;
              const blitz_toxicologist_arrows_fired = blitz.arrows_fired_toxicologist || 0;
              const blitz_toxicologist_games_played = blitz.games_played_toxicologist || 0;
              const blitz_toxicologist_time_played = blitz.time_played_toxicologist || 0;
              const blitz_toxicologist_exp = blitz.exp_toxicologist || 0;
              const blitz_toxicologist_level = blitz.toxicologist || 0;

              data.statistics.blitz.toxicologist = { wins: blitz_toxicologist_wins, team_wins: blitz_toxicologist_wins_teams, kills: blitz_toxicologist_kills, damage_given: blitz_toxicologist_damage, damage_taken: blitz_toxicologist_damage_taken, arrows_fired: blitz_toxicologist_arrows_fired, arrows_hit: blitz_toxicologist_arrows_hit, potions_drunk: blitz_toxicologist_potions_drunk, potions_thrown: blitz_toxicologist_potions_thrown, mobs_spawned: blitz_toxicologist_mobs_spawned, chests_opened: blitz_toxicologist_chests_opened, games_played: blitz_toxicologist_games_played, time_played: blitz_toxicologist_time_played, experience: blitz_toxicologist_exp, level: blitz_toxicologist_level };
            }
            if (blitz.games_played_donkeytamer) {
              const blitz_donkeytamer_kills = blitz.kills_donkeytamer || 0;
              const blitz_donkeytamer_wins = blitz.wins_donkeytamer || 0;
              const blitz_donkeytamer_wins_teams = blitz.wins_teams_donkeytamer || 0;
              const blitz_donkeytamer_damage = blitz.damage_donkeytamer || 0;
              const blitz_donkeytamer_damage_taken = blitz.damage_taken_donkeytamer || 0;
              const blitz_donkeytamer_potions_drunk = blitz.potions_drunk_donkeytamer || 0;
              const blitz_donkeytamer_potions_thrown = blitz.potions_thrown_donkeytamer || 0;
              const blitz_donkeytamer_mobs_spawned = blitz.mobs_spawned_donkeytamer || 0;
              const blitz_donkeytamer_chests_opened = blitz.chests_opened_donkeytamer || 0;
              const blitz_donkeytamer_arrows_hit = blitz.arrows_hit_donkeytamer || 0;
              const blitz_donkeytamer_arrows_fired = blitz.arrows_fired_donkeytamer || 0;
              const blitz_donkeytamer_games_played = blitz.games_played_donkeytamer || 0;
              const blitz_donkeytamer_time_played = blitz.time_played_donkeytamer || 0;
              const blitz_donkeytamer_exp = blitz.exp_donkeytamer || 0;
              const blitz_donkeytamer_level = blitz.donkeytamer || 0;

              data.statistics.blitz.donkeytamer = { wins: blitz_donkeytamer_wins, team_wins: blitz_donkeytamer_wins_teams, kills: blitz_donkeytamer_kills, damage_given: blitz_donkeytamer_damage, damage_taken: blitz_donkeytamer_damage_taken, arrows_fired: blitz_donkeytamer_arrows_fired, arrows_hit: blitz_donkeytamer_arrows_hit, potions_drunk: blitz_donkeytamer_potions_drunk, potions_thrown: blitz_donkeytamer_potions_thrown, mobs_spawned: blitz_donkeytamer_mobs_spawned, chests_opened: blitz_donkeytamer_chests_opened, games_played: blitz_donkeytamer_games_played, time_played: blitz_donkeytamer_time_played, experience: blitz_donkeytamer_exp, level: blitz_donkeytamer_level };
            }
            if (blitz.games_played_rogue) {
              const blitz_rogue_kills = blitz.kills_rogue || 0;
              const blitz_rogue_wins = blitz.wins_rogue || 0;
              const blitz_rogue_wins_teams = blitz.wins_teams_rogue || 0;
              const blitz_rogue_damage = blitz.damage_rogue || 0;
              const blitz_rogue_damage_taken = blitz.damage_taken_rogue || 0;
              const blitz_rogue_potions_drunk = blitz.potions_drunk_rogue || 0;
              const blitz_rogue_potions_thrown = blitz.potions_thrown_rogue || 0;
              const blitz_rogue_mobs_spawned = blitz.mobs_spawned_rogue || 0;
              const blitz_rogue_chests_opened = blitz.chests_opened_rogue || 0;
              const blitz_rogue_arrows_hit = blitz.arrows_hit_rogue || 0;
              const blitz_rogue_arrows_fired = blitz.arrows_fired_rogue || 0;
              const blitz_rogue_games_played = blitz.games_played_rogue || 0;
              const blitz_rogue_time_played = blitz.time_played_rogue || 0;
              const blitz_rogue_exp = blitz.exp_rogue || 0;
              const blitz_rogue_level = blitz.rogue || 0;

              data.statistics.blitz.rogue = { wins: blitz_rogue_wins, team_wins: blitz_rogue_wins_teams, kills: blitz_rogue_kills, damage_given: blitz_rogue_damage, damage_taken: blitz_rogue_damage_taken, arrows_fired: blitz_rogue_arrows_fired, arrows_hit: blitz_rogue_arrows_hit, potions_drunk: blitz_rogue_potions_drunk, potions_thrown: blitz_rogue_potions_thrown, mobs_spawned: blitz_rogue_mobs_spawned, chests_opened: blitz_rogue_chests_opened, games_played: blitz_rogue_games_played, time_played: blitz_rogue_time_played, experience: blitz_rogue_exp, level: blitz_rogue_level };
            }
            if (blitz.games_played_warlock) {
              const blitz_warlock_kills = blitz.kills_warlock || 0;
              const blitz_warlock_wins = blitz.wins_warlock || 0;
              const blitz_warlock_wins_teams = blitz.wins_teams_warlock || 0;
              const blitz_warlock_damage = blitz.damage_warlock || 0;
              const blitz_warlock_damage_taken = blitz.damage_taken_warlock || 0;
              const blitz_warlock_potions_drunk = blitz.potions_drunk_warlock || 0;
              const blitz_warlock_potions_thrown = blitz.potions_thrown_warlock || 0;
              const blitz_warlock_mobs_spawned = blitz.mobs_spawned_warlock || 0;
              const blitz_warlock_chests_opened = blitz.chests_opened_warlock || 0;
              const blitz_warlock_arrows_hit = blitz.arrows_hit_warlock || 0;
              const blitz_warlock_arrows_fired = blitz.arrows_fired_warlock || 0;
              const blitz_warlock_games_played = blitz.games_played_warlock || 0;
              const blitz_warlock_time_played = blitz.time_played_warlock || 0;
              const blitz_warlock_exp = blitz.exp_warlock || 0;
              const blitz_warlock_level = blitz.warlock || 0;

              data.statistics.blitz.warlock = { wins: blitz_warlock_wins, team_wins: blitz_warlock_wins_teams, kills: blitz_warlock_kills, damage_given: blitz_warlock_damage, damage_taken: blitz_warlock_damage_taken, arrows_fired: blitz_warlock_arrows_fired, arrows_hit: blitz_warlock_arrows_hit, potions_drunk: blitz_warlock_potions_drunk, potions_thrown: blitz_warlock_potions_thrown, mobs_spawned: blitz_warlock_mobs_spawned, chests_opened: blitz_warlock_chests_opened, games_played: blitz_warlock_games_played, time_played: blitz_warlock_time_played, experience: blitz_warlock_exp, level: blitz_warlock_level };
            }
            if (blitz.games_played_slimeyslime) {
              const blitz_slimeyslime_kills = blitz.kills_slimeyslime || 0;
              const blitz_slimeyslime_wins = blitz.wins_slimeyslime || 0;
              const blitz_slimeyslime_wins_teams = blitz.wins_teams_slimeyslime || 0;
              const blitz_slimeyslime_damage = blitz.damage_slimeyslime || 0;
              const blitz_slimeyslime_damage_taken = blitz.damage_taken_slimeyslime || 0;
              const blitz_slimeyslime_potions_drunk = blitz.potions_drunk_slimeyslime || 0;
              const blitz_slimeyslime_potions_thrown = blitz.potions_thrown_slimeyslime || 0;
              const blitz_slimeyslime_mobs_spawned = blitz.mobs_spawned_slimeyslime || 0;
              const blitz_slimeyslime_chests_opened = blitz.chests_opened_slimeyslime || 0;
              const blitz_slimeyslime_arrows_hit = blitz.arrows_hit_slimeyslime || 0;
              const blitz_slimeyslime_arrows_fired = blitz.arrows_fired_slimeyslime || 0;
              const blitz_slimeyslime_games_played = blitz.games_played_slimeyslime || 0;
              const blitz_slimeyslime_time_played = blitz.time_played_slimeyslime || 0;
              const blitz_slimeyslime_exp = blitz.exp_slimeyslime || 0;
              const blitz_slimeyslime_level = blitz.slimeyslime || 0;

              data.statistics.blitz.slimeyslime = { wins: blitz_slimeyslime_wins, team_wins: blitz_slimeyslime_wins_teams, kills: blitz_slimeyslime_kills, damage_given: blitz_slimeyslime_damage, damage_taken: blitz_slimeyslime_damage_taken, arrows_fired: blitz_slimeyslime_arrows_fired, arrows_hit: blitz_slimeyslime_arrows_hit, potions_drunk: blitz_slimeyslime_potions_drunk, potions_thrown: blitz_slimeyslime_potions_thrown, mobs_spawned: blitz_slimeyslime_mobs_spawned, chests_opened: blitz_slimeyslime_chests_opened, games_played: blitz_slimeyslime_games_played, time_played: blitz_slimeyslime_time_played, experience: blitz_slimeyslime_exp, level: blitz_slimeyslime_level };
            }
            if (blitz.games_played_jockey) {
              const blitz_jockey_kills = blitz.kills_jockey || 0;
              const blitz_jockey_wins = blitz.wins_jockey || 0;
              const blitz_jockey_wins_teams = blitz.wins_teams_jockey || 0;
              const blitz_jockey_damage = blitz.damage_jockey || 0;
              const blitz_jockey_damage_taken = blitz.damage_taken_jockey || 0;
              const blitz_jockey_potions_drunk = blitz.potions_drunk_jockey || 0;
              const blitz_jockey_potions_thrown = blitz.potions_thrown_jockey || 0;
              const blitz_jockey_mobs_spawned = blitz.mobs_spawned_jockey || 0;
              const blitz_jockey_chests_opened = blitz.chests_opened_jockey || 0;
              const blitz_jockey_arrows_hit = blitz.arrows_hit_jockey || 0;
              const blitz_jockey_arrows_fired = blitz.arrows_fired_jockey || 0;
              const blitz_jockey_games_played = blitz.games_played_jockey || 0;
              const blitz_jockey_time_played = blitz.time_played_jockey || 0;
              const blitz_jockey_exp = blitz.exp_jockey || 0;
              const blitz_jockey_level = blitz.jockey || 0;

              data.statistics.blitz.jockey = { wins: blitz_jockey_wins, team_wins: blitz_jockey_wins_teams, kills: blitz_jockey_kills, damage_given: blitz_jockey_damage, damage_taken: blitz_jockey_damage_taken, arrows_fired: blitz_jockey_arrows_fired, arrows_hit: blitz_jockey_arrows_hit, potions_drunk: blitz_jockey_potions_drunk, potions_thrown: blitz_jockey_potions_thrown, mobs_spawned: blitz_jockey_mobs_spawned, chests_opened: blitz_jockey_chests_opened, games_played: blitz_jockey_games_played, time_played: blitz_jockey_time_played, experience: blitz_jockey_exp, level: blitz_jockey_level };
            }
            if (blitz.games_played_golem) {
              const blitz_golem_kills = blitz.kills_golem || 0;
              const blitz_golem_wins = blitz.wins_golem || 0;
              const blitz_golem_wins_teams = blitz.wins_teams_golem || 0;
              const blitz_golem_damage = blitz.damage_golem || 0;
              const blitz_golem_damage_taken = blitz.damage_taken_golem || 0;
              const blitz_golem_potions_drunk = blitz.potions_drunk_golem || 0;
              const blitz_golem_potions_thrown = blitz.potions_thrown_golem || 0;
              const blitz_golem_mobs_spawned = blitz.mobs_spawned_golem || 0;
              const blitz_golem_chests_opened = blitz.chests_opened_golem || 0;
              const blitz_golem_arrows_hit = blitz.arrows_hit_golem || 0;
              const blitz_golem_arrows_fired = blitz.arrows_fired_golem || 0;
              const blitz_golem_games_played = blitz.games_played_golem || 0;
              const blitz_golem_time_played = blitz.time_played_golem || 0;
              const blitz_golem_exp = blitz.exp_golem || 0;
              const blitz_golem_level = blitz.golem || 0;

              data.statistics.blitz.golem = { wins: blitz_golem_wins, team_wins: blitz_golem_wins_teams, kills: blitz_golem_kills, damage_given: blitz_golem_damage, damage_taken: blitz_golem_damage_taken, arrows_fired: blitz_golem_arrows_fired, arrows_hit: blitz_golem_arrows_hit, potions_drunk: blitz_golem_potions_drunk, potions_thrown: blitz_golem_potions_thrown, mobs_spawned: blitz_golem_mobs_spawned, chests_opened: blitz_golem_chests_opened, games_played: blitz_golem_games_played, time_played: blitz_golem_time_played, experience: blitz_golem_exp, level: blitz_golem_level };
            }
            if (blitz.games_played_viking) {
              const blitz_viking_kills = blitz.kills_viking || 0;
              const blitz_viking_wins = blitz.wins_viking || 0;
              const blitz_viking_wins_teams = blitz.wins_teams_viking || 0;
              const blitz_viking_damage = blitz.damage_viking || 0;
              const blitz_viking_damage_taken = blitz.damage_taken_viking || 0;
              const blitz_viking_potions_drunk = blitz.potions_drunk_viking || 0;
              const blitz_viking_potions_thrown = blitz.potions_thrown_viking || 0;
              const blitz_viking_mobs_spawned = blitz.mobs_spawned_viking || 0;
              const blitz_viking_chests_opened = blitz.chests_opened_viking || 0;
              const blitz_viking_arrows_hit = blitz.arrows_hit_viking || 0;
              const blitz_viking_arrows_fired = blitz.arrows_fired_viking || 0;
              const blitz_viking_games_played = blitz.games_played_viking || 0;
              const blitz_viking_time_played = blitz.time_played_viking || 0;
              const blitz_viking_exp = blitz.exp_viking || 0;
              const blitz_viking_level = blitz.viking || 0;

              data.statistics.blitz.viking = { wins: blitz_viking_wins, team_wins: blitz_viking_wins_teams, kills: blitz_viking_kills, damage_given: blitz_viking_damage, damage_taken: blitz_viking_damage_taken, arrows_fired: blitz_viking_arrows_fired, arrows_hit: blitz_viking_arrows_hit, potions_drunk: blitz_viking_potions_drunk, potions_thrown: blitz_viking_potions_thrown, mobs_spawned: blitz_viking_mobs_spawned, chests_opened: blitz_viking_chests_opened, games_played: blitz_viking_games_played, time_played: blitz_viking_time_played, experience: blitz_viking_exp, level: blitz_viking_level };
            }
            if (blitz.games_played_random) {
              const blitz_random_kills = blitz.kills_random || 0;
              const blitz_random_wins = blitz.wins_random || 0;
              const blitz_random_wins_teams = blitz.wins_teams_random || 0;
              const blitz_random_damage = blitz.damage_random || 0;
              const blitz_random_damage_taken = blitz.damage_taken_random || 0;
              const blitz_random_potions_drunk = blitz.potions_drunk_random || 0;
              const blitz_random_potions_thrown = blitz.potions_thrown_random || 0;
              const blitz_random_mobs_spawned = blitz.mobs_spawned_random || 0;
              const blitz_random_chests_opened = blitz.chests_opened_random || 0;
              const blitz_random_arrows_hit = blitz.arrows_hit_random || 0;
              const blitz_random_arrows_fired = blitz.arrows_fired_random || 0;
              const blitz_random_games_played = blitz.games_played_random || 0;
              const blitz_random_time_played = blitz.time_played_random || 0;
              const blitz_random_exp = blitz.exp_random || 0;
              const blitz_random_level = blitz.random || 0;

              data.statistics.blitz.random = { wins: blitz_random_wins, team_wins: blitz_random_wins_teams, kills: blitz_random_kills, damage_given: blitz_random_damage, damage_taken: blitz_random_damage_taken, arrows_fired: blitz_random_arrows_fired, arrows_hit: blitz_random_arrows_hit, potions_drunk: blitz_random_potions_drunk, potions_thrown: blitz_random_potions_thrown, mobs_spawned: blitz_random_mobs_spawned, chests_opened: blitz_random_chests_opened, games_played: blitz_random_games_played, time_played: blitz_random_time_played, experience: blitz_random_exp, level: blitz_random_level };
            }
            if (blitz.games_played_speleologist) {
              const blitz_speleologist_kills = blitz.kills_speleologist || 0;
              const blitz_speleologist_wins = blitz.wins_speleologist || 0;
              const blitz_speleologist_wins_teams = blitz.wins_teams_speleologist || 0;
              const blitz_speleologist_damage = blitz.damage_speleologist || 0;
              const blitz_speleologist_damage_taken = blitz.damage_taken_speleologist || 0;
              const blitz_speleologist_potions_drunk = blitz.potions_drunk_speleologist || 0;
              const blitz_speleologist_potions_thrown = blitz.potions_thrown_speleologist || 0;
              const blitz_speleologist_mobs_spawned = blitz.mobs_spawned_speleologist || 0;
              const blitz_speleologist_chests_opened = blitz.chests_opened_speleologist || 0;
              const blitz_speleologist_arrows_hit = blitz.arrows_hit_speleologist || 0;
              const blitz_speleologist_arrows_fired = blitz.arrows_fired_speleologist || 0;
              const blitz_speleologist_games_played = blitz.games_played_speleologist || 0;
              const blitz_speleologist_time_played = blitz.time_played_speleologist || 0;
              const blitz_speleologist_exp = blitz.exp_speleologist || 0;
              const blitz_speleologist_level = blitz.speleologist || 0;

              data.statistics.blitz.speleologist = { wins: blitz_speleologist_wins, team_wins: blitz_speleologist_wins_teams, kills: blitz_speleologist_kills, damage_given: blitz_speleologist_damage, damage_taken: blitz_speleologist_damage_taken, arrows_fired: blitz_speleologist_arrows_fired, arrows_hit: blitz_speleologist_arrows_hit, potions_drunk: blitz_speleologist_potions_drunk, potions_thrown: blitz_speleologist_potions_thrown, mobs_spawned: blitz_speleologist_mobs_spawned, chests_opened: blitz_speleologist_chests_opened, games_played: blitz_speleologist_games_played, time_played: blitz_speleologist_time_played, experience: blitz_speleologist_exp, level: blitz_speleologist_level };
            }
            if (blitz.games_played["_shadow knight"]) {
              const blitz_shadow_knight_kills = blitz.kills["_shadow knight"] || 0;
              const blitz_shadow_knight_wins = blitz.wins["_shadow knight"] || 0;
              const blitz_shadow_knight_wins_teams = blitz.wins_teams["_shadow knight"] || 0;
              const blitz_shadow_knight_damage = blitz.damage["_shadow knight"] || 0;
              const blitz_shadow_knight_damage_taken = blitz.damage_taken["_shadow knight"] || 0;
              const blitz_shadow_knight_potions_drunk = blitz.potions_drunk["_shadow knight"] || 0;
              const blitz_shadow_knight_potions_thrown = blitz.potions_thrown["_shadow knight"] || 0;
              const blitz_shadow_knight_mobs_spawned = blitz.mobs_spawned["_shadow knight"] || 0;
              const blitz_shadow_knight_chests_opened = blitz.chests_opened["_shadow knight"] || 0;
              const blitz_shadow_knight_arrows_hit = blitz.arrows_hit["_shadow knight"] || 0;
              const blitz_shadow_knight_arrows_fired = blitz.arrows_fired["_shadow knight"] || 0;
              const blitz_shadow_knight_games_played = blitz.games_played["_shadow knight"] || 0;
              const blitz_shadow_knight_time_played = blitz.time_played["_shadow knight"] || 0;
              const blitz_shadow_knight_exp = blitz.exp["_shadow knight"] || 0;
              const blitz_shadow_knight_level = blitz["shadow knight"] || 0;

              data.statistics.blitz.shadow_knight = { wins: blitz_shadow_knight_wins, team_wins: blitz_shadow_knight_wins_teams, kills: blitz_shadow_knight_kills, damage_given: blitz_shadow_knight_damage, damage_taken: blitz_shadow_knight_damage_taken, arrows_fired: blitz_shadow_knight_arrows_fired, arrows_hit: blitz_shadow_knight_arrows_hit, potions_drunk: blitz_shadow_knight_potions_drunk, potions_thrown: blitz_shadow_knight_potions_thrown, mobs_spawned: blitz_shadow_knight_mobs_spawned, chests_opened: blitz_shadow_knight_chests_opened, games_played: blitz_shadow_knight_games_played, time_played: blitz_shadow_knight_time_played, experience: blitz_shadow_knight_exp, level: blitz_shadow_knight_level };
            }
            if (blitz.games_played_baker) {
              const blitz_baker_kills = blitz.kills_baker || 0;
              const blitz_baker_wins = blitz.wins_baker || 0;
              const blitz_baker_wins_teams = blitz.wins_teams_baker || 0;
              const blitz_baker_damage = blitz.damage_baker || 0;
              const blitz_baker_damage_taken = blitz.damage_taken_baker || 0;
              const blitz_baker_potions_drunk = blitz.potions_drunk_baker || 0;
              const blitz_baker_potions_thrown = blitz.potions_thrown_baker || 0;
              const blitz_baker_mobs_spawned = blitz.mobs_spawned_baker || 0;
              const blitz_baker_chests_opened = blitz.chests_opened_baker || 0;
              const blitz_baker_arrows_hit = blitz.arrows_hit_baker || 0;
              const blitz_baker_arrows_fired = blitz.arrows_fired_baker || 0;
              const blitz_baker_games_played = blitz.games_played_baker || 0;
              const blitz_baker_time_played = blitz.time_played_baker || 0;
              const blitz_baker_exp = blitz.exp_baker || 0;
              const blitz_baker_level = blitz.baker || 0;

              data.statistics.blitz.baker = { wins: blitz_baker_wins, team_wins: blitz_baker_wins_teams, kills: blitz_baker_kills, damage_given: blitz_baker_damage, damage_taken: blitz_baker_damage_taken, arrows_fired: blitz_baker_arrows_fired, arrows_hit: blitz_baker_arrows_hit, potions_drunk: blitz_baker_potions_drunk, potions_thrown: blitz_baker_potions_thrown, mobs_spawned: blitz_baker_mobs_spawned, chests_opened: blitz_baker_chests_opened, games_played: blitz_baker_games_played, time_played: blitz_baker_time_played, experience: blitz_baker_exp, level: blitz_baker_level };
            }
            if (blitz.games_played_knight) {
              const blitz_knight_kills = blitz.kills_knight || 0;
              const blitz_knight_wins = blitz.wins_knight || 0;
              const blitz_knight_wins_teams = blitz.wins_teams_knight || 0;
              const blitz_knight_damage = blitz.damage_knight || 0;
              const blitz_knight_damage_taken = blitz.damage_taken_knight || 0;
              const blitz_knight_potions_drunk = blitz.potions_drunk_knight || 0;
              const blitz_knight_potions_thrown = blitz.potions_thrown_knight || 0;
              const blitz_knight_mobs_spawned = blitz.mobs_spawned_knight || 0;
              const blitz_knight_chests_opened = blitz.chests_opened_knight || 0;
              const blitz_knight_arrows_hit = blitz.arrows_hit_knight || 0;
              const blitz_knight_arrows_fired = blitz.arrows_fired_knight || 0;
              const blitz_knight_games_played = blitz.games_played_knight || 0;
              const blitz_knight_time_played = blitz.time_played_knight || 0;
              const blitz_knight_exp = blitz.exp_knight || 0;
              const blitz_knight_level = blitz.knight || 0;

              data.statistics.blitz.knight = { wins: blitz_knight_wins, team_wins: blitz_knight_wins_teams, kills: blitz_knight_kills, damage_given: blitz_knight_damage, damage_taken: blitz_knight_damage_taken, arrows_fired: blitz_knight_arrows_fired, arrows_hit: blitz_knight_arrows_hit, potions_drunk: blitz_knight_potions_drunk, potions_thrown: blitz_knight_potions_thrown, mobs_spawned: blitz_knight_mobs_spawned, chests_opened: blitz_knight_chests_opened, games_played: blitz_knight_games_played, time_played: blitz_knight_time_played, experience: blitz_knight_exp, level: blitz_knight_level };
            }
            if (blitz.games_played_pigman) {
              const blitz_pigman_kills = blitz.kills_pigman || 0;
              const blitz_pigman_wins = blitz.wins_pigman || 0;
              const blitz_pigman_wins_teams = blitz.wins_teams_pigman || 0;
              const blitz_pigman_damage = blitz.damage_pigman || 0;
              const blitz_pigman_damage_taken = blitz.damage_taken_pigman || 0;
              const blitz_pigman_potions_drunk = blitz.potions_drunk_pigman || 0;
              const blitz_pigman_potions_thrown = blitz.potions_thrown_pigman || 0;
              const blitz_pigman_mobs_spawned = blitz.mobs_spawned_pigman || 0;
              const blitz_pigman_chests_opened = blitz.chests_opened_pigman || 0;
              const blitz_pigman_arrows_hit = blitz.arrows_hit_pigman || 0;
              const blitz_pigman_arrows_fired = blitz.arrows_fired_pigman || 0;
              const blitz_pigman_games_played = blitz.games_played_pigman || 0;
              const blitz_pigman_time_played = blitz.time_played_pigman || 0;
              const blitz_pigman_exp = blitz.exp_pigman || 0;
              const blitz_pigman_level = blitz.pigman || 0;

              data.statistics.blitz.pigman = { wins: blitz_pigman_wins, team_wins: blitz_pigman_wins_teams, kills: blitz_pigman_kills, damage_given: blitz_pigman_damage, damage_taken: blitz_pigman_damage_taken, arrows_fired: blitz_pigman_arrows_fired, arrows_hit: blitz_pigman_arrows_hit, potions_drunk: blitz_pigman_potions_drunk, potions_thrown: blitz_pigman_potions_thrown, mobs_spawned: blitz_pigman_mobs_spawned, chests_opened: blitz_pigman_chests_opened, games_played: blitz_pigman_games_played, time_played: blitz_pigman_time_played, experience: blitz_pigman_exp, level: blitz_pigman_level };
            }
            if (blitz.games_played_guardian) {
              const blitz_guardian_kills = blitz.kills_guardian || 0;
              const blitz_guardian_wins = blitz.wins_guardian || 0;
              const blitz_guardian_wins_teams = blitz.wins_teams_guardian || 0;
              const blitz_guardian_damage = blitz.damage_guardian || 0;
              const blitz_guardian_damage_taken = blitz.damage_taken_guardian || 0;
              const blitz_guardian_potions_drunk = blitz.potions_drunk_guardian || 0;
              const blitz_guardian_potions_thrown = blitz.potions_thrown_guardian || 0;
              const blitz_guardian_mobs_spawned = blitz.mobs_spawned_guardian || 0;
              const blitz_guardian_chests_opened = blitz.chests_opened_guardian || 0;
              const blitz_guardian_arrows_hit = blitz.arrows_hit_guardian || 0;
              const blitz_guardian_arrows_fired = blitz.arrows_fired_guardian || 0;
              const blitz_guardian_games_played = blitz.games_played_guardian || 0;
              const blitz_guardian_time_played = blitz.time_played_guardian || 0;
              const blitz_guardian_exp = blitz.exp_guardian || 0;
              const blitz_guardian_level = blitz.guardian || 0;

              data.statistics.blitz.guardian = { wins: blitz_guardian_wins, team_wins: blitz_guardian_wins_teams, kills: blitz_guardian_kills, damage_given: blitz_guardian_damage, damage_taken: blitz_guardian_damage_taken, arrows_fired: blitz_guardian_arrows_fired, arrows_hit: blitz_guardian_arrows_hit, potions_drunk: blitz_guardian_potions_drunk, potions_thrown: blitz_guardian_potions_thrown, mobs_spawned: blitz_guardian_mobs_spawned, chests_opened: blitz_guardian_chests_opened, games_played: blitz_guardian_games_played, time_played: blitz_guardian_time_played, experience: blitz_guardian_exp, level: blitz_guardian_level };
            }
            if (blitz.games_played_phoenix) {
              const blitz_phoenix_kills = blitz.kills_phoenix || 0;
              const blitz_phoenix_wins = blitz.wins_phoenix || 0;
              const blitz_phoenix_wins_teams = blitz.wins_teams_phoenix || 0;
              const blitz_phoenix_damage = blitz.damage_phoenix || 0;
              const blitz_phoenix_damage_taken = blitz.damage_taken_phoenix || 0;
              const blitz_phoenix_potions_drunk = blitz.potions_drunk_phoenix || 0;
              const blitz_phoenix_potions_thrown = blitz.potions_thrown_phoenix || 0;
              const blitz_phoenix_mobs_spawned = blitz.mobs_spawned_phoenix || 0;
              const blitz_phoenix_chests_opened = blitz.chests_opened_phoenix || 0;
              const blitz_phoenix_arrows_hit = blitz.arrows_hit_phoenix || 0;
              const blitz_phoenix_arrows_fired = blitz.arrows_fired_phoenix || 0;
              const blitz_phoenix_games_played = blitz.games_played_phoenix || 0;
              const blitz_phoenix_time_played = blitz.time_played_phoenix || 0;
              const blitz_phoenix_exp = blitz.exp_phoenix || 0;
              const blitz_phoenix_level = blitz.phoenix || 0;

              data.statistics.blitz.phoenix = { wins: blitz_phoenix_wins, team_wins: blitz_phoenix_wins_teams, kills: blitz_phoenix_kills, damage_given: blitz_phoenix_damage, damage_taken: blitz_phoenix_damage_taken, arrows_fired: blitz_phoenix_arrows_fired, arrows_hit: blitz_phoenix_arrows_hit, potions_drunk: blitz_phoenix_potions_drunk, potions_thrown: blitz_phoenix_potions_thrown, mobs_spawned: blitz_phoenix_mobs_spawned, chests_opened: blitz_phoenix_chests_opened, games_played: blitz_phoenix_games_played, time_played: blitz_phoenix_time_played, experience: blitz_phoenix_exp, level: blitz_phoenix_level };
            }
            if (blitz.games_played_paladin) {
              const blitz_paladin_kills = blitz.kills_paladin || 0;
              const blitz_paladin_wins = blitz.wins_paladin || 0;
              const blitz_paladin_wins_teams = blitz.wins_teams_paladin || 0;
              const blitz_paladin_damage = blitz.damage_paladin || 0;
              const blitz_paladin_damage_taken = blitz.damage_taken_paladin || 0;
              const blitz_paladin_potions_drunk = blitz.potions_drunk_paladin || 0;
              const blitz_paladin_potions_thrown = blitz.potions_thrown_paladin || 0;
              const blitz_paladin_mobs_spawned = blitz.mobs_spawned_paladin || 0;
              const blitz_paladin_chests_opened = blitz.chests_opened_paladin || 0;
              const blitz_paladin_arrows_hit = blitz.arrows_hit_paladin || 0;
              const blitz_paladin_arrows_fired = blitz.arrows_fired_paladin || 0;
              const blitz_paladin_games_played = blitz.games_played_paladin || 0;
              const blitz_paladin_time_played = blitz.time_played_paladin || 0;
              const blitz_paladin_exp = blitz.exp_paladin || 0;
              const blitz_paladin_level = blitz.paladin || 0;

              data.statistics.blitz.paladin = { wins: blitz_paladin_wins, team_wins: blitz_paladin_wins_teams, kills: blitz_paladin_kills, damage_given: blitz_paladin_damage, damage_taken: blitz_paladin_damage_taken, arrows_fired: blitz_paladin_arrows_fired, arrows_hit: blitz_paladin_arrows_hit, potions_drunk: blitz_paladin_potions_drunk, potions_thrown: blitz_paladin_potions_thrown, mobs_spawned: blitz_paladin_mobs_spawned, chests_opened: blitz_paladin_chests_opened, games_played: blitz_paladin_games_played, time_played: blitz_paladin_time_played, experience: blitz_paladin_exp, level: blitz_paladin_level };
            }
            if (blitz.games_played_necromancer) {
              const blitz_necromancer_kills = blitz.kills_necromancer || 0;
              const blitz_necromancer_wins = blitz.wins_necromancer || 0;
              const blitz_necromancer_wins_teams = blitz.wins_teams_necromancer || 0;
              const blitz_necromancer_damage = blitz.damage_necromancer || 0;
              const blitz_necromancer_damage_taken = blitz.damage_taken_necromancer || 0;
              const blitz_necromancer_potions_drunk = blitz.potions_drunk_necromancer || 0;
              const blitz_necromancer_potions_thrown = blitz.potions_thrown_necromancer || 0;
              const blitz_necromancer_mobs_spawned = blitz.mobs_spawned_necromancer || 0;
              const blitz_necromancer_chests_opened = blitz.chests_opened_necromancer || 0;
              const blitz_necromancer_arrows_hit = blitz.arrows_hit_necromancer || 0;
              const blitz_necromancer_arrows_fired = blitz.arrows_fired_necromancer || 0;
              const blitz_necromancer_games_played = blitz.games_played_necromancer || 0;
              const blitz_necromancer_time_played = blitz.time_played_necromancer || 0;
              const blitz_necromancer_exp = blitz.exp_necromancer || 0;
              const blitz_necromancer_level = blitz.necromancer || 0;

              data.statistics.blitz.necromancer = { wins: blitz_necromancer_wins, team_wins: blitz_necromancer_wins_teams, kills: blitz_necromancer_kills, damage_given: blitz_necromancer_damage, damage_taken: blitz_necromancer_damage_taken, arrows_fired: blitz_necromancer_arrows_fired, arrows_hit: blitz_necromancer_arrows_hit, potions_drunk: blitz_necromancer_potions_drunk, potions_thrown: blitz_necromancer_potions_thrown, mobs_spawned: blitz_necromancer_mobs_spawned, chests_opened: blitz_necromancer_chests_opened, games_played: blitz_necromancer_games_played, time_played: blitz_necromancer_time_played, experience: blitz_necromancer_exp, level: blitz_necromancer_level };
            }
            if (blitz.games_played_scout) {
              const blitz_scout_kills = blitz.kills_scout || 0;
              const blitz_scout_wins = blitz.wins_scout || 0;
              const blitz_scout_wins_teams = blitz.wins_teams_scout || 0;
              const blitz_scout_damage = blitz.damage_scout || 0;
              const blitz_scout_damage_taken = blitz.damage_taken_scout || 0;
              const blitz_scout_potions_drunk = blitz.potions_drunk_scout || 0;
              const blitz_scout_potions_thrown = blitz.potions_thrown_scout || 0;
              const blitz_scout_mobs_spawned = blitz.mobs_spawned_scout || 0;
              const blitz_scout_chests_opened = blitz.chests_opened_scout || 0;
              const blitz_scout_arrows_hit = blitz.arrows_hit_scout || 0;
              const blitz_scout_arrows_fired = blitz.arrows_fired_scout || 0;
              const blitz_scout_games_played = blitz.games_played_scout || 0;
              const blitz_scout_time_played = blitz.time_played_scout || 0;
              const blitz_scout_exp = blitz.exp_scout || 0;
              const blitz_scout_level = blitz.scout || 0;

              data.statistics.blitz.scout = { wins: blitz_scout_wins, team_wins: blitz_scout_wins_teams, kills: blitz_scout_kills, damage_given: blitz_scout_damage, damage_taken: blitz_scout_damage_taken, arrows_fired: blitz_scout_arrows_fired, arrows_hit: blitz_scout_arrows_hit, potions_drunk: blitz_scout_potions_drunk, potions_thrown: blitz_scout_potions_thrown, mobs_spawned: blitz_scout_mobs_spawned, chests_opened: blitz_scout_chests_opened, games_played: blitz_scout_games_played, time_played: blitz_scout_time_played, experience: blitz_scout_exp, level: blitz_scout_level };
            }
            if (blitz.games_played_hunter) {
              const blitz_hunter_kills = blitz.kills_hunter || 0;
              const blitz_hunter_wins = blitz.wins_hunter || 0;
              const blitz_hunter_wins_teams = blitz.wins_teams_hunter || 0;
              const blitz_hunter_damage = blitz.damage_hunter || 0;
              const blitz_hunter_damage_taken = blitz.damage_taken_hunter || 0;
              const blitz_hunter_potions_drunk = blitz.potions_drunk_hunter || 0;
              const blitz_hunter_potions_thrown = blitz.potions_thrown_hunter || 0;
              const blitz_hunter_mobs_spawned = blitz.mobs_spawned_hunter || 0;
              const blitz_hunter_chests_opened = blitz.chests_opened_hunter || 0;
              const blitz_hunter_arrows_hit = blitz.arrows_hit_hunter || 0;
              const blitz_hunter_arrows_fired = blitz.arrows_fired_hunter || 0;
              const blitz_hunter_games_played = blitz.games_played_hunter || 0;
              const blitz_hunter_time_played = blitz.time_played_hunter || 0;
              const blitz_hunter_exp = blitz.exp_hunter || 0;
              const blitz_hunter_level = blitz.hunter || 0;

              data.statistics.blitz.hunter = { wins: blitz_hunter_wins, team_wins: blitz_hunter_wins_teams, kills: blitz_hunter_kills, damage_given: blitz_hunter_damage, damage_taken: blitz_hunter_damage_taken, arrows_fired: blitz_hunter_arrows_fired, arrows_hit: blitz_hunter_arrows_hit, potions_drunk: blitz_hunter_potions_drunk, potions_thrown: blitz_hunter_potions_thrown, mobs_spawned: blitz_hunter_mobs_spawned, chests_opened: blitz_hunter_chests_opened, games_played: blitz_hunter_games_played, time_played: blitz_hunter_time_played, experience: blitz_hunter_exp, level: blitz_hunter_level };
            }
            if (blitz.games_played_warrior) {
              const blitz_warrior_kills = blitz.kills_warrior || 0;
              const blitz_warrior_wins = blitz.wins_warrior || 0;
              const blitz_warrior_wins_teams = blitz.wins_teams_warrior || 0;
              const blitz_warrior_damage = blitz.damage_warrior || 0;
              const blitz_warrior_damage_taken = blitz.damage_taken_warrior || 0;
              const blitz_warrior_potions_drunk = blitz.potions_drunk_warrior || 0;
              const blitz_warrior_potions_thrown = blitz.potions_thrown_warrior || 0;
              const blitz_warrior_mobs_spawned = blitz.mobs_spawned_warrior || 0;
              const blitz_warrior_chests_opened = blitz.chests_opened_warrior || 0;
              const blitz_warrior_arrows_hit = blitz.arrows_hit_warrior || 0;
              const blitz_warrior_arrows_fired = blitz.arrows_fired_warrior || 0;
              const blitz_warrior_games_played = blitz.games_played_warrior || 0;
              const blitz_warrior_time_played = blitz.time_played_warrior || 0;
              const blitz_warrior_exp = blitz.exp_warrior || 0;
              const blitz_warrior_level = blitz.warrior || 0;

              data.statistics.blitz.warrior = { wins: blitz_warrior_wins, team_wins: blitz_warrior_wins_teams, kills: blitz_warrior_kills, damage_given: blitz_warrior_damage, damage_taken: blitz_warrior_damage_taken, arrows_fired: blitz_warrior_arrows_fired, arrows_hit: blitz_warrior_arrows_hit, potions_drunk: blitz_warrior_potions_drunk, potions_thrown: blitz_warrior_potions_thrown, mobs_spawned: blitz_warrior_mobs_spawned, chests_opened: blitz_warrior_chests_opened, games_played: blitz_warrior_games_played, time_played: blitz_warrior_time_played, experience: blitz_warrior_exp, level: blitz_warrior_level };
            }
            if (blitz.games_played["_hype train"]) {
              const blitz_hype_train_kills = blitz.kills["_hype train"] || 0;
              const blitz_hype_train_wins = blitz.wins["_hype train"] || 0;
              const blitz_hype_train_wins_teams = blitz.wins_teams["_hype train"] || 0;
              const blitz_hype_train_damage = blitz.damage["_hype train"] || 0;
              const blitz_hype_train_damage_taken = blitz.damage_taken["_hype train"] || 0;
              const blitz_hype_train_potions_drunk = blitz.potions_drunk["_hype train"] || 0;
              const blitz_hype_train_potions_thrown = blitz.potions_thrown["_hype train"] || 0;
              const blitz_hype_train_mobs_spawned = blitz.mobs_spawned["_hype train"] || 0;
              const blitz_hype_train_chests_opened = blitz.chests_opened["_hype train"] || 0;
              const blitz_hype_train_arrows_hit = blitz.arrows_hit["_hype train"] || 0;
              const blitz_hype_train_arrows_fired = blitz.arrows_fired["_hype train"] || 0;
              const blitz_hype_train_games_played = blitz.games_played["_hype train"] || 0;
              const blitz_hype_train_time_played = blitz.time_played["_hype train"] || 0;
              const blitz_hype_train_exp = blitz.exp["_hype train"] || 0;
              const blitz_hype_train_level = blitz["hype train"] || 0;

              data.statistics.blitz.hype_train = { wins: blitz_hype_train_wins, team_wins: blitz_hype_train_wins_teams, kills: blitz_hype_train_kills, damage_given: blitz_hype_train_damage, damage_taken: blitz_hype_train_damage_taken, arrows_fired: blitz_hype_train_arrows_fired, arrows_hit: blitz_hype_train_arrows_hit, potions_drunk: blitz_hype_train_potions_drunk, potions_thrown: blitz_hype_train_potions_thrown, mobs_spawned: blitz_hype_train_mobs_spawned, chests_opened: blitz_hype_train_chests_opened, games_played: blitz_hype_train_games_played, time_played: blitz_hype_train_time_played, experience: blitz_hype_train_exp, level: blitz_hype_train_level };
            }
            if (blitz.games_played_fisherman) {
              const blitz_fisherman_kills = blitz.kills_fisherman || 0;
              const blitz_fisherman_wins = blitz.wins_fisherman || 0;
              const blitz_fisherman_wins_teams = blitz.wins_teams_fisherman || 0;
              const blitz_fisherman_damage = blitz.damage_fisherman || 0;
              const blitz_fisherman_damage_taken = blitz.damage_taken_fisherman || 0;
              const blitz_fisherman_potions_drunk = blitz.potions_drunk_fisherman || 0;
              const blitz_fisherman_potions_thrown = blitz.potions_thrown_fisherman || 0;
              const blitz_fisherman_mobs_spawned = blitz.mobs_spawned_fisherman || 0;
              const blitz_fisherman_chests_opened = blitz.chests_opened_fisherman || 0;
              const blitz_fisherman_arrows_hit = blitz.arrows_hit_fisherman || 0;
              const blitz_fisherman_arrows_fired = blitz.arrows_fired_fisherman || 0;
              const blitz_fisherman_games_played = blitz.games_played_fisherman || 0;
              const blitz_fisherman_time_played = blitz.time_played_fisherman || 0;
              const blitz_fisherman_exp = blitz.exp_fisherman || 0;
              const blitz_fisherman_level = blitz.fisherman || 0;

              data.statistics.blitz.fisherman = { wins: blitz_fisherman_wins, team_wins: blitz_fisherman_wins_teams, kills: blitz_fisherman_kills, damage_given: blitz_fisherman_damage, damage_taken: blitz_fisherman_damage_taken, arrows_fired: blitz_fisherman_arrows_fired, arrows_hit: blitz_fisherman_arrows_hit, potions_drunk: blitz_fisherman_potions_drunk, potions_thrown: blitz_fisherman_potions_thrown, mobs_spawned: blitz_fisherman_mobs_spawned, chests_opened: blitz_fisherman_chests_opened, games_played: blitz_fisherman_games_played, time_played: blitz_fisherman_time_played, experience: blitz_fisherman_exp, level: blitz_fisherman_level };
            }
            if (blitz.games_played_florist) {
              const blitz_florist_kills = blitz.kills_florist || 0;
              const blitz_florist_wins = blitz.wins_florist || 0;
              const blitz_florist_wins_teams = blitz.wins_teams_florist || 0;
              const blitz_florist_damage = blitz.damage_florist || 0;
              const blitz_florist_damage_taken = blitz.damage_taken_florist || 0;
              const blitz_florist_potions_drunk = blitz.potions_drunk_florist || 0;
              const blitz_florist_potions_thrown = blitz.potions_thrown_florist || 0;
              const blitz_florist_mobs_spawned = blitz.mobs_spawned_florist || 0;
              const blitz_florist_chests_opened = blitz.chests_opened_florist || 0;
              const blitz_florist_arrows_hit = blitz.arrows_hit_florist || 0;
              const blitz_florist_arrows_fired = blitz.arrows_fired_florist || 0;
              const blitz_florist_games_played = blitz.games_played_florist || 0;
              const blitz_florist_time_played = blitz.time_played_florist || 0;
              const blitz_florist_exp = blitz.exp_florist || 0;
              const blitz_florist_level = blitz.florist || 0;

              data.statistics.blitz.florist = { wins: blitz_florist_wins, team_wins: blitz_florist_wins_teams, kills: blitz_florist_kills, damage_given: blitz_florist_damage, damage_taken: blitz_florist_damage_taken, arrows_fired: blitz_florist_arrows_fired, arrows_hit: blitz_florist_arrows_hit, potions_drunk: blitz_florist_potions_drunk, potions_thrown: blitz_florist_potions_thrown, mobs_spawned: blitz_florist_mobs_spawned, chests_opened: blitz_florist_chests_opened, games_played: blitz_florist_games_played, time_played: blitz_florist_time_played, experience: blitz_florist_exp, level: blitz_florist_level };
            }
            if (blitz.games_played_diver) {
              const blitz_diver_kills = blitz.kills_diver || 0;
              const blitz_diver_wins = blitz.wins_diver || 0;
              const blitz_diver_wins_teams = blitz.wins_teams_diver || 0;
              const blitz_diver_damage = blitz.damage_diver || 0;
              const blitz_diver_damage_taken = blitz.damage_taken_diver || 0;
              const blitz_diver_potions_drunk = blitz.potions_drunk_diver || 0;
              const blitz_diver_potions_thrown = blitz.potions_thrown_diver || 0;
              const blitz_diver_mobs_spawned = blitz.mobs_spawned_diver || 0;
              const blitz_diver_chests_opened = blitz.chests_opened_diver || 0;
              const blitz_diver_arrows_hit = blitz.arrows_hit_diver || 0;
              const blitz_diver_arrows_fired = blitz.arrows_fired_diver || 0;
              const blitz_diver_games_played = blitz.games_played_diver || 0;
              const blitz_diver_time_played = blitz.time_played_diver || 0;
              const blitz_diver_exp = blitz.exp_diver || 0;
              const blitz_diver_level = blitz.diver || 0;

              data.statistics.blitz.diver = { wins: blitz_diver_wins, team_wins: blitz_diver_wins_teams, kills: blitz_diver_kills, damage_given: blitz_diver_damage, damage_taken: blitz_diver_damage_taken, arrows_fired: blitz_diver_arrows_fired, arrows_hit: blitz_diver_arrows_hit, potions_drunk: blitz_diver_potions_drunk, potions_thrown: blitz_diver_potions_thrown, mobs_spawned: blitz_diver_mobs_spawned, chests_opened: blitz_diver_chests_opened, games_played: blitz_diver_games_played, time_played: blitz_diver_time_played, experience: blitz_diver_exp, level: blitz_diver_level };
            }
            if (blitz.games_played_arachnologist) {
              const blitz_arachnologist_kills = blitz.kills_arachnologist || 0;
              const blitz_arachnologist_wins = blitz.wins_arachnologist || 0;
              const blitz_arachnologist_wins_teams = blitz.wins_teams_arachnologist || 0;
              const blitz_arachnologist_damage = blitz.damage_arachnologist || 0;
              const blitz_arachnologist_damage_taken = blitz.damage_taken_arachnologist || 0;
              const blitz_arachnologist_potions_drunk = blitz.potions_drunk_arachnologist || 0;
              const blitz_arachnologist_potions_thrown = blitz.potions_thrown_arachnologist || 0;
              const blitz_arachnologist_mobs_spawned = blitz.mobs_spawned_arachnologist || 0;
              const blitz_arachnologist_chests_opened = blitz.chests_opened_arachnologist || 0;
              const blitz_arachnologist_arrows_hit = blitz.arrows_hit_arachnologist || 0;
              const blitz_arachnologist_arrows_fired = blitz.arrows_fired_arachnologist || 0;
              const blitz_arachnologist_games_played = blitz.games_played_arachnologist || 0;
              const blitz_arachnologist_time_played = blitz.time_played_arachnologist || 0;
              const blitz_arachnologist_exp = blitz.exp_arachnologist || 0;
              const blitz_arachnologist_level = blitz.arachnologist || 0;

              data.statistics.blitz.arachnologist = { wins: blitz_arachnologist_wins, team_wins: blitz_arachnologist_wins_teams, kills: blitz_arachnologist_kills, damage_given: blitz_arachnologist_damage, damage_taken: blitz_arachnologist_damage_taken, arrows_fired: blitz_arachnologist_arrows_fired, arrows_hit: blitz_arachnologist_arrows_hit, potions_drunk: blitz_arachnologist_potions_drunk, potions_thrown: blitz_arachnologist_potions_thrown, mobs_spawned: blitz_arachnologist_mobs_spawned, chests_opened: blitz_arachnologist_chests_opened, games_played: blitz_arachnologist_games_played, time_played: blitz_arachnologist_time_played, experience: blitz_arachnologist_exp, level: blitz_arachnologist_level };
            }
            if (blitz.games_played_blaze) {
              const blitz_blaze_kills = blitz.kills_blaze || 0;
              const blitz_blaze_wins = blitz.wins_blaze || 0;
              const blitz_blaze_wins_teams = blitz.wins_teams_blaze || 0;
              const blitz_blaze_damage = blitz.damage_blaze || 0;
              const blitz_blaze_damage_taken = blitz.damage_taken_blaze || 0;
              const blitz_blaze_potions_drunk = blitz.potions_drunk_blaze || 0;
              const blitz_blaze_potions_thrown = blitz.potions_thrown_blaze || 0;
              const blitz_blaze_mobs_spawned = blitz.mobs_spawned_blaze || 0;
              const blitz_blaze_chests_opened = blitz.chests_opened_blaze || 0;
              const blitz_blaze_arrows_hit = blitz.arrows_hit_blaze || 0;
              const blitz_blaze_arrows_fired = blitz.arrows_fired_blaze || 0;
              const blitz_blaze_games_played = blitz.games_played_blaze || 0;
              const blitz_blaze_time_played = blitz.time_played_blaze || 0;
              const blitz_blaze_exp = blitz.exp_blaze || 0;
              const blitz_blaze_level = blitz.blaze || 0;

              data.statistics.blitz.blaze = { wins: blitz_blaze_wins, team_wins: blitz_blaze_wins_teams, kills: blitz_blaze_kills, damage_given: blitz_blaze_damage, damage_taken: blitz_blaze_damage_taken, arrows_fired: blitz_blaze_arrows_fired, arrows_hit: blitz_blaze_arrows_hit, potions_drunk: blitz_blaze_potions_drunk, potions_thrown: blitz_blaze_potions_thrown, mobs_spawned: blitz_blaze_mobs_spawned, chests_opened: blitz_blaze_chests_opened, games_played: blitz_blaze_games_played, time_played: blitz_blaze_time_played, experience: blitz_blaze_exp, level: blitz_blaze_level };
            }
            if (blitz.games_played_wolftamer) {
              const blitz_wolftamer_kills = blitz.kills_wolftamer || 0;
              const blitz_wolftamer_wins = blitz.wins_wolftamer || 0;
              const blitz_wolftamer_wins_teams = blitz.wins_teams_wolftamer || 0;
              const blitz_wolftamer_damage = blitz.damage_wolftamer || 0;
              const blitz_wolftamer_damage_taken = blitz.damage_taken_wolftamer || 0;
              const blitz_wolftamer_potions_drunk = blitz.potions_drunk_wolftamer || 0;
              const blitz_wolftamer_potions_thrown = blitz.potions_thrown_wolftamer || 0;
              const blitz_wolftamer_mobs_spawned = blitz.mobs_spawned_wolftamer || 0;
              const blitz_wolftamer_chests_opened = blitz.chests_opened_wolftamer || 0;
              const blitz_wolftamer_arrows_hit = blitz.arrows_hit_wolftamer || 0;
              const blitz_wolftamer_arrows_fired = blitz.arrows_fired_wolftamer || 0;
              const blitz_wolftamer_games_played = blitz.games_played_wolftamer || 0;
              const blitz_wolftamer_time_played = blitz.time_played_wolftamer || 0;
              const blitz_wolftamer_exp = blitz.exp_wolftamer || 0;
              const blitz_wolftamer_level = blitz.wolftamer || 0;

              data.statistics.blitz.wolftamer = { wins: blitz_wolftamer_wins, team_wins: blitz_wolftamer_wins_teams, kills: blitz_wolftamer_kills, damage_given: blitz_wolftamer_damage, damage_taken: blitz_wolftamer_damage_taken, arrows_fired: blitz_wolftamer_arrows_fired, arrows_hit: blitz_wolftamer_arrows_hit, potions_drunk: blitz_wolftamer_potions_drunk, potions_thrown: blitz_wolftamer_potions_thrown, mobs_spawned: blitz_wolftamer_mobs_spawned, chests_opened: blitz_wolftamer_chests_opened, games_played: blitz_wolftamer_games_played, time_played: blitz_wolftamer_time_played, experience: blitz_wolftamer_exp, level: blitz_wolftamer_level };
            }
            if (blitz.games_played_tim) {
              const blitz_tim_kills = blitz.kills_tim || 0;
              const blitz_tim_wins = blitz.wins_tim || 0;
              const blitz_tim_wins_teams = blitz.wins_teams_tim || 0;
              const blitz_tim_damage = blitz.damage_tim || 0;
              const blitz_tim_damage_taken = blitz.damage_taken_tim || 0;
              const blitz_tim_potions_drunk = blitz.potions_drunk_tim || 0;
              const blitz_tim_potions_thrown = blitz.potions_thrown_tim || 0;
              const blitz_tim_mobs_spawned = blitz.mobs_spawned_tim || 0;
              const blitz_tim_chests_opened = blitz.chests_opened_tim || 0;
              const blitz_tim_arrows_hit = blitz.arrows_hit_tim || 0;
              const blitz_tim_arrows_fired = blitz.arrows_fired_tim || 0;
              const blitz_tim_games_played = blitz.games_played_tim || 0;
              const blitz_tim_time_played = blitz.time_played_tim || 0;
              const blitz_tim_exp = blitz.exp_tim || 0;
              const blitz_tim_level = blitz.tim || 0;

              data.statistics.blitz.tim = { wins: blitz_tim_wins, team_wins: blitz_tim_wins_teams, kills: blitz_tim_kills, damage_given: blitz_tim_damage, damage_taken: blitz_tim_damage_taken, arrows_fired: blitz_tim_arrows_fired, arrows_hit: blitz_tim_arrows_hit, potions_drunk: blitz_tim_potions_drunk, potions_thrown: blitz_tim_potions_thrown, mobs_spawned: blitz_tim_mobs_spawned, chests_opened: blitz_tim_chests_opened, games_played: blitz_tim_games_played, time_played: blitz_tim_time_played, experience: blitz_tim_exp, level: blitz_tim_level };
            }
            if (blitz.games_played_snowman) {
              const blitz_snowman_kills = blitz.kills_snowman || 0;
              const blitz_snowman_wins = blitz.wins_snowman || 0;
              const blitz_snowman_wins_teams = blitz.wins_teams_snowman || 0;
              const blitz_snowman_damage = blitz.damage_snowman || 0;
              const blitz_snowman_damage_taken = blitz.damage_taken_snowman || 0;
              const blitz_snowman_potions_drunk = blitz.potions_drunk_snowman || 0;
              const blitz_snowman_potions_thrown = blitz.potions_thrown_snowman || 0;
              const blitz_snowman_mobs_spawned = blitz.mobs_spawned_snowman || 0;
              const blitz_snowman_chests_opened = blitz.chests_opened_snowman || 0;
              const blitz_snowman_arrows_hit = blitz.arrows_hit_snowman || 0;
              const blitz_snowman_arrows_fired = blitz.arrows_fired_snowman || 0;
              const blitz_snowman_games_played = blitz.games_played_snowman || 0;
              const blitz_snowman_time_played = blitz.time_played_played_snowman || 0;
              const blitz_snowman_exp = blitz.exp_snowman || 0;
              const blitz_snowman_level = blitz.snowman || 0;

              data.statistics.blitz.snowman = { wins: blitz_snowman_wins, team_wins: blitz_snowman_wins_teams, kills: blitz_snowman_kills, damage_given: blitz_snowman_damage, damage_taken: blitz_snowman_damage_taken, arrows_fired: blitz_snowman_arrows_fired, arrows_hit: blitz_snowman_arrows_hit, potions_drunk: blitz_snowman_potions_drunk, potions_thrown: blitz_snowman_potions_thrown, mobs_spawned: blitz_snowman_mobs_spawned, chests_opened: blitz_snowman_chests_opened, games_played: blitz_snowman_games_played, time_played: blitz_snowman_time_played, experience: blitz_snowman_exp, level: blitz_snowman_level };
            }
            if (blitz.games_played_rambo) {
              const blitz_rambo_kills = blitz.kills_rambo || 0;
              const blitz_rambo_wins = blitz.wins_rambo || 0;
              const blitz_rambo_wins_teams = blitz.wins_teams_rambo || 0;
              const blitz_rambo_damage = blitz.damage_rambo || 0;
              const blitz_rambo_damage_taken = blitz.damage_taken_rambo || 0;
              const blitz_rambo_potions_drunk = blitz.potions_drunk_rambo || 0;
              const blitz_rambo_potions_thrown = blitz.potions_thrown_rambo || 0;
              const blitz_rambo_mobs_spawned = blitz.mobs_spawned_rambo || 0;
              const blitz_rambo_chests_opened = blitz.chests_opened_rambo || 0;
              const blitz_rambo_arrows_hit = blitz.arrows_hit_rambo || 0;
              const blitz_rambo_arrows_fired = blitz.arrows_fired_rambo || 0;
              const blitz_rambo_games_played = blitz.games_played_rambo || 0;
              const blitz_rambo_time_played = blitz.time_played_rambo || 0;
              const blitz_rambo_exp = blitz.exp_rambo || 0;
              const blitz_rambo_level = blitz.rambo || 0;

              data.statistics.blitz.tim = { wins: blitz_rambo_wins, team_wins: blitz_rambo_wins_teams, kills: blitz_rambo_kills, damage_given: blitz_rambo_damage, damage_taken: blitz_rambo_damage_taken, arrows_fired: blitz_rambo_arrows_fired, arrows_hit: blitz_rambo_arrows_hit, potions_drunk: blitz_rambo_potions_drunk, potions_thrown: blitz_rambo_potions_thrown, mobs_spawned: blitz_rambo_mobs_spawned, chests_opened: blitz_rambo_chests_opened, games_played: blitz_rambo_games_played, time_played: blitz_rambo_time_played, experience: blitz_rambo_exp, level: blitz_rambo_level };
            }
            if (blitz.games_played_framer) {
              const blitz_framer_kills = blitz.kills_framer || 0;
              const blitz_framer_wins = blitz.wins_framer || 0;
              const blitz_framer_wins_teams = blitz.wins_teams_framer || 0;
              const blitz_framer_damage = blitz.damage_framer || 0;
              const blitz_framer_damage_taken = blitz.damage_taken_framer || 0;
              const blitz_framer_potions_drunk = blitz.potions_drunk_framer || 0;
              const blitz_framer_potions_thrown = blitz.potions_thrown_framer || 0;
              const blitz_framer_mobs_spawned = blitz.mobs_spawned_framer || 0;
              const blitz_framer_chests_opened = blitz.chests_opened_framer || 0;
              const blitz_framer_arrows_hit = blitz.arrows_hit_framer || 0;
              const blitz_framer_arrows_fired = blitz.arrows_fired_framer || 0;
              const blitz_framer_games_played = blitz.games_played_framer || 0;
              const blitz_framer_time_played = blitz.time_played_framer || 0;
              const blitz_framer_exp = blitz.exp_framer || 0;
              const blitz_framer_level = blitz.framer || 0;

              data.statistics.blitz.tim = { wins: blitz_framer_wins, team_wins: blitz_framer_wins_teams, kills: blitz_framer_kills, damage_given: blitz_framer_damage, damage_taken: blitz_framer_damage_taken, arrows_fired: blitz_framer_arrows_fired, arrows_hit: blitz_framer_arrows_hit, potions_drunk: blitz_framer_potions_drunk, potions_thrown: blitz_framer_potions_thrown, mobs_spawned: blitz_framer_mobs_spawned, chests_opened: blitz_framer_chests_opened, games_played: blitz_framer_games_played, time_played: blitz_framer_time_played, experience: blitz_framer_exp, level: blitz_framer_level };
            }
            if (blitz.games_played_armorer) {
              const blitz_armorer_kills = blitz.kills_armorer || 0;
              const blitz_armorer_wins = blitz.wins_armorer || 0;
              const blitz_armorer_wins_teams = blitz.wins_teams_armorer || 0;
              const blitz_armorer_damage = blitz.damage_armorer || 0;
              const blitz_armorer_damage_taken = blitz.damage_taken_armorer || 0;
              const blitz_armorer_potions_drunk = blitz.potions_drunk_armorer || 0;
              const blitz_armorer_potions_thrown = blitz.potions_thrown_armorer || 0;
              const blitz_armorer_mobs_spawned = blitz.mobs_spawned_armorer || 0;
              const blitz_armorer_chests_opened = blitz.chests_opened_armorer || 0;
              const blitz_armorer_arrows_hit = blitz.arrows_hit_armorer || 0;
              const blitz_armorer_arrows_fired = blitz.arrows_fired_armorer || 0;
              const blitz_armorer_games_played = blitz.games_played_armorer || 0;
              const blitz_armorer_time_played = blitz.time_played_armorer || 0;
              const blitz_armorer_exp = blitz.exp_armorer || 0;
              const blitz_armorer_level = blitz.armorer || 0;

              data.statistics.blitz.tim = { wins: blitz_armorer_wins, team_wins: blitz_armorer_wins_teams, kills: blitz_armorer_kills, damage_given: blitz_armorer_damage, damage_taken: blitz_armorer_damage_taken, arrows_fired: blitz_armorer_arrows_fired, arrows_hit: blitz_armorer_arrows_hit, potions_drunk: blitz_armorer_potions_drunk, potions_thrown: blitz_armorer_potions_thrown, mobs_spawned: blitz_armorer_mobs_spawned, chests_opened: blitz_armorer_chests_opened, games_played: blitz_armorer_games_played, time_played: blitz_armorer_time_played, experience: blitz_armorer_exp, level: blitz_armorer_level };
            }
            if (blitz.games_played_creepertamer) {
              const blitz_creepertamer_kills = blitz.kills_creepertamer || 0;
              const blitz_creepertamer_wins = blitz.wins_creepertamer || 0;
              const blitz_creepertamer_wins_teams = blitz.wins_teams_creepertamer || 0;
              const blitz_creepertamer_damage = blitz.damage_creepertamer || 0;
              const blitz_creepertamer_damage_taken = blitz.damage_taken_creepertamer || 0;
              const blitz_creepertamer_potions_drunk = blitz.potions_drunk_creepertamer || 0;
              const blitz_creepertamer_potions_thrown = blitz.potions_thrown_creepertamer || 0;
              const blitz_creepertamer_mobs_spawned = blitz.mobs_spawned_creepertamer || 0;
              const blitz_creepertamer_chests_opened = blitz.chests_opened_creepertamer || 0;
              const blitz_creepertamer_arrows_hit = blitz.arrows_hit_creepertamer || 0;
              const blitz_creepertamer_arrows_fired = blitz.arrows_fired_creepertamer || 0;
              const blitz_creepertamer_games_played = blitz.games_played_creepertamer || 0;
              const blitz_creepertamer_time_played = blitz.time_played_creepertamer || 0;
              const blitz_creepertamer_exp = blitz.exp_creepertamer || 0;
              const blitz_creepertamer_level = blitz.creepertamer || 0;

              data.statistics.blitz.tim = { wins: blitz_creepertamer_wins, team_wins: blitz_creepertamer_wins_teams, kills: blitz_creepertamer_kills, damage_given: blitz_creepertamer_damage, damage_taken: blitz_creepertamer_damage_taken, arrows_fired: blitz_creepertamer_arrows_fired, arrows_hit: blitz_creepertamer_arrows_hit, potions_drunk: blitz_creepertamer_potions_drunk, potions_thrown: blitz_creepertamer_potions_thrown, mobs_spawned: blitz_creepertamer_mobs_spawned, chests_opened: blitz_creepertamer_chests_opened, games_played: blitz_creepertamer_games_played, time_played: blitz_creepertamer_time_played, experience: blitz_creepertamer_exp, level: blitz_creepertamer_level };
            }
          }
          if (player.stats.TNTGames) {
            const tnt = player.stats.TNTGames;

            const tnt_coins = tnt.coins || 0;
            const tnt_winstreak = tnt.winstreak || 0;
            const tnt_wins = tnt.wins || 0;

            const tnt_run_wins = tnt.wins_tntrun || 0;
            const tnt_run_record = tnt.record_tntrun || 0;
            const tnt_run_deaths = tnt.deaths_tntrun || 0;

            const tnt_bowspleef_deaths = tnt.deaths_bowspleef || 0;
            const tnt_bowspleef_tags = tnt.tags_bowspleef || 0;
            const tnt_bowspleef_wins = tnt.wins_bowspleef || 0;

            const tnt_pvp_run_record = tnt.record_pvprun || 0;
            const tnt_pvp_run_wins = tnt.wins_pvprun || 0;
            const tnt_pvp_run_kills = tnt.kills_pvprun || 0;
            const tnt_pvp_run_deaths = tnt.deaths_pvprun || 0;

            const tnt_tag_kills = tnt.kills_tntag || 0;
            const tnt_tag_wins = tnt.wins_tntag || 0;

            const tnt_wizards_deaths = tnt.deaths_capture || 0;
            const tnt_wizards_wins = tnt.wins_capture || 0;
            const tnt_wizards_kills = tnt.kills_capture || 0;
            const tnt_wizards_assists = tnt.assists_capture || 0;
            const tnt_wizards_points = tnt.points_capture || 0;

            data.statistics.tnt_games = { coins: tnt_coins, wins: tnt_wins, winstreak: tnt_winstreak, tnt_run: { wins: tnt_run_wins, deaths: tnt_run_record, record: tnt_run_deaths}, bowspleef: { wins: tnt_bowspleef_wins, deaths: tnt_bowspleef_deaths, tags: tnt_bowspleef_tags }, pvp_run: { wins: tnt_pvp_run_wins, deaths: tnt_pvp_run_deaths, kills: tnt_pvp_run_kills, record: tnt_pvp_run_record }, tnt_tag: { wins: tnt_tag_wins, kills: tnt_tag_kills }, tnt_wizards: { wins: tnt_wizards_wins, deaths: tnt_wizards_deaths, kills: tnt_wizards_kills, assists: tnt_wizards_assists, points: tnt_wizards_points } };
          }
          if (player.stats.UHC) {
            const uhc = player.stats.UHC;

            const uhc_coins = uhc.coins || 0;
            const uhc_wins = uhc.wins || 0;
            const uhc_deaths = uhc.deaths || 0;
            const uhc_kills = uhc.kills || 0;
            const uhc_equipped_kit = uhc.equippedKit || "None";
            const uhc_score = uhc.score || 0;
            const uhc_heads_eaten = uhc.heads_eaten || 0;
            data.statistics.uhc = { coins: uhc_coins, wins: uhc_wins, deaths: uhc_deaths, kills: uhc_kills, score: uhc_score, kit: uhc_equipped_kit, heads_eaten: uhc_heads_eaten };

            const uhc_solo_wins = uhc.wins_solo || 0;
            const uhc_solo_deaths = uhc.deaths_solo || 0;
            const uhc_solo_kills = uhc.kills_solo || 0;
            const uhc_solo_heads_eaten = uhc.heads_eaten_solo || 0;
            data.statistics.uhc.solo = { wins: uhc_solo_wins, deaths: uhc_solo_deaths, kills: uhc_solo_kills, heads_eaten: uhc_solo_heads_eaten };

            const uhc_rvb_wins = uhc["wins_red vs blue"] || 0;
            const uhc_rvb_kills = uhc["kills_red vs blue"] || 0;
            const uhc_rvb_deaths = uhc["deaths_red vs blue"] || 0;
            const uhc_rvb_heads_eaten = uhc["heads_eaten_red vs blue"] || 0;
            data.statistics.uhc.red_vs_blue = { wins: uhc_rvb_wins, deaths: uhc_rvb_deaths, kills: uhc_rvb_kills, heads_eaten: uhc_rvb_heads_eaten };

            const uhc_vinilla_doubles_wins = uhc["wins_vanilla doubles"] || 0;
            const uhc_vinilla_doubles_heads_eaten = uhc["heads_eaten_vanilla doubles"] || 0;
            const uhc_vinilla_doubles_kills = uhc["kills_vanilla doubles"] || 0;
            const uhc_vinilla_doubles_deaths = uhc["deaths_vanilla doubles"] || 0;
            data.statistics.uhc.vinilla_doubles = { wins: uhc_vinilla_doubles_wins, deaths: uhc_vinilla_doubles_deaths, kills: uhc_vinilla_doubles_kills, heads_eaten: uhc_vinilla_doubles_heads_eaten };

            const uhc_no_diamond_deaths = uhc["deaths_no diamonds"] || 0;
            const uhc_no_diamond_kills = uhc["kills_no diamonds"] || 0;
            const uhc_no_diamond_wins = uhc["wins_no diamonds"] || 0;
            const uhc_no_diamond_heads_eaten = uhc["heads_eaten_no diamonds"] || 0;
            data.statistics.uhc.no_diamonds = { wins: uhc_no_diamond_wins, deaths: uhc_no_diamond_deaths, kills: uhc_no_diamond_kills, heads_eaten: uhc_no_diamond_heads_eaten };

            const uhc_brawl_deaths = uhc.deaths_brawl || 0;
            const uhc_brawl_heads_eaten = uhc.heads_eaten_brawl || 0;
            const uhc_brawl_kills = uhc.kills_brawl || 0;
            const uhc_brawl_wins = uhc.wins_brawl || 0;
            data.statistics.uhc.brawl = { wins: uhc_brawl_wins, deaths: uhc_brawl_deaths, kills: uhc_brawl_kills, heads_eaten: uhc_brawl_heads_eaten };

            const uhc_brawl_solo_deaths = uhc["deaths_solo brawl"] || 0;
            const uhc_brawl_solo_heads_eaten = uhc["heads_eaten_solo brawl"] || 0;
            const uhc_brawl_solo_kills = uhc["kills_solo brawl"] || 0;
            const uhc_brawl_solo_wins = uhc["wins_solo brawl"] || 0;
            data.statistics.uhc.solo_brawl = { wins: uhc_brawl_solo_wins, deaths: uhc_brawl_solo_deaths, kills: uhc_brawl_solo_kills, heads_eaten: uhc_brawl_solo_heads_eaten };

            const uhc_brawl_duo_deaths = uhc["deaths_duo brawl"] || 0;
            const uhc_brawl_duo_heads_eaten = uhc["heads_eaten_duo brawl"] || 0;
            const uhc_brawl_duo_kills = uhc["kills_duo brawl"] || 0;
            const uhc_brawl_duo_wins = uhc["wins_duo brawl"] || 0;
            data.statistics.uhc.duo_brawl = { wins: uhc_brawl_duo_wins, deaths: uhc_brawl_duo_deaths, kills: uhc_brawl_duo_kills, heads_eaten: uhc_brawl_duo_heads_eaten };
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
