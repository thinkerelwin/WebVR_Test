<template>
  <div v-if="isPanoramaLoaded" class="panorama">
    <no-ssr placeholder="Loading...">
      <a-scene>
        <a-sky :src="currentPanoramaImage || currentPanoramasList[0].desktopUrl" />
      </a-scene>
    </no-ssr>
    <div class="panorama__list-container">
      <ul class="panorama__list">
        <li v-for="(panorama, index) in currentPanoramasList" :key="panorama.id" class="panorama__item" @click="change(index)">
          <img class="panorama__item--image" :src="panorama.thumbnail" alt="panorama">
          <p class="panorama__item--title">
            {{ panorama.category }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      isPanoramaLoaded: false,
      currentPanoramaImage: ''
    }
  },
  computed: {
    ...mapGetters(['currentPanoramasList'])
  },
  watch: {
    currentPanoramasList() {
      this.isPanoramaLoaded = true
    }
  },
  mounted() {
    const exampleID = 'cc242ca9-17a3-47e5-bdd9-a12582e90752'
    this.getPanoramasList(exampleID)
  },
  methods: {
    ...mapActions(['getPanoramasList']),
    change(index) {
      this.currentPanoramaImage = this.currentPanoramasList[index].desktopUrl
    }
  }
}
</script>

<style lang="scss" scoped>
.panorama {
  position: relative;
  width: 100%;
  height: 100vh;

  & /deep/ .a-enter-vr-button {
    bottom: 170px;
  }

  .panorama__list-container {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    min-height: 150px;
    overflow-x: auto;
    background-color: rgba(88, 88, 90, 0.7);
    z-index: 2;
    .panorama__list {
      list-style: none;
      display: flex;
      align-items: center;
      overflow-x: auto;
      padding-left: 0;
    }
    .panorama__item {
      margin-top: 1em;
      margin-left: 1em;
      padding: 0.5em;
      text-align: center;
      cursor: pointer;

      &:last-child {
        margin-right: 1em;
      }
      &--image {
        width: auto;
        height: calc(130px - 2em);
      }
      &--title {
        margin-bottom: 0;
        color: white;
      }
    }
  }
}
</style>
