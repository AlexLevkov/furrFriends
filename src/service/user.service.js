import { storageService } from './async-storage.service.js'

export const userService = {
   login,
   getById,
   getUsers,
   remove,
   signup,
   update,
   getLoggedinUser,
   logout,
   addReview,

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

async function addReview(user, review) {
   if (!user.reviews) user.reviews = []
   user.reviews.unshift(review)
   await storageService.put('user', user)
   return user
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
         reviews: [
            {
               byUser: 'muki',
               text: 'Shelter 1 is a licensed no-kill animal rescue and welfare organization dedicated to the rescue and adoption of stray dogs across the world, with a unique focus on Mexico. Border Tails Rescue also works with rural shelters across the country'
            },
            {
               byUser: 'puki',
               text: ' have been a volunteer at Border Tails, since shortly after they open their doors. I was so inspired by a new young rescue that not only took care of the animals in the states, but was willing to do international rescues also. Border Tails Does an amazing job of finding so many dogs their forever loving homes. Thank you Border Tails, for every life you save And for giving me the opportunity to be a part of it. If you\'re looking for a forever best friend, I highly recommend you stop in and see if that best friend is it looking for you also.'
            },
            {
               byUser: 'Shuki',
               text: 'Truly one of the best organizations to be in the field! Border Tails is amazing! From adoptions, educating, and helping the community they do it all!'
            }
         ],
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




