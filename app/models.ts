export type Background =
  | { id: string; label: string; kind: 'image'; value: string }
  | { id: string; label: string; kind: 'gradient'; value: string }

export type CharacterId = 'maria' | 'serhii'
export type CharacterAnimation = 'float' | 'breathe' | 'sway' | 'pulse' | 'still'
export type CharacterPosition = 'left' | 'right'

export interface CharacterOnStage {
  id: CharacterId
  position: CharacterPosition
  animation: CharacterAnimation
}

export interface CharacterDefinition {
  name: string
  faceImg: string
  hairClass: string
  bodyClass: string
}

export interface StoryLine {
  speaker?: string
  text: string
}

export interface OpeningDialog {
  title: string
  subtitle: string
  message: string
  music: MusicCue
  image: string
  cta: string
}

export type MusicCue = string | null

export interface MusicTrack {
  id: string
  label: string
  src?: string
  start?: number
  volume?: number
}

export interface StoryScene {
  id: string
  title: string
  place: string
  background: Background | undefined
  music: MusicCue
  characters: CharacterOnStage[]
  lines: StoryLine[]
}
