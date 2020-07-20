<template>
    <div>
        <div style="position: fixed; width: 100%; height: 100%; z-index:60">
            <img style="width: auto; height: 100%; min-height: 1080px;" v-bind:src="img" />
        </div>
        <div style="position: relative; z-index:80">
            <div class="clear-fix">
                <div class="home-logo cursor-pointer float-left">
                    <div class="font-size-30">EEryCode</div>
                </div>
                <div class="float-right">
                    <button class="btn-round btn-round-white mt-20 r-0 mr-20" v-on:click="clickLogin">로그인</button>
                </div>
            </div>
            <div style="margin-top: 20vh; position: absolute">
                <img
                    class="dungdung mt-20"
                    width="100px"
                    src="https://www.pinclipart.com/picdir/big/355-3559958_pusheencat-sticker-pusheen-valentines-day-clipart.png"
                />
            </div>

            <div class="home-banner">
                <div class="home-banner-top">말이 통하는 나만의 공간</div>
                <div class="home-banner-desc mt-20"
                    ><span>학교 동아리, 게임 그룹, 세계 예술 감상 커뮤니티는 물론</span><br /><span
                        >단짝 친구들과도 손쉽게 어울려보세요. Discord를 사용하면 더 쉽게, 매일 어울리고 이야기할 수 있어요.</span
                    ></div
                >
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator';
import { url } from 'vuelidate/lib/validators';

@Component
export default class Home extends Vue {
    get img() {
        return require('../../assets/img/gurum.jpg');
    }
    private clickLogin(): void {
        this.$router.push('/login');
    }
}
</script>
