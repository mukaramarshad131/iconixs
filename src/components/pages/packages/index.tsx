import { businessPackages } from "@/data/projectData";
import { CrownOutlined } from "@ant-design/icons";
import SubscribeBtn from "./subscribeBtn";
import Ribon from "./ribon";

function Packages() {

  return (
    <>
      <h1 className="p-5 text-center text-3xl font-semibold text-[#0092B3] mb-5">
        Packages Plan
      </h1>
      <div className="mb-5 flex flex-wrap items-center justify-center gap-5">
        {businessPackages?.map((data: any) => {
          return (
            <div
              key={data.id}
              style={{ padding: "0px", height: 400, width: 330 }}
              className="relative z-0 rounded bg-[#F3F4F5] shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]"
            >
              <Ribon data={data}/>
              <div
                className="absolute left-[125px] top-[120px] z-10 flex h-[70px] w-[70px] items-center justify-center bg-[#D1D6DA]"
                style={{ borderRadius: "50%" }}
              >
                <CrownOutlined style={{ fontSize: 50, color: "#c9a112" }} />
              </div>
              <div
                style={{
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                  paddingBottom: "80px",
                  background: data?.backgroundColor,
                  paddingTop: "25px",
                  clipPath: "polygon(0 0,100% 0, 100% 71%, 0 100%)",
                }}
                className="flex w-full flex-col px-5 text-center"
              >
                <div className="mt-[37px] flex flex-col">
                  <span className="text-[#D1D6DA]">{data.originalPrice}</span>
                </div>
              </div>

              <div
                style={{
                  borderBottomLeftRadius: "10px",
                  borderBottomRightRadius: "10px",
                }}
                className=" bg-[#F3F4F5] p-3 py-5"
              >
                <div>
                  {data.description}
                  <ul className="mb-5 mt-5 text-[15px] font-semibold">
                    <span className="bold-1 text-lg"> {data.packageName}</span>
                  </ul>
                </div>
              </div>
              <div className="absolute bottom-3 flex w-full items-center justify-center p-5">
              <SubscribeBtn data={data}/>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Packages;
