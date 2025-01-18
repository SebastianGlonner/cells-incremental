import { Big, type BigDecimal } from "bigdecimal.js";

class Formatter {
    private locale = 'en-US';
    // private locale = 'de-DE';
    private fmt: BigIntToLocaleStringOptions = {
        notation: 'scientific',
        maximumFractionDigits: 3,
        minimumFractionDigits: 3,
        // minimumSignificantDigits: 4,
        // maximumSignificantDigits: 4
    };
    bigDecimal(bigInt: BigDecimal, defaultsTo = 0) {
        if (!bigInt) {
            return defaultsTo;
        }
        if (bigInt.lt(1000)) {
            return bigInt.toBigInt().toLocaleString(this.locale);
        }
        return bigInt.toBigInt().toLocaleString(this.locale, this.fmt);
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