(function () {
  "use strict";

  const config = window.ADALBERTO_AI_CONFIG || {};
  const history = [];

  const isReady = () => typeof config.endpoint === "string" && config.endpoint.startsWith("https://");

  const remember = (role, content) => {
    history.push({ role, content: content.slice(0, 1200) });
    const max = Number(config.maxHistoryMessages) || 6;
    if (history.length > max) history.splice(0, history.length - max);
  };

  const ask = async (message) => {
    if (!isReady()) return null;

    const cleanMessage = String(message || "").trim().slice(0, 600);
    if (!cleanMessage) return null;

    const controller = new AbortController();
    const timeout = window.setTimeout(
      () => controller.abort(),
      Number(config.timeoutMs) || 12000
    );

    try {
      const response = await fetch(config.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: cleanMessage, history }),
        signal: controller.signal
      });

      if (!response.ok) return null;
      const data = await response.json();
      const answer = typeof data.answer === "string" ? data.answer.trim() : "";
      if (!answer || answer.length > 2200) return null;

      remember("user", cleanMessage);
      remember("assistant", answer);
      return answer;
    } catch (_) {
      return null;
    } finally {
      window.clearTimeout(timeout);
    }
  };

  window.AdalbertoAI = Object.freeze({ ask, isReady });
})();
