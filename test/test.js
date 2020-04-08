const mc = require("../app.js");

const main = async () => {
  //   async function guild () {
  //     return new Promise((resolve, reject) => {
  //       const fetch = require("node-fetch");
  //       const { createCanvas, loadImage } = require("canvas");
  //       const key = "";
  //       const id = "53bd67d7ed503e868873eceb";
  //       fetch(`https://api.hypixel.net/guild?key=${key}&id=${id}`)
  //         .then(res => res.json())
  //         .then(async json => {
  //           if (!json.guild || json.success === false) return resolve({ errors: "Guild not found" });
  //           const guild = json.guild;
  //           const banner_positions = {
  //             BASE: {
  //               0: "0",
  //               1: "0"
  //             },
  //             bl: {
  //               0: "-160",
  //               1: "0"
  //             },
  //             bo: {
  //               0: "-320",
  //               1: "0"
  //             },
  //             br: {
  //               0: "-480",
  //               1: "0"
  //             },
  //             bri: {
  //               0: "-640",
  //               1: "0"
  //             },
  //             bs: {
  //               0: "0",
  //               1: "-320"
  //             },
  //             bt: {
  //               0: "-160",
  //               1: "-320"
  //             },
  //             bts: {
  //               0: "-320",
  //               1: "-320"
  //             },
  //             cbo: {
  //               0: "-480",
  //               1: "-320"
  //             },
  //             cr: {
  //               0: "-640",
  //               1: "-320"
  //             },
  //             cre: {
  //               0: "0",
  //               1: "-640"
  //             },
  //             cs: {
  //               0: "-160",
  //               1: "-640"
  //             },
  //             dls: {
  //               0: "-320",
  //               1: "-640"
  //             },
  //             drs: {
  //               0: "-480",
  //               1: "-640"
  //             },
  //             flo: {
  //               0: "-640",
  //               1: "-640"
  //             },
  //             gra: {
  //               0: "0",
  //               1: "-960"
  //             },
  //             hh: {
  //               0: "-160",
  //               1: "-960"
  //             },
  //             ld: {
  //               0: "-320",
  //               1: "-960"
  //             },
  //             ls: {
  //               0: "-480",
  //               1: "-960"
  //             },
  //             mc: {
  //               0: "-640",
  //               1: "-960"
  //             },
  //             moj: {
  //               0: "0",
  //               1: "-1280"
  //             },
  //             mr: {
  //               0: "-160",
  //               1: "-1280"
  //             },
  //             ms: {
  //               0: "-320",
  //               1: "-1280"
  //             },
  //             rud: {
  //               0: "-480",
  //               1: "-1280"
  //             },
  //             rs: {
  //               0: "-640",
  //               1: "-1280"
  //             },
  //             sc: {
  //               0: "0",
  //               1: "-1600"
  //             },
  //             sku: {
  //               0: "-160",
  //               1: "-1600"
  //             },
  //             ss: {
  //               0: "-320",
  //               1: "-1600"
  //             },
  //             tl: {
  //               0: "-480",
  //               1: "-1600"
  //             },
  //             tr: {
  //               0: "-640",
  //               1: "-1600"
  //             },
  //             ts: {
  //               0: "0",
  //               1: "-1920"
  //             },
  //             tt: {
  //               0: "-160",
  //               1: "-1920"
  //             },
  //             tts: {
  //               0: "-320",
  //               1: "-1920"
  //             },
  //             vh: {
  //               0: "-480",
  //               1: "-1920"
  //             },
  //             gru: {
  //               0: "-640",
  //               1: "-1920"
  //             },
  //             vhr: {
  //               0: "0",
  //               1: "-2240"
  //             },
  //             hhb: {
  //               0: "-160",
  //               1: "-2240"
  //             },
  //             lud: {
  //               0: "-320",
  //               1: "-2240"
  //             },
  //             rd: {
  //               0: "-480",
  //               1: "-2240"
  //             }
  //           };
  //           function getColour (id) {
  //             var background = "";
  //             switch (id) {
  //               case "0":
  //                 background = "black";
  //                 break;
  //               case "1":
  //                 background = "red";
  //                 break;
  //               case "2":
  //                 background = "green";
  //                 break;
  //               case "3":
  //                 background = "brown";
  //                 break;
  //               case "4":
  //                 background = "blue";
  //                 break;
  //               case "5":
  //                 background = "purple";
  //                 break;
  //               case "6":
  //                 background = "cyan";
  //                 break;
  //               case "7":
  //                 background = "light_gray";
  //                 break;
  //               case "8":
  //                 background = "gray";
  //                 break;
  //               case "9":
  //                 background = "pink";
  //                 break;
  //               case "10":
  //                 background = "lime";
  //                 break;
  //               case "11":
  //                 background = "yellow";
  //                 break;
  //               case "12":
  //                 background = "light_blue";
  //                 break;
  //               case "13":
  //                 background = "magenta";
  //                 break;
  //               case "14":
  //                 background = "orange";
  //                 break;
  //               case "15":
  //                 background = "white";
  //                 break;
  //               default:
  //                 background = "blank";
  //                 break;
  //             }
  //             return background;
  //           }
  //           async function renderBanner (layers, base) {
  //             const canvas = createCanvas(160, 320);
  //             const ctx = canvas.getContext("2d");
  //             const banner_background = await loadImage(`../assets/bg_base_${getColour(base)}.png`);
  //             const black = await loadImage("../assets/black.png");
  //             const blue = await loadImage("../assets/blue.png");
  //             const brown = await loadImage("../assets/brown.png");
  //             const cyan = await loadImage("../assets/cyan.png");
  //             const dark_gray = await loadImage("../assets/dark_gray.png");
  //             const gray = await loadImage("../assets/gray.png");
  //             const green = await loadImage("../assets/green.png");
  //             const light_blue = await loadImage("../assets/light_blue.png");
  //             const lime = await loadImage("../assets/lime.png");
  //             const magenta = await loadImage("../assets/magenta.png");
  //             const orange = await loadImage("../assets/orange.png");
  //             const pink = await loadImage("../assets/pink.png");
  //             const purple = await loadImage("../assets/purple.png");
  //             const red = await loadImage("../assets/red.png");
  //             const white = await loadImage("../assets/white.png");
  //             const yellow = await loadImage("../assets/yellow.png");
  //             ctx.drawImage(banner_background, 0, 0);
  //             layers.forEach(async i => {
  //               if (i.Color === "1") {
  //                 ctx.drawImage(black,  banner_positions[i.Pattern][0], banner_positions[i.Pattern][1]);
  //               }
  //               if (i.Color === "4") {
  //                 ctx.drawImage(blue, banner_positions[i.Pattern][0], banner_positions[i.Pattern][1]);
  //               }
  //               if (i.Color === "3") {
  //                 ctx.drawImage(brown, banner_positions[i.Pattern][0], banner_positions[i.Pattern][1]);
  //               }
  //               if (i.Color === "6") {
  //                 ctx.drawImage(cyan, banner_positions[i.Pattern][0], banner_positions[i.Pattern][1]);
  //               }
  //               if (i.Color === "8") {
  //                 ctx.drawImage(dark_gray, banner_positions[i.Pattern][0], banner_positions[i.Pattern][1]);
  //               }
  //               if (i.Color === "7") {
  //                 ctx.drawImage(gray, banner_positions[i.Pattern][0], banner_positions[i.Pattern][1]);
  //               }
  //               if (i.Color === "2") {
  //                 ctx.drawImage(green, banner_positions[i.Pattern][0], banner_positions[i.Pattern][1]);
  //               }
  //               if (i.Color === "12") {
  //                 ctx.drawImage(light_blue, banner_positions[i.Pattern][0], banner_positions[i.Pattern][1]);
  //               }
  //               if (i.Color === "10") {
  //                 ctx.drawImage(lime, banner_positions[i.Pattern][0], banner_positions[i.Pattern][1]);
  //               }
  //               if (i.Color === "13") {
  //                 ctx.drawImage(magenta, banner_positions[i.Pattern][0], banner_positions[i.Pattern][1]);
  //               }
  //               if (i.Color === "14") {
  //                 ctx.drawImage(orange, banner_positions[i.Pattern][0], banner_positions[i.Pattern][1]);
  //               }
  //               if (i.Color === "9") {
  //                 ctx.drawImage(pink, banner_positions[i.Pattern][0], banner_positions[i.Pattern][1]);
  //               }
  //               if (i.Color === "5") {
  //                 ctx.drawImage(purple, banner_positions[i.Pattern][0], banner_positions[i.Pattern][1]);
  //               }
  //               if (i.Color === "1") {
  //                 ctx.drawImage(red, banner_positions[i.Pattern][0], banner_positions[i.Pattern][1]);
  //               }
  //               if (i.Color === "15") {
  //                 ctx.drawImage(white, banner_positions[i.Pattern][0], banner_positions[i.Pattern][1]);
  //               }
  //               if (i.Color === "11") {
  //                 ctx.drawImage(yellow, banner_positions[i.Pattern][0], banner_positions[i.Pattern][1]);
  //               }
  //             });
  //             return canvas.toDataURL();
  //           }
  //           if (guild.banner) {
  //             const guild_banner = await (renderBanner(guild.banner.Patterns, guild.banner.Base));
  //             return resolve(guild_banner);
  //           }
  //         });
  //     });
  //   }
  //   console.log(await guild());
  // mc.hypixelPlayer("Dinnerbone").then(r => console.log(r));
  // mc.blocksmc("_IPlozSawdadawd").then(r => console.log(r));
  // mc.funcraft("nathan818").then(r => console.log(r));
  // mc.mineplex("xeiu").then(r => console.log(r));
  // mc.manacube("KaiYara12").then(r => console.log(r));
  // mc.minesaga("doitnowornever").then(r => console.log(r));
  // mc.gommehd("YouBetterGoAfk").then(r => console.log(r));
  // mc.timolia("XxSt3gsfanxX").then(r => console.log(r));
  // mc.minemen("Cleid").then(r => console.log(r));
  // mc.veltpvp("DissTracks").then(r => console.log(r));
  // mc.universocraft("ImOvee_Idk").then(r => console.log(r));
  // mc.hypixelBoosters().then(r => console.log(r));
  // mc.minemen("NiceTryEfe").then(r => console.log(r));
  // mc.hivemc("Gooogle_it", "profile").then(r => console.log(r));
  // mc.hivemc("jonas2246", "SG").then(r => console.log(r));
  // mc.hivemc("Tutle", "BP").then(r => console.log(r));
  // mc.hivemc("Ingola", "CAI").then(r => console.log(r));
  // mc.hivemc("Endlen", "CR").then(r => console.log(r));
  // mc.hivemc("kaiurii", "DR").then(r => console.log(r));
  // mc.hivemc("Limimin", "HB").then(r => console.log(r));
  // mc.hivemc("Limimin", "HB").then(r => console.log(r));
  // mc.hivemc("Caro", "HERO").then(r => console.log(r));
  // mc.hivemc("Spenken", "HIDE").then(r => console.log(r));
  // mc.hivemc("AslanThePro", "OITC").then(r => console.log(r));
  // mc.hivemc("Demon2921", "SP").then(r => console.log(r));
  // mc.hivemc("HeinzBeans", "TIMV").then(r => console.log(r));
  // mc.hivemc("Rinjani", "SKY").then(r => console.log(r));
  // mc.hivemc("Mcae", "DRAW").then(r => console.log(r));
  // mc.hivemc("Varsel", "SLAP").then(r => console.log(r));
  // mc.hivemc("Mackan__", "EF").then(r => console.log(r));
  // mc.hivemc("Conga_", "MM").then(r => console.log(r));
  // mc.hivemc("ShooterGHP", "GRAV").then(r => console.log(r));
  // mc.hivemc("Bgbros", "RR").then(r => console.log(r));
  // mc.hivemc("RageStateOfMind", "GNT").then(r => console.log(r));
  // mc.hivemc("iiAnass", "SGN").then(r => console.log(r));
  // mc.hivemc("Fcssy", "BD").then(r => console.log(r));
  // mc.hivemc("IDontExquseYou", "SPL").then(r => console.log(r));
  // mc.hivemc("Marleeey", "MIMV").then(r => console.log(r));
  // mc.hivemc("HappyStateOfMind", "BED").then(r => console.log(r));
  // mc.wynncraft("player", "1MCRocker").then(r => console.log(r));
  // mc.wynncraft("guild", "Imperial").then(r => console.log(r));
};

main();
