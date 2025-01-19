import {Vehicle} from "../model/Vehicle.ts";
import {useState} from "react";
import * as React from "react";
import {Staff} from "../model/Staff.ts";
import {useSelector} from "react-redux";
import {RootState} from "../store/Store.ts";
import {motion} from "framer-motion";
interface UpdateModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
    onUpdate: (updateVehicle: Vehicle) => void;
    vehicle: Vehicle;
}
function UpdateVehicle({ isModalOpen, setIsModalOpen, onUpdate, vehicle}: Readonly<UpdateModalProps>) {
    const staffMembers: Staff[] = useSelector((state: RootState) => state.staff);
    const [formData, setFormData] = useState({
        licencePlate: vehicle.licensePlate,
        category: vehicle.category,
        fuelType: vehicle.fuelType,
        status: vehicle.status,
        allocatedStaffId: vehicle.allocatedStaffMember.staffId,
        remarks: vehicle.remarks
    });
    function handleInputChange(e: React.ChangeEvent<HTMLInputElement| HTMLSelectElement| HTMLTextAreaElement>) {
        const {name, value} = e.target;
        setFormData({ ...formData, [name]: value});
    }
    function getStaff(staffId: string){
        const staff = staffMembers.find((staff: Staff) => staff.staffId === staffId);
        return staff;
    }
    function handleUpdateVehicle(){
        const allocatedStaff = getStaff(formData.allocatedStaffId);
        if (!allocatedStaff) {
            console.error('Staff member not found');
            return;
        }
        const updatedVehicle = {
            ...vehicle,
            ...formData,
            allocatedStaffMember: allocatedStaff
        }
        onUpdate(updatedVehicle);
        setIsModalOpen(false);
    }
    return (
        isModalOpen && (
            <motion.div
                className="fixed inset-0 z-50 flex justify-center items-center"
                initial={{opacity: 0}} // Initial fade-in for the overlay
                animate={{opacity: isModalOpen ? 1 : 0}} // Fade-in/out animation
                exit={{opacity: 0}} // Fade-out on close
                transition={{duration: 0.3}} // Smooth transition for the background
            >
                {/* Background overlay */}
                <motion.div
                    className="absolute inset-0 bg-gray-800"
                    initial={{opacity: 0}}
                    animate={{opacity: isModalOpen ? 0.5 : 0}} // Fade-in to 50% opacity
                    exit={{opacity: 0}} // Fade-out on close
                    transition={{duration: 0.3, ease: "easeInOut"}} // Smooth easing for the overlay
                ></motion.div>

                {/* Modal content */}
                <motion.div
                    className="bg-white rounded-lg p-8 w-full drop-shadow-2xl sm:w-[40vw]"
                    initial={{opacity: 0, scale: 0.8}} // Start slightly smaller and faded out
                    animate={{
                        opacity: isModalOpen ? 1 : 0,
                        scale: isModalOpen ? 1 : 0.8, // Zoom-in animation
                    }}
                    exit={{
                        opacity: 0, // Fade out
                        scale: 0.9, // Slight shrink
                        y: 50, // Slide down slightly for a smoother exit
                    }} // Shrink and fade out on close
                    transition={{
                        duration: 0.4, // Slightly longer for content to emphasize smoothness
                        ease: "easeInOut", // Professional easing
                    }}
                >
                    <h1 className="text-center text-xl font-semibold mb-5">Add Vehicle</h1>
                    <div className="overflow-y-auto h-[60vh] p-4">
                        {/* Vehicle Category */}
                        <div className="mb-6">
                            <label
                                htmlFor="vehicle-category"
                                className="block text-sm font-medium text-gray-900"
                            >
                                Vehicle Category
                            </label>
                            <input
                                type="text"
                                name="category"
                                id="vehicle-category"
                                required
                                className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                value={formData.category}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* License Plate Number */}
                        <div className="mb-6">
                            <label
                                htmlFor="license-plate-number"
                                className="block text-sm font-medium text-gray-900"
                            >
                                License Plate Number
                            </label>
                            <input
                                type="text"
                                name="licencePlate"
                                id="license-plate-number"
                                required
                                className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                value={formData.licencePlate}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Fuel Type */}
                        <div className="mb-6">
                            <label
                                htmlFor="fuel-type"
                                className="block text-sm font-medium text-gray-900"
                            >
                                Fuel Type
                            </label>
                            <select
                                name="fuelType"
                                id="fuel-type"
                                required
                                className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                value={formData.fuelType}
                                onChange={handleInputChange}
                            >
                                <option value="" disabled>
                                    Select Fuel Type
                                </option>
                                <option value="PETROL">PETROL</option>
                                <option value="DIESEL">DIESEL</option>
                                <option value="ELECTRIC">ELECTRIC</option>
                                <option value="HYBRID">HYBRID</option>
                            </select>
                        </div>

                        {/* Status */}
                        <div className="mb-6">
                            <label
                                htmlFor="status"
                                className="block text-sm font-medium text-gray-900"
                            >
                                Status
                            </label>
                            <select
                                name="status"
                                id="status"
                                required
                                className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                value={formData.status}
                                onChange={handleInputChange}
                            >
                                <option value="available">AVAILABLE</option>
                                <option value="out of service">OUT OF SERVICE</option>
                            </select>
                        </div>

                        {/* Remarks */}
                        <div className="mb-6">
                            <label
                                htmlFor="remarks"
                                className="block text-sm font-medium text-gray-900"
                            >
                                Remarks
                            </label>
                            <textarea
                                name="remarks"
                                id="remarks"
                                rows={4}
                                className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                value={formData.remarks}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>

                        {/* Allocated Staff */}
                        <div className="mb-6">
                            <label
                                htmlFor="allocated-staff"
                                className="block text-sm font-medium text-gray-900"
                            >
                                Allocated Staff
                            </label>
                            <select
                                name="allocatedStaffId"
                                id="allocated-staff"
                                required
                                className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                value={formData.allocatedStaffId}
                                onChange={handleInputChange}
                            >
                                <option value="" disabled>
                                    Select Staff Member
                                </option>
                                {staffMembers.map((staff) => (
                                    <option key={staff.staffId} value={staff.staffId}>
                                        {staff.firstName} {staff.lastName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="mt-8 font-semibold grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <button
                                id="btn-save"
                                className="bg-orange-600 w-full rounded-lg py-2 text-white hover:bg-orange-700 focus:outline-none"
                                onClick={handleUpdateVehicle}
                            >
                                Update
                            </button>
                        </div>
                        <div className="sm:col-span-3">
                            <button
                                id="close-modal"
                                className="bg-gray-300 w-full rounded-lg py-2 text-black hover:bg-gray-400 focus:outline-none"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        )
    );
}

export default UpdateVehicle;