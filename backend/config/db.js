import  {Client} from 'pg';

//info of database
const db_info={user:'postgres',host:'localhost',database:'onlinedb',password:'admin123',port:5432 };

//create connection

//step 1--making object of new connection
const objofconnection=new Client(db_info);

//step 2--connecting with postgres/database
objofconnection.connect()
               .then(()=>{console.log("Database is Connected")})
               .catch((err)=>{console.error("Connection Error is :",err)});

//sending connection object
export default objofconnection               