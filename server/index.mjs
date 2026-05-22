// ─── DEPORT API SERVER ─────────────────────────────────────────────────────────
// Proxy para Football-Data.org v4. Mantiene el API key seguro en el servidor.
// Puerto: 3001 | Docs: https://www.football-data.org/documentation/quickstart

import { createServer } from 'http'
import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// ── Cargar .env manualmente ───────────────────────────────────────────────────
const envPath = join(__dirname, '.env')
const env = {}
if (existsSync(envPath)) {
  readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const [k, ...v] = line.split('=')
    if (k && k.trim() && !k.trim().startsWith('#')) env[k.trim()] = v.join('=').trim()
  })
}

const API_KEY  = env.FOOTBALL_DATA_KEY || process.env.FOOTBALL_DATA_KEY || ''
const PORT     = parseInt(env.PORT || process.env.PORT || '3001')
const BASE_URL = 'https://api.football-data.org/v4'

// ── Ligas disponibles en el plan gratuito de Football-Data.org ────────────────
// Argentina (arg) y Portugal (pt) no están en el plan gratuito → datos estáticos
const LEAGUE_MAP = {
  pl:  { code: 'PL',  name: 'Premier League', country: 'England' },
  ll:  { code: 'PD',  name: 'La Liga',         country: 'Spain'   },
  sa:  { code: 'SA',  name: 'Serie A',          country: 'Italy'   },
  l1:  { code: 'FL1', name: 'Ligue 1',          country: 'France'  },
}

// Códigos para llamadas combinadas
const ALL_CODES = Object.values(LEAGUE_MAP).map(l => l.code).join(',')
// Invertir: competition code → internal key
const CODE_TO_KEY = Object.fromEntries(
  Object.entries(LEAGUE_MAP).map(([key, l]) => [l.code, key])
)

// ── Fetch helper ──────────────────────────────────────────────────────────────
async function apiFetch(path, params = {}) {
  if (!API_KEY) throw new Error('Sin FOOTBALL_DATA_KEY en server/.env')
  const url = new URL(`${BASE_URL}${path}`)
  Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, String(v)))
  const res = await fetch(url.toString(), {
    headers: { 'X-Auth-Token': API_KEY },
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`Football-Data.org respondió ${res.status}: ${body.slice(0, 300)}`)
  }
  return res.json()
}

// ── Mapear status Football-Data.org → short code del frontend ─────────────────
// FDO: SCHEDULED | TIMED | IN_PLAY | PAUSED | EXTRA_TIME | PENALTY_SHOOTOUT
//      FINISHED | SUSPENDED | POSTPONED | CANCELLED | AWARDED
function toShortStatus(status, minute) {
  switch (status) {
    case 'IN_PLAY':
      if (!minute)        return 'LIVE'
      if (minute <= 45)   return '1H'
      return '2H'
    case 'PAUSED':           return 'HT'
    case 'EXTRA_TIME':       return 'ET'
    case 'PENALTY_SHOOTOUT': return 'P'
    case 'FINISHED':
    case 'AWARDED':          return 'FT'
    case 'SUSPENDED':
    case 'POSTPONED':        return 'PST'
    case 'CANCELLED':        return 'CANC'
    case 'SCHEDULED':
    case 'TIMED':
    default:                 return 'NS'
  }
}

// ── Transformar respuesta FDO → formato ApiFixture del frontend ───────────────
function toApiFixture(m) {
  const compCode  = m.competition?.code ?? ''
  const leagueKey = CODE_TO_KEY[compCode] ?? null
  const minute    = m.minute ?? null
  const shortSt   = toShortStatus(m.status ?? '', minute)

  // FDO devuelve goals en score.fullTime durante el partido y después
  const homeGoals = m.score?.fullTime?.home ?? null
  const awayGoals = m.score?.fullTime?.away ?? null
  const htHome    = m.score?.halfTime?.home ?? null
  const htAway    = m.score?.halfTime?.away ?? null

  return {
    fixture: {
      id: m.id,
      date: m.utcDate ?? '',
      timezone: 'UTC',
      status: {
        long:    m.status ?? '',
        short:   shortSt,
        elapsed: minute,
      },
    },
    league: {
      id:      m.competition?.id ?? 0,
      name:    m.competition?.name ?? '',
      country: m.area?.name ?? '',
      logo: '', flag: '',
      season: Number(m.season?.startDate?.slice(0, 4) ?? 0),
      round:  m.matchday ? `Regular Season - ${m.matchday}` : '',
    },
    teams: {
      home: {
        id:     m.homeTeam?.id ?? 0,
        name:   m.homeTeam?.shortName ?? m.homeTeam?.name ?? '',
        logo:   m.homeTeam?.crest ?? '',
        winner: homeGoals !== null && awayGoals !== null
          ? homeGoals > awayGoals : null,
      },
      away: {
        id:     m.awayTeam?.id ?? 0,
        name:   m.awayTeam?.shortName ?? m.awayTeam?.name ?? '',
        logo:   m.awayTeam?.crest ?? '',
        winner: homeGoals !== null && awayGoals !== null
          ? awayGoals > homeGoals : null,
      },
    },
    goals: { home: homeGoals, away: awayGoals },
    score: {
      halftime:  { home: htHome,    away: htAway    },
      fulltime:  { home: homeGoals, away: awayGoals },
      extratime: { home: null,      away: null       },
      penalty:   { home: null,      away: null       },
    },
    _leagueKey: leagueKey,
  }
}

// ── Express ───────────────────────────────────────────────────────────────────
let express, cors
try { express = (await import('express')).default } catch { express = null }
try { cors    = (await import('cors')).default     } catch { cors    = null }

if (express) {
  const app = express()
  if (cors) app.use(cors())
  app.use(express.json())

  // ── Estado del servidor ─────────────────────────────────────────────────────
  app.get('/api/status', (_, res) => {
    res.json({
      ok: true,
      provider: 'Football-Data.org v4',
      apiConfigured: !!API_KEY,
      supportedLeagues: Object.entries(LEAGUE_MAP).map(([k, l]) => ({ key: k, ...l })),
      message: API_KEY
        ? '✅ API key configurada — PL, La Liga, Serie A y Ligue 1 activos'
        : '❌ Sin FOOTBALL_DATA_KEY — registrate en football-data.org/client/register y pegá tu key en server/.env',
    })
  })

  // ── Partidos EN VIVO (incluye entretiempo y tiempo extra) ───────────────────
  app.get('/api/live', async (_, res) => {
    try {
      // 'LIVE' es el alias oficial de FDO para todos los partidos en curso
      // (IN_PLAY + PAUSED + EXTRA_TIME + PENALTY_SHOOTOUT)
      const data = await apiFetch('/matches', {
        status: 'LIVE',
        competitions: ALL_CODES,
      })
      const fixtures = (data.matches ?? []).map(toApiFixture)
      res.json({ response: fixtures, results: fixtures.length })
    } catch (e) {
      res.status(500).json({ error: e.message, response: [] })
    }
  })

  // ── Partidos del día ────────────────────────────────────────────────────────
  app.get('/api/today', async (_, res) => {
    try {
      const today = new Date().toISOString().split('T')[0]
      const data = await apiFetch('/matches', {
        dateFrom: today,
        dateTo:   today,
        competitions: ALL_CODES,
      })
      const fixtures = (data.matches ?? []).map(toApiFixture)
      res.json({ response: fixtures, results: fixtures.length })
    } catch (e) {
      res.status(500).json({ error: e.message, response: [] })
    }
  })

  // ── Eventos del partido (no disponible en FDO free → vacío silencioso) ──────
  app.get('/api/fixture/:id/events', (_, res) => {
    res.json({ response: [], provider: 'football-data.org', note: 'Events not available in free tier' })
  })

  // ── Estadísticas del partido ────────────────────────────────────────────────
  // FDO no tiene stats de posesión/tiros en el plan gratuito.
  // Devolvemos los datos básicos del partido para mostrar el marcador en el modal.
  app.get('/api/fixture/:id/statistics', async (req, res) => {
    try {
      const data = await apiFetch(`/matches/${req.params.id}`)
      const m = data
      // Construir objeto stats mínimo compatible con el frontend
      const stats = {
        home: {
          team: {
            id:   m.homeTeam?.id,
            name: m.homeTeam?.shortName ?? m.homeTeam?.name,
          },
        },
        away: {
          team: {
            id:   m.awayTeam?.id,
            name: m.awayTeam?.shortName ?? m.awayTeam?.name,
          },
        },
      }
      res.json({ response: stats, provider: 'football-data.org', note: 'Detailed stats not available in free tier' })
    } catch (e) {
      res.status(500).json({ error: e.message, response: null })
    }
  })

  // ── Tabla de posiciones ─────────────────────────────────────────────────────
  app.get('/api/standings/:leagueKey', async (req, res) => {
    try {
      const league = LEAGUE_MAP[req.params.leagueKey]
      if (!league) return res.status(404).json({ error: 'Liga no disponible en plan gratuito (arg/pt usan datos estáticos)' })
      const data = await apiFetch(`/competitions/${league.code}/standings`)
      res.json(data)
    } catch (e) {
      res.status(500).json({ error: e.message, response: [] })
    }
  })

  // ── Goleadores ──────────────────────────────────────────────────────────────
  app.get('/api/scorers/:leagueKey', async (req, res) => {
    try {
      const league = LEAGUE_MAP[req.params.leagueKey]
      if (!league) return res.status(404).json({ error: 'Liga no disponible en plan gratuito (arg/pt usan datos estáticos)' })
      const data = await apiFetch(`/competitions/${league.code}/scorers`, { limit: 20 })
      res.json(data)
    } catch (e) {
      res.status(500).json({ error: e.message, response: [] })
    }
  })

  // ── Fixture individual ──────────────────────────────────────────────────────
  app.get('/api/fixture/:id', async (req, res) => {
    try {
      const data = await apiFetch(`/matches/${req.params.id}`)
      res.json(toApiFixture(data))
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })

  // ── Raw (debug) ─────────────────────────────────────────────────────────────
  app.get('/api/raw/*', async (req, res) => {
    try {
      const path = '/' + req.params[0]
      const data = await apiFetch(path, req.query)
      res.json(data)
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })

  app.listen(PORT, () => {
    console.log(`\n  DEPORT API (Football-Data.org v4)  →  http://localhost:${PORT}/api/status\n`)
    if (!API_KEY) {
      console.log('  ⚠  API key no configurada.')
      console.log('  1. Registrate GRATIS en: https://www.football-data.org/client/register')
      console.log('  2. Abrí server/.env')
      console.log('  3. Pegá tu key: FOOTBALL_DATA_KEY=tu_key_aqui')
      console.log('  4. Reiniciá el servidor\n')
    } else {
      console.log('  ✅ API key configurada.')
      console.log('  📡 Ligas en vivo: Premier League · La Liga · Serie A · Ligue 1')
      console.log('  ℹ️  Argentina y Portugal: solo datos estáticos\n')
    }
  })

} else {
  // Fallback sin Express
  const server = createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
    res.end(JSON.stringify({
      ok: false,
      message: 'Express no instalado. Ejecuta: cd server && npm install'
    }))
  })
  server.listen(PORT, () => {
    console.log(`\n  DEPORT API (básico) → http://localhost:${PORT}`)
    console.log('  ⚠  Instalá Express: cd server && npm install\n')
  })
}
