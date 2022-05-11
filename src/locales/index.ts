import * as i18n from "svelte-i18n";
import de from "./de";
import en from "./en";
import es from "./es";
import fr from "./fr";
import it from "./it";
import ko from "./ko";
import pl from "./pl";
import pt from "./pt";
import ru from "./ru";
import tr from "./tr";

const resources = [de, en, es, fr, it, ko, pl, pt, ru, tr];

export function initLocales() {
  for (let i = 0; i < resources.length; i++) {
    i18n.register(
      resources[i].translation.common.language,
      () => import(`./${resources[i]}.json`)
    );
  }

  i18n.init({
    fallbackLocale: "en",
    initialLocale: i18n.getLocaleFromNavigator(),
  });
}
