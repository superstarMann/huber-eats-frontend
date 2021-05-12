import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { FormError } from '../components/form-error';
import { loginMutation, loginMutationVariables } from '../__generated__/loginMutation';
import huberLogo from '../images/eats-logo.svg';
import { Button } from '../components/button';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { isLoggedInVar } from '../apollo';


const LOGIN_MUTATION = gql`
mutation loginMutation($loginInput: LoginInput!) {
  login(input: $loginInput) {
    ok
    token
    error
  }
}
`;

interface ILoginForms{
  email:string;
  password:string;
}

export const Login = () => {
  const {register, getValues, errors, handleSubmit, formState} = useForm<ILoginForms>({mode: "onChange"})
  const onCompleted = (data: loginMutation) =>{
    const {login :{ok,token}} =data
    if(ok){
      console.log(token);
      isLoggedInVar(true);
    }
  }
  const [loginMutation, {data: loginMutationResult, loading}] = useMutation<loginMutation, loginMutationVariables>(LOGIN_MUTATION, {
    onCompleted
  });
  const onSubmit = () => {
    if(!loading){
      const {password, email} = getValues();
    loginMutation({
      variables:{
        loginInput:{
          email,
          password
        }
      },
    });
    }
  };
  

    return <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>Login | HuberEat</title>
      </Helmet>
      <div className='w-full max-w-screen-sm flex flex-col items-center px-5'>
      <img src={huberLogo} className='w-52 mb-10'/>
      <h4 className='w-full text-left text-2xl mb-5 font-medium'>돌아오신 것을 환영합니다</h4>
          <form 
             onSubmit={handleSubmit(onSubmit)} 
             className='grid gap-3 mt-5 w-full mb-5'>
            <input 
              ref={register({
                required: 'Email is required',
                pattern:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })} 
              required 
              name='email' 
              type="email" placeholder='EMAIL@something.com' 
              className='input transition-colors'
              />
                 {errors.email?.message && (
                   <FormError errorMessage={errors.email?.message}/>
                   )}
                   {errors.email?.type === 'pattern' && (
                   <FormError errorMessage={`Please enter a valid email`}/>
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
              <Button canClick={formState.isValid} loading={loading} actionText={"Create Account"}/>
              {loginMutationResult?.login.error && (<FormError errorMessage={loginMutationResult.login.error}/>)}
          </form>
          <div>
            New to Huber?{""}
            <Link to="/create-account" className=" text-lime-600 hover:underline ml-2">
              Create an Account
            </Link>
          </div>
          </div>
          </div>
} 