import { useState, useEffect, useMemo, createContext, useContext } from 'react'
import './index.css'
import { leagues, allMatches, tournaments, type League, type Zone, type Match, type Team } from './data'
import { copas, type CopCompetition, type CopGroup } from './copas'
import {
  Activity, Heart, Calendar, Trophy, Radio, Home, ChevronDown,
  Clock, Zap, Shield, Target, AlertTriangle, Menu, X, Wifi, WifiOff
} from 'lucide-react'
import {
  type ApiFixture, type ApiMatchStats,
  findApiFixture, isLiveStatus, isFinishedStatus,
  useLiveMatches, useTodayMatches, useMatchStats,
} from './hooks/useLiveData'

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function getTeam(leagueId: string, teamId: string): Team | undefined {
  return leagues.find(l => l.id === leagueId)?.teams.find(t => t.id === teamId)
}

/** Escudo del equipo con fallback invisible si el archivo no existe */
function Crest({ team, size = 20 }: { team: Team | undefined; size?: number }) {
  if (!team?.crest) return null
  return (
    <img
      src={team.crest}
      alt=""
      width={size}
      height={size}
      className="object-contain flex-shrink-0"
      onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
    />
  )
}

function zoneColor(zone: string | null): string {
  if (zone === 'champions') return 'border-l-[3px] border-l-green-600'
  if (zone === 'europa')    return 'border-l-[3px] border-l-amber-500'
  if (zone === 'conference')return 'border-l-[3px] border-l-emerald-400'
  if (zone === 'descenso')  return 'border-l-[3px] border-l-red-500'
  if (zone === 'playoff')   return 'border-l-[3px] border-l-sky-500'
  return 'border-l-[3px] border-l-transparent'
}

function zoneBadge(zone: string | null) {
  if (!zone) return null
  const cfg: Record<string, { label: string; cls: string }> = {
    champions: { label: 'UCL',  cls: 'bg-green-500/20 text-green-700' },
    europa:    { label: 'UEL',  cls: 'bg-amber-500/20 text-amber-700' },
    conference:{ label: 'UCE',  cls: 'bg-emerald-500/20 text-emerald-700' },
    descenso:  { label: 'DESC', cls: 'bg-red-500/20 text-red-600' },
    playoff:   { label: 'PLAY', cls: 'bg-sky-500/20 text-sky-700' },
  }
  const c = cfg[zone]
  if (!c) return null
  return <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${c.cls}`}>{c.label}</span>
}

// ─── GOAL INTRO (cinematic) ───────────────────────────────────────────────────
function GoalIntro({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3700)
    return () => clearTimeout(t)
  }, [onDone])

  const GW = 440
  const GH = 158

  const vLines = Array.from({ length: 21 }, (_, i) => 12 + (i + 1) * (GW / 22))
  const hLines = Array.from({ length: 9  }, (_, i) => (i + 1) * (GH / 10))

  const BAR = '11%'

  return (
    <div
      className="fixed inset-0 z-[100] cursor-pointer select-none"
      style={{
        background: 'rgba(4, 10, 6, 0.55)',
        animation: 'intro-fade 3.7s ease forwards, intro-blur 3.7s ease forwards',
      }}
      onClick={onDone}
    >
      {/* ── Barras cinemáticas ─────────────────────────────── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: BAR, background: '#000',
        transformOrigin: 'top center', transform: 'scaleY(0)',
        animation: 'cinema-in 0.35s ease 0.05s both',
      }}/>
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: BAR, background: '#000',
        transformOrigin: 'bottom center', transform: 'scaleY(0)',
        animation: 'cinema-in 0.35s ease 0.05s both',
      }}/>

      {/* ── Flash blanco al gol ────────────────────────────── */}
      <div
        className="absolute inset-0 bg-white pointer-events-none"
        style={{ opacity: 0, animation: 'goal-flash 0.65s ease 1.62s both' }}
      />

      {/* ── Contenido (entre las barras) ───────────────────── */}
      <div style={{
        position: 'absolute',
        top: BAR, bottom: BAR, left: 0, right: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '2.2rem',
      }}>

        {/* ARCO */}
        <div style={{ position: 'relative', width: GW + 24, height: GH + 60, overflow: 'visible' }}>
          <svg
            width={GW + 24} height={GH + 60}
            viewBox={`0 0 ${GW + 24} ${GH + 60}`}
            style={{ overflow: 'visible' }}
          >
            {/* Línea del campo */}
            <line
              x1={-90} y1={GH + 13} x2={GW + 114} y2={GH + 13}
              stroke="#3daa60" strokeWidth={2.5} strokeLinecap="round"
              style={{
                transformOrigin: `${(GW + 24) / 2}px ${GH + 13}px`,
                animation: 'grass-line 0.7s ease 0.2s both',
              }}
            />
            {/* Sombra de los postes */}
            <rect x={14} y={3} width={6} height={GH + 5} rx={2} fill="rgba(0,0,0,0.22)" />
            <rect x={GW + 14} y={3} width={6} height={GH + 5} rx={2} fill="rgba(0,0,0,0.22)" />

            {/* Red */}
            <g style={{
              transformOrigin: `${(GW + 24) / 2}px ${GH / 2}px`,
              animation: 'net-hit 0.5s ease 1.62s both',
            }}>
              <rect x={12} y={0} width={GW} height={GH} fill="rgba(18,52,30,0.2)" />
              {vLines.map((x, i) => (
                <line key={`v${i}`} x1={x} y1={0} x2={x} y2={GH}
                  stroke="rgba(255,255,255,0.18)" strokeWidth={1} />
              ))}
              {hLines.map((y, i) => (
                <line key={`h${i}`} x1={12} y1={y} x2={GW + 12} y2={y}
                  stroke="rgba(255,255,255,0.18)" strokeWidth={1} />
              ))}
            </g>

            {/* Postes y travesaño */}
            <rect x={9}      y={0} width={7} height={GH + 5} rx={2.5} fill="#f2efe8" />
            <rect x={GW + 9} y={0} width={7} height={GH + 5} rx={2.5} fill="#f2efe8" />
            <rect x={9}      y={0} width={GW + 7} height={8}  rx={2.5} fill="#f2efe8" />
          </svg>

          {/* ⚽ Pelota — wrapper X (lineal) → wrapper Y (arco) → escala+spin */}
          <div style={{
            position: 'absolute',
            left: 384,   // esquina superior derecha
            top:  26,
            transform: 'translateX(-420px)',
            animation: 'ball-move-x 1.15s cubic-bezier(0.25,0.08,0.45,1) 0.52s forwards',
          }}>
            <div style={{
              transform: 'translateY(180px)',
              animation: 'ball-move-y 1.15s cubic-bezier(0.42,0,0.28,1) 0.52s forwards',
            }}>
              <span style={{
                fontSize: '2.6rem',
                display: 'block',
                lineHeight: 1,
                transform: 'rotate(0deg) scale(0.18)',
                animation: 'ball-fly 1.15s ease 0.52s forwards',
              }}>⚽</span>
            </div>
          </div>
        </div>

        {/* ¡GOL! */}
        <div style={{
          fontSize: '5.2rem',
          fontWeight: 900,
          color: '#fff',
          letterSpacing: '0.03em',
          fontFamily: 'inherit',
          lineHeight: 1,
          textShadow: '0 0 18px rgba(80,220,110,0.95), 0 0 50px rgba(45,140,78,0.6), 0 3px 10px rgba(0,0,0,0.5)',
          opacity: 0,
          animation: 'gol-pop 0.6s cubic-bezier(0.17,0,0,1.45) 1.72s both',
        }}>
          ¡GOL!
        </div>

        {/* Marca */}
        <div style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.44em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.38)',
          opacity: 0,
          animation: 'logo-rise 0.5s ease 2.25s both',
        }}>
          El Trapo
        </div>
      </div>

      {/* Skip */}
      <p style={{
        position: 'absolute',
        bottom: 'calc(11% + 0.9rem)',
        width: '100%',
        textAlign: 'center',
        fontSize: '0.6rem',
        color: 'rgba(255,255,255,0.18)',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        pointerEvents: 'none',
      }}>
        Tocá para saltar
      </p>
    </div>
  )
}

// ─── LIVE DATA CONTEXT ────────────────────────────────────────────────────────
interface LiveCtx {
  liveFixtures:  ApiFixture[]
  todayFixtures: ApiFixture[]
  connected:     boolean
  openModal:     (f: ApiFixture) => void
}
const LiveDataCtx = createContext<LiveCtx>({
  liveFixtures: [], todayFixtures: [], connected: false, openModal: () => {},
})

// ─── LIVE BADGE ───────────────────────────────────────────────────────────────
function LiveBadge({ minute }: { minute?: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-red-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide">
      <span className="live-dot w-1.5 h-1.5 bg-white rounded-full inline-block" />
      {minute ? `${minute}'` : 'EN VIVO'}
    </span>
  )
}

