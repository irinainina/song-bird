import * as React from "react";
import { useDrag } from "react-use-gesture";
import { directstyled, useDirectStyle } from "direct-styled";

function formatTime(seconds) {
  return [Math.floor(seconds / 60), Math.floor(seconds % 60)]
    .map(x => x.toString())
    .map(x => (x.length === 1 ? `0${x}` : x))
    .join(":");
}

const minMax = (min, max, value) => {
  if (value > max) {
    return max;
  }
  if (value < min) {
    return min;
  }
  return value;
};

function getNewTimeProps(barRect, clientX, duration) {
  const seconds = minMax(
    0,
    duration,
    Math.floor(((clientX - barRect.left) / barRect.width) * duration)
  );

  const progress = (seconds / duration) * 100;

  return { seconds, progress };
}

function TimeBar({
  style,
  className,
  duration,
  progress,
  currentTime,
  isSeeking,
  setTime
}) {
  const barRef = React.useRef(null);

  const [barStyle, setBarStyle] = useDirectStyle();
  const [circleStyle, setCircleStyle] = useDirectStyle();
  const [ignoreTimeUpdates, setIgnoreTimeUpdates] = React.useState(false);

  function setStyles(progress) {
    setCircleStyle({
      left: `${progress}%`
    });

    setBarStyle({
      background: `linear-gradient(to right, #00bc8c 0%, #3d858c ${progress}%, #737373 ${progress}%, #737373 100%)`
    });
  }

  const bind = useDrag(
    ({ xy, first, last, event }) => {
      event.preventDefault();

      if (first) {
        setIgnoreTimeUpdates(true);
      }

      const { seconds, progress } = getNewTimeProps(
        barRef.current.getBoundingClientRect(),
        xy[0],
        duration
      );

      if (last) {
        setTime(seconds);
        setIgnoreTimeUpdates(false);
        return;
      }

      setStyles(progress);
    },
    { event: { passive: false, capture: true } }
  );

  React.useEffect(() => {
    if (ignoreTimeUpdates) {
      return;
    }

    setStyles(progress);
    // eslint-disable-next-line
  }, [progress]);

  return (
    <div
      className={`timebar ${className || ""}`}
      style={{ position: "relative", ...style }}
    >
      <directstyled.div ref={barRef} className="timebar-bar" style={barStyle} />
      <directstyled.div
        {...bind()}
        className="timebar-circle"
        style={circleStyle}
      />
      <div className="timebar-time-info">
        <div>{isSeeking ? "buffering..." : formatTime(currentTime)}</div>
        <div>{formatTime(duration)}</div>
      </div>
    </div>
  );
}

export default TimeBar;