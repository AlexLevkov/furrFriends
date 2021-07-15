import { storageService } from './async-storage.service.js'

export const petService = {
    query,
    remove,
    getById,
    save,
    getEmptyPet
}

function query() {

    // const pets = storageService.get(`pet`).then(console.log)
    // console.log('pets in storage:', pets);
    return storageService.get(`pet`)
}

function remove(id) {
    return storageService.delete(`pet/${id}`).then(res => res.data)
}

function getById(id) {
    return storageService.get(`pet/${id}`)
}

function save(pet) {
    const petToSave = JSON.parse(JSON.stringify(pet))
    if (petToSave._id) {
        return storageService.put(`pet/${pet._id}`, pet)
    } else {
        return storageService.post(`pet/${pet._id}`, pet)
    }
}

// improve FIX
function getEmptyPet() {
    return {
        _id: '',
        nickname: '',
        createdAt: Date.now(),
        type: ""
    }
}



