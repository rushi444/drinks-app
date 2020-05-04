import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { PubSub } from 'apollo-server'

export const prisma = new PrismaClient()

export const pubsub = new PubSub()

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

export type User = {
    id: number
    email: string
    iat: number
    exp: number
} | any

export type Context = {
    prisma: PrismaClient
    user?: User | any
    pubsub: any,
}

export const createContext = ({ req, connection }: any): Context => {
    if(connection){
        return connection.context
    }
    const tokenWithBearer = req.headers.authorization || ''
    const token = tokenWithBearer.split(' ')[1]
    const user = getUser(token)   
    return {
        user,
        prisma,
        pubsub,
    }
}

