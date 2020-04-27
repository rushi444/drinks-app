import { makeSchema } from '@nexus/schema'
import { nexusPrismaPlugin } from 'nexus-prisma'
import * as path from 'path'

import { User } from './tables/User'
import { Recipe } from './tables/Recipe'
import { Comment } from './tables/Comment'
import { Ingredient } from './tables/Ingredient'
import { Like } from './tables/Like'
import { Query } from './Query'
import { Mutation } from './Mutation'
import { AuthPayload, IngredientInputType } from './Utils'

export const schema = makeSchema({
    types: [Query, Mutation, User, Recipe, Comment, Ingredient, Like, AuthPayload, IngredientInputType],
    plugins: [nexusPrismaPlugin()],
    outputs: {
        typegen: path.join(
            __dirname,
            '../../node_modules/@types/nexus-typegen/index.d.ts',
        ),
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