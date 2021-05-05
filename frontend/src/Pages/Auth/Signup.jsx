import React from "react";
import { AuthButton, AuthForm } from "./Auth";
import { useDispatch, useSelector } from "react-redux";
import { getSignupHandler } from "../../Redux/Auth/action";

const initState = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
};

function Signup() {
  const [formData, setFormData] = React.useState(initState);
  const isLoading = useSelector((state) => state.authReducer.isLoading);
  const isError = useSelector((state) => state.authReducer.isError);
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  const dispatch = useDispatch();

  function onChangeHandler(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  React.useState(() => {}, [isLoading]);

  function onSubmitHandler(e) {
    e.preventDefault();
    dispatch(getSignupHandler(formData));
    if (isError) {
      return alert("Something went wrong");
    }
    if (isAuth) {
      return alert("Success");
    }
  }

  const { first_name, last_name, email, password } = formData;
  return (
    <AuthForm onSubmit={onSubmitHandler}>
      <div>
        <input
          onChange={onChangeHandler}
          name="first_name"
          value={first_name}
          placeholder="First Name"
          required
        />
      </div>
      <div>
        <input
          onChange={onChangeHandler}
          name="last_name"
          value={last_name}
          placeholder="Last Name"
          required
        />
      </div>
      <div>
        <input
          onChange={onChangeHandler}
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          required
        />
      </div>
      <div>
        <input
          onChange={onChangeHandler}
          name="password"
          value={password}
          placeholder="Password"
          type="password"
          required
        />
      </div>
      <div>
        <AuthButton disabled={isLoading}>Sign Up</AuthButton>
      </div>
    </AuthForm>
  );
}

export default Signup;
