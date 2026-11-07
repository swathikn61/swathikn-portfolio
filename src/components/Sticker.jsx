/**
 * Die-cut paper stickers for the scrapbook look: each shape gets a thick paper-white outline
 * and a soft shadow (see `.sticker` in index.css). Size it with a width class.
 */

const OUTLINE = { stroke: '#fffaf0', strokeWidth: 7, strokeLinejoin: 'round', paintOrder: 'stroke' }

// A hand-cut starburst: points of slightly uneven length, like it was snipped with scissors.
function burstPoints(points = 18) {
  const out = []
  for (let i = 0; i < points * 2; i++) {
    const angle = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2
    const jitter = Math.sin(i * 7.3) * 3
    const r = i % 2 === 0 ? 46 + jitter : 31 + jitter / 2
    out.push(`${(50 + Math.cos(angle) * r).toFixed(1)},${(50 + Math.sin(angle) * r).toFixed(1)}`)
  }
  return out.join(' ')
}
const BURST = burstPoints()

function starPoints() {
  const out = []
  for (let i = 0; i < 10; i++) {
    const angle = (i / 10) * Math.PI * 2 - Math.PI / 2
    const r = i % 2 === 0 ? 44 : 20
    out.push(`${(50 + Math.cos(angle) * r).toFixed(1)},${(52 + Math.sin(angle) * r).toFixed(1)}`)
  }
  return out.join(' ')
}
const STAR = starPoints()

