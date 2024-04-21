import { useEffect, useState } from "react";
import { Slider } from "../Slider";

export default function SongControl({ audio }) {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    audio.current.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.current.removeEventListener("timeupdate", handleTimeUpdate);
    };
  });

  const formatTime = (time) => {
    if (!time) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");

    return `${minutes}:${seconds}`;
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audio.current.currentTime);
  };

  const duration = audio?.current?.duration ?? 0;
  return (
    <div className="flex gap-x-2 text-xs text-white pt-2">
      <span className="opacity-50 w-12 text-right">{formatTime(currentTime)}</span>
      <Slider
        defaultValue={[0]}
        value={[currentTime]}
        max={duration}
        min={0}
        className="w-[500px]"
        onValueChange={(value) => {
          audio.current.currentTime = value;
        }}
      />
      <span className="opacity-50 w-12">{formatTime(duration)}</span>
    </div>
  );
}
