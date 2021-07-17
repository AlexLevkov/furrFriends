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
            type: "dog",
            breed: "Siberian Husky",
            gender: "female",
            age: 1,
            size: "small",
            color: "white",
            isVaccinated: true,
            trainedLevel: "basic",
            isSafeWithChild: true,
            isPlayfull: true,


            bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero            asperiores quos cum nostrum fuga nulla delectus. Tempore delectus, adaccusantium expedita exercitationem repellendus. Nisi ad, obcaecati ipsipsum impedit asperiores!",
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



