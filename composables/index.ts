export const setLength = (text: string, length: number): string => {
  return text.length > length ? `${text.slice(0, length)}...` : text;
};

export const checkCities = (uniqueCode: number): boolean => {
  const cityCodes = [150100, 151100, 150700, 150900];
  return cityCodes.includes(Number(uniqueCode));
};

export const getLastFiveYears = () => {
  const currentYear = new Date().getFullYear(); // Hozirgi yilni olish
  const lastFiveYears = []; // Oxirgi 5 yil uchun bo'sh massiv

  for (let i = 0; i < 5; i++) {
    lastFiveYears.push(currentYear - i); // Har bir yilni hisoblaymiz
  }

  return lastFiveYears; // Natijani qaytaramiz
};

export const cleanedObj = (obj: any) => {
  if (!obj) return reactive({});
  return reactive(
    Object.fromEntries(
      Object.entries(obj).filter(([key, value]) =>
        typeof value === "boolean" ? true : Boolean(value)
      )
    )
  );
};

export const dateFormater = (inputDate: string, months: string[], t:(key:string)=>string) => {
  const [datePart, timePart] = inputDate.split(" "); // "2024-11-27 10:15" -> ["2024-11-27", "10:15"]
  if(!datePart) return "Noto'g'ri kun!"
  if (!datePart && !timePart) {
    return "Noto'g'ri format!";
  }
  const [year, month, day] = datePart.split("-").map(Number); // ["2024", "11", "27"] -> [2024, 11, 27]

  if (!year || !month || !day) {
    return "Noto'g'ri sana!";
  }

  const uzMonthName = months[month - 1];

  return `${day}-${uzMonthName}/${year}-${t('yil')}`;
};

interface FormatNumberOptions {
  decimals?: number;
  decimalSeparator?: string;
  thousandSeparator?: string;
}

export const formatNumber = (
  number: number,
  options: FormatNumberOptions = {}
) => {
  if (!number) return "";
  const {
    decimals = 0,
    decimalSeparator = ".",
    thousandSeparator = " ",
  } = options;

  let parts = number?.toFixed(decimals).split(".");

  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);

  return parts.join(decimalSeparator);
};

export const getReceptionDays = (arr: string[]) => {
  const result = arr.map((item) => {
    const weekday = item.split(" ")[0];
    const day = item.split(" ").slice(1).join(" ");
    return { weekday, day };
  });

  return result;
};

export const htmlTextFormatter = (text: string) => {
  return text
    ?.replace(/&lt;/g, "<")
    ?.replace(/&gt;/g, ">")
    ?.replace(/&quot;/g, '"')
    ?.replace(/&#39;/g, "'")
    ?.replace(/&amp;/g, "&")
    ?.replace(/&nbsp;/g, " ")
    ?.replace(/(\r\n|\n|\r)/g, "<br>");
};
