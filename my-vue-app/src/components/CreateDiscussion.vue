<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Create a New Discussion</h2>
    <b-card class="p-4 shadow">
      <form @submit.prevent="createDiscussion">
        <b-form-group label="Title" label-for="title" label-class="font-weight-bold">
          <b-form-input
            id="title"
            v-model="title"
            type="text"
            placeholder="Enter the discussion title"
            required
            class="rounded-pill"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Category" label-for="category" label-class="font-weight-bold">
          <b-form-select
            id="category"
            v-model="category"
            :options="categories"
            required
            class="rounded-pill"
          ></b-form-select>
        </b-form-group>

        <b-form-group label="Content" label-for="content" label-class="font-weight-bold">
          <b-form-textarea
            id="content"
            v-model="content"
            placeholder="Write your discussion content here"
            rows="6"
            required
            class="rounded"
          ></b-form-textarea>
        </b-form-group>

        <b-button type="submit" class="w-100 mt-3 rounded-pill">
          Create Discussion
        </b-button>
      </form>
    </b-card>
  </div>
</template>

<script>
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { auth } from '../firebaseConfig';

const db = getFirestore();

export default {
  data() {
    return {
      title: '',
      category: '',
      content: '',
      categories: ['History', 'Sports', 'Education',"Gaming","Food","Politics","Religion"], // Example categories
    };
  },
  methods: {
    async createDiscussion() {
      const user = auth.currentUser;
      if (user) {
        try {
          await addDoc(collection(db, 'discussions'), {
            title: this.title,
            category: this.category, // Include category in the discussion
            content: this.content,
            author: user.email,
            createdAt: new Date(),
          });
          this.$router.push('/discussions');
        } catch (error) {
          console.error('Error creating discussion:', error);
          alert('Failed to create discussion');
        }
      } else {
        alert('You must be logged in to create a discussion');
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}

h2 {
  color: #ff5e62;
  font-weight: bold;
}

.b-card {
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9; /* Light background */
}

.b-form-input, .b-form-textarea {
  border-radius: 20px;
  border: 1px solid #ced4da; /* Light border */
}

.b-button {
  background-color: #ff5e62; /* Bootstrap primary color */
  color: white;
  font-weight: bold;
}

.b-form-input.is-invalid, .b-form-textarea.is-invalid {
  border-color: #dc3545; /* Red border for invalid inputs */
}

.b-form-input:focus, .b-form-textarea:focus {
  border-color: #80bdff; /* Blue border on focus */
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); /* Focus effect */
}
.w-100 {
  background-color: #ff5e62;
  color:white;
  font-weight: bold;
  border-color: white;

}
</style>
