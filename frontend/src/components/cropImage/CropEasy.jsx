/* eslint-disable react/prop-types */
import { useState } from 'react';
import Cropper from 'react-easy-crop'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import getCroppedImg from './cropImage';
import { updateProfilePicture } from '../../services/users';
import { useDispatch, useSelector } from "react-redux"
import { userActions } from '../../store/reducers/userReducer';
import { toast } from 'react-hot-toast'

const CropEasy = ({ photo, setOpenCrop }) => {
    const dispatch = useDispatch()
    const queryClient = useQueryClient()
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1); // 100%
    const [cropAreaPixels, setCropAreaPixels] = useState(null);

    const { userInfo } = useSelector(state => state.user)

    const { mutate, isPending } = useMutation({
        mutationFn: ({ token, formData }) => {
            return updateProfilePicture({ token, formData })
        },
        onSuccess: (data) => {
            dispatch(userActions.setUserInfo(data))
            setOpenCrop(false)
            localStorage.setItem("account", JSON.stringify(data))
            queryClient.invalidateQueries(['profile'])
            toast.success("Profile picture uploaded")
        },
        onError: (error) => {
            toast.error(error.message)
            console.log(error)
        }
    })

    const handleCropComplete = (cropArea, cropAreaPixels) => {
        setCropAreaPixels(cropAreaPixels)
    }

    const handleCropImage = async () => {
        try {
            const croppedImg = await getCroppedImg(photo.url, cropAreaPixels)

            const file = new File([croppedImg.file], `${photo?.file?.name}`, { type: photo?.file?.type });

            const formData = new FormData()
            formData.append("profilePicture", file)

            mutate({ token: userInfo.token, formData })
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    return (
        <div className="fixed z-[1000] inset-0 bg-black/50 flex justify-center p-5 overflow-auto">
            <div className="bg-white h-fit w-full p-5 rounded-lg sm:max-w-[350px]">
                <h2 className="font-semibold text-dark-hard mb-2">Crop Image</h2>
                <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                    <Cropper
                        image={photo?.url}
                        crop={crop} zoom={zoom}
                        aspect={1}
                        onZoomChange={setZoom}
                        onCropChange={setCrop}
                        onCropComplete={handleCropComplete} />
                </div>
                <div>
                    <label
                        className='block mt-2 mb-0.5 font-medium text-gray-900' htmlFor="zoomRange">
                        Zoom: {`${Math.round(zoom * 100)} %`}
                    </label>
                    <input
                        type="range"
                        id='zoomRange'
                        min={1}
                        max={3}
                        step={0.1}
                        value={zoom}
                        onChange={(e) => setZoom(e.target.value)}
                        className='w-full h-1 mb-4 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm'
                    />
                </div>
                <div className='flex justify-between gap-2 flex-wrap'>
                    <button
                        className='px-5 py-2.5 rounded-lg text-red-500 border border-red-500 text-sm font-semibold disabled:opacity-70'
                        onClick={() => {
                            setOpenCrop(false)
                        }}
                        disabled={isPending}
                    >
                        Cancel
                    </button>
                    <button
                        className='px-5 py-2.5 rounded-lg text-white font-semibold bg-blue-500 text-sm disabled:opacity-70'
                        onClick={handleCropImage}
                        disabled={isPending}
                    >
                        Crop & Upload
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CropEasy