export default ({
  children,
  isActive,
}: {
  children: string;
  isActive: boolean;
}) => {
  return (
    <span className="border text-center px-3 py-2 hover:bg-blue-200 cursor-pointer">
      {children}
    </span>
  );
};
