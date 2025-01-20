import { SlipIcon } from "../../../../assets/svgs/Icon";

export const walletData = [
    {
        id: 1,
        reservationId: '00-123442',
        buildingId: 'Building XYZ',
        managerName: 'John Doe',
        accountNumber: '1234-5678-9012-3456',
        amount: '$ 230.00',
        date: '28 July 2024',
        time: '11:00am',
    },
    {
        id: 2,
        reservationId: '00-123443',
        buildingId: 'Building ABC',
        managerName: 'Jane Smith',
        accountNumber: '2234-5678-9012-3456',
        amount: '$ 560.00',
        date: '29 July 2024',
        time: '02:00pm',
    },
    {
        id: 3,
        reservationId: '00-123444',
        buildingId: 'Building LMN',
        managerName: 'Robert Brown',
        accountNumber: '3234-5678-9012-3456',
        amount: '$ 720.00',
        date: '30 July 2024',
        time: '10:30am',
    },
    {
        id: 4,
        reservationId: '00-123445',
        buildingId: 'Building OPQ',
        managerName: 'Emily White',
        accountNumber: '4234-5678-9012-3456',
        amount: '$ 890.00',
        date: '31 July 2024',
        time: '04:15pm',
    },
    {
        id: 5,
        reservationId: '00-123446',
        buildingId: 'Building UVW',
        managerName: 'Michael Green',
        accountNumber: '5234-5678-9012-3456',
        amount: '$ 150.00',
        date: '01 August 2024',
        time: '09:00am',
    },
    {
        id: 6,
        reservationId: '00-123447',
        buildingId: 'Building DEF',
        managerName: 'Alice Black',
        accountNumber: '6234-5678-9012-3456',
        amount: '$ 330.00',
        date: '02 August 2024',
        time: '12:30pm',
    },
    {
        id: 7,
        reservationId: '00-123448',
        buildingId: 'Building RST',
        managerName: 'David Blue',
        accountNumber: '7234-5678-9012-3456',
        amount: '$ 450.00',
        date: '03 August 2024',
        time: '05:45pm',
    },
    {
        id: 8,
        reservationId: '00-123449',
        buildingId: 'Building GHI',
        managerName: 'Sarah Silver',
        accountNumber: '8234-5678-9012-3456',
        amount: '$ 980.00',
        date: '04 August 2024',
        time: '08:15am',
    },
];

export const walletColumns = (modalOpenHandler) => [
    {
        name: 'Reservation ID',
        selector: (row) => row?.reservationId,
    },
    {
        name: 'Building ID',
        selector: (row) => row?.buildingId,
    },
    {
        name: 'Manager Name',
        selector: (row) => row?.managerName,
    },
    {
        name: 'Account Number',
        selector: (row) => row?.accountNumber,
    },
    {
        name: 'Amount',
        selector: (row) => row?.amount,
    },
    {
        name: 'Date',
        selector: (row) => row?.date,
    },
    {
        name: 'Time',
        selector: (row) => row?.time,
    },
    {
        name: 'Slip',
        selector: (row) => (
            <div className="cursor-pointer" onClick={modalOpenHandler}>
                <SlipIcon />
            </div>
        ),
    },
]