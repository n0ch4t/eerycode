<template>
    <div style="height: 30000px">
        <div class="home-logo cursor-pointer float-left">
            <div class="font-size-30">EEryCode</div>
        </div>
        <div class="float-right">
            <button class="btn btn-primary mt-20 r-0 mr-20" v-on:click="clickLogin">로그인</button>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
    private clickLogin(): void {
        this.$router.push('/login');
    }
}
</script>
