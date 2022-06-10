import { Redis } from "@upstash/redis";

export const redisConnection = new Redis({
    url: process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_URL,
    token: process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_TOKEN,
})

interface UserData {
    name: string;
    roleOrCompany?: string;
    githubUsername?: string;
    avatarUrl: string;
}

export async function createUser(data: UserData) {
    const userId = data.githubUsername;

    await redisConnection.hset('users', { [userId]: data });

    return userId;
}

export async function getUser(userId: string) {
    const userRaw = await redisConnection.hget<UserData>('users', userId);

    if (!userRaw) {
        return null;
    }

    return userRaw;
}