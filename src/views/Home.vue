<template>
    <div>
        <div class="home-logo">
            <h2>erryCode</h2>
        </div>
        <popup-login v-if="isLogin" class="popup-login" />
        <popup-register v-if="true" class="popup-login" />
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
