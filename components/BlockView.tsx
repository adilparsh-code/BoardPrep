import type { Block } from "@/lib/content/types";

/** Renders structured content blocks as escaped plain text (no HTML injection path). */
export function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "paragraph":
      return <p>{block.text}</p>;
    case "bullets":
      return (
        <ul className="list">
          {block.items.map((t) => <li key={t}>{t}</li>)}
        </ul>
      );
    case "terms":
      return (
        <dl className="terms">
          {block.items.map((t) => (
            <div key={t.term}>
              <dt>{t.term}</dt>
              <dd>{t.meaning}</dd>
            </div>
          ))}
        </dl>
      );
    case "examples":
      return (
        <ul className="examples">
          {block.items.map((e) => (
            <li key={e.text}>
              <span>{e.text}</span>
              {e.note && <em className="muted"> {e.note}</em>}
            </li>
          ))}
        </ul>
      );
  }
}
