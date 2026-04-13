import {
  BuildingInfoFilledIcon,
  BuildingInfoIcon,
  DashboardFilledIcon,
  DashboardIcon,
  ParkingAsideIcon,
  ParkingFilledIcon,
  RingIcon,
  WalletFilledIcon,
  WalletIcon,
} from '../../assets/svgs/Icon';

export const pages = [
  {
    id: 1,
    title: 'Dashboard',
    link: ['/admin', '/manager', '/user'],
    icon: <DashboardIcon />,
    filledIcon: <DashboardFilledIcon />,
  },
  {
    id: 2,
    title: 'Notifications',
    link: ['/user/notifications'],
    icon: <RingIcon />,
    filledIcon: <RingIcon />,
  },
  {
    id: 3,
    title: 'Buildings',
    link: [
      '/admin/building-info',
      '/manager/building-info',
      // "/user/building-info",
    ],
    icon: <BuildingInfoIcon />,
    filledIcon: <BuildingInfoFilledIcon />,
  },
  {
    id: 3,
    title: 'Parking Summary',
    link: ['/admin/parking-summary', '/manager/parking-summary', '/user/booking-summary'],
    icon: <ParkingAsideIcon />,
    filledIcon: <ParkingFilledIcon />,
  },
  {
    id: 3,
    title: 'Sensors',
    link: ['/manager/sensors'],
    icon: <ParkingAsideIcon />,
    filledIcon: <ParkingFilledIcon />,
  },
  {
    id: 4,
    title: 'Wallet',
    link: ['/admin/wallet', '/manager/wallet'],
    icon: <WalletIcon />,
    filledIcon: <WalletFilledIcon />,
  },
  {
    id: 4,
    title: 'Settings',
    link: ['/manager/setting'],
    icon: <WalletIcon />,
    filledIcon: <WalletFilledIcon />,
  },
];
