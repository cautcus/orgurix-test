import { useState, CSSProperties } from "react";
import SyncLoader from "react-spinners/SyncLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function SpinnerLoader() {
  let [loading, setLoading] = useState(true);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <SyncLoader
        color= "rgb(187 247 208)"
        loading={loading}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default SpinnerLoader;
