import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import ForgotPassword from './components/PasswordReset.vue';
import Dashboard from './components/Dashboard.vue';
import CreateDiscussion from './components/CreateDiscussion.vue'; 
import DiscussionList from './components/DiscussionList.vue'; 
import DiscussionDetail from './components/DiscussionDetail.vue';
import EditDiscussion from './components/EditDiscussion.vue'; 
import UserProfile from './components/UserProfile.vue';
import EditUserProfile from './components/EditUserProfile.vue'; 
import MyDiscussions from './components/MyDiscussions.vue';




const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/forgot-password', component: ForgotPassword },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/create-discussion', component: CreateDiscussion, meta: { requiresAuth: true } },
  { path: '/discussions', component: DiscussionList, meta: { requiresAuth: true } }, 
  { path: '/discussions/:id', name: 'discussionDetail', component: DiscussionDetail, meta: { requiresAuth: true } },
  { path: '/discussions/edit/:id', name: 'editDiscussion', component: EditDiscussion, meta: { requiresAuth: true } },
  { path: '/profile', name: 'userProfile', component: UserProfile, meta: { requiresAuth: true } },
  { path: '/profile/edit', name: 'editUserProfile', component: EditUserProfile, meta: { requiresAuth: true } },
  { path: '/my-discussions', name: 'myDiscussions', component: MyDiscussions, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
