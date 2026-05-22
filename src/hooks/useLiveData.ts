// ─── DEPORT — Live Data Hooks ─────────────────────────────────────────────────
// Conecta con el servidor Express (localhost:3001) para obtener datos en tiempo
// real de API-Football. Fallback silencioso si el servidor no está disponible.

import { useState, useEffect, useCallback, useRef } from 'react'

// En producción se lee de VITE_API_BASE (seteado en Vercel).
// En desarrollo apunta al servidor local.
const API_BASE = (import.meta.env.VITE_API_BASE as string | undefined)
  ?? 'http://localhost:3001/api'

// ── Tipos de respuesta de API-Football ───────────────────────────────────────
export interface ApiTeam {
  id: number
  name: string
  logo: string
  winner?: boolean | null
}

export interface ApiFixture {
  fixture: {
    id: number
    date: string
    timezone: string
    status: {
      long: string
      /** NS=no empezó · 1H=primer tiempo · HT=entretiempo · 2H=segundo tiempo
       *  ET=tiempo extra · P=penales · FT=terminado · AET=TExtra · PEN=penales */
      short: string
      elapsed: number | null
    }
  }
  league: {
    id: number
    name: string
    country: string
    logo: string
    flag: string
    season: number
    round: string
  }
  teams: {
    home: ApiTeam
    away: ApiTeam
  }
  goals: {
    home: number | null
    away: number | null
  }
  score: {
    halftime:  { home: number | null; away: number | null }
    fulltime:  { home: number | null; away: number | null }
    extratime: { home: number | null; away: number | null }
    penalty:   { home: number | null; away: number | null }
  }
  /** Clave interna de liga (arg, pl, ll, sa, l1, pt) — agregada por nuestro server */
  _leagueKey?: string | null
}

export interface ApiEvent {
  time: { elapsed: number; extra: number | null }
  team: { id: number; name: string; logo: string }
  player: { id: number; name: string }
  assist: { id: number | null; name: string | null }
  type: 'Goal' | 'Card' | 'subst' | 'Var'
  /** 'Normal Goal' | 'Own Goal' | 'Penalty' | 'Missed Penalty' |
   *  'Yellow Card' | 'Red Card' | 'Yellow Red Card' |
   *  'Substitution 1'…'6' */
  detail: string
  comments: string | null
}

// ── Helpers de estado ─────────────────────────────────────────────────────────
export function isLiveStatus(s: string): boolean {
  return ['1H', 'HT', '2H', 'ET', 'BT', 'P', 'LIVE'].includes(s)
}
export function isFinishedStatus(s: string): boolean {
  return ['FT', 'AET', 'PEN'].includes(s)
}

// ── Coincidencia de nombres (API-Football devuelve nombres completos, nosotros
//    usamos IDs internos). Normalizamos ambos para comparar. ───────────────────
export function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '') // quitar acentos
    .replace(/\b(fc|cf|ac|sc|sd|rc|cd|ud|as|ss|rcd|ssc|afc|club|atletico|athletic|sporting|united|city|real|inter|calcio|junior|juniors|old boys|de|la|los|del|cp|fk|sk)\b/g, '')
    .replace(/[^a-z0-9]/g, '')
    .trim()
}

/** Busca en la lista de fixtures de API el que corresponde a un partido nuestro */
export function findApiFixture(
  fixtures: ApiFixture[],
  homeName: string,
  awayName: string
): ApiFixture | undefined {
  const nh = normalizeName(homeName)
  const na = normalizeName(awayName)
  if (!nh || !na) return undefined
  return fixtures.find(f => {
    const fh = normalizeName(f.teams.home.name)
    const fa = normalizeName(f.teams.away.name)
    const homeMatch = fh === nh || fh.includes(nh) || nh.includes(fh)
    const awayMatch = fa === na || fa.includes(na) || na.includes(fa)
    return homeMatch && awayMatch
  })
}

