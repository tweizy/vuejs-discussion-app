<template>
    <div class="container mt-5">
      <div v-if="discussion">
        <div class="discussion-card shadow-lg p-4 mb-5 bg-white rounded">
          <h2 class="discussion-title">{{ discussion.title }}</h2>
          <p class="discussion-content">{{ discussion.content }}</p>
          <p class="discussion-meta text-muted">
            Posted by: <strong>{{ discussion.author }}</strong> | {{ formatDate(discussion.createdAt.toDate()) }}
          </p>
  
          <!-- Comments Section -->
          <hr class="my-4" />
          <Comments :discussionId="discussion.id" />
  
          <!-- Back Button -->
          <router-link to="/discussions" class="btn btn-primary w-100 mt-3 rounded-pill">
            Back to Discussions
          </router-link>
        </div>
      </div>
      <div v-else>
        <p class="text-center">Loading discussion details...</p>
      </div>
    </div>
  </template>
  
  <script>
  import { getFirestore, doc, getDoc } from 'firebase/firestore';
  import Comments from './Comments.vue';
  
  const db = getFirestore();
  
  export default {
    data() {
      return {
        discussion: null,
      };
    },
    async mounted() {
      const discussionId = this.$route.params.id;
      const docRef = doc(db, 'discussions', discussionId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.discussion = { id: docSnap.id, ...docSnap.data() };
      } else {
        console.log('No such document!');
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
    components: {
      Comments,
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .discussion-card {
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  
  .discussion-title {
    color: #ff5e62;
    font-weight: bold;
    font-size: 2rem;
    margin-bottom: 15px;
  }
  
  .discussion-content {
    font-size: 1.2rem;
    color: #333333;
    line-height: 1.8;
    margin-bottom: 15px;
  }
  
  .discussion-meta {
    font-size: 0.9rem;
    color: #6c757d;
  }
  
  .btn-primary {
    background-color: #ff5e62;
    border: none;
    font-weight: bold;
    transition: background-color 0.2s;
  }
  
  .btn-primary:hover {
    background-color: #ff5e62;
  }
  
  .text-center {
    text-align: center;
    color: #555555;
    margin-top: 20px;
  }
  
  hr {
    border-color: #e0e0e0;
  }
  </style>
  