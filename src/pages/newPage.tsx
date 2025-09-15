import React, { useEffect } from "react";

const sideMenuArray = new Array<any>(11).fill(1);
const dashboardArray = new Array<any>(10).fill(5);
const footerArray = new Array<any>(4).fill(9);

const NewPage = () => {
  useEffect(() => {}, []);

  useEffect(() => {}, []);
  return (
    <div
      style={{
        display: "flex",
        columnGap: "1rem",
        border: "1px solid green",
        padding: "1rem",
        width: "75%",
      }}
    >
      <div
        id="sideMenu"
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          rowGap: "0.5rem",
          border: "1px solid red",
          margin: "1rem",
          padding: "1rem",
        }}
      >
        {sideMenuArray.map((num, index) => (
          <div
            key={index}
            style={{ border: "1px solid gray", margin: ".25rem" }}
          >
            {num}
          </div>
        ))}
      </div>
      <div
        id="homepage"
        style={{
          flex: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          rowGap: "1rem",
          border: "1px solid orange",
          margin: "1rem",
          padding: "1rem",
        }}
      >
        <div
          id="dashboard"
          style={{
            flex: 3,
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            columnGap: ".5rem",
            rowGap: ".5rem",
            border: "1px solid blue",
            padding: "1rem",
          }}
        >
          {dashboardArray.map((dashElement, index) => (
            <div></div>
          ))}
        </div>
        <div
          id="footer"
          style={{
            flex: 1,
            display: "flex",
            columnGap: "1rem",
            padding: "1rem",
            border: "1px solid pink",
          }}
        >
          {footerArray.map((footerElement, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "1rem",
                // margin: "0.5rem",
                padding: "1rem",
                border: "1px solid yellow",
              }}
            >
              {[1, 2].map((item, index) => (
                <div
                  key={index}
                  style={{ border: "1px solid gray", margin: ".25rem" }}
                >
                  {footerElement - index}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewPage;
