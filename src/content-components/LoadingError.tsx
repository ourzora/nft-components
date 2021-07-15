export const LoadingError = ({ getStyles }: any) => {
  return (
    <span {...getStyles("mediaObjectMessage")}>Error loading content</span>
  );
};
