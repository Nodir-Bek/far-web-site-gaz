import { type UseFetchOptions } from "#app";
import { defu } from "defu";

type FetchOptions<T> = UseFetchOptions<T> & {
  timeout?: number;
  language?: string;
};

export function useAPI<T = unknown>(
  url: string | (() => string),
  userOptions: FetchOptions<T> = {}
) {
  // const { locale } = useI18n();
  const  locale  = "UZL";
  const localeLang = useCookiesComposable();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort(
      createError({
        statusCode: 408,
        statusMessage: "aborted",
        message: "This request has been automatically aborted.",
      })
    );
  }, userOptions.timeout);

  const defaultOptions: FetchOptions<T> = {
    // baseURL: "http://89.249.62.62:3106/api/web",
    baseURL: "https://admin.farhududgaz.uz/api/web",
    method: "GET",
    retry: 3,
    signal: userOptions.timeout ? controller.signal : undefined,
    onRequest({ options }) {
      options.headers = {
        ...options.headers,
        Accept: "application/json",
        "Content-type": "application/json",
      };
    },
  };
  userOptions.query["language"] = localeLang.value || locale;

  watch([localeLang], () => {
    userOptions.query["language"] = localeLang.value || locale;
  });

  const options = defu(userOptions, defaultOptions) as UseFetchOptions<T>;

  return useFetch(url, options).finally(() => {
    if (userOptions.timeout && timeoutId) {
      clearTimeout(timeoutId);
    }
  });
}
