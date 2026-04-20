import React, { useState, useEffect, useRef } from "react";

// ── COLORS ──────────────────────────────────────────────
const G = {
  dark: "#1B3A2D", mid: "#2D5A42", accent: "#4CAF7D",
  accentLight: "#6FCF97", bg: "#F4F1EA", white: "#FFFFFF",
  text: "#1B3A2D", muted: "#7A9485", faint: "#B8CEC5",
  red: "#D94F4F", redBg: "#FDF0F0", redBorder: "#F5C6C6",
  tagGreen: "#E6F4ED", tagGreenText: "#1B5E3A",
  tagYellow: "#FEF9EC", tagYellowText: "#8A6A00",
};

// ── 65 REAL AUSTIN RESTAURANTS ──────────────────────────
const RESTAURANTS = [
  { id:1,  name:"Veracruz All Natural",    type:"Food Truck", e:"🌮", c:"Mexican",       p:"$",    a:"East Austin",    v:["Lively","Outdoor"],       d:["Vegan ok","Nut-free"],                        r:4.9, rv:8200,  w:"~5m",     cr:"Moderate",  h:"Mon-Fri 7am-3pm",                      n:"Best breakfast tacos in Austin. The migas taco is iconic.",             ph:"(512) 981-1760", addr:"1704 E Cesar Chavez St, Austin TX", resy:false },
  { id:2,  name:"Uchiko",                  type:"Restaurant", e:"🍱", c:"Japanese",       p:"$$$",  a:"Rosedale",       v:["Aesthetic","Cozy"],       d:["Gluten-Free","Vegetarian"],                   r:4.8, rv:5600,  w:"~20m",    cr:"Busy",      h:"Daily 5–10pm",                         n:"Chef Paul Qui's Japanese farmhouse. Reserve ahead.",                    ph:"(512) 916-4808", addr:"4200 N Lamar Blvd, Austin TX",      resy:true  },
  { id:3,  name:"Comedor",                 type:"Restaurant", e:"🌯", c:"Mexican",        p:"$$$",  a:"Downtown",       v:["Upscale","Aesthetic"],    d:["Vegetarian","Gluten-Free"],                   r:4.7, rv:3100,  w:"~20m",    cr:"Busy",      h:"Mon-Fri 11am-10pm",                    n:"Contemporary Mexican in a stunning open-air atrium.",                   ph:"(512) 499-0977", addr:"501 Colorado St, Austin TX",         resy:true  },
  { id:4,  name:"Franklin Barbecue",       type:"Restaurant", e:"🔥", c:"BBQ",            p:"$$",   a:"East Austin",    v:["Lively","Outdoor"],       d:[],                                             r:4.7, rv:7002,  w:"~60m",    cr:"Very Busy", h:"Tue-Sun 11am-3pm",                     n:"The most famous BBQ in the world. Arrive very early.",                  ph:"(512) 653-1187", addr:"900 E 11th St, Austin TX",           resy:false },
  { id:5,  name:"Terry Black's BBQ",       type:"Restaurant", e:"🥩", c:"BBQ",            p:"$$",   a:"South Austin",   v:["Lively","Outdoor"],       d:[],                                             r:4.7, rv:24069, w:"~10m",    cr:"Moderate",  h:"Daily 10:30am-9:30pm",                 n:"No insane lines, still world-class brisket and ribs.",                  ph:"(512) 394-5899", addr:"1003 Barton Springs Rd, Austin TX",  resy:false },
  { id:6,  name:"Aba Austin",              type:"Restaurant", e:"🫒", c:"Mediterranean",  p:"$$$",  a:"SoCo",           v:["Aesthetic","Cozy"],       d:["Vegan ok","Gluten-Free","Vegetarian"],         r:4.7, rv:7172,  w:"~20m",    cr:"Busy",      h:"Daily 11am-10pm",                      n:"The garlic hummus is life-changing. Most-reviewed Med in Austin.",      ph:"(737) 273-0199", addr:"1011 S Congress Ave, Austin TX",     resy:true  },
  { id:7,  name:"Taqueria De Diez",        type:"Restaurant", e:"🥷", c:"Mexican",        p:"$$",   a:"Downtown",       v:["Lively","Cozy"],          d:["Vegetarian"],                                 r:4.8, rv:1719,  w:"~10m",    cr:"Moderate",  h:"Daily 11:30am-1am",                    n:"A taco speakeasy — walk through the bar to find it.",                   ph:"(512) 633-4829", addr:"206 Trinity St, Austin TX",          resy:false },
  { id:8,  name:"Ember Kitchen",           type:"Restaurant", e:"🔥", c:"Latin Fusion",   p:"$$$",  a:"West Austin",    v:["Aesthetic","Upscale"],    d:["Gluten-Free"],                                r:4.8, rv:2318,  w:"~20m",    cr:"Busy",      h:"Daily 5-11pm",                         n:"Fire-driven Latin. Short rib with polenta is unforgettable.",           ph:"(512) 291-6846", addr:"800 W Cesar Chavez St, Austin TX",   resy:true  },
  { id:9,  name:"Craft Omakase",           type:"Restaurant", e:"🍣", c:"Japanese",       p:"$$$$", a:"North Lamar",    v:["Aesthetic","Romantic"],   d:["Gluten-Free"],                                r:5.0, rv:439,   w:"Reserve", cr:"Intimate",  h:"Daily 5:30-11pm",                      n:"Perfect 5.0 rating. Most special dinner in Austin.",                    ph:"(512) 887-8889", addr:"4400 N Lamar Blvd #102, Austin TX",  resy:true  },
  { id:10, name:"The Vegan Nom",           type:"Food Truck", e:"🌱", c:"Vegan",          p:"$",    a:"East Austin",    v:["Outdoor","Lively"],       d:["Vegan ok","Nut-free","Gluten-Free","Vegetarian"], r:4.7, rv:1266, w:"~5m",   cr:"Moderate",  h:"Daily 8am-10pm",                       n:"Best vegan tacos in Austin, hands down.",                               ph:"(512) 497-3147", addr:"2324 E Cesar Chavez St, Austin TX",  resy:false },
  { id:11, name:"Kemuri Tatsu-ya",         type:"Restaurant", e:"🏮", c:"Japanese-BBQ",   p:"$$",   a:"East Austin",    v:["Aesthetic","Lively"],     d:["Vegetarian"],                                 r:4.7, rv:2900,  w:"~30m",    cr:"Busy",      h:"Daily 5-11pm",                         n:"Japanese izakaya meets Texas BBQ. Completely one-of-a-kind.",           ph:"(512) 436-8896", addr:"2713 E 2nd St, Austin TX",           resy:false },
  { id:12, name:"Nixta Taqueria",          type:"Restaurant", e:"🫔", c:"Mexican",        p:"$$",   a:"East Austin",    v:["Aesthetic","Cozy"],       d:["Vegetarian","Vegan ok"],                      r:4.8, rv:1500,  w:"~15m",    cr:"Moderate",  h:"Tue-Sun 5-10pm",                       n:"Michelin-recognized. Handmade tortillas and creative fillings.",        ph:"(512) 551-5820", addr:"2512 E 12th St, Austin TX",          resy:true  },
  { id:13, name:"Tikka House",             type:"Restaurant", e:"🍛", c:"Indian",         p:"$$",   a:"South Lamar",    v:["Cozy","Aesthetic"],       d:["Vegetarian","Vegan ok","Gluten-Free"],         r:4.8, rv:1665,  w:"~10m",    cr:"Moderate",  h:"Daily 11am-10pm",                      n:"Best butter chicken in Austin. The lemon rice is incredible.",          ph:"(512) 797-4439", addr:"2026 S Lamar Blvd, Austin TX",       resy:false },
  { id:14, name:"Odd Duck",                type:"Restaurant", e:"🦆", c:"American",       p:"$$$",  a:"South Lamar",    v:["Aesthetic","Cozy"],       d:["Vegetarian","Gluten-Free"],                   r:4.6, rv:3400,  w:"~25m",    cr:"Busy",      h:"Mon-Thu 5-10pm, Fri-Sun 10am-10pm",    n:"Farm-to-table small plates. Menu changes with the seasons.",            ph:"(512) 433-6521", addr:"1201 S Lamar Blvd, Austin TX",       resy:true  },
  { id:15, name:"Hestia",                  type:"Restaurant", e:"🌿", c:"American",       p:"$$$$", a:"Downtown",       v:["Romantic","Upscale"],     d:["Gluten-Free","Vegetarian"],                   r:4.5, rv:951,   w:"Reserve", cr:"Intimate",  h:"Tue-Sun 5:30-10pm",                    n:"Michelin Star. Everything cooked over open wood fire. Stunning.",       ph:"(512) 333-0737", addr:"607 W 3rd St #105, Austin TX",       resy:true  },
  { id:16, name:"Red Ash",                 type:"Restaurant", e:"🍝", c:"Italian",        p:"$$$",  a:"Downtown",       v:["Romantic","Upscale"],     d:["Gluten-Free"],                                r:4.7, rv:2348,  w:"~15m",    cr:"Busy",      h:"Daily 5-10pm",                         n:"Fire-kissed Italian in a sleek downtown tower. Consistently top-rated.",ph:"(512) 379-2906", addr:"303 Colorado St, Austin TX",          resy:true  },
  { id:17, name:"Fonda San Miguel",        type:"Restaurant", e:"🏛️",c:"Mexican",        p:"$$$",  a:"North Loop",     v:["Romantic","Upscale"],     d:["Vegetarian"],                                 r:4.6, rv:3618,  w:"~20m",    cr:"Moderate",  h:"Mon-Sat 4:30-9:30pm",                  n:"Austin institution in a hacienda. Duck enchiladas are iconic.",         ph:"(512) 459-4121", addr:"2330 W North Loop Blvd, Austin TX",  resy:true  },
  { id:18, name:"Suerte",                  type:"Restaurant", e:"🌮", c:"Mexican",        p:"$$$",  a:"East 6th",       v:["Aesthetic","Upscale"],    d:["Vegetarian","Gluten-Free"],                   r:4.6, rv:3042,  w:"~20m",    cr:"Busy",      h:"Mon-Fri 5-11pm, Sat-Sun 11am-11pm",    n:"Upscale East 6th Mexican. Incredible tequila selection.",               ph:"(512) 522-3031", addr:"1800 E 6th St, Austin TX",           resy:true  },
  { id:19, name:"Launderette",             type:"Restaurant", e:"🫙", c:"American",       p:"$$$",  a:"East Austin",    v:["Romantic","Aesthetic"],   d:["Vegetarian","Gluten-Free"],                   r:4.6, rv:2184,  w:"~20m",    cr:"Moderate",  h:"Daily 11am-2pm & 5-10pm",              n:"Wood-fired octopus in a gorgeous converted laundromat.",                ph:"(512) 382-1599", addr:"2115 Holly St, Austin TX",           resy:true  },
  { id:20, name:"BOA Steakhouse",          type:"Restaurant", e:"🥩", c:"Steakhouse",     p:"$$$$", a:"Downtown",       v:["Upscale","Romantic"],     d:["Gluten-Free"],                                r:4.8, rv:1269,  w:"~20m",    cr:"Busy",      h:"Daily 5-11pm",                         n:"Upscale steakhouse with LA vibe but Texas warmth.",                     ph:"(512) 651-0700", addr:"300 W 6th St, Austin TX",            resy:true  },
  { id:21, name:"Loro Asian Smokehouse",   type:"Restaurant", e:"🍖", c:"Asian-BBQ",      p:"$$",   a:"South Lamar",    v:["Lively","Outdoor"],       d:["Vegetarian"],                                 r:4.5, rv:5536,  w:"~20m",    cr:"Busy",      h:"Daily 11am-10pm",                      n:"Tyson Cole + Aaron Franklin collab. Brisket fried rice is a must.",    ph:"(512) 916-4858", addr:"2115 S Lamar Blvd, Austin TX",       resy:false },
  { id:22, name:"Uchi Austin",             type:"Restaurant", e:"🍣", c:"Japanese",       p:"$$$$", a:"South Lamar",    v:["Romantic","Aesthetic"],   d:["Gluten-Free","Vegetarian"],                   r:4.6, rv:3410,  w:"~25m",    cr:"Busy",      h:"Daily 4-10pm",                         n:"The OG. Where Tyson Cole started it all. Still one of Austin's best.", ph:"(512) 916-4808", addr:"801 S Lamar Blvd, Austin TX",        resy:true  },
  { id:23, name:"Home Slice Pizza",        type:"Restaurant", e:"🍕", c:"Italian",        p:"$$",   a:"SoCo",           v:["Lively","Cozy"],          d:["Vegetarian"],                                 r:4.7, rv:10817, w:"~15m",    cr:"Busy",      h:"Daily 11am-11pm",                      n:"NY-style pizza on South Congress. A mandatory Austin stop.",             ph:"(512) 444-7437", addr:"1415 S Congress Ave, Austin TX",     resy:false },
  { id:24, name:"Show Me Pizza",           type:"Restaurant", e:"🍕", c:"Italian",        p:"$",    a:"South Austin",   v:["Lively","Cozy"],          d:["Vegetarian","Gluten-Free"],                   r:4.7, rv:544,   w:"~5m",     cr:"Chill",     h:"Daily 11am-10pm",                      n:"Creative Neapolitan pizza with an Austin twist. Best GF crust in town.",ph:"(512) 551-2657", addr:"2809 S 1st St, Austin TX",           resy:false },
  { id:25, name:"Matt's El Rancho",        type:"Restaurant", e:"🌯", c:"Tex-Mex",        p:"$$",   a:"South Lamar",    v:["Lively","Cozy"],          d:["Vegetarian","Gluten-Free"],                   r:4.4, rv:7495,  w:"~20m",    cr:"Busy",      h:"Mon & Wed-Sun 11am-10pm",               n:"Austin's ultimate Tex-Mex. Bob's Queso and Knockout Martinis are iconic.",ph:"(512) 462-9333",addr:"2613 S Lamar Blvd, Austin TX",       resy:false },
  { id:26, name:"Stiles Switch BBQ",       type:"Restaurant", e:"🥩", c:"BBQ",            p:"$$",   a:"North Austin",   v:["Lively","Outdoor"],       d:[],                                             r:4.6, rv:5668,  w:"~5m",     cr:"Moderate",  h:"Tue-Sun 11am-8:30pm",                  n:"Great BBQ without the insane lines. Turkey and beef ribs shine.",       ph:"(512) 380-9199", addr:"6610 N Lamar Blvd, Austin TX",       resy:false },
  { id:27, name:"la Barbecue",             type:"Restaurant", e:"🔥", c:"BBQ",            p:"$$",   a:"East Austin",    v:["Outdoor","Lively"],       d:[],                                             r:4.4, rv:3446,  w:"~30m",    cr:"Busy",      h:"Wed-Sun 11am-6pm",                     n:"Michelin-recognized BBQ. Pork ribs and jalapeño sausage are extraordinary.",ph:"N/A",         addr:"2401 E Cesar Chavez St, Austin TX",  resy:false },
  { id:28, name:"Leroy and Lewis BBQ",     type:"Restaurant", e:"🍖", c:"BBQ",            p:"$$",   a:"South Austin",   v:["Lively","Outdoor"],       d:["Vegetarian"],                                 r:4.4, rv:2146,  w:"~20m",    cr:"Busy",      h:"Mon & Wed-Sun 11am-9pm",                n:"New-school BBQ. Beef cheek is next-level. Miso glazed carrots are extraordinary.",ph:"(512) 945-9882",addr:"5621 Emerald Forest Dr, Austin TX",resy:false },
  { id:29, name:"Elizabeth Street Cafe",   type:"Restaurant", e:"🥐", c:"Vietnamese",     p:"$$",   a:"South Lamar",    v:["Aesthetic","Cozy"],       d:["Vegetarian","Vegan ok"],                      r:4.3, rv:2561,  w:"~15m",    cr:"Moderate",  h:"Mon-Fri 11am-10pm, Sat-Sun 8am-10pm",  n:"French-Vietnamese fusion. Banh mi and ginger-chili dumplings shine.",   ph:"(512) 291-2881", addr:"1501 S 1st St, Austin TX",           resy:false },
  { id:30, name:"Cenote",                  type:"Restaurant", e:"☕", c:"American",       p:"$",    a:"East Austin",    v:["Outdoor","Aesthetic"],    d:["Vegetarian","Vegan ok","Gluten-Free"],         r:4.5, rv:2206,  w:"~5m",     cr:"Chill",     h:"Mon-Tue 7am-4pm, Wed-Sun 7am-9pm",     n:"Iconic East Austin cafe with a beautiful back patio.",                  ph:"(737) 415-1099", addr:"1405 E 7th St, Austin TX",           resy:false },
  { id:31, name:"Cuantos Tacos",           type:"Food Truck", e:"🫙", c:"Mexican",        p:"$",    a:"East Austin",    v:["Outdoor","Lively"],       d:["Vegetarian"],                                 r:4.7, rv:1148,  w:"~10m",    cr:"Moderate",  h:"Tue-Sat 11am-10pm",                    n:"Michelin-recognized. Mexico City-style tacos. Suadero is the move.",    ph:"(512) 905-0533", addr:"1108 E 12th St, Austin TX",          resy:false },
  { id:32, name:"T-Loc's Sonora",          type:"Food Truck", e:"🌭", c:"Tex-Mex",        p:"$",    a:"North Austin",   v:["Outdoor","Lively"],       d:[],                                             r:4.9, rv:825,   w:"~5m",     cr:"Chill",     h:"Tue-Sun 11am-3pm",                     n:"Bacon-wrapped Sonoran hot dog. Won best hot dog nationally.",            ph:"(512) 994-8982", addr:"5000 Burnet Rd, Austin TX",          resy:false },
  { id:33, name:"Bird Bird Biscuit",       type:"Food Truck", e:"🐦", c:"American",       p:"$",    a:"East Austin",    v:["Outdoor","Lively"],       d:["Vegetarian"],                                 r:4.7, rv:2406,  w:"~15m",    cr:"Busy",      h:"Mon-Sun 7:30am-2pm",                   n:"Best chicken biscuit in Austin. Order online — they sell out fast.",    ph:"(512) 761-4922", addr:"2701 Manor Rd, Austin TX",           resy:false },
  { id:34, name:"Counter Cafe",            type:"Restaurant", e:"🍳", c:"American",       p:"$$",   a:"East Austin",    v:["Cozy","Aesthetic"],       d:["Vegetarian","Gluten-Free"],                   r:4.4, rv:1478,  w:"~10m",    cr:"Moderate",  h:"Daily 7am-3pm",                        n:"Classic East Austin diner. Best coffee in town. All-day breakfast.",    ph:"(512) 351-9961", addr:"1914 E 6th St, Austin TX",           resy:false },
  { id:35, name:"Snooze AM Eatery",        type:"Restaurant", e:"☀️",c:"American",       p:"$$",   a:"East Austin",    v:["Lively","Cozy"],          d:["Vegetarian","Gluten-Free"],                   r:4.4, rv:1231,  w:"~15m",    cr:"Busy",      h:"Daily 6:30am-2:30pm",                  n:"Creative breakfast classics. Pancake flights and Benedicts are the move.",ph:"(512) 886-1550",addr:"1109 E 5th St #180, Austin TX",      resy:false },
  { id:36, name:"Flower Child",            type:"Restaurant", e:"🌸", c:"American",       p:"$$",   a:"Downtown",       v:["Cozy","Aesthetic"],       d:["Vegetarian","Vegan ok","Gluten-Free"],         r:4.5, rv:1053,  w:"~10m",    cr:"Moderate",  h:"Daily 11am-9pm",                       n:"Feel-good healthy bowls. Perfect for groups with mixed dietary needs.",  ph:"(512) 777-4132", addr:"500 W 2nd St #133, Austin TX",       resy:false },
  { id:37, name:"Kome Sushi Kitchen",      type:"Restaurant", e:"🍱", c:"Japanese",       p:"$$",   a:"North Austin",   v:["Cozy","Lively"],          d:["Vegetarian","Gluten-Free"],                   r:4.5, rv:2744,  w:"~15m",    cr:"Moderate",  h:"Mon-Fri 11am-2pm & 5-10pm, Sat-Sun 11am-10pm", n:"Neighborhood gem. Crunchy Dynamite roll is a crowd favorite.",    ph:"(512) 712-5700", addr:"5301 Airport Blvd #100, Austin TX",  resy:false },
  { id:38, name:"Musashino Sushi",         type:"Restaurant", e:"🍣", c:"Japanese",       p:"$$$",  a:"North Loop",     v:["Cozy","Romantic"],        d:["Gluten-Free"],                                r:4.5, rv:709,   w:"~30m",    cr:"Busy",      h:"Tue-Sat 5:30-9:30pm",                  n:"Hidden upstairs gem with enormous fresh portions. Worth every minute.",  ph:"(512) 795-8593", addr:"2905 San Gabriel St #200, Austin TX",resy:false },
  { id:39, name:"Thai Fresh",              type:"Restaurant", e:"🌿", c:"Thai",           p:"$$",   a:"South Austin",   v:["Outdoor","Cozy"],         d:["Vegetarian","Vegan ok","Gluten-Free"],         r:4.2, rv:1503,  w:"~10m",    cr:"Moderate",  h:"Daily 9am-9pm",                        n:"South Austin Thai with extensive GF options and great papaya salad.",   ph:"(512) 494-6436", addr:"909 W Mary St, Austin TX",           resy:false },
  { id:40, name:"1618 Asian Fusion",       type:"Restaurant", e:"🍜", c:"Asian Fusion",   p:"$$",   a:"East Riverside", v:["Aesthetic","Lively"],     d:["Vegetarian","Gluten-Free"],                   r:4.8, rv:5856,  w:"~10m",    cr:"Moderate",  h:"Daily 10am-9:30pm",                    n:"Vietnamese, dim sum, pad thai all under one roof. Sugarcane shrimp is a must.",ph:"(737) 332-4609",addr:"1618 E Riverside Dr, Austin TX",  resy:false },
  { id:41, name:"Sangam Chettinad",        type:"Restaurant", e:"🍛", c:"Indian",         p:"$$",   a:"North Austin",   v:["Cozy","Aesthetic"],       d:["Vegetarian","Gluten-Free","Halal"],            r:4.7, rv:18730, w:"~15m",    cr:"Busy",      h:"Daily 11:30am-2:30pm & 5:30-10pm",     n:"Best South Indian in Austin. Weekend breakfast dosas are legendary.",   ph:"(512) 770-1104", addr:"6001 W Parmer Ln #140, Austin TX",   resy:false },
  { id:42, name:"Pho Phong Luu",           type:"Restaurant", e:"🍲", c:"Vietnamese",     p:"$",    a:"North Austin",   v:["Cozy","Lively"],          d:["Gluten-Free"],                                r:4.8, rv:813,   w:"~15m",    cr:"Busy",      h:"Mon-Tue & Fri 10am-8pm, Sat-Sun 10am-2:30pm", n:"Best pho broth in Austin. So rich you won't need any sauces.", ph:"(512) 834-1736", addr:"11800 Dessau Rd #302, Austin TX",    resy:false },
  { id:43, name:"Din Ho Chinese BBQ",      type:"Restaurant", e:"🦆", c:"Chinese",        p:"$$",   a:"North Austin",   v:["Lively","Cozy"],          d:["Gluten-Free"],                                r:4.4, rv:2200,  w:"~15m",    cr:"Busy",      h:"Mon & Wed-Sun 11am-9pm",                n:"Authentic Hong Kong BBQ. Duck and chicken combo is the move.",          ph:"(512) 832-8788", addr:"8557 Research Blvd #116, Austin TX", resy:false },
  { id:44, name:"Dan's Hamburgers",        type:"Restaurant", e:"🍔", c:"American",       p:"$",    a:"North Austin",   v:["Lively","Cozy"],          d:["Vegetarian"],                                 r:4.6, rv:3615,  w:"~5m",     cr:"Moderate",  h:"Mon-Sat 6am-10pm, Sun 6am-5pm",        n:"Austin original since the 60s. Handmade onion rings and classic burgers.",ph:"(512) 459-3239",addr:"5602 N Lamar Blvd, Austin TX",       resy:false },
  { id:45, name:"North Italia (Domain)",   type:"Restaurant", e:"🍝", c:"Italian",        p:"$$",   a:"The Domain",     v:["Lively","Aesthetic"],     d:["Vegetarian","Gluten-Free"],                   r:4.3, rv:2964,  w:"~20m",    cr:"Busy",      h:"Daily 11am-10pm",                      n:"Hot honey prosciutto pizza and truffle bread keep people coming back.",  ph:"(512) 339-4400", addr:"11506 Century Oaks Terrace #124, Austin TX", resy:true },
  { id:46, name:"El Tacorrido",            type:"Food Truck", e:"🌮", c:"Tex-Mex",        p:"$",    a:"South Austin",   v:["Outdoor","Lively"],       d:["Vegetarian"],                                 r:4.3, rv:938,   w:"~5m",     cr:"Chill",     h:"Daily 7am-12am",                       n:"Drive-thru taco window open until midnight. Portobello taco is incredible.",ph:"(512) 912-1939",addr:"2316 S 1st St, Austin TX",          resy:false },
  { id:47, name:"Peace Bakery & Deli",     type:"Restaurant", e:"🥙", c:"Mediterranean",  p:"$$",   a:"North Austin",   v:["Cozy","Outdoor"],         d:["Vegetarian","Vegan ok","Halal","Gluten-Free"], r:4.7, rv:767,   w:"~5m",     cr:"Chill",     h:"Daily 10:30am-8:30pm",                 n:"Generous Middle Eastern. Stuffed eggplant and baklava are unreal.",     ph:"(512) 386-1152", addr:"11220 N Lamar Blvd B202, Austin TX", resy:false },
  { id:48, name:"Machi Sushi AYCE",        type:"Restaurant", e:"🍱", c:"Japanese",       p:"$$",   a:"South Austin",   v:["Lively","Cozy"],          d:["Vegetarian"],                                 r:4.6, rv:1711,  w:"~15m",    cr:"Busy",      h:"Daily 11am-10pm",                      n:"All-you-can-eat sushi with robot delivery and Transformer statues.",    ph:"(512) 358-1117", addr:"2200 S I-35 Frontage Rd, Austin TX", resy:false },
  { id:49, name:"Valentina's Tex Mex",     type:"Food Truck", e:"🌄", c:"Tex-Mex",        p:"$",    a:"South Austin",   v:["Outdoor","Lively"],       d:["Vegetarian"],                                 r:4.8, rv:2100,  w:"~10m",    cr:"Moderate",  h:"Wed-Mon 7am-3pm",                      n:"The Real Deal Holyfield breakfast taco. Worth the drive.",              ph:"(512) 221-4248", addr:"11500 Menchaca Rd, Austin TX",       resy:false },
  { id:50, name:"Micklethwait Craft BBQ",  type:"Food Truck", e:"💨", c:"BBQ",            p:"$$",   a:"East Austin",    v:["Outdoor","Lively"],       d:[],                                             r:4.7, rv:2600,  w:"~20m",    cr:"Moderate",  h:"Wed-Sun 11am until sold out",          n:"Craft BBQ from a trailer. Brisket and jalapeño cheese grits.",          ph:"(512) 791-5961", addr:"1309 Rosewood Ave, Austin TX",       resy:false },
  { id:51, name:"Paperboy",                type:"Food Truck", e:"📰", c:"American",       p:"$",    a:"East Austin",    v:["Outdoor","Aesthetic"],    d:["Vegetarian"],                                 r:4.6, rv:1900,  w:"~10m",    cr:"Moderate",  h:"Daily 8am-2pm",                        n:"The best breakfast sandwich in Austin. Always worth the line.",          ph:"(512) 522-5425", addr:"1203 E 11th St, Austin TX",          resy:false },
  { id:52, name:"Sour Duck Market",        type:"Restaurant", e:"🫕", c:"American",       p:"$$",   a:"East Austin",    v:["Outdoor","Lively"],       d:["Vegetarian","Vegan ok"],                      r:4.5, rv:2305,  w:"~15m",    cr:"Moderate",  h:"Daily 9am-10pm",                       n:"Dog & kid-friendly. Wagyu smash burgers and house-baked bread.",        ph:"(512) 394-5776", addr:"1814 E MLK Jr Blvd, Austin TX",      resy:false },
  { id:53, name:"Upstairs at Caroline",    type:"Restaurant", e:"🎱", c:"American",       p:"$$",   a:"Downtown",       v:["Lively","Outdoor"],       d:["Vegetarian"],                                 r:4.9, rv:6551,  w:"~10m",    cr:"Busy",      h:"Daily 11am-12am",                      n:"Rooftop bar with foosball, Jenga, pool, fire pits. Great views.",       ph:"(512) 982-6766", addr:"109 E 7th St, Austin TX",            resy:false },
  { id:54, name:"Nido Rooftop",            type:"Restaurant", e:"🏙️",c:"American",       p:"$$$",  a:"Riverside",      v:["Romantic","Aesthetic"],   d:["Vegetarian","Gluten-Free"],                   r:4.5, rv:1461,  w:"~20m",    cr:"Moderate",  h:"Daily 7am-10pm",                       n:"Stunning rooftop at the Loren Hotel with panoramic Austin views.",      ph:"(512) 580-1183", addr:"1211 W Riverside Dr, Austin TX",     resy:true  },
  { id:55, name:"Poeta",                   type:"Restaurant", e:"🍝", c:"Italian",        p:"$$",   a:"East Austin",    v:["Cozy","Romantic"],        d:["Vegetarian"],                                 r:4.5, rv:328,   w:"~10m",    cr:"Chill",     h:"Daily 9am-10pm",                       n:"Intimate Italian at East Austin Hotel. Carbonara is perfection.",       ph:"(512) 364-0380", addr:"1108 E 6th St, Austin TX",           resy:true  },
  { id:56, name:"Hippie PicNik",           type:"Food Truck", e:"🌿", c:"American",       p:"$",    a:"East Austin",    v:["Outdoor","Aesthetic"],    d:["Vegetarian"],                                 r:5.0, rv:193,   w:"~10m",    cr:"Chill",     h:"Tue-Sun 12-3pm & 7-10pm",              n:"Backyard vibes, incredible bratwurst, and the hippie crunch wrap.",     ph:"(580) 730-1098", addr:"1106 E 11th St, Austin TX",          resy:false },
  { id:57, name:"Tyson's Tacos",           type:"Food Truck", e:"🌮", c:"Tex-Mex",        p:"$",    a:"North Loop",     v:["Outdoor","Lively"],       d:["Vegetarian"],                                 r:4.6, rv:1400,  w:"~5m",     cr:"Chill",     h:"Daily 7am-3pm",                        n:"Cash only, no frills, legendary breakfast tacos.",                      ph:"N/A",            addr:"4905 Airport Blvd, Austin TX",       resy:false },
  { id:58, name:"ATX Cocina",              type:"Restaurant", e:"🥂", c:"Mexican",        p:"$$$",  a:"Downtown",       v:["Upscale","Aesthetic"],    d:["Vegetarian","Gluten-Free"],                   r:4.6, rv:1870,  w:"~20m",    cr:"Busy",      h:"Mon-Thu 5-10pm, Fri-Sun 4-10pm",       n:"Modern Mexican with handcrafted margaritas. Very photogenic.",          ph:"(512) 263-2322", addr:"110 San Antonio St, Austin TX",      resy:true  },
  { id:59, name:"Juan in a Million",       type:"Restaurant", e:"🥚", c:"Tex-Mex",        p:"$",    a:"East Austin",    v:["Lively","Outdoor"],       d:["Vegetarian"],                                 r:4.6, rv:3800,  w:"~15m",    cr:"Busy",      h:"Daily 7am-3pm",                        n:"The Don Juan breakfast taco is an Austin institution since 1981.",      ph:"(512) 472-3872", addr:"2300 E Cesar Chavez St, Austin TX",  resy:false },
  { id:60, name:"Honest Mary's",           type:"Restaurant", e:"🥗", c:"American",       p:"$",    a:"East Austin",    v:["Cozy","Outdoor"],         d:["Vegetarian","Vegan ok","Gluten-Free"],         r:4.5, rv:112,   w:"~5m",     cr:"Chill",     h:"Daily 10:30am-9:30pm",                 n:"Healthy bowls done right. Great aqua fresca and honey chicken bowl.",   ph:"(512) 375-3906", addr:"2021 Aldrich St, Austin TX",         resy:false },
  { id:61, name:"Sapori Italian Roots",    type:"Restaurant", e:"🍝", c:"Italian",        p:"$$",   a:"Downtown",       v:["Cozy","Romantic"],        d:["Vegetarian","Gluten-Free"],                   r:4.8, rv:774,   w:"~10m",    cr:"Moderate",  h:"Tue-Sun 11am-10pm",                    n:"Handmade pasta and family-style warmth in the heart of downtown.",      ph:"(737) 351-9271", addr:"800 Brazos St, Austin TX",           resy:false },
  { id:62, name:"Geraldine's",             type:"Restaurant", e:"🎶", c:"American",       p:"$$$",  a:"Downtown",       v:["Romantic","Aesthetic"],   d:["Vegetarian","Gluten-Free"],                   r:4.5, rv:1679,  w:"~20m",    cr:"Moderate",  h:"Mon-Fri 7-11am & 5-11pm",              n:"Live music, craft cocktails, and flawlessly composed dishes.",          ph:"(512) 476-4755", addr:"605 Davis St, Austin TX",            resy:true  },
  { id:63, name:"JewBoy Burgers",          type:"Restaurant", e:"🍔", c:"American",       p:"$$",   a:"North Austin",   v:["Lively","Cozy"],          d:["Vegetarian"],                                 r:4.7, rv:4236,  w:"~15m",    cr:"Moderate",  h:"Tue-Sun 11am-10pm",                    n:"House-made pastrami burgers and smoked mayo. Truly legendary.",         ph:"(512) 291-3358", addr:"5111 Airport Blvd, Austin TX",       resy:false },
  { id:64, name:"Sangam Chettinad (NW)",   type:"Restaurant", e:"🍛", c:"Indian",         p:"$$",   a:"Northwest Austin",v:["Cozy","Aesthetic"],      d:["Vegetarian","Gluten-Free","Halal"],            r:4.7, rv:18730, w:"~15m",    cr:"Busy",      h:"Daily 11:30am-2:30pm & 5:30-10pm",     n:"Best South Indian in Austin. Consistently packed for good reason.",     ph:"(512) 770-1104", addr:"6001 W Parmer Ln #140, Austin TX",   resy:false },
  { id:65, name:"Geraldine's (Hotel VZ)",  type:"Restaurant", e:"🎶", c:"American",       p:"$$$",  a:"Rainey Street",  v:["Romantic","Lively"],      d:["Vegetarian","Gluten-Free"],                   r:4.5, rv:1679,  w:"~15m",    cr:"Moderate",  h:"Daily 5pm-12am",                       n:"Rooftop live music on Rainey Street. Cocktails and views are stunning.", ph:"(512) 476-4755", addr:"605 Davis St, Austin TX",            resy:true  },
];

