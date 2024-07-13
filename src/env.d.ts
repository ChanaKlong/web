/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PYTHON_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
