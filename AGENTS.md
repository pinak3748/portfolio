<!-- BEGIN:nextjs-agent-rules -->
Yes. Looking at the current design, I’d make `AGENTS.md` **much more minimal**. The agent only needs the durable design principles and a few hard constraints. The current Work section should be removed entirely.

# AGENTS.md

You are an AI coding agent working on Pinak Faldu's personal portfolio.

The code is canonical. Read the existing implementation before making changes and follow established patterns.

## Purpose

This is a personal portfolio for showcasing product design, engineering, and product work.

The site should feel like a polished personal product, not an agency site, SaaS landing page, resume, or generic portfolio template.

## Design

Keep the visual language:

- Minimal
- Premium
- Clean
- Editorial
- Product-focused
- Neutral and understated

Prioritize typography, spacing, hierarchy, and alignment over decoration.

Avoid unnecessary:

- Gradients
- Glassmorphism
- Glow
- Heavy shadows
- Decorative elements
- Excessive rounded cards
- Large animations
- Generic marketing UI

When making something feel more premium, improve the fundamentals before adding effects.

Use the existing design system and tokens. Do not introduce a competing visual system.

## Content

Copy should be concise, confident, human, and specific.

Prefer showing real work and outcomes over marketing language.

Never invent metrics, clients, users, revenue, testimonials, awards, or project details.

Avoid generic phrases such as "cutting-edge", "world-class", "seamless", "innovative", and "end-to-end solutions".

## Motion

Keep motion subtle and purposeful.

Use animation to improve transitions and interaction, never as decoration.

Do not rely on hover for essential functionality.

Respect `prefers-reduced-motion`.

## Responsive

The site must work properly across desktop, tablet, and mobile.

Do not simply shrink the desktop layout. Preserve hierarchy, spacing, readability, and interaction quality.

## Code

Read the exact file before changing it.

Make the smallest coherent change.

- Reuse existing patterns and components.
- Do not refactor unrelated code.
- Do not add unnecessary abstractions.
- Do not duplicate content or logic.
- Do not add dependencies without a clear reason.
- Use `"use client"` only when required.
- No `console.log` in committed code.

Keep the implementation simple.

## Do not add

Unless explicitly requested, do not add:

- Authentication
- CMS
- Dashboard
- Blog platform
- AI chatbot
- Fake testimonials
- Fake statistics
- Pricing
- Agency/service sections
- Unnecessary routes or features

## Verification

Before claiming a change is complete, run:

```bash
npm run lint
npm run build
````

For visual changes, check desktop and mobile.

Never claim a check passed unless it actually ran.

## Git

Only commit when explicitly asked.

Never add AI, agent, or assistant attribution to commits.

Do not force push, rewrite history, amend commits, or push unless asked.

Use short, lowercase, imperative commit messages.

## Final rule

Keep the site simple.

Every change should make the portfolio clearer, more polished, or easier to explore.

If something does not add meaningful value, do not add it.


<!-- END:nextjs-agent-rules -->
