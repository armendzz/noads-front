<template>
  <div>
    <div class="container">
        <div class="row">
            <div class="col-lg-8">
    <div class="card my-5">
      <div class="card-header">{{ video.videoDetails.title }}</div>
      <div class="card-body">
        <div class="player-container">
          <vue-core-video-player
            :cover="video.videoDetails.thumbnails[4].url"
            :src="playerOptions.sources"
            :title="video.videoDetails.title"
            :autoplay="true"
            logo="http://llamba.de/fuckads1.png"
            :key="$route.fullPath"
          ></vue-core-video-player>
        </div>
        <hr />
        {{ video.videoDetails.description }}
      </div>
    </div>
    </div>
    <div class="col-lg-4">
        <div class="card my-5">
            <div class="card-header">Related Videos</div>
            <div class="card-body">
                <div class="" v-for="video in video.related_videos" :key="video.id">
                    <router-link :to="'/video/' + video.id">
                 <div class="border mt-2 mb-2">
                        <img :src="video.thumbnails[1].url" width="150px" alt=""> 
                    {{video.title}}
                 </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
    </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  data() {
    return {
      video: [],
      playerOptions: {
        // videojs options
        autoplay: false,
        muted: true,
        language: "en",
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [],
        poster: "/static/images/author.jpg",
      },
    };
  },
  mounted() {
   this.getVideo()
  },
  methods:{
      getVideo(){
           axios
      .post("http://localhost:3000/single", {
        vidid: this.$route.params.slug,
      })
      .then((response) => {
        let data = response.data;
        this.video = data;
        
            console.log(data)
        this.video.formats.forEach((e) => {
          if (typeof e.audioSampleRate !== "undefined") {
            if (e.mimeType.includes("video")) {
              this.playerOptions.sources.push({
                src: e.url,
                resolution: e.height,
              });
            }
          }
        });
      });
      }
  },
};
</script>

<style>
</style>