// ─── MATCH DETAIL MODAL ───────────────────────────────────────────────────────

// Barra de estadística (local vs visitante)
function StatBar({ label, home, away, invert = false }: {
  label: string; home: number | null | undefined; away: number | null | undefined; invert?: boolean
}) {
  if (home == null && away == null) return null
  const h = home ?? 0, a = away ?? 0
  const total = h + a || 1
  const homePct = Math.round((h / total) * 100)
  const awayPct = 100 - homePct
  const homeGood = invert ? a > h : h > a
  const awayGood = invert ? h > a : a > h
  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs mb-1">
        <span className={`font-semibold tabular-nums ${homeGood ? 'text-[#2d8c4e]' : 'text-[#4a3f33]'}`}>{h}</span>
        <span className="text-[#9a8e82] text-[10px] uppercase tracking-wide">{label}</span>
        <span className={`font-semibold tabular-nums ${awayGood ? 'text-[#2d8c4e]' : 'text-[#4a3f33]'}`}>{a}</span>
      </div>
      <div className="flex h-1.5 rounded-full overflow-hidden bg-[#e3ddd0]">
        <div className={`h-full rounded-l-full transition-all ${homeGood ? 'bg-[#2d8c4e]' : 'bg-[#c5b89a]'}`} style={{ width: `${homePct}%` }}/>
        <div className={`h-full rounded-r-full transition-all ${awayGood ? 'bg-[#2d8c4e]' : 'bg-[#c5b89a]'}`} style={{ width: `${awayPct}%` }}/>
      </div>
    </div>
  )
}

type StatObj = Record<string, unknown>

function extractStat(obj: ApiMatchStats | null, side: 'home' | 'away'): StatObj {
  if (!obj) return {}
  if (obj[side] && typeof obj[side] === 'object') return obj[side] as StatObj
  if (Array.isArray(obj)) return ((obj as StatObj[])[side === 'home' ? 0 : 1] ?? {}) as StatObj
  return {}
}

/** Accede a una propiedad anidada y devuelve el número o undefined */
function n(obj: StatObj, ...keys: string[]): number | undefined {
  let cur: unknown = obj
  for (const k of keys) {
    if (cur == null || typeof cur !== 'object') return undefined
    cur = (cur as StatObj)[k]
  }
  return typeof cur === 'number' ? cur : undefined
}

