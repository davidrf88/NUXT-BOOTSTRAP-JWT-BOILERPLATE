<template>
<div class="container-fluid">

  <div class="row justify-content-center">
    <div class="col-sm-8 mt-4" style="max-width: 500px">
      <h1>Access</h1>
      <form v-on:submit.stop.prevent="Access()">
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
            <div class="form-text" v-if="$v.email.$dirty && !$v.email.email">
              invalid email
            </div>
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
            <div
              class="form-text"
              v-if="$v.password.$dirty && !$v.password.minLength"
            >
              password must be at least
              {{ $v.password.$params.minLength.min }} characters long
            </div>
          </div>
        </div>
        <div v-if="errorMessage" class="form-text text-info">
          {{errorMessage}}
        </div>
        <div class="text-center">
          <button v-if="!inProgress" type="submit" class="btn btn-primary mt-4">Submit</button>
          <button v-if="inProgress" type="submit" class="btn btn-primary disabled mt-4">processing...</button>
        </div>
      </form>
    </div>
  </div>
  </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      email: "davidrf88@gmail.com",
      password: "password",
      errorMessage: null,
      inProgress: false,
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

    async Access() {
      this.inProgress = true;
      this.errorMessage = null;
      try {
        if (this.$v.$invalid) {
          this.$v.$touch();
          this.errorMessage = "invalid form";
          return;
        }

        await this.$store
          .dispatch("auth/login", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            if (response.success && this.$store.getters["auth/IsAuthenticated"]) {
              //redirect to user profile
              this.$router.push("/");
              
            } else {
              //display error
              this.errorMessage = response.message;
            }
          });


      } catch (err) {
        this.errorMessage = err.message;
      } finally {
        this.inProgress = false;
      }

        return;
      }

    },
  
};
</script>

<style scoped>
.error {
  border-color: red;
  background: #fdd;
}

.error:focus {
  outline-color: #f99;
}
.inputValidationErrors {
  color: #17a2b8;
}
</style>