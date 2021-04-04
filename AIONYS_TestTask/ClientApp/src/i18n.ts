import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      description: "Descriptions",
      note: "Note",
      text: "Note description",
      eror: "This field is required",
      submit: "Submit",
      reset: "Reset",
      submitted:"Submitted successfully", 
      deleted: "Deleted successfully"
    }
  },
  ru: {
    translation: {
      description: "Записи",
      note: "Запись",
      text: "Содержание записи",
      eror: "Это поле обязательное",
      submit: "Отправить",
      reset: "Скинуть",
      submitted:"Отправлено успешно",
      deleted: "Удалено успешно"
    }
  },
  ua: {
    translation: {
      description: "Дописи",
      note: "Допис",
      text: "Зміст допису",
      eror: "Це поле обов'язкове",
      submit: "Відпрваити",
      reset: "Скинути",
      submitted:"Відправлено успішно",
      deleted: "Видалено успішно"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "ru",
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;


