import { makeSchema } from '@nexus/schema'
import { nexusPrismaPlugin } from 'nexus-prisma'
import * as path from 'path'

import { User } from './models/User'
import { Recipe } from './models/Recipe'
import { Comment } from './models/Comment'
import { Ingredient } from './models/Ingredient'
import { Like } from './models/Like'
import { Query } from './Query'
import { Mutation } from './Mutation'
import { CommentSubscription } from './Subscriptions'
import { AuthPayload, IngredientInputType } from './Utils'

export default makeSchema({
    types: [Query, Mutation, User, Recipe, Comment, Ingredient, Like, AuthPayload, IngredientInputType, CommentSubscription],
    plugins: [nexusPrismaPlugin()],
    outputs: {
        typegen: path.join(
            __dirname,
            '../generated/nexus.ts',
        ),
        schema: path.join(__dirname, '../generated/schema.graphql')
    },
    typegenAutoConfig: {
        contextType: 'Context.Context',
        sources: [
            {
                source: '@prisma/client',
                alias: 'prisma',
            },
            {
                source: require.resolve('../context'),
                alias: 'Context',
            },
        ],
    },
})