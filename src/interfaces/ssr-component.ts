import { Ctx, CtxStatic, DocumentgetInitialProps, InitialData } from '@jaredpalmer/after';
import { FC, ReactNode } from 'react';

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
  TP & { children?: ReactNode; initialI18nStore?: any; initialLanguage: string }
> & {
  getInitialProps?: (props: DocumentgetInitialProps) => any;
};
