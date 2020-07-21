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
    required: '- 필수 입력 칸이에요',
  },
  userPw: {
    required: '- 필수 입력 칸이에요',
  },
};
