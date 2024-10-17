<template>
    <div class="container mt-5">
      <h2 class="text-center mb-4">Edit Profile</h2>
      <b-card class="p-4 shadow">
        <form @submit.prevent="updateProfile">
          <b-form-group label="Email" label-for="email" label-class="font-weight-bold">
            <b-form-input
              id="email"
              v-model="email"
              type="email"
              placeholder="Enter your email"
              required
              class="rounded-pill"
            ></b-form-input>
          </b-form-group>
  
          <b-form-group label="Password" label-for="password" label-class="font-weight-bold">
            <b-form-input
              id="password"
              v-model="password"
              type="password"
              placeholder="Enter a new password"
              required
              class="rounded-pill"
            ></b-form-input>
          </b-form-group>
  
          <b-button variant="primary" type="submit" class="w-100 mt-3 rounded-pill">
            Update Profile
          </b-button>
        </form>
        <router-link to="/profile" class="btn btn-secondary w-100 mt-2 rounded-pill">Cancel</router-link>
      </b-card>
    </div>
  </template>
  
  <script>
  import { getAuth, updateEmail, updatePassword } from 'firebase/auth';
  import { ref } from 'vue';
  
  export default {
    setup() {
      const email = ref('');
      const password = ref('');
      const auth = getAuth();
  
      // Fetch current user details
      const user = auth.currentUser;
      if (user) {
        email.value = user.email; // Pre-fill the email with the user's email
      }
  
      const updateProfile = async () => {
        try {
          // Update email
          if (email.value !== user.email) {
            await updateEmail(user, email.value);
          }
  
          // Update password if provided
          if (password.value) {
            await updatePassword(user, password.value);
          }
  
        } catch (error) {
          console.error('Error updating profile:', error);
          alert('Failed to update profile');
        }
      };
  
      return {
        email,
        password,
        updateProfile,
      };
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px; /* Center the container */
    margin: auto; /* Center the content */
  }
  
  h2 {
    color: #ff5e62; /* Title color */
    font-weight: bold; /* Bold title */
    font-size: xx-large; /* Increase title size */
  }
  
  .b-card {
    border-radius: 15px; /* Rounded corners for the card */
    background-color: #f9f9f9; /* Light background for the card */
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  }
  
  .b-form-input {
    border-radius: 20px; /* Rounded corners for inputs */
    border: 1px solid #ced4da; /* Light border color */
  }
  
  .b-button {
    background-color: #007bff; /* Bootstrap primary color */
    color: white; /* Text color */
    font-weight: bold; /* Bold text */
  }
  
  .b-button:hover {
    background-color: #0056b3; /* Darker blue on hover */
  }
  
  .router-link {
    text-decoration: none; /* Remove underline */
    margin-top: 10px; /* Space above cancel button */
  }
  </style>
  