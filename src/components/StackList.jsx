/** A row of outlined pills, one per technology. */
export default function StackList({ items }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item} className="border-line rounded-full border px-3 py-0.5 text-sm">
          {item}
        </li>
      ))}
    </ul>
  )
}
