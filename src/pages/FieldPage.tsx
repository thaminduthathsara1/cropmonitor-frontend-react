import { motion } from "framer-motion";
import FieldMap from "./FieldMap.tsx";
import { useState } from "react";
import AddField from "./AddField";
import {Field} from "../model/Field.ts";
import {useDispatch, useSelector} from "react-redux";
import {addField, removeField, updateField} from "../slice/FieldSlice.ts";
import toast from "react-hot-toast";
import {RootState} from "../store/Store.ts";
import FieldActions from "./FieldActions.tsx";
import DeleteModal from "../component/DeleteModal.tsx";

function FieldPage() {
  const fields: Field[] = useSelector( (state: RootState )=> state.field);
  const dispatch = useDispatch();
  const [selectedField, setSelectedField] = useState<Field | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);

  function handleAddField(newField: Field) {
    dispatch(addField(newField));
    setIsModalOpen(false);
    toast.success("Field saved successfully");
  }

  function handleViewField(field: Field) {
    setSelectedField(field);
    setIsActionModalOpen(true);
  }

  function handleDeleteField(fieldCode: string) {
    toast.custom((t) => (
        <DeleteModal
            visible={t.visible}
            onDelete={() => {
              toast.dismiss(t.id);
              dispatch(removeField(fieldCode));
              toast.success(
                  <div className="flex items-center space-x-2 ">
                    <i className="fa fa-trash text-red-600"></i>
                    <span>Field deleted successfully!</span>
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

  function handleUpdateField(field: Field) {
    dispatch(updateField(field));
    setIsActionModalOpen(false);
    toast.success(
        <div className="flex items-center space-x-2 ">
          <i className="fa fa-refresh text-orange-600"></i>
          <span>Field updated successfully!</span>
        </div>,
        { icon: false }
    );
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
          Field Management
        </h1>
        <div className="flex flex-wrap justify-end sm:justify-end space-x-0 sm:space-x-4 mb-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 text-white px-8 py-2 rounded-lg font-semibold hover:bg-green-700 transition text-sm sm:text-base flex items-center space-x-2 group sm:w-auto"
          >
            <i className="fa-solid fa-plus font-bold"></i>
            <span className="pl-2">Add</span>
          </button>
        </div>
        <FieldMap fields={fields} onClickOnField={handleViewField}/>

        {/*modal for add field*/}
        <AddField
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          onSave={handleAddField}
        />
        {/*modal for field actions*/}
        {selectedField && (
            <FieldActions
              field={selectedField}
              isModalOpen={isActionModalOpen}
              setIsModalOpen={setIsActionModalOpen}
              onUpdateField={handleUpdateField}
              onDeleteField={handleDeleteField}
            />
        )}
      </div>
    </motion.div>
  );
}

export default FieldPage;
