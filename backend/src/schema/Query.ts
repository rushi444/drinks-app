import { queryType, stringArg } from '@nexus/schema'

export const Query = queryType({
    definition: t => {
        t.crud.users({ filtering: true, alias: 'users' })
        t.crud.recipes({ filtering: true, ordering: true, pagination: true })
        t.crud.ingredients({ filtering: true })
        t.crud.comments()
        t.crud.likes()

        t.crud.recipe()

        t.field('search', {
            type: 'Recipe',
            list: true,
            args: {
                searchText: stringArg({ required: true })
            },
            resolve: async (parent, { searchText }, { prisma }, info) => {
                const toTitleCase = (string: string): string => {
                    return string.charAt(0).toUpperCase() + string.slice(1)
                }
                const recipes = await prisma.recipe.findMany({
                    where: {
                        OR: [
                            { name: { contains: searchText } },
                            { name: { contains: toTitleCase(searchText) } },
                            { name: { contains: searchText.toUpperCase() } },
                            { name: { contains: searchText.toLowerCase() } },
                            { ingredients: { every: { name: { contains: searchText } } } },
                            { ingredients: { every: { name: { contains: toTitleCase(searchText) } } } },
                            { ingredients: { every: { name: { contains: searchText.toUpperCase() } } } },
                            { ingredients: { every: { name: { contains: searchText.toLowerCase() } } } }

                        ]
                    },
                    orderBy: { id: 'desc' }
                })
                return recipes
            }
        })

        t.field('me', {
            type: 'User',
            args: {},
            resolve: async (parent, args, { user, prisma }, info) => {
                const me = prisma.user.findOne({
                    where: {
                        id: user.id
                    }
                })
                return me
            }

        })

        t.field('likedDrinks', {
            type: 'Recipe',
            list: true,
            args: {},
            resolve: async (parent, args, { user, prisma }, info) => {
                const allLikes = await prisma.like.findMany({
                    where: {
                        userId: user.id
                    }
                })

                const recipeIdArr = allLikes.map(like => {
                    return like.recipeId
                })

                const recipes = await prisma.recipe.findMany({
                    where: {
                        id: { in: recipeIdArr }
                    }
                })
                return recipes
            }
        })
    }
})