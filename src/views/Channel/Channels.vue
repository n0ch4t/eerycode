<template>
  <div class="content-wrapper">
    <transition name="loading">
      <div
          v-if="isLoading"
          style="position: absolute; width: 100%; height: 100%; z-index: 150; background-color: rgb(45, 56, 57); text-align: center;"
      >
        <div style="position: absolute; top: 40%; left: calc(50% - 100px); width: 200px;">
          <img class="rotate-center" style="width: 100px;" v-bind:src="logo"/>
          <div class="mt-20 text-white">연결 중...</div>
        </div>
      </div>
    </transition>
    <div class="channel-box">
      <div class="guild-nav" v-bind:class="{'active': isShowMenu}">
        <div class="guild-nav-item">
          <img v-bind:src="logo" class="guild-nav-icon mb-8 cursor-pointer" alt="guild-"/>
        </div>
      </div>

      <div class="channel-nav text-center" v-bind:class="{'active': isShowMenu}" ref="c-nav">
        <div class="channel-nav-top text-ellipsis"> 테스트 채널</div>
        <div class="channel-nav-content">
          <div
              class="channel-nav-name text-gray text-ellipsis"
              v-bind:class="{ 'channel-nav-select': currentRoom == 1 }"
              v-on:click="goChannel('1')"
          ># 1번-채널
          </div>
        </div>
        <div class="channel-nav-content">
          <div
              class="channel-nav-name text-gray text-ellipsis"
              v-bind:class="{ 'channel-nav-select': currentRoom == 2 }"
              v-on:click="goChannel('2')"
          ># 2번-채널
          </div
          >
        </div>
        <button class="btn btn-primary text-ellipsis btn-logout" v-on:click="logout">Logout</button>
      </div>

      <div class="chat-box" v-bind:class="{'active': isShowMenu}" v-on:click="isShowMenu = false">
        <div class="chat-box-top">
          <div class="font-size-20 chat-box-title"
          >
            <font-awesome-icon class="font-size-20 mr-20 nav-menu-btn" icon="bars"
                               v-on:click.prevent.stop="isShowMenu = !isShowMenu"/>
            # <span class="text-white font-size-20 font-weight-600">{{ this.currentRoom }}번-채널</span
          ><span class="ml-13 font-size-20">| 공 지 같 은 것</span></div
          >
        </div>
        <div class="chat-box-content scroll-1" ref="ChatBox" v-on:scroll="chatScroll">
          <div class="text-center">
            <div id="loading" class="position-absolute" v-show="isChatLoading"/>
          </div>
          <div v-for="chat in chatlog">
            <div class="mb-5 chat-id">
              <img v-bind:src="chat.user.picture" class="chat-logo cursor-pointer" alt="logo"/>
              <div>
                                <span class="ml-13 cursor-pointer" v-bind:class="chat.color"
                                >{{ chat.user.given_name }}
                                    <span class="text-dark-gray font-size-13">{{
                                        formatDate(chat.created_at)
                                      }}</span></span
                                >
                <div class="mb-8 ml-13 chat-msg text-white font-size-13"><span
                    style="white-space: pre-line">{{ chat.content }}</span></div>
              </div>
            </div>
          </div>
        </div>
        <div class="input-chat-box">
          <div class="input-chat-wrap">
            <label>
              <textarea
                  class="input-chat scroll-1 "
                  v-model="msg"
                  v-on:keypress.enter.prevent.stop="sendMessage"
                  placeholder="#... 메시지 보내기"
              />
            </label>
            <button class="msg-send-button" v-on:click="sendMessage">
              <font-awesome-icon icon="paper-plane"/>
            </button>
          </div>
        </div>
      </div>
      <div class="user-box">
        <div class="member-group">online - {{onlineMember.length}}</div>
        <div class="member-container">
          <div class="member-card" v-for="mem in onlineMember">
            <div class="member-avartar"><img v-bind:src="mem.picture" class="avartar-img"></div>
            <div class="member-nickname font-size-16">{{ mem.given_name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref, Watch } from 'vue-property-decorator';

@Component
export default class Channels extends Vue {
  @Ref('ChatBox') private readonly chatbox!: HTMLElement;

  private isLoading: boolean = false;
  private socket: any;
  private logs: any = [];
  private msg: string = '';
  private chatlog: string[] = [];
  private isMore: boolean = true;
  private getting: boolean = true;
  private isChatLoading: boolean = false;
  private scrollPosition: number = 0;
  private currentRoom: string = '0';
  private apiURL: string = process.env.VUE_APP_AG_API_URL || 'localhost';
  private isShowMenu: boolean = false;
  private onlineMember: any[] = [];

  get logo() {
    return require('../../assets/img/pusheen.jpg');
  }

  private mounted() {
    this.initChannel();
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
    this.getmsg();
    this.isMember();
    this.isOnlineMember();
  }

  private isMember(): void {
    this.$axios.get('/api/ismember').then((rs: any) => {
      if (rs.data !== null) {
        const tempMember: any = [];
        for (const element of rs.data) {
          if (!tempMember.some((e: any) => e.email === element.email)) {
            tempMember.push(element);
          }
        }
        this.onlineMember = tempMember;
      }
    });
  }

  private isOnlineMember(): void {
    setInterval(() => {
      this.isMember();
    }, 10000);
  }

  private initChannel(): void {
    this.currentRoom = this.$route.params.room_id;
    this.chatlog = [];
  }

  private getmsg(): void {
    this.$axios.get(`/api/msg/${this.currentRoom}`).then((rs: any) => {
      if (rs.data !== null) {
        this.chatlog = [...rs.data];
      }
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
    this.socket.close();
    if (num === this.currentRoom) {
      return;
    }
    this.$router.replace(`/channels/${num}`);
    this.initChannel();
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
    this.getmsg();

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
      alert('연결이 끊겼습니다.');
      this.$router.replace('/');
      return;
    };
  }

  private sendMessage(e: any): void {
    if (this.msg.trim().length <= 0) {
      this.msg = '';
      return;
    }
    if (e.shiftKey === true && e.key === 'Enter') {
      return;
    }
    const message: any = {
      room_id: this.currentRoom,
      content: this.msg,
    };
    this.socket.send(JSON.stringify(message));
    this.logs.push({ event: '메시지 전송', data: this.msg });
    this.msg.trimStart();
    this.msg = '';

  }

  private chatScrollDown(): void {
    setTimeout(() => {
      this.chatbox.scrollTo(0, this.chatbox.scrollHeight);
    }, 500);
  }

  private chatScroll(e: any): void {
    if (!this.isMore) {
      return;
    }
    const scroll: number = e.target.scrollTop;
    if (!(scroll - this.scrollPosition >= 0)) {
      if (scroll === 0) {
        // this.getmore();
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

  private hideURLBar(): void {
    window.scrollTo(0, 1);
  }
}
</script>

<style scoped>
.channel-box {
  overflow: hidden;
}

.nav-menu-btn {
  display: none !important;
}

.guild-nav {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
  width: 72px !important;
  background-color: rgb(32, 34, 37);
  transition: left .2s ease-in-out;
}

.guild-nav-item {
  margin: 5px 0;
  padding: 0 12px;
  height: 48px;
}

.guild-nav-icon {
  width: 100%;
  height: auto;
  border-radius: 2rem;
  transition: border-radius .5s;
  background: rgb(32, 34, 37);
}

.guild-nav-icon:hover {
  border-radius: 0.5rem;
}

.channel-nav {
  position: fixed;
  left: 72px;
  top: 0;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
  width: 240px !important;
  height: 100% !important;
  background: rgb(47, 49, 54);
  transition: left .2s ease-in-out;
}

.channel-nav-top {
  height: 48px;
  text-align: left;
  padding: 14px 16px;
  color: white;
  font-size: 16px;
  border-bottom: 1px solid rgb(36, 41, 47);
}

.channel-nav-content {
  padding: 5px;
}

.channel-nav-name {
  padding: 5px;
  border-radius: 0.25rem;
  text-align: left;
}

.channel-nav-name:hover {
  background: rgb(55, 58, 62);
}

.channel-nav-select {
  background: rgb(66, 69, 66) !important;
  color: white !important;
}

.chat-box {
  overflow: hidden;
  z-index: 997;
  margin-left: 312px;
  width: calc(100% - 544px) !important;
  min-width: 300px;
  height: 100%;
  background: rgb(55, 57, 62);
  transition: margin-left .2s ease-in-out;
}

.chat-logo {
  width: 40px !important;
  height: 40px !important;
  border-radius: 2rem;
}

.chat-box-top {
  top: 0;
  width: 100%;
  height: 48px !important;
  border-bottom: 1px solid rgb(44, 45, 49);
}

.chat-box-title {
  padding: 15px;
}

.chat-box-content {
  padding-top: 10px;
  height: calc(100vh - 109px);
  overflow-y: scroll;
  overflow-x: hidden;
}

.input-chat-box {
  bottom: 0;
  padding: 10px;
  width: 100%;
}

.input-chat-wrap {
  width: 100%;
  height: 34px !important;
  padding: 8px !important;
  background: rgb(64, 68, 75);
  border-radius: 0.5rem;
}

.input-chat {
  margin-left: 5px;
  width: calc(100% - 50px) !important;
  height: 22px;
  font-size: 14px;
  color: white !important;
  border: none !important;
  background: none !important;
  resize: none;
}

.input-chat:focus {
  outline: none;
}

.msg-send-button {
  position: fixed;
  margin-top: -3px;
  background: none !important;
  border: none !important;
  font-size: 20px;
  color: lightgray;
}

.msg-send-button:focus {
  outline: none;
  border: none;
}

.msg-send-button:hover {
  color: white;
}

.chat-id {
  display: flex;
  justify-content: left;
  padding-left: 20px;
}

.chat-id:hover {
  background-color: rgb(50, 53, 59);
}

.user-box {
  position: fixed;
  z-index: 999;
  top: 0px;
  right: 0px;
  width: 232px;
  height: 100%;
  background-color: #2f3136;
  transition: right 0.2s ease-in-out;
}

.member-group {
  position: relative;
  width: 224px;
  padding: 24px 8px 0 16px;
}

.member-container {
  margin-left: 8px;
}

.member-card {
  display: flex;
  align-items: center;
  padding: 0 8px;
  height: 42px;
}

.member-card:hover {
  background: rgb(55, 57, 62);
  border-radius: 0.25rem;
}

.member-avartar {
  width: 32px;
  height: 32px;
}

.avartar-img {
  width: 100%;
  height: 100%;
  border-radius: 2rem;
}

.member-nickname {
  padding-left: 12px;
  width: 164px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/*** media query ***/

@media (max-width: 800px) {
  .nav-menu-btn {
    display: inline-block !important;
  }

  .guild-nav {
    left: -384px !important;
  }

  .channel-nav {
    left: -552px !important;
  }

  .guild-nav.active {
    left: 0 !important;
  }

  .channel-nav.active {
    left: 72px !important;
  }

  .chat-box {
    margin-left: 0 !important;
    width: 100% !important;
  }

  .chat-box.active {
    margin-left: 312px !important;
    /*width: calc(100% - 312px) !important;*/
  }

  .user-box {
    right: -232px;
  }
}

@media (max-width: 485px) {
}

</style>
