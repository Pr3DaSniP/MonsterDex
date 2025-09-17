/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_OUTPUT_FOLDER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
