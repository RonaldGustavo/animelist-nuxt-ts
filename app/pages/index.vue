


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import fetchAnimeList from '~/composables/useAnimeList'

interface AnimeTitle {
  english?: string;
  romaji: string;
  native?: string;
}
interface AnimeCoverImage {
  large?: string;
}
interface Anime {
  id: number;
  title: AnimeTitle;
  coverImage?: AnimeCoverImage;
}
interface AnimePage {
  Page: {
    media: Anime[];
  };
}

const data = ref<AnimePage | null>(null)
const loading = ref<boolean>(true)
const search = ref<string>('')
let firstLoad = true


async function doSearch() {
  loading.value = true
  const query = !search.value ? 'doraemon' : search.value
  data.value = await fetchAnimeList(query, 20) as AnimePage
  loading.value = false
  firstLoad = false
}

onMounted(async () => {
  if (process.client) {
    await doSearch()
  }
})
</script>


<template>
  <div class="anime-page">
    <header class="modern-header">
      <svg class="header-icon" width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="4" width="20" height="16" rx="4" fill="#4f8cff"/>
        <rect x="6" y="8" width="12" height="8" rx="2" fill="#23262f"/>
      </svg>
      <h2 class="title">Anime <span class="gradient-text">List</span></h2>
      <form class="search-bar" @submit.prevent="doSearch">
        <input
          v-model="search"
          class="search-input"
          type="text"
          placeholder="Cari anime..."
          :disabled="loading"
        />
        <button class="search-btn" type="submit" :disabled="loading">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" stroke="#4f8cff" stroke-width="2"/><path d="M20 20L16.65 16.65" stroke="#4f8cff" stroke-width="2" stroke-linecap="round"/></svg>
        </button>
      </form>
    </header>
    <div class="anime-list">
      <template v-if="!loading && data && data.Page && Array.isArray(data.Page.media)">
        <template v-if="data.Page.media.length > 0">
          <div v-for="anime in data.Page.media" :key="anime.id" class="anime-card">
            <img :src="anime.coverImage?.large" :alt="anime.title.romaji" class="anime-img" />
            <div class="anime-info">
              <div class="anime-title">{{ anime.title.romaji }}</div>
              <div class="anime-title-sub">{{ anime.title.english || anime.title.native }}</div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="no-data">
            <svg width="60" height="60" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#23262f"/><path d="M8 15h8M9 9h.01M15 9h.01" stroke="#4f8cff" stroke-width="2" stroke-linecap="round"/></svg>
            <div class="no-data-title">Tidak ada anime ditemukan</div>
            <div class="no-data-desc">Coba kata kunci lain.</div>
          </div>
        </template>
      </template>
      <template v-else>
        <div v-for="n in 18" :key="n" class="anime-card skeleton-card">
          <div class="anime-img skeleton-box"></div>
          <div class="anime-info">
            <div class="anime-title skeleton-box" style="width: 70%; height: 18px; margin: 0.5rem auto;"></div>
            <div class="anime-title-sub skeleton-box" style="width: 50%; height: 14px; margin: 0.5rem auto;"></div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style>
:root, html, body, #__nuxt {
  min-height: 100vh;
  background: #181a20 !important;
  color: #f1f1f1 !important;
  margin: 0;
  padding: 0;
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
}
.anime-page {
  min-height: 100vh;
  background: transparent !important;
  color: #f1f1f1;
  padding: 2rem 0;
}
.modern-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
  position: relative;
}
.header-icon {
  filter: drop-shadow(0 2px 8px #4f8cff44);
}
.title {
  text-align: center;
  font-size: 2.7rem;
  font-weight: 800;
  margin: 0;
  letter-spacing: 1.5px;
  background: none;
}
.search-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: 2rem;
  background: #23262f;
  border-radius: 2rem;
  padding: 0.2rem 1rem 0.2rem 1.2rem;
  box-shadow: 0 2px 12px 0 #00000020;
  height: 2.5rem;
}
.search-input {
  background: transparent;
  border: none;
  outline: none;
  color: #f1f1f1;
  font-size: 1.1rem;
  padding: 0.2rem 0.5rem;
  width: 160px;
}
.search-input::placeholder {
  color: #b5b5b5;
  opacity: 1;
}
.search-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 0.2rem;
  display: flex;
  align-items: center;
  transition: opacity 0.2s;
}
.search-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
@media (max-width: 600px) {
  .modern-header {
    flex-direction: column;
    gap: 0.7rem;
  }
  .search-bar {
    margin-left: 0;
    width: 100%;
    justify-content: center;
  }
  .search-input {
    width: 100px;
  }
}
.gradient-text {
  background: linear-gradient(90deg, #4f8cff 30%, #a259ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.anime-list {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}
.anime-card {
  background: #23262f;
  border-radius: 1.2rem;
  box-shadow: 0 4px 24px 0 #00000030;
  width: 200px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  position: relative;
}
.anime-card:hover {
  transform: translateY(-8px) scale(1.04);
  box-shadow: 0 8px 32px 0 #00000080;
}
.anime-img {
  width: 100%;
  height: 280px;
  object-fit: cover;
  border-bottom: 1px solid #23262f;
}
.anime-info {
  padding: 1rem;
  text-align: center;
}
.anime-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.3rem;
}
.anime-title-sub {
  font-size: 0.95rem;
  color: #b5b5b5;
}
/* No Data UI */
.no-data {
  width: 100%;
  min-height: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  color: #b5b5b5;
  margin-top: 2rem;
}
.no-data-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #f1f1f1;
}
.no-data-desc {
  font-size: 1rem;
  color: #b5b5b5;
}
/* Skeleton Loading */
.skeleton-card {
  pointer-events: none;
  animation: skeleton-fade 1.2s infinite linear alternate;
}
.skeleton-box {
  background: linear-gradient(90deg, #23262f 25%, #353945 50%, #23262f 75%);
  background-size: 200% 100%;
  border-radius: 0.5rem;
  animation: skeleton-shimmer 1.2s infinite linear;
}
@keyframes skeleton-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
@keyframes skeleton-fade {
  0% { opacity: 0.7; }
  100% { opacity: 1; }
}
@media (max-width: 600px) {
  .anime-list {
    gap: 1rem;
  }
  .anime-card {
    width: 140px;
  }
  .anime-img {
    height: 180px;
  }
}
</style>
