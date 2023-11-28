import { PrismaClient, cache } from '@prisma/client'
import { auth } from '@/auth'
import { get } from 'http'
import { Session } from 'next-auth'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function createUser(url: string, name: string, id: string, email: string) {
  try {
      if (await prisma.user.findUnique({
          where: {
              userSpotifyId: id,
              email: email
          }
      })) {
          console.log("User already exists!");
          return;
      }

      const user = await prisma.user.create({
          data: {
              userSpotifyId: id,
              name: name,
              imageUrl: url,
              email: email
          }
      });

      console.log("User created:", user);
  } catch (error) {
      console.error("Error creating user:", error);
  }
}

export async function addToCache(spotifyId: string, type: string, name: string, imageUrl: string) {
  try {
      if (await prisma.cache.findUnique({
          where: {
              spotifyId: spotifyId,
          }
      })) {
          console.log(type + " " + name + " already exists!");
          return;
      }

      const cacheItem = await prisma.cache.create({
          data: {
              spotifyId: spotifyId,
              type: type,
              name: name,
              imageUrl: imageUrl,
          }
      });

      console.log("Cache created:", cacheItem);
  } catch (error) {
      console.error("Error creating cache item:", error);
  }
}

export async function getFromCache(spotifyId: string) {
  try {
      const cacheItem = await prisma.cache.findUniqueOrThrow({
          where: {
              spotifyId: spotifyId,
          }
      });

      console.log("Cache item found:", cacheItem);
      return cacheItem;
  } catch (error) {
      console.error("Error finding cache item:", error);
  }
}

export async function getTuneifyId(userSpotifyId: string) {
    try {
        const userItem = await prisma.user.findUniqueOrThrow({
            where: {
                userSpotifyId: userSpotifyId,
            }
        });
    
        console.log("Cache item found:", userItem);
        return userItem.tuneifyId;
    } catch (error) {
        console.error("Error finding cache item:", error);
    }
}


export async function getFromReview(userSpotifyId: string, spotifyId: string) {
  try {
      return await prisma.review.findFirst({
          where: {
              tuneifyId: await getTuneifyId(userSpotifyId),
              spotifyId: spotifyId,
          }
      });
  } catch (error) {
      console.error("Error finding review item:", error);
  }
}

export async function getTuneifyIdFromSession(session: Session | null) {
    if (session && session.user && session.user.id) {
        const user = await prisma.user.findUnique({
            where: {
                userSpotifyId: session.user.id
            },
        });
  
        if (user) {
            return user.tuneifyId
        }
    }
  }

export async function getRecentReviews(type: string, limit: number) {
    const reviews = await prisma.review.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      where: {
        cache: {
          type: type,
        },
      },
      select: {
        spotifyId: true,
        cache: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
      },
      take: limit
    });

    return reviews;
}
