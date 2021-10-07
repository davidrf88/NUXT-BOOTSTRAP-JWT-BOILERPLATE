<template>
  <div class="row justify-content-center">
    <div class="col-sm-8 mt-4" style="max-width: 500px">
      
      <form v-if="!completed" v-on:submit.stop.prevent="Register()">
          <h1>Register</h1>
        <div class="form-group">
          <label for="email">Email address</label>
          <input
            v-model="$v.email.$model"
            :class="status($v.email)"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <div class="inputValidationErrors">
              <div class="form-text" v-if=" $v.email.$dirty && !$v.email.email">invalid email</div>
          </div>
          
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="$v.password.$model"
            :class="status($v.password)"
            type="password"
            class="form-control"
            id="password"
            placeholder="Password"
          />
          <div class="inputValidationErrors">
              <div class="form-text" v-if=" $v.password.$dirty && !$v.password.minLength">password must be at least {{$v.password.$params.minLength.min}} characters long</div>
          </div>
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input
            v-model="$v.confirmPassword.$model"
            :class="status($v.confirmPassword)"
            type="password"
            class="form-control"
            id="confirmPassword"
            placeholder="Confirm Password"
          />
          <div class="inputValidationErrors">
              <div class="form-text" v-if=" $v.confirmPassword.$dirty && !$v.confirmPassword.sameAsPassword">confirm password must be same as password</div>
          </div>
        </div>
        <div v-if="errorMessage"  class="form-text text-info">
            {{errorMessage}}
        </div>
        <div class="text-center">
          <button v-if="!inProgress" type="submit" class="btn btn-primary mt-4">Submit</button>
          <button v-if="inProgress" type="submit" class="btn btn-primary disabled mt-4">processing...</button>
        </div>

      </form>
      <div v-if="completed" class="text-center" > 
          <h3 class="text-success">Registration completed! </h3>
          <NuxtLink class="nav-item btn btn-primary mt-4" to="/login">Access</NuxtLink>
          </div>
    </div>


   
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      email: "davidrf88@gmail.com",
      password: "pass1234",
      confirmPassword: "pass1234",
      errorMessage:null,
      inProgress: false,
      completed : false
    };
  },

  validations: {
    email: {
      required,
      email,
      minLength: minLength(3),
    },
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

    async Register() {
         this.errorMessage = null;
         
         this.inProgress = true;
       
        try {
            if(this.$v.$invalid){ 
            this.$v.$touch()
            this.errorMessage = "invalid form";
            return
        }

              await this.$store
          .dispatch("auth/register", {
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



</style>