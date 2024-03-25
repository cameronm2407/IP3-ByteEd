import axios from "axios";
import { LANGUAGE_VERSIONS } from "./languages";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const executeCode = (language, sourceCode) => {
  console.log(language);
  console.log(LANGUAGE_VERSIONS[language]);
  const response = API.post("/execute", {
    language: language,
    version: LANGUAGE_VERSIONS[language],
    files: [
      {
        content: sourceCode,
      },
    ],
  });
  return response.data;
};
