import { storageService } from './async-storage.service.js'

export const orederService ={
    query,
    remove,
    getById,
    save,
}

function query(){
    return storageService.query('order')
}

function remove(orderId){
    return storageService.remove('oreder', orderId)
}

function getById(orderId){
    return storageService.get('order', orderId)
}

function save(order){
    if(order._id){
        return storageService.put('order', order)
    } else {
        return storageService.post('order', order)
    }
}

