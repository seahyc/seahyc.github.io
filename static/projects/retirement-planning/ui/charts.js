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
function drawSeries(ctx, width, height, padding, labels, data, color, yMax, yMin = 0, dashed = false) {
    if (!data.length)
        return;
    const plotWidth = width - padding.left - padding.right;
    const plotHeight = height - padding.top - padding.bottom;
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.setLineDash(dashed ? [6, 5] : []);
    ctx.beginPath();
    data.forEach((value, index) => {
        const x = padding.left + (index / Math.max(1, data.length - 1)) * plotWidth;
        const y = padding.top + (1 - (value - yMin) / Math.max(1, yMax - yMin)) * plotHeight;
        if (index === 0)
            ctx.moveTo(x, y);
        else
            ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = color;
    data.forEach((value, index) => {
        const x = padding.left + (index / Math.max(1, data.length - 1)) * plotWidth;
        const y = padding.top + (1 - (value - yMin) / Math.max(1, yMax - yMin)) * plotHeight;
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
export function renderChart(canvas, config) {
    if (!(canvas instanceof HTMLCanvasElement))
        return;
    const width = canvas.width;
    const height = canvas.height;
    const ctx = canvas.getContext("2d");
    if (!ctx)
        return;
    ctx.clearRect(0, 0, width, height);
    const padding = { left: 64, right: 22, top: 26, bottom: 34 };
    const flatValues = config.series.flatMap((item) => item.data);
    const yMax = Math.max(1, ...flatValues);
    const yMin = Math.min(0, ...flatValues);
    drawAxes(ctx, width, height, padding, yMax, yMin);
    config.series.forEach((series) => drawSeries(ctx, width, height, padding, config.labels, series.data, series.color, yMax, yMin, series.dashed));
}
