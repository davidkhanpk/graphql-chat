const userResolvers = require('./userResolvers');
const messageResolvers = require('./messageResolvers');

module.exports = {
    Message: {
        createdAt: (parent) => parent.createdAt.toISOString()
    },
    User: {

    },
    Query: {
        ...userResolvers.Query,
        ...messageResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...messageResolvers.Mutation
    }
}