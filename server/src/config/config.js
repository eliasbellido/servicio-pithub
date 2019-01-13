module.exports={
    port: process.env.PORT || 5081,
    secretWord:'cadenaparagenerareltoken$$$$$',
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'admin@bellido',
    database: process.env.DB_NAME || 'restauranteBD'
}
