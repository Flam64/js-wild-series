import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Program = {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
  category_id: number;
};

class ProgramRepository {
  async readAll() {
    // Execute the SQL SELECT query to retrieve all programs from the "program" table
    const [rows] = await databaseClient.query<Rows>("select * from program");

    // Return the array of programs
    return rows as Program[];
  }

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific series by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from program where id = ?",
      [id],
    );
    // Return the first row of the result, which represents the category
    return rows[0] as Program;
  }

  async update(program: Program) {
    // Execute the SQL UPDATE query to update an existing series in the "program" table
    const [result] = await databaseClient.query<Result>(
      "update program set title = ?, synopsis = ?, poster = ?, country = ?, year = ?, program.category_id = ? where id = ?",
      [
        program.title,
        program.synopsis,
        program.poster,
        program.country,
        program.year,
        program.category_id,
        program.id,
      ],
    );
    // Return how many rows were affected
    return result.affectedRows;
  }

  async create(program: Omit<Program, "id">) {
    // Execute the SQL INSERT query to add a new series to the "program" table
    const [result] = await databaseClient.query<Result>(
      "insert into program (title, synopsis, poster, country, year, category_id) values (?, ?, ?, ?, ?,?)",
      [
        program.title,
        program.synopsis,
        program.poster,
        program.country,
        program.year,
        program.category_id,
      ],
    );

    console.info("Insertion des datas");
    // Return the ID of the newly inserted item
    return result.insertId;
  }

  async delete(id: number) {
    // Execute the SQL DELETE query to delete an existing series from the "program" table
    const [result] = await databaseClient.query<Result>(
      "delete from program where id = ?",
      [id],
    );

    // Return how many rows were affected
    return result.affectedRows;
  }
}

export default new ProgramRepository();
