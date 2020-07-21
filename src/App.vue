<template>
    <div id="app">
        <div style="position: fixed; right: 0;top: 50px; z-index: 999999; color: white;">
            <pre>
          width: {{ innerWidth }}
          height: {{ innerHeight }}
        </pre
            >
        </div>
        <transition name="fade">
            <router-view />
        </transition>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';

@Component({
    components: {},
})
export default class App extends Vue {
    private innerWidth: number = 0;
    private innerHeight: number = 0;

    private mounted() {
        this.resize();
    }

    private resize() {
        setInterval(
            (self: any) => {
                if (self.innerWidth !== window.innerWidth) {
                    self.innerWidth = window.innerWidth;
                    self.innerHeight = window.innerHeight;
                }
            },
            1000,
            this,
        );
    }
}
</script>

<style src="./assets/css/normalize.css" />
<style src="./assets/css/etc.css" />
