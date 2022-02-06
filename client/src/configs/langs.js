import ar from "../assets/images/flags/ar.png";
import br from "../assets/images/flags/br.png";
import cn from "../assets/images/flags/cn.png";
import es from "../assets/images/flags/es.png";
import gb from "../assets/images/flags/gb.png";
import id from "../assets/images/flags/id.png";
import jp from "../assets/images/flags/jp.png";
import kr from "../assets/images/flags/kr.png";
import my from "../assets/images/flags/my.png";
import ru from "../assets/images/flags/ru.png";
import th from "../assets/images/flags/th.png";
import tr from "../assets/images/flags/tr.png";
import tw from "../assets/images/flags/tw.png";
import us from "../assets/images/flags/us.png";
import vn from "../assets/images/flags/vn.png";

const langs = [
  {
    name: "简体中文",
    code: "zh_CN",
    label: "China",
    value: "China",
    flag: cn,
  },
  {
    name: "English",
    code: "en_GB",
    label: "United Kingdom",
    value: "United Kingdom",
    flag: gb,
  },
  {
    name: "English",
    code: "en_US",
    label: "United States",
    value: "United States",
    flag: us,
  },
  {
    name: "한국어",
    code: "ko_KR",
    label: "South Korea",
    value: "South Korea",
    flag: kr,
  },
  {
    name: "日本語",
    code: "ja_JP",
    label: "Japan",
    value: "Japan",
    flag: jp,
  },
  {
    name: "Tiếng Việt",
    code: "vi_VN",
    label: "Viet Nam",
    value: "Viet Nam",
    flag: vn,
  },
  {
    name: "Русский",
    code: "ru_RU",
    label: "Russia",
    value: "Russia",
    flag: ru,
  },
  {
    name: "Bahasa Indonesia",
    code: "id_ID",
    label: "Indonesia",
    value: "Indonesia",
    flag: id,
  },
  {
    name: "Bahasa Malaysia",
    code: "ms_MY",
    label: "Malaysia",
    value: "Malaysia",
    flag: my,
  },
  {
    name: "Português",
    code: "pt_BR",
    label: "Brazil",
    value: "Brazil",
    flag: br,
  },
  {
    name: "ไทย",
    code: "th_TH",
    label: "Thailand",
    value: "Thailand",
    flag: th,
  },
  {
    name: "Türkçe",
    code: "tr_TR",
    label: "Turkey",
    value: "Turkey",
    flag: tr,
  },
  {
    name: "繁體中文",
    code: "zh_TW",
    label: "Taiwan",
    value: "Taiwan",
    flag: tw,
  },
  {
    name: "العربية",
    code: "ar",
    label: "Arabic",
    value: "Arabic",
    flag: ar,
  },
  {
    name: "Español",
    code: "es",
    label: "Spain",
    value: "Spain",
    flag: es,
  },
];

export default langs.sort((a, b) => {
  return a.label.localeCompare(b.label);
});
