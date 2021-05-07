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
            time: 0,
            animTime: 30,//sec
            isLoop: true,
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
    methods: {
        startClock: function(){
            for(let index = 0; index < this.frontImages.length; index++){
                let frontImage = this.frontImages[index];
                let that = this;
                frontImage.timerStartObj = setTimeout(function(){
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
        }
    },
    created: function () {
        let that = this;

        // function loop() {
        //     let rand = that.getRandom(0, 1000*6);
        //     setTimeout(function() {
        //         that.fireImage();
        //             loop();  
        //     }, rand);
        // }
        // loop();

        if (this.isLoop) {
            this.animLoopTimer = setInterval(function () {
                that.startClock();
            }, 1000 * this.animTime);
        }
        that.startClock();

    },
    beforeDestroy: function () {
        for (frontImage in this.frontImages) {
            clearTimeout(frontImage.timerLifeObj);
            clearTimeout(frontImage.timerStartObj);
        }
        if (this.isLoop) {
            clearInterval(this.animLoopTimer);
        }
    }

}

new Vue({
    el: '#app',
    components: {
        "slideshow": slideshow
    }

});
