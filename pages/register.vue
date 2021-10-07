<template>
  <div class="row justify-content-center">
    <div class="col-sm-8 mt-4" style="max-width: 500px">
      <h1>Register</h1>
      <form v-on:submit.stop.prevent="Register()">
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
            invalid form
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary mt-4">Submit</button>
        </div>

      </form>
    </div>


   
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      errorMessage:null,
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

    Register() {
         this.errorMessage = null;
        if(this.$v.$invalid){ 
            this.$v.$touch()
            this.errorMessage = "invalid form";
            return
        }

      console.log(this.email, this.password);
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