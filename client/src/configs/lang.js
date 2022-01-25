import ar from "../assets/flags/ar.png";
import br from "../assets/flags/br.png";
import cn from "../assets/flags/cn.png";
import es from "../assets/flags/es.png";
import gb from "../assets/flags/gb.png";
import id from "../assets/flags/id.png";
import jp from "../assets/flags/jp.png";
import kr from "../assets/flags/kr.png";
import my from "../assets/flags/my.png";
import ru from "../assets/flags/ru.png";
import th from "../assets/flags/th.png";
import tr from "../assets/flags/tr.png";
import tw from "../assets/flags/tw.png";
import us from "../assets/flags/us.png";
import vn from "../assets/flags/vn.png";

const lang = [
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

export default lang.sort((a, b) => {
  return a.label.localeCompare(b.label);
});
