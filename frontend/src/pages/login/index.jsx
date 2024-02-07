/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { signin } from "../../services"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from "../../store/reducers/userReducer"
import { useEffect } from "react"

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userInfo } = useSelector(state => state.user)

    const { mutate, isPending } = useMutation({
        mutationFn: ({ email, password }) => {
            return signin({ email, password })
        },
        onSuccess: (data) => {
            dispatch(userActions.setUserInfo(data))
            localStorage.setItem("account", JSON.stringify(data))
        },
        onError: (error) => toast.error(error.message)
    })

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }, mode: 'onChange'
    })

    useEffect(() => {
        if (userInfo) {
            navigate("/")
        }
    }, [userInfo, navigate]);

    const submitHandler = (data) => {
        const { email, password } = data
        mutate({ email, password })
    }

    return (
        <section className="py-10 h-full flex flex-col max-w-sm mx-auto justify-center">
            <h1 className="font-roboto text-2xl font-bold text-center text-dark-hard mb-8">
                Sign In
            </h1>
            <form onSubmit={handleSubmit(submitHandler)}>
                <div className="flex flex-col mb-6 w-full">
                    <label
                        htmlFor="email"
                        className="text-[#5a7184] font-semibold block"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        {...register("email", {
                            required: {
                                value: true,
                                message: "Email is required"
                            },
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: "Please enter a valid email"
                            }
                        })}
                        placeholder="Enter email"
                        className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${errors.name ? "border-red-500" : "border-[#c3cad9]"}`}
                    />
                    {errors.email?.message && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.email?.message}
                        </p>
                    )}
                </div>
                <div className="flex flex-col mb-6 w-full">
                    <label
                        htmlFor="password"
                        className="text-[#5a7184] font-semibold block"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        {...register("password", {
                            required: {
                                value: true,
                                message: "Password is required"
                            },
                            minLength: {
                                value: 6,
                                message: "Password length must be at least 6 characters"
                            }
                        })}
                        placeholder="Enter password"
                        className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${errors.name ? "border-red-500" : "border-[#c3cad9]"}`}
                    />
                    {errors.password?.message && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.password?.message}
                        </p>
                    )}
                </div>
                <button
                    type="submit"
                    disabled={!isValid || isPending}
                    className="bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    Sign In
                </button>
                <p className="text-sm font-semibold text-[#5a7184]">
                    You don't have an account?{" "}
                    <Link to="/register" className="text-primary">
                        Register now
                    </Link>
                </p>
            </form>
        </section>
    )
}

export default Login