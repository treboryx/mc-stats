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
              arcade: {},//done
              arena: {},
              battlegrounds: {},//removed gamemode.
              blitz: {},//done
              mcgo: {},
              paintball: {},
              quake: {},
              tnt_games: {},//done
              uhc: {},//done
              vampirez: {},
              walls: {},
              walls3: {},
              gingerbread: {},
              skywars: {},//done
              truecombat: {},
              super_smash: {},
              speed_uhc: {},//done
              skyclash: {},
              legacy: {},
              bedwars: {},//done
              murder_mystery: {},//done
              build_battle: {},//done
              duels: {},//done
              pit: {},//done
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
          const unlocked_cosmetics = player.vanityMeta ? player.vanityMeta.package.length : 0;
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
            if (blitz["games_played_shadow knight"]) {
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
            if (blitz["games_played_hype train"]) {
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

            const uhc_vanilla_doubles_wins = uhc["wins_vanilla doubles"] || 0;
            const uhc_vanilla_doubles_heads_eaten = uhc["heads_eaten_vanilla doubles"] || 0;
            const uhc_vanilla_doubles_kills = uhc["kills_vanilla doubles"] || 0;
            const uhc_vanilla_doubles_deaths = uhc["deaths_vanilla doubles"] || 0;
            data.statistics.uhc.vanilla_doubles = { wins: uhc_vanilla_doubles_wins, deaths: uhc_vanilla_doubles_deaths, kills: uhc_vanilla_doubles_kills, heads_eaten: uhc_vanilla_doubles_heads_eaten };

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
          if (player.stats.SkyWars) {
            const skywars = player.stats.SkyWars;

            const skywars_soul_well_uses = skywars.soul_well || 0;
            const skywars_winstreak = skywars.win_streak || 0;
            const skywars_coins = skywars.coins || 0;
            const skywars_tokens = skywars.cosmetic_tokens || 0;
            const skywars_losses = skywars.losses || 0;
            const skywars_players_survived = skywars.survived_players || 0;
            const skywars_souls_gathered = skywars.souls_gathered || 0;
            const skywars_souls_paid = skywars.paid_souls || 0;
            const skywars_souls_legendary = skywars.soul_well_legendaries || 0;
            const skywars_souls_rare = skywars.soul_well_rares || 0;
            const skywars_deaths = skywars.deaths || 0; 
            const skywars_quits = skywars.quits || 0;
            const skywars_souls = skywars.souls || 0;
            const skywars_kills = skywars.kills || 0;
            const skywars_void_kills = skywars.void_kills || 0;
            const skywars_melee_kills = skywars.melee_kills || 0;
            const skywars_most_kills_game = skywars.most_kills_game || 0;
            const skywars_games = skywars.games || 0;
            const skywars_assists = skywars.assists || 0;
            const skywars_wins = skywars.wins || 0;
            const skywars_highest_winstreak = skywars.highestWinstreak || 0;
            const skywars_highest_killstreak = skywars.highestWinstreak || 0;
            const skywars_timeplayed = skywars.time_played || 0;
            const skywars_last_gamemode = skywars.lastMode || 0;
            const skywars_experience = skywars.skywars_experience || 0;

            data.statistics.skywars = { coins: skywars_coins, tokens: skywars_tokens, experience: skywars_experience, souls: skywars_souls, soul_well_uses: skywars_soul_well_uses, souls_gathered: skywars_souls_gathered, souls_paid: skywars_souls_paid, souls_found_legendary: skywars_souls_legendary, souls_found_rare: skywars_souls_rare, wins: skywars_wins, winstreak: skywars_winstreak, highest_winstreak: skywars_highest_winstreak, losses: skywars_losses, games_played: skywars_games, kills: skywars_kills, void_kills: skywars_void_kills, meelee_kills: skywars_melee_kills, most_kills: skywars_most_kills_game, assists: skywars_assists, highest_killstreak: skywars_highest_killstreak, deaths: skywars_deaths, players_survived: skywars_players_survived, quits: skywars_quits, timeplayed: skywars_timeplayed, last_gamemode: skywars_last_gamemode };

            const skywars_blocks_broken = skywars.blocks_broken || 0;
            const skywars_blocks_placed = skywars.blocks_placed || 0;
            const skywars_eggs_thrown = skywars.egg_thrown || 0;
            const skywars_endpearls_thrown = skywars.enderpearls_thrown || 0;
            const skywars_arrows_hit = skywars.arrows_hit || 0;
            const skywars_arrows_shot = skywars.arrows_shot || 0;
            const skywars_items_enchanted = skywars.items_enchanted || 0;
            const skywars_fastest_win = skywars.fastest_win || 0;
            const skywars_fastest_ranked_win = skywars.fastest_win_ranked || 0;
            const skywars_fastest_team_win = skywars.fastest_win_team || 0;
            const skywars_fastest_solo_win = skywars.fastest_win_solo || 0;
            const skywars_chests_opened = skywars.chests_opened || 0;
            const skywars_longest_bow_shot = skywars.longest_bow_shot || 0;
            const skywars_mob_kills = skywars.mob_kills || 0; 

            data.statistics.skywars.misc = { blocks_broken: skywars_blocks_broken, blocks_placed: skywars_blocks_placed, eggs_thrown: skywars_eggs_thrown, enderpearls_thrown: skywars_endpearls_thrown, arrows_hit: skywars_arrows_hit, arrows_shot: skywars_arrows_shot, longest_bow_shot: skywars_longest_bow_shot, items_enchanted: skywars_items_enchanted, fastest_win: skywars_fastest_win, fastest_ranked_win: skywars_fastest_ranked_win, fastest_team_win: skywars_fastest_team_win, fastest_solo_win: skywars_fastest_solo_win, chests_opened: skywars_chests_opened, mobs_killed: skywars_mob_kills };

            const skywars_teams_normal_wins = skywars.wins_team_normal || 0;
            const skywars_teams_normal_losses = skywars.losses_team_normal || 0;
            const skywars_teams_normal_kills = skywars.kills_team_normal || 0;
            const skywars_teams_normal_deaths = skywars.deaths_team_normal || 0;

            data.statistics.skywars.teams_normal = { wins: skywars_teams_normal_wins, losses: skywars_teams_normal_losses, kills: skywars_teams_normal_kills, deaths: skywars_teams_normal_deaths };

            const skywars_teams_insane_wins = skywars.wins_team_insane || 0;
            const skywars_teams_insane_losses = skywars.losses_team_insane || 0;
            const skywars_teams_insane_kills = skywars.kills_team_insane || 0;
            const skywars_teams_insane_deaths = skywars.deaths_team_insane || 0;
         
            data.statistics.skywars.teams_insane = { wins: skywars_teams_insane_wins, losses: skywars_teams_insane_losses, kills: skywars_teams_insane_kills, deaths: skywars_teams_insane_deaths };

            const skywars_solo_normal_wins = skywars.wins_solo_normal || 0;
            const skywars_solo_normal_losses = skywars.losses_solo_normal || 0;
            const skywars_solo_normal_kills = skywars.kills_solo_normal || 0;
            const skywars_solo_normal_deaths = skywars.deaths_solo_normal || 0;

            data.statistics.skywars.solo_normal = { wins: skywars_solo_normal_wins, losses: skywars_solo_normal_losses, kills: skywars_solo_normal_kills, deaths: skywars_solo_normal_deaths };

            const skywars_solo_insane_wins = skywars.wins_solo_insane || 0;
            const skywars_solo_insane_losses = skywars.losses_solo_insane || 0;
            const skywars_solo_insane_kills = skywars.kills_solo_insane || 0;
            const skywars_solo_insane_deaths = skywars.deaths_solo_insane || 0;

            data.statistics.skywars.solo_insane = { wins: skywars_solo_insane_wins, losses: skywars_solo_insane_losses, kills: skywars_solo_insane_kills, deaths: skywars_solo_insane_deaths };

            const skywars_mega_normal_wins = skywars.wins_mega_normal || 0;
            const skywars_mega_normal_losses = skywars.losses_mega_normal || 0;
            const skywars_mega_normal_kills = skywars.kills_mega_normal || 0;
            const skywars_mega_normal_deaths = skywars.deaths_mega_normal || 0;
            const skywars_mega_normal_timeplayed = skywars.time_played_mega || 0;

            data.statistics.skywars.mega_normal = { wins: skywars_mega_normal_wins, losses: skywars_mega_normal_losses, kills: skywars_mega_normal_kills, deaths: skywars_mega_normal_deaths, timeplayed: skywars_mega_normal_timeplayed };

            const skywars_mega_double_wins = skywars.wins_mega_doubles || 0;
            const skywars_mega_double_losses = skywars.losses_mega_doubles || 0;
            const skywars_mega_double_kills = skywars.kills_mega_doubles || 0;
            const skywars_mega_double_deaths = skywars.deaths_mega_doubles || 0;
            const skywars_mega_double_timeplayed = skywars.time_played_mega || 0;

            data.statistics.skywars.mega_doubles = { wins: skywars_mega_double_wins, losses: skywars_mega_double_losses, kills: skywars_mega_double_kills, deaths: skywars_mega_double_deaths, timeplayed: skywars_mega_double_timeplayed };

            const skywars_ranked_wins = skywars.wins_ranked_normal || 0;
            const skywars_ranked_losses = skywars.losses_ranked_normal || 0;
            const skywars_ranked_kills = skywars.kills_ranked_normal || 0;
            const skywars_ranked_deaths = skywars.deaths_ranked_normal || 0;
            const skywars_ranked_timeplayed = skywars.time_played_ranked || 0;
            const skywars_ranked_games = skywars.games_ranked || 0;
            const skywars_ranked_most_kills_game = skywars.most_kills_game_ranked || 0;

            data.statistics.skywars.ranked = { wins: skywars_ranked_wins, losses: skywars_ranked_losses, kills: skywars_ranked_kills, deaths: skywars_ranked_deaths, timeplayed: skywars_ranked_timeplayed, games: skywars_ranked_games, most_kills_game: skywars_ranked_most_kills_game };
          }
          if (player.stats.SpeedUHC) {
            const suhc = player.stats.SpeedUHC;

            const suhc_tears = suhc.tears || 0;
            const suhc_tears_gathered = suhc.tears_gathered || 0;
            const suhc_highest_killstreak = suhc.highestKillstreak || 0;
            const suhc_coins = suhc.coins || 0;
            const suhc_losses = suhc.losses || 0;
            const suhc_quits = suhc.quits || 0;
            const suhc_kills = suhc.kills || 0;
            const suhc_survived_players = suhc.survived_players || 0;
            const suhc_assists = suhc.assists || 0;
            const suhc_deaths = suhc.deaths || 0;
            const suhc_games = suhc.games || 0;
            const suhc_wins = suhc.wins || 0;
            const suhc_winstreak = suhc.winstreak || 0;
            const suhc_highest_winstreak = suhc.highestWinstreak || 0;
            const suhc_salt = suhc.salt || 0;
            const suhc_score = suhc.score || 0;
            const suhc_solo_score = suhc.score_solo || 0;
            const suhc_team_score = suhc.score_team || 0;

            data.statistics.speed_uhc = { coins: suhc_coins, tears: suhc_tears, tears_gathered: suhc_tears_gathered, salt: suhc_salt, wins: suhc_wins, winstreak: suhc_winstreak, highest_winstreak: suhc_highest_winstreak, losses: suhc_losses, games_played: suhc_games, kills: suhc_kills, assists: suhc_assists, highest_killstreak: suhc_highest_killstreak, deaths: suhc_deaths, players_survived: suhc_survived_players, quits: suhc_quits, score: suhc_score, solo_score: suhc_solo_score, team_score: suhc_team_score };
           
            const suhc_blocks_broken = suhc.blocks_broken || 0;
            const suhc_blocks_placed = suhc.blocks_placed || 0;
            const suhc_items_enchanted = suhc.items_enchanted || 0;
            const suhc_enderpearls_thrown = suhc.enderpearls_thrown || 0;
            const suhc_arrows_hit = suhc.arrows_hit || 0;
            const suhc_arrows_shot = suhc.arrows_shot || 0;

            data.statistics.speed_uhc.misc = { blocks_broken: suhc_blocks_broken, blocks_placed: suhc_blocks_placed, enderpearls_thrown: suhc_enderpearls_thrown, arrows_hit: suhc_arrows_hit, arrows_shot: suhc_arrows_shot,  items_enchanted: suhc_items_enchanted };

            const suhc_solo_wins = suhc.wins_solo_normal || 0;
            const suhc_solo_losses = suhc.losses_solo_normal || 0;
            const suhc_solo_kills = suhc.kills_solo_normal || 0;
            const suhc_solo_deaths = suhc.deaths_solo_normal || 0;
            const suhc_solo_survived_players = suhc.survived_players_solo || 0;

            data.statistics.speed_uhc.solo_normal = { wins: suhc_solo_wins, losses: suhc_solo_losses, kills: suhc_solo_kills, deaths: suhc_solo_deaths, players_survived: suhc_solo_survived_players };

            const such_solo_insane_wins = suhc.wins_solo_insane || 0;
            const such_solo_insane_losses = suhc.losses_solo_insane || 0;
            const such_solo_insane_kills = suhc.kills_solo_insane || 0;
            const such_solo_insane_deaths = suhc.deaths_solo_insane || 0;
            const such_solo_insane_players_survived = suhc.survived_players_insane || 0;

            data.statistics.speed_uhc.solo_insane = { wins: such_solo_insane_wins, losses: such_solo_insane_losses, kills: such_solo_insane_kills, deaths: such_solo_insane_deaths, players_survived: such_solo_insane_players_survived };

            const suhc_team_insane_wins = suhc.wins_team_insane || 0;
            const suhc_team_insane_losses = suhc.losses_team_insane || 0;
            const suhc_team_insane_kills = suhc.kills_team_insane || 0;
            const suhc_team_insane_deaths = suhc.deaths_team_insane || 0;

            data.statistics.speed_uhc.team_insane = { wins: suhc_team_insane_wins, losses: suhc_team_insane_losses, kills: suhc_team_insane_kills, deaths: suhc_team_insane_deaths };

            const suhc_teams_wins = suhc.wins_team_normal || 0;
            const suhc_teams_losses = suhc.losses_team_normal || 0;
            const suhc_teams_kills = suhc.kills_team_normal || 0;
            const suhc_teams_deaths = suhc.deaths_team_normal || 0;
            const suhc_teams_survived_players = suhc.survived_players_team || 0;

            data.statistics.speed_uhc.team_normal = { wins: suhc_teams_wins, losses: suhc_teams_losses, kills: suhc_teams_kills, deaths: suhc_teams_deaths, players_survived: suhc_teams_survived_players };
          }
          if (player.stats.BuildBattle) {
            const build = player.stats.BuildBattle;

            const build_team_wins = build.wins_teams_normal || 0;
            const build_solo_wins = build.wins_solo_normal || 0;
            const build_solo_pro_wins = build.wins_solo_pro || 0;
            const buils_guess_wins = build.wins_guess_the_build || 0;
            const build_wins = build.wins || 0;
            const build_games_played = build.games_played || 0;
            const build_score = build.score || 0;
            const build_coins = build.coins || 0;
            const build_correct_guesses = build.correct_guesses || 0;
            const build_total_votes = build.total_votes || 0;
            const build_team_most_points = build.teams_most_points || 0;

            data.statistics.build_battle = { wins: build_wins, team_wins: build_team_wins, solo_wins: build_solo_wins, solo_pro_wins: build_solo_pro_wins, guess_wins: buils_guess_wins, games_played: build_games_played, score: build_score, coins: build_coins, correct_guesses: build_correct_guesses, total_votes: build_total_votes, team_most_points: build_team_most_points };
          }
          if (player.stats.MurderMystery) {
            const mm = player.stats.MurderMystery;

            const mm_deteive_chance = mm.detective_chance || 0;
            const mm_murder_chance = mm.murderer_chance || 0;
            const mm_wins = mm.wins || 0;
            const mm_survivor_wins = mm.survivor_wins || 0;
            const mm_murderer_wins = mm.murderer_wins || 0;
            const mm_deteive_wins = mm.detective_wins || 0;
            const mm_coins = mm.coins || 0;
            const mm_games_plated = mm.games || 0;
            const mm_deaths = mm.deaths || 0;
            const mm_knife_kills = mm.knife_kills || 0;
            const mm_thrown_knife_kills = mm.thrown_knife_kills || 0;
            const mm_trap_kills = mm.trap_kills || 0;
            const mm_kills = mm.kills || 0;
            const mm_bow_kills = mm.bow_kills || 0;
            const mm_coins_picked_up = mm.coins_pickedup || 0;
            const mm_times_last_alive = mm.last_one_alive || 0;
            const mm_times_hero = mm.was_hero || 0;
            const mm_suicides = mm.suicides || 0;

            data.statistics.murder_mystery = { deteive_chance: mm_deteive_chance, murder_chance: mm_murder_chance, wins: mm_wins, survivor_wins: mm_survivor_wins, murderer_wins: mm_murderer_wins, detective_wins: mm_deteive_wins, coins: mm_coins,  games_played: mm_games_plated, deaths: mm_deaths, knife_kills: mm_knife_kills, thrown_knife_kills: mm_thrown_knife_kills, trap_kills: mm_trap_kills, kills: mm_kills, bow_kills: mm_bow_kills,  coins_picked_up: mm_coins_picked_up,  last_one_alive: mm_times_last_alive, hero: mm_times_hero, suicides: mm_suicides };

            const mm_classic_wins = mm.wins_MURDER_CLASSIC || 0;
            const mm_classic_murder_wins = mm.murderer_wins_MURDER_CLASSIC || 0;
            const mm_classic_detecive_wins = mm.detective_wins_MURDER_CLASSIC || 0;
            const mm_classic_games = mm.games_MURDER_CLASSIC || 0;
            const mm_classic_deaths = mm.deaths_MURDER_CLASSIC || 0;
            const mm_classic_knife_kills = mm.knife_kills_MURDER_CLASSIC || 0;
            const mm_classic_thrown_knife_kills = mm.thrown_knife_kills_MURDER_CLASSIC || 0;
            const mm_classic_kills = mm.kills_MURDER_CLASSIC || 0;
            const mm_classic_bow_kills = mm.bow_kills_MURDER_CLASSIC || 0;
            const mm_classic_trap_kills = mm.trap_kills_MURDER_CLASSIC || 0;
            const mm_classic_times_hero = mm.was_hero_MURDER_CLASSIC || 0;
            const mm_classic_suicides = mm.suicides_MURDER_CLASSIC || 0;

            data.statistics.murder_mystery.classic = { wins: mm_classic_wins, murderer_wins: mm_classic_murder_wins, detective_wins: mm_classic_detecive_wins, games_played: mm_classic_games, deaths: mm_classic_deaths, knife_kills: mm_classic_knife_kills, thrown_knife_kills: mm_classic_thrown_knife_kills, kills: mm_classic_kills, bow_kills: mm_classic_bow_kills, trap_kills: mm_classic_trap_kills,   hero: mm_classic_times_hero, suicides: mm_classic_suicides };

            const mm_assassins_wins = mm.wins_MURDER_ASSASSINS || 0;
            const mm_assassins_murder_wins = mm.murderer_wins_MURDER_ASSASSINS || 0;
            const mm_assassins_detecive_wins = mm.detective_wins_MURDER_ASSASSINS || 0;
            const mm_assassins_games = mm.games_MURDER_ASSASSINS || 0;
            const mm_assassins_deaths = mm.deaths_MURDER_ASSASSINS || 0;
            const mm_assassins_knife_kills = mm.knife_kills_MURDER_ASSASSINS || 0;
            const mm_assassins_thrown_knife_kills = mm.thrown_knife_kills_MURDER_ASSASSINS || 0;
            const mm_assassins_kills = mm.kills_MURDER_ASSASSINS || 0;
            const mm_assassins_bow_kills = mm.bow_kills_MURDER_ASSASSINS || 0;
            const mm_assassins_trap_kills = mm.trap_kills_MURDER_ASSASSINS || 0;
            const mm_assassins_times_hero = mm.was_hero_MURDER_ASSASSINS || 0;
            const mm_assassins_suicides = mm.suicides_MURDER_ASSASSINS || 0;

            data.statistics.murder_mystery.assassins = { wins: mm_assassins_wins, murderer_wins: mm_assassins_murder_wins, detective_wins: mm_assassins_detecive_wins, games_played: mm_assassins_games, deaths: mm_assassins_deaths, knife_kills: mm_assassins_knife_kills, thrown_knife_kills: mm_assassins_thrown_knife_kills, kills: mm_assassins_kills, bow_kills: mm_assassins_bow_kills, trap_kills: mm_assassins_trap_kills,   hero: mm_assassins_times_hero, suicides: mm_assassins_suicides };

            const mm_double_up_wins = mm.wins_MURDER_DOUBLE_UP || 0;
            const mm_double_up_murder_wins = mm.murderer_wins_MURDER_DOUBLE_UP || 0;
            const mm_double_up_detecive_wins = mm.detective_wins_MURDER_DOUBLE_UP || 0;
            const mm_double_up_games = mm.games_MURDER_DOUBLE_UP || 0;
            const mm_double_up_deaths = mm.deaths_MURDER_DOUBLE_UP || 0;
            const mm_double_up_knife_kills = mm.knife_kills_MURDER_DOUBLE_UP || 0;
            const mm_double_up_thrown_knife_kills = mm.thrown_knife_kills_MURDER_DOUBLE_UP || 0;
            const mm_double_up_kills = mm.kills_MURDER_DOUBLE_UP || 0;
            const mm_double_up_bow_kills = mm.bow_kills_MURDER_DOUBLE_UP || 0;
            const mm_double_up_trap_kills = mm.trap_kills_MURDER_DOUBLE_UP || 0;
            const mm_double_up_times_hero = mm.was_hero_MURDER_DOUBLE_UP || 0;
            const mm_double_up_suicides = mm.suicides_MURDER_DOUBLE_UP || 0;

            data.statistics.murder_mystery.double_up = { wins: mm_double_up_wins, murderer_wins: mm_double_up_murder_wins, detective_wins: mm_double_up_detecive_wins, games_played: mm_double_up_games, deaths: mm_double_up_deaths, knife_kills: mm_double_up_knife_kills, thrown_knife_kills: mm_double_up_thrown_knife_kills, kills: mm_double_up_kills, bow_kills: mm_double_up_bow_kills, trap_kills: mm_double_up_trap_kills,   hero: mm_double_up_times_hero, suicides: mm_double_up_suicides };

            const mm_showdown_wins = mm.wins_MURDER_SHOWDOWN || 0;
            const mm_showdown_murder_wins = mm.murderer_wins_MURDER_SHOWDOWN || 0;
            const mm_showdown_detecive_wins = mm.detective_wins_MURDER_SHOWDOWN || 0;
            const mm_showdown_games = mm.games_MURDER_SHOWDOWN || 0;
            const mm_showdown_deaths = mm.deaths_MURDER_SHOWDOWN || 0;
            const mm_showdown_knife_kills = mm.knife_kills_MURDER_SHOWDOWN || 0;
            const mm_showdown_thrown_knife_kills = mm.thrown_knife_kills_MURDER_SHOWDOWN || 0;
            const mm_showdown_kills = mm.kills_MURDER_SHOWDOWN || 0;
            const mm_showdown_bow_kills = mm.bow_kills_MURDER_SHOWDOWN || 0;
            const mm_showdown_trap_kills = mm.trap_kills_MURDER_SHOWDOWN || 0;
            const mm_showdown_times_hero = mm.was_hero_MURDER_SHOWDOWN || 0;
            const mm_showdown_suicides = mm.suicides_MURDER_SHOWDOWN || 0;

            data.statistics.murder_mystery.showdown = { wins: mm_showdown_wins, murderer_wins: mm_showdown_murder_wins, detective_wins: mm_showdown_detecive_wins, games_played: mm_showdown_games, deaths: mm_showdown_deaths, knife_kills: mm_showdown_knife_kills, thrown_knife_kills: mm_showdown_thrown_knife_kills, kills: mm_showdown_kills, bow_kills: mm_showdown_bow_kills, trap_kills: mm_showdown_trap_kills,   hero: mm_showdown_times_hero, suicides: mm_showdown_suicides };
          }
          if (player.stats.Bedwars) {
            const bedwars = player.stats.Bedwars;

            const bedwars_level = player.achievements.bedwars_level || 0;
            const bedwars_winstreak = bedwars.winstreak || 0;
            const bedwars_experience = bedwars.Experience || 0;
            const bedwars_coins = bedwars.coins || 0;
            const bedwars_wins = bedwars.wins_bedwars || 0;
            const bedwars_games_played = bedwars.games_played_bedwars || 0;
            const bedwars_beds_lost = bedwars.beds_lost_bedwars || 0;
            const bedwars_beds_broken = bedwars.beds_broken_bedwars || 0;
            const bedwars_deaths = bedwars.deaths_bedwars || 0;
            const bedwars_void_deaths = bedwars.void_deaths_bedwars || 0;
            const bedwars_finial_deaths = bedwars.final_deaths_bedwars || 0;
            const bedwars_entity_deaths = bedwars.entity_attack_deaths_bedwars || 0;
            const bedwars_fall_deaths = bedwars.fall_deaths_bedwars || 0;
            const bedwars_projectile_deaths = bedwars.projectile_deaths_bedwars || 0;
            const bedwars_explosion_deaths = bedwars.entity_explosion_deaths_bedwars || 0;
            const bedwars_fire_deaths = bedwars.fire_deaths_bedwars || 0;
            const bedwars_kills = bedwars.kills_bedwars || 0;
            const bedwars_void_kills = bedwars.void_kills_bedwars || 0;
            const bedwars_finial_kills = bedwars.final_kills_bedwars || 0;
            const bedwars_fall_kills = bedwars.fall_kills_bedwars || 0;
            const bedwars_entity_kills = bedwars.entity_attack_kills_bedwars || 0;
            const bedwars_explostion_kills = bedwars.entity_explosion_kills_bedwars || 0;
            const bedwars_projectile_kills = bedwars.projectile_kills_bedwars || 0;
            const bedwars_fire_kills = bedwars.fire_kills_bedwars || 0;
            const bedwars_iron_collected = bedwars.iron_resources_collected_bedwars || 0;
            const bedwars_gold_collected = bedwars.gold_resources_collected_bedwars || 0;
            const bedwars_emeralds_collected = bedwars.emerald_resources_collected_bedwars || 0;
            const bedwars_diamond_collected = bedwars.diamond_resources_collected_bedwars || 0;
            const bedwars_resources_collected = bedwars.resources_collected_bedwars || 0;
            const bedwars_items_purchased = bedwars.items_purchased_bedwars || 0;

            data.statistics.bedwars = { level: bedwars_level, winstreak: bedwars_winstreak, experience: bedwars_experience, coins: bedwars_coins, wins: bedwars_wins, games_played: bedwars_games_played, beds_lost: bedwars_beds_lost, beds_broken: bedwars_beds_broken, deaths: bedwars_deaths, void_deaths: bedwars_void_deaths, finial_deaths: bedwars_finial_deaths, entity_deaths: bedwars_entity_deaths, fall_deaths: bedwars_fall_deaths, projectile_deaths: bedwars_projectile_deaths, explostion_deaths: bedwars_explosion_deaths, fire_deaths: bedwars_fire_deaths, kills: bedwars_kills, void_kills: bedwars_void_kills,   finial_kills: bedwars_finial_kills, fall_kills: bedwars_fall_kills, entity_kills: bedwars_entity_kills, explosion_kills: bedwars_explostion_kills, projectile_kills: bedwars_projectile_kills, fire_kills: bedwars_fire_kills, iron_resources_collected: bedwars_iron_collected, gold_recources_collected: bedwars_gold_collected, diamond_resources_collected: bedwars_diamond_collected, emerald_resources_collected: bedwars_emeralds_collected, items_purchased: bedwars_items_purchased, resources_collected: bedwars_resources_collected };

            const bedwars_solo_bed_broken = bedwars.eight_one_beds_broken_bedwars || 0;
            const bedwars_solo_recources_collected = bedwars.eight_one_resources_collected_bedwars || 0;
            const bedwars_solo_items_purchased = bedwars.eight_one_items_purchased_bedwars || 0;
            const bedwars_solo_wins = bedwars.eight_one_wins_bedwars || 0;
            const bedwars_solo_games_played = bedwars.eight_one_games_played_bedwars || 0;
            const bedwars_solo_deaths = bedwars.eight_one_deaths_bedwars || 0;
            const bedwars_solo_kills = bedwars.eight_one_kills_bedwars || 0;
            const bedwars_solo_fall_kills = bedwars.eight_one_fall_kills_bedwars || 0;
            const bedwars_solo_void_kills = bedwars.eight_one_void_kills_bedwars || 0;
            const bedwars_solo_finial_kills = bedwars.eight_one_final_kills_bedwars || 0;
            const bedwars_solo_explosion_kills = bedwars.eight_one_entity_explosion_kills_bedwars || 0;
            const bedwars_solo_beds_lost = bedwars.eight_one_beds_lost_bedwars || 0;
            const bedwars_solo_losses = bedwars.eight_one_losses_bedwars || 0;
            const bedwars_solo_winstreak = bedwars.eight_one_winstreak || 0;

            data.statistics.bedwars.solo = { beds_broken: bedwars_solo_bed_broken, resources_collected: bedwars_solo_recources_collected, items_purchased: bedwars_solo_items_purchased, wins: bedwars_solo_wins, games_played: bedwars_solo_games_played, deaths: bedwars_solo_deaths, kills: bedwars_solo_kills, fall_kills: bedwars_solo_fall_kills, void_kills: bedwars_solo_void_kills, finial_kills: bedwars_solo_finial_kills, explosion_kills: bedwars_solo_explosion_kills, beds_lost: bedwars_solo_beds_lost, losses: bedwars_solo_losses, winstreak: bedwars_solo_winstreak };

            const bedwars_doubles_bed_broken = bedwars.eight_two_beds_broken_bedwars || 0;
            const bedwars_doubles_recources_collected = bedwars.eight_two_resources_collected_bedwars || 0;
            const bedwars_doubles_items_purchased = bedwars.eight_two_items_purchased_bedwars || 0;
            const bedwars_doubles_wins = bedwars.eight_two_wins_bedwars || 0;
            const bedwars_doubles_games_played = bedwars.eight_two_games_played_bedwars || 0;
            const bedwars_doubles_deaths = bedwars.eight_two_deaths_bedwars || 0;
            const bedwars_doubles_kills = bedwars.eight_two_kills_bedwars || 0;
            const bedwars_doubles_fall_kills = bedwars.eight_two_fall_kills_bedwars || 0;
            const bedwars_doubles_void_kills = bedwars.eight_two_void_kills_bedwars || 0;
            const bedwars_doubles_finial_kills = bedwars.eight_two_final_kills_bedwars || 0;
            const bedwars_doubles_explosion_kills = bedwars.eight_two_entity_explosion_kills_bedwars || 0;
            const bedwars_doubles_beds_lost = bedwars.eight_two_beds_lost_bedwars || 0;
            const bedwars_doubles_losses = bedwars.eight_two_losses_bedwars || 0;
            const bedwars_doubles_winstreak = bedwars.eight_two_winstreak || 0;

            data.statistics.bedwars.doubles = { beds_broken: bedwars_doubles_bed_broken, resources_collected: bedwars_doubles_recources_collected, items_purchased: bedwars_doubles_items_purchased, wins: bedwars_doubles_wins, games_played: bedwars_doubles_games_played, deaths: bedwars_doubles_deaths, kills: bedwars_doubles_kills, fall_kills: bedwars_doubles_fall_kills, void_kills: bedwars_doubles_void_kills, finial_kills: bedwars_doubles_finial_kills, explosion_kills: bedwars_doubles_explosion_kills, beds_lost: bedwars_doubles_beds_lost, losses: bedwars_doubles_losses, winstreak: bedwars_doubles_winstreak };

            const bedwars_triples_bed_broken = bedwars.four_three_beds_broken_bedwars || 0;
            const bedwars_triples_recources_collected = bedwars.four_three_resources_collected_bedwars || 0;
            const bedwars_triples_items_purchased = bedwars.four_three_items_purchased_bedwars || 0;
            const bedwars_triples_wins = bedwars.four_three_wins_bedwars || 0;
            const bedwars_triples_games_played = bedwars.four_three_games_played_bedwars || 0;
            const bedwars_triples_deaths = bedwars.four_three_deaths_bedwars || 0;
            const bedwars_triples_kills = bedwars.four_three_kills_bedwars || 0;
            const bedwars_triples_fall_kills = bedwars.four_three_fall_kills_bedwars || 0;
            const bedwars_triples_void_kills = bedwars.four_three_void_kills_bedwars || 0;
            const bedwars_triples_finial_kills = bedwars.four_three_final_kills_bedwars || 0;
            const bedwars_triples_explosion_kills = bedwars.four_three_entity_explosion_kills_bedwars || 0;
            const bedwars_triples_beds_lost = bedwars.four_three_beds_lost_bedwars || 0;
            const bedwars_triples_losses = bedwars.four_three_losses_bedwars || 0;
            const bedwars_triples_winstreak = bedwars.four_three_winstreak || 0;

            data.statistics.bedwars.triples = { beds_broken: bedwars_triples_bed_broken, resources_collected: bedwars_triples_recources_collected, items_purchased: bedwars_triples_items_purchased, wins: bedwars_triples_wins, games_played: bedwars_triples_games_played, deaths: bedwars_triples_deaths, kills: bedwars_triples_kills, fall_kills: bedwars_triples_fall_kills, void_kills: bedwars_triples_void_kills, finial_kills: bedwars_triples_finial_kills, explosion_kills: bedwars_triples_explosion_kills, beds_lost: bedwars_triples_beds_lost, losses: bedwars_triples_losses, winstreak: bedwars_triples_winstreak };

            const bedwars_quads_bed_broken = bedwars.four_four_beds_broken_bedwars || 0;
            const bedwars_quads_recources_collected = bedwars.four_four_resources_collected_bedwars || 0;
            const bedwars_quads_items_purchased = bedwars.four_four_items_purchased_bedwars || 0;
            const bedwars_quads_wins = bedwars.four_four_wins_bedwars || 0;
            const bedwars_quads_games_played = bedwars.four_four_games_played_bedwars || 0;
            const bedwars_quads_deaths = bedwars.four_four_deaths_bedwars || 0;
            const bedwars_quads_kills = bedwars.four_four_kills_bedwars || 0;
            const bedwars_quads_fall_kills = bedwars.four_four_fall_kills_bedwars || 0;
            const bedwars_quads_void_kills = bedwars.four_four_void_kills_bedwars || 0;
            const bedwars_quads_finial_kills = bedwars.four_four_final_kills_bedwars || 0;
            const bedwars_quads_explosion_kills = bedwars.four_four_entity_explosion_kills_bedwars || 0;
            const bedwars_quads_beds_lost = bedwars.four_four_beds_lost_bedwars || 0;
            const bedwars_quads_losses = bedwars.four_four_losses_bedwars || 0;
            const bedwars_quads_winstreak = bedwars.four_four_winstreak || 0;

            data.statistics.bedwars.quads = { beds_broken: bedwars_quads_bed_broken, resources_collected: bedwars_quads_recources_collected, items_purchased: bedwars_quads_items_purchased, wins: bedwars_quads_wins, games_played: bedwars_quads_games_played, deaths: bedwars_quads_deaths, kills: bedwars_quads_kills, fall_kills: bedwars_quads_fall_kills, void_kills: bedwars_quads_void_kills, finial_kills: bedwars_quads_finial_kills, explosion_kills: bedwars_quads_explosion_kills, beds_lost: bedwars_quads_beds_lost, losses: bedwars_quads_losses, winstreak: bedwars_quads_winstreak };
          }
          if (player.stats.Duels) {
            const duels = player.stats.Duels;

            const duels_coins = duels.coins || 0;
            const duels_games_played = duels.games_played_duels || 0;
            const duels_recently_played = duels.duels_recently_played || 0;
            const duels_wins = duels.wins || 0;
            const duels_kills = duels.kills || 0;
            const duels_losses = duels.losses || 0;
            const duels_deaths = duels.deaths || 0;
            const duels_melee_swings = duels.melee_swings || 0;
            const duels_melee_hits = duels.melee_hits || 0;
            const duels_health_regenerated = duels.health_regenerated || 0;
            const duels_damage_dealt = duels.damage_dealt || 0;
            const duels_bow_shot = duels.bow_shots || 0;
            const duels_bow_hit = duels.bow_hits || 0;
            const duels_blocks_placed = duels.blocks_placed || 0;
            const duels_ping_prefrence = duels.pingPreference || 0;

            data.statistics.duels = { coins: duels_coins, games_played: duels_games_played, recent_games: duels_recently_played, wins: duels_wins, kills: duels_kills, losses: duels_losses, deaths: duels_deaths, melee_swings: duels_melee_swings,  melee_hits: duels_melee_hits, health_regenerated: duels_health_regenerated, damage_dealt: duels_damage_dealt, bow_shot: duels_bow_shot, bow_hit: duels_bow_hit, blocks_placed: duels_blocks_placed, ping_prefrence: duels_ping_prefrence };

            const duels_uhc_winstreak = duels.current_winstreak_mode_uhc_duel || 0;
            const duels_uhc_best_winstreak = duels.best_winstreak_mode_uhc_duel || 0;
            const duels_uhc_rounds = duels.uhc_duel_rounds_played || 0;
            const duels_uhc_melee_hits = duels.uhc_duel_rounds_played || 0;
            const duels_uhc_melee_swings = duels.uhc_duel_melee_swings || 0;
            const duels_uhc_kills = duels.uhc_duel_kills || 0;
            const duels_uhc_health_rengerated = duels.uhc_duel_health_regenerated || 0;
            const duels_uhc_damage_dealt = duels.uhc_duel_damage_dealt || 0;
            const duels_uhc_wins = duels.uhc_duel_wins || 0;
            const duels_uhc_bow_hit = duels.uhc_duel_bow_hits || 0;
            const duels_uhc_bow_shot = duels.uhc_duel_bow_shots || 0;
            const duels_uhc_losses = duels.uhc_duel_losses || 0;
            const duels_uhc_deaths = duels.uhc_duel_deaths || 0;

            data.statistics.duels.uhc = { winstreak: duels_uhc_winstreak, best_winstreak: duels_uhc_best_winstreak, rounds: duels_uhc_rounds, melee_hits: duels_uhc_melee_hits, melee_swings: duels_uhc_melee_swings, kills: duels_uhc_kills, health_regenerated: duels_uhc_health_rengerated, damage_dealt: duels_uhc_damage_dealt, wins: duels_uhc_wins, bow_hits: duels_uhc_bow_hit, bow_shot: duels_uhc_bow_shot, losses: duels_uhc_losses, deaths: duels_uhc_deaths };

            const duels_sw_winstreak = duels.current_winstreak_mode_sw_duel || 0;
            const duels_sw_best_winstreak = duels.best_winstreak_mode_sw_duel || 0;
            const duels_sw_rounds = duels.sw_duel_rounds_played || 0;
            const duels_sw_melee_hits = duels.sw_duel_rounds_played || 0;
            const duels_sw_melee_swings = duels.sw_duel_melee_swings || 0;
            const duels_sw_kills = duels.sw_duel_kills || 0;
            const duels_sw_health_rengerated = duels.sw_duel_health_regenerated || 0;
            const duels_sw_damage_dealt = duels.sw_duel_damage_dealt || 0;
            const duels_sw_wins = duels.sw_duel_wins || 0;
            const duels_sw_bow_hit = duels.sw_duel_bow_hits || 0;
            const duels_sw_bow_shot = duels.sw_duel_bow_shots || 0;
            const duels_sw_losses = duels.sw_duel_losses || 0;
            const duels_sw_deaths = duels.sw_duel_deaths || 0;

            data.statistics.duels.skywars = { winstreak: duels_sw_winstreak, best_winstreak: duels_sw_best_winstreak, rounds: duels_sw_rounds, melee_hits: duels_sw_melee_hits, melee_swings: duels_sw_melee_swings, kills: duels_sw_kills, health_regenerated: duels_sw_health_rengerated, damage_dealt: duels_sw_damage_dealt, wins: duels_sw_wins, bow_hits: duels_sw_bow_hit, bow_shot: duels_sw_bow_shot, losses: duels_sw_losses, deaths: duels_sw_deaths };

            const duels_sumo_winstreak = duels.current_winstreak_mode_sumo_duel || 0;
            const duels_sumo_best_winstreak = duels.best_winstreak_mode_sumo_duel || 0;
            const duels_sumo_rounds = duels.sumo_duel_rounds_played || 0;
            const duels_sumo_melee_hits = duels.sumo_duel_rounds_played || 0;
            const duels_sumo_melee_swings = duels.sumo_duel_melee_swings || 0;
            const duels_sumo_kills = duels.sumo_duel_kills || 0;
            const duels_sumo_health_rengerated = duels.sumo_duel_health_regenerated || 0;
            const duels_sumo_damage_dealt = duels.sumo_duel_damage_dealt || 0;
            const duels_sumo_wins = duels.sumo_duel_wins || 0;
            const duels_sumo_bow_hit = duels.sumo_duel_bow_hits || 0;
            const duels_sumo_bow_shot = duels.sumo_duel_bow_shots || 0;
            const duels_sumo_losses = duels.sumo_duel_losses || 0;
            const duels_sumo_deaths = duels.sumo_duel_deaths || 0;

            data.statistics.duels.sumo = { winstreak: duels_sumo_winstreak, best_winstreak: duels_sumo_best_winstreak, rounds: duels_sumo_rounds, melee_hits: duels_sumo_melee_hits, melee_swings: duels_sumo_melee_swings, kills: duels_sumo_kills, health_regenerated: duels_sumo_health_rengerated, damage_dealt: duels_sumo_damage_dealt, wins: duels_sumo_wins, bow_hits: duels_sumo_bow_hit, bow_shot: duels_sumo_bow_shot, losses: duels_sumo_losses, deaths: duels_sumo_deaths };

            const duels_mw_winstreak = duels.current_winstreak_mode_mw_duel || 0;
            const duels_mw_best_winstreak = duels.best_winstreak_mode_mw_duel || 0;
            const duels_mw_rounds = duels.mw_duel_rounds_played || 0;
            const duels_mw_melee_hits = duels.mw_duel_rounds_played || 0;
            const duels_mw_melee_swings = duels.mw_duel_melee_swings || 0;
            const duels_mw_kills = duels.mw_duel_kills || 0;
            const duels_mw_health_rengerated = duels.mw_duel_health_regenerated || 0;
            const duels_mw_damage_dealt = duels.mw_duel_damage_dealt || 0;
            const duels_mw_wins = duels.mw_duel_wins || 0;
            const duels_mw_bow_hit = duels.mw_duel_bow_hits || 0;
            const duels_mw_bow_shot = duels.mw_duel_bow_shots || 0;
            const duels_mw_losses = duels.mw_duel_losses || 0;
            const duels_mw_deaths = duels.mw_duel_deaths || 0;

            data.statistics.duels.megawalls = { winstreak: duels_mw_winstreak, best_winstreak: duels_mw_best_winstreak, rounds: duels_mw_rounds, melee_hits: duels_mw_melee_hits, melee_swings: duels_mw_melee_swings, kills: duels_mw_kills, health_regenerated: duels_mw_health_rengerated, damage_dealt: duels_mw_damage_dealt, wins: duels_mw_wins, bow_hits: duels_mw_bow_hit, bow_shot: duels_mw_bow_shot, losses: duels_mw_losses, deaths: duels_mw_deaths };

            const duels_blitz_winstreak = duels.current_winstreak_mode_blitz_duel || 0;
            const duels_blitz_best_winstreak = duels.best_winstreak_mode_blitz_duel || 0;
            const duels_blitz_rounds = duels.blitz_duel_rounds_played || 0;
            const duels_blitz_melee_hits = duels.blitz_duel_rounds_played || 0;
            const duels_blitz_melee_swings = duels.blitz_duel_melee_swings || 0;
            const duels_blitz_kills = duels.blitz_duel_kills || 0;
            const duels_blitz_health_rengerated = duels.blitz_duel_health_regenerated || 0;
            const duels_blitz_damage_dealt = duels.blitz_duel_damage_dealt || 0;
            const duels_blitz_wins = duels.blitz_duel_wins || 0;
            const duels_blitz_bow_hit = duels.blitz_duel_bow_hits || 0;
            const duels_blitz_bow_shot = duels.blitz_duel_bow_shots || 0;
            const duels_blitz_losses = duels.blitz_duel_losses || 0;
            const duels_blitz_deaths = duels.blitz_duel_deaths || 0;

            data.statistics.duels.blitz = { winstreak: duels_blitz_winstreak, best_winstreak: duels_blitz_best_winstreak, rounds: duels_blitz_rounds, melee_hits: duels_blitz_melee_hits, melee_swings: duels_blitz_melee_swings, kills: duels_blitz_kills, health_regenerated: duels_blitz_health_rengerated, damage_dealt: duels_blitz_damage_dealt, wins: duels_blitz_wins, bow_hits: duels_blitz_bow_hit, bow_shot: duels_blitz_bow_shot, losses: duels_blitz_losses, deaths: duels_blitz_deaths };

            const duels_bow_winstreak = duels.current_winstreak_mode_bow_duel || 0;
            const duels_bow_best_winstreak = duels.best_winstreak_mode_bow_duel || 0;
            const duels_bow_rounds = duels.bow_duel_rounds_played || 0;
            const duels_bow_melee_hits = duels.bow_duel_rounds_played || 0;
            const duels_bow_melee_swings = duels.bow_duel_melee_swings || 0;
            const duels_bow_kills = duels.bow_duel_kills || 0;
            const duels_bow_health_rengerated = duels.bow_duel_health_regenerated || 0;
            const duels_bow_damage_dealt = duels.bow_duel_damage_dealt || 0;
            const duels_bow_wins = duels.bow_duel_wins || 0;
            const duels_bow_bow_hit = duels.bow_duel_bow_hits || 0;
            const duels_bow_bow_shot = duels.bow_duel_bow_shots || 0;
            const duels_bow_losses = duels.bow_duel_losses || 0;
            const duels_bow_deaths = duels.bow_duel_deaths || 0;

            data.statistics.duels.bow = { winstreak: duels_bow_winstreak, best_winstreak: duels_bow_best_winstreak, rounds: duels_bow_rounds, melee_hits: duels_bow_melee_hits, melee_swings: duels_bow_melee_swings, kills: duels_bow_kills, health_regenerated: duels_bow_health_rengerated, damage_dealt: duels_bow_damage_dealt, wins: duels_bow_wins, bow_hits: duels_bow_bow_hit, bow_shot: duels_bow_bow_shot, losses: duels_bow_losses, deaths: duels_bow_deaths };

            const duels_op_winstreak = duels.current_winstreak_mode_op_duel || 0;
            const duels_op_best_winstreak = duels.best_winstreak_mode_op_duel || 0;
            const duels_op_rounds = duels.op_duel_rounds_played || 0;
            const duels_op_melee_hits = duels.op_duel_rounds_played || 0;
            const duels_op_melee_swings = duels.op_duel_melee_swings || 0;
            const duels_op_kills = duels.op_duel_kills || 0;
            const duels_op_health_rengerated = duels.op_duel_health_regenerated || 0;
            const duels_op_damage_dealt = duels.op_duel_damage_dealt || 0;
            const duels_op_wins = duels.op_duel_wins || 0;
            const duels_op_bow_hit = duels.op_duel_bow_hits || 0;
            const duels_op_bow_shot = duels.op_duel_bow_shots || 0;
            const duels_op_losses = duels.op_duel_losses || 0;
            const duels_op_deaths = duels.op_duel_deaths || 0;

            data.statistics.duels.op = { winstreak: duels_op_winstreak, best_winstreak: duels_op_best_winstreak, rounds: duels_op_rounds, melee_hits: duels_op_melee_hits, melee_swings: duels_op_melee_swings, kills: duels_op_kills, health_regenerated: duels_op_health_rengerated, damage_dealt: duels_op_damage_dealt, wins: duels_op_wins, bow_hits: duels_op_bow_hit, bow_shot: duels_op_bow_shot, losses: duels_op_losses, deaths: duels_op_deaths };

            const duels_classic_winstreak = duels.current_winstreak_mode_classic_duel || 0;
            const duels_classic_best_winstreak = duels.best_winstreak_mode_classic_duel || 0;
            const duels_classic_rounds = duels.classic_duel_rounds_played || 0;
            const duels_classic_melee_hits = duels.classic_duel_rounds_played || 0;
            const duels_classic_melee_swings = duels.classic_duel_melee_swings || 0;
            const duels_classic_kills = duels.classic_duel_kills || 0;
            const duels_classic_health_rengerated = duels.classic_duel_health_regenerated || 0;
            const duels_classic_damage_dealt = duels.classic_duel_damage_dealt || 0;
            const duels_classic_wins = duels.classic_duel_wins || 0;
            const duels_classic_bow_hit = duels.classic_duel_bow_hits || 0;
            const duels_classic_bow_shot = duels.classic_duel_bow_shots || 0;
            const duels_classic_losses = duels.classic_duel_losses || 0;
            const duels_classic_deaths = duels.classic_duel_deaths || 0;

            data.statistics.duels.classic = { winstreak: duels_classic_winstreak, best_winstreak: duels_classic_best_winstreak, rounds: duels_classic_rounds, melee_hits: duels_classic_melee_hits, melee_swings: duels_classic_melee_swings, kills: duels_classic_kills, health_regenerated: duels_classic_health_rengerated, damage_dealt: duels_classic_damage_dealt, wins: duels_classic_wins, bow_hits: duels_classic_bow_hit, bow_shot: duels_classic_bow_shot, losses: duels_classic_losses, deaths: duels_classic_deaths };
  
            const duels_no_debuff_winstreak = duels.current_winstreak_mode_potion_duel || 0;
            const duels_no_debuff_best_winstreak = duels.best_winstreak_mode_potion_duel || 0;
            const duels_no_debuff_rounds = duels.potion_duel_rounds_played || 0;
            const duels_no_debuff_melee_hits = duels.potion_duel_rounds_played || 0;
            const duels_no_debuff_melee_swings = duels.potion_duel_melee_swings || 0;
            const duels_no_debuff_kills = duels.potion_duel_kills || 0;
            const duels_no_debuff_health_rengerated = duels.potion_duel_health_regenerated || 0;
            const duels_no_debuff_damage_dealt = duels.potion_duel_damage_dealt || 0;
            const duels_no_debuff_wins = duels.potion_duel_wins || 0;
            const duels_no_debuff_bow_hit = duels.potion_duel_bow_hits || 0;
            const duels_no_debuff_bow_shot = duels.potion_duel_bow_shots || 0;
            const duels_no_debuff_losses = duels.potion_duel_losses || 0;
            const duels_no_debuff_deaths = duels.potion_duel_deaths || 0;
            const dules_no_debuff_potions_used = duels.potion_duel_heal_pots_used || 0;

            data.statistics.duels.no_debuff = { winstreak: duels_no_debuff_winstreak, best_winstreak: duels_no_debuff_best_winstreak, rounds: duels_no_debuff_rounds, melee_hits: duels_no_debuff_melee_hits, melee_swings: duels_no_debuff_melee_swings, kills: duels_no_debuff_kills, health_regenerated: duels_no_debuff_health_rengerated, damage_dealt: duels_no_debuff_damage_dealt, wins: duels_no_debuff_wins, bow_hits: duels_no_debuff_bow_hit, bow_shot: duels_no_debuff_bow_shot, losses: duels_no_debuff_losses, deaths: duels_no_debuff_deaths, potions_used: dules_no_debuff_potions_used };

            const duels_combo_winstreak = duels.current_winstreak_mode_combo_duel || 0;
            const duels_combo_best_winstreak = duels.best_winstreak_mode_combo_duel || 0;
            const duels_combo_rounds = duels.combo_duel_rounds_played || 0;
            const duels_combo_melee_hits = duels.combo_duel_rounds_played || 0;
            const duels_combo_melee_swings = duels.combo_duel_melee_swings || 0;
            const duels_combo_kills = duels.combo_duel_kills || 0;
            const duels_combo_health_rengerated = duels.combo_duel_health_regenerated || 0;
            const duels_combo_damage_dealt = duels.combo_duel_damage_dealt || 0;
            const duels_combo_wins = duels.combo_duel_wins || 0;
            const duels_combo_bow_hit = duels.combo_duel_bow_hits || 0;
            const duels_combo_bow_shot = duels.combo_duel_bow_shots || 0;
            const duels_combo_losses = duels.combo_duel_losses || 0;
            const duels_combo_deaths = duels.combo_duel_deaths || 0;

            data.statistics.duels.combo = { winstreak: duels_combo_winstreak, best_winstreak: duels_combo_best_winstreak, rounds: duels_combo_rounds, melee_hits: duels_combo_melee_hits, melee_swings: duels_combo_melee_swings, kills: duels_combo_kills, health_regenerated: duels_combo_health_rengerated, damage_dealt: duels_combo_damage_dealt, wins: duels_combo_wins, bow_hits: duels_combo_bow_hit, bow_shot: duels_combo_bow_shot, losses: duels_combo_losses, deaths: duels_combo_deaths };

            const duels_bridge_winstreak = duels.current_winstreak_mode_bridge_duel || 0;
            const duels_bridge_best_winstreak = duels.best_bridge_winstreak || 0;
            const duels_bridge_rounds = duels.bridge_duel_rounds_played || 0;
            const duels_bridge_melee_hits = duels.bridge_duel_rounds_played || 0;
            const duels_bridge_melee_swings = duels.bridge_duel_melee_swings || 0;
            const duels_bridge_kills = duels.bridge_duel_kills || 0;
            const duels_bridge_health_rengerated = duels.bridge_duel_health_regenerated || 0;
            const duels_bridge_damage_dealt = duels.bridge_duel_damage_dealt || 0;
            const duels_bridge_wins = duels.bridge_duel_wins || 0;
            const duels_bridge_bow_hit = duels.bridge_duel_bow_hits || 0;
            const duels_bridge_bow_shot = duels.bridge_duel_bow_shots || 0;
            const duels_bridge_losses = duels.bridge_duel_losses || 0;
            const duels_bridge_deaths = duels.bridge_duel_deaths || 0;
            const duels_bridge_goals = duels.goals || 0;

            data.statistics.duels.bridges = { winstreak: duels_bridge_winstreak, best_winstreak: duels_bridge_best_winstreak, rounds: duels_bridge_rounds, melee_hits: duels_bridge_melee_hits, melee_swings: duels_bridge_melee_swings, kills: duels_bridge_kills, health_regenerated: duels_bridge_health_rengerated, damage_dealt: duels_bridge_damage_dealt, wins: duels_bridge_wins, bow_hits: duels_bridge_bow_hit, bow_shot: duels_bridge_bow_shot, losses: duels_bridge_losses, deaths: duels_bridge_deaths, goals: duels_bridge_goals };
          }
          if (player.stats.Pit) {
            const pit = player.stats.Pit;

            const pit_cash = pit.profile.cash || 0;
            const pit_selected_perks = [pit.profile.selected_perk_0 || null, pit.profile.selected_perk_1 || null, pit.profile.selected_perk_2 || null, pit.profile.selected_perk_3 || null];
            const pit_renown = pit.profile.renown || 0;
            const pit_current_prestige = pit.profile.prestiges ? pit.profile.prestiges.length : 0;
            const pit_renown_unlocks = pit.profile.renown_unlocks ? pit.profile.renown_unlock.length : 0;
            const pit_bounties = pit.profile.bounties || 0;
            const pit_last_save = pit.profile.last_save || 0;
            const pit_hat_colour = pit.profile.hat_color || 0;
            const pit_last_contract = pit.profile.last_contract || 0;
            const pit_recent_kill = pit.profile.recent_kills[0];
            const pit_experience = pit.profile.xp || 0;

            data.statistics.pit = { cash: pit_cash, perks: pit_selected_perks, renown: pit_renown, prestige: pit_current_prestige, renown_unlocks: pit_renown_unlocks, bounties: pit_bounties, last_save: pit_last_save, hat_colour: pit_hat_colour, last_contract: pit_last_contract, recent_kill: pit_recent_kill, experience: pit_experience };

            const pit_gapple_eaten = pit.pit_stats_ptl.gapple_eaten || 0;
            const pit_enderchest_opened = pit.pit_stats_ptl.enderchest_opened || 0;
            const pit_fishing_rod_launched = pit.pit_stats_ptl.fishing_rod_launched || 0;
            const pit_blocks_placed = pit.pit_stats_ptl.blocks_placed || 0;
            const pit_melee_damage_dealt = pit.pit_stats_ptl.melee_damage_dealt || 0;
            const pit_cash_earned = pit.pit_stats_ptl.cash_earned || 0;
            const pit_launched_by_launchers = pit.pit_stats_ptl.launched_by_launchers || 0;
            const pit_arrows_fired = pit.pit_stats_ptl.arrows_fired || 0;
            const pit_playtime = pit.pit_stats_ptl.playtime_minutes || 0;
            const pit_chat_messages = pit.pit_stats_ptl.chat_messages || 0;
            const pit_bow_damage_received = pit.pit_stats_ptl.bow_damage_received || 0;
            const pit_kills = pit.pit_stats_ptl.kills || 0;
            const pit_diamond_items_purchased = pit.pit_stats_ptl.diamond_items_purchased || 0;
            const pit_deaths = pit.pit_stats_ptl.deaths || 0;
            const pit_soups_drank = pit.pit_stats_ptl.soups_drank || 0;
            const pit_blocks_broken = pit.pit_stats_ptl.blocks_broken || 0;
            const pit_ghead_eaten = pit.pit_stats_ptl.ghead_eaten || 0;
            const pit_sword_hits = pit.pit_stats_ptl.sword_hits || 0;
            const pit_contracts_completed = pit.pit_stats_ptl.contracts_completed || 0;
            const pit_joins = pit.pit_stats_ptl.joins || 0;
            const pit_bow_damage_dealt = pit.pit_stats_ptl.bow_damage_dealt || 0;
            const pit_contracts_started = pit.pit_stats_ptl.contracts_started || 0;
            const pit_damage_received = pit.pit_stats_ptl.damage_received || 0;
            const pit_jumped_into_pit = pit.pit_stats_ptl.jumped_into_pit || 0;
            const pit_melee_damage_received = pit.pit_stats_ptl.melee_damage_received || 0;
            const pit_left_clicks = pit.pit_stats_ptl.left_clicks || 0;
            const pit_arrow_hits = pit.pit_stats_ptl.arrow_hits || 0;
            const pit_damage_dealt = pit.pit_stats_ptl.damage_dealt || 0;
            const pit_assists = pit.pit_stats_ptl.assists || 0;
            const pit_lava_bucket_emptied = pit.pit_stats_ptl.lava_bucket_emptied || 0;
            const pit_max_streak = pit.pit_stats_ptl.max_streak || 0;
            const pit_night_quests_completed = pit.pit_stats_ptl.night_quests_completed || 0;
            const pit_wheat_farmed = pit.pit_stats_ptl.wheat_farmed || 0;
            const pit_sewer_treasures_found = pit.pit_stats_ptl.sewer_treasures_found || 0;
            const pit_king_quest_completion = pit.pit_stats_ptl.king_quest_completion || 0;
            const pit_fished_anything = pit.pit_stats_ptl.fished_anything || 0;
            const pit_fishes_fished = pit.pit_stats_ptl.fishes_fished || 0;

            data.statistics.pit.stats = { gapple_eaten: pit_gapple_eaten, enderchest_opened: pit_enderchest_opened, fishing_rod_launched: pit_fishing_rod_launched, blocks_placed: pit_blocks_placed, melee_damage_dealt: pit_melee_damage_dealt, cash_earned: pit_cash_earned, launched_by_launchers: pit_launched_by_launchers, arrows_fired: pit_arrows_fired, playtime: pit_playtime, chat_messages: pit_chat_messages, bow_damage_received: pit_bow_damage_received, kills: pit_kills, diamond_items_purchased: pit_diamond_items_purchased, deaths: pit_deaths, soups_drank: pit_soups_drank, blocks_broken: pit_blocks_broken, ghead_eaten: pit_ghead_eaten, sword_hits: pit_sword_hits, contracts_completed: pit_contracts_completed, joins: pit_joins, bow_damage_dealt: pit_bow_damage_dealt, contracts_started: pit_contracts_started, damage_received: pit_damage_received, jumped_into_pit: pit_jumped_into_pit, melee_damage_received: pit_melee_damage_received, left_clicks: pit_left_clicks, arrow_hits: pit_arrow_hits, damage_dealt: pit_damage_dealt, assists: pit_assists, lava_bucket_emptied: pit_lava_bucket_emptied, max_streak: pit_max_streak, night_quests_completed: pit_night_quests_completed, wheat_farmed: pit_wheat_farmed, sewer_treasures_found: pit_sewer_treasures_found, king_quest_completion: pit_king_quest_completion, fished_anything: pit_fished_anything, fishes_fished: pit_fishes_fished };
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