function MatchDetailModal({ fixture, onClose }: { fixture: ApiFixture; onClose: () => void }) {
  const live    = isLiveStatus(fixture.fixture.status.short)
  const elapsed = fixture.fixture.status.elapsed
  const { stats, loading } = useMatchStats(fixture.fixture.id, live)
  const leagueName = leagues.find(l => l.id === fixture._leagueKey)?.name
                   ?? fixture.league.name

  const homeStats = extractStat(stats, 'home')
  const awayStats = extractStat(stats, 'away')
  const rawStats  = (stats ?? {}) as StatObj

  // Posesión puede venir en stats o en la raíz del objeto
  const homePoss = n(homeStats,'possession') ?? n(rawStats,'home_possession') ?? null
  const awayPoss = n(awayStats,'possession') ?? n(rawStats,'away_possession') ?? null

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#f5f0e6] rounded-2xl border border-[#cfc3aa] shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Cabecera */}
        <div className="bg-[#ede8db] border-b border-[#cfc3aa] px-5 py-4 rounded-t-2xl flex-shrink-0">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs text-[#9a8e82] font-medium">{leagueName} · {fixture.league.round}</span>
            <div className="flex items-center gap-2">
              {live && <LiveBadge minute={elapsed ?? undefined}/>}
              {!live && isFinishedStatus(fixture.fixture.status.short) && (
                <span className="text-xs text-[#9a8e82] bg-[#ddd8cc] px-2 py-0.5 rounded">Final</span>
              )}
              <button onClick={onClose} className="text-[#9a8e82] hover:text-[#1e1611] transition-colors p-1 rounded">
                <X size={16}/>
              </button>
            </div>
          </div>
          {/* Marcador */}
          <div className="flex items-center justify-between gap-3">
            <span className="font-bold text-[#1e1611] text-sm flex-1 leading-tight">{fixture.teams.home.name}</span>
            <div className="bg-[#1e1611] text-white font-black text-2xl px-5 py-2 rounded-xl tabular-nums flex-shrink-0">
              {fixture.goals.home ?? '-'} – {fixture.goals.away ?? '-'}
            </div>
            <span className="font-bold text-[#1e1611] text-sm flex-1 text-right leading-tight">{fixture.teams.away.name}</span>
          </div>
          {fixture.score.halftime.home !== null && (
            <p className="text-center text-xs text-[#9a8e82] mt-2">
              Primer tiempo: {fixture.score.halftime.home} – {fixture.score.halftime.away}
            </p>
          )}
        </div>

        {/* Estadísticas */}
        <div className="flex-1 overflow-y-auto p-4 min-h-0">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#9a8e82] mb-4">Estadísticas del Partido</h4>

          {loading && !stats && (
            <p className="text-center text-[#9a8e82] text-sm py-8">Cargando estadísticas…</p>
          )}

          {!loading && !stats && (
            <div className="text-center py-8">
              <p className="text-[#9a8e82] text-sm">Sin estadísticas disponibles</p>
              <p className="text-[#c5b89a] text-xs mt-1">Los datos aparecen una vez iniciado el partido</p>
            </div>
          )}

          {stats && (
            <div>
              {/* Posesión */}
              {(homePoss != null || awayPoss != null) && (
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold tabular-nums text-[#4a3f33]">{homePoss ?? 50}%</span>
                    <span className="text-[#9a8e82] text-[10px] uppercase tracking-wide">Posesión</span>
                    <span className="font-semibold tabular-nums text-[#4a3f33]">{awayPoss ?? 50}%</span>
                  </div>
                  <div className="flex h-1.5 rounded-full overflow-hidden bg-[#e3ddd0]">
                    <div className="h-full bg-[#2d8c4e]" style={{ width: `${homePoss ?? 50}%` }}/>
                    <div className="h-full bg-[#c5b89a]" style={{ width: `${awayPoss ?? 50}%` }}/>
                  </div>
                </div>
              )}

              <StatBar label="Tiros"           home={n(homeStats,'shots','total')    ?? n(homeStats,'shots')}     away={n(awayStats,'shots','total')    ?? n(awayStats,'shots')}/>
              <StatBar label="Tiros al arco"  home={n(homeStats,'shots','on_target')}                             away={n(awayStats,'shots','on_target')}/>
              <StatBar label="Pases"          home={n(homeStats,'passes','total')   ?? n(homeStats,'passes')}    away={n(awayStats,'passes','total')   ?? n(awayStats,'passes')}/>
              <StatBar label="Precisión pases" home={n(homeStats,'passes','accuracy')}                           away={n(awayStats,'passes','accuracy')}/>
              <StatBar label="xG"             home={n(homeStats,'np_expected_goals')}                            away={n(awayStats,'np_expected_goals')}/>
              <StatBar label="Atajadas"       home={n(homeStats,'goalkeeping','saves')}                          away={n(awayStats,'goalkeeping','saves')} invert/>
              <StatBar label="Duelos ganados" home={n(homeStats,'duels','won')}                                  away={n(awayStats,'duels','won')}/>
            </div>
          )}
        </div>

        {/* Pie */}
        {live && (
          <div className="border-t border-[#cfc3aa] px-5 py-2 flex items-center gap-1.5 text-[10px] text-[#9a8e82] bg-[#ede8db] rounded-b-2xl flex-shrink-0">
            <span className="w-1.5 h-1.5 bg-[#2d8c4e] rounded-full live-dot"/>
            Estadísticas en vivo · Actualización cada 30s
          </div>
        )}
      </div>
    </div>
  )
}

// ─── SCORE CARD ───────────────────────────────────────────────────────────────
function ScoreCard({ match }: { match: Match }) {
  const home   = getTeam(match.leagueId, match.homeId)
  const away   = getTeam(match.leagueId, match.awayId)
  const league = leagues.find(l => l.id === match.leagueId)

  // ── Datos en vivo desde la API ─────────────────────────────────────────────
  const { liveFixtures, todayFixtures, openModal } = useContext(LiveDataCtx)
  const apiF = home && away
    ? findApiFixture([...liveFixtures, ...todayFixtures], home.name, away.name)
    : undefined

  const apiStatus  = apiF?.fixture.status
  const isLive     = apiF ? isLiveStatus(apiStatus!.short)     : match.status === 'live'
  const isFinished = apiF ? isFinishedStatus(apiStatus!.short) : match.status === 'finished'
  const liveMin    = apiF ? (apiStatus!.elapsed ?? match.minute) : match.minute

  // Preferir score de la API cuando el partido ya empezó
  const homeScore = (isLive || isFinished) && apiF
    ? (apiF.goals.home ?? match.homeScore)
    : match.homeScore
  const awayScore = (isLive || isFinished) && apiF
    ? (apiF.goals.away ?? match.awayScore)
    : match.awayScore

  const hasScore   = homeScore !== undefined && awayScore !== undefined
  const isClickable = !!apiF

  return (
    <div
      onClick={isClickable ? () => openModal(apiF!) : undefined}
      className={`bg-[#ede8db] border border-[#cfc3aa] rounded-lg p-3 transition-all
        ${isLive ? 'live-card' : ''}
        ${isClickable ? 'cursor-pointer hover:border-[#2d8c4e] hover:shadow-sm' : 'hover:border-[#2d8c4e]/50'}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-[#9a8e82] flex items-center gap-1">
          {league?.logo
            ? <img src={league.logo} alt="" className="h-3.5 w-3.5 object-contain inline-block"
                onError={e => { (e.currentTarget as HTMLImageElement).style.display='none' }}/>
            : league?.flag
          }
          {league?.name}
        </span>
        <div className="flex items-center gap-1.5">
          {isClickable && (
            <span className="text-[9px] text-[#2d8c4e] font-medium uppercase tracking-wide opacity-60">API</span>
          )}
          {isLive
            ? <LiveBadge minute={liveMin} />
            : isFinished
              ? <span className="text-xs text-[#9a8e82]">Final</span>
              : <span className="text-xs text-[#7a6e63] flex items-center gap-1"><Clock size={11}/>{match.time}</span>
          }
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className={`flex-1 flex items-center gap-1.5 text-sm font-semibold ${isLive ? 'text-[#1e1611]' : 'text-[#4a3f33]'}`}>
          <Crest team={home} size={18}/>
          {home?.short ?? match.homeId}
        </div>
        <div className="flex items-center justify-center bg-[#ddd8cc] rounded px-3 py-1 min-w-[60px]">
          {hasScore
            ? <span className={`text-base font-bold tabular-nums ${isLive ? 'text-[#2d8c4e]' : 'text-[#1e1611]'}`}>
                {homeScore} – {awayScore}
              </span>
            : <span className="text-xs text-[#9a8e82]">{match.time}</span>
          }
        </div>
        <div className={`flex-1 flex items-center justify-end gap-1.5 text-sm font-semibold ${isLive ? 'text-[#1e1611]' : 'text-[#4a3f33]'}`}>
          {away?.short ?? match.awayId}
          <Crest team={away} size={18}/>
        </div>
      </div>
      <div className="flex justify-between mt-1.5">
        <span className="text-xs text-[#9a8e82] truncate">{home?.name}</span>
        <span className="text-xs text-[#9a8e82] truncate text-right">{away?.name}</span>
      </div>
    </div>
  )
}

// ─── STANDINGS TABLE ──────────────────────────────────────────────────────────
function StandingsRows({ standings, teams }: { standings: NonNullable<League['standings']>; teams: Team[] }) {
  return (
    <>
      {standings.map((row, i) => {
        const team = teams.find(t => t.id === row.teamId)
        const prevZone = i > 0 ? standings[i - 1].zone : row.zone
        const zoneChanged = i > 0 && prevZone !== row.zone && (row.zone !== null || prevZone !== null)
        return (
          <tr
            key={row.teamId}
            className={`border-b border-[#e3ddd0] hover:bg-[#e8e2d4] transition-colors ${zoneColor(row.zone)} ${zoneChanged ? 'border-t-2 border-t-[#b0a890]' : ''}`}
          >
            <td className="py-2 px-2 text-[#9a8e82] text-xs">{row.pos}</td>
            <td className="py-2 px-2 font-medium text-[#1e1611]">
              <div className="flex items-center gap-1.5">
                <Crest team={team} size={18}/>
                {team?.name ?? row.teamId}
              </div>
            </td>
            <td className="py-2 px-1 text-center text-[#7a6e63]">{row.pj}</td>
            <td className="py-2 px-1 text-center text-[#7a6e63]">{row.g}</td>
            <td className="py-2 px-1 text-center text-[#7a6e63]">{row.e}</td>
            <td className="py-2 px-1 text-center text-[#7a6e63]">{row.p}</td>
            <td className="py-2 px-1 text-center text-[#7a6e63]">{row.gf}</td>
            <td className="py-2 px-1 text-center text-[#7a6e63]">{row.gc}</td>
            <td className={`py-2 px-1 text-center font-medium ${row.dif > 0 ? 'text-green-700' : row.dif < 0 ? 'text-red-600' : 'text-[#9a8e82]'}`}>
              {row.dif > 0 ? `+${row.dif}` : row.dif}
            </td>
            <td className="py-2 px-2 text-center font-bold text-[#2d8c4e]">{row.pts}</td>
            <td className="py-2 px-2 text-center">{zoneBadge(row.zone)}</td>
          </tr>
        )
      })}
    </>
  )
}

const standingsHead = (
  <thead>
    <tr className="text-[#9a8e82] text-xs uppercase tracking-wide border-b border-[#cfc3aa]">
      <th className="py-2 px-2 text-left w-8">#</th>
      <th className="py-2 px-2 text-left">Equipo</th>
      <th className="py-2 px-1 text-center">PJ</th>
      <th className="py-2 px-1 text-center">G</th>
      <th className="py-2 px-1 text-center">E</th>
      <th className="py-2 px-1 text-center">P</th>
      <th className="py-2 px-1 text-center">GF</th>
      <th className="py-2 px-1 text-center">GC</th>
      <th className="py-2 px-1 text-center">Dif</th>
      <th className="py-2 px-2 text-center font-bold text-[#1e1611]">Pts</th>
      <th className="py-2 px-2 text-center">Zona</th>
    </tr>
  </thead>
)

