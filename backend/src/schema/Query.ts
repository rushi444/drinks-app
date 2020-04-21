import { queryType } from '@nexus/schema'

export const Query = queryType({
    definition: t => {
        t.crud.users({ filtering: true, alias: 'users' })
        t.crud.recipes({ filtering: true, ordering: true })
        t.crud.ingredients()
        t.crud.comments()
    }
})