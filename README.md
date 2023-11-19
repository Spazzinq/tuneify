## Tuneify is all about making music accessible. Join us on a life-long journey to diversify your music taste.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

```sql
CREATE TABLE "public"."user" (
  "tuneifyId" SERIAL PRIMARY KEY NOT NULL,
  "userSpotifyId" VARCHAR(255) UNIQUE NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  "imageUrl" TEXT NOT NULL
);

  CREATE TABLE "public"."review" (
    id SERIAL PRIMARY KEY NOT NULL,
    "tuneifyId" INTEGER NOT NULL,
    "spotifyId" VARCHAR(255) UNIQUE NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
    published BOOLEAN NOT NULL DEFAULT true,
    title VARCHAR(255) NOT NULL,
    stars REAL NOT NULL,
    content TEXT,
    FOREIGN KEY ("tuneifyId") REFERENCES "public"."user"("tuneifyId"),
    FOREIGN KEY ("spotifyId") REFERENCES "public"."cache"("spotifyId")
  );

CREATE TABLE "public"."cache" (
  id SERIAL PRIMARY KEY NOT NULL,
  "spotifyId" VARCHAR(255) UNIQUE NOT NULL,
  "type" VARCHAR(255) NOT NULL, -- artist, album, or track
  "name" VARCHAR(255),
  "imageUrl" TEXT NOT NULL
);

-- CREATE TABLE "public"."TopArtist" (
--   id SERIAL PRIMARY KEY NOT NULL,
--   name VARCHAR(255) NOT NULL,
--   imageUrl text NOT NULL
-- );
```

```sql
INSERT INTO "public"."Review" ("authorId", "type", stars, title, "imageUrl") values (1, "");
INSERT INTO "public"."cache" ("spotifyId", "type", "name", "imageUrl") values ('06HL4z0CvFAxyc27GXpf02', 'artist', 'Taylor Swift', 'https://i.scdn.co/image/ab67616100005174859e4c14fa59296c8649e0e4');
INSERT INTO "public"."cache" ("spotifyId", "type", "name", "imageUrl") values ('4GvEc3ANtPPjt1ZJllr5Zl', 'artist', 'Bazzi', 'https://i.scdn.co/image/ab6761610000e5eb2491594c8f731523e085d84a');
INSERT INTO "public"."cache" ("spotifyId", "type", "name", "imageUrl") values ('1McMsnEElThX1knmY4oliG', 'artist', 'Olivia Rodrigo', 'https://i.scdn.co/image/ab6761610000e5ebe03a98785f3658f0b6461ec4');
INSERT INTO "public"."cache" ("spotifyId", "type", "name", "imageUrl") values ('50JJSqHUf2RQ9xsHs0KMHg', 'artist', 'Jon Bellion', 'https://i.scdn.co/image/ab6761610000e5ebe0c2c39a5bc940f905aa02f3');
INSERT INTO "public"."cache" ("spotifyId", "type", "name", "imageUrl") values ('3WGpXCj9YhhfX11TToZcXP', 'artist', 'Troye Sivan', 'https://i.scdn.co/image/ab6761610000e5eb26e8cb3ff6fc7744b312811b');
```