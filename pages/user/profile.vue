<template>
<div>
<breadcrumb :items="breadcrumbItems" />
<div class="container-fluid"> 

  <div class="row">
    <div class="col-sm-8 mt-4" style="max-width: 500px">
      
      <form  v-on:submit.stop.prevent="ChangePassword()">
          <h1>{{user.email}}</h1>
        
         <h4 class="mt-5">Change password</h4>
        <div class="Update-section">
         
        <div class="form-group">
          <label for="password">new password</label>
          <input
            v-model="$v.password.$model"
            :class="status($v.password)"
            type="password"
            class="form-control"
            id="password"
            placeholder="new password"
          />
          <div class="inputValidationErrors">
              <div class="form-text" v-if=" $v.password.$dirty && !$v.password.minLength">password must be at least {{$v.password.$params.minLength.min}} characters long</div>
          </div>
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm new Password</label>
          <input
            v-model="$v.confirmPassword.$model"
            :class="status($v.confirmPassword)"
            type="password"
            class="form-control"
            id="confirmPassword"
            placeholder="Confirm new password"
          />
          <div class="inputValidationErrors">
              <div class="form-text" v-if=" $v.confirmPassword.$dirty && !$v.confirmPassword.sameAsPassword">confirm password must be same as password</div>
          </div>
        </div>
        <div v-if="errorMessage"  class="form-text text-info">
            {{errorMessage}}
        </div>
         <div v-if="completed"  class=" text-center  form-text text-info" > 
          <span>password updated!</span>
          </div>
        <div class="text-center">
          <button v-if="!inProgress" type="submit" class="btn btn-primary mt-4">update password</button>
          <button v-if="inProgress" type="submit" class="btn btn-primary disabled mt-4">processing...</button>
        </div>
</div>
      </form>
     
    </div>


   
  </div>
  </div>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
export default {
  data() {
    return {
       breadcrumbItems: [
        { text: "home", to: "/" },
        { text: "profile", active: true },
      ],
      email: "davidrf88@gmail.com",
      password: "pass1234",
      confirmPassword: "pass1234",
      errorMessage:null,
      inProgress: false,
      completed : false,

    };
  },
 computed:{
      user: function(){ return this.$store.state.auth.user}
},

  validations: {
    password: {
      required,
      minLength: minLength(5),
    },
    confirmPassword: {
      required,
      sameAsPassword: sameAs("password"),
    },
  },

  methods: {
    status(validation) {
      //if (validation.$model == "") return "form-control";
      return {
        error: validation.$error,
        dirty: validation.$dirty,
        "form-control": true,
      };
    },

    async ChangePassword() {
         this.errorMessage = null;
         
         this.inProgress = true;
       
        try {
            if(this.$v.$invalid){ 
            this.$v.$touch()
            this.errorMessage = "invalid form";
            return
        }

              await this.$store
          .dispatch("auth/changePassword", {
            email: this.email,
            password: this.password,
          }).then((response) => {
                    
                if(!response.success)
                {
                    this.errorMessage = response.message;
                }
                else
                {
                    this.completed = true
                    this.password = '';
                    this.confirmPassword = ''
                    this.$v.$reset()
                }


          } )

        }
        catch(err)
        {
            this.errorMessage = 'Service Unavailable -' + err.message;
        }
        finally{
            
            this.inProgress = false;
           
        }


        
         
      


    },
  },
};
</script>

<style scoped>
.error {
    border-color: red;
    background: #FDD;
  }
  
  .error:focus {
    outline-color: #F99;
  }
  .inputValidationErrors
  {
      color: #17a2b8;
  }

.Update-section
{
  border-top: 1px solid #fff;
  padding-top:.5rem;
  
}


</style>