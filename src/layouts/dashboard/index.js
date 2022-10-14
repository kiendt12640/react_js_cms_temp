// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DetailedStatisticsCard from "examples/Cards/StatisticsCards/DetailedStatisticsCard";
import SalesTable from "examples/Tables/SalesTable";
import CategoriesList from "examples/Lists/CategoriesList";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Argon Dashboard 2 MUI base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import Slider from "layouts/dashboard/components/Slider";

// Data
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import salesTableData from "layouts/dashboard/data/salesTableData";
import categoriesListData from "layouts/dashboard/data/categoriesListData";

import "./index.css";
import api from "./api";
import { useState, useEffect } from "react";

// function Default() {
//   // const { size } = typography;
//   const [accName, setAccName] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [trangthai, setTrangThai] = useState("");

//   const [updateId, setUpdateId] = useState("");

//   const [listTrangThai, setListTrangThai] = useState([]);
//   const [listNV, setlistNV] = useState([]);

//   //State filter
//   const [filterName, setfilterName] = useState("");
//   const [filterPhoneNumber, setfilterPhoneNumber] = useState("");
//   const [filterTrangThai, setfilterTrangThai] = useState("");

//   const [load, setLoad] = useState(true);

//   const [formAdd, setFormAdd] = useState(false);

//   const resetForm = () => {
//     setAccName("");
//     setPhoneNumber("");
//     setTrangThai("");
//     setUpdateId("");
//   };

//   const handleModifyNV = async (e) => {
//     e.preventDefault();
//     const data = {
//       name: accName,
//       phoneNumber: phoneNumber,
//       trangthaiID: trangthai,
//     };
//     // Update
//     if (updateId) {
//       try {
//         console.log(updateId);
//         await api.put(`/dashboard/${updateId}`, data);
//         resetForm();
//         setLoad(!load);
//         setFormAdd(false);
//       } catch (err) {
//         console.log(err);
//       }
//       // Add
//     } else {
//       try {
//         const response = await api.post("/dashboard", data);
//         console.log(response.data);
//         setLoad(!load);
//         // if (response.data.error_code !== 0) alert(response.data.error_msg);
//         resetForm();
//         setFormAdd(false);
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   };

//   //Render
//   useEffect(() => {
//     const getTrangThai = async () => {
//       const trangthai = await callAPI("/trangthai");
//       setListTrangThai(trangthai);
//     };

//     const getNV = async () => {
//       const nv = await callAPI("/dashboard");
//       setlistNV(nv);
//     };

//     getTrangThai();
//     getNV();
//   }, [load]);

//   const callAPI = async (route) => {
//     try {
//       const res = await api.get(route);
//       return res.data;
//     } catch (err) {
//       console.log(err);
//       return [];
//     }
//   };

//   // Filter
//   const handleRefetch = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await api.get("/dashboard", {
//         params: {
//           name: filterName,
//           phoneNumber: filterPhoneNumber,
//           trangthaiID: filterTrangThai,
//         },
//       });
//       setlistNV(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // Delete
//   const deleteNV = async (id) => {
//     try {
//       await api.delete(`/dashboard/${id}`);
//       setLoad(!load);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="dashB">
//       {formAdd ? (
//         <div>
//           <div className="screenAdd">
//             <form className="formAdd" onSubmit={handleModifyNV}>
//               <div className="formLine1">
//                 <h2>Add Account</h2>
//                 <button
//                   className="btnX"
//                   onClick={() => {
//                     resetForm();
//                     setFormAdd(false);
//                   }}
//                 >
//                   x
//                 </button>
//               </div>
//               <label className="label">Tai Khoan</label>
//               <input
//                 value={accName}
//                 onChange={(e) => setAccName(e.target.value)}
//                 className="inp"
//                 placeholder="Ten tai khoan"
//                 type="text"
//               ></input>
//               <label className="label">So dien thoai</label>
//               <input
//                 className="inp"
//                 type="text"
//                 value={phoneNumber}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//                 placeholder="So dien thoai"
//               ></input>
//               <label className="label">Duyet tai khoan</label>
//               <select
//                 value={trangthai}
//                 onChange={(e) => setTrangThai(e.target.value)}
//                 className="select"
//               >
//                 <option></option>
//                 {listTrangThai.map((item) => {
//                   return <option value={item.id}>{item.trangthai}</option>;
//                 })}
//               </select>

