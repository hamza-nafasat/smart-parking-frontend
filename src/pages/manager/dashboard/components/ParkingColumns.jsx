import { SlipIcon } from '../../../../assets/svgs/Icon';

export const parkingBookingData = [
  {
    id: 1,
    reservationId: '00-123442',
    buildingName: 'Building XYZ',
    phoneNumber: '(225) 555-0118',
    vehicleInfo: 'Toyota Camry, ABC-1234',
    reservationDate: '2024-07-05',
    paymentStatus: 'Paid',
  },
  {
    id: 2,
    reservationId: '00-123443',
    buildingName: 'Building ABC',
    phoneNumber: '(225) 555-0228',
    vehicleInfo: 'Honda Civic, XYZ-5678',
    reservationDate: '2024-07-06',
    paymentStatus: 'Unpaid',
  },
  {
    id: 3,
    reservationId: '00-123444',
    buildingName: 'Building DEF',
    phoneNumber: '(225) 555-0338',
    vehicleInfo: 'Ford Focus, DEF-3456',
    reservationDate: '2024-07-07',
    paymentStatus: 'Pending',
  },
  {
    id: 4,
    reservationId: '00-123445',
    buildingName: 'Building GHI',
    phoneNumber: '(225) 555-0448',
    vehicleInfo: 'Tesla Model S, GHI-7890',
    reservationDate: '2024-07-08',
    paymentStatus: 'Paid',
  },
  {
    id: 5,
    reservationId: '00-123446',
    buildingName: 'Building JKL',
    phoneNumber: '(225) 555-0558',
    vehicleInfo: 'Chevrolet Malibu, JKL-4321',
    reservationDate: '2024-07-09',
    paymentStatus: 'Unpaid',
  },
  {
    id: 6,
    reservationId: '00-123447',
    buildingName: 'Building MNO',
    phoneNumber: '(225) 555-0668',
    vehicleInfo: 'BMW X5, MNO-6543',
    reservationDate: '2024-07-10',
    paymentStatus: 'Pending',
  },
  {
    id: 7,
    reservationId: '00-123448',
    buildingName: 'Building PQR',
    phoneNumber: '(225) 555-0778',
    vehicleInfo: 'Audi Q7, PQR-8765',
    reservationDate: '2024-07-11',
    paymentStatus: 'Paid',
  },
  {
    id: 8,
    reservationId: '00-123449',
    buildingName: 'Building STU',
    phoneNumber: '(225) 555-0888',
    vehicleInfo: 'Mercedes-Benz C300, STU-9876',
    reservationDate: '2024-07-12',
    paymentStatus: 'Unpaid',
  },
];

export const dashboradColumns = (navigate) => [
  { name: 'Reservation ID', selector: (row) => row?._id },
  { name: 'Building Name', selector: (row) => row?.building?.name },
  { name: 'Phone Number', selector: (row) => row?.contactNumber },
  { name: 'Vehicle Info', selector: (row) => row?.plateNumber },
  {
    name: 'Reservation Date',
    selector: (row) => (row?.createdAt ? new Date(row.createdAt).toISOString().split('T')[0] : ''),
  },
  { name: 'Payment Status', selector: (row) => row?.paymentStatus },
  {
    name: 'Slip',
    selector: (row) => (
      <div className="cursor-pointer" onClick={() => navigate(`/manager/view-slip/${row?._id}`)}>
        <SlipIcon />
      </div>
    ),
  },
];

// -=====
