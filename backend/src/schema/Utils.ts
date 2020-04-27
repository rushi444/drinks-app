import { objectType, inputObjectType } from '@nexus/schema'

export const AuthPayload = objectType({
    name: 'AuthPayload',
    definition: t => {
        t.string('token')
        t.field('user', { type: 'User' })
    }
})

export const IngredientInputType = inputObjectType({
    name: 'IngredientInputType',
    definition: t => {
        t.string('name', { required: true })
        t.string('amount', { required: true })
    }
})

export interface IIngredient {
    name: string
    amount: string
}