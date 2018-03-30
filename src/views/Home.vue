<template>
    <div class="home">

        <LoginAuth0 :lock="lock"
            v-on:fetchUser="fetchUser"
            v-if="!authenticated" />

        <div v-else
            class="logout">
            <div class="logoutButton">
                <span class="logoutText"
                    @click="$emit('logout')">Logout</span>
            </div>
            <NewPostLink />
        </div>

        <div class="feed">
            <PostsList />
        </div>

    </div>
</template>


<script>
import PostsList from '@/components/PostsList.vue'
import NewPostLink from '@/components/NewPostLink.vue'
import LoginAuth0 from '@/components/LoginAuth0.vue'

export default {
    name: 'Home',
    props: {
        user: Object,
        lock: Object,
        fetchUser: Function,
        authenticated: Boolean
    },

    components: {
        LoginAuth0,
        PostsList,
        NewPostLink
    },

    methods: {
        login() {
            this.lock.show()
        }
    },

}
</script>


<style>
.logoutButton {
  width: 130px;
  height: 36px;
  cursor: pointer;
  background-color: red;
  color: white;
  font-size: 26px;
  padding-top: 5px;
  margin-bottom: 8px;
}

.logout {
  width: 130px;
}

.logoutText {
  vertical-align: center;
}
</style>