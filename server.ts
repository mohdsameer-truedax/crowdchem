import express, { Request, Response, NextFunction } from "express";

const app = express();

// Add X-Robots-Tag for sensitive routes
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.url.startsWith("/api")) {
    res.setHeader("X-Robots-Tag", "noindex, noai");
  }
  next();
});

// Serve built files
app.use(express.static("dist"));

app.listen(5173, () => console.log("✅ Server running on http://localhost:5173"));
