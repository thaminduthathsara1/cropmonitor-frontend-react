import React, { useState } from "react";
import { Field } from "../model/Field";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import "leaflet/dist/leaflet.css";
import { Staff } from "../model/Staff.ts";
import { RootState } from "../store/Store.ts";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import toast from "react-hot-toast";
import L from 'leaflet';

interface AddFieldProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  onSave: (newField: Field) => void;
}

function AddField({
  isModalOpen,
  setIsModalOpen,
  onSave,
}: Readonly<AddFieldProps>) {
  const staffMembers: Staff[] = useSelector((state: RootState) => state.staff);
  const [selectedStaff, setSelectedStaff] = useState<Staff[]>([]);
  const [formData, setFormData] = useState({
    fieldName: "",
    fieldSize: "",
    latitude: "6.9271",
    longitude: "79.8612",
    fieldStaffIds: "",
    fieldImage1: "",
    fieldImage2: "",
  });
  //  map marker icon
  const customIcon = L.icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  // Marker position
  const [markerPosition, setMarkerPosition] = useState<[number, number]>([
    6.9271, 79.8612,
  ]);

  // Filter available staff for the dropdown
  const availableStaff = staffMembers.filter(
    (staff) => !selectedStaff.some((s) => s.staffId === staff.staffId)
  );

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

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

  function handleMapClick(lat: number, lng: number) {
    setFormData((prevData) => ({
      ...prevData,
      latitude: lat.toString(),
      longitude: lng.toString(),
    }));
    setMarkerPosition([lat, lng]);
  }

  function MapEvents() {
    useMapEvents({
      click(e) {
        handleMapClick(e.latlng.lat, e.latlng.lng);
      },
    });
    return null;
  }

  function handleSave() {
    if (!formData.fieldName.trim()) {
      toast.error("Field name is required.");
      return;
    }

    if (!formData.fieldSize) {
      toast.error("Field size is required.");
      return;
    }

    if (!selectedStaff.length) {
      toast.error("Please select at least one staff member.");
      return;
    }

    const newField = new Field(
      formData.fieldName,
      {
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
      },
      parseFloat(formData.fieldSize),
      selectedStaff,
      formData.fieldImage1,
      formData.fieldImage2
    );
    onSave(newField);
    setIsModalOpen(false);
    setFormData({
      fieldName: "",
      fieldSize: "",
      latitude: "6.9271",
      longitude: "79.8612",
      fieldStaffIds: "",
      fieldImage1: "",
      fieldImage2: "",
    });
    setSelectedStaff([]);
    setMarkerPosition([6.9271, 79.8612]);
  }

  return (
    isModalOpen && (
      <motion.div
        className="fixed inset-0 z-50 flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Background Overlay */}
        <motion.div
          className="absolute inset-0 bg-gray-800 opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        ></motion.div>

        {/* Modal Content */}
        <motion.div
          className="bg-white rounded-lg p-8 w-full sm:w-[54vw] drop-shadow-2xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-center text-xl font-semibold mb-8">Add Field</h1>
          <div className="overflow-y-auto h-[60vh] custom-scrollbar p-4">
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
                  className={`flex flex-col items-center justify-center ${
                    formData.fieldImage1 ? "hidden" : "block"
                  } bg-gray-300 p-10 rounded-2xl border-2 border-dashed border-gray-500 shadow-xl cursor-pointer hover:bg-gray-200 transition-all`}
                >
                  <svg
                    className="h-12 mb-4 fill-green-600"
                    viewBox="0 0 640 512"
                  >
                    <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
                  </svg>
                  <p className="text-gray-700 text-lg font-semibold">
                    Drag and Drop
                  </p>
                  <p className="text-gray-600">or</p>
                  <span className="bg-green-600 text-white px-5 py-2 rounded-lg mt-2 hover:bg-green-700 transition-all">
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
                  className={`flex flex-col items-center justify-center ${
                    formData.fieldImage2 ? "hidden" : "block"
                  } bg-gray-300 p-10 rounded-2xl border-2 border-dashed border-gray-500 shadow-xl cursor-pointer hover:bg-gray-200 transition-all`}
                >
                  <svg
                    className="h-12 mb-4 fill-green-600"
                    viewBox="0 0 640 512"
                  >
                    <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
                  </svg>
                  <p className="text-gray-700 text-lg font-semibold">
                    Drag and Drop
                  </p>
                  <p className="text-gray-600">or</p>
                  <span className="bg-green-600 text-white px-5 py-2 rounded-lg mt-2 hover:bg-green-700 transition-all">
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
            {/* Map Section */}
            <div className="mb-6">
              <label
                htmlFor="field-location"
                className="block text-sm mb-3 font-medium text-gray-900"
              >
                Select Field Location
              </label>
              <div className="w-full h-[420px] rounded-lg overflow-hidden">
                <MapContainer
                  center={[6.9271, 79.8612]}
                  zoom={14}
                  className="w-full h-full"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <MapEvents />
                  {markerPosition && (
                    <Marker position={markerPosition} icon={customIcon} />
                  )}
                </MapContainer>
              </div>
              <input
                type="hidden"
                id="latitude"
                name="latitude"
                value={formData.latitude}
              />
              <input
                type="hidden"
                id="longitude"
                name="longitude"
                value={formData.longitude}
              />
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-6 gap-4 font-semibold">
            <div className="sm:col-span-3">
              <button
                onClick={handleSave}
                className="bg-green-600 w-full rounded-lg py-2 text-white hover:bg-green-700 focus:outline-none"
              >
                Save
              </button>
            </div>
            <div className="sm:col-span-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 w-full rounded-lg py-2 text-black hover:bg-gray-400 focus:outline-none"
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

export default AddField;
