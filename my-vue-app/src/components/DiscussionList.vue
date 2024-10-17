<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Discussions</h2>

    <!-- Search Bar -->
    <b-form-group label="Search" class="mb-4">
      <b-form-input
        v-model="searchTerm"
        placeholder="Search discussions by title or content"
        class="rounded-pill"
      ></b-form-input>
    </b-form-group>

    <!-- Topic Filter -->
    <b-form-group label="Filter by Topic" class="mb-4">
      <b-form-select
        v-model="selectedTopic"
        :options="topicOptions"
        class="rounded-pill"
        placeholder="Select a topic"
      ></b-form-select>
    </b-form-group>

    <div class="list-group">
      <div v-for="discussion in filteredDiscussions" :key="discussion.id" class="list-group-item">
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

        <!-- Edit and Delete buttons -->
        <div class="d-flex justify-content-between">
          <router-link
            :to="{ name: 'editDiscussion', params: { id: discussion.id } }"
            class="btn btn-warning btn-sm"
          >
            Edit
          </router-link>
          <b-button
            v-if="currentUserRole === 'moderator'"
            @click="deleteDiscussion(discussion.id)"
            variant="danger"
            class="btn-sm"
          >
            Delete
          </b-button>
        </div>
      </div>
    </div>

    <p v-if="filteredDiscussions.length === 0" class="text-center">No discussions available.</p>
  </div>
</template>

<script>
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { auth } from '../firebaseConfig';

const db = getFirestore();

export default {
  data() {
    return {
      discussions: [],
      searchTerm: '', // Search term for filtering discussions
      selectedTopic: null, // Selected topic for filtering
      currentUserRole: '', // Store current user role
      topicOptions: [
        { value: null, text: 'All Topics' }, // Option for all topics
        { value: 'Sports', text: 'Sports' },
        { value: 'Gaming', text: 'Gaming' },
        { value: 'Food', text: 'Food' },
        { value: 'Education', text: 'Education' },
        { value: 'Politics', text: 'Politics' },
        { value: 'Religion', text: 'Religion' },
        { value: 'History', text: 'History' },
      ],
    };
  },
  async mounted() {
    try {
      const querySnapshot = await getDocs(collection(db, 'discussions'));
      this.discussions = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Fetch current user's role from Firestore
      const userSnapshot = await getDocs(collection(db, 'users'));
      const currentUser = auth.currentUser;
      const user = userSnapshot.docs.find(doc => doc.data().email === currentUser.email);
      this.currentUserRole = user ? user.data().role : 'user'; // Default role is 'user'
    } catch (error) {
      console.error('Error fetching discussions or user role:', error);
      alert('Failed to load discussions');
    }
  },
  computed: {
    filteredDiscussions() {
      // Filter discussions based on the search term and selected topic
      return this.discussions.filter(discussion => {
        const matchesSearchTerm = discussion.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                                   discussion.content.toLowerCase().includes(this.searchTerm.toLowerCase());
        const matchesTopic = this.selectedTopic ? discussion.category === this.selectedTopic : true;

        return matchesSearchTerm && matchesTopic;
      });
    },
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
    async deleteDiscussion(discussionId) {
      try {
        await deleteDoc(doc(db, 'discussions', discussionId));
        this.discussions = this.discussions.filter(d => d.id !== discussionId);
      } catch (error) {
        console.error('Error deleting discussion:', error);
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
  font-size: xx-large;
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

.button-group {
  margin-top: 10px; /* Space above button group */
}

.button-group .btn {
  margin-right: 5px; /* Space between buttons */
}
.mb-4 {
  color:#ff5e62;
  font-weight: bold;
}

</style>
