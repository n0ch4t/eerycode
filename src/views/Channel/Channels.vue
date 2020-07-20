<template>
    <div>
        <transition name="loading">
            <div
                v-if="isLoading"
                style="position: absolute; width: 100%; height: 100%; z-index: 150; background-color: rgb(45, 56, 57); text-align: center;"
            >
                <div style="position: absolute; top: 40%; left: calc(50% - 100px); width: 200px;">
                    <img class="rotate-center" style="width: 100px;" v-bind:src="logo" />
                    <div class="mt-20 text-white">연결 중...</div>
                </div>
            </div>
        </transition>
        <div class="guild-nav"> </div>
        <div class="channel-nav"></div>
        <div class="chat-box">
            <div class="chat-box-top">
                <div class="font-size-20 chat-box-title"># <span class="text-white font-size-16">일반</span></div>
            </div>
            <div class="input-chat-box">
                <input class="input-chat" type="text" placeholder="#... 메시지 보내기" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Channels extends Vue {
    private isLoading: boolean = true;

    get logo() {
        return require('../../assets/img/logo.png');
    }
    private mounted() {
        setTimeout(
            (self: any) => {
                self.isLoading = false;
            },
            500,
            this,
        );
    }
}
</script>

<style></style>
