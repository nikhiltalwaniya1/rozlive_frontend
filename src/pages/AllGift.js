import React from "react";

//redux
import { useSelector, connect, useDispatch } from "react-redux";

//serverpath
import { baseURL } from "../util/Config";

//sweet alert
import { alert, warning, permissionError } from "../util/Alert";

//action
import { deleteGift } from "../store/gift/action";

// type
import { OPEN_GIFT_DIALOG } from "../store/gift/types";

//routing
import { useHistory } from "react-router-dom";

//image
import noImage from "../assets/images/noImage.png";

const AllGift = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const hasPermission = useSelector((state) => state.admin.admin.flag);

  const handleDelete = (giftId) => {
    const data = warning();
    data
      .then((isDeleted) => {
        if (isDeleted) {
          if (!hasPermission) return permissionError();
          props.deleteGift(giftId);
          alert("Deleted!", `Gift has been deleted!`, "success");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (data) => {
    dispatch({ type: OPEN_GIFT_DIALOG, payload: data });
  };
  return (
    <>
      {props.data?.gift?.length > 0 ? (
        props.data?.gift?.map((data, index) => {
          return (
            <>
              <div
                class="col-md-2"
                key={index}
                onClick={() => {
                  localStorage.setItem("CategoryId", data._id);
                  history.push("/admin/giftCategory/gift");
                }}
              >
                <div class="card contact-card card-bg">
                  <div class="card-body p-1">
                    <div className="row px-3 py-4">
                      <div className="col-5">
                        <img
                          src={data.image ? baseURL + data.image : noImage}
                          alt=""
                          class="rounded-circle"
                          height={80}
                        />
                      </div>
                      <div
                        className="col-7 "
                        style={{
                          padding: 0,
                          paddingLeft: 5,
                        }}
                      >
                        <div class="contact-card-info mt-2 mb-3 px-3">
                          <h6>Coin: {data.coin}</h6>
                        </div>
                        <div className="px-3">
                          <i
                            class="fas fa-edit text-white p-2 bg-primary rounded-circle"
                            style={{ marginRight: 10 }}
                            onClick={() => handleEdit(data)}
                          ></i>

                          <i
                            class="fas fa-trash text-white p-2 bg-danger rounded-circle"
                            onClick={() => handleDelete(data._id)}
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })
      ) : (
        <tr>
          <td colSpan="6" align="center">
            Nothing to show!!
          </td>
        </tr>
      )}
    </>
  );
};

export default connect(null, { deleteGift })(AllGift);
