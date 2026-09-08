# Personal Portfolio Tracker & Visual Builder

A personal portfolio website inspired by editorial AI-engineering portfolios, with one important difference: the portfolio is also a small content-management system.

The public site presents the portfolio in a polished, read-only view. The owner can unlock an editor with a password and update the portfolio visually without editing source code.

## Product idea

The portfolio should be useful both as:

1. A professional public portfolio.
2. A private tracker for projects, learning, experiments, work, writing, and current interests.

When something changes, the owner should be able to open the editor, update the relevant section, add a card, or create a new section, then publish the change.

The system should support:

- Editing headings, labels, paragraphs, links, and button text.
- Adding, editing, deleting, and reordering cards inside a section.
- Adding, editing, reordering, hiding, and deleting sections.
- Managing projects, skills, experience, education, experiments, articles, and current focus.
- Previewing changes before they become public.
- Publishing the current draft to the public portfolio.
- Protecting edit mode behind a server-validated password.

## Core experience

### Public view mode

Visitors see the published portfolio without needing an account.

The public experience should include:

- A strong hero section with name, role, introduction, portrait, and calls to action.
- Selected projects with cards and detailed case-study pages.
- About and engineering philosophy sections.
- Skills, technologies, and focus areas.
- Professional experience and education.
- Writing and research notes.
- A current-status or “Now” page.
- A lab page for experiments and unfinished ideas.
- Contact and social links.

The public site must never expose draft content or editor controls.

### Edit mode

The owner visits the editor route and enters the portfolio password.

After successful authentication, the editor provides:

- A section list showing the page structure.
- A live preview of the page.
- A properties panel for the selected section.
- Controls to add, edit, duplicate, hide, delete, and reorder sections.
- Controls to add, edit, delete, and reorder cards within supported sections.
- Save-draft and publish actions.
- Clear feedback for unsaved, saved, and published states.

The editor should feel like a focused portfolio editor, not an unrestricted website builder. Content should be composed from known section templates so the result remains visually consistent and maintainable.

## Proposed pages

### Public pages

| Route | Purpose |
|---|---|
| `/` | Main portfolio landing page |
| `/about` | Background, philosophy, skills, experience, and education |
| `/projects` | All projects |
| `/projects/:slug` | Project case study |
| `/writing` | Articles and technical notes |
| `/writing/:slug` | Article detail page |
| `/lab` | Experiments and research notes |
| `/now` | Current work, learning, and exploration |
| `/contact` | Contact channels and social links |

### Private editor pages

| Route | Purpose |
|---|---|
| `/edit/login` | Password entry |
| `/edit` | Visual editor dashboard |
| `/edit/pages/:slug` | Edit a specific page |
| `/edit/settings` | Site identity, social links, contact information, and theme settings |

The first implementation can use one editor dashboard for all content. Separate editor routes can be introduced only when the dashboard becomes difficult to navigate.

## Section system

The builder should use a small set of intentional section types rather than allowing arbitrary HTML.

### Initial section types

#### Hero

- Eyebrow
- Heading
- Supporting text
- Primary button
- Secondary button
- Image or portrait
- Optional location or role label

#### Rich text

- Eyebrow
- Heading
- Paragraphs
- Optional highlighted quote
- Optional link

#### Project cards

- Section heading and description
- Cards with title, subtitle, description, status, tags, image, repository URL, and detail-page URL
- Card ordering
- Featured-card option

#### Generic card grid

- Section heading and description
- Reusable cards with title, description, label, icon, tags, and optional link
- Add, edit, delete, and reorder cards

#### Timeline / experience

- Role
- Company
- Period
- Location
- Summary
- Highlight bullets
- Current-position flag

#### Skills and tags

- Category name
- Skills or tags
- Category ordering

#### Metrics

- Numeric value
- Label
- Description
- Optional accent color

#### Article list

- Article title
- Short description
- Date or status
- Reading time
- Tags
- Draft or published state

#### Quote / philosophy

- Quote text
- Attribution or context

#### Call to action

- Eyebrow
- Heading
- Description
- Button label
- Button URL

#### Divider / spacer

- Visual separation between sections
- Optional spacing size

This list is intentionally limited for the MVP. New section types can be added later through a typed renderer and matching editor form.

## Content model

The recommended model is page-based and section-based.

```text
Site
 ├── SiteSettings
 └── Pages
      └── Sections
           └── Section content
                └── Cards / items where supported
```

### Suggested entities

#### `SiteSettings`

- `id`
- `siteName`
- `role`
- `shortBio`
- `location`
- `email`
- `githubUrl`
- `linkedinUrl`
- `buyMeACoffeeUrl`
- `portraitUrl`
- `themeSettings`

