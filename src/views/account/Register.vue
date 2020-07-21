<template>
    <div class="content-wrapper overflow-h">
        <div class="home-logo cursor-pointer" v-on:click="clickHome">
            <div class="font-size-30">EEryCode</div>
        </div>
        <transition name="bounce">
            <popup-register v-if="loading" class="popup-register" v-on:clickLogin="isLogin = !isLogin" />
        </transition>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import PopupRegister from '@/components/PopupRegister.vue';

@Component({
    components: { PopupRegister },
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
