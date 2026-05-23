export type Team     = { id: string; name: string; short: string; color: string; crest?: string };
export type Standing = { pos: number; teamId: string; pj: number; g: number; e: number; p: number; gf: number; gc: number; dif: number; pts: number; zone: 'champions'|'europa'|'conference'|'descenso'|'playoff'|null };
export type Scorer   = { pos: number; name: string; teamId: string; goals: number };
export type DisciplineRow = { name: string; teamId: string; ta: number; tr: number };
export type Match    = { id: string; date: string; time: string; homeId: string; awayId: string; homeScore?: number; awayScore?: number; status: 'live'|'finished'|'upcoming'; minute?: number; leagueId: string; round?: string };
export type Zone     = { name: string; standings: Standing[] };
export type League   = { id: string; name: string; country: string; flag: string; logo?: string; champion?: string; teams: Team[]; standings?: Standing[]; zones?: Zone[]; scorers: Scorer[]; discipline: DisciplineRow[]; calendar: Match[] };

// ─── ARGENTINA — Torneo Apertura 2026 ─────────────────────────────────────────
// Formato: 30 equipos en Zona A y Zona B (15 c/u). 16 fechas. Top 8 → Playoffs.
// Apertura 2026: 22 ene – 24 may 2026 | Fecha 16/16 (casi terminada)
// ▲ Ascendidos 2026: Ind. Rivadavia (de B Nacional), Aldosivi (reasc.)
const argTeams: Team[] = [
  // ── Zona A ──
  { id:'estudiantes', name:'Estudiantes LP',          short:'EST', color:'#cc0000', crest:'/crests/arg/estudiantes.png'    },
  { id:'boca',        name:'Boca Juniors',            short:'BOC', color:'#003366', crest:'/crests/arg/boca.png'           },
  { id:'velez',       name:'Vélez Sársfield',         short:'VEL', color:'#003366', crest:'/crests/arg/velez.png'          },
  { id:'talleres',    name:'Talleres',                short:'TAL', color:'#003399', crest:'/crests/arg/talleres.png'       },
  { id:'indie',       name:'Independiente',           short:'IND', color:'#cc0000', crest:'/crests/arg/independiente.png'  },
  { id:'lanus',       name:'Lanús',                   short:'LAN', color:'#cc0000', crest:'/crests/arg/lanus.png'          },
  { id:'sanlorenzo',  name:'San Lorenzo',             short:'SLO', color:'#003399', crest:'/crests/arg/sanlorenzo.png'     },
  { id:'union',       name:'Unión',                   short:'UNI', color:'#cc0000', crest:'/crests/arg/union.png'          },
  { id:'instituto',   name:'Instituto',               short:'INS', color:'#cc0000', crest:'/crests/arg/instituto.png'      },
  { id:'defensa',     name:'Defensa y Justicia',      short:'DEF', color:'#ffcc00', crest:'/crests/arg/defensa.png'        },
  { id:'gimnasiamdz', name:'Gimnasia Mendoza',        short:'GMZ', color:'#006600', crest:'/crests/arg/gimnasiamendoza.png'},
  { id:'platense',    name:'Platense',                short:'PLA', color:'#003399', crest:'/crests/arg/platense.png'       },
  { id:'centralcba',  name:'Central Córdoba SdE',     short:'CCC', color:'#003399', crest:'/crests/arg/centralcordoba.png' },
  { id:'newells',     name:"Newell's Old Boys",       short:'NOB', color:'#cc0000', crest:'/crests/arg/newells.png'        },
  { id:'riestra',     name:'Deportivo Riestra',       short:'RIE', color:'#cc0000', crest:'/crests/arg/riestra.png'        },
  // ── Zona B ──
  { id:'indrivadavia',name:'Ind. Rivadavia',          short:'IRV', color:'#0000cc', crest:'/crests/arg/independienteriv.png'},
  { id:'river',       name:'River Plate',             short:'RIV', color:'#cc0000', crest:'/crests/arg/river.png'          },
  { id:'argentinos',  name:'Argentinos Juniors',      short:'ARG', color:'#cc0000', crest:'/crests/arg/argentinos.png'     },
  { id:'central',     name:'Rosario Central',         short:'CEN', color:'#ffcc00', crest:'/crests/arg/rosariocentral.png' },
  { id:'belgrano',    name:'Belgrano',                short:'BEL', color:'#003399', crest:'/crests/arg/belgrano.png'       },
  { id:'gimnasialp',  name:'Gimnasia LP',             short:'GIM', color:'#003399', crest:'/crests/arg/gimnasia.png'       },
  { id:'huracan',     name:'Huracán',                 short:'HUR', color:'#cc6600', crest:'/crests/arg/huracan.png'        },
  { id:'racing',      name:'Racing Club',             short:'RAC', color:'#3399ff', crest:'/crests/arg/racing.png'         },
  { id:'barracas',    name:'Barracas Central',        short:'BAR', color:'#cc0000', crest:'/crests/arg/barracas.png'       },
  { id:'tigre',       name:'Tigre',                   short:'TIG', color:'#cc6600', crest:'/crests/arg/tigre.png'          },
  { id:'sarmiento',   name:'Sarmiento',               short:'SAR', color:'#006600', crest:'/crests/arg/sarmiento.png'      },
  { id:'banfield',    name:'Banfield',                short:'BAN', color:'#006600', crest:'/crests/arg/banfield.png'       },
  { id:'atucuman',    name:'Atlético Tucumán',        short:'ATU', color:'#003399', crest:'/crests/arg/atleticotucuman.png'},
  { id:'aldosivi',    name:'Aldosivi',                short:'ALD', color:'#006600', crest:'/crests/arg/aldosivi.png'       },
  { id:'estrc',       name:'Est. Río Cuarto',         short:'ERC', color:'#cc0000', crest:'/crests/arg/estudiantesrc.png'  },
];

// Apertura 2026 — Zona A (fecha 16/16) · Top 8 clasifican a playoffs
const argZoneA: Standing[] = [
  { pos:1,  teamId:'estudiantes', pj:16, g:9,  e:4, p:3,  gf:19, gc:7,  dif:12,  pts:31, zone:'playoff' },
  { pos:2,  teamId:'boca',        pj:16, g:8,  e:6, p:2,  gf:22, gc:9,  dif:13,  pts:30, zone:'playoff' },
  { pos:3,  teamId:'velez',       pj:16, g:7,  e:7, p:2,  gf:18, gc:12, dif:6,   pts:28, zone:'playoff' },
  { pos:4,  teamId:'talleres',    pj:16, g:7,  e:5, p:4,  gf:17, gc:13, dif:4,   pts:26, zone:'playoff' },
  { pos:5,  teamId:'indie',       pj:16, g:6,  e:6, p:4,  gf:24, gc:20, dif:4,   pts:24, zone:'playoff' },
  { pos:6,  teamId:'lanus',       pj:16, g:6,  e:6, p:4,  gf:18, gc:15, dif:3,   pts:24, zone:'playoff' },
  { pos:7,  teamId:'sanlorenzo',  pj:16, g:5,  e:7, p:4,  gf:14, gc:14, dif:0,   pts:22, zone:'playoff' },
  { pos:8,  teamId:'union',       pj:16, g:5,  e:6, p:5,  gf:24, gc:20, dif:4,   pts:21, zone:'playoff' },
  { pos:9,  teamId:'instituto',   pj:16, g:6,  e:3, p:7,  gf:17, gc:17, dif:0,   pts:21, zone:null      },
  { pos:10, teamId:'defensa',     pj:16, g:4,  e:7, p:5,  gf:18, gc:21, dif:-3,  pts:19, zone:null      },
  { pos:11, teamId:'gimnasiamdz', pj:16, g:5,  e:4, p:7,  gf:14, gc:22, dif:-8,  pts:19, zone:null      },
  { pos:12, teamId:'platense',    pj:16, g:3,  e:7, p:6,  gf:10, gc:15, dif:-5,  pts:16, zone:null      },
  { pos:13, teamId:'centralcba',  pj:16, g:4,  e:4, p:8,  gf:11, gc:21, dif:-10, pts:16, zone:null      },
  { pos:14, teamId:'newells',     pj:16, g:3,  e:6, p:7,  gf:15, gc:27, dif:-12, pts:15, zone:null      },
  { pos:15, teamId:'riestra',     pj:16, g:1,  e:8, p:7,  gf:5,  gc:12, dif:-7,  pts:11, zone:null      },
];

// Apertura 2026 — Zona B (fecha 16/16) · Top 8 clasifican a playoffs
const argZoneB: Standing[] = [
  { pos:1,  teamId:'indrivadavia',pj:16, g:10, e:4, p:2,  gf:29, gc:15, dif:14,  pts:34, zone:'playoff' },
  { pos:2,  teamId:'river',       pj:16, g:9,  e:2, p:5,  gf:22, gc:12, dif:10,  pts:29, zone:'playoff' },
  { pos:3,  teamId:'argentinos',  pj:16, g:8,  e:5, p:3,  gf:17, gc:13, dif:4,   pts:29, zone:'playoff' },
  { pos:4,  teamId:'central',     pj:16, g:8,  e:4, p:4,  gf:20, gc:16, dif:4,   pts:28, zone:'playoff' },
  { pos:5,  teamId:'belgrano',    pj:16, g:7,  e:5, p:4,  gf:17, gc:13, dif:4,   pts:26, zone:'playoff' },
  { pos:6,  teamId:'gimnasialp',  pj:16, g:8,  e:2, p:6,  gf:19, gc:19, dif:0,   pts:26, zone:'playoff' },
  { pos:7,  teamId:'huracan',     pj:16, g:5,  e:7, p:4,  gf:17, gc:13, dif:4,   pts:22, zone:'playoff' },
  { pos:8,  teamId:'racing',      pj:16, g:5,  e:6, p:5,  gf:17, gc:15, dif:2,   pts:21, zone:'playoff' },
  { pos:9,  teamId:'barracas',    pj:16, g:5,  e:6, p:5,  gf:15, gc:15, dif:0,   pts:21, zone:null      },
  { pos:10, teamId:'tigre',       pj:16, g:4,  e:8, p:4,  gf:18, gc:15, dif:3,   pts:20, zone:null      },
  { pos:11, teamId:'sarmiento',   pj:16, g:6,  e:1, p:9,  gf:13, gc:20, dif:-7,  pts:19, zone:null      },
  { pos:12, teamId:'banfield',    pj:16, g:5,  e:3, p:8,  gf:17, gc:19, dif:-2,  pts:18, zone:null      },
  { pos:13, teamId:'atucuman',    pj:16, g:3,  e:5, p:8,  gf:15, gc:20, dif:-5,  pts:14, zone:null      },
  { pos:14, teamId:'aldosivi',    pj:16, g:0,  e:8, p:8,  gf:6,  gc:19, dif:-13, pts:8,  zone:null      },
  { pos:15, teamId:'estrc',       pj:16, g:1,  e:2, p:13, gf:5,  gc:24, dif:-19, pts:5,  zone:null      },
];

const argScorers: Scorer[] = [
  { pos:1, name:'G. Ávalos',     teamId:'indie',       goals:10 },
  { pos:2, name:'J. Caicedo',    teamId:'huracan',     goals:8  },
  { pos:3, name:'C. Tarragona',  teamId:'union',       goals:8  },
  { pos:4, name:'D. Romero',     teamId:'tigre',       goals:7  },
  { pos:5, name:'F. Sartori',    teamId:'indrivadavia',goals:7  },
  { pos:6, name:'M. Torres',     teamId:'gimnasialp',  goals:7  },
  { pos:7, name:'L. Briasco',    teamId:'huracan',     goals:6  },
  { pos:8, name:'J. Merentiel',  teamId:'boca',        goals:6  },
  { pos:9, name:'M. Juárez',     teamId:'belgrano',    goals:6  },
  { pos:10,name:'C. Alcaraz',    teamId:'central',     goals:5  },
];

const argDiscipline: DisciplineRow[] = [
  { name:'C. Valenzuela',  teamId:'sanlorenzo', ta:8, tr:1 },
  { name:'M. Ortiz',       teamId:'indie',      ta:7, tr:1 },
  { name:'J. Espínola',    teamId:'river',      ta:6, tr:1 },
  { name:'R. Bello',       teamId:'boca',       ta:6, tr:0 },
  { name:'F. Triverio',    teamId:'racing',     ta:7, tr:0 },
  { name:'D. García',      teamId:'gimnasialp', ta:5, tr:1 },
  { name:'N. Tripicchio',  teamId:'talleres',   ta:5, tr:0 },
  { name:'G. Blanco',      teamId:'velez',      ta:4, tr:1 },
];

