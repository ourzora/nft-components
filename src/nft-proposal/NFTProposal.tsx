import { useMediaContext } from "../context/useMediaContext";
import {
  NFTDataProvider,
  NFTDataProviderProps,
} from "../context/NFTDataProvider";
import { ProposalMediaDisplay } from "./ProposalMediaDisplay";
import {
  ProposalActionList,
  ProposalActionListProps,
} from "./ProposalActionList";

type NFTProposalProps = Omit<NFTDataProviderProps, "children"> & {
  actionConfiguration?: ProposalActionListProps;
};

export const NFTProposal = ({
  actionConfiguration,
  ...wrapperProps
}: NFTProposalProps) => {
  const { getStyles } = useMediaContext();

  return (
    <NFTDataProvider {...wrapperProps}>
      <div {...getStyles("nftProposal")}>
        <ProposalMediaDisplay />
        <ProposalActionList {...actionConfiguration} />
      </div>
    </NFTDataProvider>
  );
};
