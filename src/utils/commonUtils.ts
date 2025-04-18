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
  parseArabic = (str: string) => {
    var persianNumbers = [
      /۰/g,
      /۱/g,
      /۲/g,
      /۳/g,
      /۴/g,
      /۵/g,
      /۶/g,
      /۷/g,
      /۸/g,
      /۹/g,
    ];
    var arabicNumbers = [
      /٠/g,
      /١/g,
      /٢/g,
      /٣/g,
      /٤/g,
      /٥/g,
      /٦/g,
      /٧/g,
      /٨/g,
      /٩/g,
    ];

    if (typeof str === 'string') {
      for (var i = 0; i < 10; i++) {
        str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
      }
    }
    return str;
  };
}

export default new CommonUtils();
