const InputSearch = ({ Icon, placeholder }) => {
  return (
    <div className="w-full flex flex-col text-left text-[13px] text-darkslategray font-sf-pro">
      <div className="w-full h-8 flex items-center gap-2 bg-white border border-dimgray rounded-lg overflow-hidden px-2">
        <Icon className="w-4 h-4 stroke-current" />
        <input
          type="text"
          placeholder={placeholder}
          className="flex-1 h-full bg-transparent outline-none text-[13px] leading-[18px] placeholder-dimgray"
        />
      </div>
    </div>
  );
};

export default InputSearch;