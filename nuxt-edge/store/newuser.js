/* Создал для страницы adduser.vue так как там есть проблемы с перезагрузкой страницы, но не помогло


export const state = () => ({
  // newUser: {
  //   id: null,
  //   isActive: false,
  //   balance: "",
  //   picture: "http://via.placeholder.com/128x128",
  //   birthday: "",
  //   accessLevel: "guest",
  //   firstName: "",
  //   lastName: "",
  //   company: "",
  //   email: "",
  //   phone: "",
  //   address: "",
  //   about: "",
  //   registered: new Date().toISOString().split("T")[0]
  // }
  newUser: {}
})

export const getters = {
  newUser(state) {
    return state.newUser;
  }
}

export const mutations = {
  getNewUser(state, payload) {
    state.newUser = payload;
  }
}
export const actions = {
  // async getNewUser(store, payload) {
  //   let data = await qwerty();
  //   // let data = getUser();
  //   setTimeout(() => {
  //     store.commit("getNewUser", data)
  //   }, 1000);
  //   // store.commit("getNewUser", data)
  // },
  async getNewUser({ commit }) {
    try {
      let data = await qwerty();
      return commit('getNewUser', data)
    } catch (e) {
      console.log(e)
    }
  },
  // async nuxtServerInit({ dispatch }) {
  //   await dispatch('getNewUser')
  // }
}

// function getUser() {
//   return ({
//     id: null,
//     isActive: false,
//     balance: "",
//     picture: "http://via.placeholder.com/128x128",
//     birthday: "",
//     accessLevel: "guest",
//     firstName: "",
//     lastName: "",
//     company: "",
//     email: "",
//     phone: "",
//     address: "",
//     about: "",
//     registered: new Date().toISOString().split("T")[0]
//   })
// }

function qwerty() {
  return Promise.resolve(ytrewq()).then(value => {
    console.log("value :", value);
    return value;
  });
}
function ytrewq() {
  return {
    id: null,
    isActive: false,
    balance: "",
    picture: "http://via.placeholder.com/128x128",
    birthday: "",
    accessLevel: "guest",
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    address: "",
    about: "",
    registered: new Date().toISOString().split("T")[0]
  };
}

*/
