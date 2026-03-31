import type { ChartConfig } from "../types.js";

function niceNumber(value: number): string {
  if (!Number.isFinite(value)) return "0";
  const abs = Math.abs(value);
  if (abs >= 1000000) return `${(value / 1000000).toFixed(1)}m`;
  if (abs >= 1000) return `${(value / 1000).toFixed(0)}k`;
  return `${value.toFixed(0)}`;
}

function formatTooltipValue(value: number): string {
  if (!Number.isFinite(value)) return "0";
  const abs = Math.abs(value);
  if (abs >= 1000) {
    return new Intl.NumberFormat("en-SG", {
      style: "currency",
      currency: "SGD",
      maximumFractionDigits: 0,
    }).format(value);
  }
  return value.toFixed(1);
}

function drawAxes(ctx: CanvasRenderingContext2D, width: number, height: number, padding: { left: number; right: number; top: number; bottom: number }, yMax: number, yMin = 0): void {
  ctx.strokeStyle = "rgba(80, 69, 53, 0.2)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding.left, padding.top);
  ctx.lineTo(padding.left, height - padding.bottom);
  ctx.lineTo(width - padding.right, height - padding.bottom);
  ctx.stroke();
  ctx.fillStyle = "#7d705d";
  ctx.font = "12px system-ui";
  for (let i = 0; i <= 4; i += 1) {
    const y = padding.top + ((height - padding.bottom - padding.top) / 4) * i;
    const value = yMax - ((yMax - yMin) / 4) * i;
    ctx.fillText(niceNumber(value), 10, y + 4);
    ctx.strokeStyle = "rgba(80,69,53,0.08)";
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.stroke();
  }
}

function getPointCoordinates(width: number, height: number, padding: { left: number; right: number; top: number; bottom: number }, dataLength: number, index: number, value: number, yMax: number, yMin = 0): { x: number; y: number } {
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  return {
    x: padding.left + (index / Math.max(1, dataLength - 1)) * plotWidth,
    y: padding.top + (1 - (value - yMin) / Math.max(1, yMax - yMin)) * plotHeight,
  };
}

