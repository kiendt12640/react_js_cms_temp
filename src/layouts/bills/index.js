import "./index.css";
import api from "../../middleware/api";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";

function Bill() {
  const navigate = useNavigate();

  const [trangThaiDon, settrangThaiDon] = useState("");
  const [khachHang, setkhachHang] = useState("");
  const [ngayThanhToan, setngayThanhToan] = useState("");
  const [ngayNhanHang, setngayNhanHang] = useState("");
  const [ngayTraHang, setngayTraHang] = useState("");

  const [dichVu, setDichVu] = useState("");
  const [soluong, setSoLuong] = useState("");
  const [listDichVu, setListDichVu] = useState([]);
  const [listBillDetail, setlistBillDetail] = useState([]);

  const [listTrangThai, setListTrangThai] = useState([]);
  const [listKhachHang, setlistKhachHang] = useState([]);

  const [updateId, setUpdateId] = useState("");

  const [listBill, setlistBill] = useState([]);

  //State filter
  const [filtertrangThaiDon, setfiltertrangThaiDon] = useState("");
  const [filterKhachHang, setfilterKhachHang] = useState("");

  const [load, setLoad] = useState(true);

  const [formAdd, setFormAdd] = useState(false);

  // State pagination form
  const [currentItemsform, setCurrentItemsform] = useState([]);
  const [pageCountform, setPageCountform] = useState(0);
  const [itemOffsetform, setItemOffsetform] = useState(0);
  const itemsPerPageForm = 4;

  useEffect(() => {
    const endOffsetform = itemOffsetform + itemsPerPageForm;
    setCurrentItemsform(listBillDetail.slice(itemOffsetform, endOffsetform));
    setPageCountform(Math.ceil(listBillDetail.length / itemsPerPageForm));
  }, [itemOffsetform, itemsPerPageForm, listBillDetail]);

  const handlePageClickform = (event) => {
    const newOffsetform =
      (event.selected * itemsPerPageForm) % listBillDetail.length;
    setItemOffsetform(newOffsetform);
  };

  // State pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(listBill.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(listBill.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, listBill]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % listBill.length;
    setItemOffset(newOffset);
  };

  const resetForm = () => {
    settrangThaiDon("");
    setkhachHang("");
    setngayThanhToan("");
    setngayNhanHang("");
    setngayTraHang("");
    setlistBillDetail([]);
    setSoLuong("");
    setDichVu("");
    setUpdateId("");
  };

  const handleModifyBill = async (e) => {
    e.preventDefault();
    const dataAdd = {
      trangthaidonID: listTrangThai[0].id,
      khachhangID: khachHang,
      ngaythanhtoan: ngayThanhToan,
      ngaynhanhang: ngayNhanHang,
      ngaytrahang: ngayTraHang,
      listBillDetail,
    };

    const dataUpdate = {
      trangthaidonID: trangThaiDon,
      khachhangID: khachHang,
      ngaythanhtoan: ngayThanhToan,
      ngaynhanhang: ngayNhanHang,
      ngaytrahang: ngayTraHang,
    };

    // Update
    if (updateId) {
      try {
        await api.put(`/bill/${updateId}`, dataUpdate);
        setLoad(!load);
        resetForm();
        setFormAdd(false);
        window.alert("Sửa thành công!");
      } catch (err) {
        console.log(err);
      }
      // Add
    } else {
      try {
        await api.post("/bill", dataAdd);
        setLoad(!load);
        resetForm();
        setFormAdd(false);
        window.alert("Thêm thành công!");
      } catch (err) {
        console.log(err);
      }
    }
  };

  //Render
  useEffect(() => {
    const getTrangThaiDon = async () => {
      const trangthai = await callAPI("/status_bill");
      setListTrangThai(trangthai);
    };

    const getkhachhang = async () => {
      const kh = await callAPI("/customer");
      setlistKhachHang(kh);
    };

    const getBill = async () => {
      await callAPI2("/bill");
    };

    const getDichVu = async () => {
      const dichVu = await callAPI("/service");
      setListDichVu(dichVu);
    };

    getDichVu();
    getTrangThaiDon();
    getkhachhang();
    getBill();
  }, [load]);

  const callAPI = async (route) => {
    try {
      const res = await api.get(route);
      return res.data.data;
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
            setlistBill([]);
          } else {
            setlistBill(res.data.data);
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
      const res = await api.get("/bill", {
        params: {
          trangthaidonID: filtertrangThaiDon,
          khachhangID: filterKhachHang,
        },
      });
      setlistBill(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Delete
  const deleteBill = async (id) => {
    const checkDelete = {
      checkDelete: 1,
    };
    if (window.confirm("Xóa hóa đơn ?") === true) {
      try {
        await api.put(`/bill/${id}`, checkDelete);
        setLoad(!load);
        resetForm();
      } catch (err) {
        console.log(err);
      }
    } else {
      setLoad(!load);
    }
  };

  const deleteBillDetail = (item) => {
    const newListBillDetail = listBillDetail.filter(function (value) {
      return value != item;
    });
    setlistBillDetail(newListBillDetail);
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
                  className="formAddBill"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  onSubmit={handleModifyBill}
                >
                  <div className="formLine1">
                    {updateId ? <h2>Sửa hóa đơn</h2> : <h2>Thêm hóa đơn</h2>}
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
                  <div className="listElementForm">
                    <div>
                      {updateId ? (
                        <div>
                          <label className="label">Trạng thái đơn</label>
                          <select
                            value={trangThaiDon}
                            style={{
                              color: trangThaiDon ? "black" : "#cecece",
                            }}
                            onChange={(e) => settrangThaiDon(e.target.value)}
                            className="select"
                          >
                            <option value="" style={{ color: "#cecece" }}>
                              Chưa có trạng thái
                            </option>
                            {listTrangThai.map((item) => {
                              return (
                                <option
                                  style={{ color: "black" }}
                                  value={item.id}
                                >
                                  {item.trangthai}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      ) : (
                        <div></div>
                      )}

                      <label className="label">Khách hàng</label>
                      <select
                        value={khachHang}
                        onChange={(e) => setkhachHang(e.target.value)}
                        className="select"
                      >
                        <option></option>
                        {listKhachHang.map((item) => {
                          return <option value={item.id}>{item.name}</option>;
                        })}
                      </select>
                      {updateId && (
                        <div>
                          <label className="label">Ngày thanh toán</label>
                          <input
                            defaultValue={new Date(
                              ngayThanhToan
                            ).toLocaleDateString("en-CA")}
                            onChange={(e) => setngayThanhToan(e.target.value)}
                            className="inp"
                            placeholder="Ngày thanh toán"
                            type="date"
                          ></input>
                        </div>
                      )}

                      <label className="label">Ngày nhận hàng</label>
                      <input
                        defaultValue={new Date(ngayNhanHang).toLocaleDateString(
                          "en-CA"
                        )}
                        onChange={(e) => setngayNhanHang(e.target.value)}
                        className="inp"
                        placeholder="Ngày nhận hàng"
                        type="date"
                      ></input>
                      <label className="label">Ngày trả hàng</label>
                      <input
                        defaultValue={new Date(ngayTraHang).toLocaleDateString(
                          "en-CA"
                        )}
                        onChange={(e) => setngayTraHang(e.target.value)}
                        className="inp"
                        placeholder="Ngày nhận hàng"
                        type="date"
                      ></input>
                    </div>
                    <div>
                      {updateId ? (
                        <div></div>
                      ) : (
                        <form className="formAddBillDetail">
                          <select
                            value={dichVu}
                            onChange={(e) => {
                              setDichVu(e.target.value);
                            }}
                            className="select"
                            name="service"
                          >
                            <option></option>
                            {listDichVu.map((item) => {
                              return (
                                <option value={item.id}>
                                  {item.tendichvu}
                                </option>
                              );
                            })}
                          </select>
                          <input
                            value={soluong}
                            onChange={(e) => {
                              setSoLuong(e.target.value);
                            }}
                            type="text"
                            placeholder="Số lượng"
                            className="inputSoLuong"
                          ></input>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setlistBillDetail([
                                ...listBillDetail,
                                { dichvuID: dichVu, soluong: soluong },
                              ]);
                              setSoLuong("");
                              setDichVu("");
                            }}
                            className="btnAddBillDetail"
                          >
                            Thêm
                          </button>
                        </form>
                      )}

                      <table>
                        <tr>
                          <th>Tên dịch vụ</th>
                          <th>Số lượng</th>
                          <th>Thành tiền</th>
                        </tr>
                        {currentItemsform.map((item, index) => {
                          return (
                            <tr>
                              <td>
                                {listDichVu?.find(
                                  ({ id }) => id == item.dichvuID
                                ) &&
                                  listDichVu?.find(
                                    ({ id }) => id == item.dichvuID
                                  ).tendichvu}
                              </td>
                              <td>{item.soluong}</td>
                              <td>
                                {listDichVu?.find(
                                  ({ id }) => id == item.dichvuID
                                ) &&
                                  listDichVu?.find(
                                    ({ id }) => id == item.dichvuID
                                  ).giadichvu * item.soluong}
                              </td>
                              {updateId ? (
                                <div></div>
                              ) : (
                                <td>
                                  <button
                                    className="btnDeleteBillDetail"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      deleteBillDetail(item);
                                    }}
                                  >
                                    Xóa
                                  </button>
                                </td>
                              )}
                            </tr>
                          );
                        })}
                      </table>
                      <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handlePageClickform}
                        pageRangeDisplayed={3}
                        pageCount={pageCountform}
                        previousLabel="< previous"
                        renderOnZeroPageCount={null}
                        containerClassName="pagination"
                        pageLinkClassName="page-num"
                        previousClassName="page-num"
                        nextLinkClassName="page-num"
                        activeClassName="active"
                      />
                    </div>
                  </div>
                  <div className="listBtnBill">
                    <button
                      className="btnFormBill cancel"
                      onClick={() => {
                        setFormAdd(false);
                        resetForm();
                      }}
                    >
                      Hủy
                    </button>
                    <button type="submit" className="btnFormBill btnSubmit">
                      Xác nhận
                    </button>
                  </div>
                </form>
              </div>
              <div className="line1">
                <h3>Danh sách hóa đơn</h3>
                <button className="btnAdd" onClick={() => setFormAdd(true)}>
                  Tạo hóa đơn
                </button>
              </div>
              <form className="lineFilter">
                <select
                  value={filtertrangThaiDon}
                  onChange={(e) => setfiltertrangThaiDon(e.target.value)}
                  className="select"
                >
                  <option></option>
                  {listTrangThai.map((item) => {
                    return <option value={item.id}>{item.trangthai}</option>;
                  })}
                </select>

                <select
                  value={filterKhachHang}
                  onChange={(e) => setfilterKhachHang(e.target.value)}
                  className="select"
                >
                  <option></option>
                  {listKhachHang.map((item) => {
                    return <option value={item.id}>{item.name}</option>;
                  })}
                </select>

                <button
                  type="submit"
                  className="btnSearch"
                  onClick={handleRefetch}
                >
                  Tìm
                </button>
              </form>
              <table>
                <tr>
                  <th>STT</th>
                  <th>Trạng thái</th>
                  <th>Nhân viên</th>
                  <th>Tổng tiền</th>
                  <th>Ngày thanh toán</th>
                  <th>Ngày nhận hàng </th>
                  <th>Ngày trả hàng </th>
                  <th>Hành động</th>
                </tr>
                {currentItems.map((item, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.trangthai}</td>
                      <td>{item.khach_hang_name}</td>
                      <td>{item.tongtien}</td>
                      <td>
                        {item.ngaythanhtoan &&
                          moment(item.ngaythanhtoan).format("L")}
                      </td>
                      <td>
                        {item.ngaynhanhang &&
                          moment(item.ngaynhanhang).format("L")}
                      </td>
                      <td>
                        {item.ngaytrahang &&
                          moment(item.ngaytrahang).format("L")}
                      </td>
                      <td>
                        <div className="action">
                          <button
                            className="btnAction btnEdit"
                            onClick={() => {
                              settrangThaiDon(item.trangthaidonID);
                              setkhachHang(item.khachhangID);
                              setngayThanhToan(item.ngaythanhtoan);
                              setngayNhanHang(item.ngaynhanhang);
                              setngayTraHang(item.ngaytrahang);
                              setUpdateId(item.hoa_don_id);
                              setlistBillDetail(item.hdct);
                              setFormAdd(true);
                            }}
                          >
                            Chi tiết
                          </button>
                          <button
                            className="btnAction btnDelete"
                            onClick={(e) => {
                              e.preventDefault();
                              deleteBill(item.hoa_don_id);
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
                <h3>Danh sách hóa đơn</h3>

                <button className="btnAdd" onClick={() => setFormAdd(true)}>
                  Tạo hóa đơn
                </button>
              </div>
              <form className="lineFilter">
                <select
                  value={filtertrangThaiDon}
                  onChange={(e) => setfiltertrangThaiDon(e.target.value)}
                  className="select"
                >
                  <option></option>
                  {listTrangThai.map((item) => {
                    return <option value={item.id}>{item.trangthai}</option>;
                  })}
                </select>

                <select
                  value={filterKhachHang}
                  onChange={(e) => setfilterKhachHang(e.target.value)}
                  className="select"
                >
                  <option></option>
                  {listKhachHang.map((item) => {
                    return <option value={item.id}>{item.name}</option>;
                  })}
                </select>
                {listBill.length > 0 ? (
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
                  <th>Trạng thái</th>
                  <th>Khách hàng</th>
                  <th>Tổng tiền</th>
                  <th>Ngày thanh toán</th>
                  <th>Ngày nhận hàng </th>
                  <th>Ngày trả hàng </th>
                  <th>Hành động</th>
                </tr>
                {currentItems.map((item, index) => {
                  if (item.xacNhanXoa == 0) {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.trangthai}</td>
                        <td>{item.khach_hang_name}</td>
                        <td>{item.tongtien}</td>
                        <td>
                          {item.ngaythanhtoan &&
                            moment(item.ngaythanhtoan).format("L")}
                        </td>
                        <td>
                          {item.ngaynhanhang &&
                            moment(item.ngaynhanhang).format("L")}
                        </td>
                        <td>
                          {item.ngaytrahang &&
                            moment(item.ngaytrahang).format("L")}
                        </td>

                        <td>
                          <div className="action">
                            <button
                              className="btnAction btnEdit"
                              onClick={() => {
                                settrangThaiDon(item.trangthaidonID);
                                setkhachHang(item.khachhangID);
                                setngayThanhToan(item.ngaythanhtoan);
                                setngayNhanHang(item.ngaynhanhang);
                                setngayTraHang(item.ngaytrahang);
                                setlistBillDetail(item.hdct);
                                setUpdateId(item.hoa_don_id);
                                setFormAdd(true);
                              }}
                            >
                              Chi tiết
                            </button>
                            <button
                              className="btnAction btnDelete"
                              onClick={(e) => {
                                e.preventDefault();
                                deleteBill(item.hoa_don_id);
                              }}
                            >
                              Xóa
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  }
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

export default Bill;
