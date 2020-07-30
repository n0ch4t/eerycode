<template>
    <div class="content-wrapper">
        <div class="no-drag bg-wrapper">
            <img class="bg-img" v-bind:src="bghome" alt="bg" />
        </div>
        <div style="position: relative; z-index:80" class="no-drag">
            <div class="clear-fix">
                <div class="home-logo cursor-pointer float-left">
                    <img class="img-no-drag" v-bind:src="logoText" alt="logo" />
                </div>
                <div class="float-right">
                    <button class="btn-round btn-round-white mt-20 r-0 mr-20" v-on:click="clickLogin">{{ isLogin ? 'Open' : 'Login' }}</button>
                </div>
            </div>
            <div class="position-absolute" style="left:4vw;">
                <img class="dungdung img-no-drag" width="100px" v-bind:src="pusheencat" alt="catflow" />
            </div>
            <div class="position-absolute" style="margin-top: 350px; left:15vw;">
                <img class="dungdung img-no-drag" width="100px" v-bind:src="pusheenwork" alt="catwork" />
            </div>

            <div class="home-banner">
                <div class="home-banner-top">말이 통하는 나만의 공간</div>
                <div class="home-banner-desc mt-20"
                    ><span>학교 동아리, 게임 그룹, 세계 예술 감상 커뮤니티는 물론</span><br /><span
                        >단짝 친구들과도 손쉽게 어울려보세요. EErycord를 사용하면 더 쉽게, 매일 어울리고 이야기할 수 있어요.</span
                    ></div
                >
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
    private isLogin: boolean = false;

    get bghome(): any {
        return require('../../assets/img/bghome.png');
    }
    get logoText(): any {
        return require('../../assets/img/logotext.png');
    }
    get pusheencat(): any {
        return require('../../assets/img/pusheencat1.png');
    }
    get pusheenwork(): any {
        return require('../../assets/img/pusheenwork.gif');
    }

    private mounted(): void {
        const temp = localStorage.getItem('userId');
        if (temp) {
            this.isLogin = true;
        }
    }

    private clickLogin(): void {
        this.isLogin ? this.$router.push('/channels') : this.$router.push('/login');
    }
}
</script>
