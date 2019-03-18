export const state = () => ({
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
      url: '/user/adduser',
      text: 'Add User'
    }
  ]
})

export const getters = {
  items(state) {
    return state.items;
  }
}


