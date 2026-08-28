# Animations

CSS-only entrance animations for the portfolio. Defined in `app/globals.css`, with a small React helper in `lib/fade-in.ts`.

Play once on mount. No JavaScript animation runtime.

## Classes

| Class | Use |
| --- | --- |
| `fade-in` | Single element. Set delay with `--fade-delay`. |
| `fade-in-item` | Element in a stagger sequence. Set index with `--stagger-index`. |
| `fade-in-stagger` | Parent for flat lists. Sets `--stagger-index` on direct `.fade-in-item` children via `:nth-child`. |

## Tokens

Defined on `:root` in `app/globals.css`:

| Token | Default | Purpose |
| --- | --- | --- |
| `--fade-duration` | `420ms` | Entrance duration |
| `--fade-distance` | `4px` | Subtle upward travel |
| `--fade-blur` | `6px` | Soft dissolve at start |
| `--stagger-step` | `20ms` | Delay between staggered items |
| `--stagger-offset` | `0ms` | Base delay for a group |
| `--stagger-index` | `0` | Item position in a sequence |
| `--ease-fade` | `cubic-bezier(0.16, 1, 0.3, 1)` | Entrance easing |

Override per element or parent:

```html
<section style="--stagger-step: 40ms">
  ...
</section>
```

## Patterns

### Single element

```html
<div class="fade-in">...</div>
```

With a custom delay:

```html
<div class="fade-in" style="--fade-delay: 120ms">...</div>
```

### Flat stagger (direct children only)

Use when every animated item is a **direct child** of the container.

```html
<main class="fade-in-stagger">
  <div class="fade-in-item">Hero</div>
  <p class="fade-in-item">Paragraph 1</p>
  <p class="fade-in-item">Paragraph 2</p>
</main>
```

Supports up to 16 direct children.

### Nested lists (`--stagger-index`)

Use when items are inside `<ul>`, `<details>`, or other wrappers. The stagger parent cannot see them as direct children, so set the index explicitly.

```tsx
import { staggerStyle } from "@/lib/fade-in";

<li className="fade-in-item" style={staggerStyle(3)}>...</li>
```

### Continuing a page sequence

When a section should start after content above it (e.g. work tree after bio paragraphs), set `--stagger-offset` on the section:

```tsx
<section style={{ "--stagger-offset": "calc(var(--stagger-step) * 5)" }}>
  <h2 className="fade-in-item" style={staggerStyle(0)}>Work</h2>
  ...
</section>
```

### Dynamic sequences in React

For pages with variable item counts, use `createStaggerCounter`:

```tsx
import { createStaggerCounter } from "@/lib/fade-in";

const stagger = createStaggerCounter();
const headStyles = {
  home: stagger.next(),
  header: stagger.next(),
  description: stagger.next(),
};
const galleryIndex = stagger.current(); // peek before body continues

// Body items keep calling stagger.next() in maps
{features.map((feature) => (
  <div className="fade-in-item" style={stagger.next()}>...</div>
))}
```

`stagger.current()` returns the next index without consuming it — useful when a parallel column (gallery) should enter alongside the first body section.

## Where it is used

| Location | Pattern |
| --- | --- |
| `app/page.tsx` | `fade-in-stagger` on `<main>`. Hero + paragraphs as `fade-in-item`. |
| `components/work-tree.tsx` | `--stagger-offset` + explicit `--stagger-index` on heading, companies, and projects. |
| `app/work/[id]/page.tsx` | `createStaggerCounter()` through head, features, sections, blogs. Gallery uses `staggerIndex` after head. |
| `components/built-list.tsx` | `--stagger-offset` after work tree. Heading + each project row as `fade-in-item`. |
| `components/case-study-gallery.tsx` | Optional `staggerIndex` prop. |

## Do

- Use for first-load entrances (home, work detail, section reveals).
- Keep motion subtle — the defaults are tuned for this site.
- Use `--stagger-index` for nested DOM (lists, trees, accordions).
- Respect `prefers-reduced-motion` — handled automatically (opacity only, no stagger).

## Don't

- Nest animated parents inside animated children (opacity compounds).
- Use on high-frequency interactions (hover toggles, keyboard shortcuts, accordion open/close).
- Animate from `scale(0)` or use `transition: all`.
- Add animation libraries for these entrances — CSS is enough.

## Reduced motion

Under `prefers-reduced-motion: reduce`:

- Transform and blur are removed
- Duration drops to `160ms`
- Stagger delays are cleared

## Adding to a new page

1. Mark animated elements with `fade-in-item` (or `fade-in` for a single block).
2. Choose flat stagger or explicit indices.
3. For nested structures, import `staggerStyle` or `createStaggerCounter` from `@/lib/fade-in`.
4. Run `npm run lint` and `npm run build`.
5. Check desktop and mobile.
