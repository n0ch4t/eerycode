<template>
    <div class="popup-login-container">
        <div>
            <div class="text-center text-white font-size-24 font-weight-600 mb-8">계정 만들기</div>
            <div class="mt-20">
                <label for="email" class="mb-5 d-block">
                    <span class="d-block font-size-13">이메일</span>
                </label>
                <input type="text" id="email" name="email" class="w-100-per form-control bg-dark border-dark mb-15 text-white" />
                <label for="nickname" class="mb-5 d-block">
                    <span class="d-block font-size-13 ">사용자명</span>
                </label>
                <input type="text" id="nickname" name="nickname" class="w-100-per form-control bg-dark border-dark mb-15 text-white" />
                <label for="password" class="mb-5 d-block">
                    <span class="d-block font-size-13">비밀번호</span>
                </label>
                <input type="text" id="password" name="password" class="w-100-per form-control bg-dark border-dark mb-15 text-white" />
                <label for="password" class="mb-5 d-block w-100-per">
                    <div class="d-block font-size-13">생년월일</div>
                </label>
                <div class="register-date mb-15">
                    <select name="year" class="w-120 bg-dark border-dark text-white" v-model="date.year">
                        <option v-for="year in 100" v-bind:value="year + 1917" selected>{{ year + 1917 }}</option>
                    </select>
                    <select name="month" class="w-154 bg-dark border-dark text-white" v-model="date.month">
                        <option v-for="month in 12" v-bind:value="month">{{ month + '월' }}</option>
                    </select>
                    <select name="day" class="w-120 bg-dark border-dark  text-white" v-model="date.day">
                        <option v-for="day in 31" v-bind:value="day">{{ day + '일' }}</option>
                    </select>
                </div>
                <button class="d-block w-100-per btn btn-primary mb-8 cursor-pointer mb-5" v-on:click="clickRegister">계속하기</button>
                <div class="text-info cursor-pointer mb-15 font-size-13" v-on:click="$emit('clickLogin')">이미 계정이 있으신가요?</div>
                <div class="font-size-13"
                    >등록하는 순간 ErryCode의<span class="text-info ml-5 cursor-pointer"> 서비스 이용 약관</span>과
                    <span class="text-info ml-5 cursor-pointer">개인정보 보호 정책</span>에 동의하게 됩니다.</div
                >
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator';

@Component
export default class PopupRegister extends Vue {
    private date: any = {
        year: 1993,
        month: 9,
        day: 9,
    };

    private clickRegister(): void {
        alert('가입 미구현');
    }
}
</script>

<style></style>
