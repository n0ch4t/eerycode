import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// 사용할 아이콘만 불러옴.
import { faBars, faPaperPlane, faHashtag, faUser } from '@fortawesome/free-solid-svg-icons';

// 불러온 아이콘 등록
library.add(faBars, faPaperPlane, faHashtag, faUser);

// vue에 등록
Vue.component('font-awesome-icon', FontAwesomeIcon);
