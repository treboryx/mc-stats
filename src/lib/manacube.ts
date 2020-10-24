import fetch from 'node-fetch'; // Main http module
export function manacube(username: string) {
  return new Promise((resolve, reject) => {
    if (!username) return resolve({ errors: 'No username provided' });
    fetch(`https://manacube.com/stats_data/fetch.php?username=${username}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.exists === false)
          return resolve({ errors: 'User does not have any information' });
        type Data1 = {
          readonly [key: string]: object;
        };
        type Data = {
          readonly games: Data1;
        };
        const data: Data = { games: {} };
        Object.assign(data, {
          name: username,
          level: json.level ? json.level : 0,
          rank: json.rank ? json.rank : 'none',
          firstLogin: json.firstSeen ? json.firstSeen : 'Never',
          lastLogin: json.lastSeen ? json.lastSeen : 'Never',
          cubits: json.cubits ? Number(json.cubits) : 0,
        });

        if (json.parkour && json.parkour.playtime !== 'n/a') {
          data.games.parkour = {
            playtime: json.parkour.playtime,
            mana: json.parkour.mana !== 'n/a' ? Number(json.parkour.mana) : 0,
            score:
              json.parkour.score !== 'n/a' ? Number(json.parkour.score) : 0,
            courses:
              json.parkour.courses !== 'n/a' ? Number(json.parkour.courses) : 0,
          };
        }
        if (json.aztec && json.aztec.playtime !== 'n/a') {
          data.games.aztec = {
            playtime: json.aztec.playtime,
            mobKills:
              json.aztec.mobKills !== 'n/a' ? Number(json.aztec.mobKills) : 0,
            mana: json.aztec.mana !== 'n/a' ? Number(json.aztec.mana) : 0,
            money: json.aztec.money !== 'n/a' ? Number(json.aztec.money) : 0,
          };
        }
        if (json.oasis && json.oasis.playtime !== 'n/a') {
          data.games.oasis = {
            playtime: json.oasis.playtime,
            mobKills:
              json.oasis.mobKills !== 'n/a' ? Number(json.oasis.mobKills) : 0,
            mana: json.oasis.mana !== 'n/a' ? Number(json.oasis.mana) : 0,
            money: json.oasis.money !== 'n/a' ? Number(json.oasis.money) : 0,
          };
        }
        if (json.islands && json.islands.playtime !== 'n/a') {
          data.games.islands = {
            playtime: json.islands.playtime,
            mobKills:
              json.islands.mobKills !== 'n/a'
                ? Number(json.islands.mobKills)
                : 0,
            silver:
              json.islands.silver !== 'n/a' ? Number(json.islands.silver) : 0,
            money:
              json.islands.money !== 'n/a' ? Number(json.islands.money) : 0,
          };
        }
        if (json.survival && json.survival.playtime !== 'n/a') {
          data.games.survival = {
            playtime: json.survival.playtime,
            mobKills:
              json.survival.mobKills !== 'n/a'
                ? Number(json.survival.mobKills)
                : 0,
            quests:
              json.survival.quests !== 'n/a' ? Number(json.survival.quests) : 0,
            money:
              json.survival.money !== 'n/a' ? Number(json.survival.money) : 0,
          };
        }
        if (json.factions && json.factions.playtime !== 'n/a') {
          data.games.factions = {
            playtime: json.factions.playtime,
            mobKills:
              json.factions.mobkills !== 'n/a'
                ? Number(json.factions.mobkills)
                : 0,
            kills:
              json.factions.kills !== 'n/a' ? Number(json.factions.kills) : 0,
            money:
              json.factions.money !== 'n/a' ? Number(json.factions.money) : 0,
          };
        }
        if (json.aether && json.aether.playtime !== 'n/a') {
          data.games.aether = {
            playtime: json.aether.playtime,
            miningLevel:
              json.aether.miningLevel !== 'n/a'
                ? Number(json.aether.miningLevel)
                : 0,
            rebirths:
              json.aether.rebirths !== 'n/a' ? Number(json.aether.rebirths) : 0,
            money: json.aether.money !== 'n/a' ? Number(json.aether.money) : 0,
          };
        }
        if (json.atlas && json.atlas.playtime !== 'n/a') {
          data.games.atlas = {
            playtime: json.atlas.playtime,
            miningLevel:
              json.atlas.miningLevel !== 'n/a'
                ? Number(json.atlas.miningLevel)
                : 0,
            rebirths:
              json.atlas.rebirths !== 'n/a' ? Number(json.atlas.rebirths) : 0,
            money: json.atlas.money !== 'n/a' ? Number(json.atlas.money) : 0,
          };
        }
        if (json.creative && json.creative.playtime !== 'n/a') {
          data.games.creative = {
            playtime: json.creative.playtime,
            blocksplaced:
              json.creative.blocksplaced !== 'n/a'
                ? Number(json.creative.blocksplaced)
                : 0,
            blocksbroken:
              json.creative.blocksbroken !== 'n/a'
                ? Number(json.creative.blocksbroken)
                : 0,
          };
        }
        if (json.kitpvp && json.kitpvp.playtime !== 'n/a') {
          data.games.kitpvp = {
            playtime: json.kitpvp.playtime,
            level: json.kitpvp.level !== 'n/a' ? Number(json.kitpvp.level) : 0,
            money: json.kitpvp.money !== 'n/a' ? Number(json.kitpvp.money) : 0,
            kills: json.kitpvp.kills !== 'n/a' ? Number(json.kitpvp.kills) : 0,
          };
        }
        resolve(data);
      })
      .catch((e) => {
        resolve({ errors: "Can't fetch stats, API is probably offline." });
        console.log(e);
      });
  });
}
