import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { PubSub } from 'apollo-server'

const prisma = new PrismaClient()

const pubsub = new PubSub()

export const getUser = (token: string) => {
    try {
        if (token) {
            return jwt.verify(token, '123456789')
        }
        return null
    } catch (err) {
        return null
    }
}

type User = {
    id: number
    email: string
    iat: number
    exp: number
}

export type Context = {
    prisma: PrismaClient
    user?: User | any
    pubsub: any,
}

export const createContext = ({ req, connection }: any): Context => {
    const tokenWithBearer = req?.headers?.authorization || ''
    const token = tokenWithBearer.split(' ')[1]
    const user = getUser(token)
    return {
        user,
        prisma,
        pubsub,
    }
}

