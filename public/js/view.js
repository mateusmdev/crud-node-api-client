class PageView{
    constructor(){
        this.dataForm = document.querySelector('form#form-submit')
        this.btnSubmit = document.querySelector('.btn-form#submit')

        this.table = document.querySelector('.tabela')
        //this.table = document.querySelector('')

        this.dataFormUpdate = document.querySelector('form#form-update')
        this.btnEdit = document.querySelector('#edit-btn')

        this.relatorioBtn = document.querySelector('#relatorio-btn')
        this.campoRelatorio = document.querySelector('#relatorio')

        this.currentRow = null
        this.clickedBtn = false
    }
    
    addTableRow(data, id){
        let row = document.createElement('li')
        let {nome, sexo, cidade} = data
        row.classList.add('linha')
        let html = `
            <div class="coluna col-id">
                ${id}
            </div>
            <div class="coluna">
                ${nome}
            </div>

            <div class="coluna">
                ${sexo}
            </div>

            <div class="coluna">
                ${cidade}
            </div>
        `
        row.innerHTML = html
        row.appendChild(this.createRowButton())
        this.table.appendChild(row)
    }

    updateTableRow(data){
        let {id, nome, sexo, cidade} = data
        let html = `
            <div class="coluna col-id">
                ${id}
            </div>
            <div class="coluna">
                ${nome}
            </div>

            <div class="coluna">
                ${sexo}
            </div>

            <div class="coluna">
                ${cidade}
            </div>`

        this.currentRow.innerHTML = html
        this.currentRow.appendChild(this.createRowButton())
    }

    removeTableRow(){
        this.currentRow = btnEdit.parentElement.parentElement
        this.currentRow.remove()
    }

    createRowButton(){
        `
        <a href="#" class="btn-linha" id="btn-linha-remover">
            <i class="fas fa-user-minus"></i>
        </a>
        `
        const btnEdit = document.createElement('a')
        btnEdit.classList.add('btn-linha')
        btnEdit.classList.add('btn-linha-editar')
        btnEdit.innerHTML = `<a href="#" class="btn-linha" id="btn-linha-editar">
                                <i class="fas fa-user-edit"></i>
                             </a>`

        const btnRemove = document.createElement('a')
        btnRemove.classList.add('btn-linha')
        btnRemove.classList.add('btn-linha-editar')
        btnRemove.innerHTML = `<a href="#" class="btn-linha" id="btn-linha-remover">
                                <i class="fas fa-user-minus"></i>
                             </a>`

        btnEdit.addEventListener('click', (e)=> {
            e.preventDefault()
            if (!this.clickedBtn){
                this.changeForm()
                this.currentRow = btnEdit.parentElement.parentElement
                const id = this.currentRow.querySelector('.col-id').innerText
                this.setFormData(this.dataFormUpdate, id)
                const btnsEdit = document.querySelectorAll('btn-linha')
                this.toggleButtons(btnsEdit)
            }
        })

        btnRemove.addEventListener('click', async e => {
            e.preventDefault()
            if (!this.clickedBtn){
                this.currentRow = btnRemove.parentElement.parentElement
                const id = this.currentRow.querySelector('.col-id').innerText
                const primaryKey = {id: id}
                await Fetch.delete(`http://localhost/pessoa`, primaryKey)
                this.currentRow.remove()
            }
        })

        const col = document.createElement('div')
        col.classList.add('coluna')
        col.classList.add('col-id')
        col.appendChild(btnEdit)
        col.appendChild(btnRemove)

        return col
    }

    getFormData(form){
        const data = {};
        [...form.elements].forEach((input) => {
            if (input.name === 'sexo'){
                if (input.checked){
                    data[input.name] = input.value
                }
            }else
                data[input.name] = input.value
        })

        return data
    }

    async setFormData(form, id){
        //document.querySeleco
        const result = await Fetch.getID(`http://localhost:3000/pessoa/${id}`);
        [...this.dataFormUpdate.elements].forEach(input => {
            if (input.name === 'sexo'){
                if (input.value === result.sexo)
                    input.checked = true
            }else{
                input.value = result[input.name]
            }
        })
    }

    changeForm(){
        if (this.clickedBtn){
            this.dataForm.style.display = 'flex'
            this.dataFormUpdate.display = 'none !important'
        }else{
            this.dataForm.style.display = 'none'
            this.dataFormUpdate.display = 'flex !important'
        }
        this.dataFormUpdate.classList.toggle('show')
        this.clickedBtn = !this.clickedBtn
    }

    toggleButtons(buttons){
        buttons.forEach(btn => {
            btn.disable = !btn.disable
        })
    }
}
