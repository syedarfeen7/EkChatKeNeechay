class CommonUtils {
  parseArabicToEnglishNum = (str: string): string => {
    return String(
      str
        .replace(/[٠١٢٣٤٥٦٧٨٩]/g, (d: string) => {
          return (d.charCodeAt(0) - 1632).toString(); // Arabic numerals
        })
        .replace(/[۰۱۲۳۴۵۶۷۸۹]/g, (d: string) => {
          return (d.charCodeAt(0) - 1776).toString(); // Persian numerals
        }),
    );
  };

  getCountryCodePadding = (countryCode: string | number): string => {
    return '+' + countryCode;
  };
}

export default new CommonUtils();
