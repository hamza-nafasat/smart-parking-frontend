import { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";
import { AccordionEditIcon, AddIcon, DeleteIcon } from "../../../assets/svgs/Icon";
import Loader from "../../../components/shared/small/Loader";
import Modal from "../../../components/shared/small/Modal";
import ToggleButton from "../../../components/shared/small/ToggleButton";
import {
  useDeleteSingleSensorMutation,
  useGetAllSensorsQuery,
  useUpdateSingleSensorMutation,
} from "../../../redux/apis/sensorApis";
import AddSensor from "./components/AddSensor";
import EditSensor from "./components/EditSensor";

const columns = (modalOpenHandler, statusToggleHandler, deleteHandler, isUpdating) => [
  {
    name: "Sensor Name",
    selector: (row) => row?.name,
  },
  {
    name: "Sensor Type",
    selector: (row) => row?.type,
  },
  {
    name: "Unique Id",
    selector: (row) => row?.uniqueId,
  },
  {
    name: "createdAt",
    selector: (row) => row?.createdAt?.split("T")[0]?.split("-")?.reverse()?.join("-"),
  },
  {
    name: "Status",
    selector: (row) => (
      <ToggleButton
        className={`${isUpdating ? "pointer-events-none cursor-not-allowed" : "cursor-pointer"}`}
        disabled={isUpdating}
        isChecked={row?.status}
        onToggle={() => statusToggleHandler(row._id, row?.status ? "false" : "true")}
      />
    ),
  },
  {
    name: "Action",
    selector: (row) => (
      <div className="flex items-center gap-2">
        <div className="cursor-pointer" onClick={() => modalOpenHandler("edit", row)}>
          <AccordionEditIcon color="#18BC9C" />
        </div>
        <div className="cursor-pointer" onClick={() => deleteHandler(row?._id)}>
          <DeleteIcon />
        </div>
      </div>
    ),
  },
];

const Sensors = () => {
  const [modal, setModal] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState({});
  const { data, isLoading, refetch } = useGetAllSensorsQuery();
  const [updateSensor, { isLoading: isUpdating }] = useUpdateSingleSensorMutation();
  const [deleteSensor, { isLoading: isDeleting }] = useDeleteSingleSensorMutation();

  const modalOpenHandler = (modalType, row) => {
    setModal(modalType);
    if (row) setSelectedSensor(row);
  };
  const modalCloseHandler = () => setModal(false);
  const statusToggleHandler = async (id, status) => {
    try {
      const res = await updateSensor({ id, data: { status } }).unwrap();
      toast.success(res?.message);
      await refetch();
    } catch (error) {
      console.log("Error in update sensor", error);
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  const deleteHandler = (id) => {
    confirmAlert({
      title: "Delete Sensor",
      message: "Are you sure, you want to delete the sensor?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              if (!id) return toast.error("Please Provide Sensor id");
              const res = await deleteSensor(id).unwrap();
              toast.success(res?.message);
              await refetch();
            } catch (error) {
              console.log("Error in delete sensor", error);
              toast.error(error?.data?.message || "Something went wrong");
            }
          },
        },
        {
          label: "No",
        },
      ],
    });
  };
  return isLoading ? (
    <Loader />
  ) : (
    <div className="bg-white rounded-[15px] p-4 lg:p-6 h-[calc(100vh-80px)] overflow-hidden">
      <div className="flex items-center justify-end">
        <div className="cursor-pointer" onClick={() => modalOpenHandler("add")}>
          <AddIcon />
        </div>
      </div>
      <div className="mt-5">
        <DataTable
          columns={columns(modalOpenHandler, statusToggleHandler, deleteHandler, isUpdating)}
          data={data?.data}
          selectableRows
          selectableRowsHighlight
          customStyles={tableStyles}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="70vh"
        />
      </div>
      {modal === "add" && (
        <Modal title="Add Sensor" width="w-[300px] md:w-[650px]" onClose={modalCloseHandler}>
          <AddSensor refetch={refetch} onClose={modalCloseHandler} />
        </Modal>
      )}
      {modal === "edit" && (
        <Modal title="Edit Sensor" width="w-[300px] md:w-[650px]" onClose={modalCloseHandler}>
          <EditSensor refetch={refetch} selectedSensor={selectedSensor} onClose={modalCloseHandler} />
        </Modal>
      )}
    </div>
  );
};

export default Sensors;

const tableStyles = {
  headCells: {
    style: {
      fontSize: "16px",
      fontWeight: 600,
      color: "#b5b7c0",
    },
  },
  rows: {
    style: {
      background: "#e3fff9",
      borderRadius: "6px",
      padding: "14px 0",
      margin: "10px 0",
      borderBottomWidth: "0 !important",
    },
  },
  cells: {
    style: {
      color: "rgba(17, 17, 17, 1)",
      fontSize: "14px",
    },
  },
};
