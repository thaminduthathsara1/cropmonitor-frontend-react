import { motion } from "framer-motion";
import {Vehicle} from "../model/Vehicle.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/Store.ts";
import DataTable from "../component/DataTable.tsx";
import {useState} from "react";
import toast from "react-hot-toast";
import AddVehicle from "./AddVehicle.tsx";
import {addVehicle, removeVehicle, updateVehicle} from "../slice/VehicleSlice.ts";
import ViewVehicle from "./ViewVehicle.tsx";
import UpdateVehicle from "./UpdateVehicle.tsx";
import DeleteModal from "../component/DeleteModal.tsx";

function VehiclePage() {
    const vehicles : Vehicle[] =  useSelector((state: RootState) => state.vehicle);
    const dispatch = useDispatch();
    const vehicleHeaders = ['Category', 'Licence Plate Number', 'Fuel Type', 'Status', 'Allocated Employee', 'Actions'];
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

    const renderVehicleRow = (vehicle: Vehicle) => (
        <>
            <div className="p-2 truncate">{vehicle.category}</div>
            <div className="p-2 truncate">{vehicle.licensePlate}</div>
            <div className="p-2 hidden sm:block truncate">{vehicle.fuelType}</div>
            <div className="p-2 truncate">{vehicle.status}</div>
            <div className="p-2 truncate">{`${vehicle.allocatedStaffMember.firstName} ${vehicle.allocatedStaffMember.lastName}`}</div>
        </>
    );

    function handleAddVehicle(newVehicle: Vehicle){
        dispatch(addVehicle(newVehicle));
        setIsAddModalOpen(false);
        toast.success('Vehicle Added Successfully')
    }
    function handleViewVehicle(vehicle: Vehicle){
        setSelectedVehicle(vehicle);
        setIsViewModalOpen(true);
    }
    function openUpdateModal(vehicle: Vehicle){
        setSelectedVehicle(vehicle);
        setIsUpdateModalOpen(true);
    }
    function handleUpdateVehicle(vehicle: Vehicle) {
        dispatch(updateVehicle(vehicle));
        setIsUpdateModalOpen(false);
        toast.success(
            <div className="flex items-center space-x-2 ">
                <i className="fa fa-refresh text-orange-600"></i>
                <span>Vehicle updated successfully!</span>
            </div>,
            {icon: false}
        );
    }
    function handleDelete(vehicle: Vehicle){
        toast.custom((t) => (
            <DeleteModal
                visible={t.visible}
                onDelete={() => {
                    toast.dismiss(t.id);
                    dispatch(removeVehicle(vehicle.code));
                    toast.success(
                        <div className="flex items-center space-x-2 ">
                            <i className="fa fa-trash text-red-600"></i>
                            <span>Vehicle deleted successfully!</span>
                        </div>,
                        { icon: false }
                    );
                }}
                onCancel={() => {
                    toast.dismiss(t.id);
                }}
            />
        ));
    }
    return (
        <motion.div
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            exit={{
                opacity: 0,
            }}
            transition={{
                duration: 0.8,
                ease: [0.25, 0.8, 0.5, 1],
            }}
        >
            <div className="container mx-auto p-5">
                <h1 className="text-xl sm:text-2xl font-semibold mb-8 text-center sm:text-left">
                    Vehicle Management
                </h1>
                <div className="flex flex-wrap justify-end sm:justify-end space-x-0 sm:space-x-4 mb-5">
                    <button
                        id="btn-add"
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-green-600 text-white px-8 py-2 rounded-lg font-semibold hover:bg-green-700 transition text-sm sm:text-base flex items-center space-x-2 group sm:w-auto"
                    >
                        <i className="fa-solid fa-plus font-bold"></i>
                        <span className="pl-2">Add</span>
                    </button>
                </div>
                {/*Modal for adding vehicle*/}
                <AddVehicle
                    isModalOpen={isAddModalOpen} setIsModalOpen={setIsAddModalOpen} onSave={handleAddVehicle}
                />
                {/*Modal for view vehicle*/}
                {selectedVehicle && (
                    <ViewVehicle
                        isOpenModal={isViewModalOpen}
                        setIsOpenModal={setIsViewModalOpen}
                        vehicle={selectedVehicle}
                    />
                )}
                {/*Modal for update vehicle*/}
                { selectedVehicle && (
                    <UpdateVehicle
                        isModalOpen={isUpdateModalOpen}
                        setIsModalOpen={setIsUpdateModalOpen}
                        vehicle={selectedVehicle}
                        onUpdate={handleUpdateVehicle}
                    />
                )}
                <DataTable
                    data={vehicles} headers={vehicleHeaders} renderRow={renderVehicleRow}
                    handleView={handleViewVehicle} handleUpdate={openUpdateModal} handleDelete={handleDelete}
                ></DataTable>
            </div>
        </motion.div>
    );
}

export default VehiclePage;