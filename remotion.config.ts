/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { Config } from "@remotion/cli/config";

Config.setRspack(true);
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setDefaultPremountInSeconds(2);
// Solo en la máquina de la nube: en tu compu Remotion usa su propio navegador.
import fs from "node:fs";
if (fs.existsSync("/opt/pw-browsers/chromium_headless_shell")) {
  Config.setBrowserExecutable("/opt/pw-browsers/chromium_headless_shell");
}
