import { required } from 'vuelidate/lib/validators';

export const validations = {
  userId: {
    required,
  },
  userPw: {
    required,
  },
};

export const validationsMessage = {
  userId: {
    required: '아이디를 입력해주세요.',
  },
  userPw: {
    required: '비밀번호를 입력해주세요.',
  },
};
