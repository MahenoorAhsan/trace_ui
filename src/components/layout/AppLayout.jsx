import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Breadcrumb from "../breadcrumb/Breadcrumb";

const AppLayout = () => {
    return <div>
        <Sidebar/>
        <main>
            <Breadcrumb/>
            <Outlet/>
        </main>
    </div>
}

export default AppLayout;