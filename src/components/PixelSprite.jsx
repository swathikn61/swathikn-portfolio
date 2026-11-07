const COLORS = {
  r: '#7A1328',
  p: '#F5CFE3',
  c: '#EFB02E',
  b: '#A9D4FA',
  g: '#6F9A52',
  k: '#1B2912',
}

const SPRITES = {
  // The body uses `x`, so the laptop stays visible on dark backgrounds.
  laptop: [
    '..xxxxxxxxxxxxxx..',
    '..xbbbbbbbbbbbbx..',
    '..xbrrbbbbbbbbbx..',
    '..xbbbccccbbbbbx..',
    '..xbbbcccccccbbx..',
    '..xbbbbppbbbbbbx..',
    '..xbrrrbbbbbbbbx..',
    '..xbbbbbbbbbbbbx..',
    '..xxxxxxxxxxxxxx..',
    '.xxxxxxxxxxxxxxxx.',
    'xxxxxxxccccxxxxxxx',
  ],
  code: [
    '...x...x.x...',
    '..x....x..x..',
    '.x....x....x.',
    'x.....x.....x',
    '.x....x....x.',
    '..x..x....x..',
    '...x.x...x...',
  ],
  flower: [
    '.pp...pp.',
    'pppp.pppp',
    'ppppppppp',
    '.ppcccpp.',
    '..pcccp..',
    '.ppcccpp.',
    'ppppppppp',
    'pppp.pppp',
    '.pp...pp.',
  ],
  terminal: [
    'xxxxxxxxxxxxxx',
    'xrxcxgxxxxxxxx',
    'xxxxxxxxxxxxxx',
    'xkkkkkkkkkkkkx',
    'xkckkkkkkkkkkx',
    'xkkckkkkkkkkkx',
    'xkkkckkkkkkkkx',
    'xkkckkkggggkkx',
    'xkckkkkkkkkkkx',
    'xkkkkkkkkkkkkx',
    'xxxxxxxxxxxxxx',
  ],
  robot: [
    '......c......',
    '......x......',
    '.xxxxxxxxxxx.',
    '.xbbbbbbbbbx.',
    'xxbrrbbbrrbxx',
    'xxbrrbbbrrbxx',
    'xxbbbbbbbbbxx',
    '.xbbcccccbbx.',
    '.xbbbbbbbbbx.',
    '.xxxxxxxxxxx.',
    '...xx...xx...',
  ],
  database: [
    '..bbbbbbb..',
    '.bbbbbbbbb.',
    'bbbbbbbbbbb',
    'xbbbbbbbbbx',
    'bxxxxxxxxxb',
    'bbbbbbbbbbb',
    'xbbbbbbbbbx',
    'bxxxxxxxxxb',
    'bbbbbbbbbbb',
    'xbbbbbbbbbx',
    '.xxxxxxxxx.',
  ],
  branch: [
    '.cc.....cc.',
    'cccc...cccc',
    'cccc...cccc',
    '.cc.....cc.',
    '.xx.....xx.',
    '.xx.....xx.',
    '.xx....xx..',
    '.xx..xxx...',
    '.xxxxx.....',
    '.xx........',
    '.cc........',
    'cccc.......',
    'cccc.......',
    '.cc........',
  ],
  bug: [
    '..x.....x..',
    '...x...x...',
    '....ggg....',
    'x..ggggg..x',
    '.xggggggxx.',
    '...ggcgg...',
    'xxggggggxxx',
    '..gggcggg..',
    '.x.ggggg.x.',
    'x...ggg...x',
  ],
  gear: [
    '....ggg....',
    '.g.ggggg.g.',
    '..ggggggg..',
    '.ggg...ggg.',
    'ggg.....ggg',
    'ggg.....ggg',
    'ggg.....ggg',
    '.ggg...ggg.',
    '..ggggggg..',
    '.g.ggggg.g.',
    '....ggg....',
  ],
  coffee: [
    '..x..x.....',
    '...x..x....',
    '..x..x.....',
    '...........',
    'ccccccccc..',
    'ccccccccccc',
    'ccccccccc.c',
    'ccccccccc.c',
    'ccccccccccc',
    'ccccccccc..',
    '.ccccccc...',
  ],
  // `x` cells take the surrounding text color.
  sparkle: ['...x...', '...x...', '..xxx..', 'xxxxxxx', '..xxx..', '...x...', '...x...'],
}

/** Decorative pixel art, drawn from the character grids above. */
export default function PixelSprite({ name, className = '' }) {
  const rows = SPRITES[name]

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${rows[0].length} ${rows.length}`}
      shapeRendering="crispEdges"
      className={className}
    >
      {rows.flatMap((row, y) =>
        [...row].map((cell, x) =>
          cell === '.' ? null : (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width="1"
              height="1"
              fill={COLORS[cell] ?? 'currentColor'}
            />
          ),
        ),
      )}
    </svg>
  )
}
