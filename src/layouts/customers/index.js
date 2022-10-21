import "./index.css";
import api from "../../middleware/api";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

function Customer() {
  // const { size } = typography;
  const navigate = useNavigate();

  const [accName, setAccName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [updateId, setUpdateId] = useState("");

  const [listKH, setlistKH] = useState([]);

  //State filter
  const [filterName, setfilterName] = useState("");
  const [filterPhoneNumber, setfilterPhoneNumber] = useState("");

  const [load, setLoad] = useState(true);

  const [formAdd, setFormAdd] = useState(false);

  // State pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(listKH.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(listKH.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, listKH]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % listKH.length;
    setItemOffset(newOffset);
  };

  const resetForm = () => {
    setAccName("");
    setPhoneNumber("");
    setUpdateId("");
  };

  const handleModifyKH = async (e) => {
    e.preventDefault();
    const data = {
      name: accName,
      phoneNumber: phoneNumber,
    };
    // Update
    if (updateId) {
      try {
        await api.put(`/customer/${updateId}`, data);
        resetForm();
        setLoad(!load);
      } catch (err) {
        console.log(err);
      }
      // Add
    } else {
      let check = 0;
      listKH.forEach((item) => {
        if (item.phoneNumber === data.phoneNumber) {
          window.alert("Số điện thoại đã tồn tại!");
          check++;
        } else {
          setLoad(!load);
        }
      });
      if (check == 0) {
        try {
          const response = await api.post("/customer", data);
          console.log(response.data);
          setLoad(!load);
          resetForm();
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  //Render
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/sign-in");
    } else {
      const getKH = async () => {
        await callAPI2("/customer");
        // setlistKH(kh);
      };

      getKH();
    }
  }, [load]);

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
            setlistKH([]);
          } else {
            setlistKH(res.data);
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
      const res = await api.get("/customer", {
        params: {
          name: filterName,
          phoneNumber: filterPhoneNumber,
        },
      });
      setlistKH(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Delete
  const deleteKH = async (id) => {
    if (window.confirm("Xóa khách hàng ?") === true) {
      try {
        await api.delete(`/customer/${id}`);
        setLoad(!load);
      } catch (err) {
        console.log(err);
      }
    } else {
      setLoad(!load);
    }
  };
  {
    if (localStorage.getItem("token") === null) {
      navigate("/sign-in");
    } else {
      return (
        <div className="dashB">
          {formAdd ? (
            <div>
              <div
                className="screenAdd"
                onClick={() => {
                  resetForm();
                  setFormAdd(false);
                }}
              >
                <form
                  className="formAdd"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  onSubmit={handleModifyKH}
                >
                  <div className="formLine1">
                    {updateId ? (
                      <h2>Sửa tài khoản</h2>
                    ) : (
                      <h2>Thêm tài khoản</h2>
                    )}
                    <button
                      className="btnX"
                      onClick={() => {
                        resetForm();
                        setFormAdd(false);
                      }}
                    >
                      x
                    </button>
                  </div>
                  <label className="label">Tên khách hàng</label>
                  <input
                    value={accName}
                    onChange={(e) => setAccName(e.target.value)}
                    className="inp"
                    placeholder="Tên khách hàng"
                    type="text"
                  ></input>
                  <label className="label">Số điện thoại</label>
                  <input
                    className="inp"
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Số điện thoại"
                  ></input>

                  <div className="listBtnKH">
                    <button
                      className="btnFormKH cancel"
                      onClick={() => {
                        setFormAdd(false);
                        resetForm();
                      }}
                    >
                      Hủy
                    </button>
                    <button type="submit" className="btnFormKH btnSubmit">
                      Xác nhận
                    </button>
                  </div>
                </form>
              </div>
              <div className="line1">
                <h3>Danh sách khách hàng</h3>
                <button className="btnAdd" onClick={() => setFormAdd(true)}>
                  Tạo tài khoản
                </button>
              </div>
              <form className="lineFilter">
                <input
                  value={filterName}
                  onChange={(e) => setfilterName(e.target.value)}
                  type="text"
                  className="filterName"
                  name="name"
                  placeholder="Tên"
                ></input>
                <input
                  value={filterPhoneNumber}
                  onChange={(e) => setfilterPhoneNumber(e.target.value)}
                  type="text"
                  className="filterPhoneNumber"
                  name="phoneNumber"
                  placeholder="Số điện thoại"
                ></input>

                <button type="submit" className="btnSearch">
                  Tìm
                </button>
              </form>
              <table>
                <tr>
                  <th>STT</th>
                  <th>Tên khách hàng</th>
                  <th>Số điện thoại</th>
                  <th>Hành động</th>
                </tr>
                {currentItems.map((item, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.phoneNumber}</td>
                      <td>
                        <div className="action">
                          <button
                            className="btnAction btnEdit"
                            onClick={() => {
                              setAccName(item.name);
                              setPhoneNumber(item.phoneNumber);
                              setUpdateId(item.khach_hang_id);
                              setFormAdd(true);
                            }}
                          >
                            Sửa
                          </button>
                          <button
                            className="btnAction btnDelete"
                            onClick={(e) => {
                              e.preventDefault();
                              deleteKH(item.khach_hang_id);
                            }}
                          >
                            Xóa
                          </button>
                        </div>
                      </td>
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
          ) : (
            <div>
              <div className="line1">
                <button
                  className="btnLogout"
                  onClick={() => {
                    localStorage.clear();
                    navigate("/sign-in");
                  }}
                >
                  Đăng xuất
                </button>
                <h3>Danh sách khách hàng</h3>
                <button className="btnAdd" onClick={() => setFormAdd(true)}>
                  Tạo tài khoản
                </button>
              </div>
              <form className="lineFilter">
                <input
                  value={filterName}
                  onChange={(e) => setfilterName(e.target.value)}
                  type="text"
                  className="filterName"
                  name="name"
                  placeholder="Tên"
                ></input>
                <input
                  value={filterPhoneNumber}
                  onChange={(e) => setfilterPhoneNumber(e.target.value)}
                  type="text"
                  className="filterPhoneNumber"
                  name="phoneNumber"
                  placeholder="Số điện thoại"
                ></input>
                {listKH.length > 0 ? (
                  <button
                    type="submit"
                    className="btnSearch"
                    onClick={handleRefetch}
                  >
                    Tìm
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btnSearch"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Bạn chưa đăng nhập!");
                    }}
                  >
                    Tìm
                  </button>
                )}
              </form>
              <table>
                <tr>
                  <th>STT</th>
                  <th>Tên khách hàng</th>
                  <th>Số điện thoại</th>
                  <th>Hành động</th>
                </tr>
                {currentItems.map((item, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.phoneNumber}</td>
                      <td>
                        <div className="action">
                          <button
                            className="btnAction btnEdit"
                            onClick={() => {
                              console.log(item.khach_hang_id);
                              setAccName(item.name);
                              setPhoneNumber(item.phoneNumber);
                              setUpdateId(item.khach_hang_id);
                              setFormAdd(true);
                            }}
                          >
                            Sửa
                          </button>
                          <button
                            className="btnAction btnDelete"
                            onClick={(e) => {
                              e.preventDefault();
                              deleteKH(item.khach_hang_id);
                            }}
                          >
                            Xóa
                          </button>
                        </div>
                      </td>
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
          )}
        </div>
      );
    }
  }
}

export default Customer;