function StandingsTable({ league }: { league: League }) {
  // ── Formato con zonas (Argentina) ─────────────────────────────────────────
  if (league.zones && league.zones.length > 0) {
    return (
      <div>
        {/* Info banner */}
        <div className="flex items-center gap-3 mb-5 bg-[#e3ddd0] rounded-lg px-4 py-3 text-sm">
          <span className="text-lg">🇦🇷</span>
          <div>
            <span className="font-bold text-[#1e1611]">Torneo Apertura 2026</span>
            <span className="mx-2 text-[#cfc3aa]">·</span>
            <span className="text-[#7a6e63]">Fecha 16/16 — Fase Regular</span>
          </div>
          <div className="ml-auto text-xs text-[#9a8e82]">Top 8 de c/zona → Playoffs</div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {league.zones.map((zone: Zone) => (
            <div key={zone.name} className="overflow-x-auto">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#2d8c4e]">{zone.name}</span>
                <div className="flex-1 h-px bg-[#cfc3aa]"/>
              </div>
              <table className="w-full text-sm">
                {standingsHead}
                <tbody>
                  <StandingsRows standings={zone.standings} teams={league.teams}/>
                </tbody>
              </table>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mt-5 px-1 text-xs text-[#7a6e63]">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-sky-500 rounded-sm"/>Clasifican a Playoffs (top 8)</span>
        </div>
      </div>
    )
  }

  // ── Formato estándar (ligas europeas) ─────────────────────────────────────
  const standings = league.standings ?? []
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        {standingsHead}
        <tbody>
          <StandingsRows standings={standings} teams={league.teams}/>
        </tbody>
      </table>
      <div className="flex flex-wrap gap-3 mt-4 px-2 text-xs text-[#7a6e63]">
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-green-600 rounded-sm"/>Champions League</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-amber-500 rounded-sm"/>Europa League</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-emerald-400 rounded-sm"/>Conference League</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-red-500 rounded-sm"/>Descenso</span>
      </div>
    </div>
  )
}

// ─── SCORERS TABLE ────────────────────────────────────────────────────────────
function ScorersTable({ league }: { league: League }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-[#9a8e82] text-xs uppercase tracking-wide border-b border-[#cfc3aa]">
            <th className="py-2 px-2 text-left w-8">#</th>
            <th className="py-2 px-2 text-left">Jugador</th>
            <th className="py-2 px-2 text-left">Equipo</th>
            <th className="py-2 px-3 text-center text-[#2d8c4e]"><Target size={13} className="inline mr-1"/>Goles</th>
          </tr>
        </thead>
        <tbody>
          {league.scorers.map(s => {
            const team = league.teams.find(t => t.id === s.teamId)
            return (
              <tr key={s.pos} className="border-b border-[#e3ddd0] hover:bg-[#e8e2d4] transition-colors">
                <td className="py-2 px-2 text-[#9a8e82] text-xs">{s.pos}</td>
                <td className="py-2 px-2 font-medium text-[#1e1611]">{s.name}</td>
                <td className="py-2 px-2 text-[#7a6e63]">
                  <div className="flex items-center gap-1.5">
                    <Crest team={team} size={16}/>
                    {team?.name ?? s.teamId}
                  </div>
                </td>
                <td className="py-2 px-3 text-center">
                  <span className="bg-[#2d8c4e]/15 text-[#1e6b3a] font-bold px-2 py-0.5 rounded">{s.goals}</span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

// ─── DISCIPLINE TABLE ─────────────────────────────────────────────────────────
function DisciplineTable({ league }: { league: League }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-[#9a8e82] text-xs uppercase tracking-wide border-b border-[#cfc3aa]">
            <th className="py-2 px-2 text-left">Jugador</th>
            <th className="py-2 px-2 text-left">Equipo</th>
            <th className="py-2 px-3 text-center">🟨 Amarillas</th>
            <th className="py-2 px-3 text-center">🟥 Rojas</th>
          </tr>
        </thead>
        <tbody>
          {league.discipline.map((d, i) => {
            const team = league.teams.find(t => t.id === d.teamId)
            return (
              <tr key={i} className="border-b border-[#e3ddd0] hover:bg-[#e8e2d4] transition-colors">
                <td className="py-2 px-2 font-medium text-[#1e1611]">{d.name}</td>
                <td className="py-2 px-2 text-[#7a6e63]">
                  <div className="flex items-center gap-1.5">
                    <Crest team={team} size={16}/>
                    {team?.name ?? d.teamId}
                  </div>
                </td>
                <td className="py-2 px-3 text-center">
                  <span className="bg-yellow-400/25 text-yellow-800 font-bold px-2 py-0.5 rounded">{d.ta}</span>
                </td>
                <td className="py-2 px-3 text-center">
                  {d.tr > 0
                    ? <span className="bg-red-500/20 text-red-700 font-bold px-2 py-0.5 rounded">{d.tr}</span>
                    : <span className="text-[#c5b89a]">—</span>
                  }
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

// ─── CALENDAR VIEW ────────────────────────────────────────────────────────────
function CalendarView({ matches }: { matches: Match[] }) {
  const byDate = useMemo(() => {
    const map: Record<string, Match[]> = {}
    matches.forEach(m => { if (!map[m.date]) map[m.date] = []; map[m.date].push(m) })
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b))
  }, [matches])

  const fmt = (d: string) => {
    const [y, mo, dy] = d.split('-')
    const names = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb']
    const date = new Date(+y, +mo - 1, +dy)
    return `${names[date.getDay()]} ${dy}/${mo}`
  }

  return (
    <div className="space-y-5">
      {byDate.map(([date, ms]) => (
        <div key={date}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-[#2d8c4e] uppercase tracking-widest">{fmt(date)}</span>
            <div className="flex-1 h-px bg-[#cfc3aa]"/>
          </div>
          <div className="space-y-2">
            {ms.map(m => <ScoreCard key={m.id} match={m}/>)}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── LEAGUE CALENDAR VIEW (agrupa por fecha/round) ───────────────────────────
const PLAYOFF_ROUNDS = new Set(['Octavos de Final','Cuartos de Final','Semifinales','Final'])

function LeagueCalendarView({ matches }: { matches: Match[] }) {
  const byRound = useMemo(() => {
    const map: Record<string, Match[]> = {}
    matches.forEach(m => {
      const key = m.round ?? m.date
      if (!map[key]) map[key] = []
      map[key].push(m)
    })
    return Object.entries(map)
  }, [matches])

  // Mostrar la última fecha con partidos jugados por defecto
  const defaultIdx = useMemo(() => {
    const lastFinished = byRound.reduce((acc, [, rms], i) =>
      rms.some(m => m.status === 'finished') ? i : acc, 0)
    return lastFinished
  }, [byRound])

  const [selectedIdx, setSelectedIdx] = useState(defaultIdx)

  const [round, ms] = byRound[selectedIdx] ?? ['', []]
  const isPlayoff = PLAYOFF_ROUNDS.has(round)
  const finished  = ms.filter(m => m.status === 'finished').length
  const upcoming  = ms.filter(m => m.status === 'upcoming').length

  // Rango de fechas de la jornada seleccionada
  const dateRange = useMemo(() => {
    const [, roundMs] = byRound[selectedIdx] ?? ['', []]
    if (!roundMs.length) return ''
    const sorted = [...roundMs.map(m => m.date)].sort()
    const fmt = (d: string) => {
      const [, mo, dy] = d.split('-')
      const mnames = ['','Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']
      return `${parseInt(dy)} ${mnames[parseInt(mo)]}`
    }
    if (sorted[0] === sorted[sorted.length - 1]) return fmt(sorted[0])
    return `${fmt(sorted[0])} – ${fmt(sorted[sorted.length - 1])}`
  }, [byRound, selectedIdx])

  return (
    <div>
      {/* Selector de fecha */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {byRound.map(([r, rms], i) => {
          const isDone   = rms.every(m => m.status === 'finished')
          const isPO     = PLAYOFF_ROUNDS.has(r)
          const isActive = i === selectedIdx
          return (
            <button
              key={r}
              onClick={() => setSelectedIdx(i)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
                isActive
                  ? isPO
                    ? 'bg-[#2d8c4e] border-[#2d8c4e] text-white'
                    : 'bg-[#1e1611] border-[#1e1611] text-white'
                  : isDone
                    ? 'bg-[#e3ddd0] border-[#cfc3aa] text-[#7a6e63] hover:border-[#2d8c4e]/50'
                    : 'bg-[#f5f0e6] border-[#2d8c4e]/50 text-[#2d8c4e] hover:bg-[#2d8c4e]/10'
              }`}
            >
              {r}
            </button>
          )
        })}
      </div>

      {/* Header de la fecha seleccionada */}
      <div className="flex items-center gap-3 mb-4">
        {isPlayoff
          ? <span className="bg-[#2d8c4e] text-white text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">{round}</span>
          : <span className="text-lg font-bold text-[#1e1611]">{round}</span>
        }
        <div className="flex-1 h-px bg-[#cfc3aa]"/>
        <span className="text-xs text-[#9a8e82] flex items-center gap-2">
          {dateRange && (
            <span className="text-[#7a6e63] font-medium border-r border-[#cfc3aa] pr-2">{dateRange}</span>
          )}
          <span>
            {finished > 0 && `${finished} jugados`}
            {finished > 0 && upcoming > 0 && ' · '}
            {upcoming > 0 && `${upcoming} próximos`}
          </span>
        </span>
      </div>

      {/* Partidos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {ms.map(m => <ScoreCard key={m.id} match={m}/>)}
      </div>

      {/* Navegación prev/next */}
      <div className="flex justify-between mt-5">
        <button
          onClick={() => setSelectedIdx(i => Math.max(0, i - 1))}
          disabled={selectedIdx === 0}
          className="flex items-center gap-1 text-sm text-[#7a6e63] hover:text-[#1e1611] disabled:opacity-30 transition-colors"
        >
          ← {selectedIdx > 0 ? byRound[selectedIdx - 1][0] : ''}
        </button>
        <button
          onClick={() => setSelectedIdx(i => Math.min(byRound.length - 1, i + 1))}
          disabled={selectedIdx === byRound.length - 1}
          className="flex items-center gap-1 text-sm text-[#7a6e63] hover:text-[#1e1611] disabled:opacity-30 transition-colors"
        >
          {selectedIdx < byRound.length - 1 ? byRound[selectedIdx + 1][0] : ''} →
        </button>
      </div>
    </div>
  )
}

// ─── LEAGUE PAGE ──────────────────────────────────────────────────────────────
type LeagueTab = 'standings' | 'calendar' | 'scorers' | 'discipline'

function LeaguePage({ league }: { league: League }) {
  const [tab, setTab] = useState<LeagueTab>('standings')

  const tabs: { id: LeagueTab; label: string; icon: React.ReactNode }[] = [
    { id:'standings',  label:'Posiciones', icon:<Shield size={14}/> },
    { id:'calendar',   label:'Calendario',  icon:<Calendar size={14}/> },
    { id:'scorers',    label:'Goleadores',  icon:<Target size={14}/> },
    { id:'discipline', label:'Disciplina',  icon:<AlertTriangle size={14}/> },
  ]

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        {league.logo
          ? <img src={league.logo} alt={league.name}
              className="h-12 w-12 object-contain flex-shrink-0"
              onError={e => { (e.currentTarget as HTMLImageElement).style.display='none' }}
            />
          : <span className="text-3xl">{league.flag}</span>
        }
        <div>
          <h2 className="text-2xl font-bold text-[#1e1611]">{league.name}</h2>
          <p className="text-[#9a8e82] text-sm">{league.country} · Temporada 2025/26</p>
        </div>
      </div>

      <div className="flex gap-1 mb-6 bg-[#ede8db] border border-[#cfc3aa] rounded-lg p-1 overflow-x-auto">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
              tab === t.id
                ? 'bg-[#2d8c4e] text-white shadow-sm'
                : 'text-[#7a6e63] hover:text-[#1e1611] hover:bg-[#e3ddd0]'
            }`}
          >
            {t.icon}{t.label}
          </button>
        ))}
      </div>

      <div className="bg-[#ede8db] rounded-xl border border-[#cfc3aa] p-4">
        {tab === 'standings'  && <StandingsTable league={league}/>}
        {tab === 'calendar'   && (
          league.calendar.some(m => m.round)
            ? <LeagueCalendarView matches={league.calendar}/>
            : <CalendarView matches={league.calendar}/>
        )}
        {tab === 'scorers'    && <ScorersTable league={league}/>}
        {tab === 'discipline' && <DisciplineTable league={league}/>}
      </div>
    </div>
  )
}

// ─── MY TEAMS PAGE ────────────────────────────────────────────────────────────
function MyTeamsPage({ favorites, onToggle }: { favorites: Set<string>; onToggle: (id: string) => void }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-[#1e1611] mb-1">Mis Equipos</h2>
      <p className="text-[#9a8e82] text-sm mb-6">Seguí tus equipos favoritos y recibí sus resultados primero</p>
      {leagues.map(league => (
        <div key={league.id} className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">{league.flag}</span>
            <h3 className="font-semibold text-[#4a3f33]">{league.name}</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {league.teams.map(team => {
              const key = `${league.id}:${team.id}`
              const isFav = favorites.has(key)
              return (
                <button
                  key={team.id}
                  onClick={() => onToggle(key)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                    isFav
                      ? 'bg-[#2d8c4e]/10 border-[#2d8c4e] text-[#1e1611]'
                      : 'bg-[#f5f0e6] border-[#cfc3aa] text-[#7a6e63] hover:border-[#2d8c4e]/50 hover:text-[#1e1611]'
                  }`}
                >
                  <Heart size={13} className={isFav ? 'fill-[#2d8c4e] text-[#2d8c4e]' : 'text-[#c5b89a]'}/>
                  <Crest team={team} size={16}/>
                  <span className="truncate">{team.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── TOURNAMENTS PAGE ─────────────────────────────────────────────────────────
function TournamentsPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-[#1e1611] mb-1">Torneos</h2>
      <p className="text-[#9a8e82] text-sm mb-6">Las competencias más importantes del mundo</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tournaments.map(t => (
          <div
            key={t.id}
            className="bg-[#ede8db] border border-[#cfc3aa] rounded-xl p-5 hover:border-[#2d8c4e]/50 hover:shadow-sm transition-all cursor-pointer group"
          >
            <div className="text-4xl mb-3">{t.icon}</div>
            <h3 className="font-bold text-[#1e1611] text-lg group-hover:text-[#2d8c4e] transition-colors">{t.name}</h3>
            <p className="text-[#9a8e82] text-sm mt-1">{t.region}</p>
            <div className="mt-3 flex items-center gap-1 text-xs text-[#c5b89a]">
              <Zap size={11}/><span>Temporada 2025/26</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── COPAS PAGE ───────────────────────────────────────────────────────────────
function CopGroupCard({ group }: { group: CopGroup }) {
  return (
    <div className="bg-[#ede8db] border border-[#cfc3aa] rounded-xl overflow-hidden">
      <div className="bg-[#ddd8cc] px-4 py-2 border-b border-[#cfc3aa]">
        <span className="text-xs font-bold uppercase tracking-wider text-[#4a3f33]">{group.name}</span>
      </div>
      <table className="w-full text-xs">
        <thead>
          <tr className="text-[#9a8e82] border-b border-[#cfc3aa]">
            <th className="py-1.5 px-3 text-left">Equipo</th>
            <th className="py-1.5 px-1 text-center">PJ</th>
            <th className="py-1.5 px-1 text-center">G</th>
            <th className="py-1.5 px-1 text-center">E</th>
            <th className="py-1.5 px-1 text-center">P</th>
            <th className="py-1.5 px-1 text-center">Dif</th>
            <th className="py-1.5 px-2 text-center font-bold text-[#1e1611]">Pts</th>
          </tr>
        </thead>
        <tbody>
          {group.teams.map((t, i) => (
            <tr
              key={t.name}
              className={`border-b border-[#e3ddd0] transition-colors ${
                i < 2 ? 'bg-[#2d8c4e]/5 hover:bg-[#2d8c4e]/10' : 'hover:bg-[#e8e2d4]'
              } ${i === 1 ? 'border-b-2 border-b-[#2d8c4e]/30' : ''}`}
            >
              <td className="py-2 px-3">
                <div className="flex items-center gap-1.5">
                  {i < 2 && <span className="w-1.5 h-1.5 bg-[#2d8c4e] rounded-full flex-shrink-0"/>}
                  {i >= 2 && <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"/>}
                  <span className="font-medium text-[#1e1611]">{t.flag} {t.name}</span>
                </div>
                <div className="text-[10px] text-[#9a8e82] ml-3">{t.country}</div>
              </td>
              <td className="py-2 px-1 text-center text-[#7a6e63]">{t.pj}</td>
              <td className="py-2 px-1 text-center text-[#7a6e63]">{t.g}</td>
              <td className="py-2 px-1 text-center text-[#7a6e63]">{t.e}</td>
              <td className="py-2 px-1 text-center text-[#7a6e63]">{t.p}</td>
              <td className={`py-2 px-1 text-center font-medium ${t.dif > 0 ? 'text-green-700' : t.dif < 0 ? 'text-red-600' : 'text-[#9a8e82]'}`}>
                {t.dif > 0 ? `+${t.dif}` : t.dif}
              </td>
              <td className="py-2 px-2 text-center font-bold text-[#2d8c4e]">{t.pts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function CopasPage({ competition }: { competition: CopCompetition }) {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-4xl">{competition.icon}</span>
        <div>
          <h2 className="text-2xl font-bold text-[#1e1611]">{competition.name}</h2>
          <p className="text-[#9a8e82] text-sm">{competition.phase} · Temporada {competition.season}</p>
        </div>
      </div>

      {/* Info banner */}
      <div className="bg-[#ede8db] border border-[#cfc3aa] rounded-xl px-5 py-4 mb-6 flex flex-wrap gap-6">
        <div>
          <div className="text-xs text-[#9a8e82] uppercase tracking-wide mb-0.5">Fase Actual</div>
          <div className="font-semibold text-[#1e1611]">{competition.phase}</div>
        </div>
        <div>
          <div className="text-xs text-[#9a8e82] uppercase tracking-wide mb-0.5">Final</div>
          <div className="font-semibold text-[#1e1611]">📍 {competition.finalCity} · {competition.finalDate}</div>
        </div>
        <div>
          <div className="text-xs text-[#9a8e82] uppercase tracking-wide mb-0.5">Grupos</div>
          <div className="font-semibold text-[#1e1611]">{competition.groups.length} grupos · {competition.groups.length * 4} equipos</div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-4 text-xs text-[#7a6e63]">
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-[#2d8c4e] rounded-full"/>Clasifican a Octavos de Final</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-[#cfc3aa] rounded-full"/>Eliminados</span>
      </div>

      {/* Groups grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {competition.groups.map(g => (
          <CopGroupCard key={g.name} group={g}/>
        ))}
      </div>
    </div>
  )
}

// ─── LIVE PAGE ────────────────────────────────────────────────────────────────
function LivePage() {
  const { liveFixtures, connected, openModal } = useContext(LiveDataCtx)

  const today = new Date().toISOString().split('T')[0]

  // ¿La API dice que este partido está en vivo ahora mismo?
  const isApiLive = (m: Match) => {
    const home = getTeam(m.leagueId, m.homeId)
    const away = getTeam(m.leagueId, m.awayId)
    if (!home || !away) return false
    const apiF = findApiFixture(liveFixtures, home.name, away.name)
    return apiF ? isLiveStatus(apiF.fixture.status.short) : false
  }

  // Partidos estáticos en vivo: status='live' O partidos de hoy que la API confirma como live
  const staticLive   = allMatches.filter(m => m.status === 'live' || (m.date === today && isApiLive(m)))
  const recentStatic = allMatches.filter(m => m.status === 'finished').slice(0, 8)

  // Partidos de la API que NO tienen ningún partido estático correspondiente
  const extraApiLive = liveFixtures.filter(f => {
    const leagueMs = allMatches.filter(m => m.leagueId === f._leagueKey)
    return !leagueMs.some(m => {
      const home = getTeam(m.leagueId, m.homeId)
      const away = getTeam(m.leagueId, m.awayId)
      const match = findApiFixture([f], home?.name ?? '', away?.name ?? '')
      return !!match
    })
  })

  const totalLive = staticLive.length + extraApiLive.length

  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <LiveBadge/>
        <h2 className="text-2xl font-bold text-[#1e1611]">Partidos en Vivo</h2>
        <div className="ml-auto flex items-center gap-1.5 text-xs text-[#9a8e82]">
          {connected
            ? <><Wifi size={12} className="text-[#2d8c4e]"/> Datos en tiempo real</>
            : <><WifiOff size={12} className="text-[#c5b89a]"/> Solo datos locales</>
          }
        </div>
      </div>

      {totalLive > 0
        ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
            {staticLive.map(m => <ScoreCard key={m.id} match={m}/>)}
            {/* Partidos extra de la API no representados en datos estáticos */}
            {extraApiLive.map(f => (
              <div
                key={f.fixture.id}
                onClick={() => openModal(f)}
                className="bg-[#ede8db] border border-[#2d8c4e]/40 rounded-lg p-3 cursor-pointer hover:border-[#2d8c4e] hover:shadow-sm transition-all live-card"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[#9a8e82]">{f.league.name}</span>
                  <LiveBadge minute={f.fixture.status.elapsed ?? undefined}/>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex-1 text-sm font-semibold text-[#1e1611]">{f.teams.home.name}</span>
                  <div className="bg-[#ddd8cc] rounded px-3 py-1 min-w-[60px] text-center">
                    <span className="text-base font-bold tabular-nums text-[#2d8c4e]">
                      {f.goals.home ?? '-'} – {f.goals.away ?? '-'}
                    </span>
                  </div>
                  <span className="flex-1 text-sm font-semibold text-right text-[#1e1611]">{f.teams.away.name}</span>
                </div>
                <p className="text-[10px] text-[#2d8c4e] mt-1.5 text-right">Toca para ver incidencias →</p>
              </div>
            ))}
          </div>
        )
        : (
          <div className="text-[#9a8e82] text-center py-12">
            {connected ? 'No hay partidos en vivo ahora mismo' : 'Sin partidos en vivo · Sin conexión al servidor API'}
          </div>
        )
      }

      <h3 className="text-lg font-semibold text-[#4a3f33] mb-4 flex items-center gap-2">
        <Activity size={16} className="text-[#2d8c4e]"/> Resultados Recientes
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {recentStatic.map(m => <ScoreCard key={m.id} match={m}/>)}
      </div>
    </div>
  )
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ favorites: _favorites }: { favorites: Set<string> }) {
  const { liveFixtures } = useContext(LiveDataCtx)

  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], [])
  const tomorrowStr = useMemo(() => {
    const d = new Date(); d.setDate(d.getDate() + 1)
    return d.toISOString().split('T')[0]
  }, [])

  // Todas las fechas futuras con partidos
  const upcomingDates = useMemo(() =>
    [...new Set(allMatches.filter(m => m.date >= todayStr).map(m => m.date))].sort()
  , [todayStr])

  const defaultDay = upcomingDates.includes(tomorrowStr) ? tomorrowStr : (upcomingDates[0] ?? todayStr)
  const [selectedDay, setSelectedDay] = useState(defaultDay)

  // Partidos en vivo
  const liveMatches = useMemo(() =>
    allMatches.filter(m => {
      if (m.status === 'live') return true
      if (m.date !== todayStr) return false
      const home = getTeam(m.leagueId, m.homeId)
      const away = getTeam(m.leagueId, m.awayId)
      if (!home || !away) return false
      const apiF = findApiFixture(liveFixtures, home.name, away.name)
      return apiF ? isLiveStatus(apiF.fixture.status.short) : false
    })
  , [todayStr, liveFixtures])

  // Partidos del día seleccionado, agrupados por liga
  const byLeague = useMemo(() => {
    const dayMs = allMatches.filter(m => m.date === selectedDay)
    return leagues
      .map(l => ({ league: l, matches: dayMs.filter(m => m.leagueId === l.id) }))
      .filter(g => g.matches.length > 0)
  }, [selectedDay])

  // Etiqueta de fecha
  const dayLabel = (d: string) => {
    if (d === todayStr)    return 'Hoy'
    if (d === tomorrowStr) return 'Mañana'
    const [, mo, dy] = d.split('-')
    const mnames = ['','Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']
    return `${parseInt(dy)} ${mnames[parseInt(mo)]}`
  }

  // Etiqueta larga de fecha para el encabezado
  const dayLabelLong = (d: string) => {
    const [y, mo, dy] = d.split('-')
    const days   = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']
    const months = ['','Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    const date   = new Date(+y, +mo - 1, +dy)
    return `${days[date.getDay()]} ${parseInt(dy)} de ${months[parseInt(mo)]}`
  }

  return (
    <div className="space-y-6">

      {/* EN VIVO — solo si hay partidos */}
      {liveMatches.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <LiveBadge />
            <h2 className="text-sm font-bold text-[#1e1611] uppercase tracking-wide">En Vivo</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-2">
            {liveMatches.map(m => <ScoreCard key={m.id} match={m} />)}
          </div>
          <div className="border-t border-[#ddd8cc] pt-6" />
        </section>
      )}

      {/* Selector de jornada */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[10px] text-[#9a8e82] font-bold uppercase tracking-widest mr-1">Jornada</span>
        {upcomingDates.slice(0, 6).map(d => (
          <button
            key={d}
            onClick={() => setSelectedDay(d)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
              selectedDay === d
                ? 'bg-[#1e1611] text-white border-[#1e1611]'
                : 'bg-[#f5f0e6] text-[#7a6e63] border-[#cfc3aa] hover:border-[#2d8c4e]/60 hover:text-[#1e1611]'
            }`}
          >
            {dayLabel(d)}
          </button>
        ))}
      </div>

      {/* Encabezado de fecha */}
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-black text-[#1e1611]">{dayLabelLong(selectedDay)}</h2>
        <div className="flex-1 h-px bg-[#ddd8cc]" />
        <span className="text-xs text-[#9a8e82]">
          {byLeague.reduce((acc, g) => acc + g.matches.length, 0)} partidos
        </span>
      </div>

      {/* Partidos agrupados por liga */}
      {byLeague.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">📅</p>
          <p className="text-[#9a8e82]">No hay partidos para este día</p>
        </div>
      ) : (
        <div className="space-y-7">
          {byLeague.map(({ league, matches }) => (
            <section key={league.id}>
              {/* Cabecera de liga */}
              <div className="flex items-center gap-2.5 mb-3">
                {league.logo
                  ? <img src={league.logo} alt={league.name}
                      className="h-8 w-8 object-contain flex-shrink-0"
                      onError={e => { (e.currentTarget as HTMLImageElement).style.display='none' }}
                    />
                  : <span className="text-2xl leading-none">{league.flag}</span>
                }
                <div className="min-w-0">
                  <span className="font-bold text-[#1e1611] text-sm">{league.name}</span>
                  <span className="text-xs text-[#9a8e82] ml-2">{league.country}</span>
                </div>
                <div className="flex-1 h-px bg-[#ddd8cc] ml-1" />
                <span className="text-[11px] text-[#9a8e82] flex-shrink-0 tabular-nums">
                  {matches.length} partido{matches.length !== 1 ? 's' : ''}
                </span>
              </div>
              {/* Grid de partidos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {matches.map(m => <ScoreCard key={m.id} match={m} />)}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
type Page = 'home' | 'live' | 'leagues' | 'myteams' | 'tournaments' | 'calendar' | 'libertadores' | 'sudamericana'

export default function App() {
  const [showIntro, setShowIntro]             = useState(true)
  const [page, setPage]                       = useState<Page>('home')
  const [selectedLeague, setSelectedLeague]   = useState<string>('arg')
  const [leagueDropdownOpen, setLeagueDropdown] = useState(false)
  const [copasDropdownOpen, setCopasDropdown]   = useState(false)
  const [mobileMenuOpen, setMobileMenu]       = useState(false)
  const [favorites, setFavorites]             = useState<Set<string>>(new Set(['arg:boca','arg:river']))
  const [modalFixture, setModalFixture]       = useState<ApiFixture | null>(null)

  // ── Live data from API ─────────────────────────────────────────────────────
  // todayFixtures expone `refresh`; se lo pasamos a useLiveMatches para que
  // fuerce un refetch de /today en el momento en que un partido termina.
  const { fixtures: todayFixtures, refresh: refreshToday } = useTodayMatches()
  const { fixtures: liveFixtures, connected }               = useLiveMatches(refreshToday)

  const liveCtxValue: LiveCtx = {
    liveFixtures,
    todayFixtures,
    connected,
    openModal: setModalFixture,
  }

  const toggleFavorite = (key: string) => setFavorites(prev => {
    const next = new Set(prev)
    next.has(key) ? next.delete(key) : next.add(key)
    return next
  })

  const currentLeague = leagues.find(l => l.id === selectedLeague) ?? leagues[0]
  // Usar count de la API si hay conexión, sino el dato estático
  const liveCount = connected
    ? liveFixtures.length || allMatches.filter(m => m.status === 'live').length
    : allMatches.filter(m => m.status === 'live').length

  const navItems = [
    { id:'home' as Page,        label:'Inicio',      icon:<Home size={15}/> },
    { id:'live' as Page,        label:'En Vivo',     icon:<Radio size={15}/> },
    { id:'leagues' as Page,     label:'Ligas',       icon:<Shield size={15}/> },
    { id:'myteams' as Page,     label:'Mis Equipos', icon:<Heart size={15}/> },
    { id:'tournaments' as Page, label:'Torneos',     icon:<Trophy size={15}/> },
    { id:'calendar' as Page,    label:'Calendario',  icon:<Calendar size={15}/> },
    { id:'libertadores' as Page, label:'Copas',      icon:<span className="text-amber-600">🏆</span> },
  ]

  const copasItems = [
    { id:'libertadores' as Page, label:'Copa Libertadores 2026', icon:'🏆', sub:'Fase Grupos — Fecha 5/6' },
    { id:'sudamericana' as Page, label:'Copa Sudamericana 2026', icon:'🥈', sub:'Fase Grupos — Fecha 5/6' },
  ]

  return (
    <LiveDataCtx.Provider value={liveCtxValue}>
    <div className="min-h-screen bg-[#f5f0e6]">

      {/* Intro animado */}
      {showIntro && <GoalIntro onDone={() => setShowIntro(false)} />}

      {/* Modal de incidencias */}
      {modalFixture && (
        <MatchDetailModal fixture={modalFixture} onClose={() => setModalFixture(null)}/>
      )}

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#f5f0e6]/95 backdrop-blur border-b border-[#cfc3aa] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src="/eltrapo-logo.png"
              alt="El Trapo"
              className="h-9 w-auto object-contain"
            />
            {/* Indicador de conexión API */}
            <span
              title={connected ? 'Datos en tiempo real activos' : 'Sin conexión al servidor API'}
              className={`w-2 h-2 rounded-full ml-1 flex-shrink-0 ${connected ? 'bg-[#2d8c4e] live-dot' : 'bg-[#c5b89a]'}`}
            />
          </div>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navItems.map(item => (
              <div key={item.id} className="relative">
                {item.id === 'leagues' ? (
                  <button
                    onClick={() => { setLeagueDropdown(o => !o); setCopasDropdown(false); setPage('leagues') }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                      page === 'leagues'
                        ? 'bg-[#2d8c4e] text-white'
                        : 'text-[#7a6e63] hover:text-[#1e1611] hover:bg-[#e3ddd0]'
                    }`}
                  >
                    {item.icon}{item.label}
                    <ChevronDown size={12} className={`transition-transform ${leagueDropdownOpen ? 'rotate-180' : ''}`}/>
                  </button>
                ) : item.id === 'libertadores' ? (
                  <button
                    onClick={() => { setCopasDropdown(o => !o); setLeagueDropdown(false) }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                      page === 'libertadores' || page === 'sudamericana'
                        ? 'bg-[#2d8c4e] text-white'
                        : 'text-[#7a6e63] hover:text-[#1e1611] hover:bg-[#e3ddd0]'
                    }`}
                  >
                    {item.icon}{item.label}
                    <ChevronDown size={12} className={`transition-transform ${copasDropdownOpen ? 'rotate-180' : ''}`}/>
                  </button>
                ) : (
                  <button
                    onClick={() => { setPage(item.id); setLeagueDropdown(false); setCopasDropdown(false) }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                      page === item.id
                        ? 'bg-[#2d8c4e] text-white'
                        : 'text-[#7a6e63] hover:text-[#1e1611] hover:bg-[#e3ddd0]'
                    }`}
                  >
                    {item.id === 'live' && liveCount > 0 ? (
                      <span className="relative">
                        {item.icon}
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full live-dot"/>
                      </span>
                    ) : item.icon}
                    {item.label}
                    {item.id === 'live' && liveCount > 0 && (
                      <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 rounded-full">{liveCount}</span>
                    )}
                  </button>
                )}

                {/* Dropdown ligas */}
                {item.id === 'leagues' && leagueDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-[#f5f0e6] border border-[#cfc3aa] rounded-xl shadow-lg min-w-[210px] py-1 z-50">
                    {leagues.map(l => (
                      <button
                        key={l.id}
                        onClick={() => { setSelectedLeague(l.id); setLeagueDropdown(false) }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-[#e8e2d4] transition-colors ${
                          selectedLeague === l.id ? 'text-[#2d8c4e] font-semibold' : 'text-[#4a3f33]'
                        }`}
                      >
                        {l.logo
                          ? <img src={l.logo} alt={l.name} className="w-7 h-7 object-contain flex-shrink-0"
                              onError={e => { (e.currentTarget as HTMLImageElement).style.display='none' }}/>
                          : <span className="text-lg">{l.flag}</span>
                        }
                        <div className="text-left">
                          <div>{l.name}</div>
                          <div className="text-xs text-[#9a8e82]">{l.country}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Dropdown copas */}
                {item.id === 'libertadores' && copasDropdownOpen && (
                  <div className="absolute top-full right-0 mt-1 bg-[#f5f0e6] border border-[#cfc3aa] rounded-xl shadow-lg min-w-[240px] py-1 z-50">
                    {copasItems.map(c => (
                      <button
                        key={c.id}
                        onClick={() => { setPage(c.id); setCopasDropdown(false) }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-[#e8e2d4] transition-colors ${
                          page === c.id ? 'text-[#2d8c4e] font-semibold' : 'text-[#4a3f33]'
                        }`}
                      >
                        <span className="text-2xl">{c.icon}</span>
                        <div className="text-left">
                          <div>{c.label}</div>
                          <div className="text-xs text-[#9a8e82]">{c.sub}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile button */}
          <button className="md:hidden text-[#7a6e63] hover:text-[#1e1611] p-2" onClick={() => setMobileMenu(o => !o)}>
            {mobileMenuOpen ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#ede8db] border-t border-[#cfc3aa] px-4 py-3 space-y-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'libertadores') { setCopasDropdown(o => !o); setLeagueDropdown(false) }
                  else if (item.id === 'leagues') { setLeagueDropdown(o => !o); setCopasDropdown(false); setPage('leagues') }
                  else { setPage(item.id); setMobileMenu(false); setLeagueDropdown(false); setCopasDropdown(false) }
                }}
                className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-all ${
                  page === item.id || (item.id === 'libertadores' && (page === 'libertadores' || page === 'sudamericana'))
                    ? 'bg-[#2d8c4e] text-white' : 'text-[#7a6e63] hover:bg-[#e3ddd0]'
                }`}
              >
                {item.icon}{item.label}
                {(item.id === 'leagues' || item.id === 'libertadores') &&
                  <ChevronDown size={12} className="ml-auto"/>}
              </button>
            ))}
            {leagueDropdownOpen && (
              <div className="pl-6 space-y-1 mt-1">
                {leagues.map(l => (
                  <button
                    key={l.id}
                    onClick={() => { setSelectedLeague(l.id); setMobileMenu(false); setLeagueDropdown(false) }}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                      selectedLeague === l.id ? 'text-[#2d8c4e] font-semibold' : 'text-[#7a6e63]'
                    }`}
                  >
                    {l.logo
                      ? <img src={l.logo} alt={l.name} className="w-5 h-5 object-contain flex-shrink-0"
                          onError={e => { (e.currentTarget as HTMLImageElement).style.display='none' }}/>
                      : l.flag
                    }
                    {l.name}
                  </button>
                ))}
              </div>
            )}
            {copasDropdownOpen && (
              <div className="pl-6 space-y-1 mt-1">
                {copasItems.map(c => (
                  <button
                    key={c.id}
                    onClick={() => { setPage(c.id); setMobileMenu(false); setCopasDropdown(false) }}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                      page === c.id ? 'text-[#2d8c4e] font-semibold' : 'text-[#7a6e63]'
                    }`}
                  >
                    {c.icon} {c.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {page === 'home'          && <HomePage favorites={favorites}/>}
        {page === 'live'          && <LivePage/>}
        {page === 'leagues'       && <LeaguePage league={currentLeague}/>}
        {page === 'myteams'       && <MyTeamsPage favorites={favorites} onToggle={toggleFavorite}/>}
        {page === 'tournaments'   && <TournamentsPage/>}
        {page === 'libertadores'  && <CopasPage competition={copas[0]}/>}
        {page === 'sudamericana'  && <CopasPage competition={copas[1]}/>}
        {page === 'calendar'      && (
          <div>
            <h2 className="text-2xl font-bold text-[#1e1611] mb-1">Calendario</h2>
            <p className="text-[#9a8e82] text-sm mb-6">Partidos de hoy en adelante</p>
            <CalendarView matches={allMatches.filter(m => m.date >= new Date().toISOString().split('T')[0])}/>
          </div>
        )}
      </main>
    </div>
    </LiveDataCtx.Provider>
  )
}
