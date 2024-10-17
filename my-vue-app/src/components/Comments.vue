<template>
    <div>
      <h4>Comments</h4>
      <form @submit.prevent="addComment">
        <b-form-group label="Add a Comment" label-for="newComment" label-class="font-weight-bold">
          <b-form-textarea
            id="newComment"
            v-model="newComment"
            placeholder="Write your comment here"
            rows="3"
            required
          ></b-form-textarea>
        </b-form-group>
        <b-button  type="submit" class="rounded-pill">Submit Comment</b-button>
      </form>
  
      <ul class="list-group mt-3">
        <li v-for="comment in comments" :key="comment.id" class="list-group-item">
          <p>{{ comment.content }}</p>
          <p class="text-muted">Posted by: <strong>{{ comment.author }}</strong></p>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
  import { ref } from 'vue';
  import { getAuth } from 'firebase/auth';
  
  const db = getFirestore();
  
  export default {
    props: {
      discussionId: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      const newComment = ref('');
      const comments = ref([]);
      const auth = getAuth(); // Get the authentication instance
  
      // Function to fetch comments
      const fetchComments = () => {
        const commentsRef = collection(db, 'discussions', props.discussionId, 'comments');
        const q = query(commentsRef, orderBy('createdAt'));
        onSnapshot(q, (querySnapshot) => {
          comments.value = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
        });
      };
  
      // Function to add a new comment
      const addComment = async () => {
        const user = auth.currentUser; // Get the current user
        if (user) {
          try {
            await addDoc(collection(db, 'discussions', props.discussionId, 'comments'), {
              content: newComment.value,
              author: user.email,
              createdAt: new Date(),
            });
            newComment.value = ''; // Clear the input
          } catch (error) {
            console.error('Error adding comment:', error);
          }
        } else {
          alert('You must be logged in to comment.');
        }
      };
  
      // Fetch comments on component mount
      fetchComments();
  
      return {
        newComment,
        comments,
        addComment,
      };
    },
  };
  </script>
  
  <style scoped>
  .list-group-item {
    border: 1px solid #ced4da; /* Border color */
    border-radius: 10px; /* Rounded corners */
    margin-bottom: 10px; /* Space between comments */
  }
  .rounded-pill {
    background-color:#ff5e62;
    color: white;
    font-weight: bold;
    border-color: white;
  }
  
  </style>
  