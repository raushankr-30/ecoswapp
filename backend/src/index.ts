import express from "express";
import cors from "cors";
import { json } from "body-parser";
import authRoutes from "./routes/auth";
import wastesRoutes from "./routes/wastes";
import pickupsRoutes from "./routes/pickups";
import recyclersRoutes from "./routes/recyclers";
import biddersRoutes from "./routes/bidders";
import adminRoutes from "./routes/admin";

const app = express();
app.use(cors());
app.use(json());

app.use("/api/auth", authRoutes);
app.use("/api/wastes", wastesRoutes);
app.use("/api/pickups", pickupsRoutes);
app.use("/api/recyclers", recyclersRoutes);
app.use("/api/bids", biddersRoutes);
app.use("/api/admin", adminRoutes);

const PORT = Number(process.env.PORT || 4000);
app.listen(PORT, () => {
  console.log(`EcoSwap API running at http://localhost:${PORT}`);
});

