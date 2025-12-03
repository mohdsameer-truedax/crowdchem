/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_GA_MEASUREMENT_ID: string;
  readonly VITE_API_URL: string;
  readonly VITE_ASSET_SERVER_URL: string;
  readonly VITE_AMPLIFY_FUNCTION_URL: string;
  readonly VITE_GOOGLE_MAPS_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Type declaration for amplify_outputs.json
declare module '*/amplify_outputs.json' {
  interface AmplifyOutputs {
    custom?: {
      sendEmailFunctionUrl?: string;
    };
  }
  const value: AmplifyOutputs;
  export default value;
}
