import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { getUserProfile, updateProfile } from "../../services/users";
import ProfilePicture from "../../components/ProfilePicture";
import { userActions } from "../../store/reducers/userReducer";
import { toast } from 'react-hot-toast'

const Profile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const queryClient = useQueryClient()
    const { userInfo } = useSelector(state => state.user)

    useEffect(() => {
        if (!userInfo) {
            navigate("/")
        }
    }, [userInfo, navigate]);

    const {
        data: profileData,
        isLoading: profileIsLoading,
        // error: profileError
    } = useQuery({
        queryFn: () => {
            return getUserProfile({ token: userInfo.token })
        },
        queryKey: ["profile"],
    })

    const {
        register,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm({
        defaultValues: {
            name: "", email: "", password: ""
        },
        values: {
            name: profileIsLoading ? "" : profileData.name,
            email: profileIsLoading ? "" : profileData.email,
        },
        mode: 'onChange'
    })

    const { mutate, isPending: updateProfileIsLoading } = useMutation({
        mutationFn: ({ name, email, password }) => {
            return updateProfile({
                token: userInfo.token,
                userData: { name, email, password }
            })
        },
        onSuccess: (data) => {
            dispatch(userActions.setUserInfo(data))
            localStorage.setItem("account", JSON.stringify(data))
            queryClient.invalidateQueries(["profile"])
            toast.success("Profile is updated")
        },
        onError: (error) => {
            toast.error(error.message)
            console.log(error)
        }
    })

    const submitHandler = (data) => {
        const { name, email, password } = data
        mutate({ name, email, password })
    }

    return (
        <section className="relative py-10 h-full flex flex-col max-w-sm mx-auto justify-center">
            <div className="pb-5">
                <ProfilePicture avatar={profileData?.avatar} />
            </div>
            <form onSubmit={handleSubmit(submitHandler)}>
                <div className="flex flex-col mb-6 w-full">
                    <label
                        htmlFor="name"
                        className="text-[#5a7184] font-semibold block"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        {...register("name", {
                            minLength: {
                                value: 1,
                                message: "Name length must be at least 1 character"
                            },
                            required: {
                                value: true,
                                message: "Name is required"
                            }
                        })}
                        placeholder="Enter name"
                        className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border border-[#c3cad9] ${errors.name ? "border-red-500" : "border-[#c3cad9]"}`}
                    />
                    {errors.name?.message && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.name?.message}
                        </p>
                    )}
                </div>
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
                        New Password (Optional)
                    </label>
                    <input
                        type="password"
                        id="password"
                        {...register("password")}
                        placeholder="Enter new password"
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
                    disabled={!isValid || profileIsLoading || updateProfileIsLoading}
                    className="bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    Update
                </button>
            </form>
        </section>
    )
}

export default Profile