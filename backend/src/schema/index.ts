import { makeSchema } from '@nexus/schema'
import { nexusPrismaPlugin } from 'nexus-prisma'
import * as path from 'path'

import { User } from './User'
import { Recipe } from './Recipe'
import { Comment } from './Comment'
import { Ingredient } from './Ingredient'
import { Like } from './Like'

export const schema = makeSchema({
    types: [User, Recipe, Comment, Ingredient, Like],
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