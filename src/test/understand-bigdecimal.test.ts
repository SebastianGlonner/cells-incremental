import { Big, BigDecimal } from 'bigdecimal.js';
import { describe, expect, it, test } from 'vitest'

describe('Understanding BigDecimal', () => {

  const expectStringRepresnations = (n: BigDecimal, r: any) => {
    expect(n.toString()).toBe(r);
    expect(n.toEngineeringString()).toBe(r);

    expect(Big(n.toString()).toString()).toBe(r);
    expect(Big(n.toEngineeringString()).toEngineeringString()).toBe(r);
  }

  const expectToString = (n: BigDecimal, r: any) => {
    expect(n.toString()).toBe(r);
    expect(Big(n.toString()).toString()).toBe(r);
  }

  const expectToEngineering = (n: BigDecimal, r: any) => {
    expect(n.toEngineeringString()).toBe(r);
    expect(Big(n.toEngineeringString()).toEngineeringString()).toBe(r);
  }

  test('toString compared to toEngineeringString basic', () => {
    expect(Big(1).toString()).toBe('1')
    expect(Big(1).toEngineeringString()).toBe('1')

    
    expect(Big(1000000).toString()).toBe('1000000')
    expect(Big(1000000).toEngineeringString()).toBe('1000000')
    
    expect(Number.MAX_SAFE_INTEGER).toBe(9007199254740991);

    expect(Big(Number.MAX_SAFE_INTEGER).toString()).toBe('9007199254740991');
    expect(Big(Number.MAX_SAFE_INTEGER).toEngineeringString()).toBe('9007199254740991');

    expect(Big(Number.MAX_SAFE_INTEGER).multiply(100).toString()).toBe('900719925474099100');
    expect(Big(Number.MAX_SAFE_INTEGER).multiply(100).toEngineeringString()).toBe('900719925474099100');
  })

  it('does not mutate instances', () => {
    const n = Big(100)
    const n2 = n.multiply(100)

    expect(n.toString()).toBe('100');
    expect(n2.toString()).toBe('10000');
    
  })

  it('scale < 6', () => {
    const n = Big(Number.MAX_SAFE_INTEGER).multiply(100);

    expect(n.scale()).toBe(0);
    expectStringRepresnations(n, '900719925474099100');
    
    const n2 = n.setScale(3);
    expect(n2.scale()).toBe(3);
    expectStringRepresnations(n2, '900719925474099100.000');
  })

  it('scale > 6', () => {
    expectToString(
      Big(2000001).setScale(7), 
      '2000001.0000000'
    );
  })

  it('float', () => {
    expectStringRepresnations(Big(100).multiply(0.25), '25.00');
    expectStringRepresnations(Big(100).multiply(0.025), '2.500');

  })

  it('exponential toString with scaleByPowerOfTen', () => {
    expectStringRepresnations(
      Big(2000).scaleByPowerOfTen(0), 
      '2000'
    );

    expectToString(
      Big(2000001).scaleByPowerOfTen(1), 
      '2.000001E+7'
    );
    
    expectToEngineering(
      Big(2000001).scaleByPowerOfTen(1), 
      '20.00001E+6'
    );
  })

  it('exponential toString with scaleByPowerOfTen', () => {
    expectStringRepresnations(
      Big(2000).scaleByPowerOfTen(0), 
      '2000'
    );

    expectToString(
      Big(2000001).scaleByPowerOfTen(1), 
      '2.000001E+7'
    );
    
    expectToEngineering(
      Big(2000001).scaleByPowerOfTen(1), 
      '20.00001E+6'
    );
  })

  it('toBigInt losing precision', () => {
    expect(Big(2.2).toBigInt()).toBe(2n);
  })

  it('toBigIntExact throws if decimal', () => {
    expect(() => {Big(2.2).toBigIntExact()}).toThrow('Rounding necessary');
  })

});
