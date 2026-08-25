<template>
  <div class="relative min-h-[90vh] bg-slate-950 text-white">
    <NuxtRouteAnnouncer />
    <div v-if="showWelcomeDialog"
      class="absolute z-60 min-w-full min-h-full top-0 left-0"
      @click="acceptCongratulations"
    >
      <div class="absolute inset-0 z-70 flex items-center justify-center bg-slate-950/65 px-4 backdrop-blur-sm">
        <section
          class="animate-text-rise w-full max-w-xl rounded-lg border border-white/15 bg-slate-950/88 p-5 text-center shadow-2xl shadow-slate-950/50 sm:p-7"
        >
          <h2 class="mt-2 text-3xl font-semibold text-white sm:text-4xl">Зроблено з любов'ю для Марійки</h2>
          <p class="mx-auto mt-4 max-w-md text-base leading-7 text-slate-100">Але перш ніж прочитаєш цю історію, я хочу привітати тебе з днем ​​народження.</p>
          <button
            class="mt-6 rounded-md bg-rose-200 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-rose-950/25 transition hover:bg-rose-100"
            type="button"
            @click.stop="acceptCongratulations"
          >
            Прийняти вітання
          </button>
        </section>
      </div>
    </div>
    <div class="absolute z-50 min-w-[30%] min-h-full top-0 left-0 text-5xl flex justify-start items-center pl-2" 
      @click="backwardStory"
      @keydown.arrow-left.prevent="backwardStory" 
    >
    〈
    </div>
    <div class="absolute z-50 min-w-[70%] min-h-full top-0 right-0  text-5xl flex justify-end items-center pr-2"
      @click="handleScreenClick"
      @keydown.space.prevent="handleScreenClick"
      @keydown.enter.prevent="handleScreenClick"
      @keydown.arrow-right.prevent="handleScreenClick" 
    >
    〉
    </div>
    <main
      class="relative min-h-full cursor-pointer overflow-hidden select-none"
      role="button"
      tabindex="0"
      aria-label="Продовжити історію"
    >
      <falling-hearts />
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="absolute inset-0 bg-cover bg-center"
          :style="previousSceneBackgroundStyle"
        />

        <div
          class="absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out"
          :class="backgroundVisible ? 'opacity-100' : 'opacity-0'"
          :style="sceneBackgroundStyle"
        />
      </div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(244,114,182,.25),transparent_30%),radial-gradient(circle_at_80%_24%,rgba(45,212,191,.2),transparent_28%),linear-gradient(180deg,rgba(2,6,23,.1),rgba(2,6,23,.78))]" />
      <div class="pointer-events-none absolute inset-x-0 top-0 h-36 bg-linear-to-b from-slate-950/65 to-transparent" />
      <div class="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-linear-to-t from-slate-950/80 to-transparent" />

      <section class="relative z-10 flex min-h-svh flex-col px-4 py-4 sm:px-6 lg:px-10">
        <header class="flex items-start justify-between gap-4">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[.22em] text-amber-100/90">The story of one love</p>
            <h1 class="text-2xl font-semibold text-white sm:text-3xl">Марійка & Сергійко</h1>
          </div>
        </header>

        <div class="mt-4 h-1.5 overflow-hidden rounded-full bg-white/18">
          <div
            class="h-full rounded-full bg-linear-to-r from-rose-300 via-amber-200 to-teal-200 transition-all duration-500"
            :style="{ width: `${progress}%` }"
          />
        </div>

        <div class="relative flex flex-1 items-end justify-center pb-52 pt-10 sm:pb-44 lg:pb-48">
          <div
            v-for="character in currentScene.characters"
            :key="`${currentScene.id}-${character.id}-${character.animation}`"
            class="absolute bottom-46 flex w-32 flex-col items-center sm:w-40 lg:w-52"
            :class="[character.position === 'left' ? 'left-[4%] animate-arrive-left' : 'right-[4%] animate-arrive-right']"
          >
            <div :class="['relative aspect-3/4 w-full drop-shadow-2xl', animationClass(character.animation)]">
              <div
                class="absolute inset-x-[18%] top-[7%] aspect-square rounded-full border border-white/30 shadow-2xl"
                :class="characterDefinitions[character.id].hairClass"
              />
              <div
                class="absolute inset-x-[11%] bottom-[7%] top-[30%] rounded-t-[42%] rounded-b-lg shadow-2xl"
                :class="characterDefinitions[character.id].bodyClass"
              />
              <div :style="character.id === 'maria' ? getFaceImage(characterDefinitions[character.id].faceImg, '50%', '20%') : getFaceImage(characterDefinitions[character.id].faceImg)" class="absolute left-1/2 top-[19%] flex h-[45%] w-[48%] -translate-x-1/2 items-center justify-center rounded-full border border-white/35" />
            </div>
          </div>
        </div>

        <article class="absolute inset-x-4 bottom-4 z-20 rounded-lg border border-white/15 bg-slate-950/72 p-4 shadow-2xl shadow-slate-950/35 backdrop-blur-md sm:inset-x-6 sm:p-5 lg:inset-x-10">
          <div :key="`${currentScene.id}-${currentLineIndex}`" class="animate-text-rise">
            <div class="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[.18em] text-teal-100/80">{{ currentScene.place }}</p>
                <h2 class="text-xl font-semibold text-white sm:text-2xl">{{ currentScene.title }}</h2>
              </div>
            </div>

            <p v-if="activeLine && activeLine.speaker" class="mb-2 text-sm font-semibold text-rose-200">{{ activeLine.speaker }}</p>
            <p v-if="activeLine" class="min-h-10 text-sm leading-5 text-slate-50 sm:text-base sm:leading-6">{{ activeLine.text }}</p>
          </div>
        </article>
      </section>

      <div
        v-if="showOpeningDialog"
        class="absolute inset-0 z-55 flex items-center justify-center bg-slate-950/65 px-4 backdrop-blur-sm"
      >
        <section
          class="animate-text-rise w-full max-w-xl rounded-lg border border-white/15 bg-slate-950/88 p-5 text-center shadow-2xl shadow-slate-950/50 sm:p-7"
          @click.stop="startNovel"
        >
          <img
            class="mx-auto mb-4 max-h-72 w-full max-w-sm object-contain drop-shadow-2xl"
            :src="openingDialog.image"
            alt="Букет тюльпанів"
            draggable="false"
          >
          <p class="text-xs font-semibold uppercase tracking-[.22em] text-amber-100/90">{{ openingDialog.subtitle }}</p>
          <h2 class="mt-2 text-3xl font-semibold text-white sm:text-4xl">{{ openingDialog.title }}</h2>
          <p class="mx-auto mt-4 max-w-md text-base leading-7 text-slate-100">{{ openingDialog.message }}</p>
          <button
            class="mt-6 rounded-md bg-rose-200 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-rose-950/25 transition hover:bg-rose-100"
            type="button"
            @click.stop="startNovel"
          >
            {{ openingDialog.cta }}
          </button>
        </section>
      </div>

      <div
        v-if="isEnd"
        class="absolute inset-0 z-55 flex items-center justify-center bg-slate-950/65 px-4 backdrop-blur-sm"
      >
        <section
          class="animate-text-rise w-full max-w-xl rounded-lg border border-white/15 bg-slate-950/88 p-5 text-center shadow-2xl shadow-slate-950/50 sm:p-7"
          @click.stop="restartNovel"
        >
          <h2 class="mt-2 text-3xl font-semibold text-white sm:text-4xl">❤️❤️❤️</h2>
          <h2 class="mt-2 text-3xl font-semibold text-white sm:text-4xl">Я тебе дуже сильно люблю, Марійко.</h2>
          <p class="mx-auto mt-4 max-w-md text-base leading-7 text-slate-100">Якщо хочеш прочитати ще раз, натисни кнопку або онови сторінку.</p>
          <button
            class="mt-6 rounded-md bg-rose-200 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-rose-950/25 transition hover:bg-rose-100"
            type="button"
            @click.stop="restartNovel"
          >
            Перечитати історію
          </button>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { characterDefinitions, musicTracks, openingDialog, storyScenes } from './data'
