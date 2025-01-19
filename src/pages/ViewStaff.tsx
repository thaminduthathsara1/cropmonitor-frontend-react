import { motion } from "framer-motion";
import { Staff } from "../model/Staff";
import {formatDate} from "../util/util.ts";

interface ViewStaffProps {
    isOpenModal: boolean;
    setIsOpenModal: (value: boolean) => void;
    staff: Staff;
}

function ViewStaff({ isOpenModal, setIsOpenModal, staff }: Readonly<ViewStaffProps>) {
    return (
        isOpenModal && (
            <motion.div
                className="fixed inset-0 z-50 flex justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: isOpenModal ? 1 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                {/* Background overlay */}
                <motion.div
                    className="absolute inset-0 bg-gray-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isOpenModal ? 0.5 : 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                ></motion.div>

                {/* Modal content */}
                <motion.div
                    className="bg-white rounded-lg p-8 w-full drop-shadow-2xl sm:w-[60vw]"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: isOpenModal ? 1 : 0, scale: isOpenModal ? 1 : 0.8 }}
                    exit={{ opacity: 0, scale: 0.9, y: 50 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                    <h1 className="text-center text-xl font-semibold mb-5">View Staff Member</h1>

                    <div className="overflow-y-auto h-[60vh] custom-scrollbar p-2 font-medium">
                        {/* First Name and Last Name */}
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mt-10">
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-900">First name</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        value={staff.firstName}
                                        readOnly
                                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 sm:text-sm outline outline-2 -outline-offset-1 outline-gray-300"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-900">Last name</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        value={staff.lastName}
                                        readOnly
                                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 sm:text-sm outline outline-2 -outline-offset-1 outline-gray-300"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Designation and Gender */}
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-900">Designation</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        value={staff.designation}
                                        readOnly
                                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 sm:text-sm outline outline-2 -outline-offset-1 outline-gray-300"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-900">Gender</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        value={staff.gender}
                                        readOnly
                                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 sm:text-sm outline outline-2 -outline-offset-1 outline-gray-300"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Date of Birth and Contact Number */}
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-900">Date of Birth</label>
                                <div className="mt-2">
                                    <input
                                        type="date"
                                        value={formatDate(staff.dob)}
                                        readOnly
                                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 sm:text-sm outline outline-2 -outline-offset-1 outline-gray-300"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-900">Contact Number</label>
                                <div className="mt-2">
                                    <input
                                        type="tel"
                                        value={staff.contactNo}
                                        readOnly
                                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 sm:text-sm outline outline-2 -outline-offset-1 outline-gray-300"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Email and Role */}
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-900">Email</label>
                                <div className="mt-2">
                                    <input
                                        type="email"
                                        value={staff.email}
                                        readOnly
                                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 sm:text-sm outline outline-2 -outline-offset-1 outline-gray-300"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-900">Role</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        value={staff.role}
                                        readOnly
                                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 sm:text-sm outline outline-2 -outline-offset-1 outline-gray-300"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Address Fields */}
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-900">Street Address</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        value={staff.addressLine01}
                                        readOnly
                                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 sm:text-sm outline outline-2 -outline-offset-1 outline-gray-300"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-900">Address Line 2</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        value={staff.addressLine02|| ""}
                                        readOnly
                                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 sm:text-sm outline outline-2 -outline-offset-1 outline-gray-300"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Country, Province, City */}
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-900">Country</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        value={staff.addressLine03}
                                        readOnly
                                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 sm:text-sm outline outline-2 -outline-offset-1 outline-gray-300"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-900">Province</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        value={staff.addressLine04}
                                        readOnly
                                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 sm:text-sm outline outline-2 -outline-offset-1 outline-gray-300"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-900">City</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        value={staff.addressLine05}
                                        readOnly
                                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 sm:text-sm outline outline-2 -outline-offset-1 outline-gray-300"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Postal Code and Joined Date */}
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-900">Postal Code</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        value={staff.postalCode}
                                        readOnly
                                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 sm:text-sm outline outline-2 -outline-offset-1 outline-gray-300"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-900">Joined Date</label>
                                <div className="mt-2">
                                    <input
                                        type="date"
                                        value={formatDate(staff.joinedDate)}
                                        readOnly
                                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 sm:text-sm outline outline-2 -outline-offset-1 outline-gray-300"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 font-semibold ">
                        <div className="sm:col-span-6">
                            <div className="mt-2">
                                <button
                                    onClick={() => setIsOpenModal(false)}
                                    className="bg-gray-300 w-full rounded-lg py-2 px-4 text-black hover:bg-gray-400 focus:outline-none "
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        )
    );
}

export default ViewStaff;
