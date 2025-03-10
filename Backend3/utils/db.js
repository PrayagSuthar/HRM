



import sql from "mssql";

const config = {
  user: "sa",
  password: "Suthar@1928",
  server: "LAPTOP-MPCU0HKA",
  database: "EmployeeDBB",
  options: {
    encrypt: false,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
  port: 1433,
};


const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log("Connected to MSSQL");
    return pool;
  })
  .catch(err => {
    console.error("Database connection failed!", err);
  });

export { poolPromise, sql };
