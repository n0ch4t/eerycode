<template>
    <div class="content-wrapper overflow-h">
        <div class="home-logo cursor-pointer" v-on:click="clickHome">
            <div class="font-size-30">EEryCode</div>
        </div>
        <transition name="bounce">
            <popup-login v-if="loading" class="popup-login" v-on:register="isLogin = !isLogin" />
        </transition>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import PopupLogin from '@/components/PopupLogin.vue';

@Component({
    components: { PopupLogin },
})
export default class Home extends Vue {
    private loading: boolean = false;

    private mounted(): void {
        this.loading = true;
    }

    private clickHome(): void {
        this.$router.push('/');
    }
}
</script>
