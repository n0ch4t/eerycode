<template>
    <div id="app">
        <transition name="fade" mode="out-in">
            <router-view />
        </transition>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';

@Component({
    components: {},
})
export default class App extends Vue {}
</script>

<style src="./assets/css/normalize.css" />
<style src="./assets/css/etc.css" />