// ─── PREMIER LEAGUE 2025-26 ───────────────────────────────────────────────────
// Arsenal CAMPEÓN (título n°14, primero desde 2004) — Arsenal 82 pts
// Jornada 37 de 38 — Descendidos: Wolverhampton + Burnley + West Ham United
// ▲ Ascendidos: Leeds United, Burnley, Sunderland (reemplazaron a Leicester, Ipswich, Southampton)
const plTeams: Team[] = [
  { id:'arsenal',    name:'Arsenal',             short:'ARS', color:'#cc0000', crest:'/crests/pl/arsenal.png'           },
  { id:'mancity',    name:'Manchester City',      short:'MCI', color:'#6699cc', crest:'/crests/pl/manchestercity.png'   },
  { id:'manutd',     name:'Manchester United',    short:'MNU', color:'#cc0000', crest:'/crests/pl/manchesterunited.png' },
  { id:'avilla',     name:'Aston Villa',          short:'AVL', color:'#7b003c', crest:'/crests/pl/astonvilla.png'       },
  { id:'liverpool',  name:'Liverpool',            short:'LIV', color:'#cc0000', crest:'/crests/pl/liverpool.png'        },
  { id:'bournem',    name:'Bournemouth',          short:'BOU', color:'#cc0000', crest:'/crests/pl/bournemouth.png'      },
  { id:'brighton',   name:'Brighton',             short:'BHA', color:'#0057b8', crest:'/crests/pl/brighton.png'         },
  { id:'chelsea',    name:'Chelsea',              short:'CHE', color:'#003399', crest:'/crests/pl/chelsea.png'          },
  { id:'brentford',  name:'Brentford',            short:'BRE', color:'#cc0000', crest:'/crests/pl/brentford.png'        },
  { id:'sunderland', name:'Sunderland',           short:'SUN', color:'#cc0000', crest:'/crests/pl/sunderland.png'       },
  { id:'newcastle',  name:'Newcastle United',     short:'NEW', color:'#000000', crest:'/crests/pl/newcastle.png'        },
  { id:'everton',    name:'Everton',              short:'EVE', color:'#003399', crest:'/crests/pl/everton.png'          },
  { id:'fulham',     name:'Fulham',               short:'FUL', color:'#cc0000', crest:'/crests/pl/fulham.png'           },
  { id:'leeds',      name:'Leeds United',         short:'LEE', color:'#ffff00', crest:'/crests/pl/leeds.png'            },
  { id:'palace',     name:'Crystal Palace',       short:'CRY', color:'#cc0000', crest:'/crests/pl/crystalpalace.png'    },
  { id:'forest',     name:'Nottingham Forest',    short:'NFO', color:'#cc0000', crest:'/crests/pl/nottingham_forest.png'},
  { id:'spurs',      name:'Tottenham Hotspur',    short:'TOT', color:'#001c58', crest:'/crests/pl/tottenham.png'        },
  { id:'westham',    name:'West Ham United',      short:'WHU', color:'#7d2c3b', crest:'/crests/pl/westham.png'          },
  { id:'wolves',     name:'Wolverhampton',        short:'WOL', color:'#fdb913', crest:'/crests/pl/wolves.png'           },
  { id:'burnley',    name:'Burnley',              short:'BUR', color:'#6b2737', crest:'/crests/pl/burnley.png'          },
];

const plStandings: Standing[] = [
  { pos:1,  teamId:'arsenal',   pj:37, g:25, e:7,  p:5,  gf:69, gc:26, dif:43,  pts:82, zone:'champions' },
  { pos:2,  teamId:'mancity',   pj:37, g:23, e:9,  p:5,  gf:76, gc:33, dif:43,  pts:78, zone:'champions' },
  { pos:3,  teamId:'manutd',    pj:37, g:19, e:11, p:7,  gf:66, gc:50, dif:16,  pts:68, zone:'champions' },
  { pos:4,  teamId:'avilla',    pj:37, g:18, e:8,  p:11, gf:54, gc:48, dif:6,   pts:62, zone:'champions' },
  { pos:5,  teamId:'liverpool', pj:37, g:17, e:8,  p:12, gf:62, gc:52, dif:10,  pts:59, zone:'europa'    },
  { pos:6,  teamId:'bournem',   pj:37, g:13, e:17, p:7,  gf:57, gc:53, dif:4,   pts:56, zone:'europa'    },
  { pos:7,  teamId:'brighton',  pj:37, g:14, e:11, p:12, gf:52, gc:43, dif:9,   pts:53, zone:'conference'},
  { pos:8,  teamId:'chelsea',   pj:37, g:14, e:10, p:13, gf:57, gc:50, dif:7,   pts:52, zone:'conference'},
  { pos:9,  teamId:'brentford', pj:37, g:14, e:10, p:13, gf:54, gc:51, dif:3,   pts:52, zone:null        },
  { pos:10, teamId:'sunderland',pj:37, g:13, e:12, p:12, gf:40, gc:47, dif:-7,  pts:51, zone:null        },
  { pos:11, teamId:'newcastle', pj:37, g:14, e:7,  p:16, gf:53, gc:53, dif:0,   pts:49, zone:null        },
  { pos:12, teamId:'everton',   pj:37, g:13, e:10, p:14, gf:47, gc:49, dif:-2,  pts:49, zone:null        },
  { pos:13, teamId:'fulham',    pj:37, g:14, e:7,  p:16, gf:45, gc:51, dif:-6,  pts:49, zone:null        },
  { pos:14, teamId:'leeds',     pj:37, g:11, e:14, p:12, gf:49, gc:53, dif:-4,  pts:47, zone:null        },
  { pos:15, teamId:'palace',    pj:37, g:11, e:12, p:14, gf:40, gc:49, dif:-9,  pts:45, zone:null        },
  { pos:16, teamId:'forest',    pj:37, g:11, e:10, p:16, gf:47, gc:50, dif:-3,  pts:43, zone:null        },
  { pos:17, teamId:'spurs',     pj:37, g:9,  e:11, p:17, gf:47, gc:57, dif:-10, pts:38, zone:null        },
  { pos:18, teamId:'westham',   pj:37, g:9,  e:9,  p:19, gf:43, gc:65, dif:-22, pts:36, zone:'descenso'  },
  { pos:19, teamId:'burnley',   pj:37, g:4,  e:9,  p:24, gf:37, gc:74, dif:-37, pts:21, zone:'descenso'  },
  { pos:20, teamId:'wolves',    pj:37, g:3,  e:10, p:24, gf:26, gc:67, dif:-41, pts:19, zone:'descenso'  },
];

const plScorers: Scorer[] = [
  { pos:1, name:'E. Haaland',      teamId:'mancity',   goals:27 },
  { pos:2, name:'I. Thiago',       teamId:'brentford', goals:22 },
  { pos:3, name:'A. Semenyo',      teamId:'bournem',   goals:16 },
  { pos:4, name:'J. Pedro',        teamId:'chelsea',   goals:15 },
  { pos:5, name:'D. Calvert-L.',   teamId:'leeds',     goals:14 },
  { pos:6, name:'M. Gibbs-White',  teamId:'forest',    goals:14 },
  { pos:7, name:'V. Gyökeres',     teamId:'arsenal',   goals:14 },
  { pos:8, name:'K. Havertz',      teamId:'arsenal',   goals:13 },
  { pos:9, name:'C. Palmer',       teamId:'chelsea',   goals:12 },
  { pos:10,name:'M. Salah',        teamId:'liverpool', goals:12 },
];

const plDiscipline: DisciplineRow[] = [
  { name:'K. Walker',        teamId:'mancity',   ta:9, tr:1 },
  { name:'M. Rashford',      teamId:'manutd',    ta:8, tr:1 },
  { name:'D. Rice',          teamId:'arsenal',   ta:7, tr:0 },
  { name:'T. Alexander-A.',  teamId:'liverpool', ta:7, tr:0 },
  { name:'C. Gallagher',     teamId:'avilla',    ta:6, tr:1 },
  { name:'T. Souček',        teamId:'westham',   ta:6, tr:0 },
  { name:'J. Tarkowski',     teamId:'everton',   ta:5, tr:1 },
  { name:'I. Toney',         teamId:'brentford', ta:5, tr:0 },
];

// ─── LA LIGA 2025-26 ──────────────────────────────────────────────────────────
// Barcelona CAMPEÓN — 29º título, certificado jornada 35 (derrotó a Real Madrid 2-0)
// Inicio: 15 ago 2025 — Final: 24 may 2026
// ▼ Descendidos 2024-25: Leganés, Cádiz, Granada
// ▲ Ascendidos: Real Oviedo, Levante UD, Elche CF
// ▼ Descendidos 2025-26: Girona, Mallorca, Real Oviedo
const llTeams: Team[] = [
  { id:'barcelona',    name:'Barcelona',             short:'FCB', color:'#cc0000', crest:'/crests/ll/barcelona.png'     },
  { id:'realmadrid',   name:'Real Madrid',           short:'RMA', color:'#003399', crest:'/crests/ll/realmadrid.png'    },
  { id:'villarreal',   name:'Villarreal',            short:'VIL', color:'#ffcc00', crest:'/crests/ll/villarreal.png'    },
  { id:'atletico',     name:'Atlético de Madrid',    short:'ATM', color:'#cc0000', crest:'/crests/ll/atlmadrid.png'     },
  { id:'betis',        name:'Real Betis',            short:'BET', color:'#006600', crest:'/crests/ll/betis.png'         },
  { id:'celta',        name:'Celta de Vigo',         short:'CEL', color:'#6699cc', crest:'/crests/ll/celta.png'         },
  { id:'getafe',       name:'Getafe',                short:'GET', color:'#003399', crest:'/crests/ll/getafe.png'        },
  { id:'rayo',         name:'Rayo Vallecano',        short:'RAY', color:'#cc0000', crest:'/crests/ll/rayovallecano.png' },
  { id:'valencia',     name:'Valencia',              short:'VAL', color:'#ff6600', crest:'/crests/ll/valencia.png'      },
  { id:'realsociedad', name:'Real Sociedad',         short:'RSO', color:'#003399', crest:'/crests/ll/realsociedad.png'  },
  { id:'espanyol',     name:'RCD Espanyol',          short:'ESP', color:'#003399', crest:'/crests/ll/espanyol.png'      },
  { id:'athletic',     name:'Athletic Club',         short:'ATH', color:'#cc0000', crest:'/crests/ll/athletic.png'      },
  { id:'sevilla',      name:'Sevilla',               short:'SEV', color:'#cc0000', crest:'/crests/ll/sevilla.png'       },
  { id:'alaves',       name:'Alavés',                short:'ALA', color:'#003399', crest:'/crests/ll/alaves.png'        },
  { id:'levante',      name:'Levante UD',            short:'LEV', color:'#cc0000', crest:'/crests/ll/levante.png'       },
  { id:'osasuna',      name:'Osasuna',               short:'OSA', color:'#cc0000', crest:'/crests/ll/osasuna.png'       },
  { id:'elche',        name:'Elche CF',              short:'ELC', color:'#006600', crest:'/crests/ll/elche.png'         },
  { id:'girona',       name:'Girona',                short:'GIR', color:'#cc0000', crest:'/crests/ll/girona.png'        },
  { id:'mallorca',     name:'Mallorca',              short:'MAL', color:'#cc0000', crest:'/crests/ll/mallorca.png'      },
  { id:'oviedo',       name:'Real Oviedo',           short:'OVI', color:'#003399', crest:'/crests/ll/realoviedo.png'    },
];

const llStandings: Standing[] = [
  { pos:1,  teamId:'barcelona',   pj:37, g:31, e:1,  p:5,  gf:94, gc:33, dif:61,  pts:94, zone:'champions' },
  { pos:2,  teamId:'realmadrid',  pj:37, g:26, e:5,  p:6,  gf:73, gc:33, dif:40,  pts:83, zone:'champions' },
  { pos:3,  teamId:'villarreal',  pj:37, g:21, e:6,  p:10, gf:67, gc:45, dif:22,  pts:69, zone:'champions' },
  { pos:4,  teamId:'atletico',    pj:37, g:21, e:6,  p:10, gf:61, gc:39, dif:22,  pts:69, zone:'champions' },
  { pos:5,  teamId:'betis',       pj:37, g:14, e:15, p:8,  gf:57, gc:47, dif:10,  pts:57, zone:'europa'    },
  { pos:6,  teamId:'celta',       pj:37, g:13, e:12, p:12, gf:52, gc:48, dif:4,   pts:51, zone:'europa'    },
  { pos:7,  teamId:'getafe',      pj:37, g:14, e:6,  p:17, gf:31, gc:38, dif:-7,  pts:48, zone:'conference'},
  { pos:8,  teamId:'rayo',        pj:37, g:11, e:14, p:12, gf:39, gc:43, dif:-4,  pts:47, zone:null        },
  { pos:9,  teamId:'valencia',    pj:37, g:12, e:10, p:15, gf:43, gc:54, dif:-11, pts:46, zone:null        },
  { pos:10, teamId:'realsociedad',pj:37, g:11, e:12, p:14, gf:58, gc:60, dif:-2,  pts:45, zone:null        },
  { pos:11, teamId:'espanyol',    pj:37, g:12, e:9,  p:16, gf:42, gc:54, dif:-12, pts:45, zone:null        },
  { pos:12, teamId:'athletic',    pj:37, g:13, e:6,  p:18, gf:41, gc:54, dif:-13, pts:45, zone:null        },
  { pos:13, teamId:'sevilla',     pj:37, g:12, e:7,  p:18, gf:46, gc:59, dif:-13, pts:43, zone:null        },
  { pos:14, teamId:'alaves',      pj:37, g:11, e:10, p:16, gf:43, gc:54, dif:-11, pts:43, zone:null        },
  { pos:15, teamId:'levante',     pj:37, g:11, e:9,  p:17, gf:46, gc:59, dif:-13, pts:42, zone:null        },
  { pos:16, teamId:'osasuna',     pj:37, g:11, e:9,  p:17, gf:44, gc:49, dif:-5,  pts:42, zone:null        },
  { pos:17, teamId:'elche',       pj:37, g:10, e:12, p:15, gf:48, gc:56, dif:-8,  pts:42, zone:null        },
  { pos:18, teamId:'girona',      pj:37, g:9,  e:13, p:15, gf:38, gc:54, dif:-16, pts:40, zone:'descenso'  },
  { pos:19, teamId:'mallorca',    pj:37, g:10, e:9,  p:18, gf:44, gc:57, dif:-13, pts:39, zone:'descenso'  },
  { pos:20, teamId:'oviedo',      pj:37, g:6,  e:11, p:20, gf:26, gc:57, dif:-31, pts:29, zone:'descenso'  },
];

const llScorers: Scorer[] = [
  { pos:1, name:'K. Mbappé',       teamId:'realmadrid',  goals:24 },
  { pos:2, name:'V. Muriqi',       teamId:'mallorca',    goals:22 },
  { pos:3, name:'A. Budimir',      teamId:'osasuna',     goals:17 },
  { pos:4, name:'R. Lewandowski',  teamId:'barcelona',   goals:15 },
  { pos:5, name:'L. Yamal',        teamId:'barcelona',   goals:14 },
  { pos:6, name:'A. Griezmann',    teamId:'atletico',    goals:13 },
  { pos:7, name:'M. Oyarzabal',    teamId:'realsociedad',goals:12 },
  { pos:8, name:'R. De Tomás',     teamId:'espanyol',    goals:11 },
  { pos:9, name:'I. Williams',     teamId:'athletic',    goals:10 },
  { pos:10,name:'V. Junior',       teamId:'realmadrid',  goals:10 },
];

const llDiscipline: DisciplineRow[] = [
  { name:'F. Valverde',   teamId:'realmadrid',   ta:9, tr:1 },
  { name:'M. de Jong',    teamId:'barcelona',    ta:8, tr:2 },
  { name:'K. Koundé',     teamId:'barcelona',    ta:8, tr:0 },
  { name:'R. Tapia',      teamId:'rayo',         ta:7, tr:1 },
  { name:'J. Mosquera',   teamId:'valencia',     ta:7, tr:0 },
  { name:'D. Parejo',     teamId:'villarreal',   ta:6, tr:1 },
  { name:'M. Hermoso',    teamId:'atletico',     ta:6, tr:0 },
  { name:'O. Baena',      teamId:'betis',        ta:5, tr:0 },
];

// ─── SERIE A 2025-26 ──────────────────────────────────────────────────────────
// Inter Milan CAMPEÓN (21º título) — certificado 3/5/2026 (victoria 2-0 vs Parma)
// Jornada 37 de 38
// ▼ Descendidos 2024-25: Venezia, Empoli, Monza
// ▲ Ascendidos: Sassuolo, Cremonese, Pisa
// ▼ Descendidos 2025-26: Cremonese, Hellas Verona, Pisa
const saTeams: Team[] = [
  { id:'inter',      name:'Inter Milan',   short:'INT', color:'#003399', crest:'/crests/sa/inter.png'       },
  { id:'napoli',     name:'Napoli',        short:'NAP', color:'#6699cc', crest:'/crests/sa/napoli.png'      },
  { id:'acmilan',    name:'AC Milan',      short:'MIL', color:'#cc0000', crest:'/crests/sa/milan.png'       },
  { id:'roma',       name:'Roma',          short:'ROM', color:'#cc6600', crest:'/crests/sa/roma.png'        },
  { id:'como',       name:'Como',          short:'COM', color:'#003399', crest:'/crests/sa/como.png'        },
  { id:'juventus',   name:'Juventus',      short:'JUV', color:'#000000', crest:'/crests/sa/juventus.png'    },
  { id:'atalanta',   name:'Atalanta',      short:'ATA', color:'#003399', crest:'/crests/sa/atalanta.png'    },
  { id:'bologna',    name:'Bologna',       short:'BOL', color:'#cc0000', crest:'/crests/sa/bologna.png'     },
  { id:'lazio',      name:'Lazio',         short:'LAZ', color:'#6699cc', crest:'/crests/sa/lazio.png'       },
  { id:'udinese',    name:'Udinese',       short:'UDI', color:'#000000', crest:'/crests/sa/udinese.png'     },
  { id:'sassuolo',   name:'Sassuolo',      short:'SAS', color:'#006600', crest:'/crests/sa/sassuolo.png'    },
  { id:'torino',     name:'Torino',        short:'TOR', color:'#7b003c', crest:'/crests/sa/torino.png'      },
  { id:'parma',      name:'Parma',         short:'PAR', color:'#ffcc00', crest:'/crests/sa/parma.png'       },
  { id:'genoa',      name:'Genoa',         short:'GEN', color:'#cc0000', crest:'/crests/sa/genoa.png'       },
  { id:'fiorentina', name:'Fiorentina',    short:'FIO', color:'#7b003c', crest:'/crests/sa/fiorentina.png'  },
  { id:'cagliari',   name:'Cagliari',      short:'CAG', color:'#cc0000', crest:'/crests/sa/cagliari.png'    },
  { id:'lecce',      name:'Lecce',         short:'LEC', color:'#ffcc00', crest:'/crests/sa/lecce.png'       },
  { id:'cremonese',  name:'Cremonese',     short:'CRE', color:'#cc0000', crest:'/crests/sa/cremonese.png'   },
  { id:'verona',     name:'Verona',        short:'VER', color:'#ffcc00', crest:'/crests/sa/hellasverona.png'},
  { id:'pisa',       name:'Pisa',          short:'PIS', color:'#000000', crest:'/crests/sa/pisa.png'        },
];

const saStandings: Standing[] = [
  { pos:1,  teamId:'inter',     pj:37, g:27, e:5,  p:5,  gf:86, gc:32, dif:54,  pts:86, zone:'champions' },
  { pos:2,  teamId:'napoli',    pj:37, g:22, e:7,  p:8,  gf:57, gc:36, dif:21,  pts:73, zone:'champions' },
  { pos:3,  teamId:'acmilan',   pj:37, g:20, e:10, p:7,  gf:52, gc:33, dif:19,  pts:70, zone:'champions' },
  { pos:4,  teamId:'roma',      pj:37, g:22, e:4,  p:11, gf:57, gc:31, dif:26,  pts:70, zone:'champions' },
  { pos:5,  teamId:'como',      pj:37, g:19, e:11, p:7,  gf:61, gc:28, dif:33,  pts:68, zone:'europa'    },
  { pos:6,  teamId:'juventus',  pj:37, g:19, e:11, p:7,  gf:59, gc:32, dif:27,  pts:68, zone:'europa'    },
  { pos:7,  teamId:'atalanta',  pj:37, g:15, e:13, p:9,  gf:50, gc:35, dif:15,  pts:58, zone:'conference'},
  { pos:8,  teamId:'bologna',   pj:37, g:16, e:7,  p:14, gf:46, gc:43, dif:3,   pts:55, zone:null        },
  { pos:9,  teamId:'lazio',     pj:37, g:13, e:12, p:12, gf:39, gc:39, dif:0,   pts:51, zone:null        },
  { pos:10, teamId:'udinese',   pj:37, g:14, e:8,  p:15, gf:45, gc:47, dif:-2,  pts:50, zone:null        },
  { pos:11, teamId:'sassuolo',  pj:37, g:14, e:7,  p:16, gf:46, gc:49, dif:-3,  pts:49, zone:null        },
  { pos:12, teamId:'torino',    pj:37, g:12, e:8,  p:17, gf:42, gc:61, dif:-19, pts:44, zone:null        },
  { pos:13, teamId:'parma',     pj:37, g:10, e:12, p:15, gf:27, gc:46, dif:-19, pts:42, zone:null        },
  { pos:14, teamId:'genoa',     pj:37, g:10, e:11, p:16, gf:41, gc:50, dif:-9,  pts:41, zone:null        },
  { pos:15, teamId:'fiorentina',pj:37, g:9,  e:14, p:14, gf:40, gc:49, dif:-9,  pts:41, zone:null        },
  { pos:16, teamId:'cagliari',  pj:37, g:10, e:10, p:17, gf:38, gc:52, dif:-14, pts:40, zone:null        },
  { pos:17, teamId:'lecce',     pj:37, g:9,  e:8,  p:20, gf:27, gc:50, dif:-23, pts:35, zone:null        },
  { pos:18, teamId:'cremonese', pj:37, g:8,  e:10, p:19, gf:31, gc:53, dif:-22, pts:34, zone:'descenso'  },
  { pos:19, teamId:'verona',    pj:37, g:3,  e:12, p:22, gf:25, gc:59, dif:-34, pts:21, zone:'descenso'  },
  { pos:20, teamId:'pisa',      pj:37, g:2,  e:12, p:23, gf:25, gc:69, dif:-44, pts:18, zone:'descenso'  },
];

const saScorers: Scorer[] = [
  { pos:1, name:'L. Martínez',     teamId:'inter',      goals:17 },
  { pos:2, name:'T. Douvikas',     teamId:'como',       goals:13 },
  { pos:3, name:'M. Thuram',       teamId:'inter',      goals:13 },
  { pos:4, name:'D. Malen',        teamId:'roma',       goals:13 },
  { pos:5, name:'N. Paz',          teamId:'como',       goals:12 },
  { pos:6, name:'V. Osimhen',      teamId:'napoli',     goals:11 },
  { pos:7, name:'D. Vlahovic',     teamId:'juventus',   goals:11 },
  { pos:8, name:'R. Leão',         teamId:'acmilan',    goals:10 },
  { pos:9, name:'G. Lookman',      teamId:'atalanta',   goals:10 },
  { pos:10,name:'P. Dybala',       teamId:'roma',       goals:9  },
];

const saDiscipline: DisciplineRow[] = [
  { name:'N. Barella',   teamId:'inter',    ta:10, tr:1 },
  { name:'A. Rabiot',    teamId:'juventus', ta:9,  tr:2 },
  { name:'T. Hernández', teamId:'acmilan',  ta:8,  tr:1 },
  { name:'M. Cataldi',   teamId:'lazio',    ta:7,  tr:1 },
  { name:'A. Tameze',    teamId:'verona',   ta:6,  tr:0 },
  { name:'B. Djimsiti',  teamId:'atalanta', ta:5,  tr:1 },
  { name:'G. Scamacca',  teamId:'atalanta', ta:5,  tr:0 },
  { name:'P. Zieliński', teamId:'inter',    ta:5,  tr:0 },
];

// ─── LIGUE 1 2025-26 ──────────────────────────────────────────────────────────
// 88ª edición — PSG CAMPEÓN (14º título) — 34 jornadas — Final: 17 may 2026
// PSG venció a Lens 2-0 en fecha 33 para certificar el título
// ▼ Descendidos 2024-25: Reims, Saint-Étienne, Montpellier
// ▲ Ascendidos: Lorient, Paris FC, Metz
// ▼ Descendidos 2025-26: Nantes, Metz | Playoff: Nice vs Saint-Étienne
const l1Teams: Team[] = [
  { id:'psg',        name:'Paris Saint-Germain', short:'PSG', color:'#003399', crest:'/crests/l1/psg.png'               },
  { id:'monaco',     name:'Monaco',              short:'ASM', color:'#cc0000', crest:'/crests/l1/monaco.png'            },
  { id:'nice',       name:'Nice',                short:'NIC', color:'#cc0000', crest:'/crests/l1/niza.png'              },
  { id:'marseille',  name:'Marseille',           short:'OM',  color:'#6699cc', crest:'/crests/l1/olimpiquemarsella.png' },
  { id:'lille',      name:'Lille',               short:'LIL', color:'#cc0000', crest:'/crests/l1/lille.png'             },
  { id:'lyon',       name:'Lyon',                short:'OL',  color:'#cc0000', crest:'/crests/l1/olympiquelyon.png'     },
  { id:'lens',       name:'Lens',                short:'LEN', color:'#ffcc00', crest:'/crests/l1/racinglens.png'        },
  { id:'rennes',     name:'Rennes',              short:'REN', color:'#cc0000', crest:'/crests/l1/rennais.png'           },
  { id:'brest',      name:'Brest',               short:'BRE', color:'#cc0000', crest:'/crests/l1/stadebretois.png'      },
  { id:'strasbourg', name:'Strasbourg',          short:'STR', color:'#003399', crest:'/crests/l1/racingetrasburgo.png'  },
  { id:'toulouse',   name:'Toulouse',            short:'TOU', color:'#7b003c', crest:'/crests/l1/toulouse.png'          },
  { id:'nantes',     name:'Nantes',              short:'NAN', color:'#ffcc00', crest:'/crests/l1/nantes.png'            },
  { id:'lehavre',    name:'Le Havre',            short:'HAV', color:'#003399', crest:'/crests/l1/havre.png'             },
  { id:'auxerre',    name:'Auxerre',             short:'AUX', color:'#003399', crest:'/crests/l1/auxerre.png'           },
  { id:'angers',     name:'Angers',              short:'ANG', color:'#000000', crest:'/crests/l1/angers.png'            },
  { id:'lorient',    name:'Lorient',             short:'LOR', color:'#ff6600', crest:'/crests/l1/lorient.png'           },
  { id:'parisfc',    name:'Paris FC',            short:'PFC', color:'#cc0000', crest:'/crests/l1/paris_fc.png'          },
  { id:'metz',       name:'Metz',                short:'MET', color:'#7b003c', crest:'/crests/l1/metz.png'              },
];

