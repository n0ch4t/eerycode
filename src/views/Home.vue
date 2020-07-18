<template>
    <div style="width: 100%; height: 100%;">
        <div class="home-logo">
            <div class="font-size-30">EEryCode</div>
        </div>
        <transition name="login">
            <popup-login v-if="isLogin" class="popup-login transition-dot-2" v-on:register="isLogin = !isLogin" />
        </transition>
        <transition name="login">
            <popup-register v-if="!isLogin" class="popup-register transition-dot-2" v-on:clickLogin="isLogin = !isLogin" />
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
}
</script>
