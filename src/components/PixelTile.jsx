import PixelSprite from './PixelSprite'

/** A pixel sprite on a stepped color tile. The icon every card on the site leads with. */
export default function PixelTile({ sprite, tone, large = false }) {
  const size = large ? 'h-14 w-14' : 'h-10 w-10'
  const icon = large ? 'h-8 max-w-9' : 'h-6 max-w-7'

  return (
    <span className={`keep tone tone-${tone} pixel-corners grid ${size} shrink-0 place-items-center`}>
      <PixelSprite name={sprite} className={`text-pop ${icon} w-auto`} />
    </span>
  )
}
