export const state = () => ({
    user: null,
  })


  
  export const actions = {

    async register(context, { email, password }) {
        console.log('Register', process.env.APIEndpoint);
      try {
        const body = JSON.stringify({ email: email, password: password })
        //Send request
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: body
//
        };
        const response = await fetch( process.env.APIEndpoint+'auth/register', requestOptions);
        
        return response.text().then(text => {
            return text && JSON.parse(text);
            });

      }
      catch (error) {
        console.log('error reached');
        return {success: false, message: 'Service unavailable - ' + error.message};
      }
  
  
  
  
  
  
    },
}