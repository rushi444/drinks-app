import { queryType } from '@nexus/schema'

export const Query = queryType({
    definition: t => {
        t.crud.users({ filtering: true, alias: 'users' })
        t.crud.recipes({ filtering: true, ordering: true })
        t.crud.ingredients({ filtering: true })
        t.crud.comments()
        t.crud.likes()

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
    }
})