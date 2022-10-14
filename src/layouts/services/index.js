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
import ReactPaginate from "react-paginate";

function Service() {
  const [listService, setlistService] = useState([]);

  //State filter
  const [filterServiceName, setfilterServiceName] = useState("");
  const [filterServicePrice, setfilterServicePrice] = useState("");

  // State pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(listService.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(listService.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, listService]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % listService.length;
    setItemOffset(newOffset);
  };

  //Render
  useEffect(() => {
    const getService = async () => {
      const service = await callAPI("/service");
      setlistService(service);
    };

    getService();
  }, []);

  const callAPI = async (route) => {
    try {
      const res = await api.get(route);
      return res.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  // Filter
  const handleRefetch = async (e) => {
    e.preventDefault();
    try {
      const res = await api.get("/service", {
        params: {
          tendichvu: filterServiceName,
          giadichvu: filterServicePrice,
        },
      });
      setlistService(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="dashB">
      <div className="line1">
        <h3>Danh sách dịch vụ</h3>
      </div>
      <form className="lineFilter">
        <label className="label">Tên dịch vụ</label>
        <select
          value={filterServiceName}
          onChange={(e) => {
            setfilterServicePrice("");
            setfilterServiceName(e.target.value);
          }}
          className="select"
        >
          <option></option>
          {listService.map((item) => {
            return <option>{item.tendichvu}</option>;
          })}
        </select>
        <label className="label">Sắp xếp giá dịch vụ</label>
        <select
          value={filterServicePrice}
          onChange={(e) => {
            setfilterServiceName("");
            setfilterServicePrice(e.target.value);
          }}
          className="select"
        >
          <option></option>
          <option value="ASC">Tăng dần</option>
          <option value="DESC">Giảm dần</option>
        </select>

        <button type="submit" className="btnSearch" onClick={handleRefetch}>
          Tìm
        </button>
      </form>
      <table>
        <tr>
          <th>STT</th>
          <th>Tên dịch vụ</th>
          <th>Giá tiền</th>
        </tr>
        {currentItems.map((item, index) => {
          return (
            <tr>
              <td>{index + 1}</td>
              <td>{item.tendichvu}</td>
              <td>{item.giadichvu}</td>
            </tr>
          );
        })}
      </table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousClassName="page-num"
        nextLinkClassName="page-num"
        activeClassName="active"
      />
    </div>
  );
}

export default Service;

// <DashboardLayout>
//   <DashboardNavbar />
//   <ArgonBox py={3}>
//     <Grid container spacing={3} mb={3}>
//       <Grid item xs={12} md={6} lg={3}>
//         <DetailedStatisticsCard
//           title="today's money"
//           count="$53,000"
//           icon={{
//             color: "info",
//             component: <i className="ni ni-money-coins" />,
//           }}
//           percentage={{
//             color: "success",
//             count: "+55%",
//             text: "since yesterday",
//           }}
//         />
//       </Grid>
//       <Grid item xs={12} md={6} lg={3}>
//         <DetailedStatisticsCard
//           title="today's users"
//           count="2,300"
//           icon={{
//             color: "error",
//             component: <i className="ni ni-world" />,
//           }}
//           percentage={{
//             color: "success",
//             count: "+3%",
//             text: "since last week",
//           }}
//         />
//       </Grid>
//       <Grid item xs={12} md={6} lg={3}>
//         <DetailedStatisticsCard
//           title="new clients"
//           count="+3,462"
//           icon={{
//             color: "success",
//             component: <i className="ni ni-paper-diploma" />,
//           }}
//           percentage={{
//             color: "error",
//             count: "-2%",
//             text: "since last quarter",
//           }}
//         />
//       </Grid>
//       <Grid item xs={12} md={6} lg={3}>
//         <DetailedStatisticsCard
//           title="sales"
//           count="$103,430"
//           icon={{
//             color: "warning",
//             component: <i className="ni ni-cart" />,
//           }}
//           percentage={{
//             color: "success",
//             count: "+5%",
//             text: "than last month",
//           }}
//         />
//       </Grid>
//     </Grid>
//     <Grid container spacing={3} mb={3}>
//       <Grid item xs={12} lg={7}>
//         <GradientLineChart
//           title="Sales Overview"
//           description={
//             <ArgonBox display="flex" alignItems="center">
//               <ArgonBox
//                 fontSize={size.lg}
//                 color="success"
//                 mb={0.3}
//                 mr={0.5}
//                 lineHeight={0}
//               >
//                 <Icon sx={{ fontWeight: "bold" }}>arrow_upward</Icon>
//               </ArgonBox>
//               <ArgonTypography
//                 variant="button"
//                 color="text"
//                 fontWeight="medium"
//               >
//                 4% more{" "}
//                 <ArgonTypography
//                   variant="button"
//                   color="text"
//                   fontWeight="regular"
//                 >
//                   in 2022
//                 </ArgonTypography>
//               </ArgonTypography>
//             </ArgonBox>
//           }
//           chart={gradientLineChartData}
//         />
//       </Grid>
//       <Grid item xs={12} lg={5}>
//         <Slider />
//       </Grid>
//     </Grid>
//     <Grid container spacing={3}>
//       <Grid item xs={12} md={8}>
//         <SalesTable title="Sales by Country" rows={salesTableData} />
//       </Grid>
//       <Grid item xs={12} md={4}>
//         <CategoriesList
//           title="categories"
//           categories={categoriesListData}
//         />
//       </Grid>
//     </Grid>
//   </ArgonBox>
//   <Footer />
// </DashboardLayout>
