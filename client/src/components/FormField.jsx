const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  onChange,
  isSurpriseMe,
  onSurpriseMe,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label
          htmlFor={name}
          className=" block text-sm font-medium text-gray-900 "
        >
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            onClick={onSurpriseMe}
            className=" font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounder-[5px] text-black"
          >
            Surprise me
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className=" p-3 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] block outline-none"
      />
    </div>
  );
};

export default FormField;
