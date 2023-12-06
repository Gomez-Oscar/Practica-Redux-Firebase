import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginWithCodeAsync } from '../../store/users/userActions';

const InsertCode = () => {
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const login = data => {
    console.log(data);
    dispatch(loginWithCodeAsync(data.code));
  };

  return (
    <main>
      <h1>Ingrese su código de verificación</h1>
      <form onSubmit={handleSubmit(login)}>
        <input type='number' {...register('code')} />
        <button>Confirmar Código</button>
      </form>
    </main>
  );
};

export default InsertCode;
