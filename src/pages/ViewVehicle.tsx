import {Vehicle} from "../model/Vehicle.ts";
import {motion} from "framer-motion";

interface ViewVehicleProps {
    isOpenModal: boolean;
    setIsOpenModal: (value: boolean) => void;
    vehicle: Vehicle;
}
function ViewVehicle({isOpenModal, setIsOpenModal, vehicle}: Readonly<ViewVehicleProps>) {
    return (
        isOpenModal && (
            <motion.div
                className="fixed inset-0 z-50 flex justify-center items-center"
                initial={{opacity: 0}}
                animate={{opacity: isOpenModal ? 1 : 0}}
                exit={{opacity: 0}}
                transition={{duration: 0.3}}
            >
                <motion.div
                    className="absolute inset-0 bg-gray-800"
                    initial={{opacity: 0}}
                    animate={{opacity: isOpenModal ? 0.5 : 0}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.3, ease: "easeInOut"}}
                ></motion.div>

                {/* Modal content */}
                <motion.div
                    className="bg-white rounded-lg p-8 w-full drop-shadow-2xl sm:w-[40vw]"
                    initial={{opacity: 0, scale: 0.8}}
                    animate={{opacity: isOpenModal ? 1 : 0, scale: isOpenModal ? 1 : 0.8}}
                    exit={{opacity: 0, scale: 0.9, y: 50}}
                    transition={{duration: 0.4, ease: "easeInOut"}}
                >
                <h1 className="text-center text-xl font-semibold mb-5">View Vehicle</h1>
                <div className="overflow-y-auto h-[60vh] p-4">
                    {/* Vehicle Category */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-900">Vehicle Category</label>
                        <input
                            type="text"
                            readOnly
                            value={vehicle.category}
                            className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                        />
                    </div>

                    {/* License Plate Number */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-900">License Plate Number</label>
                        <input
                            type="text"
                            readOnly
                            value={vehicle.licensePlate}
                            className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                        />
                    </div>

                    {/* Fuel Type */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-900">Fuel Type</label>
                        <input
                            type="text"
                            readOnly
                            value={vehicle.fuelType}
                            className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                        />
                    </div>

                    {/* Status */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-900">Status</label>
                        <input
                            type="text"
                            readOnly
                            value={vehicle.status}
                            className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                        />
                    </div>

                    {/* Remarks */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-900">Remarks</label>
                        <textarea
                            readOnly
                            rows={4}
                            value={vehicle.remarks}
                            className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                        ></textarea>
                    </div>

                    {/* Allocated Staff */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-900">Allocated Staff</label>
                        <input
                            type="text"
                            readOnly
                            value={`${vehicle.allocatedStaffMember?.firstName || ""} ${vehicle.allocatedStaffMember?.lastName || ""}`.trim() || "Not Allocated"}
                            className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                        />
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="mt-10 sm:grid-cols-6 font-semibold">
                    <button
                        onClick={() => setIsOpenModal(false)}
                        className="bg-gray-300 w-full rounded-lg py-2 px-4 text-black hover:bg-gray-400 focus:outline-none"
                    >
                        Close
                    </button>
                </div>
                </motion.div>
            </motion.div>
        )
    );
}

export default ViewVehicle;