// ── Hook: partidos del día (polling cada 60s) ────────────────────────────────
// Expone `refresh` para que useLiveMatches pueda forzar un refresh inmediato
// cuando detecta que un partido desapareció del endpoint /live (terminó).
export function useTodayMatches() {
  const [fixtures, setFixtures] = useState<ApiFixture[]>([])

  const fetchToday = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/today`)
      if (!res.ok) throw new Error()
      const data = await res.json()
      setFixtures(data.response ?? [])
    } catch {
      /* silent */
    }
  }, [])

  useEffect(() => {
    fetchToday()
    const t = setInterval(fetchToday, 60_000)   // 1 min (antes 5 min)
    return () => clearInterval(t)
  }, [fetchToday])

  return { fixtures, refresh: fetchToday }
}

// ── Hook: partidos EN VIVO (polling cada 30s) ─────────────────────────────────
// onMatchFinished: callback que se llama cuando un partido desaparece del live
// (lo más probable es que terminó → así forzamos refresh inmediato de /today).
export function useLiveMatches(onMatchFinished?: () => void) {
  const [fixtures, setFixtures]   = useState<ApiFixture[]>([])
  const [connected, setConnected] = useState(false)
  const prevIds = useRef<Set<number>>(new Set())

  const fetchLive = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/live`)
      if (!res.ok) throw new Error()
      const data = await res.json()
      const newFixtures: ApiFixture[] = data.response ?? []

      // Detectar si algún partido que estaba en vivo ya no aparece → terminó
      const newIdSet  = new Set(newFixtures.map(f => f.fixture.id))
      const hadPrev   = prevIds.current.size > 0
      const someGone  = hadPrev && [...prevIds.current].some(id => !newIdSet.has(id))
      if (someGone) onMatchFinished?.()  // disparar refresh de /today inmediatamente
      prevIds.current = newIdSet

      setFixtures(newFixtures)
      setConnected(true)
    } catch {
      setConnected(false)
      // No borramos fixtures previos para evitar parpadeos
    }
  }, [onMatchFinished])

  useEffect(() => {
    fetchLive()
    const t = setInterval(fetchLive, 30_000)
    return () => clearInterval(t)
  }, [fetchLive])

  return { fixtures, connected }
}

// ── Tipos para estadísticas de partido (TheStatsAPI) ─────────────────────────
export interface ApiMatchStatsTeam {
  team?: { id: number; name: string }
  shots?: { total?: number; on_target?: number; off_target?: number; blocked?: number }
  passes?: { total?: number; accurate?: number; accuracy?: number }
  duels?: { total?: number; won?: number }
  goalkeeping?: { saves?: number }
  /** Expected goals */
  np_expected_goals?: number
  /** Possession % (0-100) */
  possession?: number
  /** También puede venir como campos planos */
  [key: string]: unknown
}

export interface ApiMatchStats {
  home?: ApiMatchStatsTeam
  away?: ApiMatchStatsTeam
  /** Formato alternativo: array de dos equipos */
  [key: string]: unknown
}

// ── Hook: estadísticas del partido (TheStatsAPI) ──────────────────────────────
export function useMatchStats(fixtureId: number | null, isLive = false) {
  const [stats, setStats]   = useState<ApiMatchStats | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchStats = useCallback(async (id: number) => {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/fixture/${id}/statistics`)
      if (!res.ok) throw new Error()
      const data = await res.json()
      setStats(data.response ?? null)
    } catch {
      /* silent */
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!fixtureId) { setStats(null); return }
    fetchStats(fixtureId)
    if (!isLive) return
    const t = setInterval(() => fetchStats(fixtureId), 30_000)
    return () => clearInterval(t)
  }, [fixtureId, isLive, fetchStats])

  return { stats, loading }
}

// ── Hook: incidencias de un partido específico (polling cada 30s si está vivo) ─
export function useMatchEvents(fixtureId: number | null, isLive = false) {
  const [events, setEvents]   = useState<ApiEvent[]>([])
  const [loading, setLoading] = useState(false)

  const fetchEvents = useCallback(async (id: number) => {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/fixture/${id}/events`)
      if (!res.ok) throw new Error()
      const data = await res.json()
      setEvents(data.response ?? [])
    } catch {
      /* silent */
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!fixtureId) { setEvents([]); return }
    fetchEvents(fixtureId)
    if (!isLive) return  // solo pollear si el partido sigue en vivo
    const t = setInterval(() => fetchEvents(fixtureId), 30_000)
    return () => clearInterval(t)
  }, [fixtureId, isLive, fetchEvents])

  return { events, loading }
}
