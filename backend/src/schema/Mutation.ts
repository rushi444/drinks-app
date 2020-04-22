import { mutationType, intArg, stringArg } from '@nexus/schema'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const Mutation = mutationType({
    definition: t => {
        t.crud.deleteOneLike({ alias: 'unlike' })

        t.field('register', {
            type: 'User',
            args: {
                name: stringArg({ required: false }),
                email: stringArg({ required: true }),
                password: stringArg({ required: true })
            },
            resolve: async (parent, { name, email, password }, { prisma }, info) => {
                const hashedPassword = await bcrypt.hash(password, 10)
                const newUser = await prisma.user.create({
                    data: {
                        email, name, password: hashedPassword
                    }
                })
                return newUser
            }
        })

        t.field('login', {
            type: 'AuthPayload',
            args: {
                email: stringArg({ required: true }),
                password: stringArg({ required: true })
            },
            resolve: async (parent, { email, password }, { prisma }, info) => {
                const user = await prisma.user.findOne({
                    where: {
                        email
                    }
                })

                if (!user) {
                    throw new Error('Invalid Login')
                }

                const passwordMatch = await bcrypt.compare(password, user.password)

                if (!passwordMatch) {
                    throw new Error('Invalid Login')
                }

                const token = jwt.sign({ id: user.id, email: user.email }, '123456789', { expiresIn: '30d' })

                return { token, user }
            }
        })

        t.field('createRecipe', {
            type: 'Recipe',
            args: {
                name: stringArg({ required: true }),
                imageUrl: stringArg(),
            },
            resolve: async (parent, { name, imageUrl }, { user, prisma }, info) => {
                if (!user) {
                    throw new Error('Not Authenticated')
                }
                const newRecipe = await prisma.recipe.create({
                    data: {
                        name, imageUrl, createdBy: {
                            connect: {
                                id: user.id
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
                recipeId: intArg({ required: true })
            },
            resolve: async (parent, { text, recipeId }, { user, prisma }, info) => {
                if (!user) {
                    throw new Error('Not Authenticated')
                }
                const newComment = await prisma.comment.create({
                    data: {
                        text, createdBy: {
                            connect: {
                                id: user.id
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
            type: 'Ingredient',
            args: {
                amount: stringArg({ required: true }),
                name: stringArg({ required: true }),
                recipeId: intArg({ required: true })
            },
            resolve: async (parent, { amount, name, recipeId }, { prisma }, info) => {
                const newIngredient = await prisma.ingredient.create({
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
                recipeId: intArg({ required: true })
            },
            resolve: async (parent, { recipeId }, { user, prisma }, info) => {
                const newLike = await prisma.like.create({
                    data: {
                        likedBy: {
                            connect: {
                                id: user.id
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