import { MINIMUM_SECONDS_BETWEEN_ASSERTIONS } from "../constants/index.js";
import { getLatestChallenge } from "./getLatestChallenge.js";
import { Challenge } from "./index.js";

export async function isChallengeSubmitTime(): Promise<{isSubmitTime:boolean, currentChallenge: Challenge}> {

	    // Get Last Challenge Data
		const [_, currentChallenge] = await getLatestChallenge();
		const lastChallengeTime = Number(currentChallenge.assertionTimestamp);
	
		// Calculate the minimum time to submit an assertion
		const minimumTimeToSubmit = lastChallengeTime + MINIMUM_SECONDS_BETWEEN_ASSERTIONS;

		const isSubmitTime = Math.floor(Date.now() / 1000) > minimumTimeToSubmit;

	return  {isSubmitTime, currentChallenge};
}
