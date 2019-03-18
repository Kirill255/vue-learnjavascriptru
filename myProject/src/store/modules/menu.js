export default {
  namespaced: true,
  state: {
    items: [
      {
        url: '/',
        text: 'Home'
      },
      {
        url: '/users',
        text: 'Users'
      },
      {
        url: '/adduser',
        text: 'Add User'
      }
    ]
  },
  getters: {
    items(state) {
      return state.items;
    }
  }
};