// ── SCORING ──────────────────────────────────────────────
function scoreRestaurant(r, members) {
  if (!members || !members.length) return { score: Math.round(r.r * 10), blocked: false };
  const n = members.length;
  let score = 0;

  // Hard requirements always block
  const allHard = [...new Set(members.flatMap(m => m.hard || []))];
  for (const h of allHard) {
    if (h === "Under $20"   && (r.p === "$$$" || r.p === "$$$$")) return { score: 0, blocked: true };
    if (h === "Vegan only"  && !r.d.some(x => x.toLowerCase().includes("vegan")))       return { score: 0, blocked: true };
    if (h === "Nut allergy" && !r.d.some(x => x.toLowerCase().includes("nut")))         return { score: 0, blocked: true };
    if (h === "Gluten-Free" && !r.d.includes("Gluten-Free"))                            return { score: 0, blocked: true };
    if (h === "Vegetarian"  && !r.d.some(x => x.toLowerCase().includes("vegetarian"))) return { score: 0, blocked: true };
    if (h === "Halal"       && !r.d.includes("Halal"))                                  return { score: 0, blocked: true };
  }

  // Cuisine match (40%)
  const cm = members.filter(m => (m.cuisines || []).includes(r.c)).length;
  score += (cm / n) * 40;

  // Price match (18%)
  const pm = members.filter(m => (m.prices || []).length > 0);
  if (pm.length > 0) {
    const hits = pm.filter(m => m.prices.includes(r.p)).length;
    score += hits === 0 ? -15 : (hits / pm.length) * 18;
  }

  // Vibe match (30%)
  const vm = members.filter(m => (m.vibes || []).some(v => r.v.includes(v))).length;
  score += (vm / n) * 30;

  // Real rating boost
  score += r.r * 2.5;

  return { score: Math.round(Math.min(100, Math.max(0, score))), blocked: false };
}

