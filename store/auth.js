import jwtDecode from 'jwt-decode'
export const state = () => ({
  user: null,
  test:'dsfdsf',
})

export const getters = {
  IsAuthenticated: state => {
    try{
      return (state.user != null);
    }catch{
      return false;
    }
    
  },
  IsAdmin: state => {
    try{
      return (state.user.role == "admin")
    }catch{
      return false;
    }

    
  },
  getUser: state => {
    return state.user;
  },
}

export const mutations = {
  setUser(state, { jwt }) {
    var decodedtkn = jwtDecode(jwt);
    state.user = decodedtkn;
    state.user.jwt = jwt;
  },
  logout(state)
  {
    state.user = null;
  }
}



export const actions = {

  async register(context, { email, password }) {

    try {
      const body = JSON.stringify({ email: email, password: password })
      //Send request
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body
        //
      };
      const response = await fetch(process.env.APIEndpoint + 'auth/register', requestOptions);

      return response.text().then(text => {
        return text && JSON.parse(text);
      });

    }
    catch (error) {

      return { success: false, message: 'Service unavailable - ' + error.message };
    }


  },

  async changePassword(context, { password }) {
    
    try {
      let user = context.getters.getUser;

      let token = 'bearer '+ user.jwt;
      const body = JSON.stringify({ password: password })
      //Send request
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','authorization': token},
        body: body
        //
      };
      const response = await fetch(process.env.APIEndpoint + 'auth/changePassword', requestOptions);

      return response.text().then(text => {
        return text && JSON.parse(text);
      });
    }
    catch (error) {

      return { success: false, message: 'Service unavailable - ' + error.message };
    }


  },

  async login(context, { email, password }) {

    try {
      const body = JSON.stringify({ email: email, password: password })
      //Send request
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body
        //
      };
      const response = await fetch(process.env.APIEndpoint + 'auth/login', requestOptions);
       var resp = await response.text().then(text => {
        return text && JSON.parse(text);
      }); 
    
      if(!resp.success)
      {
        return { success: false, message:  resp.message };
      }

      context.commit("setUser", { jwt: resp.jwt });

      return resp

    }
    catch (error) {

      return { success: false, message: 'Service unavailable - ' + error.message };
    }


  },
  
  async logout(context)
  {
     context.commit("logout");
  }
  

}