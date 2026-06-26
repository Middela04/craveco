# craveco

[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/Middela04/craveco)

# CraveCo — Setup ideas

## 1. Supabase Database

Run `supabase/schema.sql` in your Supabase Dashboard → SQL Editor.
This creates the `groups` and `members` tables with real-time enabled.

## 2. Deploy the Edge Function

Install Supabase CLI if you haven't:
```bash
brew install supabase/tap/supabase
```

Login and link your project:
```bash
supabase login
supabase link --project-ref xezayffksfgmxdnabtxo
```

Deploy the search function:
```bash
supabase functions deploy search-restaurants
```

The SERPAPI_KEY secret should already be set (you added it in the dashboard).
To verify: Supabase Dashboard → Edge Functions → search-restaurants → Secrets

## 3. Run locally

```bash
npm install
npm start
```

## 4. Deploy as a webapp (Vercel / Netlify)

```bash
npm run build
# then drag the build/ folder to Netlify, or:
npx vercel --prod
```

Once deployed, shareable links like `https://craveco.vercel.app/?code=GRP-XXXX` will work.

## 5. Wrap for iOS App Store (Capacitor)

```bash
npm install @capacitor/core @capacitor/cli @capacitor/ios
npm run build
npm run cap:add:ios
npm run cap:sync
npm run cap:open:ios   # opens Xcode
```

In Xcode: set your Team, Bundle ID (com.craveco.app), then Archive → Upload to App Store.

## Architecture

```
React App (browser / Capacitor iOS)
    │
    ├── Supabase Realtime ──── groups + members tables (live sync)
    │
    └── Supabase Edge Function (search-restaurants)
              │
              └── SerpAPI Google Maps ──── live restaurant data by lat/lng
```
