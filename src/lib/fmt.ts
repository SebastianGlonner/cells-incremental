const locale = 'en-US';
const fmt = {
    notation: 'scientific',
    maximumFactionDigits: 3
}

class Formatter {
    bigInt(bigInt: bigint) {
        if (!bigInt) {
            return 'NaN';
        }
        if (bigInt < 10000n) {
            return bigInt.toLocaleString(locale);
        }
        return bigInt.toLocaleString(locale, fmt);
    }
}

export default new Formatter();

// export default (bigInt: bigint) => {
//     if (!bigInt) {
//         return 'NaN';
//     }
//     if (bigInt < 10000n) {
//         return bigInt.toLocaleString(locale);
//     }
//     return bigInt.toLocaleString(locale, fmt);
// }