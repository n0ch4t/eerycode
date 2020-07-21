<template>
    <div class="content-wrapper overflow-h">
        <div class="clear-fix">
            <div class="home-logo cursor-pointer float-left">
                <div class="font-size-30" v-on:click="clickHome">EEryCode</div>
            </div>
        </div>
        <transition name="bounce">
            <popup-login v-if="loading && $route.name === 'Login'" class="popup-login" v-on:register="isLogin = !isLogin" />
        </transition>
        <transition name="bounce">
            <popup-register v-if="loading && $route.name !== 'Login'" class="popup-register" v-on:register="isLogin = !isLogin" />
        </transition>
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

    private mounted(): void {
        this.loading = true;
    }

    private clickHome(): void {
        this.$router.push('/');
    }
}
</script>
