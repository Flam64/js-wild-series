import { useNavigate } from "react-router-dom";

import ProgramForm from "../components/ProgramForm";

function ProgramNew() {
  const navigate = useNavigate();

  const newProgram = {
    title: "",
    synopsis: "",
    poster: "",
    country: "",
    year: 0,
    category_id: 0,
  };

  return (
    <ProgramForm
      defaultValue={newProgram}
      onSubmit={(programData) => {
        console.info("Debut programForm");
        fetch(`${import.meta.env.VITE_API_URL}/api/programs`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(programData),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.insertId !== undefined) {
              navigate(`/programs/${data.insertId}`);
            }
          });
      }}
    >
      Ajouter
    </ProgramForm>
  );
}

export default ProgramNew;
