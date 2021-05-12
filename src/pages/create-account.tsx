import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { FormError } from '../components/form-error';
import huberLogo from '../images/eats-logo.svg';
import { Button } from '../components/button';
import { Link, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { UserRole } from '../__generated__/globalTypes';
import { createAccountMutation, createAccountMutationVariables } from '../__generated__/createAccountMutation';


const CREATE_ACCOUNT_MUTATION = gql`
mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput){
        ok
        error
    }
}
`;

interface ICreateAccountForms{
  email:string;
  password:string;
  role: UserRole;
}

export const CreateAccount = () => {
  const {register, getValues, errors, handleSubmit, formState, watch} = useForm<ICreateAccountForms>({
      mode: "onChange",
      defaultValues:{ //초기 설정값
          role: UserRole.Client
      }
    });

  const history = useHistory();
  const onCompleted = (data: createAccountMutation) => {
      const {createAccount: {ok, error}} = data;
      if(ok){
          history.push("/login")
      }
  }
  const [createAccountMutation, {loading, data: createAccountMutationResult}] = useMutation<createAccountMutation, createAccountMutationVariables>(CREATE_ACCOUNT_MUTATION,{onCompleted});
  const onSubmit = () => {
      const {email, password, role} = getValues();
      if(!loading){
          createAccountMutation({
              variables:{
                  createAccountInput: {email, password, role}
              }
          })
      }
  };
  

    return <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>Create Account | HuberEat</title>
      </Helmet>
      <div className='w-full max-w-screen-sm flex flex-col items-center px-5'>
      <img src={huberLogo} className='w-52 mb-10'/>
      <h4 className='w-full text-left text-2xl mb-5 font-medium'>Let's get started</h4>
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
              type="email" placeholder='EMAIL' 
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

              <select name="role" ref={register({required: true})} className="input">
                {Object.keys(UserRole).map(role => <option>{role}</option>)}
              </select>

              <Button canClick={formState.isValid} loading={loading} actionText={"Create Account"}/>
              {createAccountMutationResult?.createAccount.error &&(
                   <FormError errorMessage={createAccountMutationResult.createAccount.error}/>
              )
              }
          </form>
          <div>
            Already have an account?{""}
            <Link to="/login" className=" text-lime-600 hover:underline ml-2">
              Log in now
            </Link>
          </div>
          </div>
          </div>
} 