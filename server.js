import  express  from "express";
import mongoose  from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js"
// import aboutRoute from "./routes/user.route.js"
// import wishlistRoute from "./routes/wishlist.route.js"
import uploadRoute from "./routes/upload.route.js"
import savesRoute from "./routes/saves.route.js"
// import reviewRoute from "./routes/review.route.js"
import router from "./routes/auth.route.js"


import cors from "cors";
import cookieParser from "cookie-parser";





const app=express()
dotenv.config();
mongoose.set('strictQuery',true)

const connect=async()=>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('connected to mongoDB');  
    } catch (error) {
        console.log(error);
    }
}



app.use(cors({
    origin: function(origin, callback) {
        // Check if the origin is allowed
        if (!origin || origin === "https://graceful-kleicha-2d0c35.netlify.app") {
            // Allow the request from this origin
            callback(null, true);
        } else {
            // Deny the request from other origins
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST"],
    credentials: true
}));


// app.use(cors(corsOptions));
//pp.use(cors());
app.use(express.json())
app.use(cookieParser())


app.use("/api/auth",router)
app.use("/api/users",userRoute)
// app.use("/api/users",aboutRoute)
// app.use("/api/users",reviewRoute)
app.use("/api/saves",savesRoute)
app.use("/api/upload",uploadRoute)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";

    res.status(errorStatus)
        .header("Access-Control-Allow-Origin", "https://main--graceful-kleicha-2d0c35.netlify.app")
        .header("Access-Control-Allow-Credentials", true)
        .send(errorMessage);
});


app.listen(3002,()=>{
    connect();
    console.log("Backend server is running!")
})
