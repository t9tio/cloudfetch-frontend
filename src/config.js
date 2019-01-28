module.exports = Object.freeze({
    backendUrl: process.env.NODE_ENV === 'production' ? 'https://api.cloudfetch.info/graphql' : 'http://localhost:8080/graphql',
    lambdaUrl: 'https://yo08s2qyh9.execute-api.us-west-2.amazonaws.com/staging',
    plans: {
        free: {
            price: 0,
            starLimit: 3,
            fetcherLimit: 1,
        },
        copper: {
            price: 3,
            starLimit: 10,
            fetcherLimit: 3,
        },
        silver: {
            price: 4,
            starLimit: 15,
            fetcherLimit: 5,
        },
        gold: {
            price: 5,
            starLimit: 30,
            fetcherLimit: 10,
        },
    },
});
