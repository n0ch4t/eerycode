<template>
    <div style="width: 100%; height: 100%;">
        <div class="home-logo cursor-pointer" v-on:click="clickHome">
            <div class="font-size-30">EEryCode</div>
        </div>
        <transition name="bounce">
            <popup-login v-if="isLogin && loading" class="popup-login" v-on:register="isLogin = !isLogin" />
        </transition>
        <transition name="bounce">
            <popup-register v-if="!isLogin && loading" class="popup-register" v-on:clickLogin="isLogin = !isLogin" />
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
export default class Home extends Vue {
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