// ── GROUP STORAGE (localStorage — works cross-tab same browser) ──
function saveGroup(code, members) {
  try { localStorage.setItem("craveco_" + code, JSON.stringify(members)); return true; }
  catch (e) { return false; }
}
function loadGroup(code) {
  try { const v = localStorage.getItem("craveco_" + code); return v ? JSON.parse(v) : null; }
  catch (e) { return null; }
}
function makeCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "GRP-";
  for (let i = 0; i < 4; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

// ── SMALL UI COMPONENTS ──────────────────────────────────
function Avatar({ name, size = 34, bg = G.mid }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.35, fontWeight: 800, color: "#fff", flexShrink: 0 }}>
      {(name || "?").slice(0, 2).toUpperCase()}
    </div>
  );
}
function Tag({ label, yellow }) {
  return (
    <span style={{ display: "inline-flex", background: yellow ? G.tagYellow : G.tagGreen, color: yellow ? G.tagYellowText : G.tagGreenText, borderRadius: 20, padding: "2px 9px", fontSize: 11, fontWeight: 600, margin: 2 }}>
      {label}
    </span>
  );
}
function Chip({ label, selected, onClick }) {
  return (
    <button onClick={onClick} style={{ padding: "7px 14px", borderRadius: 22, border: `1.5px solid ${selected ? G.dark : G.faint}`, background: selected ? G.dark : "transparent", color: selected ? "#fff" : G.muted, fontSize: 13, cursor: "pointer", fontFamily: "Georgia,serif", fontWeight: selected ? 700 : 400, transition: "all 0.12s", margin: 3 }}>
      {label}
    </button>
  );
}
function PrimaryBtn({ children, onClick, disabled }) {
  return (
    <button onClick={disabled ? undefined : onClick} style={{ width: "100%", padding: "14px 0", borderRadius: 14, border: "none", background: disabled ? G.faint : G.dark, color: disabled ? "#aaa" : "#fff", fontSize: 15, fontWeight: 700, cursor: disabled ? "default" : "pointer", fontFamily: "Georgia,serif", marginTop: 8 }}>
      {children}
    </button>
  );
}
function OutlineBtn({ children, onClick, style: s = {} }) {
  return (
    <button onClick={onClick} style={{ width: "100%", padding: "13px 0", borderRadius: 14, border: `1.5px solid ${G.dark}`, background: "transparent", color: G.dark, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Georgia,serif", marginTop: 8, ...s }}>
      {children}
    </button>
  );
}

// ── BILL SPLITTER (separate component so hooks work correctly) ──
function BillSplitter({ selected, members, myName, onBack, onDone }) {
  const init = members.length > 0
    ? members.map(m => ({ name: m.name, items: [{ desc: "", amount: "" }] }))
    : [{ name: myName || "You", items: [{ desc: "", amount: "" }] }];
  const [people, setPeople] = useState(init);
  const [tipPct, setTipPct] = useState(20);

  const updItem  = (pi, ii, f, v) => setPeople(p => p.map((x, a) => a !== pi ? x : { ...x, items: x.items.map((y, b) => b !== ii ? y : { ...y, [f]: v }) }));
  const addItem  = pi => setPeople(p => p.map((x, a) => a !== pi ? x : { ...x, items: [...x.items, { desc: "", amount: "" }] }));
  const remItem  = (pi, ii) => setPeople(p => p.map((x, a) => a !== pi ? x : { ...x, items: x.items.filter((_, b) => b !== ii) }));
  const addPer   = () => setPeople(p => [...p, { name: "", items: [{ desc: "", amount: "" }] }]);
  const updName  = (pi, v) => setPeople(p => p.map((x, a) => a !== pi ? x : { ...x, name: v }));

  const pSub  = p => p.items.reduce((s, i) => s + (parseFloat(i.amount) || 0), 0);
  const gSub  = people.reduce((s, p) => s + pSub(p), 0);
  const gTax  = gSub * 0.0825;
  const gTip  = gSub * (tipPct / 100);
  const gTot  = gSub + gTax + gTip;
  const pTot  = p => { const s = pSub(p); if (gSub === 0) return 0; const x = s / gSub; return s + gTax * x + gTip * x; };
  const copy  = () => navigator.clipboard?.writeText(people.map(p => `${p.name || "?"}: $${pTot(p).toFixed(2)}`).join("\n") + `\nTotal: $${gTot.toFixed(2)}`);

  const card = { background: G.white, borderRadius: 14, padding: 16, marginBottom: 12, boxShadow: "0 1px 6px rgba(0,0,0,0.06)" };

  return (
    <div style={{ minHeight: "100vh", background: G.bg, fontFamily: "Georgia,serif" }}>
      <div style={{ background: G.dark, padding: "52px 20px 22px" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: G.accentLight, fontSize: 13, cursor: "pointer", fontFamily: "Georgia,serif", padding: 0, marginBottom: 14 }}>← Back</button>
        <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 900, margin: "0 0 4px" }}>{selected?.name || "Split the Bill"}</h2>
        <p style={{ color: G.accentLight, fontSize: 12, margin: 0 }}>Enter what each person ordered</p>
      </div>
      <div style={{ padding: "22px 20px" }}>
        {people.map((person, pi) => (
          <div key={pi} style={card}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <Avatar name={person.name || "?"} size={32} />
              <input value={person.name} onChange={e => updName(pi, e.target.value)} placeholder="Name"
                style={{ flex: 1, border: "none", borderBottom: `1.5px solid ${G.faint}`, background: "transparent", fontSize: 15, fontWeight: 700, color: G.text, fontFamily: "Georgia,serif", outline: "none", padding: "4px 0" }} />
              <span style={{ color: G.accent, fontWeight: 800, fontSize: 14 }}>${pTot(person).toFixed(2)}</span>
            </div>
            {person.items.map((item, ii) => (
              <div key={ii} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <input value={item.desc} onChange={e => updItem(pi, ii, "desc", e.target.value)} placeholder="Item (e.g. Tacos)"
                  style={{ flex: 1, border: "none", borderBottom: `1px solid ${G.faint}`, background: "transparent", fontSize: 13, color: G.text, fontFamily: "Georgia,serif", outline: "none", padding: "6px 0" }} />
                <span style={{ color: G.muted, fontSize: 13 }}>$</span>
                <input type="number" value={item.amount} onChange={e => updItem(pi, ii, "amount", e.target.value)} placeholder="0.00"
                  style={{ width: 60, border: "none", borderBottom: `1px solid ${G.faint}`, background: "transparent", fontSize: 13, color: G.text, fontFamily: "Georgia,serif", outline: "none", padding: "6px 0", textAlign: "right" }} />
                {person.items.length > 1 && <button onClick={() => remItem(pi, ii)} style={{ background: "none", border: "none", color: G.faint, fontSize: 18, cursor: "pointer", padding: "0 2px" }}>×</button>}
              </div>
            ))}
            <button onClick={() => addItem(pi)} style={{ background: "none", border: "none", color: G.accent, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "Georgia,serif", marginTop: 6, padding: 0 }}>+ Add item</button>
          </div>
        ))}

        <button onClick={addPer} style={{ width: "100%", padding: "12px 0", borderRadius: 14, border: `1.5px dashed ${G.faint}`, background: "transparent", color: G.muted, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Georgia,serif", marginBottom: 16 }}>+ Add person</button>

        <div style={card}>
          <p style={{ fontSize: 11, color: G.muted, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 12px" }}>Tip</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 }}>
            {[15, 18, 20, 25].map(pct => (
              <button key={pct} onClick={() => setTipPct(pct)} style={{ padding: "10px 0", borderRadius: 10, border: `1.5px solid ${tipPct === pct ? G.dark : G.faint}`, background: tipPct === pct ? G.dark : "transparent", color: tipPct === pct ? "#fff" : G.muted, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Georgia,serif" }}>{pct}%</button>
            ))}
          </div>
        </div>

        <div style={card}>
          {[["Subtotal", `$${gSub.toFixed(2)}`], ["Tax (8.25%)", `$${gTax.toFixed(2)}`], [`Tip (${tipPct}%)`, `$${gTip.toFixed(2)}`]].map(([l, v]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: `1px solid ${G.bg}` }}>
              <span style={{ color: G.muted, fontSize: 14 }}>{l}</span>
              <span style={{ color: G.text, fontSize: 14, fontWeight: 600 }}>{v}</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 12 }}>
            <span style={{ color: G.text, fontSize: 17, fontWeight: 900 }}>Total</span>
            <span style={{ color: G.text, fontSize: 17, fontWeight: 900 }}>${gTot.toFixed(2)}</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          <OutlineBtn onClick={copy} style={{ flex: 1, marginTop: 0 }}>Copy amounts</OutlineBtn>
          <OutlineBtn onClick={() => {}} style={{ flex: 1, marginTop: 0 }}>Venmo request</OutlineBtn>
        </div>
        <PrimaryBtn onClick={onDone}>Done ✓</PrimaryBtn>
      </div>
    </div>
  );
}

// ── CONSTANTS ────────────────────────────────────────────
const VIBES    = ["Aesthetic", "Lively", "Cozy", "Outdoor", "Upscale", "Romantic"];
const HARD     = ["Nut allergy", "Vegan only", "Gluten-Free", "Under $20", "Vegetarian", "Dairy-Free", "Halal"];
const CUISINES = ["Mexican", "Japanese", "Italian", "BBQ", "American", "Indian", "Mediterranean", "Vegan", "Tex-Mex", "Latin Fusion", "Chinese", "Asian-BBQ", "Vietnamese", "Thai", "Asian Fusion", "Steakhouse"];

// ── MAIN APP ─────────────────────────────────────────────
export default function CraveCo() {
  const [screen,    setScreen]    = useState("home");
  const [myName,    setMyName]    = useState("");
  const [joinCode,  setJoinCode]  = useState("");
  const [activeCode,setActiveCode]= useState("");
  const [myVibes,   setMyVibes]   = useState([]);
  const [myCuisines,setMyCuisines]= useState([]);
  const [myHard,    setMyHard]    = useState([]);
  const [myPrice,   setMyPrice]   = useState([]);
  const [members,   setMembers]   = useState([]);
  const [results,   setResults]   = useState([]);
  const [selected,  setSelected]  = useState(null);
  const [showBook,  setShowBook]  = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [err,       setErr]       = useState("");
  const [copied,    setCopied]    = useState(false);
  const pollRef = useRef(null);

  // Poll every 3s when on waiting screen
  useEffect(() => {
    if (screen !== "waiting" || !activeCode) return;
    pollRef.current = setInterval(() => {
      const latest = loadGroup(activeCode);
      if (latest) setMembers(latest);
    }, 3000);
    return () => clearInterval(pollRef.current);
  }, [screen, activeCode]);

  const startGroup = () => {
    if (!myName.trim()) return;
    setLoading(true);
    const code = makeCode();
    const me = { name: myName.trim(), vibes: [], cuisines: [], hard: [], prices: [], submitted: false };
    saveGroup(code, [me]);
    setActiveCode(code);
    setMembers([me]);
    setLoading(false);
    setScreen("vibe");
  };

  const joinGroup = () => {
    if (!myName.trim() || !joinCode.trim()) { setErr("Enter your name and a group code."); return; }
    setErr("Looking up group...");
    setLoading(true);
    const code = joinCode.trim().toUpperCase();
    const existing = loadGroup(code);
    if (!existing) {
      setErr("Group not found. Make sure the creator started the group first, then try again.");
      setLoading(false);
      return;
    }
    const already = existing.find(m => m.name.toLowerCase() === myName.trim().toLowerCase());
    const updated = already ? existing : [...existing, { name: myName.trim(), vibes: [], cuisines: [], hard: [], prices: [], submitted: false }];
    saveGroup(code, updated);
    setMembers(updated);
    setActiveCode(code);
    setErr("");
    setLoading(false);
    setScreen("vibe");
  };

  const submitPrefs = () => {
    const me = { name: myName, vibes: myVibes, cuisines: myCuisines, hard: myHard, prices: myPrice, submitted: true };
    const latest = loadGroup(activeCode) || members;
    let updated = latest.map(m => m.name.toLowerCase() === myName.toLowerCase() ? me : m);
    if (!updated.find(m => m.name.toLowerCase() === myName.toLowerCase())) updated = [...updated, me];
    saveGroup(activeCode, updated);
    setMembers(updated);
    setScreen("waiting");
  };

  const getResults = () => {
    const all = members.filter(m => m.submitted);
    const base = all.length > 0 ? all : members;
    const scored = RESTAURANTS
      .map(r => ({ ...r, ...scoreRestaurant(r, base) }))
      .filter(r => !r.blocked)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    setResults(scored);
    setScreen("matches");
  };

  const copyCode = () => {
    navigator.clipboard?.writeText(activeCode).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetApp = () => {
    setScreen("home"); setMyName(""); setJoinCode(""); setActiveCode("");
    setMyVibes([]); setMyCuisines([]); setMyHard([]); setMyPrice([]);
    setMembers([]); setResults([]); setSelected(null); setShowBook(false);
    setErr(""); setCopied(false); setLoading(false);
  };

  const tog = (arr, v) => arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v];
  const sub = members.filter(m => m.submitted).length;
  const tot = members.length;

  const headerStyle = { background: G.dark, padding: "52px 20px 22px" };
  const bodyStyle   = { background: G.bg, padding: "22px 20px", borderRadius: "22px 22px 0 0", minHeight: 400 };
  const cardStyle   = { background: G.white, borderRadius: 14, padding: 16, marginBottom: 12, boxShadow: "0 1px 6px rgba(0,0,0,0.06)" };
  const lblStyle    = { fontSize: 11, color: G.muted, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 10px", display: "block" };
  const backBtn     = (screen) => <button onClick={() => { setScreen(screen); }} style={{ background: "none", border: "none", color: G.accentLight, fontSize: 13, cursor: "pointer", fontFamily: "Georgia,serif", padding: 0, marginBottom: 14 }}>← Back</button>;

  // ── HOME ──────────────────────────────────────────────
  if (screen === "home") return (
    <div style={{ minHeight: "100vh", background: G.dark, fontFamily: "Georgia,serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 28 }}>
      <div style={{ width: "100%", maxWidth: 380 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🍽️</div>
          <h1 style={{ fontSize: 42, fontWeight: 900, color: "#fff", margin: "0 0 4px", letterSpacing: "-2px" }}>CraveCo.</h1>
          <p style={{ color: G.accentLight, fontSize: 14, fontStyle: "italic", margin: "0 0 4px" }}>Gather. Feast. Repeat.</p>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, margin: 0 }}>65 real Austin spots · group-first matching</p>
        </div>

        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 8px" }}>Your Name</p>
        <input
          value={myName}
          onChange={e => setMyName(e.target.value)}
          onKeyDown={e => e.key === "Enter" && myName.trim() && startGroup()}
          placeholder="Enter your name"
          style={{ width: "100%", padding: "13px 16px", borderRadius: 12, border: "1.5px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: 16, fontFamily: "Georgia,serif", outline: "none", boxSizing: "border-box", marginBottom: 12 }}
        />

        <button
          onClick={startGroup}
          disabled={loading || !myName.trim()}
          style={{ width: "100%", padding: "14px 0", borderRadius: 14, border: "none", background: G.accent, color: "#fff", fontSize: 15, fontWeight: 700, cursor: myName.trim() ? "pointer" : "default", opacity: myName.trim() ? 1 : 0.45, fontFamily: "Georgia,serif", marginBottom: 14 }}
        >
          {loading ? "Creating..." : "+ Start a group plan"}
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.3)", fontSize: 12, marginBottom: 12 }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
          <span>or join with a code</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <input
            value={joinCode}
            onChange={e => { setJoinCode(e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, "")); setErr(""); }}
            onKeyDown={e => e.key === "Enter" && joinGroup()}
            placeholder="GRP-XXXX"
            maxLength={8}
            style={{ flex: 1, padding: "13px", borderRadius: 12, border: `1.5px solid ${err && err !== "Looking up group..." ? "rgba(220,80,80,0.6)" : "rgba(255,255,255,0.15)"}`, background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: 15, fontFamily: "Georgia,serif", outline: "none", letterSpacing: 2, textAlign: "center" }}
          />
          <button
            onClick={joinGroup}
            disabled={loading || !myName.trim() || !joinCode.trim()}
            style={{ padding: "13px 18px", borderRadius: 12, border: "1.5px solid rgba(255,255,255,0.25)", background: "transparent", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Georgia,serif", whiteSpace: "nowrap", opacity: myName.trim() && joinCode.trim() ? 1 : 0.5 }}
          >
            {loading ? "..." : "Join →"}
          </button>
        </div>
        {err && <p style={{ color: err === "Looking up group..." ? G.accentLight : "#FF8080", fontSize: 12, margin: "4px 0 0", textAlign: "center" }}>{err}</p>}

        <div style={{ marginTop: 28, background: "rgba(255,255,255,0.06)", borderRadius: 12, padding: "14px 16px", fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, border: "1px solid rgba(255,255,255,0.08)" }}>
          <strong style={{ color: "rgba(255,255,255,0.6)" }}>How it works:</strong><br />
          1. Start a plan → share your code<br />
          2. Friends open this app in the same browser, enter the code → Join<br />
          3. Everyone picks their vibe → submit<br />
          4. See your group's top 10 Austin spots 🎯
        </div>
      </div>
    </div>
  );

  // ── VIBE CHECK ──────────────────────────────────────────
  if (screen === "vibe") return (
    <div style={{ minHeight: "100vh", fontFamily: "Georgia,serif" }}>
      <div style={headerStyle}>
        <h2 style={{ color: "#fff", fontSize: 24, fontWeight: 900, margin: "0 0 4px" }}>Your vibe check</h2>
        <p style={{ color: G.accentLight, fontSize: 13, margin: 0 }}>Hi {myName} · Code: <strong style={{ letterSpacing: 2 }}>{activeCode}</strong></p>
      </div>
      <div style={bodyStyle}>
        {/* Hard requirements */}
        <div style={{ background: G.redBg, border: `1px solid ${G.redBorder}`, borderRadius: 14, padding: 14, marginBottom: 18 }}>
          <p style={{ color: G.red, fontSize: 12, fontWeight: 700, margin: "0 0 10px" }}>⚠ Hard requirements — always honored</p>
          <div>{HARD.map(h => <button key={h} onClick={() => setMyHard(tog(myHard, h))} style={{ padding: "5px 12px", borderRadius: 20, border: `1.5px solid ${myHard.includes(h) ? G.red : G.redBorder}`, background: myHard.includes(h) ? "#FFEBEB" : "transparent", color: myHard.includes(h) ? G.red : "#C47070", fontSize: 12, cursor: "pointer", fontFamily: "Georgia,serif", margin: 3, fontWeight: myHard.includes(h) ? 700 : 400 }}>{h}</button>)}</div>
        </div>

        {/* Budget */}
        <span style={lblStyle}>Budget</span>
        <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
          {[["$", "Under $15"], ["$$", "$15-30"], ["$$$", "$30-50"], ["$$$$", "Splurge"]].map(([v, l]) => (
            <button key={v} onClick={() => setMyPrice(tog(myPrice, v))} style={{ flex: 1, padding: "11px 4px", borderRadius: 12, border: `1.5px solid ${myPrice.includes(v) ? G.dark : G.faint}`, background: myPrice.includes(v) ? G.dark : "transparent", color: myPrice.includes(v) ? "#fff" : G.muted, cursor: "pointer", fontFamily: "Georgia,serif", textAlign: "center" }}>
              <div style={{ fontWeight: 800, fontSize: 15 }}>{v}</div>
              <div style={{ fontSize: 10, opacity: 0.7, marginTop: 2 }}>{l}</div>
            </button>
          ))}
        </div>

        {/* Vibe */}
        <span style={lblStyle}>Tonight's vibe</span>
        <div style={{ marginBottom: 18 }}>{VIBES.map(v => <Chip key={v} label={v} selected={myVibes.includes(v)} onClick={() => setMyVibes(tog(myVibes, v))} />)}</div>

        {/* Cuisine */}
        <span style={lblStyle}>Cuisine craving</span>
        <div style={{ marginBottom: 22 }}>{CUISINES.map(c => <Chip key={c} label={c} selected={myCuisines.includes(c)} onClick={() => setMyCuisines(tog(myCuisines, c))} />)}</div>

        <PrimaryBtn onClick={submitPrefs}>Submit my picks →</PrimaryBtn>
        <div style={{ textAlign: "center", marginTop: 10 }}>
          <button onClick={submitPrefs} style={{ background: "none", border: "none", color: G.muted, fontSize: 12, cursor: "pointer", fontFamily: "Georgia,serif" }}>Skip — just show me results</button>
        </div>
      </div>
    </div>
  );

  // ── WAITING ROOM ────────────────────────────────────────
  if (screen === "waiting") return (
    <div style={{ minHeight: "100vh", fontFamily: "Georgia,serif" }}>
      <div style={{ ...headerStyle, textAlign: "center" }}>
        <h2 style={{ color: "#fff", fontSize: 24, fontWeight: 900, margin: "0 0 6px" }}>Waiting on the crew</h2>
        <p style={{ color: G.accentLight, fontSize: 13, margin: "0 0 18px" }}>Share this code — friends open CraveCo and join</p>
        <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 14, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <div>
            <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>Group Code</div>
            <div style={{ color: "#fff", fontSize: 28, fontWeight: 900, letterSpacing: 4 }}>{activeCode}</div>
          </div>
          <button onClick={copyCode} style={{ background: copied ? G.mid : G.accent, border: "none", color: "#fff", borderRadius: 10, padding: "11px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "Georgia,serif", transition: "background 0.2s" }}>
            {copied ? "Copied ✓" : "Copy"}
          </button>
        </div>
        <p style={{ color: "rgba(255,255,255,0.28)", fontSize: 11, margin: 0 }}>Friends join on the same browser · refreshes every 3s</p>
      </div>

      <div style={bodyStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <span style={lblStyle}>Group Responses</span>
          <span style={{ fontSize: 13, color: G.accent, fontWeight: 700 }}>{sub}/{tot} submitted</span>
        </div>

        <div style={{ marginBottom: 18 }}>
          {members.map(m => (
            <div key={m.name} style={{ ...cardStyle, display: "flex", alignItems: "center", gap: 12, padding: "12px 14px" }}>
              <Avatar name={m.name} bg={m.submitted ? G.mid : G.faint} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: G.text, fontSize: 14 }}>{m.name}{m.name === myName ? " (you)" : ""}</div>
                {m.submitted
                  ? <div style={{ color: G.muted, fontSize: 12 }}>{[...(m.cuisines || []), ...(m.vibes || [])].slice(0, 3).join(" · ") || "Submitted"}</div>
                  : <div style={{ color: G.faint, fontSize: 12 }}>Waiting to submit...</div>}
              </div>
              {m.submitted
                ? <div style={{ width: 24, height: 24, borderRadius: "50%", background: G.accent, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13 }}>✓</div>
                : <div style={{ width: 24, height: 24, borderRadius: "50%", border: `2px solid ${G.faint}` }} />}
            </div>
          ))}
        </div>

        <div style={{ height: 6, background: "#E0EDE7", borderRadius: 3, marginBottom: 6, overflow: "hidden" }}>
          <div style={{ width: `${tot > 0 ? (sub / tot) * 100 : 0}%`, height: "100%", background: G.accent, borderRadius: 3, transition: "width 0.4s" }} />
        </div>
        <p style={{ fontSize: 11, color: G.muted, textAlign: "center", margin: "0 0 14px" }}>Auto-refreshes every 3s</p>
        <PrimaryBtn onClick={getResults} style={{ marginTop: 0 }}>
          {sub >= tot && tot > 0 ? "See our top 10 →" : `See top 10 now (${sub} responded) →`}
        </PrimaryBtn>
      </div>
    </div>
  );

  // ── MATCHES ─────────────────────────────────────────────
  if (screen === "matches") return (
    <div style={{ minHeight: "100vh", fontFamily: "Georgia,serif" }}>
      <div style={headerStyle}>
        {backBtn("waiting")}
        <h2 style={{ color: "#fff", fontSize: 24, fontWeight: 900, margin: "0 0 4px" }}>Your Top 10 Picks 🎯</h2>
        <p style={{ color: G.accentLight, fontSize: 13, margin: 0 }}>Based on {sub} of {tot} responses · 65 restaurants scored</p>
      </div>
      <div style={bodyStyle}>
        {results.map((r, i) => (
          <div key={r.id} onClick={() => { setSelected(r); setShowBook(false); setScreen("detail"); }}
            style={{ ...cardStyle, cursor: "pointer", background: i === 0 ? G.dark : G.white, position: "relative" }}>
            {i === 0 && <div style={{ position: "absolute", top: -1, right: -1, background: G.accent, color: "#fff", fontSize: 10, fontWeight: 800, padding: "5px 12px", borderRadius: "0 14px 0 10px" }}>#1 BEST MATCH</div>}
            {i > 0 && <div style={{ position: "absolute", top: 12, right: 12, background: i === 1 ? "#C0C0C0" : i === 2 ? "#C8845A" : G.tagGreen, color: i < 3 ? "#fff" : G.tagGreenText, borderRadius: 20, padding: "2px 9px", fontSize: 11, fontWeight: 700 }}>#{i + 1}</div>}

            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ fontSize: i === 0 ? 32 : 24, flexShrink: 0 }}>{r.e}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                  <h3 style={{ color: i === 0 ? "#fff" : G.text, fontSize: i === 0 ? 18 : 15, fontWeight: 800, margin: 0, paddingRight: i === 0 ? 0 : 44 }}>{r.name}</h3>
                  <div style={{ flexShrink: 0, textAlign: "right" }}>
                    <div style={{ fontWeight: 900, fontSize: i === 0 ? 17 : 14, color: i === 0 ? G.accentLight : G.accent }}>{r.score}%</div>
                    <div style={{ fontSize: 10, color: i === 0 ? "rgba(255,255,255,0.35)" : G.faint }}>match</div>
                  </div>
                </div>
                <div style={{ color: i === 0 ? "rgba(255,255,255,0.5)" : G.muted, fontSize: 12, marginBottom: 6 }}>
                  {r.type === "Food Truck" ? "🚚" : "🍽"} {r.c} · {r.p} · {r.a} · ⭐{r.r}
                </div>
                <div style={{ marginBottom: i === 0 ? 8 : 0 }}>
                  {r.v.slice(0, 2).map(v => <Tag key={v} label={v} />)}
                  {r.d.slice(0, 1).map(d => <Tag key={d} label={d} yellow />)}
                </div>
                {i === 0 && (
                  <>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontStyle: "italic", margin: "6px 0 10px", lineHeight: 1.5 }}>{r.n}</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
                      {[[r.w, "wait"], [r.cr, "crowd"], [r.h.split(",")[0], "hours"]].map(([val, sub]) => (
                        <div key={sub} style={{ background: "rgba(255,255,255,0.1)", borderRadius: 8, padding: "7px", textAlign: "center" }}>
                          <div style={{ color: "#fff", fontWeight: 700, fontSize: 11 }}>{val}</div>
                          <div style={{ color: "rgba(255,255,255,0.38)", fontSize: 10 }}>{sub}</div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
        {results.length === 0 && <div style={{ textAlign: "center", padding: "40px 20px", color: G.muted }}>No matches found. Try relaxing your hard requirements.</div>}
      </div>
    </div>
  );

  // ── DETAIL ──────────────────────────────────────────────
  if (screen === "detail" && selected) return (
    <div style={{ minHeight: "100vh", fontFamily: "Georgia,serif" }}>
      <div style={headerStyle}>
        {backBtn("matches")}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div>
            <div style={{ fontSize: 10, color: G.accentLight, letterSpacing: 2, textTransform: "uppercase", marginBottom: 5 }}>{selected.type}</div>
            <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 900, margin: "0 0 3px" }}>{selected.e} {selected.name}</h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, margin: 0 }}>{selected.c} · {selected.p} · {selected.a}</p>
          </div>
          <div style={{ background: G.accent, color: "#fff", borderRadius: 12, padding: "8px 14px", textAlign: "center", flexShrink: 0 }}>
            <div style={{ fontWeight: 900, fontSize: 20 }}>{selected.score}%</div>
            <div style={{ fontSize: 10, opacity: 0.8 }}>match</div>
          </div>
        </div>
      </div>

      <div style={bodyStyle}>
        <div style={cardStyle}>
          <p style={{ color: G.text, fontSize: 13, fontStyle: "italic", margin: "0 0 6px", lineHeight: 1.6 }}>"{selected.n}"</p>
          <p style={{ color: G.muted, fontSize: 11, margin: 0 }}>⭐ {selected.r} · {selected.rv.toLocaleString()} Google reviews</p>
        </div>

        <div style={{ marginBottom: 14 }}>
          {selected.v.map(v => <Tag key={v} label={v} />)}
          {selected.d.map(d => <Tag key={d} label={d} yellow />)}
        </div>

        <div style={cardStyle}>
          <span style={lblStyle}>Right now</span>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {[[selected.w, "wait"], [selected.cr, "crowd"], [selected.h.split(",")[0], "hours"]].map(([val, lbl]) => (
              <div key={lbl} style={{ textAlign: "center" }}>
                <div style={{ fontWeight: 800, color: G.text, fontSize: 13, marginBottom: 2 }}>{val}</div>
                <div style={{ color: G.muted, fontSize: 10, textTransform: "uppercase", letterSpacing: 1 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Book button */}
        <button
          onClick={() => setShowBook(!showBook)}
          style={{ width: "100%", padding: "14px 0", borderRadius: 14, border: "none", background: G.dark, color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Georgia,serif", marginBottom: showBook ? 0 : 10 }}
        >
          {selected.resy ? "📅 Reserve a Table" : "📞 Contact & Directions"} {showBook ? "↑" : "↓"}
        </button>

        {showBook && (
          <div style={{ background: G.white, borderRadius: "0 0 14px 14px", padding: 18, boxShadow: "0 4px 12px rgba(0,0,0,0.08)", marginBottom: 10 }}>
            {[
              ["📍", "Address", selected.addr, `https://maps.google.com/?q=${encodeURIComponent(selected.addr)}`],
              ["📞", "Phone",   selected.ph,   selected.ph !== "N/A" ? `tel:${selected.ph}` : null],
              ["🕐", "Hours",   selected.h,    null],
            ].map(([ico, lbl, val, href]) => (
              <div key={lbl} style={{ display: "flex", alignItems: "flex-start", gap: 12, paddingBottom: 12, borderBottom: `1px solid ${G.bg}`, marginBottom: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: G.tagGreen, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>{ico}</div>
                <div>
                  <div style={{ fontSize: 11, color: G.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>{lbl}</div>
                  {href
                    ? <><a href={href} target="_blank" rel="noreferrer" style={{ fontWeight: 700, color: G.text, fontSize: 13, textDecoration: "none" }}>{val}</a>
                        {ico === "📍" && <><br /><a href={href} target="_blank" rel="noreferrer" style={{ color: G.accent, fontSize: 12, fontWeight: 600, textDecoration: "none" }}>Open in Maps →</a></>}</>
                    : <div style={{ fontWeight: 600, color: G.text, fontSize: 13 }}>{val}</div>}
                </div>
              </div>
            ))}
            {selected.resy && (
              <a href={`https://resy.com/cities/aus?query=${encodeURIComponent(selected.name)}`} target="_blank" rel="noreferrer"
                style={{ display: "block", width: "100%", padding: "13px 0", borderRadius: 12, background: G.accent, color: "#fff", fontSize: 14, fontWeight: 700, textAlign: "center", textDecoration: "none", boxSizing: "border-box" }}>
                Book on Resy →
              </a>
            )}
          </div>
        )}

        <OutlineBtn onClick={() => setScreen("bill")}>Split the bill 💸</OutlineBtn>
      </div>
    </div>
  );

  // ── BILL ────────────────────────────────────────────────
  if (screen === "bill") return (
    <BillSplitter
      selected={selected}
      members={members}
      myName={myName}
      onBack={() => setScreen("detail")}
      onDone={resetApp}
    />
  );

  return null;
}