const SHAPES = {
  burst: (color) => <polygon points={BURST} fill={color} {...OUTLINE} />,

  sparkle: (color) => (
    <path
      d="M50 6C53 36 64 47 94 50C64 53 53 64 50 94C47 64 36 53 6 50C36 47 47 36 50 6Z"
      fill={color}
      {...OUTLINE}
    />
  ),

  star: (color, accent) => (
    <>
      <polygon points={STAR} fill={color} {...OUTLINE} strokeWidth={9} />
      <polygon points={STAR} fill="none" stroke={accent} strokeWidth="4" strokeLinejoin="round" />
    </>
  ),

  cloud: (color) => (
    <path
      d="M22 74C10 74 4 64 8 55C11 48 18 45 25 46C26 33 37 25 49 27C57 19 72 20 78 31C88 31 96 40 94 51C99 56 99 66 93 71C90 74 86 74 82 74Z"
      fill={color}
      {...OUTLINE}
    />
  ),

  flower: (color, accent) => (
    <>
      <g fill={color} {...OUTLINE}>
        {[0, 72, 144, 216, 288].map((deg) => (
          <ellipse key={deg} cx="50" cy="27" rx="17" ry="21" transform={`rotate(${deg} 50 50)`} />
        ))}
      </g>
      <g fill={color}>
        {[0, 72, 144, 216, 288].map((deg) => (
          <ellipse key={deg} cx="50" cy="27" rx="17" ry="21" transform={`rotate(${deg} 50 50)`} />
        ))}
      </g>
      <circle cx="50" cy="50" r="13" fill={accent} />
    </>
  ),

  swirl: (color) => (
    <g fill="none" strokeLinecap="round">
      <path
        d="M50 52c0-4 6-4 6 1 0 7-11 8-13 0-3-10 9-17 19-12 13 6 11 26-3 30-17 5-32-9-28-26"
        stroke="#fffaf0"
        strokeWidth="15"
      />
      <path
        d="M50 52c0-4 6-4 6 1 0 7-11 8-13 0-3-10 9-17 19-12 13 6 11 26-3 30-17 5-32-9-28-26"
        stroke={color}
        strokeWidth="7"
      />
    </g>
  ),

  // ---- Tech stickers ----

  terminal: (color, accent) => (
    <>
      <rect x="8" y="16" width="84" height="68" rx="10" fill={color} {...OUTLINE} />
      <rect x="8" y="16" width="84" height="16" rx="10" fill="#000" fillOpacity="0.18" />
      <circle cx="19" cy="24" r="3" fill="var(--color-wine)" />
      <circle cx="29" cy="24" r="3" fill="var(--color-marigold)" />
      <circle cx="39" cy="24" r="3" fill="var(--color-sage)" />
      <path d="M22 46l12 9-12 9" fill="none" stroke={accent} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M42 66h22" stroke={accent} strokeWidth="6" strokeLinecap="round" />
    </>
  ),

  code: (color, accent) => (
    <>
      <rect x="6" y="22" width="88" height="56" rx="14" fill={color} {...OUTLINE} />
      <path
        d="M34 38L20 50l14 12M66 38l14 12-14 12M55 34L45 66"
        fill="none"
        stroke={accent}
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),

  braces: (color) => {
    const d =
      'M36 14c-10 0-14 5-14 14v10c0 7-4 12-12 12 8 0 12 5 12 12v10c0 9 4 14 14 14M64 14c10 0 14 5 14 14v10c0 7 4 12 12 12-8 0-12 5-12 12v10c0 9-4 14-14 14'
    return (
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d={d} stroke="#fffaf0" strokeWidth="17" />
        <path d={d} stroke={color} strokeWidth="9" />
      </g>
    )
  },

  database: (color, accent) => (
    <>
      <path d="M16 24v52c0 7 15 13 34 13s34-6 34-13V24" fill={color} {...OUTLINE} />
      <ellipse cx="50" cy="24" rx="34" ry="13" fill={color} {...OUTLINE} />
      <ellipse cx="50" cy="24" rx="34" ry="13" fill="#fff" fillOpacity="0.25" />
      <path d="M16 42c0 7 15 13 34 13s34-6 34-13M16 60c0 7 15 13 34 13s34-6 34-13" fill="none" stroke={accent} strokeWidth="4" />
    </>
  ),

  branch: (color, accent) => {
    const d = 'M30 24v52M30 62c0-14 40-10 40-30'
    return (
      <>
        <g fill="none" strokeLinecap="round">
          <path d={d} stroke="#fffaf0" strokeWidth="18" />
          <path d={d} stroke={accent} strokeWidth="8" />
        </g>
        {[
          [30, 20],
          [30, 80],
          [70, 28],
        ].map(([cx, cy]) => (
          <circle key={`${cx}${cy}`} cx={cx} cy={cy} r="11" fill={color} {...OUTLINE} strokeWidth={6} />
        ))}
      </>
    )
  },

  bug: (color, accent) => (
    <>
      <g stroke="#fffaf0" strokeWidth="11" strokeLinecap="round">
        <path d="M30 42L14 34M30 58H12M32 72l-14 10M70 42l16-8M70 58h18M68 72l14 10M42 24l-8-10M58 24l8-10" />
      </g>
      <g stroke={accent} strokeWidth="5" strokeLinecap="round">
        <path d="M30 42L14 34M30 58H12M32 72l-14 10M70 42l16-8M70 58h18M68 72l14 10M42 24l-8-10M58 24l8-10" />
      </g>
      <ellipse cx="50" cy="56" rx="22" ry="28" fill={color} {...OUTLINE} />
      <path d="M50 30v54" stroke={accent} strokeWidth="4" />
      <circle cx="41" cy="50" r="4" fill={accent} />
      <circle cx="59" cy="64" r="4" fill={accent} />
    </>
  ),

  chip: (color, accent) => (
    <>
      <g stroke="#fffaf0" strokeWidth="10" strokeLinecap="round">
        <path d="M36 10v12M50 10v12M64 10v12M36 78v12M50 78v12M64 78v12M10 36h12M10 50h12M10 64h12M78 36h12M78 50h12M78 64h12" />
      </g>
      <g stroke={accent} strokeWidth="5" strokeLinecap="round">
        <path d="M36 10v12M50 10v12M64 10v12M36 78v12M50 78v12M64 78v12M10 36h12M10 50h12M10 64h12M78 36h12M78 50h12M78 64h12" />
      </g>
      <rect x="22" y="22" width="56" height="56" rx="9" fill={color} {...OUTLINE} />
      <rect x="36" y="36" width="28" height="28" rx="4" fill="none" stroke={accent} strokeWidth="4" />
    </>
  ),

  cursor: (color) => (
    <path d="M24 10l56 40-26 4 14 28-12 6-14-28-18 18Z" fill={color} {...OUTLINE} />
  ),

  gear: (color, accent) => {
    const teeth = []
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2
      const r = i % 2 === 0 ? 44 : 34
      teeth.push(`${(50 + Math.cos(a) * r).toFixed(1)},${(50 + Math.sin(a) * r).toFixed(1)}`)
    }
    return (
      <>
        <polygon points={teeth.join(' ')} fill={color} {...OUTLINE} />
        <circle cx="50" cy="50" r="13" fill={accent} stroke="#fffaf0" strokeWidth="4" />
      </>
    )
  },

  rocket: (color, accent) => (
    <>
      <path d="M50 8C66 20 70 42 64 66H36C30 42 34 20 50 8Z" fill={color} {...OUTLINE} />
      <path d="M36 52L22 66l4 14 12-10M64 52l14 14-4 14-12-10" fill={accent} {...OUTLINE} strokeWidth={6} />
      <circle cx="50" cy="36" r="8" fill="#fffaf0" stroke={accent} strokeWidth="3.5" />
      <path d="M42 70c0 10 4 16 8 22 4-6 8-12 8-22Z" fill="var(--color-marigold)" stroke="#fffaf0" strokeWidth="4" strokeLinejoin="round" />
    </>
  ),

  bulb: (color, accent) => (
    <>
      <path d="M50 8C32 8 20 21 20 37c0 12 7 19 12 25 3 4 4 7 4 11h28c0-4 1-7 4-11 5-6 12-13 12-25C80 21 68 8 50 8Z" fill={color} {...OUTLINE} />
      <rect x="36" y="73" width="28" height="15" rx="5" fill={accent} {...OUTLINE} strokeWidth={5} />
      <path d="M42 50l8-10 8 10M50 40v28" fill="none" stroke={accent} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),

  wifi: (color) => {
    const d = 'M16 42c19-17 49-17 68 0M27 55c13-11 33-11 46 0M38 68c7-6 17-6 24 0'
    return (
      <>
        <g fill="none" strokeLinecap="round">
          <path d={d} stroke="#fffaf0" strokeWidth="17" />
          <path d={d} stroke={color} strokeWidth="9" />
        </g>
        <circle cx="50" cy="80" r="7" fill={color} {...OUTLINE} strokeWidth={5} />
      </>
    )
  },

  coffee: (color, accent) => (
    <>
      <path d="M72 42h6c8 0 12 6 12 12s-4 12-12 12h-7" fill="none" stroke="#fffaf0" strokeWidth="15" strokeLinecap="round" />
      <path d="M72 42h6c8 0 12 6 12 12s-4 12-12 12h-7" fill="none" stroke={color} strokeWidth="7" strokeLinecap="round" />
      <path d="M14 34h62v28c0 14-11 24-25 24H39c-14 0-25-10-25-24Z" fill={color} {...OUTLINE} />
      <path d="M30 26c-4-5 4-8 0-14M44 26c-4-5 4-8 0-14M58 26c-4-5 4-8 0-14" fill="none" stroke={accent} strokeWidth="4" strokeLinecap="round" />
      <path d="M28 54h34" stroke="#fffaf0" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
    </>
  ),

  laptop: (color, accent) => (
    <>
      <rect x="18" y="20" width="64" height="44" rx="6" fill={color} {...OUTLINE} />
      <rect x="25" y="27" width="50" height="30" rx="2" fill={accent} />
      <path d="M32 36h18M32 44h28M32 52h12" stroke="#fffaf0" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M6 70h88l-6 10H12Z" fill={color} {...OUTLINE} />
    </>
  ),

  key: (color, accent) => (
    <>
      <path d="M44 56l36 0M70 56v12M80 56v9" fill="none" stroke="#fffaf0" strokeWidth="16" strokeLinecap="round" />
      <path d="M44 56l36 0M70 56v12M80 56v9" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" />
      <circle cx="32" cy="50" r="20" fill={color} {...OUTLINE} />
      <circle cx="28" cy="46" r="7" fill={accent} stroke="#fffaf0" strokeWidth="3" />
    </>
  ),
}

export default function Sticker({ shape, color = 'var(--color-pink)', accent = 'var(--color-marigold)', className = '', style }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" className={`sticker overflow-visible ${className}`} style={style}>
      {SHAPES[shape](color, accent)}
    </svg>
  )
}
