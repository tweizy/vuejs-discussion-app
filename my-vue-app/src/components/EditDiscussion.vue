<template>
    <div class="container mt-5">
      <h2 class="text-center mb-4">Edit Discussion</h2>
      <b-card class="p-4 shadow">
        <form @submit.prevent="updateDiscussion">
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
  
          <b-button variant="primary" type="submit" class="w-100 mt-3 rounded-pill">
            Update Discussion
          </b-button>
        </form>
        <router-link to="/discussions" class="btn btn-secondary w-100 mt-2 rounded-pill">
          Cancel
        </router-link>
      </b-card>
    </div>
  </template>
  
  <script>
  import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
  import { useRouter } from 'vue-router';
  
  const db = getFirestore();
  
  export default {
    data() {
      return {
        title: '',
        content: '',
      };
    },
    async mounted() {
      const discussionId = this.$route.params.id;
      const docRef = doc(db, 'discussions', discussionId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const discussion = docSnap.data();
        this.title = discussion.title;
        this.content = discussion.content;
      } else {
        console.log('No such document!');
      }
    },
    methods: {
      async updateDiscussion() {
        const discussionId = this.$route.params.id;
        try {
          await updateDoc(doc(db, 'discussions', discussionId), {
            title: this.title,
            content: this.content,
          });
          this.$router.push('/discussions'); // Redirect back to discussions list
        } catch (error) {
          console.error('Error updating discussion:', error);
          alert('Failed to update discussion');
        }
      },
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
  
  .b-form-input, .b-form-textarea {
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
  