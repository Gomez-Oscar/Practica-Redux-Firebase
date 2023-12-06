import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  loginGoogle,
  loginWithEmailAndPassword,
} from '../../store/users/userActions';
import { firestore } from '../../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticate, user, error } = useSelector(store => store.user);
  const { register, handleSubmit } = useForm();
  const handleLogin = () => {
    dispatch(loginGoogle());
  };
  const handleLoginWithEmailAndPassword = data => {
    console.table(data);
    dispatch(loginWithEmailAndPassword(data));
  };
  useEffect(() => {
    if (error) {
      Swal.fire({
        title: 'Upss!!',
        text: 'Ha ocurrido un error, por favor verifica tus credenciales!',
        icon: 'error',
      });
    }
    if (error === false) {
      Swal.fire({
        title: `Excelente, usuario ${user.name}`,
        text: 'Ha inciado sesion de manera exitosa!',
        icon: 'success',
      }).then(() => navigate('/Home'));
    }
  }, [error]);
  return (
    <div>
      <form onSubmit={handleSubmit(handleLoginWithEmailAndPassword)}>
        <input
          type='email'
          placeholder='ingrese su correo '
          {...register('email')}
        />
        <input
          type='password'
          placeholder='ingrese su contraseña'
          {...register('password')}
        />
        <button type='submit'>Inicia Sesión</button>
      </form>
      <button type='button' onClick={() => handleLogin()}>
        Entrar con google
      </button>
      <button onClick={() => navigate('/LoginWithPhone')}>
        Entrar con número celular
      </button>
      <p>
        Crear Cuenta <Link to='/Register'>Aquí</Link>
      </p>
    </div>
  );
};

export default Login;
