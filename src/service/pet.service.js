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

function remove(petId) {
    return storageService.remove('pet', petId)
}

function getById(petId) {
    return storageService.get('pet', petId)
}


function save(pet) {
    if (pet._id) {
        return storageService.put('pet', pet)
    } else {
        return storageService.post('pet', pet)
    }
}

// improve FIX
function getEmptyPet() {
    return {
        name: '',
        type: 'dog',
        breed: '',
        gender: 'male',
        age: 1,
        size: "small",
        color: '',
        trainedLevel: "basic",
        isVaccinated: false,
        isSafeWithChild: false,
        isPlayfull: false,
        isCastrated: false,
        isBirthCertificate: false,
        bio: "lorem",
    }
}

_craeteTestData()

function _craeteTestData() {
    const pets = [
        {
            name: 'Lasi',
            _id: 'p101',
            type: "dog",
            breed: "Siberian Husky",
            imgUrl:'dog/dog-1.jpg',
            gender: "female",
            age: 1,
            size: "small",
            color: "white",
            trainedLevel: "basic",
            isVaccinated: true,
            isSafeWithChild: true,
            isPlayfull: true,
            isCastrated: true,
            isBirthCertificate: true,
            bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero            asperiores quos cum nostrum fuga nulla delectus. Tempore delectus, adaccusantium expedita exercitationem repellendus. Nisi ad, obcaecati ipsipsum impedit asperiores!",
            owner: {
                _id: 'QRR8p',
                fullname: 'Shelter1'
            }
        },
        {
            name: 'tuki',
            _id: 'p102',
            type: "parrot",
            imgUrl:'parrot/parrot1.jpg',
            age: 2,
            gender: "male",
            size: "small",
            color: "green",
            isVaccinated: true,
            trainedLevel: "basic",
            isSafeWithChild: true,
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin elementum ligula in facilisis hendrerit. Quisque iaculis pellentesque congue. Integer sagittis commodo eros, quis mollis nisi rhoncus sed. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur enim velit, laoreet vitae egestas in, pretium eget sapien. Donec quis elit vitae lacus rhoncus vulputate. Maecenas at nisl eu mi dapibus convallis. Sed non magna ac lorem ultricies vulputate. Pellentesque nibh turpis, pharetra eu consequat tempor, sodales semper nisl. Praesent et enim in nunc sollicitudin dapibus.",
            owner: {
                _id: 'QRR8p',
                fullname: 'Shelter1'
            }
        },
        {
            name: 'shuki',
            _id: 'p103',
            type: "dog",
            imgUrl:'dog/dog1.jpg',
            age: 7,
            gender: "male",
            size: "big",
            color: "black",
            isVaccinated: false,
            trainedLevel: "advanced",
            isSafeWithChild: false,
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin elementum ligula in facilisis hendrerit. Quisque iaculis pellentesque congue. Integer sagittis commodo eros, quis mollis nisi rhoncus sed. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur enim velit, laoreet vitae egestas in, pretium eget sapien. Donec quis elit vitae lacus rhoncus vulputate. Maecenas at nisl eu mi dapibus convallis. Sed non magna ac lorem ultricies vulputate. Pellentesque nibh turpis, pharetra eu consequat tempor, sodales semper nisl. Praesent et enim in nunc sollicitudin dapibus.",
            owner: {
                _id: 'QRR8p',
                fullname: 'Shelter1'
            }
        },
        {
            name: 'shusi',
            _id: 'p104',
            type: "parrot",
            imgUrl:'parrot/parrot2.jpg',
            age: 3,
            gender: "female",
            size: "big",
            color: "green",
            isVaccinated: true,
            trainedLevel: "none",
            isSafeWithChild: true,
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin elementum ligula in facilisis hendrerit. Quisque iaculis pellentesque congue. Integer sagittis commodo eros, quis mollis nisi rhoncus sed. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur enim velit, laoreet vitae egestas in, pretium eget sapien. Donec quis elit vitae lacus rhoncus vulputate. Maecenas at nisl eu mi dapibus convallis. Sed non magna ac lorem ultricies vulputate. Pellentesque nibh turpis, pharetra eu consequat tempor, sodales semper nisl. Praesent et enim in nunc sollicitudin dapibus.",
            owner: {
                _id: '2f323',
                fullname: 'Shelter2'
            }
        },
        {
            name: 'mikey',
            _id: 'p105',
            type: "dog",
            imgUrl:'dog/dog2.jpg',
            age: 4,
            gender: "male",
            size: "small",
            color: "white",
            isVaccinated: true,
            trainedLevel: "basic",
            isSafeWithChild: true,
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin elementum ligula in facilisis hendrerit. Quisque iaculis pellentesque congue. Integer sagittis commodo eros, quis mollis nisi rhoncus sed. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur enim velit, laoreet vitae egestas in, pretium eget sapien. Donec quis elit vitae lacus rhoncus vulputate. Maecenas at nisl eu mi dapibus convallis. Sed non magna ac lorem ultricies vulputate. Pellentesque nibh turpis, pharetra eu consequat tempor, sodales semper nisl. Praesent et enim in nunc sollicitudin dapibus.",
            owner: {
                _id: '2f323',
                fullname: 'Shelter2'
            }
        },
        {
            name: 'momy',
            _id: 'p106',
            type: "cat",
            imgUrl:'cat/cat1.jpg',
            age: 1,
            gender: "male",
            size: "small",
            color: "white",
            isVaccinated: true,
            trainedLevel: "basic",
            isSafeWithChild: true,
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin elementum ligula in facilisis hendrerit. Quisque iaculis pellentesque congue. Integer sagittis commodo eros, quis mollis nisi rhoncus sed. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur enim velit, laoreet vitae egestas in, pretium eget sapien. Donec quis elit vitae lacus rhoncus vulputate. Maecenas at nisl eu mi dapibus convallis. Sed non magna ac lorem ultricies vulputate. Pellentesque nibh turpis, pharetra eu consequat tempor, sodales semper nisl. Praesent et enim in nunc sollicitudin dapibus.",
            owner: {
                _id: '2f323',
                fullname: 'Shelter2'
            }
        },
        {
            name: 'popy',
            _id: 'p107',
            type: "cat",
            imgUrl:'cat/cat1.jpg',
            age: 1,
            gender: "male",
            size: "small",
            color: "white",
            isVaccinated: true,
            trainedLevel: "basic",
            isSafeWithChild: true,
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin elementum ligula in facilisis hendrerit. Quisque iaculis pellentesque congue. Integer sagittis commodo eros, quis mollis nisi rhoncus sed. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur enim velit, laoreet vitae egestas in, pretium eget sapien. Donec quis elit vitae lacus rhoncus vulputate. Maecenas at nisl eu mi dapibus convallis. Sed non magna ac lorem ultricies vulputate. Pellentesque nibh turpis, pharetra eu consequat tempor, sodales semper nisl. Praesent et enim in nunc sollicitudin dapibus.",
            owner: {
                _id: 'e4k9i',
                fullname: 'puki'
            }
        },
        {
            name: 'vovik',
            _id: 'p108',
            type: "fish",
            imgUrl:'fish/fish1.jpg',
            age: 1,
            gender: "male",
            size: "small",
            color: "orange",
            isVaccinated: false,
            trainedLevel: "none",
            isSafeWithChild: true,
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin elementum ligula in facilisis hendrerit. Quisque iaculis pellentesque congue. Integer sagittis commodo eros, quis mollis nisi rhoncus sed. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur enim velit, laoreet vitae egestas in, pretium eget sapien. Donec quis elit vitae lacus rhoncus vulputate. Maecenas at nisl eu mi dapibus convallis. Sed non magna ac lorem ultricies vulputate. Pellentesque nibh turpis, pharetra eu consequat tempor, sodales semper nisl. Praesent et enim in nunc sollicitudin dapibus.",
            owner: {
                _id: 'zk9NY',
                fullname: 'muki'
            }
        },
        {
            name: 'vovik2',
            _id: 'p109',
            type: "fish",
            imgUrl:'fish/fish2.jpg',
            age: 1,
            gender: "male",
            size: "small",
            color: "orange",
            isVaccinated: false,
            trainedLevel: "none",
            isSafeWithChild: true,
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin elementum ligula in facilisis hendrerit. Quisque iaculis pellentesque congue. Integer sagittis commodo eros, quis mollis nisi rhoncus sed. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur enim velit, laoreet vitae egestas in, pretium eget sapien. Donec quis elit vitae lacus rhoncus vulputate. Maecenas at nisl eu mi dapibus convallis. Sed non magna ac lorem ultricies vulputate. Pellentesque nibh turpis, pharetra eu consequat tempor, sodales semper nisl. Praesent et enim in nunc sollicitudin dapibus.",
            owner: {
                _id: 'QRR8p',
                fullname: 'Shelter1'
            }
        },
    ]
    localStorage.setItem('pet', JSON.stringify(pets));
}



