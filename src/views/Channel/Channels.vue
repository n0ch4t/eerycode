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
                <div class="guild-nav-item">
                    <img v-bind:src="logo" class="guild-nav-icon mb-8 cursor-pointer" alt="guild-" />
                </div>
            </div>

            <div class="channel-nav text-center">
                <div class="channel-nav-top text-ellipsis"> 테스트 채널 {{ this.$store.getters.getGivenName }} </div>
                <div class="channel-nav-content">
                    <div
                        class="channel-nav-name text-white text-ellipsis"
                        v-bind:class="{ 'channel-nav-select': currentRoom == 1 }"
                        v-on:click="goChannel('1')"
                        ># 일반</div
                    >
                </div>
                <div class="channel-nav-content">
                    <div
                        class="channel-nav-name text-white text-ellipsis"
                        v-bind:class="{ 'channel-nav-select': currentRoom == 2 }"
                        v-on:click="goChannel('2')"
                        ># 테스트용</div
                    >
                </div>
                <button class="btn btn-primary text-ellipsis btn-logout" v-on:click="logout">Logout</button>
            </div>

            <div class="chat-box">
                <div class="chat-box-top">
                    <div class="font-size-20 chat-box-title"
                        ># <span class="text-white font-size-20 font-weight-600">일반</span
                        ><span class="ml-13 font-size-16">| 사이버 범죄 신고 또한 112</span></div
                    >
                </div>
                <div class="chat-box-content" ref="ChatBox" v-on:scroll="chatScroll">
                    <div class="text-center">
                        <div id="loading" class="position-absolute" v-show="isChatLoading" />
                    </div>
                    <div v-for="chat in chatlog">
                        <div class="mb-5 chat-id">
                            <img v-bind:src="chat.user.picture" class="chat-logo cursor-pointer" alt="logo" />
                            <div>
                                <span class="ml-13 cursor-pointer" v-bind:class="chat.color"
                                    >{{ chat.user.given_name }}
                                    <span class="text-dark-gray font-size-13">{{
                                        formatDate(chat.created_at)
                                    }}</span></span
                                >
                                <div class="mb-8 ml-13 chat-msg text-white font-size-13">{{ chat.content }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="input-chat-box">
                    <label>
                        <input
                            class="input-chat"
                            v-model="msg"
                            v-on:keypress.enter="sendMessage"
                            type="text"
                            placeholder="#... 메시지 보내기"
                        />
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator';

@Component
export default class Channels extends Vue {
    @Ref('ChatBox') private readonly chatbox!: HTMLElement;

    private isLoading: boolean = false;
    private socket: any;
    private logs: any = [];
    private msg: string = '';
    private chatlog: string[] = [];
    private userId: string = '';
    private userColor: string = '';
    private isMore: boolean = true;
    private getting: boolean = true;
    private isChatLoading: boolean = false;
    private scrollPosition: number = 0;
    private currentRoom: string = '0';
    private apiURL: string = process.env.VUE_APP_AG_API_URL || 'localhost';
    private wsURL: string = process.env.VUE_APP_AG_WS_URL || 'localhost';

    get logo() {
        return require('../../assets/img/logo.png');
    }

    private mounted() {
        this.currentRoom = this.$route.params.room_id;
        this.$axios
            .get('/api/check')
            .then((rs: any) => {
                this.$store.commit('setAuth', {
                    name: rs.data.name,
                    givenName: rs.data.given_name,
                    picture: rs.data.picture,
                });
            })
            .catch((e: any) => {
                this.$router.push('/login');
            });
        this.connect();
        // this.getmsg();
    }

    private getmsg(): void {
        this.$axios.get('/api/getmsg').then((rs: any) => {
            this.chatlog = [...rs.data.reverse()];
        });
        this.chatScrollDown();
    }

    private getmore(): void {
        if (!this.getting) {
            return;
        }
        if (this.chatlog.length % 20 !== 0) {
            this.isMore = false;
        }
        this.getting = false;
        this.isChatLoading = true;
        let height = 0;
        setTimeout(
            (self: any) => {
                self.$axios
                    .get(`/api/getmsgmore?limit=${self.chatlog.length}`)
                    .then((rs: any) => {
                        if (rs.data === null) {
                            self.isMore = false;
                            return;
                        }
                        self.chatlog = [...rs.data.reverse(), ...self.chatlog];
                        height = rs.data.length * 30;
                        self.chatbox.scrollTop = height;
                    })
                    .finally(() => {
                        self.isChatLoading = false;
                        setTimeout(
                            (t: any) => {
                                t.getting = true;
                            },
                            200,
                            self,
                        );
                    });
            },
            500,
            this,
        );
    }

    private goChannel(num: string): void {
        if (num === this.currentRoom) {
            return;
        }
        window.location.href = `http://${this.apiURL}/channels/${num}`;
    }

    private logout(): void {
        this.$store.commit('setAuth', {});
        this.$axios.get('/api/logout');
        this.$router.push('/login');
    }

    private connect(): void {
        this.socket = new WebSocket(`wss://${this.apiURL}:4002/ws/${this.currentRoom}`);
        this.socket.onopen = () => {
            this.logs.push({ event: '연결 완료: ', data: `wss://${this.apiURL}:4002/ws` });
            this.socket.onmessage = (evt: any) => {
                this.logs.push({ event: '메세지 수신', data: evt.data });
                this.chatlog.push(JSON.parse(evt.data));
                this.chatScrollDown();
            };
        };

        this.socket.onerror = () => {
            alert('뻘짓 NONO ! ');
            this.$router.push('/login');
            return;
        };
    }

    private sendMessage(): void {
        if (this.msg.trim().length <= 0) {
            this.msg = '';
            return;
        }
        const message: any = {
            room_id: this.currentRoom,
            content: this.msg,
        };
        this.socket.send(JSON.stringify(message));
        this.logs.push({ event: '메시지 전송', data: this.msg });
        this.msg = '';
    }

    private chatScrollDown(): void {
        setTimeout(() => {
            const obj = document.querySelectorAll('.chat-box-content')[0];
            obj.scrollTo(0, obj.scrollHeight);
        }, 100);
    }

    private chatScroll(e: any): void {
        if (!this.isMore) {
            return;
        }
        const scroll: number = e.target.scrollTop;
        if (!(scroll - this.scrollPosition >= 0)) {
            if (scroll === 0) {
                this.getmore();
            }
        }
        this.scrollPosition = scroll;
    }

    private formatDate(time: string): string {
        const date: Date = new Date(time);
        let returnDate: string = 'yyyy-MM-dd HH:mm:ss';
        returnDate = returnDate
            .replace('yyyy', date.getFullYear() + '')
            .replace('MM', (date.getMonth() + 1).toString().padStart(2, '0'))
            .replace(
                'dd',
                date
                    .getDate()
                    .toString()
                    .padStart(2, '0'),
            )
            .replace(
                'HH',
                date
                    .getHours()
                    .toString()
                    .padStart(2, '0'),
            )
            .replace(
                'mm',
                date
                    .getMinutes()
                    .toString()
                    .padStart(2, '0'),
            )
            .replace(
                'ss',
                date
                    .getSeconds()
                    .toString()
                    .padStart(2, '0'),
            );
        return returnDate;
    }
}
</script>

<style></style>
