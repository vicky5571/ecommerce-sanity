# Graph Report - ecommerce-sanity-master  (2026-08-25)

## Corpus Check
- 84 files · ~19,236 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 357 nodes · 543 edges · 26 communities (21 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4017086d`
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
- search/page.tsx
- Loader.tsx

## God Nodes (most connected - your core abstractions)
1. `cn()` - 24 edges
2. `useBasketStore` - 19 edges
3. `compilerOptions` - 16 edges
4. `Product` - 11 edges
5. `formatIDR()` - 11 edges
6. `imageUrl()` - 11 edges
7. `Category` - 9 edges
8. `getAllCategories()` - 7 edges
9. `include` - 7 edges
10. `Button` - 6 edges

## Surprising Connections (you probably didn't know these)
- `SuccessPage()` --calls--> `useBasketStore`  [EXTRACTED]
  app/(store)/success/page.tsx → store/store.ts
- `AddToBasketButtonProps` --references--> `Product`  [EXTRACTED]
  components/AddToBasket.tsx → sanity.types.ts
- `ProductsViewProps` --references--> `Product`  [EXTRACTED]
  components/ProductsView.tsx → sanity.types.ts
- `BasketState` --references--> `Product`  [EXTRACTED]
  store/store.ts → sanity.types.ts
- `CategorySelectorProps` --references--> `Category`  [EXTRACTED]
  components/ui/category-selector.tsx → sanity.types.ts

## Import Cycles
- None detected.

## Communities (26 total, 5 thin omitted)

### Community 0 - "dependencies"
Cohesion: 0.04
Nodes (47): class-variance-authority, @clerk/nextjs, clsx, cmdk, framer-motion, lucide-react, next, next-sanity (+39 more)

### Community 1 - "useBasketStore"
Cohesion: 0.12
Nodes (24): createCheckoutSession(), GroupedBasketItem, Metadata, BasketPage(), Orders(), dynamic, ProductPage(), revalidate (+16 more)

### Community 2 - "cn"
Cohesion: 0.18
Nodes (21): SuccessPage(), Button, ButtonProps, buttonVariants, CategorySelectorComponent(), Command, CommandEmpty, CommandGroup (+13 more)

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
Cohesion: 0.07
Nodes (30): CategoryPills(), ProductsViewProps, CategorySelectorComponent(), CategorySelectorProps, CategorySelectorProps, ACTIVE_SALE_BY_COUPON_QUERYResult, ALL_CATEGORIES_QUERYResult, ALL_PRODUCTS_QUERYResult (+22 more)

### Community 7 - "(store)/page.tsx"
Cohesion: 0.11
Nodes (19): CategoriesPage(), dynamic, revalidate, CategoryPage(), dynamic, revalidate, dynamic, Home() (+11 more)

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

### Community 24 - "search/page.tsx"
Cohesion: 0.60
Nodes (3): SearchPage(), ProductGrid(), searchProductsByName()

## Knowledge Gaps
- **140 isolated node(s):** `GroupedBasketItem`, `MiddlewareHandler`, `ButtonProps`, `ACTIVE_SALE_BY_COUPON_QUERYResult`, `ALL_CATEGORIES_QUERYResult` (+135 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `devDependencies`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `sanity.types.ts`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Why does `useBasketStore` connect `useBasketStore` to `cn`, `(store)/layout.tsx`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **What connects `GroupedBasketItem`, `MiddlewareHandler`, `ButtonProps` to the rest of the system?**
  _140 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.0425531914893617 - nodes in this community are weakly interconnected._
- **Should `useBasketStore` be split into smaller, more focused modules?**
  _Cohesion score 0.12435897435897436 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._