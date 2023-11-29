import { PrismaClient, cache } from '@prisma/client'
import { auth } from '@/auth'

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


export async function getTuneifyId() {
    const session = await auth();

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