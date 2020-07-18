<template>
    <div class="popup-login-container">
        <div>
            <div class="text-center text-white font-size-24 font-weight-600 mb-8">돌아오신 것을 환영해요!</div>
            <div class="text-center font-size-16">다시 만나다니 너무 반가워요!</div>
        </div>
        {{ islogon }}
        <div class="mt-20">
            <label for="userId" class="mb-5 d-block">
                <span class="d-block font-size-13">아이디</span>
            </label>
            <input type="text" id="userId" name="userId" class="w-100-per form-control bg-dark border-dark mb-15 text-white" />
            <label for="userPw" class="d-block mb-5">
                <span class="d-block font-size-13">비밀번호</span>
            </label>
            <input type="password" id="userPw" name="userPw" class="w-100-per form-control bg-dark border-dark text-white mb-5" />
            <div class="mb-15 text-info cursor-pointer font-size-13">비밀번호를 잊으셨나요?</div>
            <button class="d-block w-100-per btn btn-primary mb-8 cursor-pointer">로그인</button>
            <div class="font-size-13">
                <span>계정이 필요한가요?<span class="text-info ml-5 cursor-pointer" v-on:click="clickRegister">가입하기</span></span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator';

@Component
export default class PopupLogin extends Vue {
    @Emit('register')
    private clickRegister() {}
}
</script>
