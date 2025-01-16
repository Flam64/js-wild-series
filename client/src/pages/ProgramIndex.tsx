import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Program = {
  id: number;
  title: string;
};

function ProgramIndex() {
  const [program, setProgram] = useState([] as Program[]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/programs`)
      .then((response) => response.json())
      .then((data: Program[]) => {
        setProgram(data);
      });
  }, []);

  return (
    <>
      <Link to={"/programs/new"}>Ajouter</Link>
      <ul>
        {program.map((program) => (
          <li key={program.id}>
            <Link to={`/programs/${program.id}`}>{program.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ProgramIndex;
