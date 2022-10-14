// Argon Dashboard 2 MUI layouts
import Dashboard from "layouts/dashboard";
import Customers from "layouts/customers";
import Employees from "layouts/employees";
import Bills from "layouts/bills";
import Services from "layouts/services";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";

const routes = [
  {
    type: "route",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: (
      <ArgonBox
        component="i"
        color="primary"
        fontSize="14px"
        className="ni ni-tv-2"
      />
    ),
    component: <Dashboard />,
  },
  { type: "title", title: "Nhân Viên", key: "account" },
  {
    type: "route",
    name: "Nhân viên",
    key: "employees",
    route: "/employees",
    icon: (
      <ArgonBox
        component="i"
        color="dark"
        fontSize="14px"
        className="ni ni-single-02"
      />
    ),
    component: <Employees />,
  },
  { type: "title", title: "Khách Hàng", key: "account-c" },
  {
    type: "route",
    name: "Khách hàng",
    key: "customers",
    route: "/customers",
    icon: (
      <ArgonBox
        component="i"
        color="dark"
        fontSize="14px"
        className="ni ni-single-02"
      />
    ),
    component: <Customers />,
  },
  { type: "title", title: "Hóa Đơn", key: "account-b" },
  {
    type: "route",
    name: "Hóa đơn",
    key: "bills",
    route: "/bills",
    icon: (
      <ArgonBox
        component="i"
        color="dark"
        fontSize="14px"
        className="ni ni-single-02"
      />
    ),
    component: <Bills />,
  },
  { type: "title", title: "Dịch Vụ", key: "account-d" },
  {
    type: "route",
    name: "Dịch vụ",
    key: "services",
    route: "/services",
    icon: (
      <ArgonBox
        component="i"
        color="dark"
        fontSize="14px"
        className="ni ni-single-02"
      />
    ),
    component: <Services />,
  },
  {
    type: "route",
    name: "Sign In",
    key: "sign-in",
    route: "/sign-in",
    icon: (
      <ArgonBox
        component="i"
        color="warning"
        fontSize="14px"
        className="ni ni-single-copy-04"
      />
    ),
    component: <SignIn />,
  },
  {
    type: "route",
    name: "Sign Up",
    key: "sign-up",
    route: "/sign-up",
    icon: (
      <ArgonBox
        component="i"
        color="info"
        fontSize="14px"
        className="ni ni-collection"
      />
    ),
    component: <SignUp />,
  },
];

export default routes;
