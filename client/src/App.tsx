import "./App.css";
import axios from "axios";

function App() {
  const onHandle = async () => {
    console.log("aaa");

    const res = await axios({
      method: "post",
      url: `${import.meta.env.VITE_BACKEND_URL}/query`,
      data: {
        query: `
          query {
            todos {
              id
              text
              done
              user {
                name
              }
            }
          }
        `,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res.data);
  };
  return (
    <>
      <button onClick={() => onHandle()}>API実行</button>
    </>
  );
}

export default App;
