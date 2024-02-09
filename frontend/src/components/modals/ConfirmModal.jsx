/* eslint-disable react/prop-types */

const ConfirmModal = ({ setIsModalOpen, confirmHandler, title, confirmActionLaebl, cancelActionLabel }) => {
    return (
        <div
            className='fixed bg-dark-hard/50 top-0 bottom-0 left-0 right-0 z-10'
        >
            <div className='flex items-center justify-center h-full'>
                <div className='bg-white rounded-md px-10 py-20'>
                    <h3 className='font-bold text-xl max-w-md text-center'>{title}</h3>
                    <div className='flex justify-center gap-4 mt-4'>
                        <button
                            className='bg-red-500 rounded-md px-4 py-2 font-semibold text-lg transition-all duration-300 text-white hover:bg-red-600'
                            onClick={() => setIsModalOpen(false)}
                        >
                            {cancelActionLabel}
                        </button>
                        <button
                            className='bg-blue-500 rounded-md px-4 py-2 font-semibold text-lg transition-all duration-300 text-white hover:bg-blue-600'
                            onClick={confirmHandler}
                        >
                            {confirmActionLaebl}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal