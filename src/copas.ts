export type CopTeam = {
  name: string; country: string; flag: string;
  pj: number; g: number; e: number; p: number;
  gf: number; gc: number; dif: number; pts: number;
};
export type CopGroup = { name: string; teams: CopTeam[] };
export type CopCompetition = {
  id: string; name: string; shortName: string;
  icon: string; color: string; season: string;
  phase: string; finalCity: string; finalDate: string;
  groups: CopGroup[];
};

// ─── COPA LIBERTADORES 2026 ────────────────────────────────────────────────
// Fase de grupos — Fecha 5 de 6 (7 abr – 28 may 2026)
// Final: Estadio Centenario, Montevideo, 28 nov 2026
export const libertadores2026: CopCompetition = {
  id: 'libertadores2026',
  name: 'Copa CONMEBOL Libertadores', shortName: 'Libertadores',
  icon: '🏆', color: '#f59e0b', season: '2026',
  phase: 'Fase de Grupos — Fecha 5/6',
  finalCity: 'Montevideo', finalDate: '28 nov 2026',
  groups: [
    {
      name: 'Grupo A',
      teams: [
        { name:'Flamengo',           country:'Brasil',    flag:'🇧🇷', pj:5, g:4, e:0, p:1, gf:10, gc:4,  dif:6,  pts:12 },
        { name:'Estudiantes LP',     country:'Argentina', flag:'🇦🇷', pj:5, g:2, e:1, p:2, gf:7,  gc:7,  dif:0,  pts:7  },
        { name:'Ind. Medellín',      country:'Colombia',  flag:'🇨🇴', pj:5, g:1, e:1, p:3, gf:5,  gc:9,  dif:-4, pts:4  },
        { name:'Cusco FC',           country:'Perú',      flag:'🇵🇪', pj:5, g:0, e:2, p:3, gf:3,  gc:9,  dif:-6, pts:2  },
      ],
    },
    {
      name: 'Grupo B',
      teams: [
        { name:'Nacional',           country:'Uruguay',   flag:'🇺🇾', pj:5, g:3, e:1, p:1, gf:9,  gc:5,  dif:4,  pts:10 },
        { name:'Universitario',      country:'Perú',      flag:'🇵🇪', pj:5, g:2, e:1, p:2, gf:7,  gc:7,  dif:0,  pts:7  },
        { name:'Dep. Tolima',        country:'Colombia',  flag:'🇨🇴', pj:5, g:1, e:1, p:3, gf:5,  gc:8,  dif:-3, pts:4  },
        { name:'Coquimbo Unido',     country:'Chile',     flag:'🇨🇱', pj:5, g:1, e:0, p:4, gf:4,  gc:9,  dif:-5, pts:3  },
      ],
    },
    {
      name: 'Grupo C',
      teams: [
        { name:'Fluminense',         country:'Brasil',    flag:'🇧🇷', pj:5, g:3, e:0, p:2, gf:10, gc:6,  dif:4,  pts:9  },
        { name:'Bolívar',            country:'Bolivia',   flag:'🇧🇴', pj:5, g:2, e:2, p:1, gf:8,  gc:7,  dif:1,  pts:8  },
        { name:'Ind. Rivadavia',     country:'Argentina', flag:'🇦🇷', pj:5, g:1, e:1, p:3, gf:5,  gc:9,  dif:-4, pts:4  },
        { name:'Dep. La Guaira',     country:'Venezuela', flag:'🇻🇪', pj:5, g:0, e:3, p:2, gf:4,  gc:9,  dif:-5, pts:3  },
      ],
    },
    {
      name: 'Grupo D',
      teams: [
        { name:'Boca Juniors',       country:'Argentina', flag:'🇦🇷', pj:5, g:3, e:2, p:0, gf:9,  gc:4,  dif:5,  pts:11 },
        { name:'Cruzeiro',           country:'Brasil',    flag:'🇧🇷', pj:5, g:3, e:0, p:2, gf:8,  gc:6,  dif:2,  pts:9  },
        { name:'Univ. Católica',     country:'Chile',     flag:'🇨🇱', pj:5, g:1, e:1, p:3, gf:5,  gc:8,  dif:-3, pts:4  },
        { name:'Barcelona SC',       country:'Ecuador',   flag:'🇪🇨', pj:5, g:0, e:1, p:4, gf:3,  gc:10, dif:-7, pts:1  },
      ],
    },
    {
      name: 'Grupo E',
      teams: [
        { name:'Peñarol',            country:'Uruguay',   flag:'🇺🇾', pj:5, g:3, e:1, p:1, gf:9,  gc:5,  dif:4,  pts:10 },
        { name:'Corinthians',        country:'Brasil',    flag:'🇧🇷', pj:5, g:3, e:0, p:2, gf:8,  gc:6,  dif:2,  pts:9  },
        { name:'Santa Fe',           country:'Colombia',  flag:'🇨🇴', pj:5, g:1, e:1, p:3, gf:5,  gc:8,  dif:-3, pts:4  },
        { name:'Platense',           country:'Argentina', flag:'🇦🇷', pj:5, g:0, e:2, p:3, gf:3,  gc:9,  dif:-6, pts:2  },
      ],
    },
    {
      name: 'Grupo F',
      teams: [
        { name:'Palmeiras',          country:'Brasil',    flag:'🇧🇷', pj:5, g:4, e:1, p:0, gf:12, gc:3,  dif:9,  pts:13 },
        { name:'Cerro Porteño',      country:'Paraguay',  flag:'🇵🇾', pj:5, g:2, e:1, p:2, gf:7,  gc:8,  dif:-1, pts:7  },
        { name:'Junior',             country:'Colombia',  flag:'🇨🇴', pj:5, g:1, e:1, p:3, gf:5,  gc:9,  dif:-4, pts:4  },
        { name:'Sporting Cristal',   country:'Perú',      flag:'🇵🇪', pj:5, g:0, e:1, p:4, gf:3,  gc:11, dif:-8, pts:1  },
      ],
    },
    {
      name: 'Grupo G',
      teams: [
        { name:'LDU Quito',          country:'Ecuador',   flag:'🇪🇨', pj:5, g:3, e:2, p:0, gf:10, gc:5,  dif:5,  pts:11 },
        { name:'Lanús',              country:'Argentina', flag:'🇦🇷', pj:5, g:2, e:1, p:2, gf:7,  gc:7,  dif:0,  pts:7  },
        { name:'Always Ready',       country:'Bolivia',   flag:'🇧🇴', pj:5, g:1, e:2, p:2, gf:6,  gc:7,  dif:-1, pts:5  },
        { name:'Mirassol',           country:'Brasil',    flag:'🇧🇷', pj:5, g:1, e:0, p:4, gf:4,  gc:9,  dif:-5, pts:3  },
      ],
    },
    {
      name: 'Grupo H',
      teams: [
        { name:'Ind. del Valle',     country:'Ecuador',   flag:'🇪🇨', pj:5, g:4, e:0, p:1, gf:11, gc:4,  dif:7,  pts:12 },
        { name:'Rosario Central',    country:'Argentina', flag:'🇦🇷', pj:5, g:2, e:2, p:1, gf:7,  gc:5,  dif:2,  pts:8  },
        { name:'Libertad',           country:'Paraguay',  flag:'🇵🇾', pj:5, g:1, e:1, p:3, gf:5,  gc:8,  dif:-3, pts:4  },
        { name:'Univ. Central',      country:'Venezuela', flag:'🇻🇪', pj:5, g:0, e:1, p:4, gf:2,  gc:11, dif:-9, pts:1  },
      ],
    },
  ],
};

