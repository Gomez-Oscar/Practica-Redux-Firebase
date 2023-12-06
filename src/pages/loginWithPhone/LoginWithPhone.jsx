import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import React from 'react';
import { useForm } from 'react-hook-form';
import { auth } from '../../firebase/firebaseConfig';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function LoginWithPhone() {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const generateRecaptch = () => {
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        'recaptch-container',
        {
          size: 'invisible',
          callback: () => {},
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const sendSMS = (phone, recaptchaVerifier) => {
    signInWithPhoneNumber(auth, `+57${phone}`, recaptchaVerifier)
      .then(response => {
        window.confirmationResult = response;
        console.log(response);
        Swal.fire(
          'Excelente!',
          `Te enviaremos un mensaje de texto para confirmar al celular ${phone} `,
          'success'
        ).then(() => navigate('/insertCode'));
      })
      .catch(error => {
        console.log(error);
        Swal.fire(
          'Oops!',
          'Ha ocurrido un error no se puede envair el SMS',
          'error'
        );
      });
  };

  const onSubmit = data => {
    console.log(data);
    generateRecaptch();
    const appVerifier = window.recaptchaVerifier;
    sendSMS(data.phone, appVerifier);
  };

  return (
    <main>
      <h1>Inicio de sesión por número de celular</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type='number'
          placeholder='ingrese su celular'
          {...register('phone')}
        />
        <button>Enviar SMS</button>
      </form>
      <div id='recaptch-container'></div>
    </main>
  );
}

export default LoginWithPhone;
