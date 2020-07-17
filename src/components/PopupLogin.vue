<template>
    <div class="popup-login-container">
        <div>
            <div class="text-center text-white font-size-30 mb-8">돌아오신것을 환영해요!</div>
            <div class="text-center font-size-20">다시 만나다니 너무 반가워요!</div>
        </div>
        <div class="mt-20">
            <label for="userId" class="mb-5 d-block">
                <span class="d-block">아이디</span>
            </label>
            <input type="name" id="userId" name="userId" class="w-100 form-control bg-dark border-dark mb-15 text-white" />
            <label for="userPw" class="d-block mb-5">
                <span class="d-block">비밀번호</span>
            </label>
            <input type="password" id="userPw" name="userPw" class="w-100 form-control bg-dark border-dark text-white mb-5" />
            <div class="mb-15 text-info">비밀번호를 잊으셨나요?</div>
            <button class="d-block w-100 btn btn-primary mb-5">로그인</button>
            <span>계정이 필요한가요?<span class="text-info ml-5">가입하기</span></span>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class PopupLogin extends Vue {}
</script>
