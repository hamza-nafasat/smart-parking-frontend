import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AccordionEditIcon } from '../../../assets/svgs/Icon';
import Input from '../../../components/shared/small/Input';
import UploadModel from '../addParkingSpace/components/UploadModel';
import Button from '../../../components/shared/small/Button';
import toast from 'react-hot-toast';
// import { AccordionEditIcon } from "../../../../assets/svgs/Icon";

function EditFloorInfo( {floorNumber}) {

    const { floors, activeAccordionIndex } = useSelector((state) => state.floor);
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [noOfParkingSpace, setNumberOfParkingSpace] = useState();
    const [originalImage, setOriginalImage] = useState(null);
    const [polygons, setPolygons] = useState([]);
    const [polygonsForBackend, setPolygonsForBackend] = useState([]);
    const [imageSrc, setImageSrc] = useState(null);


    const saveClickHandler = () => {
        if (!name || !noOfParkingSpace || !imageSrc || !polygonsForBackend || !originalImage)
            return toast.error("Fill all fields first");
        // dispatch(
        //   addFloor({
        //     floorNumber,
        //     name,
        //     noOfParkingSpace,
        //     floorImage: imageSrc,
        //     polygonData: polygonsForBackend,
        //     file: originalImage,
        //   })
        // );
        // toast.success(`floor ${floorNumber} data added successfully`);
        // dispatch(setActiveAccordionIndex(Number(activeAccordionIndex) + 1));
    };



    const onUploadForFloorImage = (image, coordinates) => {
        setImageSrc(image);
        setPolygonsForBackend(coordinates);
      };


    return (
        <div>
            {/* Accordion Header */}
            <div className="flex items-center justify-between bg-primary rounded-[4px] px-4 md:px-8 py-2">
                <h6 className="text-base md:text-lg font-bold text-white">Floor 1</h6>
                <div className="flex items-center gap-4">
                    <div className="cursor-pointer" >
                        <AccordionEditIcon />
                    </div>
                </div>
            </div>

            {/* Accordion Content */}
            {/* {isOpen && ( */}
                <>
                    <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <Input type="text" placeholder="Floor name" value={name} onChange={(e) => setName(e.target.value)} />
                        <Input
                            type="text"
                            placeholder="Number of parking spaces"
                            value={noOfParkingSpace}
                            onChange={(e) => setNumberOfParkingSpace(e.target.value)}
                        />
                        <div className="lg:col-span-3 flex justify-center">
                            <UploadModel
                                heading="Upload Floor TwoD Model"
                                onUpload={onUploadForFloorImage}
                                polygons={polygons}
                                setPolygons={setPolygons}
                                imageSrc={imageSrc}
                                setImageSrc={setImageSrc}
                                setOriginalImage={setOriginalImage}
                            />
                            {/* <TwoDModel
                onUpload={onUploadForFloorImage}
                polygons={polygons}
                setPolygons={setPolygons}
                imageSrc={imageSrc}
                setImageSrc={setImageSrc}
                setOriginalImage={setOriginalImage}
              /> */}
                        </div>
                    </div>
                    <div className="min-w-full flex justify-end pr-6 m-2">
                        <Button width="w-[200px]" type="button" text="Save Floor Data" onClick={saveClickHandler} />
                    </div>
                </>
            {/* )} */}
        </div>
    )
}

export default EditFloorInfo