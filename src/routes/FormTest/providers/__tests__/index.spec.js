import React, { useContext, useEffect } from 'react';
import { mount } from 'enzyme';
import utils from 'utils';
import EN from 'i18n/EN';
import { Provider } from 'react-redux';
import { FormContext } from '../formProvider';
import StepProvider from '../stepProvider';
import FormContainer from '../../components/FormContainer';


const store = utils.test.initMockStore({
  i18n: {
    literals: EN.en,
  },
});
describe('FormProvider', () => {
  it('registers field on update if field does not exist', (done) => {
    const mockField = {
      name: 'testname',
      value: 'testvalue',
    };

    const CustomInput = () => {
      const { updateValueInField } = useContext(FormContext);
      useEffect(() => updateValueInField(
        mockField,
        // eslint-disable-next-line react-hooks/exhaustive-deps
      ), []);
      return <input />;
    };


    const mountedWrapper = mount(
      <Provider store={store}>
        <StepProvider
          data={{ }}
          updateData={(obj) => {
            expect(obj).toEqual({ [mockField.name]: mockField.value });
            done();
          }}
        >
          <FormContainer>
            <CustomInput />
          </FormContainer>
        </StepProvider>
      </Provider>,
    );

    mountedWrapper.unmount();
  });
});
