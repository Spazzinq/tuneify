## Tuneify is all about making music accessible. Join us on a life-long journey to diversify your music taste.

This is a [Next.js](https://nextjs.org/) project! You can run the project with the following command:

```bash
npm run dev
```

After running the command, open [http://localhost:3000](http://localhost:3000) to see the dev implementation.

## Environment Setup
The following commands will be helpful to get your Postgres database off its feet to deploy this project. You will need an `.env` file for Prisma and NextAuth with the following environment variables: `POSTGRES_URL, POSTGRES_PRISMA_URL, POSTGRES_URL_NON_POOLING, POSTGRES_USER, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_DATABASE` and  `SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_SCOPES, SPOTIFY_REFRESH_TOKEN_URL` and finally `NEXTAUTH_URL, NEXTAUTH_SECRET`.

### Table Creation Commands
```sql
CREATE TABLE "public"."user" (
  "tuneifyId" SERIAL PRIMARY KEY NOT NULL,
  "userSpotifyId" VARCHAR(255) UNIQUE NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  "imageUrl" TEXT
);

CREATE TABLE "public"."review" (
  id SERIAL PRIMARY KEY NOT NULL,
  "tuneifyId" INTEGER NOT NULL,
  "spotifyId" VARCHAR(255) NOT NULL,
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
```
### Sample Cache Data
```sql
INSERT INTO "public"."cache" ("spotifyId", "type", "name", "imageUrl") values ('06HL4z0CvFAxyc27GXpf02', 'artist', 'Taylor Swift', 'https://i.scdn.co/image/ab67616100005174859e4c14fa59296c8649e0e4');
INSERT INTO "public"."cache" ("spotifyId", "type", "name", "imageUrl") values ('4GvEc3ANtPPjt1ZJllr5Zl', 'artist', 'Bazzi', 'https://i.scdn.co/image/ab6761610000e5eb2491594c8f731523e085d84a');
INSERT INTO "public"."cache" ("spotifyId", "type", "name", "imageUrl") values ('1McMsnEElThX1knmY4oliG', 'artist', 'Olivia Rodrigo', 'https://i.scdn.co/image/ab6761610000e5ebe03a98785f3658f0b6461ec4');
INSERT INTO "public"."cache" ("spotifyId", "type", "name", "imageUrl") values ('50JJSqHUf2RQ9xsHs0KMHg', 'artist', 'Jon Bellion', 'https://i.scdn.co/image/ab6761610000e5ebe0c2c39a5bc940f905aa02f3');
INSERT INTO "public"."cache" ("spotifyId", "type", "name", "imageUrl") values ('3WGpXCj9YhhfX11TToZcXP', 'artist', 'Troye Sivan', 'https://i.scdn.co/image/ab6761610000e5eb26e8cb3ff6fc7744b312811b');
```