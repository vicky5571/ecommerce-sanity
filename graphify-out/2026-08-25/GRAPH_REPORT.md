# Graph Report - ecommerce-sanity-master  (2026-08-25)

## Corpus Check
- 83 files · ~17,804 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 353 nodes · 530 edges · 24 communities (20 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c3e69160`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- dependencies
- basket/page.tsx
- cn
- devDependencies
- compilerOptions
- useBasketStore
- sanity.types.ts
- (store)/page.tsx
- components.json
- index.ts
- BlackFridayBanner.tsx
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

## God Nodes (most connected - your core abstractions)
1. `cn()` - 24 edges
2. `useBasketStore` - 17 edges
3. `compilerOptions` - 16 edges
4. `imageUrl()` - 11 edges
5. `Product` - 9 edges
6. `Category` - 8 edges
7. `formatIDR()` - 7 edges
8. `getAllCategories()` - 7 edges
9. `include` - 7 edges
10. `Button` - 6 edges

## Surprising Connections (you probably didn't know these)
- `AddToBasketButtonProps` --references--> `Product`  [EXTRACTED]
  components/AddToBasket.tsx → sanity.types.ts
- `BasketState` --references--> `Product`  [EXTRACTED]
  store/store.ts → sanity.types.ts
- `CategorySelectorProps` --references--> `Category`  [EXTRACTED]
  components/ui/category-selector.tsx → sanity.types.ts
- `CategorySelectorProps` --references--> `Category`  [EXTRACTED]
  components/ui/category-selectorORIGINAL.tsx → sanity.types.ts
- `BasketPage()` --calls--> `useBasketStore`  [EXTRACTED]
  app/(store)/basket/page.tsx → store/store.ts

## Import Cycles
- None detected.

## Communities (24 total, 4 thin omitted)

### Community 0 - "dependencies"
Cohesion: 0.04
Nodes (47): class-variance-authority, @clerk/nextjs, clsx, cmdk, framer-motion, lucide-react, next, next-sanity (+39 more)

### Community 1 - "basket/page.tsx"
Cohesion: 0.11
Nodes (20): createCheckoutSession(), GroupedBasketItem, Metadata, BasketPage(), Orders(), dynamic, ProductPage(), revalidate (+12 more)

### Community 2 - "cn"
Cohesion: 0.17
Nodes (23): Button, ButtonProps, buttonVariants, CategorySelectorProps, CategorySelectorComponent(), CategorySelectorProps, Command, CommandEmpty (+15 more)

### Community 3 - "devDependencies"
Cohesion: 0.06
Nodes (30): eslint, eslint-config-next, @eslint/eslintrc, devDependencies, eslint, eslint-config-next, @eslint/eslintrc, postcss (+22 more)

### Community 4 - "compilerOptions"
Cohesion: 0.07
Nodes (28): **/*.d.ts, dom, dom.iterable, esnext, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 5 - "useBasketStore"
Cohesion: 0.16
Nodes (13): geistMono, geistSans, metadata, SuccessPage(), BottomBar(), tabs, DisableDraftMode(), Footer() (+5 more)

### Community 6 - "sanity.types.ts"
Cohesion: 0.07
Nodes (31): CategoryPills(), ProductGrid(), ProductsViewProps, CategorySelectorComponent(), ACTIVE_SALE_BY_COUPON_QUERYResult, ALL_CATEGORIES_QUERYResult, ALL_PRODUCTS_QUERYResult, AllSanitySchemaTypes (+23 more)

### Community 7 - "(store)/page.tsx"
Cohesion: 0.13
Nodes (15): CategoriesPage(), dynamic, revalidate, CategoryPage(), dynamic, Home(), revalidate, SearchPage() (+7 more)

### Community 8 - "components.json"
Cohesion: 0.11
Nodes (17): aliases, components, hooks, lib, ui, utils, iconLibrary, rsc (+9 more)

### Community 9 - "index.ts"
Cohesion: 0.11
Nodes (12): dynamic, apiVersion, dataset, projectId, builder, blockContentType, categoryType, schema (+4 more)

### Community 10 - "BlackFridayBanner.tsx"
Cohesion: 0.52
Nodes (4): BlackFridayBanner(), COUPON_CODES, CouponCode, getActiveSaleByCouponCode()

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
- **139 isolated node(s):** `dynamic`, `revalidate`, `ProductsViewProps`, `GroupedBasketItem`, `MiddlewareHandler` (+134 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `devDependencies`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `sanity.types.ts`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **What connects `dynamic`, `revalidate`, `ProductsViewProps` to the rest of the system?**
  _139 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.0425531914893617 - nodes in this community are weakly interconnected._
- **Should `basket/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._