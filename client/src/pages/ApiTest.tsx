import axios from "axios";

const Test = () => {
  const onHandle = async () => {
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
      <div>
        <h1 className="text-xl font-bold">APIテスト</h1>
        <button className="mt-5 btn btn-primary" onClick={() => onHandle()}>
          API実行
        </button>
      </div>
    </>
  );
};

export default Test;
