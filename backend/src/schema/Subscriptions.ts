import { subscriptionField, intArg } from "@nexus/schema";
import { withFilter } from "apollo-server";


export const CommentSubscription = subscriptionField('newComment', {
    type: 'Comment',
    description: 'New Comment Subscription',
    args: { recipeId: intArg({ required: true }) },
    subscribe: withFilter(
        (parent, args, context, info) => {
           return context.pubsub.asyncIterator('newComment')},
        async (payload, variables) => {
            return payload.recipeId === variables.recipeId
        }),
    resolve: payload => payload
})