import buildingImgOne from "../../../../assets/images/building/building-img-1.png";
import buildingImgTwo from "../../../../assets/images/building/building-img-2.png";
import buildingImgThree from "../../../../assets/images/building/building-img-3.png";
import buildingImgFour from "../../../../assets/images/building/building-img-4.png";

const buildingSummaryListData = [
  {
    _id: 1,
    buildingImages: [
      buildingImgOne,
      buildingImgTwo,
      buildingImgThree,
      buildingImgFour,
    ],
    buildingName: "Washington ",
    status: "completed",
    address: "Basement Floor-B12",
  },
  {
    _id: 2,
    buildingImages: [
      buildingImgOne,
      buildingImgTwo,
      buildingImgThree,
      buildingImgFour,
    ],
    buildingName: "City Center ",
    status: "active",
    address: "Basement Floor",
  },
  {
    _id: 3,
    buildingImages: [
      buildingImgOne,
      buildingImgTwo,
      buildingImgThree,
      buildingImgFour,
    ],
    buildingName: "Union Station",
    status: "cancelled",
    address: "Basement Floor-A15",
  },
];

export { buildingSummaryListData };
