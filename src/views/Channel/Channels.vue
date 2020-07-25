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
            <div class="guild-nav">
                <img v-bind:src="logo" class="guild-nav-icon mb-8 cursor-pointer" alt="guild-" />
            </div>

            <div class="channel-nav text-center">
                <div class="channel-nav-top text-ellipsis">
                    테스트 채널
                </div>
                <div class="channel-nav-content">
                    <div class="channel-nav-name text-white text-ellipsis"># 일반</div>
                </div>
                <button class="btn btn-primary text-ellipsis" v-on:click="logout">Logout</button>
            </div>

            <div class="chat-box">
                <div class="chat-box-top">
                    <div class="font-size-20 chat-box-title"
                        ># <span class="text-white font-size-20 font-weight-600">일반</span
                        ><span class="ml-13 font-size-16">| 안녕하세요 테스트중인 사이트입니다.</span></div
                    >
                </div>
                <div class="chat-box-content">
                    <div v-for="chat in chatlog">
                        <div class="mb-5 chat-id">
                            <img v-bind:src="logo" class="chat-logo cursor-pointer" />
                            <div>
                                <span class="ml-13 cursor-pointer" v-bind:class="chat.split('c+')[1].split(':@')[0]">{{ chat.split('c+')[0] }} </span>
                                <div class="mb-8 ml-13 chat-msg text-white">{{ chat.split('c+')[1].split(':@')[1] }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="input-chat-box">
                    <label>
                        <input class="input-chat" v-model="msg" v-on:keypress.enter="sendMessage" type="text" placeholder="#... 메시지 보내기" />
                    </label>
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
    private userId: string = '';
    private userColor: string = '';

    get logo() {
        return require('../../assets/img/logo.png');
    }
    private mounted() {
        const temp = localStorage.getItem('userId');
        if (!temp) {
            this.$router.push('/login');
        }
        this.userId = temp + '';
        const color = localStorage.getItem('userColor');
        this.userColor = color + '';
        setTimeout(
            (self: any) => {
                self.isLoading = false;
            },
            500,
            this,
        );
        this.connect();
    }
    private getmsg(): void {
    }
    private logout(): void {
        localStorage.removeItem('userId');
        this.$router.push('/login');
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
        if (this.msg.trim().length <= 0) {
            this.msg = '';
            return;
        }
        this.socket.send(this.userId + 'c+' + this.userColor + ':@' + this.msg);
        this.logs.push({ event: '메시지 전송', data: this.msg });
        this.msg = '';
    }
    private chatScrollDown(): void {
        setTimeout(() => {
            const obj = document.querySelectorAll('.chat-box-content')[0];
            obj.scrollTo(0, obj.scrollHeight);
        }, 100);
    }
}
</script>

<style></style>
