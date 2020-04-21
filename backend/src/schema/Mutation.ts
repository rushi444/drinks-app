import { mutationType, intArg, stringArg } from '@nexus/schema'
import { Ingredient } from './tables/Ingredient'

export const Mutation = mutationType({
    definition: t => {
        t.crud.createOneUser({ alias: 'signUp' })
        // t.crud.createOneRecipe()

        t.field('createRecipe', {
            type: 'Recipe',
            args: {
                name: stringArg({ required: true }),
                imageUrl: stringArg(),
                userId: intArg({ required: true })
            },
            resolve: async (parent, { name, imageUrl, userId }, context, info) => {
                const newRecipe = await context.prisma.recipe.create({
                    data: {
                        name, imageUrl, createdBy: {
                            connect: {
                                id: userId
                            }
                        }
                    }
                })
                return newRecipe
            }
        })

        t.field('createComment', {
            type: 'Comment',
            args: {
                text: stringArg({ required: true }),
                userId: intArg({ required: true }),
                recipeId: intArg({ required: true })
            },
            resolve: async (parent, { text, userId, recipeId }, context, info) => {
                const newComment = await context.prisma.comment.create({
                    data: {
                        text, createdBy: {
                            connect: {
                                id: userId
                            }
                        }, recipe: {
                            connect: {
                                id: recipeId
                            }
                        }
                    }
                })
                return newComment
            }
        })

        t.field('createIngredient', {
            type: Ingredient,
            args: {
                amount: stringArg({ required: true }),
                name: stringArg({ required: true }),
                recipeId: intArg({ required: true })
            },
            resolve: async (parent, { amount, name, recipeId }, context, info) => {
                const newIngredient = await context.prisma.ingredient.create({
                    data: {
                        name, amount, recipe: {
                            connect: {
                                id: recipeId
                            }
                        }
                    }
                })
                return newIngredient
            }
        })

        t.field('createLike', {
            type: 'Like',
            args: {
                userId: intArg({ required: true }),
                recipeId: intArg({ required: true })
            },
            resolve: async (parent, { userId, recipeId }, context, info) => {
                const newLike = await context.prisma.like.create({
                    data: {
                        likedBy: {
                            connect: {
                                id: userId
                            }
                        },
                        recipe: {
                            connect: {
                                id: recipeId
                            }
                        }
                    }
                })
                return newLike
            }
        })
    }
})