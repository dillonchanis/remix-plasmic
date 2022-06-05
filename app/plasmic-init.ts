import { initPlasmicLoader } from "@plasmicapp/loader-react";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "hDhNRxnfsY8oLja3LByFZs",
      token:
        "ZABZJ0sHEwdvbpbeymFAIiGmUVdWBW5ed1218gyE8y63WFyIimtDruhDA3DuWWpYI8RaTM4BKoEHrO3lyYIrg",
    },
  ],

  // Fetches the latest revisions, whether or not they were unpublished!
  // Disable for production to ensure you render only published changes.
  preview: process.env.NODE_ENV !== "production",
});
