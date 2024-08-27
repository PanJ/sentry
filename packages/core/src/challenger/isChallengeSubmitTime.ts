import { MINIMUM_TIME_BETWEEN_ASSERTIONS } from "../constants/index.js";
import { getLatestChallenge } from "./getLatestChallenge.js";
import { Challenge } from "./index.js";

export async function isChallengeSubmitTime(): Promise<{isSubmitTime:boolean, currentChallenge: Challenge}> {

	    // Get Last Challenge Data
		const challengeData = await getLatestChallenge();
		const currentChallenge = challengeData[1];
		const lastChallengeTime = Number(currentChallenge.assertionTimestamp);
	
		// Calculate the minimum time to submit an assertion
		const minimumTimeToSubmit = lastChallengeTime + MINIMUM_TIME_BETWEEN_ASSERTIONS;

		const isSubmitTime = Math.floor(Date.now() / 1000) > minimumTimeToSubmit;

	return  {isSubmitTime, currentChallenge};
}
