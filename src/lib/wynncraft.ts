import moment, { duration as _duration } from 'moment';
import fetch from 'node-fetch'; // Main http module
export function wynncraft(type: string, name: string) {
  return new Promise((resolve, _reject) => {
    if (!name)
      return resolve({
        errors: 'No username or guild name provided',
      });
    if (!type)
      return resolve({
        errors: 'No type provided',
      });
    if (type === 'player') {
      fetch(`https://api.wynncraft.com/v2/player/${name}/stats`)
        .then((res) => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (
            body.code === 404 ||
            (body.code === 400 && body.message === 'Bad Request') ||
            body.data.length === 0
          ) {
            return resolve({
              errors: `No player data found for user: ${name}`,
            });
          }
          type Data1 = {
            readonly [key: string]: any;
          };
          type Data = {
            readonly classes: Data1;
            readonly ranking: {};
          };
          const data: Data = {
            classes: {},
            ranking: {},
          };
          const player = body.data[0];
          const role = player.rank || 'Unknown';
          const first_login = player.meta.firstJoin || 'Unknown';
          const last_login = player.meta.lastJoin || 'Unknown';
          const online = player.meta.location.online || false;
          const location = player.meta.location.server || 'Unknown';
          const play_time =
            _duration(player.meta.playtime, 'minutes').format(
              'D [days], H [hours], M [minutes]'
            ) || 'Unknown';
          const rank = player.meta.tag.value || 'None';
          const veteran = player.meta.veteran || false;
          const guild_name = player.guild.name || 'Unknown';
          const guild_rank = player.guild.rank || 'Unknown';
          const chests_found = player.global.chestsFound || 0;
          const items_identified = player.global.itemsIdentified || 0;
          const mobs_killed = player.global.mobsKilled || 0;
          const combat_level = player.global.totalLevel.combat || 0;
          const profession_level = player.global.totalLevel.profession || 0;
          const combined_level = player.global.totalLevel.combined || 0;
          const players_killed = player.global.pvp.kills || 0;
          const player_deaths = player.global.pvp.deaths || 0;
          const blocks_walked = player.global.blocksWalked || 0;
          const logins = player.global.logins || 0;
          const deaths = player.global.deaths || 0;
          const discoveries = player.global.discoveries || 0;
          const events_won = player.global.eventsWon || 0;

          if (player.classes) {
            player.classes.forEach(
              async (i: {
                readonly name: string;
                readonly level: number;
                readonly chestsFound: number;
                readonly itemsIdentified: number;
                readonly mobsKilled: number;
                readonly pvp: {
                  readonly kills: number;
                  readonly deaths: number;
                };
                readonly blocksWalked: number;
                readonly logins: number;
                readonly deaths: number;
                readonly playtime: moment.DurationInputArg1;
                readonly discoveries: number;
                readonly eventsWon: number;
                readonly gamemode: string;
                readonly skills: {
                  readonly strength: number;
                  readonly dexterity: number;
                  readonly intelligence: number;
                  readonly defence: number;
                  readonly agility: number;
                };
                readonly professions: {
                  readonly alchemism: number;
                  readonly armouring: number;
                  readonly combat: number;
                  readonly cooking: number;
                  readonly farming: number;
                  readonly fishing: number;
                  readonly jeweling: number;
                  readonly mining: number;
                  readonly scribing: number;
                  readonly tailoring: number;
                  readonly weaponsmithing: number;
                  readonly woodcutting: number;
                  readonly woodworking: number;
                };
                readonly dungeons: {
                  readonly completed: number;
                  readonly list: readonly any[];
                };
                readonly quests: {
                  readonly completed: number;
                  readonly list: string;
                };
              }) => {
                const name = i.name.replace(/[0-9]+/g, '') || 'None';
                const level = i.level || 0;
                const chests_found = i.chestsFound || 0;
                const items_identified = i.itemsIdentified || 0;
                const mobs_killed = i.mobsKilled || 0;
                const players_killed = i.pvp.kills || 0;
                const player_deaths = i.pvp.deaths || 0;
                const blocks_walked = i.blocksWalked || 0;
                const logins = i.logins || 0;
                const deaths = i.deaths || 0;
                const playtime =
                  _duration(i.playtime, 'minutes').format(
                    'D [days], H [hours], M [minutes]'
                  ) || 0;
                const discoveries = i.discoveries || 0;
                const events_won = i.eventsWon || 0;
                const gamemode = i.gamemode || 'None';
                const skill_strength = i.skills.strength || 0;
                const skill_dexterity = i.skills.dexterity || 0;
                const skill_intelligence = i.skills.intelligence || 0;
                const skill_defence = i.skills.defence || 0;
                const skill_agility = i.skills.agility || 0;
                const profession_alchemism = i.professions.alchemism || 0;
                const profession_armouring = i.professions.armouring || 0;
                const profession_combat = i.professions.combat || 0;
                const profession_cooking = i.professions.cooking || 0;
                const profession_farming = i.professions.farming || 0;
                const profession_fishing = i.professions.fishing || 0;
                const profession_jeweling = i.professions.jeweling || 0;
                const profession_mining = i.professions.mining || 0;
                const profession_scribing = i.professions.scribing || 0;
                const profession_tailoring = i.professions.tailoring || 0;
                const profession_weaponsmithing =
                  i.professions.weaponsmithing || 0;
                const profession_woodcutting = i.professions.woodcutting || 0;
                const profession_woodworking = i.professions.woodworking || 0;
                const dungeons_completed = i.dungeons.completed || 0;
                const dungeons: readonly {
                  readonly name: any;
                  readonly completed: any;
                }[] = [];
                const quests_completed = i.quests.completed || 0;
                const quests = i.quests.list || 'None';
                i.dungeons.list.forEach(
                  (dungeon: {
                    readonly name: any;
                    readonly completed: any;
                  }) => {
                    dungeons.push({
                      name: dungeon.name,
                      completed: dungeon.completed,
                    });
                  }
                );
                if (!data.classes[name]) data.classes[name] = [];
                data.classes[name].push({
                  name,
                  level,
                  chests_found,
                  items_identified,
                  mobs_killed,
                  players_killed,
                  player_deaths,
                  blocks_walked,
                  logins,
                  deaths,
                  playtime,
                  discoveries,
                  events_won,
                  gamemode,
                  skill_strength,
                  skill_dexterity,
                  skill_intelligence,
                  skill_defence,
                  skill_agility,
                  profession_alchemism,
                  profession_armouring,
                  profession_farming,
                  profession_combat,
                  profession_cooking,
                  profession_fishing,
                  profession_jeweling,
                  profession_mining,
                  profession_scribing,
                  profession_tailoring,
                  profession_weaponsmithing,
                  profession_woodcutting,
                  profession_woodworking,
                  dungeons_completed,
                  dungeons,
                  quests_completed,
                  quests,
                });
              }
            );
          }
          if (player.ranking) {
            const guild_ranking = player.ranking.guild || 0;
            const pvp_ranking = player.ranking.pvp || 0;
            const solo_combat_ranking = player.ranking.player.solo.combat || 0;
            const solo_woodcutting_ranking =
              player.ranking.player.solo.woodcutting || 0;
            const solo_mining_ranking = player.ranking.player.solo.mining || 0;
            const solo_fishing_ranking =
              player.ranking.player.solo.fishing || 0;
            const solo_farming_ranking =
              player.ranking.player.solo.farming || 0;
            const solo_alchemism_ranking =
              player.ranking.player.solo.alchemism || 0;
            const solo_armouring_ranking =
              player.ranking.player.solo.armouring || 0;
            const solo_cooking_ranking =
              player.ranking.player.solo.cooking || 0;
            const solo_jeweling_ranking =
              player.ranking.player.solo.jeweling || 0;
            const solo_scribing_ranking =
              player.ranking.player.solo.scribing || 0;
            const solo_tailoring_ranking =
              player.ranking.player.solo.tailoring || 0;
            const solo_weaponsmithing_ranking =
              player.ranking.player.solo.weaponsmithing || 0;
            const solo_woodworking_ranking =
              player.ranking.player.solo.woodworking || 0;
            const solo_profession_ranking =
              player.ranking.player.solo.profession || 0;
            const solo_overall_ranking =
              player.ranking.player.solo.overall || 0;
            const overall_ranking = player.ranking.player.overall.all || 0;
            const overall_combat_ranking =
              player.ranking.player.overall.combat || 0;
            const overall_profession_ranking =
              player.ranking.player.overall.profession || 0;

            Object.assign(data.ranking, {
              guild_ranking,
              pvp_ranking,
              solo_combat_ranking,
              solo_woodcutting_ranking,
              solo_mining_ranking,
              solo_fishing_ranking,
              solo_farming_ranking,
              solo_alchemism_ranking,
              solo_armouring_ranking,
              solo_cooking_ranking,
              solo_jeweling_ranking,
              solo_scribing_ranking,
              solo_tailoring_ranking,
              solo_weaponsmithing_ranking,
              solo_woodworking_ranking,
              solo_profession_ranking,
              solo_overall_ranking,
              overall_ranking,
              overall_combat_ranking,
              overall_profession_ranking,
            });
          }
          Object.assign(data, {
            role,
            first_login,
            last_login,
            online,
            location,
            play_time,
            rank,
            veteran,
            guild_name,
            guild_rank,
            chests_found,
            items_identified,
            mobs_killed,
            combat_level,
            profession_level,
            combined_level,
            players_killed,
            player_deaths,
            blocks_walked,
            logins,
            deaths,
            discoveries,
            events_won,
          });
          resolve(data);
        });
    }
    if (type === 'guild') {
      fetch(
        `https://api.wynncraft.com/public_api.php?action=guildStats&command=${name}`
      )
        .then((res) => res.text())
        .then(async (_body) => {
          const body = JSON.parse(_body);
          if (body.error === 'Guild not found')
            return resolve({
              errors: `No guild data found for guild: ${name}`,
            });
          const data = {};
          const _name = body.name || 'None';
          const prefix = body.prefix || 'None';
          const xp = body.xp || 0;
          const level = body.level || 0;
          const created = body.created || 'Unknown';
          const territories = body.territories || 0;
          const banner = body.banner ? body.banner : null;
          if (body.members) {
            const members = body.members.length;
            const guild_owner = body.members.filter(
              (guild: { readonly rank: string }) => guild.rank == 'OWNER'
            );
            const guild_chief = body.members.filter(
              (guild: { readonly rank: string }) => guild.rank == 'CHIEF'
            );
            const guild_recruit = body.members.filter(
              (guild: { readonly rank: string }) => guild.rank == 'RECRUIT'
            );
            const guild_captain = body.members.filter(
              (guild: { readonly rank: string }) => guild.rank == 'CAPTAIN'
            );
            const guild_recruiter = body.members.filter(
              (guild: { readonly rank: string }) => guild.rank == 'RECRUITER'
            );
            Object.assign(data, {
              members,
              guild_owner,
              guild_chief,
              guild_recruit,
              guild_captain,
              guild_recruiter,
            });
          }
          Object.assign(data, {
            _name,
            prefix,
            xp,
            level,
            created,
            territories,
            banner,
          });
          resolve(data);
        });
    }
  });
}