import type { Background, CharacterAnimation } from './models'

const scenes = storyScenes
const showOpeningDialog = ref(true)
const showWelcomeDialog = ref(true)
const currentSceneIndex = ref(0)
const currentLineIndex = ref(0)
const currentMusicId = ref<string | null>(null)

let fileAudio: HTMLAudioElement | null = null

const currentScene = computed(() => {
  const scene = scenes[currentSceneIndex.value]
  if (scene === undefined) {
    throw new Error("Not found scene")
  }
  return scene
})

const previousBackground = ref<Background | undefined>(currentScene.value.background)
const backgroundVisible = ref(true)

const previousSceneBackgroundStyle = computed(() =>
  getBackgroundStyle(previousBackground.value)
)
const activeLine = computed(() => currentScene.value.lines[currentLineIndex.value])
const isEnd = computed(() => {
  return (
    currentSceneIndex.value === scenes.length - 1 &&
    currentLineIndex.value === currentScene.value.lines.length - 1
  )
})
const totalBeats = computed(() => scenes.reduce((sum, scene) => sum + scene.lines.length, 0))
const completedBeats = computed(() => {
  const previousScenes = scenes
    .slice(0, currentSceneIndex.value)
    .reduce((sum, scene) => sum + scene.lines.length, 0)

  return previousScenes + currentLineIndex.value + 1
})
const progress = computed(() => Math.round((completedBeats.value / totalBeats.value) * 100))
const sceneBackgroundStyle = computed(() => getBackgroundStyle(currentScene.value.background))

