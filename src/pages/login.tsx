import React from 'react';

export const Login = () => {
    return<span>Login</span>
} 
/*
<div>
<h1>Logged Out</h1>
<form onSubmit={handleSubmit(onSubmit, onInvalid)}>
  <div>
    <input
      ref={register({
        required: "This is required",
        pattern: /^[A-Za-z0-9._%+-]+@gmail.com$/,
      })}
      name="email"
      type="email"
      placeholder="email"
    />
    {errors.email?.message && (
      <span className="font-bold text-red-600">
        {errors.email?.message}
      </span>
    )}
    {errors.email?.type === "pattern" && (
      <span className="font-bold text-red-600">Only gmail allowed</span>
    )}
  </div>
  <div>
    <input
      ref={register({ required: true })}
      name="password"
      type="password"
      required
      placeholder="password"
    />
  </div>
  <button className="bg-yellow-300 text-white">Submit</button>
</form>
</div>
*/