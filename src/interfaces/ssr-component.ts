import type { Ctx, CtxStatic, DocumentgetInitialProps, InitialData } from '@jaredpalmer/after';
import type { Resource } from 'i18next';
import type { FC, ReactNode } from 'react';

/**
 * Type for functional SSR component
 */
export type SSRComponent<TP = Record<string, any>> = FC<TP & InitialData> & {
  getInitialProps?: (props: Ctx<any>) => any;
  getStaticInitialProps?: (props: CtxStatic<any>) => any;
};

/**
 * Type for layout
 */
export type SSRLayoutComponent<TP = Record<string, any>> = FC<
  TP & { children?: ReactNode; initialI18nStore: Resource; initialLanguage: string }
> & {
  getInitialProps?: (props: DocumentgetInitialProps) => any;
};
