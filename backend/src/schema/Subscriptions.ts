import { subscriptionField, intArg } from "@nexus/schema";
import { withFilter } from "apollo-server";


export const CommentSubscription = subscriptionField('newComment', {
    type: 'Comment',
    description: 'New Comment Subscription',
    args: { recipeId: intArg({ required: true }) },
    subscribe: withFilter(
        (parent, args, { pubsub }, info) => pubsub.asyncIterator('newComment'),
        async (payload, variables) => {
            return payload.newComment.recipeId === variables.recipeId
        }),
    resolve: payload => payload.newComment
})