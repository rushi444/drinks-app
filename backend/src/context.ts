import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

const getUser = (token: string) => {
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
}

export const createContext = ({ req }: any): Context => {
    const tokenWithBearer = req.headers.authorization || ''
    const token = tokenWithBearer.split(' ')[1]
    const user = getUser(token)
    return {
        user,
        prisma,  
    }
}

