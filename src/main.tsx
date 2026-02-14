
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";
import penguinImg from "./assets/eb43db30baf40ba1d1ee413a90ac8503189b0177.png";

document.title = "pandapenguin";
const existingIcon = document.querySelector<HTMLLinkElement>("link[rel='icon']");
const favicon = existingIcon ?? document.createElement("link");
favicon.rel = "icon";
favicon.type = "image/png";
favicon.href = penguinImg;
if (!existingIcon) document.head.appendChild(favicon);

  createRoot(document.getElementById("root")!).render(<App />);
  
