// src/utils/mri.js
export function computeMRI({ recentMoodAvg = 0.6, questionnaireScore = 0.2, sleepScore = 0.8, engagementScore = 0.6, trendFactor = 0 }) {
  const w1 = 0.30, w2 = 0.30, w3 = 0.15, w4 = 0.15, w5 = 0.10;
  const qNorm = 1 - questionnaireScore; // lower questionnaire = better
  const raw = w1 * recentMoodAvg + w2 * qNorm + w3 * sleepScore + w4 * engagementScore + w5 * trendFactor;
  const normalized = Math.max(0, Math.min(1, raw));
  const MRI = Math.round(normalized * 100);
  return MRI;
}
