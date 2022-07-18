document.addEventListener('click', event => {
if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id
    remove(id).then(() => {
        event.target.closest('li').remove()
    })
}
})

async function remove(id) {
    await fetch(`/${id}`, {method: 'DELETE'})
}

document.addEventListener('click', event => {
    if (event.target.dataset.type === 'edit') {
        const id = event.target.dataset.id
        const updateNote = prompt('Введите новое название')
            if(updateNote){
                edit(id, updateNote).then(() => {
                    event.target.closest('li').querySelector('span').textContent = updateNote
                })
            }
        }
    }
)

async function edit(id, updateNote) {
    await fetch(`/${id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({updateNote, id})
    })
}