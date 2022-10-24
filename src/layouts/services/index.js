import "./index.css";
import api from "../../middleware/api";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

function Service() {
  const navigate = useNavigate();

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
      await callAPI2("/service");
      // setlistService(service);
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

  const callAPI2 = async (route) => {
    try {
      await api
        .get(route)
        .then((res) => {
          if (res.data.error_code === 498) {
            setlistService([]);
          } else {
            setlistService(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
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
      setlistService(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  {
    if (localStorage.getItem("token") === null) {
      navigate("/sign-in");
    } else {
      return (
        <div className="dashB">
          <div className="line1Service">
            <button
              className="btnLogout"
              onClick={() => {
                localStorage.clear();
                navigate("/sign-in");
              }}
            >
              Đăng xuất
            </button>
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
  }
}

export default Service;
