const ConnectionFactory = require('./connectionFactory.js')

class DAO{
    constructor(){
        this._factory = ConnectionFactory.instance
        this._factory.createTable()
        
    }

    async insert(objeto){    
        const SQL = `INSERT INTO pessoa (nome, sexo, cidade) VALUES (?, ?, ?)`
        try {
            const conn = await this._factory.getConnection()
            await conn.run(SQL, [objeto.nome, objeto.sexo, objeto.cidade])
            await this._factory.closeConnection(conn)

        } catch (error) {
            console.log(error)
        }
    }

    async update(objeto){
        const SQL = `UPDATE pessoa SET nome = ?, sexo = ?, cidade = ? WHERE id = ?`
        try {
            const conn = await this._factory.getConnection()
            await conn.run(SQL, [objeto.nome, objeto.sexo, objeto.cidade, objeto.id])
            await this._factory.closeConnection(conn)

        } catch (error) {
            console.log(error)
        }
    }

    async get(id){
        const SQL = `SELECT * from pessoa WHERE id = ?`
        try {
            const conn = await this._factory.getConnection()
            const result = await conn.all(SQL, [id])
            await this._factory.closeConnection(conn)

            return result

        } catch (error) {
            console.log(error)
        }
    }

    async getAll(){
        const SQL = `SELECT * from pessoa WHERE id`
        try {
            const conn = await this._factory.getConnection()
            const result = await conn.all(SQL)
            await this._factory.closeConnection(conn)

            return result

        } catch (error) {
            console.log(error)
        }
    }

    async delete(id){
        const SQL = `DELETE FROM pessoa WHERE id = ?`
        try {
            const conn = await this._factory.getConnection()
            await conn.run(SQL, [id])
            await this._factory.closeConnection(conn)

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = DAO