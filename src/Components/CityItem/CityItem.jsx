import { useCities } from "../../Context/CitiesContext";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  //   console.log(city);
  const { currentCity, DeleteCities } = useCities();
  const { cityName, date, emoji, id, position } = city;

  function handledelete(e) {
    e.preventDefault();
    DeleteCities(id);
  }
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          currentCity.id === id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <span className={styles.name}>{cityName}</span>
        <span className={styles.date}>{formatDate(date)}</span>
        <button className={styles.deleteBtn} onClick={handledelete}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
