import { firestore } from '../../firebase/firebaseConfig'
import { collection, getDocs, addDoc, deleteDoc, doc, setDoc } from 'firebase/firestore'
import { addProduct, deleteProduct, setError, setProducts, updateProduct } from './productSlice'

const productCollection = collection(firestore, 'productos')

export const getData = () => {
  return async (dispatch) => {
    try {
      const tempArr = []
      const response = await getDocs(productCollection);
      response.forEach((item) => {
          tempArr.push({ id: item.id, ...item.data() })
      });
      dispatch(setProducts(tempArr));
    } catch (error) {
      dispatch(
        setError({ error: true, code: error.code, message: error.message })
      );
    }
  };
}

export const createData = (product) => {
  return async (dispatch) => {
    try {
      let tempObject = { ...product }
      const response = await addDoc(productCollection, product);
      console.log(response);
      tempObject.id = response.id;
      dispatch(addProduct(tempObject));
    } catch (error) {
      dispatch(
        setError({ error: true, code: error.code, message: error.message })
      );
    }
  };
}

export const updateData = (product) => {
  const documentRef = doc(productCollection, product.id); /** Referencia del documento */
  return async (dispatch) => {
    try {
      dispatch(updateProduct(product));
      delete product.id;
      await setDoc( documentRef, product);
      // console.log(response);
    } catch (error) {
      dispatch(
        setError({ error: true, code: error.code, message: error.message })
      );
    }
  };
}

export const deleteData = (id) => {
  const documentRef = doc(productCollection, id);
  return async (dispatch) => {
    try {
      dispatch(deleteProduct(id));
      const response = await deleteDoc(documentRef);
      console.log(response);
    } catch (error) {
      console.log(error);
      dispatch(
        setError({ error: true, code: error.code, message: error.message })
      );
    }
  };
}