const l1Standings: Standing[] = [
  { pos:1,  teamId:'psg',       pj:34, g:24, e:4,  p:6,  gf:74, gc:29, dif:45,  pts:76, zone:'champions' },
  { pos:2,  teamId:'lens',      pj:34, g:22, e:4,  p:8,  gf:66, gc:35, dif:31,  pts:70, zone:'champions' },
  { pos:3,  teamId:'lille',     pj:34, g:18, e:7,  p:9,  gf:52, gc:37, dif:15,  pts:61, zone:'champions' },
  { pos:4,  teamId:'lyon',      pj:34, g:18, e:6,  p:10, gf:53, gc:40, dif:13,  pts:60, zone:'champions' },
  { pos:5,  teamId:'marseille', pj:34, g:18, e:5,  p:11, gf:63, gc:45, dif:18,  pts:59, zone:'europa'    },
  { pos:6,  teamId:'rennes',    pj:34, g:17, e:8,  p:9,  gf:59, gc:50, dif:9,   pts:59, zone:'conference'},
  { pos:7,  teamId:'monaco',    pj:34, g:16, e:6,  p:12, gf:60, gc:54, dif:6,   pts:54, zone:null        },
  { pos:8,  teamId:'strasbourg',pj:34, g:15, e:8,  p:11, gf:58, gc:47, dif:11,  pts:53, zone:null        },
  { pos:9,  teamId:'lorient',   pj:34, g:11, e:12, p:11, gf:48, gc:51, dif:-3,  pts:45, zone:null        },
  { pos:10, teamId:'toulouse',  pj:34, g:12, e:8,  p:13, gf:47, gc:46, dif:1,   pts:44, zone:null        },
  { pos:11, teamId:'parisfc',   pj:34, g:11, e:11, p:12, gf:47, gc:50, dif:-3,  pts:44, zone:null        },
  { pos:12, teamId:'brest',     pj:34, g:10, e:9,  p:15, gf:43, gc:55, dif:-12, pts:39, zone:null        },
  { pos:13, teamId:'angers',    pj:34, g:9,  e:9,  p:16, gf:29, gc:48, dif:-19, pts:36, zone:null        },
  { pos:14, teamId:'lehavre',   pj:34, g:7,  e:14, p:13, gf:32, gc:44, dif:-12, pts:35, zone:null        },
  { pos:15, teamId:'auxerre',   pj:34, g:8,  e:10, p:16, gf:34, gc:44, dif:-10, pts:34, zone:null        },
  { pos:16, teamId:'nice',      pj:34, g:7,  e:11, p:16, gf:37, gc:60, dif:-23, pts:32, zone:null        },
  { pos:17, teamId:'nantes',    pj:34, g:5,  e:8,  p:21, gf:29, gc:52, dif:-23, pts:23, zone:'descenso'  },
  { pos:18, teamId:'metz',      pj:34, g:3,  e:8,  p:23, gf:32, gc:76, dif:-44, pts:17, zone:'descenso'  },
];

const l1Scorers: Scorer[] = [
  { pos:1, name:'E. Lepaul',     teamId:'rennes',    goals:21 },
  { pos:2, name:'M. Greenwood',  teamId:'marseille', goals:16 },
  { pos:3, name:'F. Balogun',    teamId:'monaco',    goals:13 },
  { pos:4, name:'O. Édouard',    teamId:'lens',      goals:12 },
  { pos:5, name:'B. Barcola',    teamId:'psg',       goals:11 },
  { pos:6, name:'J. David',      teamId:'lille',     goals:10 },
  { pos:7, name:'A. Lacazette',  teamId:'lyon',      goals:9  },
  { pos:8, name:'L. Openda',     teamId:'lens',      goals:9  },
  { pos:9, name:'F. Laborde',    teamId:'rennes',    goals:8  },
  { pos:10,name:'G. Ramos',      teamId:'psg',       goals:8  },
];

const l1Discipline: DisciplineRow[] = [
  { name:'M. Verratti',  teamId:'psg',       ta:9, tr:2 },
  { name:'V. Rongier',   teamId:'marseille', ta:8, tr:1 },
  { name:'K. Camara',    teamId:'nice',      ta:8, tr:0 },
  { name:'J. Fofana',    teamId:'monaco',    ta:7, tr:0 },
  { name:'B. Koné',      teamId:'rennes',    ta:6, tr:1 },
  { name:'D. Sow',       teamId:'strasbourg',ta:6, tr:0 },
  { name:'F. Ouédraogo', teamId:'lens',      ta:5, tr:1 },
  { name:'C. Nkunku',    teamId:'lyon',      ta:5, tr:0 },
];

// ─── PRIMEIRA LIGA 2025-26 ───────────────────────────────────────────────────
// Porto CAMPEÓN con 88 pts — 34 jornadas — Temporada 2025-26 finalizada
// ▼ Descendidos al final de 2025-26: Estrela da Amadora, AVS, Tondela
// ▲ Ascendidos para 2025-26: Arouca, AVS, Alverca
const ptTeams: Team[] = [
  { id:'porto',     name:'FC Porto',              short:'POR', color:'#003399', crest:'/crests/pt/porto.png'      },
  { id:'sporting',  name:'Sporting CP',           short:'SCP', color:'#006600', crest:'/crests/pt/sporting.png'   },
  { id:'benfica',   name:'Benfica',               short:'SLB', color:'#cc0000', crest:'/crests/pt/benfica.png'    },
  { id:'braga',     name:'Braga',                 short:'BRG', color:'#cc0000', crest:'/crests/pt/braga.png'      },
  { id:'vitoria',   name:'Vitória Guimarães',     short:'VIT', color:'#000000', crest:'/crests/pt/vitoria.png'    },
  { id:'casapia',   name:'Casa Pia',              short:'CPA', color:'#003399', crest:'/crests/pt/casa_pia.png'   },
  { id:'rioave',    name:'Rio Ave',               short:'RAV', color:'#006600', crest:'/crests/pt/rioave.png'     },
  { id:'nacional',  name:'Nacional',              short:'NAC', color:'#000000', crest:'/crests/pt/nacional.png'   },
  { id:'famalicao', name:'Famalicão',             short:'FAM', color:'#003399', crest:'/crests/pt/famalicao.png'  },
  { id:'moreirense',name:'Moreirense',            short:'MOR', color:'#006600', crest:'/crests/pt/moreirense.png' },
  { id:'arouca',    name:'Arouca',                short:'ARO', color:'#006600', crest:'/crests/pt/arouca.png'     },
  { id:'estoril',   name:'Estoril',               short:'EPT', color:'#ffcc00', crest:'/crests/pt/estoril.png'    },
  { id:'santaclara',name:'Santa Clara',           short:'SCL', color:'#cc0000', crest:'/crests/pt/santaclara.png' },
  { id:'gilvc',     name:'Gil Vicente',           short:'GIL', color:'#000000', crest:'/crests/pt/gilvicente.png' },
  { id:'alverca',   name:'Alverca',               short:'ALV', color:'#cc0000', crest:'/crests/pt/alverca.png'    },
  { id:'estrela',   name:'Estrela da Amadora',    short:'ESM', color:'#cc0000', crest:'/crests/pt/estrella.png'   },
  { id:'avs',       name:'AVS',                   short:'AVS', color:'#003399', crest:'/crests/pt/avs.png'        },
  { id:'tondela',   name:'Tondela',               short:'TON', color:'#006600', crest:'/crests/pt/tondela.png'    },
];

const ptStandings: Standing[] = [
  { pos:1,  teamId:'porto',     pj:34, g:27, e:7,  p:0,  gf:82, gc:20, dif:62,  pts:88, zone:'champions' },
  { pos:2,  teamId:'benfica',   pj:34, g:24, e:10, p:0,  gf:78, gc:22, dif:56,  pts:82, zone:'champions' },
  { pos:3,  teamId:'sporting',  pj:34, g:23, e:6,  p:5,  gf:85, gc:33, dif:52,  pts:75, zone:'champions' },
  { pos:4,  teamId:'braga',     pj:34, g:17, e:7,  p:10, gf:56, gc:42, dif:14,  pts:58, zone:'europa'    },
  { pos:5,  teamId:'vitoria',   pj:34, g:14, e:9,  p:11, gf:48, gc:44, dif:4,   pts:51, zone:'conference'},
  { pos:6,  teamId:'casapia',   pj:34, g:13, e:8,  p:13, gf:44, gc:48, dif:-4,  pts:47, zone:null        },
  { pos:7,  teamId:'rioave',    pj:34, g:12, e:9,  p:13, gf:42, gc:47, dif:-5,  pts:45, zone:null        },
  { pos:8,  teamId:'nacional',  pj:34, g:11, e:8,  p:15, gf:40, gc:52, dif:-12, pts:41, zone:null        },
  { pos:9,  teamId:'moreirense',pj:34, g:11, e:6,  p:17, gf:38, gc:54, dif:-16, pts:39, zone:null        },
  { pos:10, teamId:'famalicao', pj:34, g:10, e:8,  p:16, gf:36, gc:50, dif:-14, pts:38, zone:null        },
  { pos:11, teamId:'estoril',   pj:34, g:10, e:7,  p:17, gf:38, gc:55, dif:-17, pts:37, zone:null        },
  { pos:12, teamId:'santaclara',pj:34, g:10, e:5,  p:19, gf:34, gc:58, dif:-24, pts:35, zone:null        },
  { pos:13, teamId:'gilvc',     pj:34, g:9,  e:6,  p:19, gf:32, gc:58, dif:-26, pts:33, zone:null        },
  { pos:14, teamId:'alverca',   pj:34, g:8,  e:7,  p:19, gf:30, gc:60, dif:-30, pts:31, zone:null        },
  { pos:15, teamId:'arouca',    pj:34, g:8,  e:5,  p:21, gf:28, gc:62, dif:-34, pts:29, zone:null        },
  { pos:16, teamId:'estrela',   pj:34, g:7,  e:6,  p:21, gf:26, gc:64, dif:-38, pts:27, zone:'descenso'  },
  { pos:17, teamId:'avs',       pj:34, g:5,  e:6,  p:23, gf:24, gc:70, dif:-46, pts:21, zone:'descenso'  },
  { pos:18, teamId:'tondela',   pj:34, g:4,  e:5,  p:25, gf:20, gc:76, dif:-56, pts:17, zone:'descenso'  },
];

const ptScorers: Scorer[] = [
  { pos:1, name:'L. Suárez',    teamId:'sporting', goals:28 },
  { pos:2, name:'Pavlidis',     teamId:'benfica',  goals:22 },
  { pos:3, name:'Begraoui',     teamId:'estoril',  goals:20 },
  { pos:4, name:'R. Horta',     teamId:'braga',    goals:16 },
  { pos:5, name:'E. Conceição', teamId:'porto',    goals:14 },
  { pos:6, name:'A. Silva',     teamId:'vitoria',  goals:12 },
  { pos:7, name:'F. Amdouni',   teamId:'benfica',  goals:11 },
  { pos:8, name:'S. Gyökeres',  teamId:'sporting', goals:10 },
  { pos:9, name:'C. Borges',    teamId:'vitoria',  goals:9  },
  { pos:10,name:'M. Evanilson', teamId:'porto',    goals:8  },
];

const ptDiscipline: DisciplineRow[] = [
  { name:'O. Otávio',    teamId:'porto',    ta:9, tr:1 },
  { name:'J. Weigl',     teamId:'benfica',  ta:8, tr:1 },
  { name:'P. Gonçalves', teamId:'sporting', ta:7, tr:0 },
  { name:'A. Musrati',   teamId:'braga',    ta:7, tr:0 },
  { name:'D. Ferreira',  teamId:'porto',    ta:6, tr:0 },
  { name:'S. Ugarte',    teamId:'sporting', ta:5, tr:1 },
  { name:'F. Tavares',   teamId:'arouca',   ta:5, tr:0 },
  { name:'R. Mota',      teamId:'benfica',  ta:4, tr:1 },
];

