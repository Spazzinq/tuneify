import { PrismaClient, cache } from '@prisma/client'
import { auth } from '@/auth'
import { Session } from 'next-auth'

// Function to create a singleton instance of PrismaClient
const prismaClientSingleton = () => {
    return new PrismaClient()
}

// Define the type for the PrismaClient singleton
type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

// Define a global variable to store the PrismaClient singleton
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined
}

// Use the existing PrismaClient instance if available, or create a new one
const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

// Export the PrismaClient instance for use in the application
export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

/**
 * Creates a user in the database
 * @param url Link to the user's profile picture
 * @param name Name of the user
 * @param id Spotify ID of the user
 * @param email Email of the user
 */
export async function createUser(url: string, name: string, id: string, email: string) {
    try {
        //Check if a user with the given Spotify ID and email already exists
        if (await prisma.user.findUnique({
            where: {
                userSpotifyId: id,
                email: email
            }
        })) {
        // If the user already exists, log a message and return
            console.log("User already exists!");
            return;
        }
        // Create a new user in the database using Prisma
        const user = await prisma.user.create({
            data: {
                userSpotifyId: id,
                name: name,
                imageUrl: url,
                email: email
            }
        });
        // Log a message indicating that the user was successfully created
        console.log("User created:", user);
    } catch (error) {
        // If an error occurs during user creation, log the error
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
        // Use Prisma to upsert (update or insert) a cache item for the specified Spotify user
        await prisma.cache.upsert({
            where: {
                spotifyId: spotifyId,
            },
            // Update the existing cache item or create a new one if it doesn't exist
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
        // If an error occurs during cache item creation or update, log the error
        console.error("Error creating cache item:", error);
    }
}

/**
 * Gets a cache item from the database
 * @param spotifyId Spotify ID of the item
 * @returns A cache item
 */
export async function getFromCache(spotifyId: string) {
    try {
        // Use Prisma to find a unique cache item for the specified Spotify user or throw an error
        const cacheItem = await prisma.cache.findUniqueOrThrow({
            where: {
                spotifyId: spotifyId,
            }
        });

        return cacheItem;
    } catch (error) {
        // If an error occurs during cache item retrieval, log the error
        console.error("Error finding cache item:", error);
    }
}

/**
 * Gets a review from the database
 * @param tuneifyId Tuneify ID of the user
 * @param spotifyId Spotify ID of reviewed item
 * @returns A review item
 */
export async function getReview(tuneifyId: number | undefined, spotifyId: string) {
    try {
        // Use Prisma to find the first review item that matches the Tuneify ID and Spotify ID
        return await prisma.review.findFirst({
            where: {
                tuneifyId: tuneifyId,
                spotifyId: spotifyId,
            }
        });
    } catch (error) {
        // If an error occurs during the review item retrieval, log the error
        console.error("Error finding review item:", error);
    }
}

/**
 * Gets a number of most recent reviews from the database
 * @param type Type of reviews
 * @param limit Number of reviews to fetch
 * @returns An array of review items
 */
export async function getRecentReviews(type: string, limit: number) {
    // Use Prisma to find many recent reviews based on the type of cached item
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
 * Gets all reviews by a user from the database
 * @param tuneifyId Tuneify ID of the user
 * @returns An array of reviews
 */
export async function getAllReviews(tuneifyId: number | undefined) {
    if (tuneifyId) {
        // Use Prisma to find many reviews associated with the specified Tuneify ID
        return await prisma.review.findMany({
            where: {
                tuneifyId: tuneifyId,
            },
            // Include details from the associated cache for each review
            include: {
                cache: true,
            }
        });
    }
}


/**
 * Gets Tuneify ID of the current user from the database
 * @returns Tuneify ID of the current user
 */
export async function getCurrentTuneifyId() {
    // Authenticate the user and obtain the session information
    const session = await auth();
    
    // Use the session information to retrieve the Tuneify ID
    return await getTuneifyId(session);
}

/**
 * Gets Tuneify ID of the specified session's user
 * @param session A session
 * @returns Tuneify ID of the session's user
 */
export async function getTuneifyId(session: Session | null | undefined) {
    if (session && session.user && session.user.id) {
        try {
            // Use Prisma to find a unique user based on the Spotify ID from the session
            const user = await prisma.user.findUnique({
                where: {
                    userSpotifyId: session.user.id
                },
            });
            // If the user is found, return the associated Tuneify ID
            if (user) {
                return user.tuneifyId
            }
        } catch (error) {
            // If an error occurs during Tuneify ID retrieval, log the error
            console.error("Error finding tuneify id:", error);
        }
    }
}

/**
 * Gets Tuneify ID and review associated with the specified Spotify ID from the database
 * @param spotifyId Spotify ID of the reviewed item
 * @returns A user item with Tuneify ID and reivew
 */
export async function getTuneifyIdWithReview(spotifyId: string) {
    const session = await auth();

    // Check if session information and user ID are available
    if (session && session.user && session.user.id) {
        try {
            // Use Prisma to find the first user with the specified Spotify ID and retrieve Tuneify ID and associated reviews
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
            // If an error occurs during Tuneify ID and review retrieval, log the error
            console.error("Error finding tuneify id with review:", error);
        }
    }
}

/**
 * Gets the name of the user from the database
 * @param tuneifyId Tuneify ID of the user
 * @returns User's name
 */
export async function getName(tuneifyId: number | undefined) {
    if (tuneifyId) {
        // Use Prisma to find a unique user based on the Tuneify ID
        const user = await prisma.user.findUnique({
            where: {
                tuneifyId: tuneifyId
            },
        });
        // If the user is found, return their name
        if (user) {
            return user.name
        }
    }
}