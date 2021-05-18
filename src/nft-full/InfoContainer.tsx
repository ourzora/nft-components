import { Strings } from "../constants/strings";
import { useMediaContext } from "../context/useMediaContext";

type InfoContainerProps = {
  children: React.ReactNode;
  titleString: keyof typeof Strings;
  bottomPadding?: boolean,
};

export const InfoContainer = ({
  children,
  titleString,
  bottomPadding = true,
}: InfoContainerProps) => {
  const { getStyles, getString } = useMediaContext();

  return (
    <div {...getStyles("infoContainer", {bottomPadding})}>
      <div {...getStyles("fullLabel")}>{getString(titleString)}</div>
      {children}
    </div>
  );
};
