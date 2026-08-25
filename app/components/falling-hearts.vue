<template>
  <div
    class="pointer-events-none absolute inset-0 z-40 overflow-hidden"
    aria-hidden="true"
  >
    <svg
      v-for="heart in hearts"
      :key="heart.id"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="absolute -top-10 animate-heart-fall text-rose-400/80 drop-shadow-[0_0_8px_rgba(251,113,133,0.4)]"
      :style="{
        left: `${heart.left}%`,
        width: `${heart.size}px`,
        height: `${heart.size}px`,
        animationDuration: `${heart.duration}s`,
        animationDelay: `${heart.delay}s`,
      }"
    >
      <path
        d="M12 21s-7-4.35-9.33-8.28C.74 9.52 2.22 5 6.5 5c2.04 0 3.47 1.16 4.5 2.5C12.03 6.16 13.46 5 15.5 5 19.78 5 21.26 9.52 19.33 12.72 17 16.65 12 21 12 21z"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
const hearts = Array.from({ length: 36 }, (_, id) => ({
  id,
  left: Math.random() * 100,
  size: 8 + Math.random() * 14,
  duration: 8 + Math.random() * 8,
  delay: Math.random() * 10,
}))
</script>