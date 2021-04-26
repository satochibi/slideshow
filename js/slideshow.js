"use strict"

let slideshow = {
    template: `<div id="background">
        <transition-group name="fade" tag="div">
            <div v-for="(anImage, index) in frontImages" v-bind:key="anImage.src" v-bind:id="'img'+(index+1)" class="front-image" v-show="anImage.isActive" v-bind:style="{backgroundImage: 'url(' + anImage.src + ')'}">
            </div>
        </transition-group>
    </div>`,
    data: function () {
        return {
            imageIndex: 0,
            isLoop: true,
            frontImages: [
                { src: "./img/s1.png", isActive: false, timerObj: null, lifeTime: 1000 * 6 },
                { src: "./img/s2.png", isActive: false, timerObj: null, lifeTime: 1000 * 6 },
                { src: "./img/s3.png", isActive: false, timerObj: null, lifeTime: 1000 * 3 },
                { src: "./img/s4.png", isActive: false, timerObj: null, lifeTime: 1000 * 6 },
                { src: "./img/s5.png", isActive: false, timerObj: null, lifeTime: 1000 * 6 },
                { src: "./img/s6.png", isActive: false, timerObj: null, lifeTime: 1000 * 12 },
                { src: "./img/s7.png", isActive: false, timerObj: null, lifeTime: 1000 * 6 },
                { src: "./img/s8.png", isActive: false, timerObj: null, lifeTime: 1000 * 9 }
            ]
        };
    },
    methods: {
        changeImage: function () {
            this.imageIndex = this.getRandom(0, this.frontImages.length) % this.frontImages.length;

            let that = this.frontImages[this.imageIndex];
            that.isActive = true;
            that.timerObj = setTimeout(function () {
                that.isActive = false;
            }, that.lifeTime);

        },
        getRandom: function (min, max) {
            let random = Math.floor(Math.random() * (max + 1 - min)) + min;
            return random;
        }
    },
    created: function () {
        let that = this;
        function loop() {
            let rand = that.getRandom(0, 1000*6);
            setTimeout(function() {
                that.changeImage();
                    loop();  
            }, rand);
        }
        loop();

        // this.timer = setInterval(function () {
        //     that.changeImage();
        // }, 1000);
    },
    beforeDestroy: function () {
        for (frontImage in this.frontImages) {
            clearTimeout(frontImage.timerObj)
        }
        clearInterval(this.timer);
    }

}

new Vue({
    el: '#app',
    components: {
        "slideshow": slideshow
    }

});
