import { storageService } from './async-storage.service.js'

export const userService = {
    login,
    getById,
    getUsers,
    remove,
    signup,
    update,
    getLoggedinUser,
    logout

}

function getUsers() {
    return storageService.query('user')
}

function getById(userId) {
    return storageService.get('user', userId)
}

function remove(userId) {
    return storageService.remove('user', userId)
}

async function update(user) {
    return storageService.put('user', user)
}

async function login(userCred) {
    const users = await storageService.query('user')
    const user = users.find(user => user.username === userCred.username)
    return _saveLocalUser(user)
}
async function logout() {
    sessionStorage.clear()
}

async function signup(userCred) {
    const user = await storageService.post('user', userCred)
    return _saveLocalUser(user)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem('loggedinUser') || 'null')
}

function _saveLocalUser(user) {
    sessionStorage.setItem('loggedinUser', JSON.stringify(user))
    return user
}

_craeteTestData()


function _craeteTestData() {
    const users = [
        {
            fullname: "Shelter1",
            username: "Shelter1",
            password: 123,
            isAdmin: false,
            _id: "QRR8p",
            shelter: {
                lat: 31.5,
                lng: 11
            }
        },
        {
            fullname: "Shelter2",
            username: "Shelter2",
            password: 123,
            isAdmin: false,
            _id: "2f323",
            shelter: {
                lat: 31.5,
                lng: 11
            }
        },
        {
            fullname: "puki",
            username: "puki",
            password: 123,
            isAdmin: false,
            _id: "e4k9i"
        },
        {
            fullname: "muki",
            username: "muki",
            password: 123,
            isAdmin: false,
            _id: "zk9NY"
        },
        {
            fullname: "Admin",
            username: "Admin",
            password: 'Admin',
            isAdmin: true,
            _id: "bjk12"
        },
    ]
    localStorage.setItem('user', JSON.stringify(users));
}




