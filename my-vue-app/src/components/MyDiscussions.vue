<template>
    <div class="container mt-5">
      <h2 class="text-center mb-4">My Discussions</h2>
      <div class="list-group">
        <div v-for="discussion in myDiscussions" :key="discussion.id" class="list-group-item">
          <h3>
            <router-link
              :to="{ name: 'discussionDetail', params: { id: discussion.id } }"
              class="discussion-title"
            >
              {{ discussion.title }}
            </router-link>
          </h3>
          <p class="discussion-content">{{ discussion.content }}</p>
          <p class="discussion-author text-muted">
            Posted by: <strong>{{ discussion.author }}</strong> | 
            <em>{{ formatDate(discussion.createdAt.toDate()) }}</em>
          </p>
        </div>
      </div>
      <p v-if="myDiscussions.length === 0" class="text-center">You have not created any discussions.</p>
    </div>
  </template>
  
  <script>
  import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
  import { getAuth } from 'firebase/auth';
  
  const db = getFirestore();
  
  export default {
    data() {
      return {
        myDiscussions: [],
      };
    },
    async mounted() {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const userEmail = user.email;
        const discussionsRef = collection(db, 'discussions');
        const q = query(discussionsRef, where('author', '==', userEmail));
        const querySnapshot = await getDocs(q);
        this.myDiscussions = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
      }
    },
    methods: {
      formatDate(date) {
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
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
  
  .list-group {
    margin-bottom: 20px; /* Space below the list */
  }
  
  .list-group-item {
    background-color: #f8f9fa; /* Light background for list items */
    border: 1px solid #ced4da; /* Border color */
    border-radius: 10px; /* Rounded corners */
    margin-bottom: 10px; /* Space between items */
    padding: 15px; /* Padding for list items */
    transition: background-color 0.3s; /* Transition effect */
  }
  
  .list-group-item:hover {
    background-color: #e2e6ea; /* Change background on hover */
  }
  
  .discussion-title {
    color: #ff5e62; /* Link color */
    text-decoration: none; /* Remove underline */
  }
  
  .discussion-title:hover {
    text-decoration: underline; /* Underline on hover */
  }
  
  .discussion-content {
    color: #495057; /* Medium dark color for content */
  }
  
  .discussion-author {
    font-size: 0.9rem; /* Smaller font size for author */
    color: #6c757d; /* Muted color */
  }
  </style>
  