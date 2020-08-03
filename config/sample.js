module.exports = {
    General: {
        dbConfig: {
            connectionURL: 'port://username:password@host:port/dbName',
            collectionPrefix: 'prefix-'
        },
        serverConfig: {
            port: process.env.PORT || 3000,
            apiPrefix: '/api'
        },
        secret: "Secret from 'sample.json' file"
    }
}