//               <div className="listBtn">
//                 <button
//                   className="btnForm cancel"
//                   onClick={() => {
//                     setFormAdd(false);
//                     resetForm();
//                   }}
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="btnForm btnSubmit">
//                   Submit
//                 </button>
//               </div>
//             </form>
//           </div>
//           <div className="line1">
//             <h3>Danh sách tài khoản</h3>
//             <button className="btnAdd" onClick={() => setFormAdd(true)}>
//               Tạo Account+
//             </button>
//           </div>
//           <form className="lineFilter">
//             <input
//               value={filterName}
//               onChange={(e) => setfilterName(e.target.value)}
//               type="text"
//               className="filterName"
//               name="name"
//               placeholder="Tên"
//             ></input>
//             <input
//               value={filterPhoneNumber}
//               onChange={(e) => setfilterPhoneNumber(e.target.value)}
//               type="text"
//               className="filterPhoneNumber"
//               name="phoneNumber"
//               placeholder="Số điện thoại"
//             ></input>
//             <select
//               value={filterTrangThai}
//               onChange={(e) => setfilterTrangThai(e.target.value)}
//               className="select"
//             >
//               <option></option>
//               {listTrangThai.map((item) => {
//                 return <option value={item.id}>{item.trangthai}</option>;
//               })}
//             </select>
//             <button type="submit" className="btnSearch" value="Tìm kiếm">
//               Search
//             </button>
//           </form>
//           <table>
//             <tr>
//               <th>STT</th>
//               <th>Tên tài khoản</th>
//               <th>Số điện thoại</th>
//               <th>Kích hoạt</th>
//               <th>Hành động</th>
//             </tr>
//             {listNV.map((item, index) => {
//               return (
//                 <tr>
//                   <td>{index + 1}</td>
//                   <td>{item.name}</td>
//                   <td>{item.phoneNumber}</td>
//                   <td>
//                     <a className="activeAcc">{item.trangthai}</a>
//                   </td>
//                   <td>
//                     <div className="action">
//                       <button
//                         className="btnAction btnEdit"
//                         onClick={() => {
//                           console.log(item.nv_id);
//                           setAccName(item.name);
//                           setPhoneNumber(item.phoneNumber);
//                           setTrangThai(item.trangthaiID);
//                           setUpdateId(item.nv_id);
//                           setFormAdd(true);
//                         }}
//                       >
//                         Sửa
//                       </button>
//                       <button
//                         className="btnAction btnDelete"
//                         onClick={(e) => {
//                           e.preventDefault();
//                           deleteNV(item.nv_id);
//                         }}
//                       >
//                         Xóa
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               );
//             })}
//           </table>
//         </div>
//       ) : (
//         <div>
//           <div className="line1">
//             <h3>Danh sách tài khoản</h3>
//             <button className="btnAdd" onClick={() => setFormAdd(true)}>
//               Tạo Account+
//             </button>
//           </div>
//           <form className="lineFilter">
//             <input
//               value={filterName}
//               onChange={(e) => setfilterName(e.target.value)}
//               type="text"
//               className="filterName"
//               name="name"
//               placeholder="Tên"
//             ></input>
//             <input
//               value={filterPhoneNumber}
//               onChange={(e) => setfilterPhoneNumber(e.target.value)}
//               type="text"
//               className="filterPhoneNumber"
//               name="phoneNumber"
//               placeholder="Số điện thoại"
//             ></input>
//             <select
//               value={filterTrangThai}
//               onChange={(e) => setfilterTrangThai(e.target.value)}
//               className="select"
//             >
//               <option></option>
//               {listTrangThai.map((item) => {
//                 return <option value={item.id}>{item.trangthai}</option>;
//               })}
//             </select>
//             <button
//               type="submit"
//               className="btnSearch"
//               value="Tìm kiếm"
//               onClick={handleRefetch}
//             >
//               Search
//             </button>
//           </form>
//           <table>
//             <tr>
//               <th>STT</th>
//               <th>Tên tài khoản</th>
//               <th>Số điện thoại</th>
//               <th>Kích hoạt</th>
//               <th>Hành động</th>
//             </tr>
//             {listNV.map((item, index) => {
//               return (
//                 <tr>
//                   <td>{index + 1}</td>
//                   <td>{item.name}</td>
//                   <td>{item.phoneNumber}</td>
//                   <td>
//                     <a className="activeAcc">{item.trangthai}</a>
//                   </td>
//                   <td>
//                     <div className="action">
//                       <button
//                         className="btnAction btnEdit"
//                         onClick={() => {
//                           console.log(item.nv_id);
//                           setAccName(item.name);
//                           setPhoneNumber(item.phoneNumber);
//                           setTrangThai(item.trangthaiID);
//                           setUpdateId(item.nv_id);
//                           setFormAdd(true);
//                         }}
//                       >
//                         Sửa
//                       </button>
//                       <button
//                         className="btnAction btnDelete"
//                         onClick={(e) => {
//                           e.preventDefault();
//                           deleteNV(item.nv_id);
//                         }}
//                       >
//                         Xóa
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               );
//             })}
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Default;

