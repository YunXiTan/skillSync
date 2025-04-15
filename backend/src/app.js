const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/database");
const controllers = require("./controllers");
const responseType = require("./types/responseType");
const cors = require("cors");

console.log("�� Application starting...");

async function createApp(options = {}) {
  console.log("📦 Creating application...");
  const app = express();

  // Middleware
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Connect to Database
  try {
    await connectDB();

    // Direct check of mongoose connection state
    const connectionState = mongoose.connection.readyState;
    const stateMap = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting",
    };

    console.log("MongoDB Connection Status:", {
      state: stateMap[connectionState],
      isConnected: connectionState === 1,
    });

    // Add connection event listeners
    mongoose.connection.on("connected", () => {
      console.log("✅ MongoDB connected successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("❌ MongoDB disconnected");
    });
  } catch (error) {
    console.error("Failed to connect to database:", error);
    throw error;
  }

  controllers.forEach(({ Controller, Service, Model }) => {
    try {
      if (!Controller || !Service || !Model) {
        throw new Error("Missing required controller components");
      }

      console.log(`📝 Initializing controller:`, {
        controller: Controller.name,
        service: Service.name,
        model: Model.modelName,
      });

      const service = new Service(Model);
      const controller = new Controller(service);
      const path = controller.getPath();

      if (!path) {
        throw new Error(`Invalid path returned from ${Controller.name}`);
      }

      console.log(`🔌 Mounting route at /api/${path}`);

      app.use(`/api/${path}`, controller.getRouter());
    } catch (error) {
      console.error(
        `❌ Failed to initialize controller ${Controller?.name || "Unknown"}:`,
        error
      );
      // Depending on your error handling strategy, you might want to:
      // - throw the error to stop the application
      // - continue with other controllers
      throw error;
    }
  });

  return app;
}

// Immediately start the server
async function startServer() {
  try {
    const app = await createApp();
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`🌍 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

// Run the server
startServer();

// Still export createApp for testing purposes
module.exports = createApp;
