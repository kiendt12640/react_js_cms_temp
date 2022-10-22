import api from "../../middleware/api";
import "./index.css";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

function Default() {
  // const { size } = typography;
  const navigate = useNavigate();

  const [accName, setAccName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [trangthai, setTrangThai] = useState("");

  const [updateId, setUpdateId] = useState("");

  const [listTrangThai, setListTrangThai] = useState([]);
  const [listNV, setlistNV] = useState([]);

  //State filter
  const [filterName, setfilterName] = useState("");
  const [filterPhoneNumber, setfilterPhoneNumber] = useState("");
  const [filterTrangThai, setfilterTrangThai] = useState("");

  const [load, setLoad] = useState(true);

  const [formAdd, setFormAdd] = useState(false);

  // State pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(listNV.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(listNV.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, listNV]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % listNV.length;
    setItemOffset(newOffset);
  };

  const resetForm = () => {
    setAccName("");
    setPhoneNumber("");
    setTrangThai("");
    setUpdateId("");
  };

  const handleModifyNV = async (e) => {
    e.preventDefault();
    const data = {
      name: accName,
      phoneNumber: phoneNumber,
      trangthaiID: trangthai,
    };
    // Update
    if (updateId) {
      try {
        await api.put(`/employee/${updateId}`, data);
        resetForm();
        setLoad(!load);
      } catch (err) {
        console.log(err);
      }
      // Add
    } else {
      let check = 0;
      listNV.forEach((item) => {
        if (item.phoneNumber === data.phoneNumber) {
          window.alert("Số điện thoại đã tồn tại!");
          check++;
        } else {
          setLoad(!load);
        }
      });
      if (check == 0) {
        try {
          const response = await api.post("/employee", data);
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
    const getTrangThai = async () => {
      const trangthai = await callAPI("/status");
      setListTrangThai(trangthai);
    };

    const getNV = async () => {
      await callAPI2("/employee");
      // setlistNV(nv);
    };

    getTrangThai();
    getNV();
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
            setlistNV([]);
          } else {
            setlistNV(res.data);
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
      const res = await api.get("/employee", {
        params: {
          name: filterName,
          phoneNumber: filterPhoneNumber,
          trangthaiID: filterTrangThai,
        },
      });
      setlistNV(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Delete
  const deleteNV = async (id) => {
    if (window.confirm("Xóa nhân viên ?") === true) {
      try {
        await api.delete(`/employee/${id}`);
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
                  onSubmit={handleModifyNV}
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
                  <label className="label">Tên tài khoản</label>
                  <input
                    value={accName}
                    onChange={(e) => setAccName(e.target.value)}
                    className="inp"
                    placeholder="Tên tài khoản"
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
                  <label className="label">Duyệt tài khoản</label>
                  <select
                    value={trangthai}
                    onChange={(e) => setTrangThai(e.target.value)}
                    className="select"
                  >
                    <option></option>
                    {listTrangThai.map((item) => {
                      return <option value={item.id}>{item.trangthai}</option>;
                    })}
                  </select>

                  <div className="listBtn">
                    <button
                      className="btnForm cancel"
                      onClick={() => {
                        setFormAdd(false);
                        resetForm();
                      }}
                    >
                      Hủy
                    </button>
                    <button type="submit" className="btnForm btnSubmit">
                      Xác nhận
                    </button>
                  </div>
                </form>
              </div>
              <div className="line1">
                <h3>Danh sách tài khoản</h3>
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
                <select
                  value={filterTrangThai}
                  onChange={(e) => setfilterTrangThai(e.target.value)}
                  className="select"
                >
                  <option></option>
                  {listTrangThai.map((item) => {
                    return <option value={item.id}>{item.trangthai}</option>;
                  })}
                </select>
                <button type="submit" className="btnSearch" value="Tìm kiếm">
                  Tìm
                </button>
              </form>
              <table>
                <tr>
                  <th>STT</th>
                  <th>Tên tài khoản</th>
                  <th>Số điện thoại</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
                {currentItems.map((item, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.phoneNumber}</td>
                      <td>
                        <a className="activeAcc">{item.trangthai}</a>
                      </td>
                      <td>
                        <div className="action">
                          <button
                            className="btnAction btnEdit"
                            onClick={() => {
                              console.log(item.nv_id);
                              setAccName(item.name);
                              setPhoneNumber(item.phoneNumber);
                              setTrangThai(item.trangthaiID);
                              setUpdateId(item.nv_id);
                              setFormAdd(true);
                            }}
                          >
                            Sửa
                          </button>
                          <button
                            className="btnAction btnDelete"
                            onClick={(e) => {
                              e.preventDefault();
                              deleteNV(item.nv_id);
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
                <h3>Danh sách tài khoản</h3>

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
                <select
                  value={filterTrangThai}
                  onChange={(e) => setfilterTrangThai(e.target.value)}
                  className="select"
                >
                  <option></option>
                  {listTrangThai.map((item) => {
                    return <option value={item.id}>{item.trangthai}</option>;
                  })}
                </select>
                {listNV.length > 0 ? (
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
                  <th>Tên tài khoản</th>
                  <th>Số điện thoại</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
                {currentItems.map((item, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.phoneNumber}</td>
                      <td>
                        <a className="activeAcc">{item.trangthai}</a>
                      </td>
                      <td>
                        <div className="action">
                          <button
                            className="btnAction btnEdit"
                            onClick={() => {
                              console.log(item.nv_id);
                              setAccName(item.name);
                              setPhoneNumber(item.phoneNumber);
                              setTrangThai(item.trangthaiID);
                              setUpdateId(item.nv_id);
                              setFormAdd(true);
                            }}
                          >
                            Sửa
                          </button>
                          <button
                            className="btnAction btnDelete"
                            onClick={(e) => {
                              e.preventDefault();
                              deleteNV(item.nv_id);
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

export default Default;
