"use client";

import React, { useState } from "react";
import { sounds } from "@/lib/sounds";

interface ToggleButtonProps {
  onToggle?: (isChecked: boolean) => void;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({ onToggle }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    sounds.toggle();
    onToggle?.(checked);
  };

  return (
    <label className="toggle-container" htmlFor="toggle-input">
      <input
        className="toggle-input"
        id="toggle-input"
        type="checkbox"
        onChange={handleChange}
        checked={isChecked}
      />
      <div className="toggle-handle-wrapper">
        <div className="toggle-handle">
          <div className="toggle-handle-knob"></div>
          <div className="toggle-handle-bar-wrapper">
            <div className="toggle-handle-bar"></div>
          </div>
        </div>
      </div>
      <div className="toggle-base">
        <div className="toggle-base-inside"></div>
      </div>
    </label>
  );
};