watch(currentSceneIndex, async (newIndex, oldIndex) => {
  await applyMusicCue(currentScene.value.music)

  if (newIndex === oldIndex) {
    return
  }

  previousBackground.value = getSceneByIndex(oldIndex)?.background
  backgroundVisible.value = false

  await preloadBackground(currentScene.value.background)

  requestAnimationFrame(() => {
    backgroundVisible.value = true
  })
})

onBeforeUnmount(() => {
  stopMusic()
})

function getSceneByIndex(index: number) {
  return scenes[index]
}

function preloadBackground(background: Background | undefined) {
  if (!background || background.kind !== 'image') {
    return Promise.resolve()
  }

  return new Promise<void>((resolve) => {
    const image = new Image()

    image.onload = () => resolve()
    image.onerror = () => resolve()

    image.src = background.value
  })
}

function handleScreenClick() {
  if (showOpeningDialog.value) {
    startNovel()
    return
  }

  continueStory()
}

async function startNovel() {
  stopMusic()
  showOpeningDialog.value = false
  await applyMusicCue(currentScene.value.music, true)
}

async function restartNovel() {
  stopMusic()
  currentSceneIndex.value = 0
  currentLineIndex.value = 0
  await applyMusicCue(currentScene.value.music, true)
}

async function acceptCongratulations() {
  showWelcomeDialog.value = false
  await applyMusicCue(openingDialog.music, true)
}

function continueStory() {
  if (currentLineIndex.value < currentScene.value.lines.length - 1) {
    currentLineIndex.value += 1
    return
  }

  if (currentSceneIndex.value < scenes.length - 1) {
    currentSceneIndex.value += 1
    currentLineIndex.value = 0
    return
  }
}

function backwardStory() {
  if (showOpeningDialog.value) {
    startNovel()
    return
  }

  if (currentLineIndex.value > 0) {
    currentLineIndex.value -= 1
    return
  }

  const scene = scenes[currentSceneIndex.value]
  if (currentSceneIndex.value > 0 && scene !== undefined) {
    currentSceneIndex.value -= 1
    currentLineIndex.value = scene.lines.length - 1
    return
  }
}

function getBackgroundStyle(background: Background | undefined) {
  if (background === undefined) {
    return {
      background: "rgba(0,0,0,.5)"
    }
  }

  if (background.kind === 'image') {
    return {
      backgroundImage: `linear-gradient(180deg, rgba(15,23,42,.05), rgba(15,23,42,.42)), url("${background.value}")`
    }
  }

  return {
    backgroundImage: background.value
  }
}

function getFaceImage(background: string, up?: string, down?: string) {
  if (background === undefined) {
    return {
      background: "rgba(0,0,0,.5)"
    }
  }

  return {
    backgroundImage: `linear-gradient(180deg, rgba(15,23,42,.05), rgba(15,23,42,.42)), url("${background}")`,
    backgroundSize: 'cover',
    backgroundPosition: up && down ? `${up} ${down}` : 'center',
    backgroundRepeat: 'no-repeat',
  }
}

async function applyMusicCue(trackId: string | null, force = false) {
  if (trackId === null) {
    return
  }

  if (!force && currentMusicId.value === trackId) {
    return
  }

  const track = musicTracks.find((item) => item.id === trackId)

  if (!track) {
    return
  }

  stopMusic()
  currentMusicId.value = track.id

  if (track.src) {
    fileAudio = new Audio(track.src)
    fileAudio.loop = true
    fileAudio.volume = track.volume ?? 0.45
    if (track.start) {
      fileAudio.currentTime = track.start
    }
    await fileAudio.play()
    return
  }

  return
}

function animationClass(animation: CharacterAnimation) {
  const classes: Record<CharacterAnimation, string> = {
    float: 'animate-floaty',
    breathe: 'animate-breathe',
    sway: 'animate-sway',
    pulse: 'animate-pulse-soft',
    still: ''
  }
  return classes[animation]
}

async function stopMusic() {
  if (fileAudio) {
    fileAudio.pause()
  }
}
</script>
