import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { login } from '../redux/state/userSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { VALIDATION_PATTERN } from '../helper/common';

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm({})
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = (data) => {
        dispatch(login({ data }))
            .unwrap()
            .then((res) => {
                toast.dismiss();
                if (res.status === true) {
                    toast.success(res.message);
                    navigate('/home')
                } else {
                    toast.error(res.message);
                }
            })
    }
    return (
        <div className="registration-form">
            <form autoComplete='off' onSubmit={handleSubmit(handleClick)}>
                <div className="form-icon">
                    <span><i className="icon icon-user"></i></span>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control item" id="email" placeholder="Email"
                        {...register("email", {
                            required: {
                                value: true,
                                message: "Email is required"
                            },
                            pattern: {
                                value: VALIDATION_PATTERN.EMAIL,
                                message: "Enter a valid email"
                            }
                        })}
                    />
                    {errors.email && <p className='text-danger'>{errors.email.message}</p>}
                </div>
                <div className="form-group">
                    <input type="text" className="form-control item" id="password" placeholder="Password"
                        {...register("password", {
                            required: {
                                value: true,
                                message: "Password is required"
                            },
                            pattern: {
                                value: VALIDATION_PATTERN.PASSWORD,
                                message: "Your password must be have at least 8 characters long 1 uppercase & 1 lowercase character & 1 number & 1 special Character"
                            }
                        })}
                    />
                    {errors.password && <p className='text-danger'>{errors.password.message}</p>}
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-block create-account">LOGIN</button>
                </div>
            </form>
        </div>
    )
}

export default Login