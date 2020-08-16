<template>
    <div class="content-wrapper overflow-h">
        <div class="no-drag" style="position: fixed; width: 100%; height: 100%; z-index:60">
            <img style="width: 100%; object-fit: cover; height: 100%; min-height: 1080px;" v-bind:src="bglogin" />
        </div>
        <div class="content-body">
            <div class="clear-fix">
                <div class="home-logo cursor-pointer float-left">
                    <img class="account-logo-text" v-bind:src="logoText" v-on:click="clickHome" />
                </div>
            </div>
            <transition name="bounce">
                <popup-login
                    v-if="loading && $route.name === 'Login'"
                    class="popup-login"
                    v-on:register="isLogin = !isLogin"
                />
            </transition>
            <transition name="bounce">
                <popup-register
                    v-if="loading && $route.name !== 'Login'"
                    class="popup-register"
                    v-on:register="isLogin = !isLogin"
                />
            </transition>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import PopupLogin from '@/components/PopupLogin.vue';
import PopupRegister from '@/components/PopupRegister.vue';

@Component({
    components: { PopupRegister, PopupLogin },
})
export default class AccountValidate extends Vue {
    private isLogin: boolean = true;
    private loading: boolean = false;

    get logoText(): any {
        return require('../../assets/img/logotext.png');
    }
    get bglogin(): any {
        return require('../../assets/img/bglogin.jpg');
    }

    private mounted(): void {
        this.loading = true;
    }

    private clickHome(): void {
        this.$router.push('/');
    }
}
</script>
