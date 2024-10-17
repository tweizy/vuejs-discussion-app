<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">User Profile</h2>
    <b-card class="p-4 shadow">
      <b-list-group>
        <b-list-group-item>
          <b-button @click="editProfile" class="w-100">
            Edit Profile
          </b-button>
        </b-list-group-item>
        <b-list-group-item>
          <b-button @click="viewMyDiscussions" class="w-100">
            My Discussions
          </b-button>
        </b-list-group-item>
      </b-list-group>
    </b-card>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    const editProfile = () => {
      router.push('/profile/edit'); // Navigate to the edit profile route
    };

    const viewMyDiscussions = () => {
      router.push('/my-discussions'); // Navigate to the user's discussions route
    };

    return {
      editProfile,
      viewMyDiscussions,
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
  background-color: #f9f9f9;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Subtle shadow */
}

.b-list-group-item {
  border: none; /* Remove borders */
}
.w-100 {
  color:white;
  background-color: #ff5e62;
  border-color: white;
  font-size: larger;
}
</style>
