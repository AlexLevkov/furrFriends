import { petService } from '../service/pet.service.js'

export const petStore = {
  strict: true,
  state: {
    pets: [],
    filterBy: {
      ownerId: 'all',
    }
  },
  mutations: {
    setPets(state, { pets }) {
      state.pets = pets
    },
    removePet(state, { petId }) {
      const idx = state.pets.findIndex(p => p._id === petId)
      state.pets.splice(idx, 1)
    },
    savePet(state, { pet }) {
      const idx = state.pets.findIndex((p) => p._id === pet._id)
      if (idx === -1) {
        state.pets.unshift(pet)
      } else {
        state.pets.splice(idx, 1, pet)
      }
    },
    setFilterBy(state, payload) {
      state.filterBy = payload.filterCopy
    },

  },
  actions: {
    loadPets(context) {
      return petService.query()
        .then(pets => {
          context.commit({ type: 'setPets', pets })
          return pets;
        })
        .catch(err => {
          console.log('Cannot load pets', err);
          throw err;
        })
    },
    removePet({ commit }, payload) {
      return petService.remove(payload.petId)
        .then(() => {
          commit(payload)
        })
    },
    savePet({ commit }, payload) {
      return petService.save(payload.petToAdd)
        .then((savedPet) => {
          commit({ type: 'savePet', pet: savedPet })
          return savedPet
        })
    },

  },

  getters: {
    petsToShow({ pets, filterBy }) {

      // let petsToShow = (filterBy.ownerId === 'all') ? (pets) : (pets.filter(pet => {pet.owner._id === filterBy.ownerId}))

      let petsToShow = []
      if (filterBy.ownerId === 'all') {
        petsToShow = pets
      } else {
        petsToShow = pets.filter(pet => pet.owner._id === filterBy.ownerId)
      }      
      return petsToShow
    },

    pukiPets({ pets }) {
      return pets.filter(pet => pet.owner._id === 'e4k9i')
    },
    mukiPets({ pets }) {
      return pets.filter(pet => pet.owner._id === 'zk9NY')
    },
    otherPets({ pets }) {
      return pets.filter(pet => pet.owner._id !== 'zk9NY' && pet.owner._id !== 'e4k9i')
    },
    filterBy({ filterBy }) {
      return filterBy
    }

  },
  modules: {
  }
}


