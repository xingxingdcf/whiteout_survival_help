import { createPinia } from 'pinia';
import { useTestStore } from './modules/test';

export const pinia = createPinia();

export function useStore() {
   return {
      useTestStore: useTestStore(),
   };
}
