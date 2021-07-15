import { petService } from '../service/pet.service.js'

export const petStore = {
  strict: true,
  state: {
    pets: [],
    filterBy: {
      text: ''
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
      console.log('payload.newFilter', payload.newFilter);
      state.filterBy = payload.newFilter
      console.log('state.filterBy.text', state.filterBy.text);

    }

  },
  actions: {
    loadPets(context) {
      return petService.query()
        .then(pets => {
          console.log('pets store', pets);
          context.commit({ type: 'setPets', pets })
          return pets;
        })
        .catch(err => {
          console.log('Cannot load pets', err);
          throw err;
        })
    },
    removePet({ commit }, payload) {
      console.log('commit', commit);
      console.log('payload', payload);
      return petService.remove(payload.petId)
        .then(() => {
          commit(payload)
        })
    },
    savePet({ commit }, payload) {
      console.log('payload', payload);
      return petService.save(payload.pet)
        .then((savedPet) => {
          commit({ type: 'savePet', pet: savedPet })
          console.log('savedPet', savedPet);
          return savedPet
        })
    },

  },

  getters: {
    petsToShow(state, payload) {
      // const searchStr = state.filterBy.text
      // return state.pets.filter((pet) => pet.nickname.toLowerCase().includes(searchStr))
      console.log('getters');
      console.log('state.pets', state.pets);
      return state.pets
    },
    filterBy(state) {
      return state.fitlerBy


    }
  },
  modules: {
  }
}


// todosToshow(state) {
//   const searchStr = state.filterBy.text.toLowerCase()
//   const searchType = state.filterBy.type
//   return state.todos.filter(todo => {
//     return todo.name.toLowerCase().includes(searchStr) && searchType === '' ? true : todo.isClicked === !searchType
//   })
// },