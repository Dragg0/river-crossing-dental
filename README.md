This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## PDF signer (`/tools/sign-pdf`)

An office tool for signing and dating PDFs: open one from Google Drive (or the computer), click **Sign & date** on the signature line, then save a signed copy back to Drive, replace the original, or download it.

- Everything runs in the browser. PDFs are never uploaded to this website; they only go back to the user's own Google Drive.
- It asks Google only for the `drive.file` permission, so it can open the files you pick and the files it saves, nothing else in your Drive.
- Your drawn signature is remembered in that browser (localStorage), so you draw it once per computer. Use **Redraw my signature** to change it.
- The page is `noindex` and disallowed in `robots.txt`, and it isn't linked from the site.
- PDF.js runtime files live in `public/pdfjs`. After upgrading `pdfjs-dist`, run `node scripts/copy-pdfjs-assets.mjs` and commit the result.

Opening from your computer works with no setup. To connect Google Drive (one time, about 10 minutes):

1. Go to [console.cloud.google.com](https://console.cloud.google.com), create a project (for example "RCD PDF Signer"), and select it.
2. **APIs & Services › Library**: enable **Google Drive API** and **Google Picker API**.
3. **Google Auth Platform** (the OAuth consent screen): choose **External**, fill in the app name and your email. Under **Data access**, add the scope `https://www.googleapis.com/auth/drive.file`. Under **Audience**, leave it in **Testing** and add each Google account that will use the tool as a test user.
4. **Clients › Create client › Web application**. Under **Authorized JavaScript origins** add `https://www.rivercrossingdental.com` (and `http://localhost:3000` for local testing). No redirect URIs are needed. Copy the **Client ID**.
5. **APIs & Services › Credentials › Create credentials › API key**. Restrict it to **Websites** `https://www.rivercrossingdental.com/*` (plus `http://localhost:3000/*`) and to the **Google Picker API**. Copy the key.
6. Copy the **Project number** from the project's dashboard (Cloud overview).
7. In Vercel, **Settings › Environment Variables**, add these and redeploy:

   | Variable | Value |
   | --- | --- |
   | `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | the Client ID from step 4 |
   | `NEXT_PUBLIC_GOOGLE_API_KEY` | the API key from step 5 |
   | `NEXT_PUBLIC_GOOGLE_APP_ID` | the project number from step 6 |

   For local testing, put the same three lines in `.env.local`.

These values are public by design (they ship in the page); Google limits them to the origins above. While the app is in Testing, Google shows a "Google hasn't verified this app" screen the first time each user signs in; choose **Continue**.
