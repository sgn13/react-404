import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { AuthFormContainer, AuthForm } from '.';

storiesOf('Auth Form Container', module).add('default', () => {
  return <AuthFormContainer />;
});

storiesOf('Login Form', module).add('default', () => {
  return (
    <AuthFormContainer
      overlay={<></>}
      form={
        <AuthForm
          logo={''}
          formTitle={'Login'}
          elements={{ email: true, password: true }}
          buttonName={'Login'}
          buttonAction={() => {}}
          actions={[
            { name: 'Forgot Password', action: () => {} },
            { name: 'New Registration', action: () => {} },
          ]}
        />
      }
    />
  );
});

storiesOf('Forgot Password Form', module).add('default', () => {
  return (
    <AuthFormContainer
      overlay={<></>}
      form={
        <AuthForm
          logo={''}
          formTitle={'Forgot Password'}
          elements={{ email: true }}
          buttonName={'Request'}
          buttonAction={() => {}}
          actions={[{ name: 'Back', action: () => {} }]}
        />
      }
    />
  );
});
