import Web from "../../public/svgs/options/Web.svg";
import Academic from "../../public/svgs/options/Academic.svg";
import Writing from "../../public/svgs/options/Writing.svg";
import Youtube from "../../public/svgs/options/Youtube.svg";
import Reddit from "../../public/svgs/options/Reddit.svg";
import Stackoverflow from "../../public/svgs/options/Stackoverflow.svg";

export const focusOptions = [
  {
    website: "All",
    icon: Web,
    query: "",
    description: "Search across the entire internet",
  },
  {
    website: "Academic",
    icon: Academic,
    query: "site:arxiv.org",
    description: "Search in published academic papers",
  },
  {
    website: "Writing",
    icon: Writing,
    query: "",
    description: "Generate text without searching the web",
  },
  {
    website: "Youtube",
    icon: Youtube,
    query: "site:youtube.com",
    description: "Discover and watch videos on YouTube",
  },
  {
    website: "Reddit",
    icon: Reddit,
    query: "site:reddit.com",
    description: "Search for discussions and opinions online",
  },
  {
    website: "Stackoverflow",
    icon: Stackoverflow,
    query: "site:stackoverflow.com",
    description: "Get answers to your programming questions",
  },
];

export const MODELS = [
  { label: "Google Gemini 1.5 Flash", value: "gemini-1.5-flash" },
  { label: "Google Gemini 1.5 Pro", value: "gemini-1.5-pro" },
  { label: "Duino-Prime", value: "Duino-Prime" },
  { label: "UMI-Duino", value: "UMI-Duino" },
  { label: "Worm-Duino", value: "Worm-Duino" },
];

export const PLUGINS = [
  {
    tag: "Built In",
    name: "Stocks",
    comingSoon: false,
    url: "/plugins/stocks",
    description: "Check stock prices",
  },
  {
    tag: "Built In",
    name: "Weather",
    comingSoon: false,
    url: "/plugins/weather",
    description: "Weather forecast",
  },
  {
    tag: "Built In",
    name: "Dictionary",
    comingSoon: false,
    url: "/plugins/dictionary",
    description: "Look up word definitions",
  },
];
