class Tarefa {
    constructor(nome, categoria, realizada) {
        this.nome = nome;
        this.categoria = categoria;
        this.realizada = realizada;
    }

    adicionaNaPagina(containerEl, block) {
        let novoItemLi = document.createElement('li')
        novoItemLi.classList.toggle('item-tarefa')
        if (this.realizada) {
            novoItemLi.classList.toggle('marcado')
        }
        novoItemLi.classList.toggle(`categoria-${this.categoria}`)
        novoItemLi.innerHTML = this.nome
        if (block) {
            novoItemLi.classList.toggle('retido-no-filtro') 
        }
        containerEl.appendChild(novoItemLi)
    }
}

let tarefas = []

tarefas.push(new Tarefa('Arrumar mala', 'lazer', false))
tarefas.push(new Tarefa('Entregar TCC', 'estudos', true))

let novaTarefaCategoria = document.querySelectorAll('#nova-tarefa-categoria')[0]
let novaTarefaNome = document.querySelectorAll('#nova-tarefa-nome')[0]
let listaTarefas = document.querySelectorAll('#lista-tarefas')[0]
let botaoAdd = document.querySelectorAll('#incluir-nova-tarefa')[0]
let botaoFitro = document.querySelectorAll('#filtro-de-categoria')[0]

listaTarefas.innerHTML = ""

tarefas.forEach(tarefa => {
    tarefa.adicionaNaPagina(listaTarefas)
})

botaoAdd.addEventListener('click', e => {
    let novaTarefa = new Tarefa(novaTarefaNome.value, novaTarefaCategoria.value, false)
    if (novaTarefa.nome.trim() != '') {
        tarefas.push(novaTarefa)
        novaTarefa.adicionaNaPagina(listaTarefas)
        novaTarefaNome.value = ''
        novaTarefaNome.focus()
    }
});

botaoFitro.addEventListener('change', e => {
    console
    listaTarefas.innerHTML = ""
    if (e.target.value === '') {
        tarefas.forEach(tarefa => {
            tarefa.adicionaNaPagina(listaTarefas, false)
        })
    } else {
        tarefas.forEach(tarefa => {
            tarefa.adicionaNaPagina(listaTarefas, tarefa.categoria !== e.target.value)
        })
    }
});

novaTarefaNome.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        botaoAdd.click()
    }
  });