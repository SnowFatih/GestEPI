import React from "react";

export interface SearchBarProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  placeholder?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function SearchBar({
  onChange,
  value,
  placeholder,
  leftIcon,
  rightIcon,
}: SearchBarProps) {
  return (
    <div className="flex relative min-w-[250px]">
      <input
        data-testid="data-table-search-bar"
        type="text"
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
      {leftIcon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {leftIcon}
        </div>
      )}
      {rightIcon && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          {rightIcon}
        </div>
      )}
    </div>
  );
}