#### `Page`

- `id`
- `slug`
- `title`
- `description`
- `isPublished`
- `createdAt`
- `updatedAt`

#### `Section`

- `id`
- `pageId`
- `type`
- `eyebrow`
- `title`
- `description`
- `order`
- `isVisible`
- `content`
- `createdAt`
- `updatedAt`

`content` can initially be stored as validated JSON. Each section type owns its own content shape. This keeps the first version simple while still allowing cards and structured data inside a section.

Example:

```json
{
  "type": "card-grid",
  "title": "Things I'm Building",
  "description": "Projects currently receiving my attention.",
  "items": [
    {
      "id": "natasha",
      "title": "Natasha",
      "subtitle": "Autonomous AI System",
      "description": "A goal-driven system exploring planning, tools, memory, and world state.",
      "status": "Active development",
      "tags": ["Agents", "Planning", "Memory"],
      "href": "/projects/natasha"
    }
  ]
}
```

The application should validate JSON according to the selected section type before saving it. Invalid content should never be rendered publicly.

## Draft and publishing model

The editor should not immediately overwrite the public site on every keystroke.

Recommended flow:

```text
Edit content → Save draft → Preview → Publish → Public site reads published content
```

The MVP should support:

- One editable draft.
- One published version.
- Explicit publish action.
- Updated-at timestamps.
- A warning when leaving with unsaved changes.

Version history and rollback are valuable future additions, but they do not need to be part of the first release.

## Password-protected edit mode

The password requirement must be implemented on the server. A client-only password check is not real protection because anyone can inspect the JavaScript bundle.

### Required behavior

- Public routes work without authentication.
- `/edit/login` accepts the password.
- The server compares the submitted password with a securely stored hash.
- Successful login creates a short-lived, signed, HTTP-only session cookie.
- Editor API routes reject requests without a valid session.
- Wrong passwords do not reveal whether any protected content exists.
- Logout clears the session cookie.

### Security requirements

- Store only a password hash, never a plain-text password.
- Use Argon2id or bcrypt for password hashing.
- Keep the password hash in a server-side environment variable or secret store.
- Never place the password or password hash in client-side code.
- Never use `localStorage` as the authentication mechanism.
- Use secure, HTTP-only, SameSite cookies.
- Add basic login rate limiting.
- Add CSRF protection if the authentication design requires it.
- Validate and sanitize rich text and links before rendering.
- Do not allow arbitrary scripts or raw unsanitized HTML in content fields.
- Restrict editor mutations to authenticated server routes.

For a personal single-admin portfolio, one password is enough for the MVP. Multi-user accounts, roles, and invitations can be added later if the project becomes a real CMS.

## Recommended implementation stack

The repository is currently documentation-only, so the implementation stack can be selected before development begins.

Recommended starting stack:

- Next.js with TypeScript
- Tailwind CSS
- PostgreSQL
- Prisma or Drizzle ORM
- Server-side API routes or server actions
- Argon2id for password hashing
- HTTP-only cookie sessions
- Zod for request and content validation
- Lucide icons
- Vercel for deployment

An equivalent Vue stack is also valid if preserving the original portfolio’s Vue approach is more important. The key architectural requirements are server-backed persistence, protected mutations, and typed content schemas.

## Suggested application structure

```text
app/
  page.tsx
  about/page.tsx
  projects/page.tsx
  projects/[slug]/page.tsx
  writing/page.tsx
  writing/[slug]/page.tsx
  lab/page.tsx
  now/page.tsx
  contact/page.tsx
  edit/login/page.tsx
  edit/page.tsx
  edit/pages/[slug]/page.tsx
  api/auth/login/route.ts
  api/auth/logout/route.ts
  api/content/route.ts
  api/content/publish/route.ts

components/
  public/
  editor/
  sections/
  layout/

lib/
  auth/
  db/
  content/
  validation/

prisma/
  schema.prisma
```

The exact framework structure can change, but public rendering, editor UI, authentication, persistence, and content validation should remain separate responsibilities.

## Editor interface

The first editor layout should be simple:

```text
┌─────────────────────────────────────────────────────────┐
│ Portfolio name       Save draft   Preview   Publish      │
├───────────────┬─────────────────────────┬───────────────┤
│ Sections      │ Live preview             │ Properties    │
│               │                         │               │
│ Hero          │ Rendered page section   │ Selected title │
│ Projects      │                         │ Description   │
│ Experience    │                         │ Cards         │
│ Writing       │                         │ Visibility    │
│ + Add section │                         │ Save           │
└───────────────┴─────────────────────────┴───────────────┘
```

Important editor behavior:

