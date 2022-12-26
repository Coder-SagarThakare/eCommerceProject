import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useNavigate, useSearchParams } from "react-router-dom";
// import CustomerRegistrationPage from "../Customer/CustomerRegistrationPage";
import { secureGet } from "../HttpService/APIService";
import getToken from "../HttpService/LocalStorageService";
import { DiYeoman } from "react-icons/di";
import OffCanvas from "../Customer/OffCanvas";
import { Button } from "react-bootstrap";

export default function Shopping({ loggedInUser }) {
  // states
  const [currentItems, setCurrentItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  // const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const [currentLoggedInUser, setCurrentLoggedInUser] = useState();
  const [showCanvas, setShowCanvas] = useState(false);
  const [paginationObj, setPaginationObj] = useState({
    sortBy: "",
    limit: 5,
    pageNo: 1,
    searchText: "",
  });

  const [totalPages, setTotalPages] = useState()

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
            setTotalPages(response.data.totalPages)
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
      console.log(response.data);
      setCurrentLoggedInUser(response.data);
      
    });
  }, [showCanvas]);

  // ==================== product list 
  const productList =
    currentItems &&
    currentItems.map((product, index) => {
      return (
        <div
          className="border p-2 rounded-3 h-auto mt-3 "
          style={{ width: "30%", boxSizing: "border-box", backgroundColor:'#d6d6d6'}}
          key={index}
        >
          <div
            className="border d-flex justify-content-center"
            style={{ height: "20vh", overflow: "hidden" , scrollbarWidth:'none'}}
          >
            <img
              className="h-100"
              style={{ objectFit: "cover" }}
              src={product.images[0]?.url}
            ></img>
          </div>

          <div className="rounded-3" >
            <p>product name : {product.name}</p>
            <p>price : {product.price}</p>
            <p className="text-truncate m-0">
              description : {product.description}
            </p>
          </div>
          <div className="d-flex justify-content-center mt-2">
          <Button variant="primary">Add to cart</Button>
          </div>

          {/* <button>{index}</button> */}
        </div>
      );
    });

  console.log(paginationObj);

  // ====================================return block
  return (
    <div className="d-flex justify-content-center flex-column align-items-center ">
      {/*=================== NavBar  */}
      <div
        className="navbar bg-secondary d-flex justify-content-between align-items-center border w-100 "
        style={{ padding: "0 2%" }}
      >
        <p>online shopping</p>

        {getToken("activeCustomerToken") ? (
          <div
            className="d-flex flex-column align-items-center justify-content-center"
            onClick={() => {
              console.log("heii");
              setShowCanvas(true);
            }}
          >
            <button className="bg-transparent border-1">
              <DiYeoman />
              <p>{currentLoggedInUser?.name}</p>
            </button>
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

      {/* ================= sort by, limit, page no*/}
      <div className="w-100 d-flex justify-content-between p-2">
        {/* search box div */}
        <div>
          <input
          className="w-50"
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
            <p>page  <b>{paginationObj?.pageNo}</b> out of <b>{totalPages}</b></p>
          </div>

        <div className="d-flex justify-content-end align-items-center">
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
          className="w-25"

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
          className="w-25"
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
        className=" border border-danger   w-75 p-3 "
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          overflowY: "scroll",
          gap: "2%",
          columnCount: "3",
          boxSizing: "border-box",
          height: "70vh",
        }}
      >
        {productList}
      </div>
    </div>
  );
}