// ─── PARTIDOS — semana 22-24 mayo 2026 (datos reales vía API) ────────────────
// Los partidos de PL · La Liga · Serie A · Ligue 1 se actualizan en vivo desde
// Football-Data.org. Este array sirve de referencia para ARG/PT y como fallback.
export const allMatches: Match[] = [
  // ── Serie A — Jornada 38 (hoy + mañana) ─────────────────────────────────
  { id:'sa-w1', leagueId:'sa', date:'2026-05-22', time:'18:45', homeId:'fiorentina', awayId:'atalanta',  status:'upcoming' },
  { id:'sa-w2', leagueId:'sa', date:'2026-05-23', time:'16:00', homeId:'bologna',    awayId:'inter',     status:'upcoming' },
  { id:'sa-w3', leagueId:'sa', date:'2026-05-23', time:'18:45', homeId:'lazio',      awayId:'pisa',      status:'upcoming' },
  { id:'sa-w4', leagueId:'sa', date:'2026-05-24', time:'13:00', homeId:'parma',      awayId:'sassuolo',  status:'upcoming' },
  { id:'sa-w5', leagueId:'sa', date:'2026-05-24', time:'16:00', homeId:'napoli',     awayId:'udinese',   status:'upcoming' },
  { id:'sa-w6', leagueId:'sa', date:'2026-05-24', time:'18:45', homeId:'acmilan',    awayId:'cagliari',  status:'upcoming' },
  { id:'sa-w7', leagueId:'sa', date:'2026-05-24', time:'18:45', homeId:'torino',     awayId:'juventus',  status:'upcoming' },
  { id:'sa-w8', leagueId:'sa', date:'2026-05-24', time:'18:45', homeId:'verona',     awayId:'roma',      status:'upcoming' },
  { id:'sa-w9', leagueId:'sa', date:'2026-05-24', time:'18:45', homeId:'cremonese',  awayId:'como',      status:'upcoming' },
  { id:'sa-w10',leagueId:'sa', date:'2026-05-24', time:'18:45', homeId:'lecce',      awayId:'genoa',     status:'upcoming' },
  // ── La Liga — Jornada 38 (mañana) ────────────────────────────────────────
  { id:'ll-w1', leagueId:'ll', date:'2026-05-23', time:'19:00', homeId:'alaves',     awayId:'rayo',      status:'upcoming' },
  { id:'ll-w2', leagueId:'ll', date:'2026-05-23', time:'19:00', homeId:'betis',      awayId:'levante',   status:'upcoming' },
  { id:'ll-w3', leagueId:'ll', date:'2026-05-23', time:'19:00', homeId:'celta',      awayId:'sevilla',   status:'upcoming' },
  { id:'ll-w4', leagueId:'ll', date:'2026-05-23', time:'19:00', homeId:'espanyol',   awayId:'realsociedad',status:'upcoming' },
  { id:'ll-w5', leagueId:'ll', date:'2026-05-23', time:'19:00', homeId:'getafe',     awayId:'osasuna',   status:'upcoming' },
  { id:'ll-w6', leagueId:'ll', date:'2026-05-23', time:'19:00', homeId:'mallorca',   awayId:'oviedo',    status:'upcoming' },
  { id:'ll-w7', leagueId:'ll', date:'2026-05-23', time:'19:00', homeId:'realmadrid', awayId:'athletic',  status:'upcoming' },
  { id:'ll-w8', leagueId:'ll', date:'2026-05-23', time:'19:00', homeId:'valencia',   awayId:'barcelona', status:'upcoming' },
  { id:'ll-w9', leagueId:'ll', date:'2026-05-23', time:'19:00', homeId:'girona',     awayId:'elche',     status:'upcoming' },
  { id:'ll-w10',leagueId:'ll', date:'2026-05-24', time:'19:00', homeId:'villarreal', awayId:'atletico',  status:'upcoming' },
  // ── Premier League — Jornada 38 (domingo) ────────────────────────────────
  { id:'pl-w1', leagueId:'pl', date:'2026-05-24', time:'15:00', homeId:'sunderland', awayId:'chelsea',   status:'upcoming' },
  { id:'pl-w2', leagueId:'pl', date:'2026-05-24', time:'15:00', homeId:'brighton',   awayId:'manutd',    status:'upcoming' },
  { id:'pl-w3', leagueId:'pl', date:'2026-05-24', time:'15:00', homeId:'palace',     awayId:'arsenal',   status:'upcoming' },
  { id:'pl-w4', leagueId:'pl', date:'2026-05-24', time:'15:00', homeId:'burnley',    awayId:'wolves',    status:'upcoming' },
  { id:'pl-w5', leagueId:'pl', date:'2026-05-24', time:'15:00', homeId:'fulham',     awayId:'newcastle', status:'upcoming' },
  { id:'pl-w6', leagueId:'pl', date:'2026-05-24', time:'15:00', homeId:'liverpool',  awayId:'brentford', status:'upcoming' },
  { id:'pl-w7', leagueId:'pl', date:'2026-05-24', time:'15:00', homeId:'mancity',    awayId:'avilla',    status:'upcoming' },
  { id:'pl-w8', leagueId:'pl', date:'2026-05-24', time:'15:00', homeId:'forest',     awayId:'bournem',   status:'upcoming' },
  { id:'pl-w9', leagueId:'pl', date:'2026-05-24', time:'15:00', homeId:'spurs',      awayId:'everton',   status:'upcoming' },
  { id:'pl-w10',leagueId:'pl', date:'2026-05-24', time:'15:00', homeId:'westham',    awayId:'leeds',     status:'upcoming' },
  // ── Argentina — Final Apertura 2026 ──────────────────────────────────────
  { id:'arg-w1',leagueId:'arg', date:'2026-05-24', time:'15:30', homeId:'river',     awayId:'belgrano',  status:'upcoming' },
  // ── Resultados recientes (última jornada) ─────────────────────────────────
  // PL Jornada 37
  { id:'pl-r1', leagueId:'pl', date:'2026-05-15', time:'15:00', homeId:'avilla',     awayId:'liverpool',  homeScore:4, awayScore:2, status:'finished' },
  { id:'pl-r2', leagueId:'pl', date:'2026-05-17', time:'15:00', homeId:'manutd',     awayId:'forest',     homeScore:3, awayScore:2, status:'finished' },
  { id:'pl-r3', leagueId:'pl', date:'2026-05-19', time:'15:00', homeId:'chelsea',    awayId:'spurs',      homeScore:2, awayScore:1, status:'finished' },
  // La Liga Jornada 37
  { id:'ll-r1', leagueId:'ll', date:'2026-05-17', time:'19:00', homeId:'barcelona',  awayId:'betis',      homeScore:3, awayScore:1, status:'finished' },
  { id:'ll-r2', leagueId:'ll', date:'2026-05-17', time:'19:00', homeId:'sevilla',    awayId:'realmadrid', homeScore:0, awayScore:1, status:'finished' },
  { id:'ll-r3', leagueId:'ll', date:'2026-05-17', time:'19:00', homeId:'atletico',   awayId:'girona',     homeScore:1, awayScore:0, status:'finished' },
  // Serie A Jornada 37
  { id:'sa-r1', leagueId:'sa', date:'2026-05-17', time:'18:45', homeId:'roma',       awayId:'lazio',      homeScore:2, awayScore:0, status:'finished' },
  { id:'sa-r2', leagueId:'sa', date:'2026-05-17', time:'18:45', homeId:'juventus',   awayId:'fiorentina', homeScore:0, awayScore:2, status:'finished' },
  { id:'sa-r3', leagueId:'sa', date:'2026-05-17', time:'18:45', homeId:'atalanta',   awayId:'bologna',    homeScore:0, awayScore:1, status:'finished' },
  // Ligue 1 Jornada 34 (ÚLTIMA — temporada finalizada)
  { id:'l1-r1', leagueId:'l1', date:'2026-05-17', time:'19:00', homeId:'marseille',  awayId:'rennes',     homeScore:3, awayScore:1, status:'finished' },
  { id:'l1-r2', leagueId:'l1', date:'2026-05-17', time:'19:00', homeId:'parisfc',    awayId:'psg',        homeScore:2, awayScore:1, status:'finished' },
  { id:'l1-r3', leagueId:'l1', date:'2026-05-17', time:'19:00', homeId:'strasbourg', awayId:'monaco',     homeScore:5, awayScore:4, status:'finished' },
];

