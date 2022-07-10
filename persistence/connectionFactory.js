const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')

class ConnectionFactory{
    constructor(){
        ConnectionFactory._instance
    }

    static get instance(){
        if (!ConnectionFactory._instance)
            ConnectionFactory._instance = new ConnectionFactory()

        return ConnectionFactory._instance
    }

    async getConnection(){
        try {
            const db = await sqlite.open({ 
                filename: './persistence/db.sqlite', 
                driver: sqlite3.Database 
            })

            return db

        } catch (error) {
            console.log(error)
            console.log('-----------------------------------')
            return error
        }
    }

    async closeConnection(db){
        await db.close()
    }

    async createTable(){
        const db = await this.getConnection()

        try {
            const tablePessoa = `CREATE TABLE IF NOT EXISTS pessoa (
                id INTEGER PRIMARY KEY,
                nome TEXT,
                sexo TEXT,
                cidade TEXT
            )`
            await db.exec(tablePessoa)
            await this.closeConnection(db)

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = ConnectionFactory