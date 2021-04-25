import React from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useForm } from 'react-hook-form';
import { FormError } from '../components/form-error';

const LOGIN_MUTATION = gql`
 mutation TestMutation($email: String!, $password: String!){
   login(input:{
     email: $email,
     password: $password
   }) {
     ok
     token
     error
   }
 }
`;

interface ILoginForms{
  email?:string;
  password?:string;
}

export const Login = () => {
  const {register, getValues, errors, handleSubmit} = useForm<ILoginForms>()
  const [loginMutation] = useMutation(LOGIN_MUTATION);
  const onSubmit = () => {
    console.log(getValues())
  }

    return <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-lg pt-7 pb-7 rounded-lg text-center">        
          <h3 className='text-2xl text-gray-800'>Log In</h3>
          <form 
             onSubmit={handleSubmit(onSubmit)} 
             className='grid gap-3 mt-5 px-5'>
            <input 
              ref={register({required: 'Email is required', minLength: 10})} 
              required 
              name='email' 
              type="email" placeholder='Email' 
              className='input'/>
                 {errors.email?.message && (
                   <FormError errorMessage={errors.email?.message}/>
                   )}
            <input 
              ref={register({required: 'Password is required', minLength: 10})} 
              required 
              name='password' 
              type="password" 
              placeholder='Password' 
              className='input'/>
              {errors.password?.message && (
                   <FormError errorMessage={errors.password?.message}/>
                   )}
              {errors.password?.type === 'minLength' && (
                   <FormError errorMessage='Password must be more than 10 chars'/>
              )}
              <button className='mt-3 btn'>
                Login
              </button>
          </form>
      </div>
      </div>
} 