export default function Input({
  placeholder,
  ref,
}: {
  placeholder: string;
  ref?: any;
}) {
  return (
    <div>
      <input
        ref={ref}
        type={"text"}
        placeholder={placeholder}
        className="px-4 py-2 border rounded m-2"
      />
    </div>
  );
}
 