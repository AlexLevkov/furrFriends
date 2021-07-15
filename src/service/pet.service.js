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
        return storageService.put('pet', petToSave)
    } else {
        return storageService.post('pet', petToSave)
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

_craeteTestData()


function _craeteTestData() {
    const pets = [
        {
            name: 'muki',
            _id: '101',
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin elementum ligula in facilisis hendrerit. Quisque iaculis pellentesque congue. Integer sagittis commodo eros, quis mollis nisi rhoncus sed. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur enim velit, laoreet vitae egestas in, pretium eget sapien. Donec quis elit vitae lacus rhoncus vulputate. Maecenas at nisl eu mi dapibus convallis. Sed non magna ac lorem ultricies vulputate. Pellentesque nibh turpis, pharetra eu consequat tempor, sodales semper nisl. Praesent et enim in nunc sollicitudin dapibus.",
            owner: {
                _id: 'mq9YO',
                fullname: 'Alex'
            }
        },
        {
            name: 'tuki',
            _id: '102',
            owner: {
                _id: '2f323',
                fullname: 'Sasha'
            }
        },
        {
            name: 'shuki',
            _id: '103',
            owner: {
                _id: 'mq9YO',
                fullname: 'Alex'
            }
        },
        {
            name: 'shusi',
            _id: '104',
            owner: {
                _id: 'e4k9i',
                fullname: 'puki'
            }
        },
        {
            name: 'mikey',
            _id: '105',
            owner: {
                _id: 'e4k9i',
                fullname: 'puki'
            }
        },
        {
            name: 'momy',
            _id: '106',
            owner: {
                _id: 'zk9NY',
                fullname: 'muki'
            }
        },
        {
            name: 'popy',
            _id: '107',
            owner: {
                _id: 'zk9NY',
                fullname: 'muki'
            }
        },
        {
            name: 'vovik',
            _id: '108',
            owner: {
                _id: 'zk9NY',
                fullname: 'muki'
            }
        },
    ]
    localStorage.setItem('pet', JSON.stringify(pets));
}



