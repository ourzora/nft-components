import { useMediaContext } from "../context/useMediaContext";

export const LoadingError = (_: any) => {
  const { getStyles } = useMediaContext();
  return (
    <span {...getStyles("mediaObjectMessage")}>Error loading content</span>
  );
};
