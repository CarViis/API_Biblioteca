# Copilot Instructions for API_Biblioteca

## Project Overview
A TypeScript-based REST API for a library management system built with **AdonisJS 6** and **Lucid ORM**. Uses SQLite for persistence with session-based authentication.

## Architecture & Key Patterns

### MVC Structure with Path Aliases
- **Models** (`#models/*`): Lucid ORM entities extending `BaseModel` or composing with `AuthFinder` mixin
- **Controllers** (`#controllers/*`): Handle HTTP requests following RESTful conventions
- **Validators** (`#validators/*`): VineJS validation schemas (create/update variants)
- **Middleware** (`#middleware/*`): Auth, CORS, JSON response enforcement
- **Config** (`#config/*`): AdonisJS services (auth, database, session, CORS)

### Data Model Relationships
- **User** base model with `withAuthFinder()` mixin for authentication
- **Leitor** (Reader): `belongsTo` User via `user_id` FK, has unique `matricula` field
- **Livro** (Book), **Bibliotecario** (Librarian), **Administrador** (Admin): Similar entity structures

### Critical Developer Patterns

#### Model Definition (Lucid ORM)
```typescript
// Relationship pattern - use composition, not inheritance for specializations
@belongsTo(() => User)
declare user: BelongsTo<typeof User>

// Timestamp pattern - auto timestamps on all entities
@column.dateTime({ autoCreate: true })
declare createdAt: DateTime

// Primary key pattern - explicit `isPrimary: true`
@column({ isPrimary: true })
declare id: number
```

#### Validation Pattern (VineJS)
- Split validators into `create{Model}Validator` and `update{Model}Validator`
- Use `.trim()` on strings, validate email format, set minLength constraints
- **Reference**: `app/validators/` for examples

#### Controller Pattern
- Standard CRUD: `index()`, `create()`, `store()`, `show()`, `edit()`, `update()`, `destroy()`
- Use `request.validateUsing(validator)` for input validation
- Return models directly; AdonisJS serializes to JSON

#### Auth & Session
- **Guard**: Session-based (not token) - `config/auth.ts` uses `sessionGuard`
- **Provider**: `sessionUserProvider` with `#models/user`
- **Middleware**: Apply `#middleware/auth_middleware` to protected routes

## Development Workflows

### Build & Execution
```bash
npm run dev          # Development with HMR (hot-module-reload)
npm run build        # Compile TypeScript to `build/` dir
npm start           # Run compiled app (requires build first)
npm run test        # Execute test suite via Japa
npm run typecheck   # Validate TypeScript (no emit)
npm run lint        # ESLint check
npm run format      # Prettier format
```

### Database Management
- **SQLite** stored in `tmp/db.sqlite3` (auto-created)
- **Migrations** in `database/migrations/` - run automatically on `npm run dev`
- **Migration pattern**: `table.increments('id')` for PKs, FK references with `.onDelete('CASCADE')`
- **Ace CLI**: `node ace migration:run`, `node ace migration:rollback` (if needed)

### Environment Setup
Required `.env` variables (create from scratch):
```env
NODE_ENV=development
PORT=3333
APP_KEY=<random-32-char-string>  # Run: node ace generate:key
HOST=localhost
LOG_LEVEL=info
SESSION_DRIVER=memory
```

## Project-Specific Conventions

### Naming
- **Model fields**: Snake_case in DB, camelCase in TypeScript (auto-mapped)
- **Model class names**: Singular, PascalCase (e.g., `Leitor`, not `Leitores`)
- **Typo awareness**: "Leitore" (singular) used throughout - preserve for consistency

### Hot-Module Reload Boundaries
- Controllers and middleware hot-reload on change (defined in `package.json` hotHook)
- Models do NOT hot-reload - restart dev server if model structure changes

### Path Alias System
All imports use aliases defined in `package.json` imports:
```typescript
import User from '#models/user'
import { authMiddleware } from '#middleware/auth_middleware'
import { createUserValidator } from '#validators/user'
```
**Never use relative paths** (`../`) for cross-folder imports.

## Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| "Cannot find module" errors | Missing dependencies | Run `npm install` |
| Module resolution fails | `moduleResolution` not set | Ensure `tsconfig.json` has `"moduleResolution": "node16"` |
| `.env` validation errors | Missing required variables | Create `.env` with all vars from `start/env.ts` |
| Migrations not running | SQLite DB path issue | Check `config/database.ts` - uses `app.tmpPath('db.sqlite3')` |
| Auth guard issues | Session not configured | Verify `config/auth.ts` uses `sessionUserProvider` with correct model path |

## Key Documentation References

### Core Frameworks & Libraries (with versions)
- **AdonisJS Core** `^6.18.0`: https://docs.adonisjs.com/
- **Lucid ORM** `^21.8.1`: https://lucid.adonisjs.com/docs
- **Auth** `^9.4.0`: https://docs.adonisjs.com/guides/authentication
- **VineJS Validation** `^3.0.1`: https://vinejs.dev/
- **Session** `^7.5.1`: https://docs.adonisjs.com/guides/session
- **CORS** `^2.2.1`: https://docs.adonisjs.com/guides/cors
- **Luxon DateTime** `^3.7.2`: https://moment.github.io/luxon/

### Database & ORM
- **better-sqlite3** `^12.5.0`: SQLite driver used in production
- **TypeScript** `~5.8`: Language with strict typing
- **Assembler** `^7.8.2`: AdonisJS build tool

### Testing & Development
- **Japa Test Runner** `^4.2.0`: https://japa.dev/
- **API Client** `^3.1.0`: For API testing
- **ESLint** `^9.26.0`: Code linting
- **Prettier** `^3.5.3`: Code formatting

## When Adding New Features

1. **New entity**: Create model in `app/models/`, migration in `database/migrations/`, validators in `app/validators/`
2. **New endpoint**: Add controller method, bind in `start/routes.ts`, apply middleware as needed
3. **New relationship**: Add `@belongsTo()` or `@hasMany()` decorator with type inference
4. **Validation changes**: Update both create and update validators for consistency

---
*Last updated: Dec 5, 2025 - Auto-generated from codebase analysis*
