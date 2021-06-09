import { useMediaContext } from "../context/useMediaContext";
import {
  NFTPageWrapper,
  NFTPageWrapperProps,
} from "../components/NFTPageWrapper";
import { ProposalMediaDisplay } from "./ProposalMediaDisplay";
import {
  ProposalActionList,
  ProposalActionListProps,
} from "./ProposalActionList";

type NFTProposalProps = Omit<NFTPageWrapperProps, "children"> & {
  actionConfiguration?: ProposalActionListProps;
};

export const NFTProposal = ({
  actionConfiguration,
  ...wrapperProps
}: NFTProposalProps) => {
  const { getStyles } = useMediaContext();

  return (
    <NFTPageWrapper {...wrapperProps}>
      <div {...getStyles("nftProposal")}>
        <ProposalMediaDisplay />
        <ProposalActionList {...actionConfiguration} />
      </div>
    </NFTPageWrapper>
  );
};
