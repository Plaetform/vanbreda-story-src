// Shared types and helpers for scene modules

export interface SceneModule {
  render(): string
  bind(navigateForward: () => void, activeTimers: ReturnType<typeof setTimeout>[], extra?: Record<string, (() => void) | undefined>): void
  cleanup?(): void
}
