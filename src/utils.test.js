const { formatPrice } = require("./utils");

describe('Utils Functions', () => {
    test('Should format price to 2 decimal places', () => {
        const formattedPrice = formatPrice(1234.567);
        expect(formattedPrice).toBe('$1234.57');
    });

    test('Should handle zero price correctly', () => {
        expect(formatPrice(0)).toBe('$0.00');
    });
});
