import {
  HomeIcon,
  BriefcaseIcon,
  EnvelopeIcon,
  BellIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
export const navLists = [
  {
    name: "Home",
    path: "/",
    Icon: HomeIcon,
  },

  {
    name: "Find Friends",
    path: "/find-friends",
    Icon: UserGroupIcon,
  },

  {
    name: "Jobs",
    path: "/jobs",
    Icon: BriefcaseIcon,
  },
  {
    name: "Messages",
    path: "/messages",
    Icon: EnvelopeIcon,
  },

  {
    name: "Notfications",
    path: "/notifications",
    Icon: BellIcon,
  },
];
