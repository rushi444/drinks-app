import { ApolloServer } from 'apollo-server'
import { schema } from './schema'
import { createContext, getUser, prisma, pubsub } from './context'

const app = new ApolloServer({
    schema, context: createContext,
    subscriptions: {
        onConnect: (connectionParams, webSocket, context: any) => {
            const tokenWithBearer = context.request.headers.authorization || ''
            const token = tokenWithBearer.split(' ')[1]
            const user = getUser(token)
            return {
                user, prisma, pubsub
            }
        }
    },
    cors: {
        origin: 'http://localhost:3000', optionsSuccessStatus: 200, credentials: true
    }
})
app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at: http://localhost:4000`))