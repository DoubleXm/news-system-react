const initialState = {
  token: window.localStorage.getItem('token') || '',
  userInfo: JSON.parse(window.localStorage.getItem('userInfo')) || null
};
const loginReducer = function (state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case 'USER_LOGIN':
      const { username, password } = action.payload[0];
      newState.token = JSON.stringify(`${username}&${password}`);
      window.localStorage.setItem('token', newState.token);
      return newState;
    case 'USER_LOGOUT':
      newState.token = '';
      newState.userInfo = null;
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('userInfo');
      return newState;
    case 'SET_USER_INFO':
      newState.userInfo = action.payload;
      window.localStorage.setItem('userInfo', JSON.stringify(newState.userInfo));
      return newState;
    default:
      return state;
  }
};

export { loginReducer };
