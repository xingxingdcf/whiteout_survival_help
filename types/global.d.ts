import type {
   ComponentRenderProxy,
   VNode,
   VNodeChild,
   ComponentPublicInstance,
   FunctionalComponent,
   PropType as VuePropType,
} from 'vue';

declare global {
   export type Writable<T> = {
      -readonly [P in keyof T]: T[P];
   };

   declare type Nullable<T> = T | null;
   declare type NonNullable<T> = T extends null | undefined ? never : T;
   declare type Recordable<T = any> = Record<string, T>;
   declare type ReadonlyRecordable<T = any> = {
      readonly [key: string]: T;
   };
   declare type Indexable<T = any> = {
      [key: string]: T;
   };
}

declare module 'vue' {
   export type JSXComponent<Props = any> = { new (): ComponentPublicInstance<Props> } | FunctionalComponent<Props>;
}
