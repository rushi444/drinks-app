import { ApolloServer } from 'apollo-server'
import { schema } from './schema'
import { createContext } from './context'

const app = new ApolloServer({
    schema, context: createContext,
    //     subscriptions: {
    //     onConnect: (connectionParams: any, websocket) =>{
    //         const tokenWithBearer = connectionParams.Authorization
    //         console.log(tokenWithBearer)


    //     }
    // }, 
    cors: {
        origin: 'http://localhost:3000', optionsSuccessStatus: 200, credentials: true
    }
})

app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at: http://localhost:4000`))