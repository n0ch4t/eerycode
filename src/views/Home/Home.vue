<template>
    <div class="text-center">
        <div>홈페이지 영역</div>
        <button class="btn btn-primary mt-20" v-on:click="clickLogin">일단은 버튼입니다. 로그인으로 이동</button>
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
