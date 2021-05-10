"use strict"

let slideshow = {
    template: `<div id="background">
        <transition-group name="fade" tag="div">
            <div v-for="(anImage, index) in frontImages" v-bind:key="anImage.src" v-bind:id="'img'+(index+1)" class="front-image" v-show="anImage.isActive" v-bind:style="{backgroundImage: 'url(' + anImage.src + ')'}">
            </div>
        </transition-group>
        <button type="button" v-html="isPlayIcon" v-on:click="isPlayBtnClick"></button>
    </div>`,
    data: function () {
        return {
            animTime: 30,//sec
            isLoop: true,
            isPlay: true,
            frontImages: [
                { src: "./img/s1.png", isActive: false, timerStartObj: null, timerLifeObj: null, startTime: "0%", lifeTime: "30%" },
                { src: "./img/s2.png", isActive: false, timerStartObj: null, timerLifeObj: null, startTime: "60%", lifeTime: "30%" },
                { src: "./img/s3.png", isActive: false, timerStartObj: null, timerLifeObj: null, startTime: "70%", lifeTime: "20%" },
                { src: "./img/s4.png", isActive: false, timerStartObj: null, timerLifeObj: null, startTime: "10%", lifeTime: "30%" },
                { src: "./img/s5.png", isActive: false, timerStartObj: null, timerLifeObj: null, startTime: "20%", lifeTime: "30%" },
                { src: "./img/s6.png", isActive: false, timerStartObj: null, timerLifeObj: null, startTime: "40%", lifeTime: "50%" },
                { src: "./img/s7.png", isActive: false, timerStartObj: null, timerLifeObj: null, startTime: "30%", lifeTime: "30%" },
                { src: "./img/s8.png", isActive: false, timerStartObj: null, timerLifeObj: null, startTime: "50%", lifeTime: "40%" }
            ]
        };
    },
    computed: {
        isPlayIcon: function () {
            return this.isPlay ? '<i class="fas fa-stop"></i>' : '<i class="fas fa-play"></i>';
        }
    },
    methods: {
        startClock: function () {
            for (let index = 0; index < this.frontImages.length; index++) {
                let that = this;
                let frontImage = that.frontImages[index];
                frontImage.timerStartObj = setTimeout(function () {
                    that.fireImage(index);
                }, that.getPercent2MilliSec(frontImage.startTime));
            }
        },
        fireImage: function (imageIndex) {
            let that = this;
            let thisImage = that.frontImages[imageIndex];
            thisImage.isActive = true;
            thisImage.timerLifeObj = setTimeout(function () {
                thisImage.isActive = false;
            }, that.getPercent2MilliSec(thisImage.lifeTime));

        },
        getRandom: function (min, max) {
            let random = Math.floor(Math.random() * (max + 1 - min)) + min;
            return random;
        },
        getPercent2Num: function (str) {
            return Number(str.replace(/\s+/g, "").replace("%", ""));
        },
        getPercent2MilliSec: function (str) {
            let animTimeMilliSec = this.animTime * 1000;
            let ratio = this.getPercent2Num(str) / 100;
            return animTimeMilliSec * ratio;
        },
        isPlayBtnClick: function () {

            this.isPlay = !this.isPlay;

            if (!this.isPlay) {
                this.clearTimer();
                for (let index = 0; index < this.frontImages.length; index++) {
                    let frontImage = this.frontImages[index];
                    frontImage.isActive = false;
                }
            }
            else {
                this.initTimer();
            }
        },
        clearTimer: function () {
            this.isPlay = false;
            for (let index = 0; index < this.frontImages.length; index++) {
                let frontImage = this.frontImages[index];
                clearTimeout(frontImage.timerStartObj);
                clearTimeout(frontImage.timerLifeObj);
            }
            if (this.isLoop) {
                clearInterval(this.animLoopTimer);
            }
        },
        initTimer: function(){
            let that = this;
            this.isPlay = true;
            if (this.isLoop) {
                this.animLoopTimer = setInterval(function () {
                    that.startClock();
                }, 1000 * this.animTime);
            }
            that.startClock();
        }
    },
    created: function () {
        this.initTimer();
    },
    beforeDestroy: function () {
        this.clearTimer();
    }

}

new Vue({
    el: '#app',
    components: {
        "slideshow": slideshow
    }

});
