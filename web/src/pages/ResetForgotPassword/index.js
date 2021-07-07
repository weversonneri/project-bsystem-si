/* eslint-disable no-unused-vars */
import { Formik, Form } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { Input } from '../../components/Input';

import api from '../../services/api';

import '../../styles/tailwind.css';

const validationSchema = yup.object().shape({
  // name: yup
  //   .string()
  //   .required('Digite seu nome'),
  // phoneNumber: yup
  //   .string()
  //   .matches(/(01)(\d){8}\b/, 'Enter a valid phone number')
  //   .required('Phone number is required'),
  // email: yup
  //   .string()
  //   .email('Precisamos de um email válido')
  //   .required('Preencha com seu email'),
  new_password: yup
    .string()
    .min(6, ({ min }) => `A senha precisa ter no minimo ${min} caracteres`)
    .required('Preencha a nova senha'),
  // .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
  // .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
  // .matches(/\d/, 'Password must have a number')
  // .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, 'Password must have a special character')
  confirm_new_password: yup
    .string()
    .oneOf([yup.ref('new_password')], 'As senhas não coincidem')
    .required('Confirme a nova senha'),
});

export function ResetForgotPassword() {
  const history = useHistory();

  async function handleSubmit(values) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    try {
      await api.post('/reset-password', values, { params });
      toast.success('Senha alterada com sucesso', { autoClose: 3000 });
      history.push('/');
    } catch (err) {
      toast.error('Erro ao alterar senha', { autoClose: 3000 });
      console.error(err);
    }
  }

  return (
    <Formik
      initialValues={{
        new_password: '',
        confirm_new_password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {(formik) => (
        <div className="container mx-auto p-4 max-w-md ">
          <h1 className=" text-2xl sm:text-4xl my-6">Alterar senha</h1>
          <Form>
            <Input label="Senha" name="new_password" type="password" />
            <Input label="Confirmar Senha" name="confirm_new_password" type="password" />

            <div className=" flex justify-end">
              <button
                type="submit"
                className="py-2 px-4 my-8 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full sm:w-1/2
                          transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                Enviar
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}