// ─── ARGENTINA — Calendario completo Apertura 2026 ───────────────────────────
// Helper compacto para crear partidos argentinos
function argM(i: string, r: string, d: string, h: string, a: string, hs?: number, aw?: number, t = '20:00'): Match {
  return { id:`a-${i}`, leagueId:'arg', round:r, date:d, time:t, homeId:h, awayId:a, homeScore:hs, awayScore:aw, status: hs!==undefined ? 'finished' : 'upcoming' };
}
export const argCalendar: Match[] = [
  // ── Fecha 1 — 22-25 ene ──────────────────────────────────────────────────
  argM('1-1','Fecha 1','2026-01-22','union','platense',0,0),
  argM('1-2','Fecha 1','2026-01-22','centralcba','gimnasiamdz',0,1),
  argM('1-3','Fecha 1','2026-01-23','instituto','velez',0,1),
  argM('1-4','Fecha 1','2026-01-23','sanlorenzo','lanus',2,3),
  argM('1-5','Fecha 1','2026-01-24','indie','estudiantes',1,1),
  argM('1-6','Fecha 1','2026-01-24','talleres','newells',2,1),
  argM('1-7','Fecha 1','2026-01-25','boca','riestra',1,0),
  argM('1-8','Fecha 1','2026-01-22','banfield','huracan',1,1),
  argM('1-9','Fecha 1','2026-01-23','indrivadavia','atucuman',2,1),
  argM('1-10','Fecha 1','2026-01-23','barracas','river',0,1),
  argM('1-11','Fecha 1','2026-01-24','gimnasialp','racing',2,1),
  argM('1-12','Fecha 1','2026-01-24','central','belgrano',1,2),
  argM('1-13','Fecha 1','2026-01-25','tigre','estrc',2,0),
  argM('1-14','Fecha 1','2026-01-25','argentinos','sarmiento',1,0),
  argM('1-15','Fecha 1','2026-01-22','aldosivi','defensa',0,0),
  // ── Fecha 2 — 26-29 ene ──────────────────────────────────────────────────
  argM('2-1','Fecha 2','2026-01-26','platense','instituto',2,1),
  argM('2-2','Fecha 2','2026-01-26','velez','talleres',2,1),
  argM('2-3','Fecha 2','2026-01-27','gimnasiamdz','sanlorenzo',0,1),
  argM('2-4','Fecha 2','2026-01-27','newells','indie',1,1),
  argM('2-5','Fecha 2','2026-01-28','estudiantes','boca',2,1),
  argM('2-6','Fecha 2','2026-01-28','riestra','defensa',0,1),
  argM('2-7','Fecha 2','2026-01-29','lanus','union',2,1),
  argM('2-8','Fecha 2','2026-01-26','huracan','indrivadavia',1,2),
  argM('2-9','Fecha 2','2026-01-26','aldosivi','barracas',0,0),
  argM('2-10','Fecha 2','2026-01-27','racing','central',1,2),
  argM('2-11','Fecha 2','2026-01-28','river','gimnasialp',2,0),
  argM('2-12','Fecha 2','2026-01-28','belgrano','tigre',1,1),
  argM('2-13','Fecha 2','2026-01-29','estrc','argentinos',0,0),
  argM('2-14','Fecha 2','2026-01-29','sarmiento','banfield',1,0),
  argM('2-15','Fecha 2','2026-01-27','atucuman','centralcba',0,0),
  // ── Fecha 3 — 31 ene-3 feb ───────────────────────────────────────────────
  argM('3-1','Fecha 3','2026-01-31','sanlorenzo','centralcba',1,0),
  argM('3-2','Fecha 3','2026-01-31','indie','velez',1,1),
  argM('3-3','Fecha 3','2026-02-01','talleres','platense',1,2),
  argM('3-4','Fecha 3','2026-02-01','boca','newells',2,0),
  argM('3-5','Fecha 3','2026-02-02','defensa','estudiantes',0,0),
  argM('3-6','Fecha 3','2026-02-02','union','gimnasiamdz',4,0),
  argM('3-7','Fecha 3','2026-02-03','instituto','lanus',2,2),
  argM('3-8','Fecha 3','2026-01-31','atucuman','huracan',1,1),
  argM('3-9','Fecha 3','2026-02-01','central','river',0,0),
  argM('3-10','Fecha 3','2026-02-01','gimnasialp','aldosivi',3,1),
  argM('3-11','Fecha 3','2026-02-02','tigre','racing',3,1),
  argM('3-12','Fecha 3','2026-02-02','argentinos','belgrano',0,0),
  argM('3-13','Fecha 3','2026-02-03','banfield','estrc',2,1),
  argM('3-14','Fecha 3','2026-02-03','indrivadavia','sarmiento',2,1),
  argM('3-15','Fecha 3','2026-02-01','barracas','riestra',1,1),
  // ── Fecha 4 — 6-9 feb ────────────────────────────────────────────────────
  argM('4-1','Fecha 4','2026-02-06','centralcba','union',1,0),
  argM('4-2','Fecha 4','2026-02-06','newells','defensa',2,3),
  argM('4-3','Fecha 4','2026-02-07','platense','indie',0,1),
  argM('4-4','Fecha 4','2026-02-07','gimnasiamdz','instituto',1,0),
  argM('4-5','Fecha 4','2026-02-08','velez','boca',2,1),
  argM('4-6','Fecha 4','2026-02-08','estudiantes','riestra',1,0),
  argM('4-7','Fecha 4','2026-02-09','lanus','talleres',1,1),
  argM('4-8','Fecha 4','2026-02-06','aldosivi','central',1,1),
  argM('4-9','Fecha 4','2026-02-07','racing','argentinos',2,1),
  argM('4-10','Fecha 4','2026-02-07','river','tigre',1,4),
  argM('4-11','Fecha 4','2026-02-08','belgrano','banfield',1,0),
  argM('4-12','Fecha 4','2026-02-08','sarmiento','atucuman',2,1),
  argM('4-13','Fecha 4','2026-02-09','barracas','gimnasialp',2,0),
  argM('4-14','Fecha 4','2026-02-09','estrc','indrivadavia',0,1),
  argM('4-15','Fecha 4','2026-02-07','huracan','sanlorenzo',1,0),
  // ── Fecha 5 — 12-16 feb ──────────────────────────────────────────────────
  argM('5-1','Fecha 5','2026-02-12','indie','lanus',2,0),
  argM('5-2','Fecha 5','2026-02-12','defensa','velez',1,1),
  argM('5-3','Fecha 5','2026-02-13','union','sanlorenzo',0,0),
  argM('5-4','Fecha 5','2026-02-13','talleres','gimnasiamdz',2,1),
  argM('5-5','Fecha 5','2026-02-14','boca','platense',0,0),
  argM('5-6','Fecha 5','2026-02-14','instituto','centralcba',2,0),
  argM('5-7','Fecha 5','2026-02-15','riestra','newells',1,1),
  argM('5-8','Fecha 5','2026-02-12','tigre','aldosivi',1,0),
  argM('5-9','Fecha 5','2026-02-13','argentinos','river',1,0),
  argM('5-10','Fecha 5','2026-02-13','banfield','racing',0,2),
  argM('5-11','Fecha 5','2026-02-14','huracan','sarmiento',1,0),
  argM('5-12','Fecha 5','2026-02-14','atucuman','estrc',4,0),
  argM('5-13','Fecha 5','2026-02-15','indrivadavia','belgrano',0,1),
  argM('5-14','Fecha 5','2026-02-15','central','barracas',2,0),
  argM('5-15','Fecha 5','2026-02-13','gimnasialp','estudiantes',0,0),
  // ── Fecha 6 — Interzonal Especial 19-22 mar ──────────────────────────────
  argM('6-1','Fecha 6','2026-03-19','defensa','belgrano',1,1),
  argM('6-2','Fecha 6','2026-03-19','sanlorenzo','estrc',2,0),
  argM('6-3','Fecha 6','2026-03-20','indrivadavia','indie',3,2),
  argM('6-4','Fecha 6','2026-03-20','instituto','atucuman',2,1),
  argM('6-5','Fecha 6','2026-03-20','estudiantes','sarmiento',1,0),
  argM('6-6','Fecha 6','2026-03-21','boca','racing',0,0),
  argM('6-7','Fecha 6','2026-03-21','gimnasiamdz','gimnasialp',0,1),
  argM('6-8','Fecha 6','2026-03-21','central','talleres',0,1),
  argM('6-9','Fecha 6','2026-03-22','platense','barracas',1,0),
  argM('6-10','Fecha 6','2026-03-22','riestra','huracan',0,0),
  argM('6-11','Fecha 6','2026-03-22','banfield','newells',3,0),
  argM('6-12','Fecha 6','2026-03-19','centralcba','tigre',0,0),
  argM('6-13','Fecha 6','2026-03-20','velez','river',1,0),
  argM('6-14','Fecha 6','2026-03-21','union','aldosivi',1,0),
  argM('6-15','Fecha 6','2026-03-22','argentinos','lanus',2,1),
  // ── Fecha 7 — 24-27 feb ──────────────────────────────────────────────────
  argM('7-1','Fecha 7','2026-02-24','platense','defensa',0,0),
  argM('7-2','Fecha 7','2026-02-24','sanlorenzo','instituto',1,1),
  argM('7-3','Fecha 7','2026-02-25','centralcba','talleres',2,0),
  argM('7-4','Fecha 7','2026-02-25','gimnasiamdz','indie',1,1),
  argM('7-5','Fecha 7','2026-02-26','velez','riestra',0,0),
  argM('7-6','Fecha 7','2026-02-26','newells','estudiantes',0,2),
  argM('7-7','Fecha 7','2026-02-27','lanus','boca',0,3),
  argM('7-8','Fecha 7','2026-02-24','belgrano','atucuman',3,1),
  argM('7-9','Fecha 7','2026-02-25','barracas','tigre',2,1),
  argM('7-10','Fecha 7','2026-02-25','gimnasialp','central',1,2),
  argM('7-11','Fecha 7','2026-02-26','racing','indrivadavia',1,1),
  argM('7-12','Fecha 7','2026-02-26','estrc','huracan',2,0),
  argM('7-13','Fecha 7','2026-02-27','river','banfield',3,1),
  argM('7-14','Fecha 7','2026-02-27','aldosivi','argentinos',0,2),
  argM('7-15','Fecha 7','2026-02-25','sarmiento','union',1,3),
  // ── Fecha 8 — 28 feb-3 mar ───────────────────────────────────────────────
  argM('8-1','Fecha 8','2026-02-28','boca','gimnasiamdz',1,1),
  argM('8-2','Fecha 8','2026-02-28','indie','centralcba',2,0),
  argM('8-3','Fecha 8','2026-03-01','talleres','sanlorenzo',0,0),
  argM('8-4','Fecha 8','2026-03-01','instituto','union',1,2),
  argM('8-5','Fecha 8','2026-03-02','defensa','lanus',1,1),
  argM('8-6','Fecha 8','2026-03-02','riestra','platense',0,0),
  argM('8-7','Fecha 8','2026-03-03','estudiantes','velez',0,1),
  argM('8-8','Fecha 8','2026-02-28','argentinos','barracas',1,1),
  argM('8-9','Fecha 8','2026-03-01','tigre','gimnasialp',2,2),
  argM('8-10','Fecha 8','2026-03-01','banfield','aldosivi',2,0),
  argM('8-11','Fecha 8','2026-03-02','indrivadavia','river',1,1),
  argM('8-12','Fecha 8','2026-03-02','sarmiento','estrc',1,0),
  argM('8-13','Fecha 8','2026-03-03','huracan','belgrano',3,1),
  argM('8-14','Fecha 8','2026-03-03','atucuman','racing',0,3),
  argM('8-15','Fecha 8','2026-03-01','newells','central',0,2),
  // ── Fecha 9 — 5-8 mar ────────────────────────────────────────────────────
  argM('9-1','Fecha 9','2026-03-05','lanus','riestra',0,0),
  argM('9-2','Fecha 9','2026-03-05','centralcba','boca',1,2),
  argM('9-3','Fecha 9','2026-03-06','sanlorenzo','indie',1,2),
  argM('9-4','Fecha 9','2026-03-06','union','talleres',1,1),
  argM('9-5','Fecha 9','2026-03-07','platense','estudiantes',0,2),
  argM('9-6','Fecha 9','2026-03-07','gimnasiamdz','defensa',2,1),
  argM('9-7','Fecha 9','2026-03-08','velez','newells',1,1),
  argM('9-8','Fecha 9','2026-03-05','barracas','banfield',1,2),
  argM('9-9','Fecha 9','2026-03-05','aldosivi','indrivadavia',1,1),
  argM('9-10','Fecha 9','2026-03-06','central','tigre',1,1),
  argM('9-11','Fecha 9','2026-03-07','racing','huracan',0,0),
  argM('9-12','Fecha 9','2026-03-07','gimnasialp','argentinos',2,0),
  argM('9-13','Fecha 9','2026-03-08','belgrano','sarmiento',4,0),
  argM('9-14','Fecha 9','2026-03-08','river','atucuman',0,1),
  argM('9-15','Fecha 9','2026-03-06','estrc','instituto',0,2),
  // ── Fecha 10 — 10-13 mar ─────────────────────────────────────────────────
  argM('10-1','Fecha 10','2026-03-10','indie','union',4,4),
  argM('10-2','Fecha 10','2026-03-10','newells','platense',1,1),
  argM('10-3','Fecha 10','2026-03-11','boca','sanlorenzo',1,1),
  argM('10-4','Fecha 10','2026-03-11','riestra','gimnasiamdz',0,0),
  argM('10-5','Fecha 10','2026-03-12','defensa','centralcba',1,1),
  argM('10-6','Fecha 10','2026-03-12','talleres','instituto',2,0),
  argM('10-7','Fecha 10','2026-03-13','estudiantes','lanus',0,1),
  argM('10-8','Fecha 10','2026-03-10','sarmiento','racing',0,0),
  argM('10-9','Fecha 10','2026-03-11','banfield','gimnasialp',1,2),
  argM('10-10','Fecha 10','2026-03-11','argentinos','central',0,0),
  argM('10-11','Fecha 10','2026-03-12','indrivadavia','barracas',1,2),
  argM('10-12','Fecha 10','2026-03-12','atucuman','aldosivi',1,1),
  argM('10-13','Fecha 10','2026-03-13','estrc','belgrano',0,1),
  argM('10-14','Fecha 10','2026-03-13','huracan','river',1,2),
  argM('10-15','Fecha 10','2026-03-11','tigre','velez',1,1),
  // ── Fecha 11 — 14-17 mar ─────────────────────────────────────────────────
  argM('11-1','Fecha 11','2026-03-14','platense','velez',0,2),
  argM('11-2','Fecha 11','2026-03-14','union','boca',1,1),
  argM('11-3','Fecha 11','2026-03-15','sanlorenzo','defensa',2,5),
  argM('11-4','Fecha 11','2026-03-15','instituto','indie',2,1),
  argM('11-5','Fecha 11','2026-03-16','lanus','newells',5,0),
  argM('11-6','Fecha 11','2026-03-16','centralcba','riestra',1,0),
  argM('11-7','Fecha 11','2026-03-17','gimnasiamdz','estudiantes',1,2),
  argM('11-8','Fecha 11','2026-03-14','central','banfield',2,1),
  argM('11-9','Fecha 11','2026-03-15','gimnasialp','indrivadavia',2,3),
  argM('11-10','Fecha 11','2026-03-15','river','sarmiento',2,0),
  argM('11-11','Fecha 11','2026-03-16','tigre','argentinos',1,1),
  argM('11-12','Fecha 11','2026-03-16','barracas','atucuman',2,1),
  argM('11-13','Fecha 11','2026-03-17','aldosivi','huracan',0,0),
  argM('11-14','Fecha 11','2026-03-17','racing','estrc',2,0),
  argM('11-15','Fecha 11','2026-03-15','belgrano','talleres',0,0),
  // ── Fecha 12 — 20-25 mar ─────────────────────────────────────────────────
  argM('12-1','Fecha 12','2026-03-20','velez','lanus',0,1),
  argM('12-2','Fecha 12','2026-03-20','newells','gimnasiamdz',1,0),
  argM('12-3','Fecha 12','2026-03-21','defensa','union',2,0),
  argM('12-4','Fecha 12','2026-03-21','indie','talleres',1,2),
  argM('12-5','Fecha 12','2026-03-22','boca','instituto',2,0),
  argM('12-6','Fecha 12','2026-03-22','estudiantes','centralcba',5,0),
  argM('12-7','Fecha 12','2026-03-23','riestra','sanlorenzo',1,1),
  argM('12-8','Fecha 12','2026-03-20','banfield','tigre',1,0),
  argM('12-9','Fecha 12','2026-03-21','atucuman','gimnasialp',1,0),
  argM('12-10','Fecha 12','2026-03-22','belgrano','racing',1,2),
  argM('12-11','Fecha 12','2026-03-22','sarmiento','aldosivi',2,0),
  argM('12-12','Fecha 12','2026-03-23','estrc','river',0,2),
  argM('12-13','Fecha 12','2026-03-24','indrivadavia','central',2,0),
  argM('12-14','Fecha 12','2026-03-25','huracan','barracas',0,0),
  argM('12-15','Fecha 12','2026-03-21','argentinos','platense',1,0),
  // ── Fecha 13 — 1-6 abr ───────────────────────────────────────────────────
  argM('13-1','Fecha 13','2026-04-01','lanus','platense',0,0),
  argM('13-2','Fecha 13','2026-04-01','talleres','boca',0,1),
  argM('13-3','Fecha 13','2026-04-02','gimnasiamdz','velez',3,2),
  argM('13-4','Fecha 13','2026-04-02','union','riestra',2,0),
  argM('13-5','Fecha 13','2026-04-03','sanlorenzo','estudiantes',1,0),
  argM('13-6','Fecha 13','2026-04-03','centralcba','newells',1,3),
  argM('13-7','Fecha 13','2026-04-04','instituto','defensa',2,0),
  argM('13-8','Fecha 13','2026-04-01','barracas','sarmiento',1,2),
  argM('13-9','Fecha 13','2026-04-02','tigre','indrivadavia',0,2),
  argM('13-10','Fecha 13','2026-04-03','aldosivi','estrc',0,0),
  argM('13-11','Fecha 13','2026-04-04','central','atucuman',2,1),
  argM('13-12','Fecha 13','2026-04-04','gimnasialp','huracan',0,3),
  argM('13-13','Fecha 13','2026-04-05','river','belgrano',3,0),
  argM('13-14','Fecha 13','2026-04-05','argentinos','banfield',3,2),
  argM('13-15','Fecha 13','2026-04-03','indie','racing',1,0),
  // ── Fecha 14 — 10-13 abr ─────────────────────────────────────────────────
  argM('14-1','Fecha 14','2026-04-10','riestra','instituto',0,1),
  argM('14-2','Fecha 14','2026-04-10','estudiantes','union',2,1),
  argM('14-3','Fecha 14','2026-04-11','boca','indie',1,1),
  argM('14-4','Fecha 14','2026-04-11','newells','sanlorenzo',0,0),
  argM('14-5','Fecha 14','2026-04-12','platense','gimnasiamdz',1,1),
  argM('14-6','Fecha 14','2026-04-12','defensa','talleres',1,2),
  argM('14-7','Fecha 14','2026-04-13','velez','centralcba',1,0),
  argM('14-8','Fecha 14','2026-04-10','belgrano','aldosivi',1,0),
  argM('14-9','Fecha 14','2026-04-11','indrivadavia','argentinos',3,1),
  argM('14-10','Fecha 14','2026-04-11','estrc','barracas',1,2),
  argM('14-11','Fecha 14','2026-04-12','atucuman','tigre',0,0),
  argM('14-12','Fecha 14','2026-04-12','huracan','central',3,1),
  argM('14-13','Fecha 14','2026-04-13','racing','river',0,2),
  argM('14-14','Fecha 14','2026-04-13','sarmiento','gimnasialp',1,2),
  argM('14-15','Fecha 14','2026-04-11','lanus','banfield',1,0),
  // ── Fecha 15 — 17-20 abr ─────────────────────────────────────────────────
  argM('15-1','Fecha 15','2026-04-17','union','newells',2,3),
  argM('15-2','Fecha 15','2026-04-17','instituto','estudiantes',0,1),
  argM('15-3','Fecha 15','2026-04-18','indie','defensa',3,1),
  argM('15-4','Fecha 15','2026-04-18','talleres','riestra',2,0),
  argM('15-5','Fecha 15','2026-04-19','centralcba','platense',4,3),
  argM('15-6','Fecha 15','2026-04-19','sanlorenzo','velez',0,0),
  argM('15-7','Fecha 15','2026-04-20','gimnasiamdz','lanus',1,0),
  argM('15-8','Fecha 15','2026-04-17','gimnasialp','estrc',1,0),
  argM('15-9','Fecha 15','2026-04-18','argentinos','atucuman',1,0),
  argM('15-10','Fecha 15','2026-04-18','aldosivi','racing',1,1),
  argM('15-11','Fecha 15','2026-04-19','central','sarmiento',2,1),
  argM('15-12','Fecha 15','2026-04-19','barracas','belgrano',0,0),
  argM('15-13','Fecha 15','2026-04-20','banfield','indrivadavia',0,0),
  argM('15-14','Fecha 15','2026-04-20','tigre','huracan',1,1),
  argM('15-15','Fecha 15','2026-04-18','river','boca',0,1),
  // ── Fecha 16 — 23-27 abr ─────────────────────────────────────────────────
  argM('16-1','Fecha 16','2026-04-23','defensa','boca',0,4),
  argM('16-2','Fecha 16','2026-04-23','riestra','indie',2,0),
  argM('16-3','Fecha 16','2026-04-24','lanus','centralcba',0,0),
  argM('16-4','Fecha 16','2026-04-24','platense','sanlorenzo',0,1),
  argM('16-5','Fecha 16','2026-04-25','estudiantes','talleres',0,0),
  argM('16-6','Fecha 16','2026-04-26','newells','instituto',1,1),
  argM('16-7','Fecha 16','2026-04-27','velez','union',2,2),
  argM('16-8','Fecha 16','2026-04-23','estrc','central',1,2),
  argM('16-9','Fecha 16','2026-04-24','racing','barracas',1,1),
  argM('16-10','Fecha 16','2026-04-24','sarmiento','tigre',1,0),
  argM('16-11','Fecha 16','2026-04-25','river','aldosivi',3,1),
  argM('16-12','Fecha 16','2026-04-26','belgrano','gimnasialp',0,1),
  argM('16-13','Fecha 16','2026-04-26','atucuman','banfield',1,1),
  argM('16-14','Fecha 16','2026-04-27','huracan','argentinos',1,2),
  argM('16-15','Fecha 16','2026-04-24','indrivadavia','gimnasiamdz',5,1),
  // ── Octavos de Final — 3-9 may ────────────────────────────────────────────
  argM('oct-1','Octavos de Final','2026-05-03','estudiantes','racing',0,1),
  argM('oct-2','Octavos de Final','2026-05-04','boca','huracan',2,3),
  argM('oct-3','Octavos de Final','2026-05-04','velez','gimnasialp',0,1),
  argM('oct-4','Octavos de Final','2026-05-03','talleres','belgrano',0,1),
  argM('oct-5','Octavos de Final','2026-05-07','indrivadavia','union',1,2),
  argM('oct-6','Octavos de Final','2026-05-07','river','sanlorenzo',2,2),
  argM('oct-7','Octavos de Final','2026-05-08','argentinos','lanus',2,0),
  argM('oct-8','Octavos de Final','2026-05-09','central','indie',3,1),
  // ── Cuartos de Final — 12-13 may ─────────────────────────────────────────
  argM('qf-1','Cuartos de Final','2026-05-12','belgrano','union',2,0),
  argM('qf-2','Cuartos de Final','2026-05-12','argentinos','huracan',1,0),
  argM('qf-3','Cuartos de Final','2026-05-13','central','racing',2,1),
  argM('qf-4','Cuartos de Final','2026-05-13','river','gimnasialp',2,0),
  // ── Semifinales — 16-17 may ───────────────────────────────────────────────
  argM('sf-1','Semifinales','2026-05-16','river','central',1,0),
  argM('sf-2','Semifinales','2026-05-17','argentinos','belgrano',1,1),
  // ── FINAL — 24 may · Estadio Kempes, Córdoba ──────────────────────────────
  argM('final','Final','2026-05-24','river','belgrano',undefined,undefined,'15:30'),
];

