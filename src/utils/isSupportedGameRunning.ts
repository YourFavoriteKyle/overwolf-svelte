import { OWGames } from "@overwolf/overwolf-api-ts/dist";
import { Games } from "../app/consts";

export async function isSupportedGameRunning(): Promise<boolean> {
  const info = await OWGames.getRunningGameInfo();

  return info && info.isRunning && Games.includes(info.classId);
}
