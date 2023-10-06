import { useNavigate, useParams } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { params } = useParams();

  const handleButtonClick = (param: string) => {
    const updatedParams = params ? `${params},${param}` : param;
    navigate(`/${updatedParams}`);
  };
  const activeButtons = params ? params.split(",") : [];
  return (
    <div>
      <h2>Home</h2>
        {["A", "B", "C", "D"]
          .map(buttonName => {
            return (
              <button
                 onClick={() => handleButtonClick(buttonName)}
                   disabled={activeButtons.includes(buttonName)}
                   key={buttonName}
              >
              {buttonName}
              </button>
            );}
          )
        }
      {/* <button
        onClick={() => handleButtonClick("A")}
        disabled={activeButtons.includes("A")}
      >
        A
      </button>
      <button
        onClick={() => handleButtonClick("B")}
        disabled={activeButtons.includes("B")}
      >
        B
      </button>
      <button
        onClick={() => handleButtonClick("C")}
        disabled={activeButtons.includes("C")}
      >
        C
      </button> */}
    </div>
  );
};

export default Home;