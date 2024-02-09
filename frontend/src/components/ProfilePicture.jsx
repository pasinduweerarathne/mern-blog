/* eslint-disable react/prop-types */
import { HiOutlineCamera } from 'react-icons/hi'
import CropEasy from './cropImage/CropEasy'
import { useState } from 'react';
import { createPortal } from "react-dom"
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfilePicture } from '../services/users';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../store/reducers/userReducer';
import toast from 'react-hot-toast';
import ConfirmModal from './modals/ConfirmModal';

const ProfilePicture = ({ avatar }) => {
    const dispatch = useDispatch()
    const queryClient = useQueryClient()
    const [openCrop, setOpenCrop] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { userInfo } = useSelector(state => state.user)

    const { mutate, isPending } = useMutation({
        mutationFn: ({ token, formData }) => {
            return updateProfilePicture({ token, formData })
        },
        onSuccess: (data) => {
            dispatch(userActions.setUserInfo(data))
            setOpenCrop(false)
            setIsModalOpen(false)
            localStorage.setItem("account", JSON.stringify(data))
            queryClient.invalidateQueries(['profile'])
            toast.success("Profile picture removed")
        },
        onError: (error) => {
            toast.error(error.message)
            console.log(error)
        }
    })

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setPhoto({ url: URL.createObjectURL(file), file })
        setOpenCrop(true)
    }

    const handleDeleteImage = () => {
        const formData = new FormData()
        // set formData to undefined to remove the image from profile data
        formData.append('profilePicture', undefined)
        mutate({ token: userInfo.token, formData })
    }

    return (
        <>
            {userInfo.avatar && isModalOpen && (
                <ConfirmModal
                    confirmHandler={handleDeleteImage}
                    setIsModalOpen={setIsModalOpen}
                    title={"Are you sure you want to remove this profile picture?"}
                    cancelActionLabel={"Cancel"}
                    confirmActionLaebl={"Confirm"}
                />
            )}
            {openCrop && (
                createPortal(
                    <CropEasy
                        photo={photo}
                        setOpenCrop={setOpenCrop}
                    />,
                    document.getElementById("portal"))
            )}
            <div className="w-full flex items-center gap-x-4">
                <div className='relative w-20 h-20 rounded-full outline outline-offset-2 outline-1 outline-primary overflow-hidden'>
                    <label htmlFor="profilePicture" className='cursor-pointer absolute inset-0 rounded-full bg-transparent'>
                        {avatar ? (
                            <img
                                src={`http://localhost:5000/uploads/${avatar}`}
                                alt="profile"
                                className='object-cover'
                            />
                        ) : (
                            <div className='w-full h-full bg-blue-50/10 flex justify-center items-center'>
                                <HiOutlineCamera className='w-7 h-auto text-primary' />
                            </div>
                        )}
                    </label>
                    <input type="file" className="sr-only" id='profilePicture' onChange={handleFileChange} />
                </div>
                <button
                    type="button"
                    className='border border-red-500 rounded-lg px-4 py-2 text-red-500 font-semibold disabled:cursor-not-allowed disabled:opacity-70'
                    onClick={() => setIsModalOpen(true)}
                    disabled={!userInfo?.avatar || isPending}
                >
                    Delete
                </button>
            </div>
        </>
    )
}

export default ProfilePicture