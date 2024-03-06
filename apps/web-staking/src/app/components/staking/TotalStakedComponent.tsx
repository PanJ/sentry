import { BorderWrapperComponent } from "../borderWrapper/BorderWrapperComponent";
import {
  ConnectButton,
  SecondaryButton,
  PrimaryButton,
} from "../buttons/ButtonsComponent";
import { useRouter } from "next/navigation";
import ReportComponent from "./ReportComponent";
import { getAmountRequiredForUpgrade, getCurrentTierByStaking, getProgressValue } from "./utils";
import { useGetMaxTotalStakedHooks } from "@/app/hooks/hooks";
import { formatCurrency } from "@/app/utils/formatCurrency";

interface StakingCardProps {
  onOpen?: () => void;
  address: string | undefined;
  title: string;
  subTitle?: string;
  btnText: string;
  totalStaked?: number;
  showProgressBar?: boolean;
  showTier?: boolean;
  unstake?: boolean;
}

const TotalStakedComponent = ({
  onOpen,
  address,
  title,
  btnText,
  subTitle,
  totalStaked = 0,
  showProgressBar,
  showTier,
  unstake,
}: StakingCardProps) => {
  const router = useRouter();

  const currentTier = showTier
    ? getCurrentTierByStaking(totalStaked ?? 0)
    : undefined;
  const remaining = getAmountRequiredForUpgrade(totalStaked, currentTier);
  let remainingToTierText = ""
  if (currentTier?.nextTierName !== "" && currentTier && address) {
    if (remaining > 0.001) {
      remainingToTierText = `${formatCurrency.format(remaining)} esXAI to ${currentTier?.nextTierName}`;
    } else {
      remainingToTierText = `< 0.001 esXAI to ${currentTier?.nextTierName}`;
    }
  }
  const progressValue = getProgressValue(totalStaked ?? 0, currentTier);
  const { totalMaxStaked } = useGetMaxTotalStakedHooks();

  return (
    <BorderWrapperComponent customStyle="flex flex-col lg:p-7 sm:p-4 justify-between lg:min-w-[575px] sm:min-w-[330px] lg:h-[245px] lg:mr-4 sm:mr-0 sm:mb-4 w-full">
      <ReportComponent
        address={address}
        title={title}
        subTitle={subTitle}
        currentTier={currentTier}
        showProgressBar={showProgressBar}
        showTier={showTier}
        progressValue={progressValue}
        remainingToTierText={remainingToTierText}
        totalStaked={totalStaked}
        availableForStaking={totalMaxStaked}
      />
      <div className="flex flex-row justify-end w-full gap-2 mt-2">
        {address ? (
          <>
            {unstake && (
              <SecondaryButton
                onClick={() => router.push("/staking/unstake")}
                btnText={"Unstake"}
                className="sm:w-[100px] h-[50px] font-medium"
              />
            )}
            <PrimaryButton
              onClick={() => router.push("/staking/stake")}
              btnText={btnText}
              className="sm:w-[100px] h-[50px] font-medium"
            />
          </>
        ) : (
          <ConnectButton
            onOpen={onOpen!}
            address={address}
            variant={"overview"}
          />
        )}
      </div>
    </BorderWrapperComponent>
  );
};

export default TotalStakedComponent;