// // <DashboardLayout>
// //   <DashboardNavbar />
// //   <ArgonBox py={3}>
// //     <Grid container spacing={3} mb={3}>
// //       <Grid item xs={12} md={6} lg={3}>
// //         <DetailedStatisticsCard
// //           title="today's money"
// //           count="$53,000"
// //           icon={{
// //             color: "info",
// //             component: <i className="ni ni-money-coins" />,
// //           }}
// //           percentage={{
// //             color: "success",
// //             count: "+55%",
// //             text: "since yesterday",
// //           }}
// //         />
// //       </Grid>
// //       <Grid item xs={12} md={6} lg={3}>
// //         <DetailedStatisticsCard
// //           title="today's users"
// //           count="2,300"
// //           icon={{
// //             color: "error",
// //             component: <i className="ni ni-world" />,
// //           }}
// //           percentage={{
// //             color: "success",
// //             count: "+3%",
// //             text: "since last week",
// //           }}
// //         />
// //       </Grid>
// //       <Grid item xs={12} md={6} lg={3}>
// //         <DetailedStatisticsCard
// //           title="new clients"
// //           count="+3,462"
// //           icon={{
// //             color: "success",
// //             component: <i className="ni ni-paper-diploma" />,
// //           }}
// //           percentage={{
// //             color: "error",
// //             count: "-2%",
// //             text: "since last quarter",
// //           }}
// //         />
// //       </Grid>
// //       <Grid item xs={12} md={6} lg={3}>
// //         <DetailedStatisticsCard
// //           title="sales"
// //           count="$103,430"
// //           icon={{
// //             color: "warning",
// //             component: <i className="ni ni-cart" />,
// //           }}
// //           percentage={{
// //             color: "success",
// //             count: "+5%",
// //             text: "than last month",
// //           }}
// //         />
// //       </Grid>
// //     </Grid>
// //     <Grid container spacing={3} mb={3}>
// //       <Grid item xs={12} lg={7}>
// //         <GradientLineChart
// //           title="Sales Overview"
// //           description={
// //             <ArgonBox display="flex" alignItems="center">
// //               <ArgonBox
// //                 fontSize={size.lg}
// //                 color="success"
// //                 mb={0.3}
// //                 mr={0.5}
// //                 lineHeight={0}
// //               >
// //                 <Icon sx={{ fontWeight: "bold" }}>arrow_upward</Icon>
// //               </ArgonBox>
// //               <ArgonTypography
// //                 variant="button"
// //                 color="text"
// //                 fontWeight="medium"
// //               >
// //                 4% more{" "}
// //                 <ArgonTypography
// //                   variant="button"
// //                   color="text"
// //                   fontWeight="regular"
// //                 >
// //                   in 2022
// //                 </ArgonTypography>
// //               </ArgonTypography>
// //             </ArgonBox>
// //           }
// //           chart={gradientLineChartData}
// //         />
// //       </Grid>
// //       <Grid item xs={12} lg={5}>
// //         <Slider />
// //       </Grid>
// //     </Grid>
// //     <Grid container spacing={3}>
// //       <Grid item xs={12} md={8}>
// //         <SalesTable title="Sales by Country" rows={salesTableData} />
// //       </Grid>
// //       <Grid item xs={12} md={4}>
// //         <CategoriesList
// //           title="categories"
// //           categories={categoriesListData}
// //         />
// //       </Grid>
// //     </Grid>
// //   </ArgonBox>
// //   <Footer />
// // </DashboardLayout>

function DashBoard() {
  return <div />;
}

export default DashBoard;
