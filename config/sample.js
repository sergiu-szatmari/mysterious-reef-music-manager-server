module.exports = {
    General: {
        dbConfig: {
            connectionURL: 'mongodb://<username>:<password>@<host>:<port>/<db-name>',
            collectionPrefix: 'prefix-'
        },
        serverConfig: {
            port: process.env.PORT || 3000,
            apiPrefix: '/api'
        }
    }
}
