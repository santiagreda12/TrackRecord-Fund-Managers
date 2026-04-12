import React, { useEffect, useRef, useId } from 'react';

let tvScriptLoadingPromise;

const TradingViewWidget = ({ symbol = "BME:A3M" }) => {
  const containerId = "tv_chart_" + useId().replace(/:/g, "");
  const onLoadScriptRef = useRef();

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement('script');
        script.id = 'tradingview-widget-loading-script';
        script.src = 'https://s3.tradingview.com/tv.js';
        script.type = 'text/javascript';
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

    return () => {
      onLoadScriptRef.current = null;
    };

    function createWidget() {
      if (document.getElementById(containerId) && 'TradingView' in window) {
        new window.TradingView.widget({
          autosize: true,
          symbol: symbol,
          interval: "D",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "3", // Área
          locale: "es",
          enable_publishing: false,
          backgroundColor: "rgba(22, 28, 45, 0.4)",
          gridColor: "rgba(255, 255, 255, 0.05)",
          hide_top_toolbar: true,
          hide_legend: true,
          save_image: false,
          container_id: containerId,
        });
      }
    }
  }, [symbol, containerId]);

  return (
    <div className='tradingview-widget-container' style={{ height: "100%", width: "100%" }}>
      <div id={containerId} style={{ height: "100%", width: "100%", borderRadius: "12px", overflow: "hidden" }} />
    </div>
  );
};

export default TradingViewWidget;
