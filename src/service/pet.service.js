import { storageService } from './async-storage.service.js'

export const petService = {
    query,
    remove,
    getById,
    save,
    getEmptyPet
}

function query() {
    return storageService.query(`pet`)
}

function remove(id) {
    return storageService.delete(`pet/${id}`).then(res => res.data)
}

function getById(petId) {
    console.log('petId', petId);
    // return storageService.get(`pet/${id}`)
    return storageService.get('pet', petId)
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

// _craeteTestData()

function _craeteTestData() {
    const pets = [
        {
            name: 'muki',
            _id: '101'
        },
        {
            name: 'shuki',
            _id: '102'
        },
    ]
    localStorage.setItem('pet', JSON.stringify(pets));
}
