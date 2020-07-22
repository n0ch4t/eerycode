<template>
    <div class="content-wrapper">
        <div class="no-drag" style="position: fixed; width: 100%; height: 100%; z-index:60">
            <img style="width: 100%; object-fit: cover; height: 100%; min-height: 1080px;" v-bind:src="bghome" />
        </div>
        <div style="position: relative; z-index:80" class="no-drag">
            <div class="clear-fix">
                <div class="home-logo cursor-pointer float-left">
                    <img v-bind:src="logoText" />
                </div>
                <div class="float-right">
                    <button class="btn-round btn-round-white mt-20 r-0 mr-20" v-on:click="clickLogin">{{ isLogin? 'Open' : 'Login'}}</button>
                </div>
            </div>
            <div style="margin-top: 20vh; position: absolute">
                <img class="dungdung mt-20" width="100px" v-bind:src="pusheencat" />
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
import { Vue, Component, Emit } from 'vue-property-decorator';
import { url } from 'vuelidate/lib/validators';

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

    private mounted() {
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
