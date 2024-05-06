import Sidebar from "../Components/Sidebar/Sidebar";
import Map from "../Components/Map/Map";
import styles from "./AppLayout.module.css";
import User from "../Components/User/User";

function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}

export default AppLayout;
