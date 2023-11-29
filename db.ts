import { PrismaClient, cache } from '@prisma/client'
import { auth } from '@/auth'
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

/**
 * Creates a user in the database
 * @param url Link to the user's profile picture
 * @param name Name of the user
 * @param id Spotify ID of the user
 * @param email Email of the user
 * @returns
 */
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

/**
 * Adds a new cache item to the database
 * @param spotifyId Spotify ID of the item 
 * @param type Type of the item
 * @param name Name of the item
 * @param imageUrl Link to the item's cover picture 
 */
export async function addToCache(spotifyId: string, type: string, name: string, imageUrl: string) {
    try {
        await prisma.cache.upsert({
            where: {
                spotifyId: spotifyId,
            },
            update: {
                type: type,
                name: name,
                imageUrl: imageUrl,
            },
            create: {
                spotifyId: spotifyId,
                type: type,
                name: name,
                imageUrl: imageUrl,
            }

        })
    } catch (error) {
        console.error("Error creating cache item:", error);
    }
}

/**
 * Gets a cache item from the database
 * @param spotifyId Spotify ID of the item
 * @returns Cache item
 */
export async function getFromCache(spotifyId: string) {
    try {
        const cacheItem = await prisma.cache.findUniqueOrThrow({
            where: {
                spotifyId: spotifyId,
            }
        });

        return cacheItem;
    } catch (error) {
        console.error("Error finding cache item:", error);
    }
}

/**
 * Gets a review from the database
 * @param tuneifyId Tuneify ID 
 * @param spotifyId Spotify ID of reviewed item
 * @returns 
 */
export async function getReview(tuneifyId: number | undefined, spotifyId: string) {
    try {
        return await prisma.review.findFirst({
            where: {
                tuneifyId: tuneifyId,
                spotifyId: spotifyId,
            }
        });
    } catch (error) {
        console.error("Error finding review item:", error);
    }
}

/**
 * Gets a number of most recent reviews from the database
 * @param type Type of reviews
 * @param limit Number of reviews to fetch
 * @returns An array of reviews
 */
export async function getRecentReviews(type: string, limit: number) {
    return await prisma.review.findMany({
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
}

/**
 * Gets all reviews from the database
 * @param tuneifyId of the user???
 * @returns An array of reviews
 */
export async function getAllReviews(tuneifyId: number | undefined) {
    if (tuneifyId) {
        return await prisma.review.findMany({
            where: {
                tuneifyId: tuneifyId,
            },
            include: {
                cache: true,
            }
        });
    }
}


export async function getCurrentTuneifyId() {
    const session = await auth();

    return await getTuneifyId(session);
}

export async function getTuneifyId(session: Session | null | undefined) {
    if (session && session.user && session.user.id) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    userSpotifyId: session.user.id
                },
            });

            if (user) {
                return user.tuneifyId
            }
        } catch (error) {
            console.error("Error finding tuneify id:", error);
        }
    }
}

export async function getTuneifyIdWithReview(spotifyId: string) {
    const session = await auth();

    if (session && session.user && session.user.id) {
        try {
            const userItem = await prisma.user.findFirst({
                where: {
                    userSpotifyId: session.user.id,
                },
                select: {
                    tuneifyId: true,
                    review: {
                        where: {
                            spotifyId: spotifyId,
                        },
                    },
                },
            })

            return userItem;
        } catch (error) {
            console.error("Error finding tuneify id with review:", error);
        }
    }
}

export async function getName(tuneifyId: number | undefined) {
    if (tuneifyId) {
        const user = await prisma.user.findUnique({
            where: {
                tuneifyId: tuneifyId
            },
        });

        if (user) {
            return user.name
        }
    }
}