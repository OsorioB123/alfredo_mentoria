// Custom type definitions to bypass Framer Motion TypeScript strict checks
declare module 'framer-motion' {
  export interface Variants {
    [key: string]: any;
  }

  export interface Variant {
    [key: string]: any;
  }

  export interface UseInViewOptions {
    threshold?: number | number[];
    [key: string]: any;
  }
}