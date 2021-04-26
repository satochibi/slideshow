"use strict"

let slideshow = {
    template: `<div id="background">
        <transition-group name="fade" tag="div">
            <div v-for="(anImage, index) in frontImages" v-bind:key="anImage.src" v-bind:id="'img'+(index+1)" class="front-image" v-show="anImage.isActive" v-bind:style="{backgroundImage: 'url(' + anImage.src + ')'}">
            </div>
        </transition-group>
        <button v-on:click="changeImage">画像{{ imageIndex + 1 }}を表示</button>
    </div>`,
    data: function () {
        return {
            imageIndex: 0,
            isLoop: true,
            frontImages: [
                { src: "./img/s1.png", isActive: false, timerObj: null, lifeTime: 1000 },
                { src: "./img/s2.png", isActive: false, timerObj: null, lifeTime: 1000 },
                { src: "./img/s3.png", isActive: false, timerObj: null, lifeTime: 1000 },
                { src: "./img/s4.png", isActive: false, timerObj: null, lifeTime: 1000 },
                { src: "./img/s5.png", isActive: false, timerObj: null, lifeTime: 1000 },
                { src: "./img/s6.png", isActive: false, timerObj: null, lifeTime: 1000 },
                { src: "./img/s7.png", isActive: false, timerObj: null, lifeTime: 1000 },
                { src: "./img/s8.png", isActive: false, timerObj: null, lifeTime: 1000 }
            ]
        };
    },
    methods: {
        changeImage: function () {
            let that = this.frontImages[this.imageIndex];
            that.isActive = true;
            that.timerObj = setTimeout(function(){
                that.isActive = false;
            }, that.lifeTime);

            this.imageIndex = (this.imageIndex + 1) % this.frontImages.length;
        }
    },
    created: function () {
        let that = this;
        this.timer = setInterval(function () {
            // console.log("発火");
            that.changeImage();
        }, 1000);
    },
    beforeDestroy: function () {
        for(frontImage in this.frontImages){
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
