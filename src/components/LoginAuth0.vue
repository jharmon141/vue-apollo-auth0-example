<template>
    <div id="login">

        <span @click="showLogin()"
            class="loginText">Log in with Auth0</span>

    </div>
</template>


<script>
export default {
    name: 'LoginAuth0',
    props: {
        lock: Object
    },

    methods: {
        showLogin() {
            this.lock.show()
        },
    },

    mounted() {
        this.lock.on('authenticated', async (authResult) => {
            await localStorage.setItem('auth0IdToken', authResult.idToken)
            await this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
                if (error) {
                    console.log(error)
                    return
                }
                localStorage.setItem('profile', JSON.stringify(profile))
            })
            this.$emit('fetchUser')
        });
        this.lock.on('authorization_error', function (error) {
            this.lock.show({
                flashMessage: {
                    type: 'error',
                    text: error.error_description
                }
            })
            console.log(error)
        })
    },
}
</script>


<style>
#login {
  width: 130px;
  height: 46px;
  cursor: pointer;
  background-color: blue;
  color: white;
}

.loginText {
  font-size: 18px;
  display: inline-block;
  vertical-align: center;
}
</style>