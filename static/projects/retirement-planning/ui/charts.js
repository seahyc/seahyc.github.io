function niceNumber(value) {
    if (!Number.isFinite(value))
        return "0";
    const abs = Math.abs(value);
    if (abs >= 1000000)
        return `${(value / 1000000).toFixed(1)}m`;
    if (abs >= 1000)
        return `${(value / 1000).toFixed(0)}k`;
    return `${value.toFixed(0)}`;
}
function formatTooltipValue(value) {
    if (!Number.isFinite(value))
        return "0";
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
function drawAxes(ctx, width, height, padding, yMax, yMin = 0) {
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
function getPointCoordinates(width, height, padding, dataLength, index, value, yMax, yMin = 0) {
    const plotWidth = width - padding.left - padding.right;
    const plotHeight = height - padding.top - padding.bottom;
    return {
        x: padding.left + (index / Math.max(1, dataLength - 1)) * plotWidth,
        y: padding.top + (1 - (value - yMin) / Math.max(1, yMax - yMin)) * plotHeight,
    };
}
function drawSeries(ctx, width, height, padding, labels, data, color, yMax, yMin = 0, dashed = false) {
    if (!data.length)
        return;
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.setLineDash(dashed ? [6, 5] : []);
    ctx.beginPath();
    data.forEach((value, index) => {
        const { x, y } = getPointCoordinates(width, height, padding, data.length, index, value, yMax, yMin);
        if (index === 0)
            ctx.moveTo(x, y);
        else
            ctx.lineTo(x, y);
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
function drawHoverState(ctx, width, height, padding, config, yMax, yMin, hoverIndex) {
    const firstSeries = config.series[0];
    if (!firstSeries)
        return;
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
        if (!Number.isFinite(value))
            return;
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
function ensureTooltip(canvas) {
    const parent = canvas.parentElement;
    if (!parent)
        throw new Error("Chart canvas requires a parent element.");
    let tooltip = parent.querySelector(".rp-chart-tooltip");
    if (!tooltip) {
        tooltip = document.createElement("div");
        tooltip.className = "rp-chart-tooltip";
        parent.appendChild(tooltip);
    }
    return tooltip;
}
export function renderChart(canvas, config) {
    if (!(canvas instanceof HTMLCanvasElement))
        return;
    const width = canvas.width;
    const height = canvas.height;
    const ctx = canvas.getContext("2d");
    if (!ctx)
        return;
    const padding = { left: 64, right: 22, top: 26, bottom: 34 };
    const flatValues = config.series.flatMap((item) => item.data);
    const yMax = Math.max(1, ...flatValues);
    const yMin = Math.min(0, ...flatValues);
    const tooltip = ensureTooltip(canvas);
    let pinnedIndex = null;
    const paint = (hoverIndex = null) => {
        ctx.clearRect(0, 0, width, height);
        drawAxes(ctx, width, height, padding, yMax, yMin);
        config.series.forEach((series) => drawSeries(ctx, width, height, padding, config.labels, series.data, series.color, yMax, yMin, series.dashed));
        if (hoverIndex !== null) {
            drawHoverState(ctx, width, height, padding, config, yMax, yMin, hoverIndex);
        }
    };
    const tooltipHtml = (hoverIndex) => {
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
    const setTooltipPosition = (event) => {
        const rect = canvas.getBoundingClientRect();
        tooltip.style.left = `${Math.min(rect.width - 12, Math.max(12, event.clientX - rect.left))}px`;
        tooltip.style.top = `${Math.max(12, event.clientY - rect.top - 12)}px`;
    };
    const updateHover = (event, pin = false) => {
        const rect = canvas.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * width;
        const plotWidth = width - padding.left - padding.right;
        const clampedRatio = Math.min(1, Math.max(0, (x - padding.left) / plotWidth));
        const hoverIndex = Math.round(clampedRatio * Math.max(0, config.labels.length - 1));
        if (pin)
            pinnedIndex = hoverIndex;
        paint(hoverIndex);
        tooltip.innerHTML = tooltipHtml(hoverIndex);
        tooltip.hidden = false;
        tooltip.dataset.pinned = pinnedIndex !== null ? "true" : "false";
        setTooltipPosition(event);
    };
    canvas.onmousemove = (event) => {
        if (pinnedIndex !== null) {
            setTooltipPosition(event);
            return;
        }
        updateHover(event);
    };
    canvas.onmouseenter = (event) => {
        if (pinnedIndex !== null)
            return;
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
        if (pinnedIndex !== null)
            return;
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