// ─── CALENDARIOS EUROPEOS — datos reales Football-Data.org ───────────────────
// Helpers compactos (igual que argM). Scores undefined → status 'upcoming'
function plM(i:string,r:string,d:string,h:string,a:string,hs?:number,aw?:number,t='15:00'):Match {
  return { id:`pl-${i}`,leagueId:'pl',round:r,date:d,time:t,homeId:h,awayId:a,homeScore:hs,awayScore:aw,status:hs!==undefined?'finished':'upcoming' };
}
function llM(i:string,r:string,d:string,h:string,a:string,hs?:number,aw?:number,t='19:00'):Match {
  return { id:`ll-${i}`,leagueId:'ll',round:r,date:d,time:t,homeId:h,awayId:a,homeScore:hs,awayScore:aw,status:hs!==undefined?'finished':'upcoming' };
}
function saM(i:string,r:string,d:string,h:string,a:string,hs?:number,aw?:number,t='20:45'):Match {
  return { id:`sa-${i}`,leagueId:'sa',round:r,date:d,time:t,homeId:h,awayId:a,homeScore:hs,awayScore:aw,status:hs!==undefined?'finished':'upcoming' };
}
function l1M(i:string,r:string,d:string,h:string,a:string,hs?:number,aw?:number,t='20:00'):Match {
  return { id:`l1-${i}`,leagueId:'l1',round:r,date:d,time:t,homeId:h,awayId:a,homeScore:hs,awayScore:aw,status:hs!==undefined?'finished':'upcoming' };
}

// ── PREMIER LEAGUE — Jornadas 34-38 ─────────────────────────────────────────
export const plCalendar: Match[] = [
  // ── Jornada 34 — 21-27 abr ───────────────────────────────────────────────
  plM('34-1','Jornada 34','2026-04-21','brighton','chelsea',3,0,'16:30'),
  plM('34-2','Jornada 34','2026-04-22','bournem','leeds',2,2),
  plM('34-3','Jornada 34','2026-04-22','burnley','mancity',0,1),
  plM('34-4','Jornada 34','2026-04-24','sunderland','forest',0,5),
  plM('34-5','Jornada 34','2026-04-25','fulham','avilla',1,0),
  plM('34-6','Jornada 34','2026-04-25','liverpool','palace',3,1),
  plM('34-7','Jornada 34','2026-04-25','westham','everton',2,1),
  plM('34-8','Jornada 34','2026-04-25','wolves','spurs',0,1),
  plM('34-9','Jornada 34','2026-04-25','arsenal','newcastle',1,0),
  plM('34-10','Jornada 34','2026-04-27','manutd','brentford',2,1),
  // ── Jornada 35 — 1-4 may ─────────────────────────────────────────────────
  plM('35-1','Jornada 35','2026-05-01','leeds','burnley',3,1),
  plM('35-2','Jornada 35','2026-05-02','brentford','westham',3,0),
  plM('35-3','Jornada 35','2026-05-02','newcastle','brighton',3,1),
  plM('35-4','Jornada 35','2026-05-02','wolves','sunderland',1,1),
  plM('35-5','Jornada 35','2026-05-02','arsenal','fulham',3,0),
  plM('35-6','Jornada 35','2026-05-03','bournem','palace',3,0),
  plM('35-7','Jornada 35','2026-05-03','manutd','liverpool',3,2),
  plM('35-8','Jornada 35','2026-05-03','avilla','spurs',1,2),
  plM('35-9','Jornada 35','2026-05-04','chelsea','forest',1,3),
  plM('35-10','Jornada 35','2026-05-04','everton','mancity',3,3),
  // ── Jornada 36 — 9-11 may ────────────────────────────────────────────────
  plM('36-1','Jornada 36','2026-05-09','liverpool','chelsea',1,1),
  plM('36-2','Jornada 36','2026-05-09','sunderland','manutd',0,0),
  plM('36-3','Jornada 36','2026-05-09','brighton','wolves',3,0),
  plM('36-4','Jornada 36','2026-05-09','fulham','bournem',0,1),
  plM('36-5','Jornada 36','2026-05-09','mancity','brentford',3,0),
  plM('36-6','Jornada 36','2026-05-10','palace','everton',2,2),
  plM('36-7','Jornada 36','2026-05-10','burnley','avilla',2,2),
  plM('36-8','Jornada 36','2026-05-10','forest','newcastle',1,1),
  plM('36-9','Jornada 36','2026-05-10','westham','arsenal',0,1),
  plM('36-10','Jornada 36','2026-05-11','spurs','leeds',1,1),
  // ── Jornada 37 — 15-19 may ───────────────────────────────────────────────
  plM('37-1','Jornada 37','2026-05-15','avilla','liverpool',4,2),
  plM('37-2','Jornada 37','2026-05-17','manutd','forest',3,2),
  plM('37-3','Jornada 37','2026-05-17','brentford','palace',2,2),
  plM('37-4','Jornada 37','2026-05-17','everton','sunderland',1,3),
  plM('37-5','Jornada 37','2026-05-17','leeds','brighton',1,0),
  plM('37-6','Jornada 37','2026-05-17','wolves','fulham',1,1),
  plM('37-7','Jornada 37','2026-05-17','newcastle','westham',3,1),
  plM('37-8','Jornada 37','2026-05-18','arsenal','burnley',1,0),
  plM('37-9','Jornada 37','2026-05-19','bournem','mancity',1,1),
  plM('37-10','Jornada 37','2026-05-19','chelsea','spurs',2,1),
  // ── Jornada 38 — 24 may · JORNADA FINAL ─────────────────────────────────
  plM('38-1','Jornada 38','2026-05-24','sunderland','chelsea'),
  plM('38-2','Jornada 38','2026-05-24','brighton','manutd'),
  plM('38-3','Jornada 38','2026-05-24','palace','arsenal'),
  plM('38-4','Jornada 38','2026-05-24','burnley','wolves'),
  plM('38-5','Jornada 38','2026-05-24','fulham','newcastle'),
  plM('38-6','Jornada 38','2026-05-24','liverpool','brentford'),
  plM('38-7','Jornada 38','2026-05-24','mancity','avilla'),
  plM('38-8','Jornada 38','2026-05-24','forest','bournem'),
  plM('38-9','Jornada 38','2026-05-24','spurs','everton'),
  plM('38-10','Jornada 38','2026-05-24','westham','leeds'),
];

// ── LA LIGA — Jornadas 34-38 ─────────────────────────────────────────────────
export const llCalendar: Match[] = [
  // ── Jornada 34 — 1-4 may ─────────────────────────────────────────────────
  llM('34-1','Jornada 34','2026-05-01','girona','mallorca',0,1,'17:00'),
  llM('34-2','Jornada 34','2026-05-02','villarreal','levante',5,1),
  llM('34-3','Jornada 34','2026-05-02','valencia','atletico',0,2),
  llM('34-4','Jornada 34','2026-05-02','alaves','athletic',2,4),
  llM('34-5','Jornada 34','2026-05-02','osasuna','barcelona',1,2,'16:15'),
  llM('34-6','Jornada 34','2026-05-03','celta','elche',3,1),
  llM('34-7','Jornada 34','2026-05-03','getafe','rayo',0,2),
  llM('34-8','Jornada 34','2026-05-03','betis','oviedo',3,0),
  llM('34-9','Jornada 34','2026-05-03','espanyol','realmadrid',0,2),
  llM('34-10','Jornada 34','2026-05-04','sevilla','realsociedad',1,0),
  // ── Jornada 35 — 8-11 may · Barcelona CAMPEÓN ───────────────────────────
  llM('35-1','Jornada 35','2026-05-08','levante','osasuna',3,2),
  llM('35-2','Jornada 35','2026-05-09','elche','alaves',1,1),
  llM('35-3','Jornada 35','2026-05-09','sevilla','espanyol',2,1),
  llM('35-4','Jornada 35','2026-05-09','atletico','celta',0,1),
  llM('35-5','Jornada 35','2026-05-09','realsociedad','betis',2,2),
  llM('35-6','Jornada 35','2026-05-10','mallorca','villarreal',1,1),
  llM('35-7','Jornada 35','2026-05-10','athletic','valencia',0,1),
  llM('35-8','Jornada 35','2026-05-10','oviedo','getafe',0,0),
  llM('35-9','Jornada 35','2026-05-10','barcelona','realmadrid',2,0), // 🏆 CAMPEÓN
  llM('35-10','Jornada 35','2026-05-11','rayo','girona',1,1),
  // ── Jornada 36 — 12-14 may ───────────────────────────────────────────────
  llM('36-1','Jornada 36','2026-05-12','celta','levante',2,3),
  llM('36-2','Jornada 36','2026-05-12','betis','elche',2,1),
  llM('36-3','Jornada 36','2026-05-12','osasuna','atletico',1,2),
  llM('36-4','Jornada 36','2026-05-13','espanyol','athletic',2,0),
  llM('36-5','Jornada 36','2026-05-13','villarreal','sevilla',2,3),
  llM('36-6','Jornada 36','2026-05-13','alaves','barcelona',1,0),
  llM('36-7','Jornada 36','2026-05-13','getafe','mallorca',3,1),
  llM('36-8','Jornada 36','2026-05-14','valencia','rayo',1,1),
  llM('36-9','Jornada 36','2026-05-14','girona','realsociedad',1,1),
  llM('36-10','Jornada 36','2026-05-14','realmadrid','oviedo',2,0),
  // ── Jornada 37 — 17 may ──────────────────────────────────────────────────
  llM('37-1','Jornada 37','2026-05-17','athletic','celta',1,1),
  llM('37-2','Jornada 37','2026-05-17','atletico','girona',1,0),
  llM('37-3','Jornada 37','2026-05-17','elche','getafe',1,0),
  llM('37-4','Jornada 37','2026-05-17','levante','mallorca',2,0),
  llM('37-5','Jornada 37','2026-05-17','rayo','villarreal',2,0),
  llM('37-6','Jornada 37','2026-05-17','realsociedad','valencia',3,4),
  llM('37-7','Jornada 37','2026-05-17','oviedo','alaves',0,1),
  llM('37-8','Jornada 37','2026-05-17','osasuna','espanyol',1,2),
  llM('37-9','Jornada 37','2026-05-17','sevilla','realmadrid',0,1),
  llM('37-10','Jornada 37','2026-05-17','barcelona','betis',3,1),
  // ── Jornada 38 — 23-24 may · JORNADA FINAL ───────────────────────────────
  llM('38-1','Jornada 38','2026-05-23','alaves','rayo'),
  llM('38-2','Jornada 38','2026-05-23','betis','levante'),
  llM('38-3','Jornada 38','2026-05-23','celta','sevilla'),
  llM('38-4','Jornada 38','2026-05-23','espanyol','realsociedad'),
  llM('38-5','Jornada 38','2026-05-23','getafe','osasuna'),
  llM('38-6','Jornada 38','2026-05-23','mallorca','oviedo'),
  llM('38-7','Jornada 38','2026-05-23','realmadrid','athletic'),
  llM('38-8','Jornada 38','2026-05-23','valencia','barcelona'),
  llM('38-9','Jornada 38','2026-05-23','girona','elche'),
  llM('38-10','Jornada 38','2026-05-24','villarreal','atletico'),
];

