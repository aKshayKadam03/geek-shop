import React from "react";
import { AuthButton, AuthForm } from "./Auth";
import { useDispatch, useSelector } from "react-redux";
import { getLoginHandler } from "../../Redux/Auth/action";

const initState = {
  email: "",
  password: "",
};

function Login() {
  const [formData, setFormData] = React.useState(initState);
  const [message, setMessage] = React.useState(false);
  const isLoading = useSelector((state) => state.authReducer.isLoading);
  const isError = useSelector((state) => state.authReducer.isError);
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  const statusCode = useSelector((state) => state.authReducer.status);
  const dispatch = useDispatch();

  function onChangeHandler(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    dispatch(getLoginHandler(formData));
    if (isError) {
      return alert("Something went wrong");
    }
    if (isAuth) {
      return alert("Success");
    }
  }

  const { email, password } = formData;
  return (
    <>
      <AuthForm onSubmit={onSubmitHandler}>
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
          <AuthButton disabled={isAuth}>
            {isAuth ? (
              <>
                Success
                <i class="far fa-check-circle"> </i>
              </>
            ) : (
              "Login"
            )}
          </AuthButton>
        </div>
      </AuthForm>
    </>
  );
}

export default Login;