function drawSeries(ctx: CanvasRenderingContext2D, width: number, height: number, padding: { left: number; right: number; top: number; bottom: number }, labels: Array<number | string>, data: number[], color: string, yMax: number, yMin = 0, dashed = false): void {
  if (!data.length) return;
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.setLineDash(dashed ? [6, 5] : []);
  ctx.beginPath();
  data.forEach((value, index) => {
    const { x, y } = getPointCoordinates(width, height, padding, data.length, index, value, yMax, yMin);
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = color;
  data.forEach((value, index) => {
    const { x, y } = getPointCoordinates(width, height, padding, data.length, index, value, yMax, yMin);
    ctx.beginPath();
    ctx.arc(x, y, 2.5, 0, Math.PI * 2);
    ctx.fill();
    if (index < data.length - 1 && index % Math.ceil(data.length / 6) === 0) {
      ctx.fillStyle = "#7d705d";
      ctx.font = "11px system-ui";
      ctx.fillText(String(labels[index]), x - 10, height - padding.bottom + 18);
      ctx.fillStyle = color;
    }
  });
}

function drawBarSeries(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  padding: { left: number; right: number; top: number; bottom: number },
  labels: Array<number | string>,
  seriesIndex: number,
  seriesCount: number,
  data: number[],
  color: string,
  yMax: number,
  yMin = 0,
): void {
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const groupWidth = plotWidth / Math.max(1, data.length);
  const barWidth = Math.min(28, (groupWidth * 0.72) / Math.max(1, seriesCount));
  const zeroY = padding.top + (1 - (0 - yMin) / Math.max(1, yMax - yMin)) * plotHeight;
  ctx.fillStyle = color;
  data.forEach((value, index) => {
    const groupX = padding.left + index * groupWidth;
    const x = groupX + groupWidth * 0.14 + seriesIndex * barWidth;
    const y = padding.top + (1 - (value - yMin) / Math.max(1, yMax - yMin)) * plotHeight;
    const top = Math.min(y, zeroY);
    const barHeight = Math.max(2, Math.abs(zeroY - y));
    ctx.fillRect(x, top, barWidth - 2, barHeight);
    if (index % Math.ceil(data.length / 6) === 0) {
      ctx.fillStyle = "#7d705d";
      ctx.font = "11px system-ui";
      ctx.fillText(String(labels[index]), groupX + 4, height - padding.bottom + 18);
      ctx.fillStyle = color;
    }
  });
}

function drawHoverState(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  padding: { left: number; right: number; top: number; bottom: number },
  config: ChartConfig,
  yMax: number,
  yMin: number,
  hoverIndex: number,
): void {
  const firstSeries = config.series[0];
  if (!firstSeries) return;
  const anchor = getPointCoordinates(width, height, padding, firstSeries.data.length, hoverIndex, firstSeries.data[hoverIndex] ?? 0, yMax, yMin);
  ctx.save();
  ctx.strokeStyle = "rgba(36, 29, 18, 0.24)";
  ctx.lineWidth = 1;
  ctx.setLineDash([5, 4]);
  ctx.beginPath();
  ctx.moveTo(anchor.x, padding.top);
  ctx.lineTo(anchor.x, height - padding.bottom);
  ctx.stroke();
  ctx.setLineDash([]);

  config.series.forEach((series) => {
    const value = series.data[hoverIndex];
    if (!Number.isFinite(value)) return;
    const point = getPointCoordinates(width, height, padding, series.data.length, hoverIndex, value ?? 0, yMax, yMin);
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = series.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
    ctx.stroke();
  });
  ctx.restore();
}

function ensureTooltip(canvas: HTMLCanvasElement): HTMLDivElement {
  const parent = canvas.parentElement;
  if (!parent) throw new Error("Chart canvas requires a parent element.");
  let tooltip = parent.querySelector<HTMLDivElement>(".rp-chart-tooltip");
  if (!tooltip) {
    tooltip = document.createElement("div");
    tooltip.className = "rp-chart-tooltip";
    parent.appendChild(tooltip);
  }
  return tooltip;
}

export function renderChart(canvas: HTMLElement | null, config: ChartConfig): void {
  if (!(canvas instanceof HTMLCanvasElement)) return;
  const width = canvas.width;
  const height = canvas.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const padding = { left: 64, right: 22, top: 26, bottom: 34 };
  const flatValues = config.series.flatMap((item) => item.data);
  const yMax = Math.max(1, ...flatValues);
  const yMin = Math.min(0, ...flatValues);
  const tooltip = ensureTooltip(canvas);
  let pinnedIndex: number | null = null;

  const paint = (hoverIndex: number | null = null) => {
    ctx.clearRect(0, 0, width, height);
    drawAxes(ctx, width, height, padding, yMax, yMin);
    if (config.kind === "bar") {
      config.series.forEach((series, index) => drawBarSeries(ctx, width, height, padding, config.labels, index, config.series.length, series.data, series.color, yMax, yMin));
    } else {
      config.series.forEach((series) => drawSeries(ctx, width, height, padding, config.labels, series.data, series.color, yMax, yMin, series.dashed));
    }
    if (hoverIndex !== null) {
      drawHoverState(ctx, width, height, padding, config, yMax, yMin, hoverIndex);
    }
  };

  const tooltipHtml = (hoverIndex: number) => {
    const rows = config.series
      .map((series) => {
        const value = series.data[hoverIndex];
        return `<div class="rp-chart-tooltip-row"><span class="rp-chart-tooltip-dot" style="background:${series.color}"></span><strong>${series.label}</strong><span>${formatTooltipValue(value ?? 0)}</span></div>`;
      })
      .join("");
    return `
      <div class="rp-chart-tooltip-label">${String(config.labels[hoverIndex] ?? hoverIndex)}</div>
      ${rows}
    `;
  };

  const setTooltipPosition = (event: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    tooltip.style.left = `${Math.min(rect.width - 12, Math.max(12, event.clientX - rect.left))}px`;
    tooltip.style.top = `${Math.max(12, event.clientY - rect.top - 12)}px`;
  };

  const setTooltipPositionForIndex = (hoverIndex: number) => {
    const rect = canvas.getBoundingClientRect();
    const firstSeries = config.series[0];
    if (!firstSeries) return;
    const point = getPointCoordinates(width, height, padding, firstSeries.data.length, hoverIndex, firstSeries.data[hoverIndex] ?? 0, yMax, yMin);
    tooltip.style.left = `${Math.min(rect.width - 20, Math.max(20, (point.x / width) * rect.width))}px`;
    tooltip.style.top = `${Math.max(20, (point.y / height) * rect.height - 18)}px`;
  };

  const updateHover = (event: MouseEvent, pin = false) => {
    const rect = canvas.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * width;
    const plotWidth = width - padding.left - padding.right;
    const clampedRatio = Math.min(1, Math.max(0, (x - padding.left) / plotWidth));
    const hoverIndex = Math.round(clampedRatio * Math.max(0, config.labels.length - 1));
    if (pin) pinnedIndex = hoverIndex;
    paint(hoverIndex);
    tooltip.innerHTML = tooltipHtml(hoverIndex);
    tooltip.hidden = false;
    tooltip.dataset.pinned = pinnedIndex !== null ? "true" : "false";
    if (pin) setTooltipPositionForIndex(hoverIndex);
    else setTooltipPosition(event);
  };

  canvas.onmousemove = (event) => {
    if (pinnedIndex !== null) return;
    updateHover(event);
  };
  canvas.onmouseenter = (event) => {
    if (pinnedIndex !== null) return;
    updateHover(event);
  };
  canvas.onclick = (event) => {
    if (pinnedIndex !== null) {
      pinnedIndex = null;
      tooltip.hidden = true;
      tooltip.dataset.pinned = "false";
      paint();
      return;
    }
    updateHover(event, true);
  };
  canvas.onmouseleave = () => {
    if (pinnedIndex !== null) return;
    tooltip.hidden = true;
    paint();
  };
  canvas.onkeydown = (event) => {
    if (event.key === "Escape" && pinnedIndex !== null) {
      pinnedIndex = null;
      tooltip.hidden = true;
      tooltip.dataset.pinned = "false";
      paint();
    }
  };
  canvas.tabIndex = 0;

  paint();
}
