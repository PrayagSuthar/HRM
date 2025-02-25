// const sql = require("mssql");
import sql from 'mssql';


app.use(cors({ origin: 'http://localhost:5173' }));
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

config.connect(fucntion(err){
    if (err){
        console.log("connection error");
    } else {
        console.log("connected");
    }
})

