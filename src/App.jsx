import "./App.css";
import Footer from "./Component/Footer";
import SideBar from "./Component/Sidebar";
import { useState } from "react";
import PostListProvider from "./Store/post-list";
import { Outlet } from "react-router-dom";
import Header from "./Component/Header";

function App() {
  let [selectedTab, setSelectedTab] = useState("create post");
  return (
    <PostListProvider>
      <div className="main-container">
        <SideBar
          className="sideBar"
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        <div className="content">
          <Header></Header>
          <Outlet />
          <Footer></Footer>
        </div>
      </div>
    </PostListProvider>
  );
}

export default App;
