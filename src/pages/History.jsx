import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";
import { getHistoryFromFirebase } from "../firebase/firebase";
import Loading from "../components/Loading/Loading";
import { Collapse } from "@mui/material";
import CartItem from "../components/CartItem/CartItem";
import { historyContainer, noHistoryMessage } from "./history.module.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const History = () => {
  const { user } = useContext(UserContext);
  const [history, setHistory] = useState(null);

  const [collapses, setCollapses] = useState([]);

  useEffect(() => {
    getHistory();
  }, []);

  const handleCollapse = (i) => {
    setCollapses(collapses.map((e, j) => (j == i ? !e : e)));
  };

  const getHistory = async () => {
    const historyFromFirebase = await getHistoryFromFirebase(user.userId);
    if (historyFromFirebase) {
      setCollapses(new Array(historyFromFirebase.length).fill(false));
      setHistory(historyFromFirebase);
    } else {
      setHistory([]);
    }
  };

  if (!history) {
    return <Loading />;
  }

  if (history.length == 0) {
    return (
      <div className={noHistoryMessage}>
        <h3>No purchases yet!</h3>
      </div>
    );
  }

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  const handleDate = (date) => {
    const parsedDate = date.toDate();
    return [
      padTo2Digits(parsedDate.getDate()),
      padTo2Digits(parsedDate.getMonth() + 1),
      parsedDate.getFullYear(),
    ].join("/");
  };

  return (
    <div>
      {history.map((e, i) => (
        <>
          <div className={historyContainer} onClick={() => handleCollapse(i)}>
            <h3>{`Cart ID: ${e.id} | Date: ${handleDate(e.initTs)} | Total: $${
              e.total
            } `}</h3>
            <KeyboardArrowDownIcon />
          </div>
          <Collapse in={collapses[i] == true}>
            {e.cart.map((a) => (
              <div key={a.id}>
                <CartItem cartItem={a} history={true}></CartItem>
              </div>
            ))}
          </Collapse>
        </>
      ))}
    </div>
  );
};

export default History;
