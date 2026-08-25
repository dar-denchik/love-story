## Story Editing

Новела тепер хардкоджена, без вбудованої панелі редагування.

- `app/models.ts` містить TypeScript-моделі для фонів, персонажів і сцен.
- `app/data.ts` містить стартове привітання, фони, музику, персонажів і репліки історії.
- `app/app.vue` лише програє історію: клік по всьому екрану, `Enter`, `Space` або `ArrowRight` переходять до наступної репліки.
- У сценах `music: 'track-id'` запускає або змінює музику, а `music: null` продовжує попередню музику в циклі.
- Стилі та анімації підключені через Tailwind у `app/assets/css/main.css`.

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Static generation for GitHub Pages:

```bash
yarn generate
```

The static output is generated into `.output/public`.

## GitHub Pages

This project includes `.github/workflows/deploy-pages.yml`.

1. Push the project to a GitHub repository.
2. In repository settings, set Pages source to "GitHub Actions".
3. Push to `main` or run the workflow manually.

For a project page, the workflow automatically sets `NUXT_APP_BASE_URL` to `/<repository-name>/`. For a user or organization page named `<owner>.github.io`, it uses `/`.

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
