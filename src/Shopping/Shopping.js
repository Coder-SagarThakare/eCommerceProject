import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// import CustomerRegistrationPage from "../Customer/CustomerRegistrationPage";
import { secureGet } from "../HttpService/APIService";
import getToken from "../HttpService/LocalStorageService";

import { CgProfile } from "react-icons/cg";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { DiYeoman } from "react-icons/di";

import OffCanvas from "../Customer/OffCanvas";
import { Badge, Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux"; // disptach action ko trigger krta hai. action ko call karke batat hai ki muze yeh chahiye. fir action reducer k pass chala jayega
import { incNumber, decNumber, addToCart } from "../Redux/Actions/action";
import store from "../Redux/store";

export default function Shopping({ loggedInUser }) {
  // states
  const [currentItems, setCurrentItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  // const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  console.log(store.getState().dataAddedToCart.length);
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState();
  const [showCanvas, setShowCanvas] = useState(false);
  const [paginationObj, setPaginationObj] = useState({
    sortBy: "",
    limit: 5,
    pageNo: 1,
    searchText: "",
  });
  const [totalPages, setTotalPages] = useState();
  const cartItem = useSelector((state) => state.dataAddedToCart.length);
  console.log(cartItem);

  // ====================== useEffect
  useEffect(() => {
    // console.log(searchParams.get("user"));
    // setCurrentLoggedInUser(JSON.parse(searchParams.get("user")));

    if (paginationObj.limit !== "" && paginationObj.pageNo !== "")
      paginationObj?.sortBy === ""
        ? secureGet(
            `/shop/products?limit=${paginationObj.limit}&page=${paginationObj.pageNo}`
          ).then((response) => {
            console.log(response);
            setCurrentItems(response.data.results);
            setTotalPages(response.data.totalPages);
          })
        : secureGet(
            `/shop/products?sortBy=${paginationObj.sortBy}&limit=${paginationObj.limit}&page=${paginationObj.pageNo}`
          ).then((response) => {
            console.log(response);
            setCurrentItems(response.data.results);
          });

    searchText &&
      secureGet(
        `/shop/products?limit=${paginationObj.limit}&page=${paginationObj.pageNo}&name=${paginationObj.searchText}`
      ).then((response) => {
        console.log(response.data.results);
        setCurrentItems(response.data.results);
      });
  }, [paginationObj]);

  useEffect(() => {
    secureGet("shop/auth/self").then((response) => {
      // console.log(response.data);
      setCurrentLoggedInUser(response.data);
    });
  }, [showCanvas]);

  // ==================== product list
  const productList =
    currentItems &&
    currentItems.map((product, index) => {
      return (
        <div
          className="border py-2 px-2 rounded-3 h-auto mt-3 bg-light gap-4 d-flex flex-column"
          style={{
            width: "22%",
            boxSizing: "border-box",
            boxShadow:
              "-2px -2px 14px rgba(0, 0, 0, 0.20), 7px 7px 16px rgba(0, 0, 0, 0.15)",
          }}
          key={index}
        >
          <div
            className=" d-flex justify-content-center"
            style={{
              height: "20vh",
              overflow: "hidden",
              scrollbarWidth: "none",
            }}
          >
            <img
              className="h-100"
              style={{ objectFit: "cover" }}
              src={product.images[0]?.url}
              alt="..."
            ></img>
          </div>

          <div className="rounded-3">
            <p className="m-0">product name : {product.name}</p>
            <p className="m-0">price : {product.price}</p>
            <p className="text-truncate m-0">
              description : {product.description}
            </p>
          </div>
          <div className="d-flex justify-content-center mt-2">
            <Button
              variant="primary"
              onClick={() => {
                product.quantity = 1;
                dispatch(addToCart(product));
              }}
            >
              Add to cart
            </Button>
          </div>

          {/* <button>{index}</button> */}
        </div>
      );
    });

  // console.log(paginationObj);

  const myState = useSelector((state) => {
    console.log(state);
    return state.changeNumber;
  });
  const dispatch = useDispatch();

  // const cartArr = useSelector();

  // ==================================== return block
  return (
    <div className="d-flex justify-content-center flex-column align-items-center ">
      {console.log("in shopping return block")}
      {/*=================== NavBar  */}
      <div
        className="navbar bg-secondary d-flex justify-content-between align-items-center border w-100 "
        style={{ padding: "0 2%" }}
      >
        <p>online shopping</p>

        {getToken("activeCustomerToken") ? (
          <div className="d-flex align-items-center gap-1">
            <div
            role={'button'}
              onClick={() => {
                navigate("/cart");
              }}
            >
              <TfiShoppingCartFull size={35} />
              <Badge bg="secondary">{cartItem} </Badge>|
            </div>

            <div
              className="d-flex  justify-content-center"
              onClick={() => {
                console.log("heii");
                setShowCanvas(true);
              }}
            >
              <button className="bg-transparent border-1">
                <DiYeoman />
                {/* <img src={currentLoggedInUser.images[0]}></img> */}
                <p>{currentLoggedInUser?.name}</p>
              </button>
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={() => {
                navigate("/registration");
              }}
            >
              Register <CgProfile />
            </button>

            <button onClick={() => navigate("/login")}>
              Login <CgProfile />
            </button>
          </div>
        )}
      </div>

      {showCanvas ? (
        <OffCanvas
          setShowCanvas={setShowCanvas}
          showCanvas={showCanvas}
          currentLoggedInUser={currentLoggedInUser}
          setCurrentLoggedInUser={setCurrentLoggedInUser}
        />
      ) : (
        ""
      )}

        {/* dummy inc dec redux
      <div>
        <button
          onClick={() => {
            console.log(" in onclick");
            dispatch(incNumber());
          }}
        >
          <span>+</span>
        </button>

        <input value={myState} onChange={() => {}} />
        <button onClick={() => dispatch(decNumber())}>
          <span>-</span>
        </button>
      </div> */}

      {/* ================= sort by, limit, page no*/}
      <div className="w-100 d-flex justify-content-between p-2" style={{boxShadow:'5px 5px 7px #d4d4d4'}}>
        {/* search box div */}
        <div>
          <input
            className="w-75"
            style={{ border: "0", borderBottom: "1px solid #a19f9f" }}
            placeholder="search item"
            onChange={(event) => setSearchText(event.target.value)}
          />

          <Button
            variant="primary"
            onClick={() => {
              setPaginationObj((prev) => {
                return { ...prev, searchText: searchText };
              });
            }}
          >
            Search
          </Button>
        </div>

        <div>
          <p>
            page <b>{paginationObj?.pageNo}</b> out of <b>{totalPages}</b>
          </p>
        </div>

        <div className="d-flex justify-content-end align-items-center w-25">
          <select
            onChange={(event) => {
              setPaginationObj((prev) => {
                return { ...prev, sortBy: event.target.value };
              });
              console.log(event.target.value);
            }}
          >
            <option value="">default</option>
            <option value="name">name</option>
            <option value="price">price</option>
          </select>

          {/*==== limit of products */}
          <input
            className=""
            style={{ width: "20%" }}
            placeholder="limit"
            type="number"
            defaultValue={paginationObj.limit}
            onChange={(event) => {
              setPaginationObj((prev) => {
                return {
                  ...prev,
                  limit: event.target.value,
                };
              });
            }}
          />

          {/* // page no */}
          <input
            className=""
            style={{ width: "20%" }}
            placeholder="enter page no"
            defaultValue={paginationObj.pageNo}
            onChange={(event) => {
              setPaginationObj((prev) => {
                return { ...prev, pageNo: event.target.value };
              });
              console.log(event.log.value);
            }}
          />
        </div>
      </div>

      {/* =========== list of prouct */}
      <div
        className=" w-100 p-3 mt-2"
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          overflowY: "scroll",
          backgroundColor: "#fff3e6",
          gap: "2%",
          columnCount: "4",
          boxSizing: "border-box",
          height: "70vh",

        }}
      >
        {productList}
      </div>

      <div className="border"></div>
    </div>
  );
}