// ─── COPA SUDAMERICANA 2026 ───────────────────────────────────────────────────
// Fase de grupos — Fecha 5 de 6 (7 abr – 28 may 2026)
// Final: Estadio Metropolitano R. Meléndez, Barranquilla, 21 nov 2026
export const sudamericana2026: CopCompetition = {
  id: 'sudamericana2026',
  name: 'Copa CONMEBOL Sudamericana', shortName: 'Sudamericana',
  icon: '⚡', color: '#f97316', season: '2026',
  phase: 'Fase de Grupos — Fecha 5/6',
  finalCity: 'Barranquilla', finalDate: '21 nov 2026',
  groups: [
    {
      name: 'Grupo A',
      teams: [
        { name:'Tigre',              country:'Argentina', flag:'🇦🇷', pj:5, g:3, e:1, p:1, gf:9,  gc:5,  dif:4,  pts:10 },
        { name:'América de Cali',    country:'Colombia',  flag:'🇨🇴', pj:5, g:2, e:2, p:1, gf:8,  gc:6,  dif:2,  pts:8  },
        { name:'Macará',             country:'Ecuador',   flag:'🇪🇨', pj:5, g:1, e:1, p:3, gf:5,  gc:8,  dif:-3, pts:4  },
        { name:'Alianza Atlético',   country:'Perú',      flag:'🇵🇪', pj:5, g:0, e:2, p:3, gf:3,  gc:8,  dif:-5, pts:2  },
      ],
    },
    {
      name: 'Grupo B',
      teams: [
        { name:'Atlético Mineiro',   country:'Brasil',    flag:'🇧🇷', pj:5, g:3, e:2, p:0, gf:10, gc:4,  dif:6,  pts:11 },
        { name:'Cienciano',          country:'Perú',      flag:'🇵🇪', pj:5, g:2, e:1, p:2, gf:7,  gc:6,  dif:1,  pts:7  },
        { name:'Pto. Cabello',       country:'Venezuela', flag:'🇻🇪', pj:5, g:1, e:1, p:3, gf:5,  gc:8,  dif:-3, pts:4  },
        { name:'Juventud',           country:'Uruguay',   flag:'🇺🇾', pj:5, g:0, e:2, p:3, gf:3,  gc:9,  dif:-6, pts:2  },
      ],
    },
    {
      name: 'Grupo C',
      teams: [
        { name:'São Paulo',          country:'Brasil',    flag:'🇧🇷', pj:5, g:4, e:0, p:1, gf:11, gc:4,  dif:7,  pts:12 },
        { name:'Millonarios',        country:'Colombia',  flag:'🇨🇴', pj:5, g:2, e:1, p:2, gf:7,  gc:6,  dif:1,  pts:7  },
        { name:"O'Higgins",          country:'Chile',     flag:'🇨🇱', pj:5, g:0, e:3, p:2, gf:4,  gc:8,  dif:-4, pts:3  },
        { name:'Boston River',       country:'Uruguay',   flag:'🇺🇾', pj:5, g:0, e:2, p:3, gf:3,  gc:9,  dif:-6, pts:2  },
      ],
    },
    {
      name: 'Grupo D',
      teams: [
        { name:'San Lorenzo',        country:'Argentina', flag:'🇦🇷', pj:5, g:2, e:3, p:0, gf:8,  gc:5,  dif:3,  pts:9  },
        { name:'Santos',             country:'Brasil',    flag:'🇧🇷', pj:5, g:2, e:2, p:1, gf:7,  gc:6,  dif:1,  pts:8  },
        { name:'Dep. Cuenca',        country:'Ecuador',   flag:'🇪🇨', pj:5, g:1, e:2, p:2, gf:5,  gc:7,  dif:-2, pts:5  },
        { name:'Recoleta',           country:'Chile',     flag:'🇨🇱', pj:5, g:0, e:1, p:4, gf:2,  gc:9,  dif:-7, pts:1  },
      ],
    },
    {
      name: 'Grupo E',
      teams: [
        { name:'Racing Club',        country:'Argentina', flag:'🇦🇷', pj:5, g:4, e:1, p:0, gf:12, gc:3,  dif:9,  pts:13 },
        { name:'Botafogo',           country:'Brasil',    flag:'🇧🇷', pj:5, g:2, e:1, p:2, gf:7,  gc:7,  dif:0,  pts:7  },
        { name:'Caracas FC',         country:'Venezuela', flag:'🇻🇪', pj:5, g:1, e:1, p:3, gf:4,  gc:9,  dif:-5, pts:4  },
        { name:'Ind. de Bolivia',    country:'Bolivia',   flag:'🇧🇴', pj:5, g:0, e:1, p:4, gf:1,  gc:11, dif:-10,pts:1  },
      ],
    },
    {
      name: 'Grupo F',
      teams: [
        { name:'Dep. Riestra',       country:'Argentina', flag:'🇦🇷', pj:5, g:2, e:2, p:1, gf:7,  gc:6,  dif:1,  pts:8  },
        { name:'Grêmio',             country:'Brasil',    flag:'🇧🇷', pj:5, g:2, e:1, p:2, gf:7,  gc:6,  dif:1,  pts:7  },
        { name:'Palestino',          country:'Chile',     flag:'🇨🇱', pj:5, g:1, e:3, p:1, gf:5,  gc:6,  dif:-1, pts:6  },
        { name:'Mcity Torque',       country:'Uruguay',   flag:'🇺🇾', pj:5, g:0, e:2, p:3, gf:3,  gc:7,  dif:-4, pts:2  },
      ],
    },
    {
      name: 'Grupo G',
      teams: [
        { name:'Olimpia',            country:'Paraguay',  flag:'🇵🇾', pj:5, g:3, e:1, p:1, gf:9,  gc:5,  dif:4,  pts:10 },
        { name:'Barracas Central',   country:'Argentina', flag:'🇦🇷', pj:5, g:2, e:2, p:1, gf:7,  gc:6,  dif:1,  pts:8  },
        { name:'Vasco da Gama',      country:'Brasil',    flag:'🇧🇷', pj:5, g:1, e:3, p:1, gf:6,  gc:7,  dif:-1, pts:6  },
        { name:'Audax Italiano',     country:'Chile',     flag:'🇨🇱', pj:5, g:0, e:0, p:5, gf:1,  gc:11, dif:-10,pts:0  },
      ],
    },
    {
      name: 'Grupo H',
      teams: [
        { name:'River Plate',        country:'Argentina', flag:'🇦🇷', pj:5, g:4, e:0, p:1, gf:12, gc:5,  dif:7,  pts:12 },
        { name:'Bragantino',         country:'Brasil',    flag:'🇧🇷', pj:5, g:2, e:2, p:1, gf:8,  gc:7,  dif:1,  pts:8  },
        { name:'Carabobo FC',        country:'Venezuela', flag:'🇻🇪', pj:5, g:1, e:0, p:4, gf:4,  gc:10, dif:-6, pts:3  },
        { name:'Blooming',           country:'Bolivia',   flag:'🇧🇴', pj:5, g:0, e:2, p:3, gf:3,  gc:9,  dif:-6, pts:2  },
      ],
    },
  ],
};

export const copas: CopCompetition[] = [libertadores2026, sudamericana2026];
