import app from "constants/app";
import { FaTelegramPlane } from "react-icons/fa";
import { FiSettings, FiUser } from "react-icons/fi";
import { RiDashboardLine } from "react-icons/ri";
import { AiOutlineHome, AiOutlineCar } from "react-icons/ai";
import { IoMdGift } from "react-icons/io";
import { BsPerson } from "react-icons/bs";
import { CgUserList } from "react-icons/cg";
import { GiAutoRepair, GiConfirmed } from "react-icons/gi";
import {
  MdOutlineTrackChanges,
  MdOutlineRecommend,
  MdOutlineCreateNewFolder,
  MdOutlineCallReceived,
} from "react-icons/md";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { DiGhostSmall } from "react-icons/di";
import { BiBowlingBall } from "react-icons/bi";
import {
  AllCourierPermissionList,
  AllVehicleReservationPermissionList,
  permissions,
} from "./permissions";

export const sidebar = [
  {
    icon: "",
    label: "",
    location: "",
    path: "",
  },
];

export const IndexSidebar = () => [
  {
    icon: <AiOutlineHome />,
    label: "Home",
    location: "top",
    path: "/",
  },
  {
    icon: <AiOutlineCar />,
    label: "Vehicle Reservation",
    location: "top",
    path: app.driver.root,
    role: "user",
    permission: AllVehicleReservationPermissionList,
  },
  {
    icon: <IoMdGift />,
    label: "Courier",
    location: "top",
    path: app.courier.root,
    role: "user",
    permission: [],
  },

  {
    icon: <FiSettings />,
    label: "Administration",
    location: "top",
    role: "admin",
    permission: [],
    children: [
      {
        icon: <FiUser />,
        label: "User",
        location: "top",
        path: app.user.manage(),
        role: "admin",
        permission: [],
      },
    ],
  },
];

export const VehicleReservationSidebar = () => [
  {
    icon: <AiOutlineHome />,
    label: "Home",
    location: "top",
    path: "/",
  },
  {
    icon: <RiDashboardLine />,
    label: "Dashboard",
    location: "top",
    path: app.driver.root,
    role: "user",
    permission: AllVehicleReservationPermissionList,
  },
  {
    icon: <BsPerson />,
    label: "Driver",
    location: "top",
    path: app.driver.driver,
    role: "user",
    permission: [
      permissions.vehicle_reservation.reservation_admin,
      permissions.vehicle_reservation.driver_head,
    ],
  },

  {
    icon: <CgUserList />,
    label: "Driver Shift",
    location: "top",
    path: app.driver.shift,
    role: "user",
    permission: [
      permissions.vehicle_reservation.reservation_admin,
      permissions.vehicle_reservation.driver_head,
    ],
  },

  {
    icon: <AiOutlineCar />,
    label: "Vehicle",
    location: "top",
    path: app.driver.vehicle,
    role: "user",
    permission: [
      permissions.vehicle_reservation.reservation_admin,
      permissions.vehicle_reservation.driver_head,
    ],
  },
  {
    icon: <GiAutoRepair />,
    label: "Maintanence",
    location: "top",
    path: app.driver.maintanence,
    role: "user",
    permission: [
      permissions.vehicle_reservation.reservation_admin,
      permissions.vehicle_reservation.driver_head,
    ],
  },

  {
    icon: <MdOutlineRecommend />,
    label: "Approve Bookings",
    location: "top",
    path: app.driver.reservations,
    role: "user",
    permission: [
      permissions.vehicle_reservation.reservation_admin,
      permissions.vehicle_reservation.reservation_approve,
    ],
  },
  {
    icon: <GiConfirmed />,
    label: "Confirm Reservations",
    location: "top",
    path: app.driver.recommended,
    role: "user",
    permission: [
      permissions.vehicle_reservation.reservation_admin,
      permissions.vehicle_reservation.driver_head,
    ],
  },
  {
    icon: <FaTelegramPlane />,
    label: "Active Trips",
    location: "top",
    path: app.driver.confirmed,
    role: "user",
    permission: [
      permissions.vehicle_reservation.reservation_admin,
      permissions.vehicle_reservation.driver_head,
    ],
  },
  {
    icon: <MdOutlineTrackChanges />,
    label: "Track",
    location: "top",
    path: app.driver.track,
    role: "user",
    permission: [permissions.vehicle_reservation.reservation.add],
  },
  {
    icon: <HiOutlineDocumentReport />,
    label: "Report",
    location: "top",
    path: app.driver.report,
    role: "user",
    permission: [
      permissions.vehicle_reservation.reservation_admin,
      permissions.vehicle_reservation.driver_head,
    ],
  },
];

export const CourierSidebar = () => [
  {
    icon: <AiOutlineHome />,
    label: "Home",
    location: "top",
    path: "/",
  },
  {
    icon: <RiDashboardLine />,
    label: "Dashboard",
    location: "top",
    path: app.courier.root,
    role: "user",
    permission: AllCourierPermissionList,
  },
  {
    icon: <MdOutlineCreateNewFolder />,
    label: "Create",
    location: "top",
    path: `${app.courier.root}/create`,
    role: "user",
    permission: [permissions.courier_services.courier.add],
  },

  {
    icon: <BiBowlingBall />,
    label: "Manage",
    location: "top",
    path: `${app.courier.root}/managed`,
    role: "user",
    permission: [permissions.courier_services.courier.view],
  },

  {
    icon: <MdOutlineCallReceived />,
    label: "Recieved",
    location: "top",
    path: `${app.courier.root}/received`,
    role: "user",
    permission: [],
  },

  {
    icon: <MdOutlineTrackChanges />,
    label: "Track",
    location: "top",
    path: `${app.courier.root}/sent`,
    role: "user",
    permission: [permissions.courier_services.courier.add],
  },
  {
    icon: <DiGhostSmall />,
    label: "All",
    location: "top",
    path: `${app.courier.root}/all`,
    role: "user",
    permission: [permissions.courier_services.courier.supervisor],
  },
];

export default [];