// ── SERIE A — Jornadas 34-38 ─────────────────────────────────────────────────
export const saCalendar: Match[] = [
  // ── Jornada 34 — 24-27 abr ───────────────────────────────────────────────
  saM('34-1','Jornada 34','2026-04-24','napoli','cremonese',4,0),
  saM('34-2','Jornada 34','2026-04-25','parma','pisa',1,0),
  saM('34-3','Jornada 34','2026-04-25','bologna','roma',0,2),
  saM('34-4','Jornada 34','2026-04-25','verona','lecce',0,0),
  saM('34-5','Jornada 34','2026-04-26','fiorentina','sassuolo',0,0),
  saM('34-6','Jornada 34','2026-04-26','genoa','como',0,2),
  saM('34-7','Jornada 34','2026-04-26','torino','inter',2,2),
  saM('34-8','Jornada 34','2026-04-26','acmilan','juventus',0,0),
  saM('34-9','Jornada 34','2026-04-27','cagliari','atalanta',3,2),
  saM('34-10','Jornada 34','2026-04-27','lazio','udinese',3,3),
  // ── Jornada 35 — 1-4 may · Inter CAMPEÓN ────────────────────────────────
  saM('35-1','Jornada 35','2026-05-01','pisa','lecce',1,2),
  saM('35-2','Jornada 35','2026-05-02','udinese','torino',2,0),
  saM('35-3','Jornada 35','2026-05-02','como','napoli',0,0),
  saM('35-4','Jornada 35','2026-05-02','atalanta','genoa',0,0),
  saM('35-5','Jornada 35','2026-05-03','bologna','cagliari',0,0),
  saM('35-6','Jornada 35','2026-05-03','sassuolo','acmilan',2,0),
  saM('35-7','Jornada 35','2026-05-03','juventus','verona',1,1),
  saM('35-8','Jornada 35','2026-05-03','inter','parma',2,0), // 🏆 CAMPEÓN
  saM('35-9','Jornada 35','2026-05-04','cremonese','lazio',1,2),
  saM('35-10','Jornada 35','2026-05-04','roma','fiorentina',4,0),
  // ── Jornada 36 — 8-11 may ────────────────────────────────────────────────
  saM('36-1','Jornada 36','2026-05-08','torino','sassuolo',2,1),
  saM('36-2','Jornada 36','2026-05-09','cagliari','udinese',0,2),
  saM('36-3','Jornada 36','2026-05-09','lazio','inter',0,3),
  saM('36-4','Jornada 36','2026-05-09','lecce','juventus',0,1),
  saM('36-5','Jornada 36','2026-05-10','verona','como',0,1),
  saM('36-6','Jornada 36','2026-05-10','fiorentina','genoa',0,0),
  saM('36-7','Jornada 36','2026-05-10','cremonese','pisa',3,0),
  saM('36-8','Jornada 36','2026-05-10','parma','roma',2,3),
  saM('36-9','Jornada 36','2026-05-10','acmilan','atalanta',2,3),
  saM('36-10','Jornada 36','2026-05-11','napoli','bologna',2,3),
  // ── Jornada 37 — 17 may ──────────────────────────────────────────────────
  saM('37-1','Jornada 37','2026-05-17','roma','lazio',2,0),
  saM('37-2','Jornada 37','2026-05-17','genoa','acmilan',1,2),
  saM('37-3','Jornada 37','2026-05-17','como','parma',1,0),
  saM('37-4','Jornada 37','2026-05-17','juventus','fiorentina',0,2),
  saM('37-5','Jornada 37','2026-05-17','pisa','napoli',0,3),
  saM('37-6','Jornada 37','2026-05-17','inter','verona',1,1),
  saM('37-7','Jornada 37','2026-05-17','atalanta','bologna',0,1),
  saM('37-8','Jornada 37','2026-05-17','cagliari','torino',2,1),
  saM('37-9','Jornada 37','2026-05-17','sassuolo','lecce',2,3),
  saM('37-10','Jornada 37','2026-05-17','udinese','cremonese',0,1),
  // ── Jornada 38 — 22-24 may · JORNADA FINAL ───────────────────────────────
  saM('38-1','Jornada 38','2026-05-22','fiorentina','atalanta',undefined,undefined,'18:45'),
  saM('38-2','Jornada 38','2026-05-23','bologna','inter',undefined,undefined,'16:00'),
  saM('38-3','Jornada 38','2026-05-23','lazio','pisa',undefined,undefined,'18:45'),
  saM('38-4','Jornada 38','2026-05-24','parma','sassuolo',undefined,undefined,'13:00'),
  saM('38-5','Jornada 38','2026-05-24','napoli','udinese',undefined,undefined,'16:00'),
  saM('38-6','Jornada 38','2026-05-24','acmilan','cagliari'),
  saM('38-7','Jornada 38','2026-05-24','torino','juventus'),
  saM('38-8','Jornada 38','2026-05-24','verona','roma'),
  saM('38-9','Jornada 38','2026-05-24','cremonese','como'),
  saM('38-10','Jornada 38','2026-05-24','lecce','genoa'),
];

// ── LIGUE 1 — Jornadas 31-34 (temporada finalizada) ─────────────────────────
export const l1Calendar: Match[] = [
  // ── Jornada 31 — 24-26 abr ───────────────────────────────────────────────
  l1M('31-1','Jornada 31','2026-04-24','brest','lens',3,3),
  l1M('31-2','Jornada 31','2026-04-25','lyon','auxerre',3,2),
  l1M('31-3','Jornada 31','2026-04-25','angers','psg',0,3),
  l1M('31-4','Jornada 31','2026-04-25','toulouse','monaco',2,2),
  l1M('31-5','Jornada 31','2026-04-26','lorient','strasbourg',2,3),
  l1M('31-6','Jornada 31','2026-04-26','lehavre','metz',4,4),
  l1M('31-7','Jornada 31','2026-04-26','parisfc','lille',0,1),
  l1M('31-8','Jornada 31','2026-04-26','rennes','nantes',2,1),
  l1M('31-9','Jornada 31','2026-04-26','marseille','nice',1,1),
  // ── Jornada 32 — 2-3 may ─────────────────────────────────────────────────
  l1M('32-1','Jornada 32','2026-05-02','nantes','marseille',3,0),
  l1M('32-2','Jornada 32','2026-05-02','psg','lorient',2,2),
  l1M('32-3','Jornada 32','2026-05-02','metz','monaco',1,2),
  l1M('32-4','Jornada 32','2026-05-02','nice','lens',1,1),
  l1M('32-5','Jornada 32','2026-05-03','lille','lehavre',1,1),
  l1M('32-6','Jornada 32','2026-05-03','auxerre','angers',3,1),
  l1M('32-7','Jornada 32','2026-05-03','parisfc','brest',4,0),
  l1M('32-8','Jornada 32','2026-05-03','strasbourg','toulouse',1,2),
  l1M('32-9','Jornada 32','2026-05-03','lyon','rennes',4,2),
  // ── Jornada 33 — 8-10 may · PSG certifica el título ─────────────────────
  l1M('33-1','Jornada 33','2026-05-08','lens','nantes',1,0),
  l1M('33-2','Jornada 33','2026-05-10','lehavre','marseille',0,1),
  l1M('33-3','Jornada 33','2026-05-10','auxerre','nice',2,1),
  l1M('33-4','Jornada 33','2026-05-10','monaco','lille',0,1),
  l1M('33-5','Jornada 33','2026-05-10','metz','lorient',0,4),
  l1M('33-6','Jornada 33','2026-05-10','toulouse','lyon',2,1),
  l1M('33-7','Jornada 33','2026-05-10','psg','brest',1,0), // 🏆 PSG CAMPEÓN
  l1M('33-8','Jornada 33','2026-05-10','angers','strasbourg',1,1),
  l1M('33-9','Jornada 33','2026-05-10','rennes','parisfc',2,1),
  // ── Jornada 34 — 17 may · ÚLTIMA JORNADA ────────────────────────────────
  l1M('34-1','Jornada 34','2026-05-17','lorient','lehavre',0,2),
  l1M('34-2','Jornada 34','2026-05-17','parisfc','psg',2,1),
  l1M('34-3','Jornada 34','2026-05-17','nice','metz',0,0),
  l1M('34-4','Jornada 34','2026-05-17','lyon','lens',0,4),
  l1M('34-5','Jornada 34','2026-05-17','marseille','rennes',3,1),
  l1M('34-6','Jornada 34','2026-05-17','lille','auxerre',0,2),
  l1M('34-7','Jornada 34','2026-05-17','strasbourg','monaco',5,4),
  l1M('34-8','Jornada 34','2026-05-17','brest','angers',1,1),
  l1M('34-9','Jornada 34','2026-05-17','toulouse','nantes',1,0),
];

// ─── LEAGUES ASSEMBLY ─────────────────────────────────────────────────────────
export const leagues: League[] = [
  { id:'arg', name:'Torneo Apertura 2026', country:'Argentina', flag:'🇦🇷', logo:'/league-lpf.png',
    teams:argTeams, standings:[], zones:[
      { name:'Zona A', standings:argZoneA },
      { name:'Zona B', standings:argZoneB },
    ], scorers:argScorers, discipline:argDiscipline,
    calendar: argCalendar },
  { id:'pl',  name:'Premier League',   country:'Inglaterra', flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', logo:'/league-premier-league.png', champion:'Arsenal',
    teams:plTeams,  standings:plStandings,  scorers:plScorers,  discipline:plDiscipline,
    calendar: plCalendar },
  { id:'ll',  name:'La Liga',          country:'España',     flag:'🇪🇸', logo:'/league-laliga.png', champion:'Barcelona',
    teams:llTeams,  standings:llStandings,  scorers:llScorers,  discipline:llDiscipline,
    calendar: llCalendar },
  { id:'sa',  name:'Serie A',          country:'Italia',     flag:'🇮🇹', logo:'/league-serie-a.png', champion:'Inter Milan',
    teams:saTeams,  standings:saStandings,  scorers:saScorers,  discipline:saDiscipline,
    calendar: saCalendar },
  { id:'l1',  name:'Ligue 1',          country:'Francia',    flag:'🇫🇷', logo:'/league-ligue1.png', champion:'PSG',
    teams:l1Teams,  standings:l1Standings,  scorers:l1Scorers,  discipline:l1Discipline,
    calendar: l1Calendar },
  { id:'pt',  name:'Primeira Liga',    country:'Portugal',   flag:'🇵🇹', champion:'Porto',
    teams:ptTeams,  standings:ptStandings,  scorers:ptScorers,  discipline:ptDiscipline,
    calendar: allMatches.filter(m => m.leagueId === 'pt') },
];

// ─── TOURNAMENTS ──────────────────────────────────────────────────────────────
export type Tournament = { id: string; name: string; region: string; icon: string };
export const tournaments: Tournament[] = [
  { id:'ucl',  name:'UEFA Champions League', region:'Europa',       icon:'🏆' },
  { id:'uel',  name:'UEFA Europa League',    region:'Europa',       icon:'🥈' },
  { id:'uecl', name:'Conference League',     region:'Europa',       icon:'🥉' },
  { id:'lib',  name:'Copa Libertadores',     region:'Sudamerica',   icon:'🏆' },
  { id:'sud',  name:'Copa Sudamericana',     region:'Sudamerica',   icon:'🥈' },
  { id:'mxll', name:'Liga MX',              region:'Mexico',        icon:'🇲🇽' },
  { id:'mls',  name:'MLS',                  region:'USA / Canada',  icon:'🇺🇸' },
  { id:'afc',  name:'AFC Champions League', region:'Asia',          icon:'🌏' },
];
