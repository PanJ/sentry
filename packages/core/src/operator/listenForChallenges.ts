import { RefereeAbi } from "../abis/RefereeAbi.js";
import { config } from "../config.js";
import { Challenge, getChallenge } from "../index.js";
import { resilientEventListener } from "../utils/resilientEventListener.js";

/**
 * Listens for ChallengeSubmitted events and triggers a callback function when the event is emitted.
 * Keeps a map of challengeNumbers that have called the callback to ensure uniqueness.
 * @param callback - The callback function to be triggered when ChallengeSubmitted event is emitted.
 * @returns A function that can be called to stop listening for the event.
 */
export function listenForChallenges(callback: (challengeNumber: bigint, challenge: Challenge, event: any) => void, onError?: (error: Error) => void): () => void {
    const challengeNumberMap: { [challengeNumber: string]: boolean } = {};

    const listener = resilientEventListener({
        rpcUrl: config.arbitrumOneWebSocketUrl,
        contractAddress: config.refereeAddress,
        abi: RefereeAbi,
        eventName: "ChallengeSubmitted",
        log: console.info,
        callback: async (log, error) => {
            if (error) {
                if(!onError) return;
                // Call the onError function with the caught error
                onError(error instanceof Error ? error : new Error(String(error)));
                return;
            }
            try {
                // Uncomment the following line to test the onError function
                const challengeNumber = BigInt(log?.args[0]);

                // if the challengeNumber has not been seen before, call the callback and add it to the map
                if (!challengeNumberMap[challengeNumber.toString()]) {
                    challengeNumberMap[challengeNumber.toString()] = true;

                    // lookup the challenge
                    const challenge = await getChallenge(challengeNumber);

                    void callback(challengeNumber, challenge, log);
                }
            } catch (err) {
                if(!onError) return;
                // Call the onError function with the caught error
                onError(err instanceof Error ? err : new Error(String(err)));
            }
        }
    });

    return () => {
        listener.stop();
    };
}
