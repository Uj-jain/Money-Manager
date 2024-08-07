import React from "react";
import "../../../styles/frndPop.css";
import { instance } from "../../../utils/AxiosConfig";
import { store } from "../../../redux/store";
import { connect } from "react-redux";
import { actionCreator } from "../../../redux/actions/action";
import { SET_USER } from "../../../redux/actions/actionTypes";
import { useSelector, useDispatch } from "react-redux";
import { addFriend, setUser } from "../../../redux/reducers/userReducer";

const Friend = (props) => {
  var takeInp = { defaultUser: "" };
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  return (
    <div className="friendPopup">
      <div className="frnd-content">
        <div className="frnd-header">
          <span>Add a Friend</span>
          <button className="float-right" onClick={props.friend}>
            <i class="fas fa-times" />
          </button>
        </div>

        <input
          id="username"
          onChange={(event) => {
            takeInp[event.target.id] = event.target.value;
          }}
          placeholder="Type a username"
          className="frnd-name"
          type="text"
        />

        <div className="pop-btn">
          <button
            className="btn Add"
            onClick={() => {
              takeInp.defaultUser = user.username;

              if (takeInp.username == user.username) {
                alert("you can't add yourself as your Friend");
                return;
              }
              instance
                .post("/AddFriend", takeInp)
                .then((resp) => {
                  if (resp.data.success) {
                    dispatch(setUser(resp.data.doc));
                  } else {
                    alert('Failed to add friend');
                    console.log("user not found");
                  }
                })
                .catch((err) => {
                  alert('Failed to add friend');
                  console.log(err);
                });
            }}
          >
            Add Friend
          </button>

          <button className="btn cut" onClick={props.friend}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Friend;
