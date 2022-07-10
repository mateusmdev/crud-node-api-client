class Pessoa{
    constructor(nome, sexo, cidade, id = null){
        this.id = id;
        this.nome = nome
        this.sexo = sexo
        this.cidade = cidade
    }

    getNome(){
        return this.nome
    }

    setNome(value){
        this.nome = value
    }
    getSexo(){
        return this.sexo
    }

    setSexo(value){
        this.sexo = value
    }
    getCidade(){
        return this.cidade
    }

    setCidade(value){
        this.cidade = value
    }

    async save(){
        return new Promise((resolve, reject) => {
            let promise
            if (this.id){


                promise = Fetch.put('http://localhost:3000/pessoa', this)

            }else{
                promise = Fetch.post('http://localhost:3000/pessoa', this)
            }
            
            promise.then(data => {
                resolve(promise)
            })
        })
    }

}