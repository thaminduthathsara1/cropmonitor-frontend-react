import React, {useEffect, useState} from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../store/Store.ts";
import { Field } from "../model/Field.ts";
import { Staff } from "../model/Staff.ts";
import ImageSlider from "../component/ImageSlider.tsx";

interface FieldActionsProps {
    field: Field;
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    onUpdateField: (field: Field) => void;
    onDeleteField: (fieldCode: string) => void;
}

function FieldActions({
                          field,
                          isModalOpen,
                          setIsModalOpen,
                          onUpdateField,
                          onDeleteField,
                      }: Readonly<FieldActionsProps>) {
    const staffMembers: Staff[] = useSelector((state: RootState) => state.staff);
    const [selectedStaff, setSelectedStaff] = useState<Staff[]>(field.staffs); // Pre-populate with existing staff
    const fieldImages = [field.fieldImage1, field.fieldImage2].filter(Boolean);
    const [formData, setFormData] = useState({
        fieldName: field.fieldName,
        fieldSize: field.fieldSize,
        latitude: field.fieldLocation.latitude,
        longitude: field.fieldLocation.longitude,
        fieldStaffIds: field.staffs.map((staff) => staff.staffId),
        fieldImage1: field.fieldImage1,
        fieldImage2: field.fieldImage2,
    });

    function handleInputChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    // Filter available staff for the dropdown (staff not already selected)
    const availableStaff = staffMembers.filter(
        (staff) => !selectedStaff.some((s) => s.staffId === staff.staffId)
    );

    function handleStaffSelection(e: React.ChangeEvent<HTMLSelectElement>) {
        const staffId = e.target.value;
        if (staffId) {
            const staff = staffMembers.find((staff) => staff.staffId === staffId);
            if (staff && !selectedStaff.some((s) => s.staffId === staffId)) {
                setSelectedStaff([...selectedStaff, staff]);
            }
            e.target.value = ""; // Reset dropdown selection
        }
    }

    function removeStaffBadge(staffId: string) {
        setSelectedStaff(
            selectedStaff.filter((staff) => staff.staffId !== staffId)
        );
    }

    function handleFileUpload(
        e: React.ChangeEvent<HTMLInputElement>,
        imageKey: "fieldImage1" | "fieldImage2"
    ) {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setFormData((prevData) => ({
                    ...prevData,
                    [imageKey]: reader.result as string,
                }));
            };
            reader.readAsDataURL(file);
        }
    }
    // Update the field with the new data
    useEffect(() => {
        if (isModalOpen) {
            setFormData({
                fieldName: field.fieldName,
                fieldSize: field.fieldSize,
                latitude: field.fieldLocation.latitude,
                longitude: field.fieldLocation.longitude,
                fieldStaffIds: field.staffs.map((staff) => staff.staffId),
                fieldImage1: '',
                fieldImage2: '',
            });
            setSelectedStaff(field.staffs);
        }
    }, [isModalOpen, field.staffs]);

    function handleUpdate() {
        const updatedField: Field = {
            ...field,
            fieldName: formData.fieldName,
            fieldSize: parseFloat(formData.fieldSize),
            fieldLocation: {
                latitude: parseFloat(formData.latitude),
                longitude: parseFloat(formData.longitude),
            },
            staffs: selectedStaff,
            fieldImage1: formData.fieldImage1 ? formData.fieldImage1 : field.fieldImage1,
            fieldImage2: formData.fieldImage2 ? formData.fieldImage2 : field.fieldImage2,
        };
        onUpdateField(updatedField);
        setIsModalOpen(false);
        clearForm();
    }

    function handleDelete() {
        onDeleteField(field.fieldCode);
        setIsModalOpen(false);
    }

    function clearForm() {
        setFormData({
            fieldName: "",
            fieldSize: 0,
            latitude: 6.9271,
            longitude: 79.8612,
            fieldStaffIds: [],
            fieldImage1: "",
            fieldImage2: "",
        });
        setSelectedStaff([]);
    }


    return (
       isModalOpen && (
           <motion.div
               className="fixed inset-0 z-50 flex justify-center items-center"
               initial={{opacity: 0}}
               animate={{opacity: 1}}
               exit={{opacity: 0}}
               transition={{duration: 0.3}}
           >
               <motion.div
                   className="absolute inset-0 bg-gray-800 opacity-50"
                   initial={{opacity: 0}}
                   animate={{opacity: 0.5}}
                   exit={{opacity: 0}}
                   transition={{duration: 0.3}}
               ></motion.div>

               <motion.div
                   className="bg-white rounded-lg p-8 w-full drop-shadow-2xl  sm:w-[56vw] transform scale-95 transition-transform duration-300 ease-out"
                   initial={{opacity: 0, scale: 0.8}}
                   animate={{opacity: 1, scale: 1}}
                   exit={{opacity: 0, scale: 0.9}}
                   transition={{duration: 0.4}}
               >
                   <h1 className="text-center text-xl font-semibold mb-5">
                       View Field Details
                   </h1>

                   <div className="overflow-y-auto h-[70vh] p-4 custom-scrollbar">
                       <ImageSlider images={fieldImages ? fieldImages : []}/>
                       <div className="mb-6">
                           <label
                               htmlFor="field-name"
                               className="block text-sm font-medium text-gray-900"
                           >
                               Field Name
                           </label>
                           <input
                               type="text"
                               name="fieldName"
                               id="field-name"
                               required
                               maxLength={50}
                               value={formData.fieldName}
                               onChange={handleInputChange}
                               className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-gray-900 outline outline-2 outline-gray-300 placeholder:text-gray-400 focus:outline-green-600"
                           />
                       </div>
                       <div className="mb-6">
                           <label
                               htmlFor="field-size"
                               className="block text-sm font-medium text-gray-900"
                           >
                               Field Size (in hectares)
                           </label>
                           <input
                               type="number"
                               name="fieldSize"
                               id="field-size"
                               required
                               min="0.01"
                               step="0.01"
                               value={formData.fieldSize}
                               onChange={handleInputChange}
                               className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-gray-900 outline outline-2 outline-gray-300 placeholder:text-gray-400 focus:outline-green-600"
                           />
                       </div>
                       <div className="mb-6">
                           <label
                               htmlFor="staff-dropdown"
                               className="block text-sm font-medium text-gray-900"
                           >
                               Allocated Staff
                           </label>
                           <select
                               id="staff-dropdown"
                               onChange={handleStaffSelection}
                               className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-gray-900 outline outline-2 outline-gray-300 focus:outline-green-600"
                           >
                               <option value="" className="hover:bg-green-200">
                                   Select Staff
                               </option>
                               {availableStaff.map((staff) => (
                                   <option key={staff.staffId} value={staff.staffId}>
                                       {`${staff.firstName} ${staff.lastName}`}
                                   </option>
                               ))}
                           </select>
                           <div id="selected-staff" className="flex flex-wrap gap-2 mt-4">
                               {selectedStaff.map((staff) => (
                                   <span
                                       key={staff.staffId}
                                       className="bg-green-200 text-green-800 rounded-full px-3 py-1 text-sm flex items-center gap-2"
                                   >
                                    {staff.firstName} {staff.lastName}
                                       <button
                                           type="button"
                                           className="text-red-600 hover:text-red-800"
                                           onClick={() => removeStaffBadge(staff.staffId)}
                                       >
                                        &times;
                                    </button>
                                </span>
                               ))}
                           </div>
                       </div>

                       {/* Image upload inputs */}
                       <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                           {/* First File Upload Container */}
                           <div id="file-upload-container1" className="relative">
                               <label
                                   htmlFor="file1"
                                   className={`flex flex-col items-center justify-center ${formData.fieldImage1 ? "hidden" : "block"} bg-gray-300 p-10 rounded-2xl border-2 border-dashed border-gray-500 shadow-xl cursor-pointer hover:bg-gray-200 transition-all`}
                               >
                                   <svg
                                       className="h-12 mb-4 fill-green-600"
                                       viewBox="0 0 640 512"
                                   >
                                       <path
                                           d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
                                   </svg>
                                   <p className="text-gray-700 text-lg font-semibold">
                                       Drag and Drop
                                   </p>
                                   <p className="text-gray-600">or</p>
                                   <span
                                       className="bg-green-600 text-white px-5 py-2 rounded-lg mt-2 hover:bg-green-700 transition-all">
                                    Browse file
                                </span>
                                   <input
                                       id="file1"
                                       type="file"
                                       accept="image/*"
                                       className="hidden"
                                       onChange={(e) => handleFileUpload(e, "fieldImage1")}
                                   />
                               </label>
                               {formData.fieldImage1 && (
                                   <img
                                       src={formData.fieldImage1}
                                       alt="Preview 1"
                                       className="rounded-lg shadow-xl object-cover z-50 w-full h-60"
                                   />
                               )}
                           </div>

                           {/* Second File Upload Container */}
                           <div id="file-upload-container2" className="relative">
                               <label
                                   htmlFor="file2"
                                   className={`flex flex-col items-center justify-center ${formData.fieldImage2 ? "hidden" : "block"} bg-gray-300 p-10 rounded-2xl border-2 border-dashed border-gray-500 shadow-xl cursor-pointer hover:bg-gray-200 transition-all`}
                               >
                                   <svg
                                       className="h-12 mb-4 fill-green-600"
                                       viewBox="0 0 640 512"
                                   >
                                       <path
                                           d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
                                   </svg>
                                   <p className="text-gray-700 text-lg font-semibold">
                                       Drag and Drop
                                   </p>
                                   <p className="text-gray-600">or</p>
                                   <span
                                       className="bg-green-600 text-white px-5 py-2 rounded-lg mt-2 hover:bg-green-700 transition-all">
                                    Browse file
                                </span>
                                   <input
                                       id="file2"
                                       type="file"
                                       accept="image/*"
                                       className="hidden"
                                       onChange={(e) => handleFileUpload(e, "fieldImage2")}
                                   />
                               </label>
                               {formData.fieldImage2 && (
                                   <img
                                       src={formData.fieldImage2}
                                       alt="Preview 2"
                                       className="rounded-lg shadow-xl object-cover z-50 w-full h-60"
                                   />
                               )}
                           </div>
                       </div>
                   </div>
                   {/* Modal Footer */}
                   <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 font-semibold">
                       <button
                           onClick={handleUpdate}
                           className="bg-green-600 w-full rounded-lg py-2 text-white hover:bg-green-700 focus:outline-none"
                       >
                           Update
                       </button>
                       <button
                           onClick={handleDelete}
                           className="bg-red-600 w-full rounded-lg py-2 text-white hover:bg-red-700 focus:outline-none"
                       >
                           Delete
                       </button>
                       <button
                           onClick={() => {
                               setIsModalOpen(false);
                               clearForm();
                           }}
                           className="bg-gray-300 w-full rounded-lg py-2 text-black hover:bg-gray-400 focus:outline-none"
                       >
                           Cancel
                       </button>
                   </div>
               </motion.div>
           </motion.div>
       )
    );
}

export default FieldActions;
