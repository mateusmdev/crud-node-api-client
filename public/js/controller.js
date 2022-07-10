class PageController{
    constructor(view){
        this._view = view

        this.initEvents()
    }

    initEvents(){
        this.onSubmit()
        this.onLoadTable()
        this.relatorioEvent()
    }

    async onLoadTable(){
        let data = await Fetch.get('http://localhost:3000/pessoa')
        const {pessoas} = data
        pessoas.forEach(p => {
            this._view.addTableRow(p, p.id)
        })

    }

    async onSubmit(){
        this._view.dataForm.addEventListener('submit', (e) => {
            e.preventDefault()
            
                let data = this._view.getFormData(this._view.dataForm)
                let p = new Pessoa(data.nome, data.sexo, data.cidade)
                p.save().then(result => {
                    const id = this._view.table.querySelectorAll('li').length
                    this._view.addTableRow(p, id)
                    this._view.dataForm.reset()
                })

        }, false)

        this._view.dataFormUpdate.addEventListener('submit', e => {
            e.preventDefault()
            let data = this._view.getFormData(this._view.dataFormUpdate)
            const id = this._view.currentRow.querySelector('.col-id').innerText
            let p = new Pessoa(data.nome, data.sexo, data.cidade, id)
            p.save().then(result => {
                this._view.updateTableRow(p)
                this._view.dataFormUpdate.reset()
                this._view.changeForm()
            })
        }, false)
    }

    relatorioEvent(){
        this._view.relatorioBtn.addEventListener('click', async e => {
            e.preventDefault()
            let obj = {}
            let data = await Fetch.get('http://localhost:3000/pessoa')
            const {pessoas} = data
            console.log(pessoas)
            pessoas.forEach(p => {
                //console.log(p)
                obj[p.cidade] = {
                    homem: 0,
                    mulher: 0,
                    total: 0
                }
            })
            pessoas.forEach(p => {
                if (p.sexo === 'Masculino')
                    obj[p.cidade].homem++
                else
                    obj[p.cidade].mulher++

                obj[p.cidade].total++
            })
            let log = ''
            
            Object.keys(obj).forEach(cidade => {
                console.log(cidade.homem)
                log += `Contato em ${cidade}:\n`
                log += `Homens: ${obj[cidade].homem}\n`
                log += `Mulheres: ${obj[cidade].mulher}\n`
                log += `Total: ${obj[cidade].total}\n\n`
            })
            console.log(log)
            this._view.campoRelatorio.value = log
        })
        
    }

}
