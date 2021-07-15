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

