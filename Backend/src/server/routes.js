import app from "#server";
import { authRouter, interviewRouter } from "#routes";

app.get("/", (req, res) => {
  res.send("Backend is live and running");
});

app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);
