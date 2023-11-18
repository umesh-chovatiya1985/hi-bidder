import { NextPage } from "next";
import CardView from "../../Admin/Components/Dashboard/CardView";
import StaticCardView from "../../Admin/Components/Dashboard/staticCardView";
import ReportCard from "../../Admin/Components/ReportCard";
import AdminLayout from "../../Admin/Layout/AdminLayout";
import { ChartData } from "../../utils/JsData/ChartData";
import { useState } from "react";
import { BarChart } from "../../Admin/Components/Charts/BarChart";
import { PieChart } from "../../Admin/Components/Charts/PieChart";
import { LineChart } from "../../Admin/Components/Charts/LineChart";

const layoutPage: NextPage = ({ children }: any) => {
  const reportCard = [
    {
      id_key: 1,
      fa_icon: "fa-shopping-cart",
      icon_color: "text-indigo-700",
      work_percent: "21%",
      work_state: "2528",
      work_title: "items sales",
      badge_color: "bg-indigo-400",
    },
    {
      id_key: 2,
      fa_icon: "fa-store",
      icon_color: "text-teal-700",
      work_percent: "6%",
      work_state: "8211",
      work_title: "new orders",
      badge_color: "bg-teal-400",
    },
    {
      id_key: 3,
      fa_icon: "fa-sitemap",
      icon_color: "text-red-700",
      work_percent: "72%",
      work_state: "7553",
      work_title: "total Products",
      badge_color: "bg-red-400",
    },
    {
      id_key: 4,
      fa_icon: "fa-users",
      icon_color: "text-green-700",
      work_percent: "150%",
      work_state: "3163",
      work_title: "new Visitor",
      badge_color: "bg-green-400",
    },
  ];

  const viewStatic = [
    {
      id_key: 1,
      count_number: 5668,
      count_title: "page view",
      count_icon: "fa-eye",
      icon_color: "teal",
    },
    {
      id_key: 2,
      count_number: 92,
      count_title: "Unique Users",
      count_icon: "fa-users-crown",
      icon_color: "indigo",
    },
  ];

  const viewStaticCounter = [
    {
      id_key: 1,
      header_count: 69,
      header_title: "Sales",
      sub_header_count: 23,
      sub_header_title: "payments",
      fa_icon: "fa-wallet",
      color: "indigo",
    },
    {
      id_key: 2,
      header_count: 5668,
      header_title: "page view",
      sub_header_count: 5668,
      sub_header_title: "page view",
      fa_icon: "fa-users-crown",
      color: "green",
    },
  ];

  const [chartData, setChartData] = useState({
    labels: ChartData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained ",
        data: ChartData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="grid grid-cols-4 gap-6 xl:grid-cols-1">
          {reportCard.map((reportstate: any) => (
            <ReportCard
              report={reportstate}
              key={reportstate.id_key}
            ></ReportCard>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-6 xl:grid-cols-1">
          <div className="card border-teal-400 shadow-md text-white">
            <div className="card-body">
              {/* <BarChart chartData={chartData} /> */}
              {/* <PieChart chartData={chartData} /> */}
              {/* <LineChart chartData={chartData} /> */}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="alert alert-dark mb-6">
              Hi! Wait A Minute . . . . . . Follow Me On Twitter
              <a
                className="ml-2"
                target="_blank"
                href="https://twitter.com/MohamedSaid__"
              >
                @moesaid
              </a>
            </div>
            <div className="grid grid-cols-2 gap-6 h-full">
              {viewStatic.map((staticView: any) => (
                <CardView
                  staticitems={staticView}
                  key={staticView.id_key}
                ></CardView>
              ))}
            </div>
          </div>
        </div>
        <div className="card mt-6">
          <div className="card-header flex flex-row justify-between">
            <h1 className="h6">Sales Overview</h1>
            <div className="flex flex-row justify-center items-center">
              <a href="">
                <i className="fa fa-chevron-double-down mr-6"></i>
              </a>
              <a href="">
                <i className="fa fa-ellipsis-v"></i>
              </a>
            </div>
          </div>
          <div className="card-body grid grid-cols-2 gap-6 lg:grid-cols-1">
            <div className="p-8">
              <h1 className="h2">5,337</h1>
              <p className="text-black font-medium">Sales this month</p>
              <div className="mt-20 mb-2 flex items-center">
                <div className="py-1 px-3 rounded bg-green-200 text-green-900 mr-3">
                  <i className="fa fa-caret-up"></i>
                </div>
                <p className="text-black">
                  <span className="num-2 text-green-400">60</span>
                  <span className="text-green-400">% more sales</span> in
                  comparison to last month.
                </p>
              </div>
              <div className="flex items-center">
                <div className="py-1 px-3 rounded bg-red-200 text-red-900 mr-3">
                  <i className="fa fa-caret-down"></i>
                </div>
                <p className="text-black">
                  <span className="num-2 text-red-400">11</span>
                  <span className="text-red-400">% revenue per sale</span> in
                  comparison to last month.
                </p>
              </div>
              <a href="#" className="btn-shadow mt-6">
                view details
              </a>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-6 xl:grid-cols-2">
          {viewStaticCounter.map((staic_counter: any) => (
            <StaticCardView
              key={staic_counter.id_key}
              counter={staic_counter}
            ></StaticCardView>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default layoutPage;
