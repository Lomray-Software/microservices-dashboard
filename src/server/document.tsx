import {
  After as AfterComponent,
  AfterData,
  AfterpartyProps,
  AfterRoot,
  AfterScripts,
  AfterStyles,
  DocumentgetInitialProps,
  DocumentProps,
  RenderPageResult,
  SerializeData,
  __AfterContext,
} from '@jaredpalmer/after';
import React, { Component, ReactElement } from 'react';
import { I18nextProvider } from 'react-i18next';
import { StoreManagerProvider } from '@common/context/store-manager';
import Layout from '@components/layout';
import { APP_NAME, BACKGROUND_COLOR, IS_PWA } from '@constants/index';
import { AppProvider } from '@context/app';
import { iosIcons, manifestPath } from '@server/config';

function StoreData() {
  const { storeManager } = React.useContext(__AfterContext);

  return <SerializeData name="preloadedState" data={storeManager.toJSON()} />;
}

function TranslationData() {
  const { initialI18nStore, initialLanguage } = React.useContext(__AfterContext);

  return (
    <>
      <SerializeData name="initialI18nStore" data={initialI18nStore} />
      <SerializeData name="initialLanguage" data={initialLanguage} />
    </>
  );
}

class Document extends Component<DocumentProps> {
  /**
   * order:
   * - component
   * - layout
   * - this document
   * - return html to client
   */
  static async getInitialProps(ctx: DocumentgetInitialProps): Promise<RenderPageResult> {
    const { renderPage, req, data, helmet, storeManager } = ctx;
    const componentData = data.initialData;
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
        serverContext: {},
        isOnlyShell: true,
      };
    }

    if (typeof Layout.getInitialProps === 'function') {
      await Layout.getInitialProps(ctx);
    }

    const serverContext = {
      cookies: req.universalCookies,
      isWebpSupport: req.headers?.accept?.indexOf('image/webp') !== -1,
      domain: `${req.protocol}://${req.get('host') as string}`,
      // pass app context from component
      ...(componentData?.context?.app ?? {}),
    };

    // @ts-ignore
    const page = await renderPage((After: typeof AfterComponent) => (props: AfterpartyProps) => (
      <I18nextProvider i18n={req.i18n}>
        <StoreManagerProvider storeManager={storeManager}>
          <AppProvider initValue={serverContext}>
            <Layout initialLanguage={initialLanguage}>
              <After {...props} storeManager={storeManager} />
            </Layout>
          </AppProvider>
        </StoreManagerProvider>
      </I18nextProvider>
    ));

    const initialI18nStore = {};
    const usedNamespaces = req.i18n?.reportNamespaces?.getUsedNamespaces() ?? [];

    // Get used translation for pass down to client
    for (const language of req?.i18n?.languages ?? []) {
      initialI18nStore[language] = {};

      usedNamespaces.forEach((namespace) => {
        initialI18nStore[language][namespace] =
          req.i18n.services.resourceStore.data[language][namespace];
      });

      // Pass to client side only one language (current)
      if (initialLanguage.includes(language) && initialI18nStore[language]) {
        break;
      }
    }

    return {
      ...page,
      initialI18nStore,
      initialLanguage,
    };
  }

  render(): ReactElement {
    const { helmet, initialLanguage, isOnlyShell } = this.props;
    // get attributes from React Helmet
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();

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
          {!isOnlyShell && <StoreData />}
          {!isOnlyShell && <TranslationData />}
          <AfterScripts />
        </body>
      </html>
    );
  }
}

export default Document;
