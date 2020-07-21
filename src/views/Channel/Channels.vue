<template>
    <div class="content-wrapper">
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
        <div class="channel-box">
            <div class="guild-nav"> </div>
            <div class="channel-nav"></div>
            <div class="chat-box">
                <div class="chat-box-top">
                    <div class="font-size-20 chat-box-title"># <span class="text-white font-size-16">일반</span></div>
                </div>
                <div class="chat-box-content">
                    <div class="mb-8 chat-msg" v-for="chat in chatlog">{{ chat }}</div>
                </div>
                <div class="input-chat-box">
                    <input class="input-chat" v-model="msg" v-on:keypress.enter="sendMessage" type="text" placeholder="#... 메시지 보내기" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Channels extends Vue {
    private isLoading: boolean = true;
    private socket: any;
    private logs: any = [];
    private msg: string = '';
    private chatlog: string[] = [];

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
        this.connect();
    }
    private connect(): void {
        this.socket = new WebSocket('ws://eerycode.com:4002/ws');
        this.socket.onopen = () => {
            this.logs.push({ event: '연결 완료: ', data: 'ws://eerycode.com:4002/ws' });
            this.socket.onmessage = (evt: any) => {
                this.logs.push({ event: '메세지 수신', data: evt.data });
                this.chatlog.push(evt.data);
                this.chatScrollDown();
            };
        };
    }

    private sendMessage(): void {
        this.socket.send(this.msg);
        this.logs.push({ event: '메시지 전송', data: this.msg });
        this.msg = '';
    }
    private chatScrollDown(): void {
        setTimeout(() => {
            const obj = document.querySelectorAll('.chat-box-content')[0];
            obj.scrollTo(0, obj.scrollHeight);
        }, 100)

    }
}
</script>

<style></style>
