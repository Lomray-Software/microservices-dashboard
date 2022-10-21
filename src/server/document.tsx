import type {
  After as AfterComponent,
  AfterpartyProps,
  DocumentgetInitialProps,
  DocumentProps,
  RenderPageResult,
} from '@lomray/after';
import { AfterData, AfterRoot, AfterScripts, AfterStyles } from '@lomray/after';
import ServerMobx from '@lomray/afterjs-helpers/components/server-mobx';
import ServerTranslation from '@lomray/afterjs-helpers/components/server-translation';
import ObtainTranslation from '@lomray/afterjs-helpers/server/tools/obtain-translation';
import { StoreManagerProvider } from '@lomray/react-mobx-manager';
import type { ReactElement } from 'react';
import React, { Component } from 'react';
import { I18nextProvider } from 'react-i18next';
import CommonLayout from '@components/layouts/common/index.wrapper';
import { APP_NAME, BACKGROUND_COLOR, IS_PWA } from '@constants/index';
import { AppProvider } from '@context/app';
import { iosIcons, manifestPath } from '@server/config';

class Document extends Component<DocumentProps> {
  /**
   * order:
   * - component
   * - layout
   * - this document
   * - return html to client
   */
  static async getInitialProps(ctx: DocumentgetInitialProps): Promise<RenderPageResult> {
    const { renderPage, req, helmet, storeManager } = ctx;
    const initialLanguage = req.i18n.language;

    /**
     * Return only app-shell (for PWA)
     */
    if (IS_PWA && req.originalUrl === '/app-shell') {
      return {
        html: '',
        helmet,
        initialLanguage,
        initialI18nStore: {},
        isOnlyShell: true,
      };
    }

    if (typeof CommonLayout['getInitialProps'] === 'function') {
      await CommonLayout['getInitialProps'](ctx);
    }

    const serverContext = {
      cookies: req.universalCookies,
      isWebpSupport: req.headers?.accept?.indexOf('image/webp') !== -1,
      domain: `${req.protocol}://${req.get('host') as string}`,
    };

    // @ts-ignore
    const page = await renderPage((After: typeof AfterComponent) => (props: AfterpartyProps) => (
      <I18nextProvider i18n={req.i18n}>
        <StoreManagerProvider storeManager={storeManager}>
          <AppProvider initValue={serverContext}>
            <CommonLayout initialI18nStore={{}} initialLanguage={initialLanguage}>
              <After {...props} storeManager={storeManager} />
            </CommonLayout>
          </AppProvider>
        </StoreManagerProvider>
      </I18nextProvider>
    ));

    return {
      ...page,
      initialLanguage,
      initialI18nStore: ObtainTranslation(req, initialLanguage),
    };
  }

  render(): ReactElement {
    const { helmet, initialLanguage, isOnlyShell } = this.props;
    // get attributes from React Helmet
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();

    // noinspection HtmlRequiredTitleElement
    return (
      <html lang={initialLanguage} {...htmlAttrs}>
        <head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="HandheldFriendly" content="true" />
          <meta name="apple-mobile-web-app-title" content={APP_NAME} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta property="og:type" content="website" />
          <meta name="theme-color" content={BACKGROUND_COLOR} />
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
          {manifestPath && <link rel="manifest" href={`/${manifestPath}`} />}
          {iosIcons.length > 0 &&
            iosIcons.map(({ size, link }) => (
              <link key={link} rel="apple-touch-icon" sizes={size} href={link} />
            ))}
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          <AfterStyles />
        </head>
        <body {...bodyAttrs}>
          <AfterRoot />
          <AfterData />
          {!isOnlyShell && <ServerMobx />}
          {!isOnlyShell && <ServerTranslation />}
          <AfterScripts />
        </body>
      </html>
    );
  }
}

export default Document;
