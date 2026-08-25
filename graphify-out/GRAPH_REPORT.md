# Graph Report - ecommerce-sanity-master  (2026-08-25)

## Corpus Check
- 83 files · ~19,086 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 356 nodes · 541 edges · 25 communities (20 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `71087f02`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- dependencies
- useBasketStore
- cn
- devDependencies
- compilerOptions
- (store)/layout.tsx
- sanity.types.ts
- (store)/page.tsx
- components.json
- index.ts
- rules/graphify.md
- workflows/graphify.md
- README.md
- studio/layout.tsx
- eslint.config.mjs
- middleware.ts
- clerk-nextjs.d.ts
- build
- postcss.config.mjs
- next.config.ts
- Loader.tsx

## God Nodes (most connected - your core abstractions)
1. `cn()` - 24 edges
2. `useBasketStore` - 19 edges
3. `compilerOptions` - 16 edges
4. `formatIDR()` - 11 edges
5. `imageUrl()` - 11 edges
6. `Product` - 11 edges
7. `Category` - 9 edges
8. `getAllCategories()` - 7 edges
9. `include` - 7 edges
10. `tailwind` - 6 edges

## Surprising Connections (you probably didn't know these)
- `AddToBasketButton()` --calls--> `useBasketStore`  [EXTRACTED]
  components/AddToBasket.tsx → store/store.ts
- `CategoriesPage()` --calls--> `getAllCategories()`  [EXTRACTED]
  app/(store)/categories/page.tsx → sanity/lib/products/getAllCategories.ts
- `SuccessPage()` --calls--> `useBasketStore`  [EXTRACTED]
  app/(store)/success/page.tsx → store/store.ts
- `AddToBasketButtonProps` --references--> `Product`  [EXTRACTED]
  components/AddToBasket.tsx → sanity.types.ts
- `BottomBar()` --calls--> `useBasketStore`  [EXTRACTED]
  components/BottomBar.tsx → store/store.ts

## Import Cycles
- None detected.

## Communities (25 total, 5 thin omitted)

### Community 0 - "dependencies"
Cohesion: 0.04
Nodes (47): class-variance-authority, @clerk/nextjs, clsx, cmdk, framer-motion, lucide-react, next, next-sanity (+39 more)

### Community 1 - "useBasketStore"
Cohesion: 0.13
Nodes (21): createCheckoutSession(), GroupedBasketItem, Metadata, BasketPage(), Orders(), dynamic, ProductPage(), revalidate (+13 more)

### Community 2 - "cn"
Cohesion: 0.19
Nodes (21): Button, ButtonProps, buttonVariants, CategorySelectorComponent(), CategorySelectorComponent(), Command, CommandEmpty, CommandGroup (+13 more)

### Community 3 - "devDependencies"
Cohesion: 0.06
Nodes (30): eslint, eslint-config-next, @eslint/eslintrc, devDependencies, eslint, eslint-config-next, @eslint/eslintrc, postcss (+22 more)

### Community 4 - "compilerOptions"
Cohesion: 0.07
Nodes (28): **/*.d.ts, dom, dom.iterable, esnext, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 5 - "(store)/layout.tsx"
Cohesion: 0.16
Nodes (10): geistMono, geistSans, metadata, BottomBar(), tabs, DisableDraftMode(), Footer(), HeaderClerk() (+2 more)

### Community 6 - "sanity.types.ts"
Cohesion: 0.06
Nodes (36): SearchPage(), AddToBasketButton(), AddToBasketButtonProps, CategoryPills(), ProductGrid(), ProductsViewProps, CategorySelectorProps, CategorySelectorProps (+28 more)

### Community 7 - "(store)/page.tsx"
Cohesion: 0.12
Nodes (18): CategoriesPage(), dynamic, revalidate, CategoryPage(), dynamic, revalidate, dynamic, Home() (+10 more)

### Community 8 - "components.json"
Cohesion: 0.11
Nodes (17): aliases, components, hooks, lib, ui, utils, iconLibrary, rsc (+9 more)

### Community 9 - "index.ts"
Cohesion: 0.11
Nodes (12): dynamic, apiVersion, dataset, projectId, builder, blockContentType, categoryType, schema (+4 more)

### Community 13 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 14 - "studio/layout.tsx"
Cohesion: 0.40
Nodes (3): geistMono, geistSans, metadata

### Community 15 - "eslint.config.mjs"
Cohesion: 0.40
Nodes (4): compat, __dirname, eslintConfig, __filename

### Community 16 - "middleware.ts"
Cohesion: 0.67
Nodes (3): config, hasClerkKeys(), middleware()

### Community 17 - "clerk-nextjs.d.ts"
Cohesion: 0.50
Nodes (3): @clerk/nextjs, @clerk/nextjs/server, MiddlewareHandler

### Community 18 - "build"
Cohesion: 0.50
Nodes (3): build, env, NPM_FLAGS

## Knowledge Gaps
- **140 isolated node(s):** `GroupedBasketItem`, `dynamic`, `revalidate`, `dynamic`, `revalidate` (+135 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `devDependencies`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Why does `useBasketStore` connect `useBasketStore` to `(store)/layout.tsx`, `sanity.types.ts`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **What connects `GroupedBasketItem`, `dynamic`, `revalidate` to the rest of the system?**
  _140 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.0425531914893617 - nodes in this community are weakly interconnected._
- **Should `useBasketStore` be split into smaller, more focused modules?**
  _Cohesion score 0.1349206349206349 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._