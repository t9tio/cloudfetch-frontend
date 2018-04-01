module.exports = Object.freeze({
    backendUrl: process.env.NODE_ENV === 'production' ? 'https://api.cloudfetch.info/graphql' : 'http://localhost:8080/graphql',
});