/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AMP_SERVER: string;
  readonly VITE_SERVER_URL: string;
  readonly VITE_API_DATA_SOURCE: 'local' | 'remote';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
