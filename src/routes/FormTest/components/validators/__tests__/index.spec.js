import validators from '..';

describe('validators tests', () => {
  it('`required` validator', () => {
    expect(validators.general.required('error')()).toEqual('error');
    expect(validators.general.required()()).toEqual('error');
    expect(validators.general.required('error')({ value: 'value' })).toEqual(
      '',
    );
  });

  it('`lengthMustBe` validator', () => {
    expect(validators.general.lengthMustBe(2, 'error')()).toEqual('error');
    expect(validators.general.lengthMustBe(2)()).toEqual('Length must be 2');
    expect(validators.general.lengthMustBe(2)('aa')).toEqual('');
  });

  it('`numbersOnly` validator', () => {
    expect(validators.general.numbersOnly('error')('aaa')).toEqual('error');
    expect(validators.general.numbersOnly()('aaa')).toEqual('error');
    expect(validators.general.numbersOnly()(123)).toEqual('');
  });

  it('`lettersOnly` validator', () => {
    expect(validators.general.lettersOnly('error')('123')).toEqual('error');
    expect(validators.general.lettersOnly()('123')).toEqual('error');
    expect(validators.general.lettersOnly()('aaa')).toEqual('');
  });

  it('`addressValidation` validator', () => {
    expect(
      validators.general.addressValidation('error')(
        'Some fake address 123 ^#%^',
      ),
    ).toEqual('error');
    expect(
      validators.general.addressValidation()('Some fake address 123 ^#%^'),
    ).toEqual('error');
    expect(
      validators.general.addressValidation()('Some fake address 123 - 3'),
    ).toEqual('');
  });
});
