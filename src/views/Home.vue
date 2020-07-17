<template>
    <div>
      <div class="home-logo">
        <h2>erryCode</h2>
      </div>
        <popup-login class="" />
    </div>
</template>

<script>
import PopupLogin from '@/components/PopupLogin';
export default {
    name: 'Home',
    components: {
        PopupLogin,
    },
};
</script>
