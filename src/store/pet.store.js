import { petService } from '../service/pet.service.js'

export const petStore = {
  strict: true,
  state: {
    pets: [],
    filterBy: {
      ownerId: 'all',
      type:'all'
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
    loadPets({ commit }) {
      return petService.query()
        .then(pets => {
          commit({ type: 'setPets', pets })
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
      if (filterBy.type !== 'all') {
        petsToShow = petsToShow.filter(pet => pet.type === filterBy.type)
      }
      return petsToShow
    },

    shelter1Pets({ pets }) {
      return pets.filter(pet => pet.owner._id === 'QRR8p')
    },
    shelter2Pets({ pets }) {
      return pets.filter(pet => pet.owner._id === '2f323')
    },
    otherPets({ pets }) {
      return pets.filter(pet => pet.owner._id !== 'QRR8p' && pet.owner._id !== '2f323')
    },
    filterBy({ filterBy }) {
      return filterBy
    }

  },
  modules: {
  }
}


