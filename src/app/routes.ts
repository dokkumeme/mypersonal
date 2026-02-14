import { createBrowserRouter } from "react-router";
import Welcome from "./components/Welcome";
import LevelHub from "./components/LevelHub";
import Level1 from "./components/Level1";
import Level2 from "./components/Level2";
import Level3 from "./components/Level3";
import Level4 from "./components/Level4";
import FinalProposal from "./components/FinalProposal";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Welcome,
  },
  {
    path: "/levels",
    Component: LevelHub,
  },
  {
    path: "/level-1",
    Component: Level1,
  },
  {
    path: "/level-2",
    Component: Level2,
  },
  {
    path: "/level-3",
    Component: Level3,
  },
  {
    path: "/level-4",
    Component: Level4,
  },
  {
    path: "/final",
    Component: FinalProposal,
  },
]);