- Clicking a section selects it.
- The right panel edits only the selected section.
- Card-based sections provide add, edit, delete, and reorder controls.
- The preview updates from draft content.
- Drag-and-drop reordering is useful, but a simple up/down control is acceptable for the first version.
- Every field should have a clear label and sensible empty state.
- The editor should work on desktop first and remain usable on mobile.

## MVP scope

### Included in MVP

- Public portfolio view.
- Password login for the owner.
- Protected editor route.
- Persistent site settings.
- Persistent pages and sections.
- Add, edit, delete, hide, and reorder sections.
- Add, edit, delete, and reorder cards in card sections.
- Draft saving.
- Live preview.
- Publish action.
- Project, experience, skill, writing, lab, now, and contact section templates.
- Responsive visual design.
- Basic validation and safe link handling.

### Deliberately excluded from MVP

- Multi-user accounts.
- Public visitor accounts.
- Comments or reactions.
- Full arbitrary HTML editing.
- AI-generated content.
- Complex version branching.
- Collaborative real-time editing.
- A marketplace of themes.
- Unlimited custom layout primitives.

Keeping the builder constrained is important. A small set of well-designed blocks will produce a better portfolio than an unrestricted page builder that can easily create inconsistent layouts.

## Development phases

### Phase 1: Public portfolio foundation

- Create the visual system.
- Build the public layout and responsive navigation.
- Implement the initial home, about, projects, writing, lab, now, and contact pages.
- Seed the first portfolio content.

### Phase 2: Content schema and persistence

- Add database schema.
- Add page and section models.
- Add typed validation for each section type.
- Add seed data and migration scripts.

### Phase 3: Authentication

- Add password login.
- Add hashed password configuration.
- Add secure session cookie.
- Protect editor pages and mutation routes.
- Add logout and basic rate limiting.

### Phase 4: Visual editor

- Add section tree.
- Add section selection.
- Add property forms.
- Add card CRUD.
- Add section reorder and visibility controls.
- Add live draft preview.

### Phase 5: Publishing and deployment

- Add explicit publish workflow.
- Add published-versus-draft reads.
- Add unsaved-change handling.
- Deploy the public site and database.
- Document environment variables and recovery steps.

### Phase 6: Useful follow-up features

- Version history and rollback.
- Image upload and media library.
- Markdown editor for long-form articles.
- Search and filtering.
- Export content to JSON or Markdown.
- Activity history.
- Optional AI assistance for drafting descriptions.

## Acceptance criteria

The MVP is complete when:

- An unauthenticated visitor can browse the published portfolio.
- No edit controls are visible in public view mode.
- An incorrect password cannot open edit mode.
- The correct password opens the editor.
- The owner can edit text and see the change in the preview.
- The owner can add and remove a card inside a section.
- The owner can add, hide, delete, and reorder a section.
- Draft changes survive a page refresh after saving.
- Draft content is not public before publishing.
- Publishing makes the intended content visible publicly.
- Refreshing the public site preserves the published content.
- Editor API routes reject unauthenticated mutation requests.
- Passwords and password hashes are not shipped to the browser.
- Unsafe HTML and invalid section data are rejected or safely escaped.
- The public portfolio remains responsive on mobile and desktop.

## Key design decisions

### Use structured sections, not arbitrary page markup

This keeps the editor understandable, makes the public design consistent, and allows each section type to have a focused form.

### Separate draft content from published content

This prevents incomplete edits from appearing publicly and gives the owner a deliberate publishing step.

### Keep authentication server-side

The password protects real write operations only when the server validates every mutation request.

### Start with one owner

The project is a personal tracker. A single-admin model keeps the first version small while leaving room for proper accounts later.

### Treat the portfolio as content, not source code

Projects, learning notes, experiments, and experience should be data rendered by reusable components. The owner should not need to modify React/Vue files for normal updates.

## Risks and boundaries

- A password-only system is appropriate for a personal portfolio, not a multi-user production CMS.
- A client-rendered editor without a protected backend would not provide meaningful security.
- Arbitrary rich text or HTML can introduce XSS and layout problems; content should remain constrained and sanitized.
- A highly flexible builder can become difficult to maintain. New section types should be added intentionally.
- Image uploads, backups, and version history should be designed before storing important personal data.

## Project outcome

The finished project should demonstrate more than a static portfolio. It should demonstrate:

- Product thinking
- Full-stack application design
- Authentication and authorization
- Structured content modeling
- CRUD workflows
- Visual editor design
- Draft and publish systems
- Responsive frontend engineering
- Secure server-side mutations
- A practical tool that can continue being used after the project is finished

The strongest version of this idea is not an attempt to recreate a generic website builder. It is a focused, personal operating system for keeping a technical portfolio current.
