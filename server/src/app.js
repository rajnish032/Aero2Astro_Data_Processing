import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import gisRouter from "./routes/gis.routes.js";
import router from "./routes/index.routes.js";
import jobRoutes from "./routes/jobs.route.js"
import detailRouter from "./routes/details.routes.js";
const app = express();

// Middleware
const allowedOrigins = process.env.CLIENT_URL.split(",");
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/gis", gisRouter);
app.use("/api", router);
app.use("/api", detailRouter);
app.use('/api/jobs', jobRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Listening...");
});

export { app };
